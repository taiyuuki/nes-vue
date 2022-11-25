import nes from './nes'
import NesVue from './nes/NesVue.vue'

export type NesVueInstance = InstanceType<typeof NesVue>
export type {
  Controller, NesVueProps, EmitErrorObj, SavedOrLoaded,
} from 'src/nes/types'
export { NesVue }
export default nes