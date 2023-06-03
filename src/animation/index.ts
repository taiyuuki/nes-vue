const WIDTH = 256
const HEIGHT = 240
let animationframeID: number
let framebuffer_u8 = {} as Uint8ClampedArray, framebuffer_u32 = {} as Uint32Array
let canvas_ctx = {} as CanvasRenderingContext2D

function onFrame(framebuffer_24: Buffer) {
    for (let i = 0; i < framebuffer_24.length; i += 1) {
        framebuffer_u32[i] = 0xff000000 | framebuffer_24[i] // Full alpha
    }
}

const animationFrame = (cvs: HTMLCanvasElement) => {
    canvas_ctx = cvs.getContext('2d') as CanvasRenderingContext2D
    const image = canvas_ctx.getImageData(0, 0, WIDTH, HEIGHT)

    canvas_ctx.fillStyle = 'black'
    canvas_ctx.fillRect(0, 0, WIDTH, HEIGHT)
    const buffer = new ArrayBuffer(image.data.length)
    framebuffer_u8 = new Uint8ClampedArray(buffer)
    framebuffer_u32 = new Uint32Array(buffer)
    animationframeID = requestAnimationFrame(onAnimationFrame)

    function onAnimationFrame() {
        cancelAnimationFrame(animationframeID)
        animationframeID = requestAnimationFrame(onAnimationFrame)
        image.data.set(framebuffer_u8)
        canvas_ctx.putImageData(image, 0, 0)
    }
}

const fitInParent = (cvs: HTMLCanvasElement) => {
    const parent = cvs.parentNode as HTMLElement
    const parentWidth = parent.clientWidth
    const parentHeight = parent.clientHeight
    const parentRatio = parentWidth / parentHeight
    const desiredRatio = WIDTH / HEIGHT
    if (desiredRatio < parentRatio) {
        cvs.style.height = `${parentHeight}px`
        cvs.style.width = `${Math.round(parentHeight + desiredRatio)}px`
    }
    else {
        cvs.style.width = `${parentWidth}px`
        cvs.style.height = `${Math.round(parentWidth / desiredRatio)}px`
    }
}

const animationStop = () => {
    cancelAnimationFrame(animationframeID)
}

const cut = (cvs: HTMLCanvasElement) => {
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
    cut,

}
