import { defineConfig } from 'vitepress'
import root from './config/en'
import zh from './config/zh'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'NES Vue',
    description: 'NES Vue documents',

    locales: {
        root,
        zh,
    },

    markdown: {
        theme: {
            light: 'light-plus',
            dark: 'github-dark',
        },
    },
    themeConfig: {
        outline: {
            level: [2, 3],
        },
    },
})
