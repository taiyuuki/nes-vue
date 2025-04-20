<script setup lang="ts">
import type { Controller, EmitErrorObj, SaveData, SavedOrLoaded } from 'src/types'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue'
import { createDB } from 'src/db'
import { audioFrame, audioStop, resume, setGain, suspend } from 'src/audio'
import { HEIGHT, WIDTH, animationFrame, animationStop, cut, fitInParent } from 'src/animation'
import { download_canvas, is_not_void, is_void } from '@taiyuuki/utils'
import { P1_DEFAULT, P2_DEFAULT, useController } from 'src/composables/use-controller'
import { getNesData, loadNesData, nes, rom } from 'src/nes'
import { useElement } from 'src/composables/use-instance'

defineOptions({ name: 'NesVue' })

const props = withDefaults(defineProps<{
    url: string
    autoStart?: boolean
    width?: number | string
    height?: number | string
    label?: string
    gain?: number
    noClip?: boolean
    storage?: boolean
    debugger?: boolean
    turbo?: number
    dbName?: string

    // rewindMode?: boolean
    p1?: Partial<Controller>
    p2?: Partial<Controller>
}>(), {
    autoStart: false,
    width: '256px',
    height: '240px',
    label: 'Game Start',
    gain: 100,
    noClip: false,
    storage: false,
    debugger: false,
    turbo: 16,
    dbName: 'nes-vue',

    // rewindMode: false,
    p1: () => P1_DEFAULT,
    p2: () => P2_DEFAULT,
})

const emit = defineEmits<NesVueEmits>()

interface NesVueEmits {
    (e: 'fps', fps: number): void
    (e: 'success'): void
    (e: 'error', error: EmitErrorObj): void
    (e: 'saved', saved: SavedOrLoaded): void
    (e: 'loaded', loaded: SavedOrLoaded): void
    (e: 'update:url', path: string): void
    (e: 'removed', id: string): void
}

if (!props.url) {
    throw 'nes-vue missing props: url.'
}

const emitControllerState = useController(props)

const cvs = useElement<HTMLCanvasElement>()
const isStop = ref<boolean>(true)
const db = createDB<SaveData>(props.dbName, 'save_data')
let isPaused = false
let fm2 = ''
let fm2Offset = 0
let playingVideo = false

let fpsStamp: number

function emitError(errorObj: EmitErrorObj) {
    errorObj.message = `[nes-vue] ${errorObj.message}`
    if (props.debugger) {
        console.error(errorObj.message)
    }
    emit('error', errorObj)

    return false
}

watchEffect(() => {
    nes.ppu.clipToTvSize = !props.noClip
})

