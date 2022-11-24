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
  SELECT?: string
  START?: string
}

export interface SavedOrLoaded {
  id: string
  message: string
  target: 'indexedDB' | 'localStorage'
}

export interface NesVueProps {
  url: string
  autoStart: boolean
  width: number | string
  height: number | string
  label: string
  storage: boolean
  p1: Controller
  p2: Controller
}