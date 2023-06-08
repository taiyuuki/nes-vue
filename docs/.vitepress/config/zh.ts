export default {
    label: '简体中文',
    lang: 'zh-CN',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '主页', link: '/zh/index' },
            { text: '示例', link: '/zh/markdown-examples' },
        ],

        sidebar: [
            {
                text: '示例',
                items: [
                    { text: 'Markdown示例', link: '/zh/markdown-examples' },
                    { text: 'Runtime API示例', link: '/zh/api-examples' },
                ],
            },
        ],
    },
}
