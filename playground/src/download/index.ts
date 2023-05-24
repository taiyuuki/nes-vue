import { downloadBlob, urlToBlob } from '@taiyuuki/utils'
import type { ReplStore } from '@vue/repl'
import { roms } from './roms'
import { html, main, pkg, readme, viteConfig } from './files'

export async function downloadProject(store: ReplStore) {
    if (!confirm('Download project files?')) {
        return
    }
    const JSzip = (await import('jszip')).default

    const zip = new JSzip()
    const srcFolder = zip.folder('src')!
    const publicFolder = zip.folder('public')!

    const files = store.getFiles()

    // base files
    zip.file('index.html', html)
    zip.file('package.json', pkg)
    zip.file('vite.config.js', viteConfig)
    zip.file('README.md', readme)
    srcFolder.file('main.js', main)

    // playground files
    for (const file in files) {
        srcFolder.file(file, files[file])
    }

    // .nes files
    for await (const rom of roms) {
        const romBlob = await urlToBlob(rom)
        publicFolder.file(rom, romBlob)
    }

    const project = await zip.generateAsync({ type: 'blob' })
    downloadBlob(project, 'nes-vue-demo')
}
