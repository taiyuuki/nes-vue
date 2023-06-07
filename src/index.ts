import nes_vue from 'src/components'
import NesVue from 'src/components/NesVue.vue'
import { nes } from 'src/nes'
import { controllerState } from 'src/tas'

export type NesVueInstance = InstanceType<typeof NesVue>
export type {
    Controller, NesVueProps, EmitErrorObj, SavedOrLoaded,
} from 'src/components/types'
export { NesVue, nes, controllerState }
export default nes_vue
