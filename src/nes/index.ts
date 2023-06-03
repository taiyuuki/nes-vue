import jsnes from 'jsnes'
import { onFrame } from 'src/animation'
import { getSampleRate, onAudioSample } from 'src/audio'

const nes = new jsnes.NES({
    onFrame,
    onAudioSample,
    sampleRate: getSampleRate(),
})

nes.videoMode = false
nes.frameCounter = 1

export default nes
