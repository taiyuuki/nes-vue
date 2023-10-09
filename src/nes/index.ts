import { get_fill_arr } from '@taiyuuki/utils'
import jsnes from 'jsnes'
import { onFrame } from 'src/animation'
import { getSampleRate, onAudioSample } from 'src/audio'
import { compressArray, compressNameTable, compressPtTile, decompressArray, decompressNameTable, decompressPtTile, getVramMirrorTable } from 'src/utils'
import { tasState } from 'src/tas'
import type { ControllerStateType, EmitErrorObj, SaveData } from 'src/types'

const nes = new jsnes.NES({
    onFrame,
    onAudioSample,
    sampleRate: getSampleRate(),
})

nes.videoMode = false
nes.frameCounter = 1
nes.playbackMode = false
const rom = {
    buffer: null as string | null,
}

function nesFrame() {
    if (nes.videoMode && nes.frameCounter in tasState) {
        const script = tasState[nes.frameCounter]
        if (nes.frameCounter > 0) {
            nes.controllers[1].state = script.p1
            nes.controllers[2].state = script.p2
        }
    }
    nes.frame()
}

function getNesData(url: string) {
    const ppu = nes.ppu.toJSON()
    const mmap = nes.mmap.toJSON()
    const vramMemZip = compressArray(ppu.vramMem!)
    const nameTableZip = compressNameTable(ppu.nameTable!)
    const ptTileZip = compressPtTile(ppu.ptTile!)
    Reflect.deleteProperty(ppu, 'attrib')
    Reflect.deleteProperty(ppu, 'bgbuffer')
    Reflect.deleteProperty(ppu, 'buffer')
    Reflect.deleteProperty(ppu, 'pixrendered')
    Reflect.deleteProperty(ppu, 'vramMirrorTable')
    Reflect.deleteProperty(ppu, 'vramMem')
    Reflect.deleteProperty(ppu, 'nameTable')
    Reflect.deleteProperty(ppu, 'ptTile')

    const cpu = nes.cpu.toJSON()
    const cpuMemZip = compressArray(cpu.mem!)
    Reflect.deleteProperty(cpu, 'mem')

    return {
        path: url,
        data: {
            cpu,
            mmap,
            ppu,
            vramMemZip,
            nameTableZip,
            cpuMemZip,
            ptTileZip,
            frameCounter: nes.frameCounter,
        },
    } as SaveData
}

function loadNesData(saveData: SaveData, emitError: (error: EmitErrorObj) => void, url?: string) {
    if (url && saveData.path !== url) {
        return emitError({
            code: 2,
            message: `Load Error: The saved data is inconsistent with the current game, saved: ${saveData.path}, current: ${url}.`,
        })
    }
    if (!rom.buffer) {
        return emitError({
            code: 3,
            message: 'Load Error: NES ROM is not loaded.',
        })
    }
    try {
        const { ppu, cpu, mmap, frameCounter, vramMemZip, nameTableZip, cpuMemZip, ptTileZip } = saveData.data
        ppu.attrib = get_fill_arr(0x20, 0)
        ppu.bgbuffer = get_fill_arr(0xF000, 0)
        ppu.buffer = get_fill_arr(0xF000, 0)
        ppu.pixrendered = get_fill_arr(0xF000, 0)
        ppu.vramMem = decompressArray(vramMemZip)
        ppu.nameTable = decompressNameTable(nameTableZip)
        ppu.vramMirrorTable = getVramMirrorTable()
        ppu.ptTile = decompressPtTile(ptTileZip)
        cpu.mem = decompressArray(cpuMemZip)
        nes.ppu.reset()
        nes.romData = rom.buffer
        nes.cpu.fromJSON(cpu)
        nes.mmap.fromJSON(mmap)
        nes.ppu.fromJSON(ppu)
        nes.frameCounter = frameCounter
    }
    catch (e) {
        console.error(e)
        emitError({
            code: 3,
            message: 'Load Error: The saved data is invalid.',
        })
    }
}

class ControllerState {
    _events: Record<string, ControllerStateType[]>
    _auto: Record<string, Record<string, {
        timeout: number
        beDown: boolean
        once: boolean
    }>>

    constructor() {
        this._events = {}
        this._auto = {
            1: {
                8: {
                    timeout: 0,
                    beDown: false,
                    once: true,
                },
                9: {
                    timeout: 0,
                    beDown: false,
                    once: true,
                },
            },
            2: {
                8: {
                    timeout: 0,
                    beDown: false,
                    once: true,
                },
                9: {
                    timeout: 0,
                    beDown: false,
                    once: true,
                },
            },
        }
    }

    on(keyCode: string, state: ControllerStateType) {
        if (!this._events[keyCode]) {
            this._events[keyCode] = []
        }
        this._events[keyCode].push(state)
    }

    emit(keyboadCode: string, stateValue: 0x41 | 0x40, interval: number) {
        this._events[keyboadCode]?.forEach((event) => {
            const state = nes.controllers[event.p].state
            if (event.index <= 7) {
                state[event.index] = stateValue
            }
            else {
                const auto = this._auto[event.p][event.index]
                if (stateValue === 0x41) {
                    if (auto.once) {
                        state[event.index - 8] = 0x41
                        auto.timeout = window.setInterval(() => {
                            state[event.index - 8] = auto.beDown ? 0x41 : 0x40
                            auto.beDown = !auto.beDown
                        }, interval)
                        auto.once = false
                    }
                }
                else {
                    clearInterval(auto.timeout)
                    state[event.index - 8] = 0x40
                    auto.once = true
                    auto.beDown = false
                }
            }
        })
    }

    getState(keyCode: string) {
        return this._events[keyCode]
    }

    init() {
        this._events = {}
    }
}

const controllerState = new ControllerState()

export {
    nes,
    nesFrame,
    getNesData,
    loadNesData,
    rom,
    controllerState,
}
