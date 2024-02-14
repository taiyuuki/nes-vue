import antfu from '@antfu/eslint-config'
import { tyk_eslint } from '@taiyuuki/eslint-config'

const config = new Promise((resolve) => {
    antfu(tyk_eslint({
        vue: true,
        typescript: true,
        rules: {
            'curly': 'off',
            'no-throw-literal': 'off',
            'import/no-mutable-exports': 'off',
            'prefer-promise-reject-errors': 'off',
        },

    })).then((v) => {
        resolve([...v, {
            ignores: [
                '**/dist',
                '**/node_modules',
                '**/playground',
                '**/docs',
            ],
        }])
    })
})

export default config
