export default {
    label: 'English',
    lang: 'en',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'API', link: '/guide/getting-started' },
        ],

        sidebar: [
            {
                text: 'Guide',
                items: [
                    { text: 'Getting Started', link: '/guide/getting-started' },
                    { text: 'Props', link: '/guide/props' },
                    { text: 'Controller', link: '/guide/controller' },
                    { text: 'Directives', link: '/guide/directives' },
                    { text: 'Events', link: '/guide/events' },
                    { text: 'Methods', link: '/guide/methods' },
                    { text: 'TAS Video', link: '/guide/replay' },
                    { text: 'Cheat Code', link: '/guide/cheat' },
                ],
            },
        ],

        outlineTitle: 'Outline',
    },
}
