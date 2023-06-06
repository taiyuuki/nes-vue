import nes from 'src/components'
import NesVue from 'src/components/NesVue.vue'

export type NesVueInstance = InstanceType<typeof NesVue>
export type {
    Controller, NesVueProps, EmitErrorObj, SavedOrLoaded,
} from 'src/components/types'
export { NesVue }
export default nes
