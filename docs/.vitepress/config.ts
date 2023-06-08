import { defineConfig } from 'vitepress'
import en from './config/en'
import zh from './config/zh'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'NES Vue',
    description: 'NES Vue documents',
    locales: {
        root: en,
        zh,
    },
})
