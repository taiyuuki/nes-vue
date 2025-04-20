
import { NES } from '@nesjs/core'
import { onFrame } from 'src/animation'
import { getSampleRate, onAudioSample } from 'src/audio'
import type { ControllerStateType, EmitErrorObj, SaveData } from 'src/types'

const nes = new NES({
    onFrame,
    onAudioSample,
    sampleRate: getSampleRate(),
})

const rom = { buffer: null as Uint8Array | null }

function nesFrame() {
    nes.frame()
}

function getNesData(url: string) {
    return {
        path: url,
        data: nes.toJSON(),
    }
}

function loadNesData(saveData: SaveData, emitError: (error: EmitErrorObj)=> void, url?: string) {
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
        nes.fromJSON(saveData.data)
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

    emit(keyboadCode: string, stateValue: 0x40 | 0x41, interval: number) {
        this._events[keyboadCode]?.forEach(event => {
            const p = event.p as 1 | 2
            const state = nes.controllers[p].state
            if (event.index <= 7) {
                state[event.index] = stateValue
            }
            else {
                const auto = this._auto[p][event.index]
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
