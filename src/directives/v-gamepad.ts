import type { Directive } from 'vue'
import type { Controller } from 'src/components/types'
import { controllerState } from 'src/nes'
import { interval, P1_DEFAULT, P2_DEFAULT } from 'src/composables/use-controller'
import { key_in } from '@taiyuuki/utils'

let key = ''
let player_1 = false
let player_2 = false
function down() {
    if (player_1 && key_in(key, P1_DEFAULT)) {
        controllerState.emit(P1_DEFAULT[key], 0x41, interval)
    }
    if (player_2 && key_in(key, P2_DEFAULT)) {
        controllerState.emit(P2_DEFAULT[key], 0x41, interval)
    }
}

function up() {
    if (player_1 && key_in(key, P1_DEFAULT)) {
        controllerState.emit(P1_DEFAULT[key], 0x40, interval)
    }
    if (player_2 && key_in(key, P2_DEFAULT)) {
        controllerState.emit(P2_DEFAULT[key], 0x40, interval)
    }
}

export const vGamepad: Directive<HTMLElement, keyof Controller> = {
    mounted(target: HTMLElement, binding) {
        key = binding.value?.toUpperCase()
        if (binding.modifiers.p2 || binding.modifiers.P2) {
            player_2 = true
        }
        else {
            player_1 = true
        }
        const arg = binding.arg?.toLowerCase()
        if (arg === 'touch') {
            target.addEventListener('touchstart', down)
            target.addEventListener('touchend', up)
        }
        else {
            target.addEventListener('mousedown', down)
            target.addEventListener('mouseup', up)
            target.addEventListener('mouseleave', up)
            if (arg && arg !== 'mouse') {
                console.warn('[nes-vue] argument should be mouse or touch, changed to default: mouse')
            }
        }
    },
    beforeUnmount(target: HTMLElement, binding) {
        const arg = binding.arg?.toLowerCase()
        if (arg === 'touch') {
            target.removeEventListener('touchstart', down)
            target.removeEventListener('touchend', up)
        }
        else {
            target.removeEventListener('mousedown', down)
            target.removeEventListener('mouseup', up)
            target.removeEventListener('mouseleave', up)
        }
    },
}
