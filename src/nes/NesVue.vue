<template>
  <div :style="canvasStyle">
    <canvas
      ref="cvs"
      :width="WIDTH"
      :height="HEIGHT"
      style="display:inline-block"
    />
    <div
      v-show="isStop"
      style="position: absolute;top: 0;left: 0%; background-color: #000;width: 100%; height: 100%;"
    />
    <div
      v-if="isStop"
      style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);cursor: pointer;color: #f8f4ed;font-size: 20px;"
      @click="start()"
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
import { $ref, $computed } from 'vue/macros'
import { onMounted, onBeforeUnmount, watch, nextTick, computed } from 'vue'
import { saveData, loadData, putData, removeData } from 'src/db'
import type { EmitErrorObj, Controller, SavedOrLoaded, Automatic } from './types'
import { resolveController } from 'src/controller'
import { onAudioSample, getSampleRate, audioFrame, audioStop, pause, play, setGain } from 'src/audio'
import { WIDTH, HEIGHT, onFrame, animationFram, animationStop, fitInParent, cut } from 'src/animation'
import { getNow, isNotNull } from 'src/utils'

const props = withDefaults(defineProps<{
  url: string
  autoStart?: boolean
  width?: number | string
  height?: number | string
  label?: string
  gain?: number
  dense?: boolean
  storage?: boolean
  debugger?: boolean
  persecond?: number
  p1?: Controller
  p2?: Controller
}>(), {
  autoStart: false,
  width: '256px',
  height: '240px',
  label: 'Game Start',
  gain: 100,
  dense: false,
  storage: false,
  debugger: false,
  persecond: 16,
  p1: () => ({
    UP: 'KeyW',
    DOWN: 'KeyS',
    LEFT: 'KeyA',
    RIGHT: 'KeyD',
    A: 'KeyK',
    B: 'KeyJ',
    C: 'KeyI',
    D: 'KeyU',
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
    C: 'Numpad5',
    D: 'Numpad4',
  }),
})

const emits = defineEmits<NesVueEmits>()

if (!props.url) {
  throw 'nes-vue missing props: url.'
}

interface NesVueEmits {
  (e: 'fps', fps: number): void
  (e: 'success'): void
  (e: 'error', error: EmitErrorObj): void
  (e: 'saved', saved: SavedOrLoaded): void
  (e: 'loaded', loaded: SavedOrLoaded): void
  (e: 'update:url', path: string): void
  (e: 'removed', id: string): void
}

const cvs = $ref<HTMLCanvasElement | null>(null)
let isStop = $ref<boolean>(true)

let fpsStamp: NodeJS.Timeout

function emitError(errorObj: EmitErrorObj) {
  if (props.debugger) {
    console.error(errorObj.message)
  }
  emits('error', errorObj)
  return false
}

const nes = new jsnes.NES({
  onFrame,
  onAudioSample,
  sampleRate: getSampleRate(),
})

const automatic: { [key: string]: { [key: string]: Automatic } } = {
  p1: {
    C: {
      timeout: 0,
      beDown: false,
      once: true,
    },
    D: {
      timeout: 0,
      beDown: false,
      once: true,
    },
  },
  p2: {
    C: {
      timeout: 0,
      beDown: false,
      once: true,
    },
    D: {
      timeout: 0,
      beDown: false,
      once: true,
    },
  },
}

const interval = $computed(() => {
  let time = (1000 / (2 * props.persecond))
  if (time < 20) {
    time = 20
  }
  if (time > 100) {
    time = 100
  }
  return time
})

const controller = $computed(() => {
  return resolveController(props.p1, props.p2)
})

