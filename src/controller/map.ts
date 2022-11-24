import type { Controller, NesVueProps } from 'src/nes/types'

const keyMaps = {
  UP: 'BUTTON_UP',
  DOWN: 'BUTTON_DOWN',
  LEFT: 'BUTTON_LEFT',
  RIGHT: 'BUTTON_RIGHT',
  A: 'BUTTON_A',
  B: 'BUTTON_B',
  SELECT: 'BUTTON_SELECT',
  START: 'BUTTON_START',
}
const keys = Object.keys(keyMaps) as (keyof Controller)[]

interface Options {
  [key: string]: {
    p: number
    value: string
  }
}

export const resolveController = (props: NesVueProps) => {
  const { p1, p2 } = props
  const options: Options = {}
  keys.forEach(key => {
    options[p1[key] as string] = {
      p: 1,
      value: keyMaps[key],
    }
    if (key in p2) {
      options[p2[key] as string] = {
        p: 2,
        value: keyMaps[key],
      }
    }
  })
  return options
}