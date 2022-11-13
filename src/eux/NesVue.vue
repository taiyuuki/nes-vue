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
interface Controller {
  UP: KeyboardEvent['code']
  DOWN: KeyboardEvent['code']
  LEFT: KeyboardEvent['code']
  RIGHT: KeyboardEvent['code']
  A: KeyboardEvent['code']
  B: KeyboardEvent['code']
  SELECT?: KeyboardEvent['code']
  START?: KeyboardEvent['code']
}
export interface NesVuePorps {
  url: string
  autoStart?: boolean
  width?: number | string
  height?: number | string
  label?: string
  p1?: Controller
  p2?: Controller
}
</script>

<script setup lang="ts">
import jsnes from 'jsnes'
import { $ref } from 'vue/macros'
import { onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  autoStart: {
    type: Boolean,
    required: false,
    default: false,
  },
  width: {
    type: Number,
    required: false,
    default: 256,
  },
  height: {
    type: Number,
    required: false,
    default: 240,
  },
  label: {
    type: String,
    required: false,
    default: 'Game Start',
  },
  p1: {
    type: Object,
    required: false,
    default: function () {
      return {
        UP: 'KeyW',
        DOWN: 'KeyS',
        LEFT: 'KeyA',
        RIGHT: 'KeyD',
        A: 'KeyK',
        B: 'KeyJ',
        SELECT: 'Digit2',
        START: 'Digit1',
      }
    },
  },
  p2: {
    type: Object,
    required: false,
    default: function () {
      return {
        UP: 'ArrowUp',
        DOWN: 'ArrowDown',
        LEFT: 'ArrowLeft',
        RIGHT: 'ArrowRight',
        A: 'Numpad2',
        B: 'Numpad1',
      }
    },
  },
})
// const props = withDefaults(defineProps<NesVuePorps>(), {
//   autoStart: () => false,
//   width: () => 256,
//   height: () => 240,
//   label: () => 'Game Start',
//   p1: () => ({
//     UP: 'KeyW',
//     DOWN: 'KeyS',
//     LEFT: 'KeyA',
//     RIGHT: 'KeyD',
//     A: 'KeyK',
//     B: 'KeyJ',
//     SELECT: 'Digit2',
//     START: 'Digit1',
//   }),
//   p2: () => ({
//     UP: 'ArrowUp',
//     DOWN: 'ArrowDown',
//     LEFT: 'ArrowLeft',
//     RIGHT: 'ArrowRight',
//     A: 'Numpad2',
//     B: 'Numpad1',
//   }),
// })

const emits = defineEmits(['fps', 'success', 'error'])

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

  if (audio_remain() < AUDIO_BUFFERING) {ignoreSourceError(nes.frame)}

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
      console.log(`Error loading ${path}: ${req.statusText}`)
      reject(`Error loading ${path}: ${req.statusText}`)
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
          resolve(null)
        }
        catch (_) {
          console.error(`Error loading ${path}: rom`)
          reject(`Error loading ${path}: rom`)
          gameStop()
        }
      }
      else {
        console.error(`Error loading ${path}: ${req.statusText}`)
        reject(`Error loading ${path}: ${req.statusText}`)
      }
      animationframeID = requestAnimationFrame(onAnimationFrame)
    }

    req.send()
  })

  rp.then(() => {
    emits('success')
  }, reason => {
    emits('error', reason)
  })

  document.addEventListener('keydown', downKeyboardEvent)
  document.addEventListener('keyup', upKeyboardEvent)

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

onMounted(() => {
  if (props.url && props.autoStart) {
    gameStart(props.url as string)
  }
  if (!props.url) {
    throw 'nes-vue missing props: url'
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
})
</script>