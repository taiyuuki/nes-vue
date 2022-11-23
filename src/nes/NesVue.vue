<template>
  <div :style="`width:${width}px;height:${height}px;background-color:#000;margin:auto;position:relative`">
    <canvas
      id="game-box"
      :width="WIDTH"
      :height="HEIGHT"
      style="display:inline-block"
    />
    <div
      v-if="stop"
      style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);cursor: pointer;color: #f8f4ed;font-size: 20px;"
      @click="gameStart(url as string)"
    >
      {{ label }}
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'nes-vue' }
</script>

<script setup lang="ts">
import jsnes from 'jsnes'
import { $ref } from 'vue/macros'
import { onMounted, onBeforeUnmount, watch } from 'vue'
import { saveData, loadData, putData } from '../db'
import type {  EmitErrorObj, Controller } from './types'

const props = withDefaults(defineProps<{
  url: string
  autoStart?: boolean
  width?: number | string
  height?: number | string
  label?: string
  storage?: boolean
  p1?: Controller
  p2?: Controller
}>(), {
  autoStart: false,
  width: 256,
  height: 240,
  label: 'Game Start',
  storage: false,
  p1: () => ({
    UP: 'KeyW',
    DOWN: 'KeyS',
    LEFT: 'KeyA',
    RIGHT: 'KeyD',
    A: 'KeyK',
    B: 'KeyJ',
    SELECT: 'Digit2',
    START: 'Digit1',
  }),
  p2: () => ({
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    A: 'Numpad2',
    B: 'Numpad1',
  }),
})

const emits = defineEmits(['fps', 'success', 'error', 'saved', 'loaded'])

const WIDTH = 256
const HEIGHT = 240
const AUDIO_BUFFERING = 512
const SAMPLE_COUNT = 4 * 1024
let stop = $ref<boolean>(true)
let audio_ctx = {} as AudioContext
let script_processor: ScriptProcessorNode
let animationframeID: number
let framebuffer_u8 = {} as Uint8ClampedArray, framebuffer_u32 = {} as Uint32Array
const SAMPLE_MASK = SAMPLE_COUNT - 1
const audio_samples_L = new Float32Array(SAMPLE_COUNT)
const audio_samples_R = new Float32Array(SAMPLE_COUNT)
let audio_write_cursor = 0, audio_read_cursor = 0
let fpsStamp: NodeJS.Timeout

const nes = new jsnes.NES({
  onFrame: function (framebuffer_24) {
    let i = 0
    for (let y = 0; y < HEIGHT; ++y) {
      for (let x = 0; x < WIDTH; ++x) {
        i = (y * 256) + x
        framebuffer_u32[i] = 0xff000000 | framebuffer_24[i] // Full alpha
      }
    }
  },
  onAudioSample: function (l, r) {
    audio_samples_L[audio_write_cursor] = l
    audio_samples_R[audio_write_cursor] = r
    audio_write_cursor = (audio_write_cursor + 1) & SAMPLE_MASK
  },
  sampleRate: getSampleRate(),
})

// 获取采样频率
function getSampleRate() {
  if (!window.AudioContext) {
    return 44100
  }
  const myCtx = new window.AudioContext()
  const sampleRate = myCtx.sampleRate
  myCtx.close()
  return sampleRate
}

function audio_remain() {
  return (audio_write_cursor - audio_read_cursor) & SAMPLE_MASK
}

function ignoreSourceError(fun: Function) {
  try {
    fun()
  }
  catch (e) {
    return
  }
}

function audio_callback(event: AudioProcessingEvent) {
  const dst = event.outputBuffer
  const len = dst.length

  if (audio_remain() < AUDIO_BUFFERING) {
    ignoreSourceError(nes.frame)
  }

  const dst_l = dst.getChannelData(0)
  const dst_r = dst.getChannelData(1)
  for (let i = 0; i < len; i++) {
    const src_idx = (audio_read_cursor + i) & SAMPLE_MASK
    dst_l[i] = audio_samples_L[src_idx]
    dst_r[i] = audio_samples_R[src_idx]
  }

  audio_read_cursor = (audio_read_cursor + len) & SAMPLE_MASK
}

