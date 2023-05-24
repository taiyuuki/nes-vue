import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import rollupDelete from 'rollup-plugin-delete'
import dts from 'vite-plugin-dts'
import path from 'path'

function resolve(dir: string) {
    return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        dts({
            outputDir: 'dist',
            staticImport: true,
            insertTypesEntry: true,
        }),
        vue({ reactivityTransform: true }),
    ],
    resolve: {
        alias: {
            '@': resolve('src'),
            src: resolve('src'),
            common: resolve('src/common'),
            components: resolve('src/components'),
            composables: resolve('src/composables'),
        },
    },
    build: {
        lib: {
            entry: resolve('src/index.ts'),
            name: 'NesVue',
            fileName: (format) => `nes-vue.${format}.js`,
        },
        rollupOptions: {
            // 打包时忽略vue
            external: ['vue'],
            output: {
                // 为外部依赖提供全局变量
                globals: { NesVue: 'NesVue' },
            },
            plugins: [
                rollupDelete({
                    targets: ['dist/*.{ico,txt,svg,nes,NES}'],
                    hook: 'generateBundle',
                }),
            ],
        },
    },
})
