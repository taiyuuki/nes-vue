import { fm2s, roms } from './download/roms'

const template = `

<template>
  <div class="box">
    <nes-vue
      ref="nes"
      :url="gameURL"
      :width="512"
      :height="480"
      @success="fetchFm2"
    />
  </div>
  <div class="btns">
    <select
      ref="slt"
      name="rom"
      class="slt"
      @change="selectRom"
    >
      <option
        v-for="rom in gameList"
        :value="rom"
        :key="rom"
      >
        {{ rom.replace('.nes', '') }}
      </option>
    </select>
    <button @click="resetGame">
      Reset
    </button>
    <button @click="stopGame">
      Stop
    </button>
    <button @click="pause" style="width:4em" :disabled="disable">
      {{ pauseLabel }}
    </button>
    <button @click="playTAS" :disabled="disable">
      Play TAS Video
    </button>
    <button @click="stopTAS" v-show="tasPlaying">
      Stop TAS Video
    </button>
  </div>
</template>
`

let script = `<script setup>
import { ref, computed } from 'vue'
import { NesVue } from 'nes-vue'

const gameList = [
  "Super Mario Bros (JU).nes",
  "Super Mario Bros 3.nes",
  "Mighty Final Fight (USA).nes",
  "Mitsume ga Tooru (Japan).nes"
]
const fm2List = [
  [
    "happylee-supermariobros,warped.fm2",
    0
  ],
  [
    "lordtom,maru,tompa-smb3-warps.fm2",
    -1
  ],
  [
    "xipov3-mightyfinalfight.fm2",
    0
  ],
  [
    "jy,aiqiyou-mitsumegatooru.fm2",
    0
  ]
]
const gameURL = ref(gameList[0])
const nes = ref(null)
const slt = ref(null)
const disable = ref(true)
const isPaused = ref(false)
const pauseLabel = computed(() => isPaused.value ? 'Play' : 'Pause')
const i = computed(() => gameList.indexOf(slt.value.value))

function fetchFm2() {
  const fm2 = fm2List[i.value]
  nes.value.fm2URL(fm2[0])
    .then(() => {
      disable.value = false
  })
}

function resetGame() {
  nes.value.reset()
  isPaused.value = false
  tasPlaying.value = false
}

function stopGame() {
  nes.value.stop()
  disable.value = true
}

function selectRom() {
  gameURL.value = slt.value.value
  disable.value = true
  tasPlaying.value = false
}

const tasPlaying = ref(false)
function playTAS() {
  const fm2 = fm2List[i.value]
  nes.value.fm2Play(fm2[1])
  tasPlaying.value = true
}

function stopTAS() {
  nes.value.fm2Stop()
  isPaused.value = false
  tasPlaying.value = false
}


function pause() {
  if (isPaused.value) {
    nes.value.play()
  } else {
    nes.value.pause()
  }
  isPaused.value = !isPaused.value
}
`

// eslint-disable-next-line no-useless-escape
script += '<\/script>'

const style = `
<style>
.box {
  position: relative;
  display: inline-block;
}

.btns {
  margin-top: 5px;
}
  
button, select, input {
  margin-right: 5px
}

.slt {
  width: 100px;
}
</style>
`

export const isGitee = location.href.includes('gitee')

export const repoURL = isGitee
  ? 'https://gitee.com/taiyuuki/nes-vue'
  : 'https://github.com/taiyuuki/nes-vue'

export {
  template, script, style,
}
