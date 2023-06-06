import { get_fill_arr } from '@taiyuuki/utils'
import type { NameTable, PtTile } from 'jsnes'

export function fillFalse(num: number): boolean[] {
    return Array(num).fill(false)
}

export function gpFilter<T>(arr: T[]): NonNullable<T>[] {
    return arr.filter(Boolean) as NonNullable<T>[]
}

export function getVramMirrorTable() {
    return get_fill_arr(0x8000, 0).map((_, i) => i)
}

export function compressArray(arr: number[] | Uint32Array) {
    const compressed = []
    let current = arr[0]
    let count = 1
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] === current) {
            count++
        }
        else {
            if (count > 1) {
                compressed.push(count)
                compressed.push(current)
            }
            else {
                compressed.push(-current - 1)
            }
            current = arr[i]
            count = 1
        }
    }
    compressed.push(count)
    compressed.push(current)
    return compressed
}

export function decompressArray(compressed: number[]): number[] {
    const decompressed = []
    for (let i = 0; i < compressed.length;) {
        if (compressed[i] < 0) {
            decompressed.push(-compressed[i] - 1)
            i++
        }
        else {
            const count = compressed[i]
            const value = compressed[i + 1]
            for (let j = 0; j < count; j++) {
                decompressed.push(value)
            }
            i += 2
        }
    }
    return decompressed
}

export function compressPtTile(ptTile: PtTile[]): [number[], number[]] {
    const opaques: number[] = []
    const pixs: number[] = []
    for (let i = 0; i < ptTile.length; i++) {
        for (let j = 0; j < ptTile[i].opaque.length; j++) {
            if (ptTile[i].opaque[j] === false) {
                opaques.push(0)
            }
            else {
                opaques.push(1)
            }
        }
        pixs.push(...ptTile[i].pix)
    }
    return [compressArray(opaques), compressArray(pixs)]
}

export function decompressPtTile(compressed: [number[], number[]]) {
    const ptTile: PtTile[] = []
    let opaque: boolean[] = Array(8)
    let pix: number[] = []
    const opaques = decompressArray(compressed[0])
    const pixs = decompressArray(compressed[1])
    for (let i = 0; i < 512; i += 1) {
        for (let j = 0; j < 8; j += 1) {
            if (opaques[i * 8 + j] === 0) {
                opaque[j] = false
            }
        }
        for (let j = 0; j < 64; j += 1) {
            pix[j] = pixs[i * 64 + j]
        }
        ptTile.push({
            opaque,
            pix,
        })
        opaque = Array(8)
        pix = []
    }
    return ptTile
}

export function compressNameTable(nameTable: NameTable[]): [number[], number[]] {
    const tile: number[] = []
    const attrib: number[] = []
    nameTable.reduce((prev, curr) => {
        tile.push(...curr.tile)
        attrib.push(...curr.attrib)
        return prev
    }, tile)
    return [compressArray(tile), compressArray(attrib)]
}

export function decompressNameTable(compressed: [number[], number[]]) {
    const nameTable: NameTable[] = []
    let tile: number[] = []
    let attrib: number[] = []
    const tiles = decompressArray(compressed[0])
    const attrs = decompressArray(compressed[1])
    for (let i = 0; i < 1024 * 4; i += 1) {
        tile.push(tiles[i])
        attrib.push(attrs[i])
        if ((i + 1) % 1024 === 0) {
            nameTable.push({ tile, attrib })
            tile = []
            attrib = []
        }
    }
    return nameTable
}
