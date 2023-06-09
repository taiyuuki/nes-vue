export default {
    label: 'English',
    lang: 'en',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Getting Started', link: '/guide/getting-started' },
        ],

        sidebar: [
            {
                text: 'Guide',
                items: [
                    { text: 'Getting Started', link: '/guide/getting-started' },
                    { text: 'Props', link: '/guide/props' },
                    { text: 'Events', link: '/guide/events' },
                    { text: 'Methods', link: '/guide/methods' },
                    { text: 'TAS Video', link: '/guide/replay' },
                ],
            },
        ],

        outlineTitle: 'Outline',
    },
}
