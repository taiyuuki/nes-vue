declare module "jsnes" {
  class NES {
    constructor(nesOptions: NesOptions)
    romData: any
    cpu: {
      fromJSON(cpu:any): void,
      reset(): void,
      irqRequested: boolean
    }
    mmap: {
      fromJSON(mmap:any): void,
      reset(): void,
    }
    ppu: {
      fromJSON(ppu:any): void,
      reset(): void,
    }
    loadROM(buffer: Buffer | string): void
    frame(): void
    buttonDown(n: number, button: string): void
    buttonUp(n: number, button: string): void
    reset(): void
    getFPS(): number
    toJSON(): string
    fromJSON(saveDate: any): void
  }
  export interface ControllerOptions {
    BUTTON_UP: string
    BUTTON_DOWN: string
    BUTTON_LEFT: string
    BUTTON_RIGHT: string
    BUTTON_A: string
    BUTTON_B: string
    BUTTON_SELECT: string
    BUTTON_START: string
  }
  const jsnes = { NES, Controller: ControllerOptions }
  export default jsnes
}

type NesOptions = {
  onFrame(frameBuffer: Buffer): void
  onAudioSample(left: number, right: number): void
  sampleRate?: number
};

type Game = {
  name: string
  path: string
};
