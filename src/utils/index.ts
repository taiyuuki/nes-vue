import { get_fill_arr } from '@taiyuuki/utils'

export function ignoreSourceError(fun: Function) {
    try {
        fun()
    }
    catch (e) {
        return
    }
}

export function fillFalse(num: number): boolean[] {
    return Array(num).fill(false)
}

export function gpFilter<T>(arr: T[]): NonNullable<T>[] {
    return arr.filter(Boolean) as NonNullable<T>[]
}

export function getVramMirrorTable() {
    return get_fill_arr(0x8000, 0).map((_, i) => i)
}

export function compressArray(arr: number[]) {
    const compressed = []
    let current = arr[0]
    let count = 1
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] == current && count < 255) {
            count++
        }
        else {
            compressed.push(count)
            compressed.push(current)
            current = arr[i]
            count = 1
        }
    }
    compressed.push(count)
    compressed.push(current)
    return compressed
}

export function decompressArray(compressed: number[]) {
    const decompressed = []
    for (let i = 0; i < compressed.length; i += 2) {
        const count = compressed[i]
        const value = compressed[i + 1]
        for (let j = 0; j < count; j++) {
            decompressed.push(value)
        }
    }
    return decompressed
}

export function getPtTile() {
    return get_fill_arr(512, 0).map(() => ({
        opaque: get_fill_arr(8, false),
        pix: get_fill_arr(64, 0),
    }))
}

interface NameTable {
    tile: number[]
    attrib: number[]
}

export function compressNameTable(nameTable: [NameTable, NameTable, NameTable, NameTable]): [number[], number[]] {
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
