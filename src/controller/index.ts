import type { Controller, ControllerOptions } from 'src/nes/types'

const keyMaps = {
  UP: 'BUTTON_UP',
  DOWN: 'BUTTON_DOWN',
  LEFT: 'BUTTON_LEFT',
  RIGHT: 'BUTTON_RIGHT',
  A: 'BUTTON_A',
  B: 'BUTTON_B',
  C: 'BUTTON_A',
  D: 'BUTTON_B',
  SELECT: 'BUTTON_SELECT',
  START: 'BUTTON_START',
}
const keys = Object.keys(keyMaps) as (keyof Controller)[]

export const resolveController = (p1: Controller, p2: Controller) => {
  const options: ControllerOptions = {}
  keys.forEach(key => {
    options[p1[key] as string] = {
      key,
      p: 1,
      value: keyMaps[key],
    }
    if (key in p2) {
      options[p2[key] as string] = {
        key,
        p: 2,
        value: keyMaps[key],
      }
    }
  })
  return options
}