function downKeyboardEvent(event: KeyboardEvent) {
    emitControllerState(event.code, 0x41)
}
function upKeyboardEvent(event: KeyboardEvent) {
    emitControllerState(event.code, 0x40)
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
function start(url: string = props.url) {
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
        rom.buffer = null
        emit('update:url', url)

        return
    }
    animationFrame(cvs.value)

    const rp = new Promise((resolve, reject) => {
        function loadROM(buffer: Uint8Array) {
            try {
                nes.loadROM(buffer)
                fpsStamp = window.setInterval(() => {
                    const fps = nes.getFPS()
                    emit('fps', fps || 0)
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
        if (is_not_void(rom.buffer)) {
            loadROM(rom.buffer)
        }
        else {
            fetch(url)
                .then(res => res.arrayBuffer())
                .then(buffer => {
                    rom.buffer = new Uint8Array(buffer)
                    loadROM(rom.buffer)
                })
                .catch(e => {
                    reject({
                        code: 0,
                        message: `${url} loading Error: ${e.message}`,
                    })
                })
        }
        cvs.value && fitInParent(cvs.value)
        addEvent()
    })

    rp.then(() => {
        audioFrame()
        emit('success')
    }, reason => {
        emitError(reason)

        return reason
    })
}

/**
 * 🎮: Restart the current game
 */
function reset() {
    nes.reloadROM()
    if (playingVideo) {
        playingVideo = false
        addEvent()
    }
    isPaused = false
    isStop.value = false
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
    playingVideo = false
    isStop.value = true
}

function checkId(id: number | string | undefined) {
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

function loadGameData(saveData: SaveData) {
    loadNesData(saveData, emitError, props.url)
    if (playingVideo) {
        nes.playVideo(fm2, fm2Offset)
    }
}

function saveInStorage(id: string) {
    if (checkId(id)) {
        return
    }
    try {
        localStorage.setItem(id, JSON.stringify(getNesData(props.url)))
        emit('saved', {
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
    if (checkId(id)) {
        return
    }
    const saveDataString = localStorage.getItem(id)
    if (!saveDataString) {
        return emitError({
            code: 2,
            message: 'Load Error: nothing to load.',
        })
    }
    loadGameData(JSON.parse(saveDataString))
    emit('loaded', {
        id,
        message: 'Loaded state from localStorage',
        target: 'localStorage',
    })
}

function saveIndexedDB(id: string) {
    if (checkId(id)) {
        return
    }
    try {
        db.set_item(id, getNesData(props.url))
    }
    catch (e) {
        console.error(e)
        emitError({
            code: 1,
            message: 'Save Error: Unable to save data to indexedDB.',
        })
    }
}

function loadIndexedDB(id: string) {
    if (checkId(id)) {
        return
    }
    db.get_item(id).then(data => {
        loadGameData(data)
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
    if (checkId(id)) {
        return
    }
    if (isStop.value) {
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
    if (checkId(id)) {
        return
    }
    if (!nes.cpu.irqRequested || isStop.value) {
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
    if (isPaused) {
        play()
    }
}

function remove(id: string) {
    if (checkId(id)) {
        return
    }
    if (props.storage) {
        localStorage.removeItem(id)
    }
    else {
        db.remove_item(id)
    }
}

function clear() {
    db.clear()
}

/**
   },
  }🎮: Screenshot
 * @param download True will start downloading the image inside the browser.
 */
function screenshot(download?: boolean, imageName?: string) {
    if (!cvs.value || isStop.value) {
        return
    }
    const img = cut(cvs.value)
    if (download) {
        download_canvas(cvs.value, imageName)
    }

    return img
}

function fm2Play(offset = 0) {
    fm2Offset = offset
    nes.reloadROM()
    removeEvent()
    nes.playVideo(fm2, offset)
    playingVideo = true
}

/**
 * Fetches the *.fm2 file.
 * @param url fm2 file url
 * @param fix fix fm2
 */
async function fm2URL(url: string) {
    try {
        const res = await fetch(url)
        fm2 = await res.text()
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
    nes.video.stop()
    addEvent()
}

/**
 * Reads fm2 text.
 * @param text - fm2 text
 * @param fix - fix fm2
 */
function fm2Text(text: string) {
    fm2 = text

    return Promise.resolve(fm2Play)
}

function cheatCode(code: string) {
    nes.cheat.onCheat(code)
}

function cancelCheatCode(code: string) {
    nes.cheat.disableCheat(code)
}

function cancelCheatCodeAll() {
    nes.cheat.reset()
}

function pause() {
    isPaused = true
    suspend()
}

function play() {
    isPaused = false
    resume()
}

const canvasStyle = computed(() => {
    const pure = /^\d*$/
    let width = props.width
    let height = props.height
    nextTick(() => {
        cvs.value && fitInParent(cvs.value)
    })
    if (pure.test(String(width))) {
        width += 'px'
    }
    if (pure.test(String(height))) {
        height += 'px'
    }

    return `width: ${width};height: ${height};background-color: #000;margin: auto;position: relative;overflow: hidden;`
})

watch(() => props.url, () => {
    rom.buffer = null
    reset()
})
watch(
    () => props.gain,
    () => { setGain(props.gain) },
)

onMounted(() => {
    rom.buffer = null
    if (props.autoStart) {
        start()
    }
    setGain(props.gain)
})

onBeforeUnmount(() => {
    removeEvent()
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
    cheatCode,
    cancelCheatCode,
    cancelCheatCodeAll,
})
</script>

<script lang="ts">
export default { name: 'NesVue' }
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
