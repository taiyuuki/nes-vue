import NesEux from "./NesEux.vue";
import { App } from "vue";
export default {
  install(app: App) {
    app.component(NesEux.name, NesEux);
  },
};
