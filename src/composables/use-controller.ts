import { object_keys } from '@taiyuuki/utils'
import type { ControllerMaps, NesVueProps, Player } from 'src/components/types'
import { fillFalse, gpFilter } from 'src/utils'
import type { ComputedRef } from 'vue'
import { onMounted, onBeforeUnmount, computed } from 'vue'

const THRESHOLD = 0.3

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
}

const keyMaps = {
    UP: 'BUTTON_UP',
    DOWN: 'BUTTON_DOWN',
    LEFT: 'BUTTON_LEFT',
    RIGHT: 'BUTTON_RIGHT',
    A: 'BUTTON_A',
    B: 'BUTTON_B',
    C: 'BUTTON_A',
    D: 'BUTTON_B',
    SELECT: 'BUTTON_SELECT',
    START: 'BUTTON_START',
}
const keys = object_keys(keyMaps)

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
                document.dispatchEvent(new KeyboardEvent('keydown', {
                    code: this.gamepad_btns.value[player][bindex],
                }))
                this.axesHolding[player][aindex] = true
            }
        }
        else if (hold) {
            document.dispatchEvent(new KeyboardEvent('keyup', {
                code: this.gamepad_btns.value[player][bindex],
            }))
            this.axesHolding[player][aindex] = false
        }
    }

    btnHandler(player: Player, btn: GamepadButton, bindex: number) {
        const hold = this.btnHolding[player]?.[bindex]
        if (btn.pressed) {
            if (hold) {
                return
            }
            this.btnHolding[player][bindex] = true
            document.dispatchEvent(new KeyboardEvent('keydown', {
                code: this.gamepad_btns.value[player][bindex],
            }))
        }
        else if (hold) {
            this.btnHolding[player][bindex] = false
            document.dispatchEvent(new KeyboardEvent('keyup', {
                code: this.gamepad_btns.value[player][bindex],
            }))
        }
    }

    run() {
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

    frame() {
        this.run()
        cancelAnimationFrame(this.animationFrame)
        this.animationFrame = requestAnimationFrame(this.frame.bind(this))
    }

    close() {
        this.btnHolding.p1.fill(false)
        this.btnHolding.p2.fill(false)
        cancelAnimationFrame(this.animationFrame)
    }
}

export const useController = (props: NesVueProps): [ComputedRef<ControllerMaps>, ComputedRef<string[]>] => {
    const p1 = computed(() => Object.assign(P1_DEFAULT, props.p1))
    const p2 = computed(() => Object.assign(P2_DEFAULT, props.p2))

    const controller = computed(() => {
        const options: Record<string, any> = {}
        keys.forEach(key => {
            options[p1.value[key]] = {
                key,
                p: 1,
                value: keyMaps[key],
            }
            if (key in p2.value) {
                options[p2.value[key] as string] = {
                    key,
                    p: 2,
                    value: keyMaps[key],
                }
            }
        })
        return options as ControllerMaps
    })

    const turbo_btns = computed(() => {
        return [p1.value.C, p1.value.D, p2.value.C, p2.value.D]
    })

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
        gamepad.frame()
    })

    onBeforeUnmount(() => {
        gamepad.close()
    })

    return [controller, turbo_btns]
}