function keyboardEvents(callback: CallableFunction, event: KeyboardEvent) {
  const player_1 = 1
  const player_2 = 2
  if (props.p1 && props.p2) {
    switch (event.code) {
      case props.p1.UP: // W
        callback(player_1, jsnes.Controller.BUTTON_UP)
        break
      case props.p1.DOWN: // S
        callback(player_1, jsnes.Controller.BUTTON_DOWN)
        break
      case props.p1.LEFT: // A
        callback(player_1, jsnes.Controller.BUTTON_LEFT)
        break
      case props.p1.RIGHT: // D
        callback(player_1, jsnes.Controller.BUTTON_RIGHT)
        break
      case props.p1.B: // 'J' - qwerty, dvorak
        callback(player_1, jsnes.Controller.BUTTON_B)
        break
      case props.p1.A: // 'K' - qwerty, azerty
        callback(player_1, jsnes.Controller.BUTTON_A)
        break
      case props.p1.SELECT: // Tab
        callback(player_1, jsnes.Controller.BUTTON_SELECT)
        break
      case props.p1.START: // Return
        if (audio_ctx.state !== 'running') {
          audio_ctx.resume()
        }
        callback(player_1, jsnes.Controller.BUTTON_START)
        break
      case props.p2.UP:
        callback(player_2, jsnes.Controller.BUTTON_UP)
        break
      case props.p2.DOWN:
        callback(player_2, jsnes.Controller.BUTTON_DOWN)
        break
      case props.p2.LEFT:
        callback(player_2, jsnes.Controller.BUTTON_LEFT)
        break
      case props.p2.RIGHT:
        callback(player_2, jsnes.Controller.BUTTON_RIGHT)
        break
      case props.p2.B:
        callback(player_2, jsnes.Controller.BUTTON_B)
        break
      case props.p2.A:
        callback(player_2, jsnes.Controller.BUTTON_A)
        break
      default:
        break
    }
  }
}

function emitError(errorObj: EmitErrorObj) {
  console.error(errorObj.message)
  emits('error', errorObj)
}

const downKeyboardEvent = function (event: KeyboardEvent) {
  keyboardEvents(nes.buttonDown, event)
}
const upKeyboardEvent = function (event: KeyboardEvent) {
  keyboardEvents(nes.buttonUp, event)
}

function gameStart(path: string = <string>props.url) {
  stop = false
  const canvas = document.querySelector('#game-box') as HTMLCanvasElement
  const canvas_ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  const image = canvas_ctx.getImageData(0, 0, WIDTH, HEIGHT) as ImageData

  canvas_ctx.fillStyle = 'black'
  canvas_ctx.fillRect(0, 0, WIDTH, HEIGHT)

  const buffer = new ArrayBuffer(image.data.length)
  framebuffer_u8 = new Uint8ClampedArray(buffer)
  framebuffer_u32 = new Uint32Array(buffer)

  audio_ctx = new AudioContext()

  script_processor = audio_ctx.createScriptProcessor(AUDIO_BUFFERING, 0, 2)
  script_processor.onaudioprocess = audio_callback
  script_processor.connect(audio_ctx.destination)

  const rp = new Promise((resolve, reject) => {
    const req = new XMLHttpRequest()
    req.open('GET', path)
    req.overrideMimeType('text/plain; charset=x-user-defined')
    req.onerror = () => {
      reject(`${path} loading Error: ${req.statusText}`)
    }

    req.onload = function () {
      if (this.status === 200) {
        try {
          nes.loadROM(this.responseText)
          fitInParent(canvas)
          fpsStamp = setInterval(() => {
            const fps = nes.getFPS()
            emits('fps', fps ? fps : 0)
          }, 1000)
          resolve('success')
        }
        catch (_) {
          reject(`${path} loading Error: Probably the ROM is unsupported.`)
          gameStop()
        }
      }
      else {
        reject(`${path} loading Error: ${req.statusText}.`)
      }
      animationframeID = requestAnimationFrame(onAnimationFrame)
    }
    document.addEventListener('keydown', downKeyboardEvent)
    document.addEventListener('keyup', upKeyboardEvent)

    req.send()
  })

  rp.then(() => {
    emits('success')
  }, reason => {
    emitError({
      code: 0,
      message: reason,
    })
  })

  // 游戏画面
  function onAnimationFrame() {
    requestAnimationFrame(onAnimationFrame)
    image.data.set(framebuffer_u8)
    canvas_ctx.putImageData(image, 0, 0)
  }
}

// 画面填充父元素
function fitInParent(canvas: HTMLCanvasElement) {
  const parent = canvas.parentNode as HTMLElement
  const parentWidth = parent.clientWidth
  const parentHeight = parent.clientHeight
  const parentRatio = parentWidth / parentHeight
  const desiredRatio = WIDTH / HEIGHT
  if (desiredRatio < parentRatio) {
    canvas.style.width = `${Math.round(parentHeight * desiredRatio)}px`
    canvas.style.height = `${parentHeight}px`
  }
  else {
    canvas.style.width = `${parentWidth}px`
    canvas.style.height = `${Math.round(parentWidth / desiredRatio)}px`
  }
}

