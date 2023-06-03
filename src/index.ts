import nes from 'src/components'
import NesVue from 'src/components/NesVue.vue'

export interface NesVueInstance extends InstanceType<typeof NesVue> {
    pause: () => void
    play: () => void
}
export type {
    Controller, NesVueProps, EmitErrorObj, SavedOrLoaded,
} from 'src/components/types'
export { NesVue }
export default nes
