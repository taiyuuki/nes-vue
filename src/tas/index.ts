import { get_fill_arr } from '@taiyuuki/utils'
interface TasScript {
    [frame: number]: {
        p1: number[]
        p2: number[]
    }
}

let tas_scripts: TasScript = {}
const NONE = '........'

const reg = /\|\d\|([LRUDTSAB.]{8})\|([LRUDTSAB.]{8})?\|\|/g

function fm2Parse(text: string, fix: number) {
    let match = reg.exec(text)
    let frame = 0 + fix
    let last = false
    tas_scripts = {}
    if (!match) {
        return
    }
    while (match) {
        const p1_match = match[1] === NONE
        const p2_match = match[2] === NONE
        if (p1_match && p2_match) {
            if (last) {
                tas_scripts[frame] = {
                    p1: get_fill_arr(8, 0x40),
                    p2: get_fill_arr(8, 0x40),
                }
                last = false
            }
            frame++
            match = reg.exec(text)
            continue
        }
        last = true
        const p1 = match[1] ? match[1].split('').map((x) => x === '.' ? 0x40 : 0x41).reverse() : get_fill_arr(8, 0x40)
        const p2 = match[2] ? match[2].split('').map((x) => x === '.' ? 0x40 : 0x41).reverse() : get_fill_arr(8, 0x40)
        match = reg.exec(text)

        tas_scripts[frame] = {
            p1,
            p2,
        }
        frame++
    }
}

export { fm2Parse, tas_scripts }
