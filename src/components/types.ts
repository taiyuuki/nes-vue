
export interface EmitErrorObj {
    code: number
    message: string
}

export interface Controller {
    UP: string
    DOWN: string
    LEFT: string
    RIGHT: string
    A: string
    B: string
    C: string
    D: string
    SELECT: string
    START: string
}

export interface ControllerStateType {
    p: number
    index: number
}

export interface SavedOrLoaded {
    id: string
    message: string
    target: 'indexedDB' | 'localStorage'
}

export interface NesVueProps {
    url: string
    autoStart?: boolean
    width?: number | string
    height?: number | string
    label?: string
    gain?: number
    clip?: boolean
    storage?: boolean
    debugger?: boolean
    turbo?: number
    p1?: Partial<Controller>
    p2?: Partial<Controller>
}

export interface NesVueEmits {
    (e: 'fps', fps: number): void
    (e: 'success'): void
    (e: 'error', error: EmitErrorObj): void
    (e: 'saved', saved: SavedOrLoaded): void
    (e: 'loaded', loaded: SavedOrLoaded): void
    (e: 'update:url', path: string): void
    (e: 'removed', id: string): void
}

export interface Automatic {
    timeout: number
    beDown: boolean
    once: boolean
}

export type Player = 'p1' | 'p2'

export interface FrameData {
    [frame: number]: number[]
}

export interface SaveData {
    path: string
    data: {
        cpu: any
        mmap: any
        ppu: any
        vramMemZip: any
        nameTableZip: any
        cpuMemZip: any
        ptTileZip: any
        frameCounter: number
    }
}

export interface PlaybackData {
    length: number
    frameList: number[]
    frameData: FrameData
    nes: SaveData
}

export interface TasState {
    [frame: number]: {
        p1: number[]
        p2: number[]
    }
}
