import type { Directive } from 'vue'
import type { Controller } from 'src/types'
import { controllerState } from 'src/nes'
import { interval, P1_DEFAULT, P2_DEFAULT } from 'src/composables/use-controller'
import { key_in, object_keys } from '@taiyuuki/utils'

const _events: Record<string, Record<string, ((e: Event) => void)[]>> = {}

function addEvent(el: HTMLElement, eventId: string, type: string, fn: <E extends Event>(e: E) => void, options?: boolean | AddEventListenerOptions) {
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

export const vGamepad: Directive<HTMLElement, keyof Controller>  = (target, binding) => {
    const key = binding.value?.toUpperCase()
    if (!key) {
        throw '[nes-vue] v-gamepad value is required'
    }
    const arg = (binding.arg ?? '').toLowerCase()
    const checkPlayer = binding.modifiers.p2 || binding.modifiers.P2
    const player = checkPlayer ? P2_DEFAULT : P1_DEFAULT
    const id = `gamepad-${arg + (checkPlayer ? 'p2' : 'p1') + '-' + key}`
    removeEventAll(target, id)
    if (arg === 'touch') {
        addEvent(target, id, 'touchstart', () => {
            if (key_in(key, player)) {controllerState.emit(player[key], 0x41, interval)}
        })
        addEvent(target, id, 'touchend', () => {
            if (key_in(key, player)) {controllerState.emit(player[key], 0x40, interval)}
        })
        addEvent(target, id, 'touchcancel', () => {
            if (key_in(key, player)) {controllerState.emit(player[key], 0x40, interval)}
        })
    }
    else {
        addEvent(target, id, 'mousedown', () => {
            if (key_in(key, player)) {controllerState.emit(player[key], 0x41, interval)}
        })
        addEvent(target, id, 'mouseup', () => {
            if (key_in(key, player)) {controllerState.emit(player[key], 0x40, interval)}
        })
        addEvent(target, id, 'mouseleave', () => {
            if (key_in(key, player)) {controllerState.emit(player[key], 0x40, interval)}
        })
        if (arg && arg !== 'mouse') {
            console.warn('[nes-vue] argument should be mouse or touch, changed to default: mouse')
        }
    }
}
