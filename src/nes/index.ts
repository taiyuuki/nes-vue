import { get_fill_arr } from '@taiyuuki/utils'
import jsnes from 'jsnes'
import { onFrame } from 'src/animation'
import { getSampleRate, onAudioSample } from 'src/audio'
import { compressArray, compressNameTable, compressPtTile, decompressArray, decompressNameTable, decompressPtTile, getVramMirrorTable } from 'src/utils'
import { controllerState } from 'src/tas'
import type { EmitErrorObj, SaveData } from 'src/components/types'

const nes = new jsnes.NES({
    onFrame,
    onAudioSample,
    sampleRate: getSampleRate(),
})

nes.videoMode = false
nes.frameCounter = 1
nes.playbackMode = false
const rom = {
    buffer: null as string | null,
}

function nesFrame() {
    if (nes.videoMode && nes.frameCounter in controllerState) {
        const script = controllerState[nes.frameCounter]
        if (nes.frameCounter > 0) {
            nes.controllers[1].state = script.p1
            nes.controllers[2].state = script.p2
        }
    }
    nes.frame()
}

function getNesData(url: string) {
    const ppu = nes.ppu.toJSON()
    const cpu = nes.cpu.toJSON()
    const mmap = nes.mmap.toJSON()
    delete ppu.attrib
    delete ppu.bgbuffer
    delete ppu.buffer
    delete ppu.pixrendered
    delete ppu.vramMirrorTable
    const vramMemZip = compressArray(ppu.vramMem!)
    const nameTableZip = compressNameTable(ppu.nameTable!)
    const ptTileZip = compressPtTile(ppu.ptTile!)
    const cpuMemZip = compressArray(cpu.mem!)
    delete ppu.vramMem
    delete ppu.nameTable
    delete cpu.mem
    delete ppu.ptTile
    return {
        path: url,
        data: {
            cpu,
            mmap,
            ppu,
            vramMemZip,
            nameTableZip,
            cpuMemZip,
            ptTileZip,
            frameCounter: nes.frameCounter,
        },
    } as SaveData
}

function loadNesData(saveData: SaveData, emitError: (error: EmitErrorObj) => void, url?: string) {
    if (url && saveData.path !== url) {
        return emitError({
            code: 2,
            message: `Load Error: The saved data is inconsistent with the current game, saved: ${saveData.path}, current: ${url}.`,
        })
    }
    if (!rom.buffer) {
        return emitError({
            code: 3,
            message: 'Load Error: NES ROM is not loaded.',
        })
    }
    try {
        const { ppu, cpu, mmap, frameCounter, vramMemZip, nameTableZip, cpuMemZip, ptTileZip } = saveData.data
        ppu.attrib = get_fill_arr(0x20, 0)
        ppu.bgbuffer = get_fill_arr(0xF000, 0)
        ppu.buffer = get_fill_arr(0xF000, 0)
        ppu.pixrendered = get_fill_arr(0xF000, 0)
        ppu.vramMem = decompressArray(vramMemZip)
        ppu.nameTable = decompressNameTable(nameTableZip)
        ppu.vramMirrorTable = getVramMirrorTable()
        ppu.ptTile = decompressPtTile(ptTileZip)
        cpu.mem = decompressArray(cpuMemZip)
        nes.ppu.reset()
        nes.romData = rom.buffer
        nes.cpu.fromJSON(cpu)
        nes.mmap.fromJSON(mmap)
        nes.ppu.fromJSON(ppu)
        nes.frameCounter = frameCounter
    }
    catch (e) {
        console.error(e)
        emitError({
            code: 3,
            message: 'Load Error: The saved data is invalid.',
        })
    }
}

export {
    nes,
    nesFrame,
    getNesData,
    loadNesData,
    rom,
}