function gameReset() {
  if (stop) {
    return
  }
  if (script_processor.onaudioprocess) {
    gameStop()
  }
  if (props.url) {
    gameStart(props.url)
  }
}

function gameStop() {
  if (stop) {
    return
  }
  script_processor.disconnect(audio_ctx.destination)
  script_processor.onaudioprocess = null
  script_processor = {} as ScriptProcessorNode
  clearInterval(fpsStamp)
  if ('close' in audio_ctx) {
    audio_ctx.close()
  }
  nes.reset()
  cancelAnimationFrame(animationframeID)
}

function loadGameData(data: string) {
  const saveData = JSON.parse(data)
  if (saveData.path !== props.url) {
    emitError({
      code: 2,
      message: `Load Error: The saved data is inconsistent with the current game, saved: ${saveData.path}, current: ${props.url}.`,
    })
    return
  }
  try {
    nes.ppu.reset()
    nes.romData = saveData.data.romData
    nes.cpu.fromJSON(saveData.data.cpu)
    nes.mmap.fromJSON(saveData.data.mmap)
    nes.ppu.fromJSON(saveData.data.ppu)
  }
  catch (_) {
    emitError({
      code: 2,
      message: 'Load Error: The saved data is invalid.',
    })
  }
}

function saveInStorage(id: string) {
  if (typeof id === 'undefined') {
    emitError({
      code: 1,
      message: 'Save Error: missing save id.',
    })
  }
  try {
    localStorage.setItem(id, JSON.stringify({
      path: props.url,
      data: nes.toJSON(),
    }))
    emits('saved', {
      id,
      message: 'The state has been saved in localStorage',
      target: 'localStorage',
    })
  }
  catch (e: any) {
    if (e.name === 'QuotaExceededError') {
      emitError({
        code: 1,
        message: 'Save Error: localStorage out of memory.',
      })
    }
  }
}

function loadInStorage(id: string) {
  if (typeof id === 'undefined') {
    emitError({
      code: 2,
      message: 'Load Error: missing save id.',
    })
  }
  const saveDataJSON = localStorage.getItem(id)
  if (!saveDataJSON) {
    emitError({
      code: 2,
      message: 'Load Error: nothing to load.',
    })
    return
  }
  loadGameData(saveDataJSON)
  emits('loaded', {
    id,
    message: 'Loaded state from localStorage',
    target: 'localStorage',
  })
}

function saveIndexedDB(id: string) {
  if (typeof id === 'undefined') {
    emitError({
      code: 1,
      message: 'Save Error: missing save id.',
    })
  }
  const data = {
    id,
    nes: JSON.stringify({
      path: props.url,
      data: nes.toJSON(),
    }),
  }
  saveData({
    data,
    onSuccess() {
      emits('saved', {
        id,
        message: 'The state has been saved in IndexedDB',
        target: 'IndexedDB',
      })
    },
    onError(code: number | undefined) {
      if (code === 0) {
        putData({ data, onSuccess: () => {console.log('saved')} })
        return
      }
      emitError({
        code: 1,
        message: 'Save Error: Unable to save data to indexedDB.',
      })
    },
  })
}

function loadIndexedDB(id: string) {
  loadData({
    id,
    onSuccess(res) {
      loadGameData(res.result.nes)
      emits('loaded', {
        id,
        message: 'Loaded state from indexedDB',
        target: 'indexedDB',
      })
    },
    onError() {
      emitError({
        code: 2,
        message: 'Load Error: Nothing to load, probably the save data has been removed or invalidated.',
      })
    },
  })
}

function save(id: string) {
  if (!nes.cpu.irqRequested) {
    emitError({
      code: 1,
      message: 'Save Error: Can only be saved while the game is running.',
    })
    return
  }
  if (props.storage) {
    saveInStorage(id)
  }
  else {
    saveIndexedDB(id)
  }
}

function load(id: string) {
  if (!nes.cpu.irqRequested) {
    emitError({
      code: 2,
      message: 'Load Error: Can only be loaded when the game is running.',
    })
    return
  }
  if (props.storage) {
    loadInStorage(id)
  }
  else {
    loadIndexedDB(id)
  }
}

onMounted(() => {
  if (!props.url) {
    throw 'nes-vue missing props: url.'
  }
  else if (props.autoStart) {
    gameStart(props.url as string)
  }
})

watch(() => props.url, gameReset)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', downKeyboardEvent)
  document.removeEventListener('keyup', upKeyboardEvent)
})

defineExpose({
  gameStart,
  gameReset,
  gameStop,
  save,
  load,
})
</script>