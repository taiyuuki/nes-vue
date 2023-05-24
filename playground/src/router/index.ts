import {
    createMemoryHistory,
    createRouter,
    createWebHashHistory,
} from 'vue-router'

import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

const routes =  setupLayouts(generatedRoutes)
routes.push({
    path: '/:catchAll(.*)*',
    component: () => import('pages/404.vue'),
})
// hash mode
const createHistory = import.meta.env.SSR ? createMemoryHistory : createWebHashHistory

const route = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(),
})
export default route
