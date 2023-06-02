<script setup lang="ts">
import jsnes from 'jsnes'
import { onMounted, onBeforeUnmount, watch, nextTick, ref, computed, effect } from 'vue'
import { saveData, loadData, putData, removeData, clearData } from 'src/db'
import type { EmitErrorObj, SavedOrLoaded, Automatic, Controller } from './types'
import { onAudioSample, getSampleRate, audioFrame, audioStop, pause, play, setGain } from 'src/audio'
import { WIDTH, HEIGHT, onFrame, animationFrame, animationStop, fitInParent, cut } from 'src/animation'
import { is_not_void, is_void, download_canvas, is_empty_obj, get_fill_arr } from '@taiyuuki/utils'
import { P1_DEFAULT, P2_DEFAULT, useController } from 'src/composables/use-controller'
import { fm2Parse, tas_scripts } from 'src/tas'
import { compressArray, decompressArray, getPtTile, getVramMirrorTable, compressNameTable, decompressNameTable } from 'src/utils'

defineOptions({
    name: 'nes-vue',
})

const props = withDefaults(defineProps<{
    url: string
    autoStart?: boolean
    width?: number | string
    height?: number | string
    label?: string
    gain?: number
    clip?: boolean
    storage?: boolean
    debugger?: boolean
    turbo?: number
    p1?: Partial<Controller>
    p2?: Partial<Controller>
}>(), {
    autoStart: false,
    width: '256px',
    height: '240px',
    label: 'Game Start',
    gain: 100,
    clip: false,
    storage: false,
    debugger: false,
    turbo: 16,
    p1: () => P1_DEFAULT,
    p2: () => P2_DEFAULT,
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

const [controller, turbo_btns] = useController(props)

const cvs = ref<HTMLCanvasElement | null>(null)
const isStop = ref<boolean>(true)
let romBuffer: null | string = null

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

nes.videoMode = false

effect(() => {
    nes.ppu.clipToTvSize = !props.clip
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

const interval = computed(() => {
    let time = (1000 / (2 * props.turbo))
    if (time < 20) {
        time = 20
    }
    if (time > 100) {
        time = 100
    }
    return time
})

const downKeyboardEvent = function (event: KeyboardEvent) {
    const keyMap = controller.value[event.code]
    if (is_not_void(keyMap)) {
        if (turbo_btns.value.includes(event.code)) {
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
                }, interval.value)
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
    const keyMap = controller.value[event.code]
    if (is_not_void(keyMap)) {
        if (turbo_btns.value.includes(event.code)) {
            const autoObj = automatic[`p${keyMap.p}`][keyMap.key]
            clearInterval(autoObj.timeout)
            autoObj.once = true
        }
        nes.buttonUp(keyMap.p, jsnes.Controller[keyMap.value])
    }
}

function addEvent() {
    document.addEventListener('keydown', downKeyboardEvent)
    document.addEventListener('keyup', upKeyboardEvent)
}

function removeEvent() {
    document.removeEventListener('keydown', downKeyboardEvent)
    document.removeEventListener('keyup', upKeyboardEvent)
}

/**
 * 🎮: Start the game in the stopped state. Normally, url is not required.
 * @param url Rom url
 */
function start(url: string = <string>props.url) {
    if (is_void(cvs.value)) {
        return
    }
    if (isStop.value) {
        isStop.value = false
    }
    else {
        audioStop()
        animationStop()
        clearInterval(fpsStamp)
    }
    if (url !== props.url) {
        romBuffer = null
        emits('update:url', url)
        return
    }
    animationFrame(cvs.value)

    const rp = new Promise((resolve, reject) => {
        function loadROM(buffer: string) {
            try {
                nes.loadROM(buffer)
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
                isStop.value = true
            }
        }
        if (is_not_void(romBuffer)) {
            loadROM(romBuffer)
        }
        else {
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
                    romBuffer = this.responseText
                    loadROM(romBuffer)
                }
                else {
                    reject({
                        code: 404,
                        message: `${url} loading Error: ${req.statusText}`,
                    })
                }
            }
            req.send()
        }
        cvs.value && fitInParent(cvs.value)
        addEvent()
    })

    rp.then(() => {
        audioFrame(nes)
        emits('success')
    }, reason => {
        emitError(reason)
        return reason
    })
}

/**
 * 🎮: Restart the current game
 */
function reset() {
    if (nes.videoMode) {
        fm2Stop()
    }
    if (!isStop.value) {
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
    if (isStop.value) {
        return
    }
    audioStop()
    animationStop()
    clearInterval(fpsStamp)
    nes.reset()
    isStop.value = true
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
        if (!romBuffer) {
            start(saveData.path)
        }
        const ppuData = saveData.data.ppu
        ppuData.attrib = get_fill_arr(0x20, 0)
        ppuData.bgbuffer = get_fill_arr(0xF000, 0)
        ppuData.buffer = get_fill_arr(0xF000, 0)
        ppuData.pixrendered = get_fill_arr(0xF000, 0)
        ppuData.vramMem = decompressArray(saveData.data.vramMenZip)
        ppuData.nameTable = decompressNameTable(saveData.data.nameTableZip)
        ppuData.vramMirrorTable = getVramMirrorTable()
        ppuData.ptTile = getPtTile()
        nes.ppu.reset()
        nes.romData = romBuffer
        nes.cpu.fromJSON(saveData.data.cpu)
        nes.mmap.fromJSON(saveData.data.mmap)
        nes.ppu.fromJSON(ppuData)
        nes.frameCounter = saveData.frameCounter
    }
    catch (_) {
        return emitError({
            code: 2,
            message: 'Load Error: The saved data is invalid.',
        })
    }
}

function getNesData() {
    const ppuData = nes.ppu.toJSON()
    delete ppuData.attrib
    delete ppuData.bgbuffer
    delete ppuData.buffer
    delete ppuData.pixrendered
    delete ppuData.vramMirrorTable
    delete ppuData.ptTile
    const vramMenZip = compressArray(ppuData.vramMem)
    const nameTableZip = compressNameTable(ppuData.nameTable)
    delete ppuData.vramMem
    delete ppuData.nameTable
    return JSON.stringify({
        path: props.url,
        data: {
            cpu: nes.cpu.toJSON(),
            mmap: nes.mmap.toJSON(),
            ppu: ppuData,
            vramMenZip,
            nameTableZip,
        },
        frameCounter: nes.frameCounter,
    })
}

function saveInStorage(id: string) {
    if (checkId(id)) {return}
    try {
        localStorage.setItem(id, getNesData())
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
        nes: getNesData(),
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

function clear() {
    clearData()
}

/** },
  }🎮: Screenshot
 * @param download True will start downloading the image inside the browser.
 */
function screenshot(download?: boolean, imageName?: string) {
    if (!cvs.value || isStop.value) {return}
    const img = cut(cvs.value)
    if (download) {
        download_canvas(cvs.value, imageName)
    }
    return img
}

function fm2Play() {
    if (is_empty_obj(tas_scripts, false)) {
        emitError({
            code: 3,
            message: 'FM2 Error: No fm2 scripts found.',
        })
        return
    }
    reset()
    nes.videoMode = true
    removeEvent()
}

/**
 * Fetches the *.fm2 file.
 * @param url fm2 file url
 * @param fix fix fm2
 */
async function fm2URL(url: string, fix = 0) {
    try {
        const res = await fetch(url)
        const text = await res.text()
        fm2Parse(text, fix)
    }
    catch (e) {
        emitError({
            code: 4,
            message: 'FM2 Error: Unable to load fm2 file.',
        })
        return Promise.reject(e)
    }
    return fm2Play
}

function fm2Stop() {
    nes.videoMode = false
    nes.controllers[1].state = get_fill_arr(8, 0x40)
    nes.controllers[2].state = get_fill_arr(8, 0x40)
    addEvent()
}

/**
 * Reads fm2 text.
 * @param text - fm2 text
 * @param fix - fix fm2
 */
function fm2Text(text: string, fix = 0) {
    fm2Parse(text, fix)
    return Promise.resolve(fm2Play)
}

const canvasStyle = computed(() => {
    const pure = /^\d*$/
    let width = props.width
    let height = props.height
    if (cvs.value) {
        nextTick(() => {
            cvs.value && fitInParent(cvs.value)
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

watch(() => props.url, () => {
    romBuffer = null
    reset()
})
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
    clear,
    screenshot,
    fm2URL,
    fm2Text,
    fm2Play,
    fm2Stop,
})
</script>

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
