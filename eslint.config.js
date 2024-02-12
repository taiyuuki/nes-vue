import elc from '@antfu/eslint-config'

export default elc({
    vue: true,
    typescript: true,
    files: ['**/*.vue', '**/*.ts'],
    stylistic: {
        indent: 4,
        quotes: 'single',
    },
    rules: {
        'curly': 'off',
        'unicorn/number-literal-case': 'off',
        'no-throw-literal': 'off',
        'import/no-mutable-exports': 'off',
        'prefer-promise-reject-errors': 'off',
        'no-alert': 'off',
        'ts/ban-types': 'off',
    },
    ignores: [
        '**/*/dist',
        '**/*/node_modules',
        '/example',
        '/playground',
        '/docs/.vitepress/cache',
    ],
})
