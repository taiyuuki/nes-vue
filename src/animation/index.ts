// import { Playback } from 'src/playback'
// import { compressArray, decompressArray } from 'src/utils'
import { cheat } from 'src/cheat'
import { nes } from 'src/nes'

const WIDTH = 256
const HEIGHT = 240
let animationframeID: number
let framebuffer_u8!: Uint8ClampedArray, 
    framebuffer_u32!: Uint32Array
let canvas_ctx!: CanvasRenderingContext2D
const imageData = new ImageData(WIDTH, HEIGHT)

// const playback = new Playback

function onFrame(u32: number[]) {
    nes.frameCounter++
    for (let i = 0; i < 256 * 240; i += 1) {
        framebuffer_u32[i] = 0xFF000000 | u32[i]
    }
    cheat.onFrame()

    //
    // nesFrame(framebuffer_u32)
    // if (nes.playbackMode) {
    //     playback.push(compressArray(framebuffer_u32), nes.frameCounter)
    //     if (nes.frameCounter % 45 === 0) {
    //         playback.save()
    //     }
    // }
}

function putImageData() {
    imageData.data.set(framebuffer_u8)
    canvas_ctx.putImageData(imageData, 0, 0)
}

function animationFrame(cvs: HTMLCanvasElement) {
    canvas_ctx = cvs.getContext('2d')!
    canvas_ctx.fillStyle = 'black'
    canvas_ctx.fillRect(0, 0, WIDTH, HEIGHT)
    const buffer = new ArrayBuffer(imageData.data.length)
    framebuffer_u8 = new Uint8ClampedArray(buffer)
    framebuffer_u32 = new Uint32Array(buffer)

    // playback.clearDB()
    nes.frameCounter = 1
    animationframeID = requestAnimationFrame(onAnimationFrame)

    function onAnimationFrame() {
        cancelAnimationFrame(animationframeID)
        animationframeID = requestAnimationFrame(onAnimationFrame)
        putImageData()
    }
}

// function rewind() {
//     const frame = nes.frameCounter - 1
//     if (frame in playback.frameData) {
//         const frameData = decompressArray(playback.action(frame))
//         for (let i = 0; i < frameData.length; i++) {
//             framebuffer_u32[i] = frameData[i]
//         }
//         putImageData()
//         nes.frameCounter--
//     }
//     else {
//         playback.load((data) => {
//             loadNesData(data, () => {
//                 console.error('Failed to load nes data')
//             })

//             rewind()
//         })
//     }
// }

// function forward() {
//     const frame = nes.frameCounter + 1
//     if (frame in playback.frameData) {
//         const frameData = decompressArray(playback.action(frame))
//         for (let i = 0; i < frameData.length; i++) {
//             framebuffer_u32[i] = frameData[i]
//         }
//         putImageData()
//         nes.frameCounter++
//     }
//     else {
//         nesFrame()
//     }
// }

// function frameAction() {
//     const frame = nes.frameCounter + 1
//     if (frame in playback.frameData) {
//         forward()
//         setTimeout(frameAction, 1000 / 60)
//     }
//     else {
//         resume()
//     }
// }

function fitInParent(cvs: HTMLCanvasElement) {
    const parent = cvs.parentNode as HTMLElement
    const parentWidth = parent.clientWidth
    const parentHeight = parent.clientHeight
    const parentRatio = parentWidth / parentHeight
    const desiredRatio = WIDTH / HEIGHT
    if (desiredRatio < parentRatio) {
        cvs.style.height = `${parentHeight}px`
        cvs.style.width = `${Math.round(parentHeight + desiredRatio)}px`
    } else {
        cvs.style.width = `${parentWidth}px`
        cvs.style.height = `${Math.round(parentWidth / desiredRatio)}px`
    }
}

function animationStop() {
    cancelAnimationFrame(animationframeID)
}

function cut(cvs: HTMLCanvasElement) {
    const image = new Image()
    image.src = cvs.toDataURL('image/png')

    return image
}

export {
    WIDTH,
    HEIGHT,
    onFrame,
    animationFrame,
    animationStop,
    fitInParent,

    // rewind,
    // forward,
    cut,

    // frameAction,
}
