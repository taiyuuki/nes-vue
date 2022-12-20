import nes from './nes'
import NesVue from './nes/NesVue.vue'

export interface NesVueInstance extends InstanceType<typeof NesVue> {
  pause: () => void
  play: () => void
}
export type {
  Controller, NesVueProps, EmitErrorObj, SavedOrLoaded,
} from 'src/nes/types'
export { NesVue }
export default nes