const downKeyboardEvent = function (event: KeyboardEvent) {
  const autoList = [props.p1.C, props.p1.D, props.p2.C, props.p2.D]
  const keyMap = controller[event.code]
  if (isNotNull(keyMap)) {
    if (autoList.includes(event.code)) {
      const autoObj = automatic[`p${keyMap.p}`][keyMap.key]
      if (autoObj.once) {
        nes.buttonDown(keyMap.p, jsnes.Controller[keyMap.value])
        autoObj.timeout = window.setInterval(() => {
          if (autoObj.beDown) {
            nes.buttonDown(keyMap.p, jsnes.Controller[keyMap.value])
          }
          else {
            nes.buttonUp(keyMap.p, jsnes.Controller[keyMap.value])
          }
          autoObj.beDown = !autoObj.beDown
        }, interval)
        autoObj.once = false
      }
      return
    }
    else {
      nes.buttonDown(keyMap.p, jsnes.Controller[keyMap.value])
    }
  }
}
const upKeyboardEvent = function (event: KeyboardEvent) {
  const autoList = [props.p1.C, props.p1.D, props.p2.C, props.p2.D]
  const keyMap = controller[event.code]
  if (isNotNull(keyMap)) {
    if (autoList.includes(event.code)) {
      const autoObj = automatic[`p${keyMap.p}`][keyMap.key]
      clearInterval(autoObj.timeout)
      autoObj.once = true
    }
    nes.buttonUp(keyMap.p, jsnes.Controller[keyMap.value])
  }
}

/**
 * 🎮: Start the game in the stopped state. Normally, url is not required.
 * @param url Rom url
 */
function start(url: string = <string>props.url) {
  if (!isNotNull(cvs)) {
    return
  }
  if (isStop) {
    isStop = false
  }
  else {
    audioStop()
    animationStop()
    clearInterval(fpsStamp)
  }
  if (url !== props.url) {
    emits('update:url', url)
    return
  }
  const padding = props.dense ? -7 : 0
  animationFram(cvs, padding)

  const rp = new Promise((resolve, reject) => {
    const req = new XMLHttpRequest()
    req.open('GET', url)
    req.overrideMimeType('text/plain; charset=x-user-defined')
    req.onerror = () => {
      reject({
        code: 404,
        message: `${url} loading Error: ${req.statusText}`,
      })
    }

    req.onload = function () {
      if (this.status === 200) {
        try {
          nes.loadROM(this.responseText)
          fitInParent(cvs, props.dense)
          fpsStamp = setInterval(() => {
            const fps = nes.getFPS()
            emits('fps', fps ? fps : 0)
          }, 1000)
          resolve('success')
        }
        catch (_) {
          reject({
            code: 0,
            message: `${url} loading Error: Probably the ROM is unsupported.`,
          })
          isStop = true
        }
      }
      else {
        reject({
          code: 404,
          message: `${url} loading Error: ${req.statusText}`,
        })
      }
    }
    document.addEventListener('keydown', downKeyboardEvent)
    document.addEventListener('keyup', upKeyboardEvent)

    req.send()
  })

  rp.then(() => {
    audioFrame(nes)
    emits('success')
  }, reason => {
    return emitError(reason)
  })
}

/**
 * 🎮: Restart the current game
 */
function reset() {
  if (!isStop) {
    stop()
  }
  if (props.url) {
    start()
  }
}

/**
 * 🎮: Stop the game
 */
function stop() {
  if (isStop) {
    return
  }
  audioStop()
  animationStop()
  clearInterval(fpsStamp)
  nes.reset()
  isStop = true
}

function checkId(id: string | number | undefined) {
  if (id === void 0) {
    return emitError({
      code: 4,
      message: 'TypeError: id is undefined.',
    })
  }
  else {
    return false
  }
}

function loadGameData(data: string) {
  const saveData = JSON.parse(data)
  if (saveData.path !== props.url) {
    return emitError({
      code: 2,
      message: `Load Error: The saved data is inconsistent with the current game, saved: ${saveData.path}, current: ${props.url}.`,
    })
  }
  try {
    nes.ppu.reset()
    nes.romData = saveData.data.romData
    nes.cpu.fromJSON(saveData.data.cpu)
    nes.mmap.fromJSON(saveData.data.mmap)
    nes.ppu.fromJSON(saveData.data.ppu)
  }
  catch (_) {
    return emitError({
      code: 2,
      message: 'Load Error: The saved data is invalid.',
    })
  }
}

function saveInStorage(id: string) {
  if (checkId(id)) {return}
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
      return emitError({
        code: 1,
        message: 'Save Error: localStorage out of memory.',
      })
    }
  }
}

