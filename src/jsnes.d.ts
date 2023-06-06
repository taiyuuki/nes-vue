declare module "jsnes" {
  export interface NESInstance {
    romData: string;
    cpu: CPU;
    mmap: Mmap;
    ppu: PPU;
    videoMode: boolean
    frameCounter: number
    controllers: Controller[]
    toJSON(): NESInstance
    fromJSON(json: any): void
    reset(): void
    frame(): void
    buttonUp(player: number, button: number): boolean
    buttonDown(player: number, button: number): boolean
    loadROM(url: string): void
    getFPS(): number
  }

  export interface Controller {
    state: number[]
  }

  export interface NesOptions {
    onFrame(frameBuffer: number[]): void
    onAudioSample(left: number, right: number): void
    sampleRate?: number
  }

  export type NESConstructor = new (options: NesOptions) => NESInstance

  export interface CPU {
    mem: Array<number>;
    cyclesToHalt: number;
    irqRequested: boolean;
    irqType: null;
    toJSON(): Partial<CPU>;
    fromJSON(json: any): void
    reset(): void
  }

  export interface Mmap {
    joy1StrobeState: number;
    joy2StrobeState: number;
    joypadLastWrite: number;
    command: number;
    prgAddressSelect: number;
    chrAddressSelect: number;
    pageNumber: null;
    irqCounter: number;
    irqLatchValue: number;
    irqEnable: number;
    prgAddressChanged: boolean;
    toJSON(): Partial<Mmap>;
    fromJSON(json: any): void
    reset(): void
  }

  export interface PPU {
    vramMem: number[];
    spriteMem: number[];
    vramBufferedReadValue: number;
    firstWrite: boolean;
    currentMirroring: number;
    vramMirrorTable: number[];
    ntable1: null[];
    sramAddress: number;
    hitSpr0: boolean;
    sprPalette: number[];
    imgPalette: number[];
    curX: number;
    scanline: number;
    lastRenderedScanline: number;
    clipToTvSize: boolean;
    curNt: null;
    scantile: null[];
    attrib: null[];
    buffer: null[];
    bgbuffer: null[];
    pixrendered: null[];
    requestEndFrame: boolean;
    nmiOk: boolean;
    dummyCycleToggle: boolean;
    nmiCounter: number;
    validTileData: null;
    scanlineAlreadyRendered: null;
    nameTable: NameTable[];
    ptTile: PtTile[];
    toJSON(): Partial<PPU>;
    fromJSON(json: any): void
    reset(): void
  }

  export interface NameTable {
    tile: number[];
    attrib: number[];
  }

  export interface PtTile {
    opaque: boolean[];
    pix: number[];
  }
  export interface ControllerOptions {
    BUTTON_UP: number
    BUTTON_DOWN: number
    BUTTON_LEFT: number
    BUTTON_RIGHT: number
    BUTTON_A: number
    BUTTON_B: number
    BUTTON_SELECT: number
    BUTTON_START: number
  }
  type JSNES = {
    NES: NESConstructor, Controller: ControllerOptions
  }
  const jsnes: JSNES
  export default jsnes
}

declare interface FrameData {
  [frame: number]: number[]
}

declare interface SaveData {
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

declare interface PlaybackData {
  length: number,
  frameList: number[],
  frameData: FrameData,
  nes: SaveData
}

declare interface Replay {
  saveDatas: {
    [index: number]: SaveData
  }
  frameList: number[]
  dbIndex: number
  length: number
  push(saveData: SaveData, index: number): void
  get lastIndex(): number
  pop(): SaveData
  save(): void
  load(): void
}