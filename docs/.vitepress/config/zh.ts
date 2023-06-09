export default {
    label: '简体中文',
    lang: 'zh-CN',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '主页', link: '/zh/index' },
            { text: '开始使用', link: '/zh/guide/getting-started' },
        ],

        sidebar: [
            {
                text: '指南',
                items: [
                    { text: '开始使用', link: '/zh/guide/getting-started' },
                    { text: '属性', link: '/zh/guide/props' },
                    { text: '事件', link: '/zh/guide/events' },
                    { text: '方法', link: '/zh/guide/methods' },
                    { text: '播放录像', link: '/zh/guide/replay' },
                ],
            },
        ],

        outlineTitle: '目录',
    },
}
