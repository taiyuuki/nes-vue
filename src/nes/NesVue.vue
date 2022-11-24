<template>
  <div :style="`width:${width}px;height:${height}px;background-color:#000;margin:auto;position:relative`">
    <canvas
      ref="cvs"
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
import { onMounted, onBeforeUnmount, watch, watchEffect, nextTick } from 'vue'
import { saveData, loadData, putData } from 'src/db'
import type {  EmitErrorObj, Controller } from './types'
import { resolveController } from 'src/controller/map'
import { onAudioSample, getSampleRate, audioFrame, audioStop } from 'src/audio'
import { WIDTH, HEIGHT, onFrame, animationFram, animationStop, fitInParent } from 'src/animation'

const props = withDefaults(defineProps<{
  url: string
  autoStart?: boolean
  width?: number | string
  height?: number | string
  label?: string
  storage?: boolean
  debugger?: boolean
  p1?: Controller
  p2?: Controller
}>(), {
  autoStart: false,
  width: 256,
  height: 240,
  label: 'Game Start',
  storage: false,
  debugger: false,
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

const controller = resolveController(props)
const cvs = $ref<HTMLCanvasElement | null>(null)
let stop = $ref<boolean>(true)
let fpsStamp: NodeJS.Timeout

function emitError(errorObj: EmitErrorObj) {
  if (props.debugger) {
    console.error(errorObj.message)
  }
  emits('error', errorObj)
}

const nes = new jsnes.NES({
  onFrame,
  onAudioSample,
  sampleRate: getSampleRate(),
})

function keyboardEvents(callback: CallableFunction, event: KeyboardEvent) {
  const keyMap = controller[event.code]
  if (keyMap) {
    callback(keyMap.p, jsnes.Controller[keyMap.value])
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
  if (!cvs) {
    return
  }
  animationFram(cvs)

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
          fitInParent(cvs)
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
      // animationframeID = requestAnimationFrame(onAnimationFrame)
    }
    document.addEventListener('keydown', downKeyboardEvent)
    document.addEventListener('keyup', upKeyboardEvent)

    req.send()
  })

  rp.then(() => {
    audioFrame(nes)
    emits('success')
  }, reason => {
    emitError({
      code: 0,
      message: reason,
    })
  })
}

function gameReset() {
  if (stop) {
    return
  }
  gameStop()
  if (props.url) {
    gameStart(props.url)
  }
}

function gameStop() {
  if (stop) {
    return
  }
  audioStop()
  animationStop()
  clearInterval(fpsStamp)
  nes.reset()
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
        putData({
          data,
          onSuccess: () => {
            emits('saved', {
              id, message: 'Overwritten saved', target: 'IndexedDB',
            })
          },
        })
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
      if (res.result?.nes) {
        loadGameData(res.result.nes)
        emits('loaded', {
          id,
          message: 'Loaded state from indexedDB',
          target: 'indexedDB',
        })
      }
      else {
        emitError({
          code: 2,
          message: 'Load Error: Nothing to load.',
        })
      }
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
watchEffect(() => {
  if (cvs && props.width > 0 && props.height > 0) {
    nextTick(() => {
      fitInParent(cvs)
    })
  }
})

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