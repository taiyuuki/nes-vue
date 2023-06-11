import { defineConfig } from 'vitepress'
import root from './config/en'
import zh from './config/zh'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'NES Vue',
    description: 'NES Vue documents',

    head: [
        ['link', { rel: 'icon', href: '/favicon-32x32.png' }],
        ['link', { rel: 'icon', href: '/favicon-16x16.png' }],
        ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
        ['link', { rel: 'manifest', href: '/site.webmanifest' }],
        ['meta', { name: 'msapplication-TileColor', content: '#da532c' }],
        ['meta', { name: 'theme-color', content: '#ffffff' }],
    ],

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
        logo: '/nes-vue.svg',
        outline: {
            level: [2, 3],
        },
    },
})
