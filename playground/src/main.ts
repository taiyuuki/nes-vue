import { createApp } from 'vue'
import App from './App.vue'
import route from './router'
import pinia from './stores'
import './css/app.scss'

createApp(App).use(pinia).use(route).mount('#app')
