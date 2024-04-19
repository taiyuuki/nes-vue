import type { Directive } from 'vue'
import type { ControllerKey } from 'src/types'
import { P1_DEFAULT, P2_DEFAULT, emitControllerState } from 'src/composables/use-controller'
import { key_in, object_keys } from '@taiyuuki/utils'

const _events: Record<string, Record<string, ((e: Event)=> void)[]>> = {}

function addEvent(el: HTMLElement, eventId: string, type: string, fn: <E extends Event>(e: E)=> void, options?: AddEventListenerOptions | boolean) {
    el.addEventListener(type, fn, options)
    _events[eventId] = _events[eventId] || {}
    _events[eventId][type] = _events[eventId][type] || []
    _events[eventId][type].push(fn)
}

function removeEventAll(el: HTMLElement, eventId: string) {
    if (_events[eventId]) {
        object_keys(_events[eventId]).forEach(type => {
            _events[eventId][type].forEach(fn => {
                el.removeEventListener(type, fn)
            })
            delete _events[eventId][type]
        })
        delete _events[eventId]
    }
}

function resolveKeys(key: ControllerKey | ControllerKey[]) {
    if (typeof key === 'string') {
        key = [key]
    }

    return Array.from(new Set(key)).map(key => key.toUpperCase())
        .sort() as ControllerKey[]
}

/**
 * v-gamepad directive
 * @example
 * ```vue
 * <script setup>
 * import { NesVue, vGamepad } from 'nes-vue'
 * </script>
 *
 * <template>
 *   <nes-vue
 *     url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
 *   />
 *   <button v-gamepad="'RIGHT'">RIGHT</button>
 * </template>
 * ```
 */
export const vGamepad: Directive<HTMLElement, ControllerKey | ControllerKey[]> = (target, binding) => {
    if (!binding.value) {
        throw '[nes-vue] v-gamepad value is required'
    }
    const arg = (binding.arg ?? '').toLowerCase()
    const checkPlayer = binding.modifiers.p2 || binding.modifiers.P2
    const player = checkPlayer ? P2_DEFAULT : P1_DEFAULT
    if (binding.oldValue) {
        const oldKeys = resolveKeys(binding.oldValue).filter(key => key_in(key, player))
        const oldEventId = `gamepad-${`${arg + (checkPlayer ? 'p2' : 'p1')}-${oldKeys.join('-')}`}`
        removeEventAll(target, oldEventId)
    }
    const keys = resolveKeys(binding.value).filter(key => key_in(key, player))
    const eventId = `gamepad-${`${arg + (checkPlayer ? 'p2' : 'p1')}-${keys.join('-')}`}`
    if (keys.length) {
        if (arg === 'touch') {
            addEvent(target, eventId, 'touchstart', () => {
                keys.forEach(key => {
                    emitControllerState(player[key], 0x41)
                })
            })
            addEvent(target, eventId, 'touchend', () => {
                keys.forEach(key => {
                    emitControllerState(player[key], 0x40)
                })
            })
            addEvent(target, eventId, 'touchcancel', () => {
                keys.forEach(key => {
                    emitControllerState(player[key], 0x40)
                })
            })
        } else {
            addEvent(target, eventId, 'mousedown', () => {
                keys.forEach(key => {
                    emitControllerState(player[key], 0x41)
                })
            })
            addEvent(target, eventId, 'mouseup', () => {
                keys.forEach(key => {
                    emitControllerState(player[key], 0x40)
                })
            })
            addEvent(target, eventId, 'mouseleave', () => {
                keys.forEach(key => {
                    emitControllerState(player[key], 0x40)
                })
            })
            if (arg && arg !== 'mouse') {
                console.warn('[nes-vue] argument should be mouse or touch, changed to default: mouse')
            }
        }
    }
}
