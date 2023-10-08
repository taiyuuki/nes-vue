import NesVue from 'src/components/NesVue.vue'
import { nes } from 'src/nes'
import { vGamepad } from 'src/directives/v-gamepad'

export type NesVueInstance = InstanceType<typeof NesVue>
export type {
    Controller, NesVueProps, EmitErrorObj, SavedOrLoaded,
} from 'src/components/types'
export { NesVue, nes, vGamepad }
