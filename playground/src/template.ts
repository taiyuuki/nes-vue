import { roms } from './download/roms'

const template = `<template>
  <div class="box">
    <nes-vue
      ref="nes"
      :url="gameURL"
      :width="512"
      :height="480"
    />
  </div>
  <div class="btns">
    <button @click="resetGame">
      Reset
    </button>
    <button @click="stopGame">
      Stop
    </button>
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
    <input
      type="file"
      accept=".nes"
      @change="selectLocalRom"
    />
  </div>
</template>
`

let script = `
<script setup>
import { ref } from 'vue'
import { NesVue } from 'nes-vue'

const gameList = ${JSON.stringify(roms, null, 2)}
const gameURL = ref(gameList[0])
const nes = ref(null)
const slt = ref(null)

function resetGame() {
  nes.value.reset()
}

function stopGame() {
  nes.value.stop()
}

function selectRom() {
  gameURL.value = slt.value.value
}

function selectLocalRom(e) {
  const rom = e.target.files[0]
  if (rom.name.endsWith('.nes')) {
    gameURL.value = URL.createObjectURL(rom)
  }
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