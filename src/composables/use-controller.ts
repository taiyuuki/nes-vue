import { math_between, object_keys } from '@taiyuuki/utils'
import type { NesVueProps, Player } from 'src/types'
import { controllerState } from 'src/nes'
import { fillFalse, gpFilter } from 'src/utils'
import type { ComputedRef } from 'vue'
import { onMounted, onBeforeUnmount, computed, watch } from 'vue'

// threshold of level.
const THRESHOLD = 0.3

// buttonDown - 0x41
// buttonUp - 0x40
// controllerState - [A, B, SELECT, START, UP, DOWN, LEFT, RIGHT]
// for example: [0x40, 0x40, 0x40, 0x41, 0x40, 0x40, 0x40, 0x40]
// means: Start button is pressed.

const KEYS_INDEX = {
    A: 0,
    B: 1,
    SELECT: 2,
    START: 3,
    UP: 4,
    DOWN: 5,
    LEFT: 6,
    RIGHT: 7,
    C: 8,
    D: 9,
}

export const P1_DEFAULT = {
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
}

export const P2_DEFAULT = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    A: 'Numpad2',
    B: 'Numpad1',
    C: 'Numpad5',
    D: 'Numpad4',
    SELECT: 'NumpadDecimal',
    START: 'NumpadEnter',
}

// const controllerState = new ControllerState()
export let interval = 1000 / (2 * 16)

export function emitControllerState(eventCode: string, state: 0x41 | 0x40) {
    controllerState.emit(eventCode, state, interval)
}

class GamepadManager {
    animationFrame: number
    axesHolding: Record<Player, boolean[]>
    btnHolding: Record<Player, boolean[]>
    gamepad_btns: ComputedRef<{ p1: string[]; p2: string[] }>

    constructor(gamepad_btns: ComputedRef<{ p1: string[]; p2: string[] }>) {
        window.addEventListener('gamepadconnected', this.connectHandler.bind(this, true))
        window.addEventListener('gamepaddisconnected', this.connectHandler.bind(this, false))
        this.animationFrame = requestAnimationFrame(this.frame.bind(this))
        this.btnHolding = {
            p1: fillFalse(20),
            p2: fillFalse(20),
        }
        this.axesHolding = {
            p1: fillFalse(4),
            p2: fillFalse(4),
        }
        this.gamepad_btns = gamepad_btns
    }

    get gamepads() {
        return gpFilter(navigator.getGamepads())
    }

    connectHandler(state: boolean, e: GamepadEvent) {
        if (state) {
            this.gamepads[e.gamepad.index] = e.gamepad
        }
        else if (this.gamepads.length === 0) {
            this.close()
        }
    }

    axesHandler(player: Player, check: boolean, aindex: number, bindex: number) {
        const hold = this.axesHolding[player]?.[aindex]
        if (check) {
            if (!hold) {
                controllerState.emit(this.gamepad_btns.value[player][bindex], 0x41, interval)
                this.axesHolding[player][aindex] = true
            }
        }
        else if (hold) {
            controllerState.emit(this.gamepad_btns.value[player][bindex], 0x40, interval)
            this.axesHolding[player][aindex] = false
        }
    }

    btnHandler(player: Player, btn: GamepadButton, bindex: number) {
        const hold = this.btnHolding[player]?.[bindex]
        if (btn.pressed) {
            if (hold) {
                return
            }
            controllerState.emit(this.gamepad_btns.value[player][bindex], 0x41, interval)
            this.btnHolding[player][bindex] = true
        }
        else if (hold) {
            controllerState.emit(this.gamepad_btns.value[player][bindex], 0x40, interval)
            this.btnHolding[player][bindex] = false
        }
    }

    frame() {
        for (let gindex = 0; gindex < this.gamepads.length; gindex++) {
            if (gindex > 1) {
                break
            }
            const player = `p${gindex + 1}` as Player
            const gamepad = this.gamepads[gindex]

            gamepad.buttons.forEach(this.btnHandler.bind(this, player))

            const lr = gamepad.axes[0]
            const tb = gamepad.axes[1]

            this.axesHandler(player, lr > THRESHOLD, 0, 15)
            this.axesHandler(player, lr < -THRESHOLD, 1, 14)
            this.axesHandler(player, tb > THRESHOLD, 2, 13)
            this.axesHandler(player, tb < -THRESHOLD, 3, 12)
        }
    }

    run() {
        this.frame()
        cancelAnimationFrame(this.animationFrame)
        this.animationFrame = requestAnimationFrame(this.run.bind(this))
    }

    close() {
        this.btnHolding.p1.fill(false)
        this.btnHolding.p2.fill(false)
        this.axesHolding.p1.fill(false)
        this.axesHolding.p2.fill(false)
        cancelAnimationFrame(this.animationFrame)
    }
}

export const useController = (props: NesVueProps): (eventCode: string, state: 0x41 | 0x40) => void => {
    const p1 = computed(() => Object.assign(P1_DEFAULT, props.p1))
    const p2 = computed(() => Object.assign(P2_DEFAULT, props.p2))

    function setTurboInterval() {
        interval = 1000 / (2 * math_between(props.turbo as number, 5, 20))
    }

    function setController() {
        controllerState.init()
        object_keys(KEYS_INDEX).forEach((key) => {
            const index = KEYS_INDEX[key]
            controllerState.on(p1.value[key], {
                p: 1,
                index,
            })
            controllerState.on(p2.value[key], {
                p: 2,
                index,
            })
        })
    }

    setController()
    setTurboInterval()

    watch(() => props.p1, setController, { deep: true })
    watch(() => props.p2, setController, { deep: true })
    watch(() => props.turbo, setTurboInterval)

    const gamepad_btns = computed(() => {
        return {
            p1: [
                p1.value.A,
                p1.value.C,
                p1.value.B,
                p1.value.D,
                '',
                '',
                '',
                '',
                p1.value.SELECT,
                p1.value.START,
                '',
                '',
                p1.value.UP,
                p1.value.DOWN,
                p1.value.LEFT,
                p1.value.RIGHT,
            ],
            p2: [
                p2.value.A,
                p2.value.C,
                p2.value.B,
                p2.value.D,
                '',
                '',
                '',
                '',
                p1.value.SELECT,
                p1.value.START,
                '',
                '',
                p2.value.UP,
                p2.value.DOWN,
                p2.value.LEFT,
                p2.value.RIGHT,
            ],
        }
    })

    const gamepad = new GamepadManager(gamepad_btns)

    onMounted(() => {
        gamepad.run()
    })

    onBeforeUnmount(() => {
        gamepad.close()
    })

    return emitControllerState
}
