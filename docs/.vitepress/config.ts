import { defineConfig } from 'vitepress'
import root from './config/en'
import zh from './config/zh'
import { copyright } from './utils'

const giteeSVG = `<svg xmlns="http://www.w3.org/2000/svg" name="zi_tmGitee" viewBox="0 0 2000 2000">
<path fill="currentColor"
    d="M898 1992q183 0 344-69.5t283-191.5q122-122 191.5-283t69.5-344q0-183-69.5-344T1525 477q-122-122-283-191.5T898 216q-184 0-345 69.5T270 477Q148 599 78.5 760T9 1104q0 183 69.5 344T270 1731q122 122 283 191.5t345 69.5zm199-400H448q-17 0-30.5-14t-13.5-30V932q0-89 43.5-163.5T565 649q74-45 166-45h616q17 0 30.5 14t13.5 31v111q0 16-13.5 30t-30.5 14H731q-54 0-93.5 39.5T598 937v422q0 17 14 30.5t30 13.5h416q55 0 94.5-39.5t39.5-93.5v-22q0-17-14-30.5t-31-13.5H842q-17 0-30.5-14t-13.5-31v-111q0-16 13.5-30t30.5-14h505q17 0 30.5 14t13.5 30v250q0 121-86.5 207.5T1097 1592z" />
</svg>`

const path = process.env.GITEE ? '/nes-vue-docs' : ''

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: process.env.GITEE ? '/nes-vue-docs/' : void 0,
    title: 'NES Vue',
    description: 'NES Vue documents',

    head: [
        ['link', { rel: 'icon', href: path + '/favicon-32x32.png' }],
        ['link', { rel: 'icon', href: path + '/favicon-16x16.png' }],
        ['link', { rel: 'apple-touch-icon', href: path + '/apple-touch-icon.png' }],
        ['link', { rel: 'manifest', href: path + '/site.webmanifest' }],
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
        footer: {
            message: 'Released under the MIT License.',
            copyright: copyright(),
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/taiyuuki/nes-vue' },
            {
                icon: {
                    svg: giteeSVG,
                },
                link: 'https://gitee.com/taiyuuki/nes-vue',
            },
        ],
        search: {
            provider: 'local',
        },
    },
})
