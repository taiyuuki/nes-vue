import { DB } from 'src/db'
import { getNesData } from 'src/nes'

const db = new DB<PlaybackData>('auto-save', 'playback_data')

class Playback {
    length: number
    frameData: FrameData
    frameCache: FrameData
    frameList: number[]
    dbIndex: number
    constructor() {
        this.length = 0
        this.frameList = []
        this.frameData = {}
        this.frameCache = {}
        this.dbIndex = 1
    }

    get lastIndex() {
        return this.frameList[this.frameList.length - 1]
    }

    push(this: Playback, data: number[], frameCounter: number) {
        this.length++
        this.frameList.push(frameCounter)
        this.frameData[frameCounter] = data
        this.frameCache[frameCounter] = data
    }

    pop() {
        const lastIndex = this.lastIndex
        const ret = this.frameData[lastIndex]
        this.frameList.pop()
        this.length--
        return ret
    }

    next() {
        this.frameList.push(this.frameList[this.lastIndex - 1] + 1)
        this.frameData[this.lastIndex] = this.frameCache[this.lastIndex]
        this.length++
        return this.frameData[this.lastIndex]
    }

    action(frame: number) {
        return this.frameData[frame]
    }

    clear() {
        this.length = 0
        this.frameList = []
        this.frameData = {}
    }

    save() {
        const id = `playback-${this.dbIndex++}`
        const saveDatas = {
            length: this.length,
            frameList: this.frameList,
            frameData: this.frameData,
            nes: getNesData(id),
        }
        this.clear()
        db.setItem(id, saveDatas)
    }

    load(cb: (data: SaveData) => void) {
        const id = `playback-${--this.dbIndex}`
        db.getItem(id, (data) => {
            this.length = data.length
            this.frameList = data.frameList
            this.frameData = data.frameData
            db.removeItem(id)
            cb(data.nes)
        })
    }
}

export {
    Playback,
}
