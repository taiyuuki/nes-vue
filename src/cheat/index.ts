import { toHexNumber } from 'src/utils'
import type { CheatCodeMap } from 'src/types'
import { object_entries } from '@taiyuuki/utils'
import { nes } from '../nes'

class Cheat {
    enable: boolean
    fixed: CheatCodeMap
    greater: CheatCodeMap
    lesser: CheatCodeMap

    static reg = /([\da-fA-F]{4})-([0-3])([0-4])-([\da-fA-F]{2,8})/

    constructor() {
        this.enable = false
        this.fixed = {}
        this.greater = {}
        this.lesser = {}
    }

    parse(cheatCode: string) {
        const matchs = Cheat.reg.exec(cheatCode)
        if (!matchs) {
            return
        }
        const cheatAddress = toHexNumber(matchs[1])
        const cheatType = toHexNumber(matchs[2])
        const cheatValue = toHexNumber(matchs[4])

        this.on(cheatAddress, cheatType, cheatValue)
    }

    on(cheatAddress: number, cheatType: number, cheatValue: number) {
        if (cheatAddress > nes.cpu.mem.length - 1) {
            return
        }
        this.enable || (this.enable = true)
        switch (cheatType) {
            case 0:
                this.fixed[cheatAddress] = cheatValue
                break
            case 1:
                nes.cpu.mem[cheatAddress] = cheatValue
                break
            case 2:
                this.lesser[cheatAddress] = cheatValue
                break
            case 3:
                this.greater[cheatAddress] = cheatValue
                break
        }
    }

    remove(cheatAddress: number) {
        delete this.fixed[cheatAddress]
        delete this.greater[cheatAddress]
        delete this.lesser[cheatAddress]
    }

    disable(code: string) {
        const matchs = Cheat.reg.exec(code)
        if (!matchs) {
            return
        }
        const cheatAddress = toHexNumber(matchs[1])
        this.remove(cheatAddress)
    }

    init() {
        this.enable = false
        this.fixed = {}
        this.greater = {}
        this.lesser = {}
    }

    onFrame() {
        if (this.enable) {
            object_entries(this.fixed).forEach(([address, value]) => {
                nes.cpu.mem[address] = value
            })
            object_entries(this.greater).forEach(([address, value]) => {
                if (nes.cpu.mem[address] < value) {
                    nes.cpu.mem[address] = value
                }
            })
            object_entries(this.lesser).forEach(([address, value]) => {
                if (nes.cpu.mem[address] > value) {
                    nes.cpu.mem[address] = value
                }
            })
        }
    }
}

const cheat = new Cheat()

export { cheat }