function loadInStorage(id: string) {
  if (checkId(id)) {return}
  const saveDataJSON = localStorage.getItem(id)
  if (!saveDataJSON) {
    return emitError({
      code: 2,
      message: 'Load Error: nothing to load.',
    })
  }
  loadGameData(saveDataJSON)
  emits('loaded', {
    id,
    message: 'Loaded state from localStorage',
    target: 'localStorage',
  })
}

function saveIndexedDB(id: string) {
  if (checkId(id)) {return}
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
        target: 'indexedDB',
      })
    },
    onError(code: number | undefined) {
      if (code === 0) {
        putData({
          data,
          onSuccess: () => {
            emits('saved', {
              id,
              message: 'Overwritten saved',
              target: 'indexedDB',
            })
          },
        })
        return
      }
      return emitError({
        code: 1,
        message: 'Save Error: Unable to save data to indexedDB.',
      })
    },
  })
}

function loadIndexedDB(id: string) {
  if (checkId(id)) {return}
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
        return emitError({
          code: 2,
          message: 'Load Error: Nothing to load.',
        })
      }
    },
    onError() {
      return emitError({
        code: 2,
        message: 'Load Error: Nothing to load, probably the save data has been removed or invalidated.',
      })
    },
  })
}

/**
 * 🎮: Save game state
 * @param id Game state id
 * @example
 * ```ts
 * import { ref } from 'vue'
 * import type { NesVueInstance } from 'nes-vue'
 * import { NesVue } from 'nes-vue'
 *
 * const nes = ref<NesVueInstance | null>(null)
 * const id = 'example'
 * function save() {
 *  if (nes.value) {
 *   // Save state
 *   nes.value.save(id)
 *  }
 * }
 * ```
 */
function save(id: string) {
  if (checkId(id)) {return}
  if (!nes.cpu.irqRequested) {
    return emitError({
      code: 1,
      message: 'Save Error: Can only be saved while the game is running.',
    })
  }
  if (props.storage) {
    saveInStorage(id)
  }
  else {
    saveIndexedDB(id)
  }
}

/**
 * 🎮: Load game state
 * @param id Game state id
 * @example
 * ```ts
 * import { ref } from 'vue'
 * import type { NesVueInstance } from 'nes-vue'
 * import { NesVue } from 'nes-vue'
 *
 * const nes = ref<NesVueInstance | null>(null)
 * const id = 'example'
 * function load() {
 *  if (nes.value) {
 *   // Load state
 *   nes.value.load(id)
 *  }
 * }
 * ```
 */
function load(id: string) {
  if (checkId(id)) {return}
  if (!nes.cpu.irqRequested) {
    return emitError({
      code: 2,
      message: 'Load Error: Can only be loaded when the game is running.',
    })
  }
  if (props.storage) {
    loadInStorage(id)
  }
  else {
    loadIndexedDB(id)
  }
}

function remove(id: string) {
  if (checkId(id)) {return}
  if (props.storage) {
    localStorage.removeItem(id)
  }
  else {
    removeData({
      id,
      onSuccess() {
        emits('removed', id)
      },
    })
  }
}

/** },
  }🎮: Screenshot
 * @param download True will start downloading the image inside the browser.
 */
function screenshot(download?: boolean) {
  if (!cvs || isStop) {return}
  const img = cut(cvs)
  if (download) {
    const a = document.createElement('a')
    a.href = img.src
    a.download = getNow()
    a.click()
  }
  return img
}

const canvasStyle = computed(() => {
  const pure = /^\d*$/
  let width = props.width
  let height = props.height
  if (cvs) {
    nextTick(() => {
      fitInParent(cvs, props.dense)
    })
  }
  if (pure.test(String(width))) {
    width += 'px'
  }
  if (pure.test(String(height))) {
    height += 'px'
  }
  return `width: ${width};height: ${height};background-color: #000;margin: auto;position: relative;overflow: hidden;`
})

watch(() => props.url, reset)
watch(() => props.gain, () => { setGain(props.gain) })

onMounted(() => {
  if (props.autoStart) {
    start()
  }
  setGain(props.gain)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', downKeyboardEvent)
  document.removeEventListener('keyup', upKeyboardEvent)
  stop()
})

defineExpose({
  start,
  reset,
  stop,
  pause,
  play,
  save,
  load,
  remove,
  screenshot,
})
</script>