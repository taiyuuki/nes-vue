import NesVue from './NesVue.vue'
import type { App } from 'vue'
export default {
    install(app: App) {
        app.component(NesVue.name, NesVue)
    },
}
