declare module "jsnes" {
  class NES {
    constructor(nesOptions: NesOptions);
    loadROM(buffer: Buffer | string): void;
    frame(): void;
    buttonDown(n: number, button: string): void;
    buttonUp(n: number, button: string): void;
    reset(): void;
    getFPS(): number;
  }
  namespace Controller {
    let BUTTON_UP: string;
    let BUTTON_DOWN: string;
    let BUTTON_LEFT: string;
    let BUTTON_RIGHT: string;
    let BUTTON_A: string;
    let BUTTON_B: string;
    let BUTTON_SELECT: string;
    let BUTTON_START: string;
  }
  export { NES, Controller };
}

type NesOptions = {
  onFrame(frameBuffer: Buffer): void;
  onAudioSample(left: number, right: number): void;
  sampleRate?: number;
};

type Game = {
  name: string;
  path: string;
};
