import { download_blob, url_to_blob } from '@taiyuuki/utils'
import type { ReplStore } from '@vue/repl'
import { fm2s, roms } from './roms'
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
        const romBlob = await url_to_blob(rom)
        publicFolder.file(rom, romBlob)
    }

    // .fm2 files
    for await (const fm2 of fm2s) {
        const fm2Blob = await url_to_blob(fm2[0])
        publicFolder.file(fm2[0], fm2Blob)
    }

    const project = await zip.generateAsync({ type: 'blob' })
    download_blob(project, 'nes-vue-demo')
}
