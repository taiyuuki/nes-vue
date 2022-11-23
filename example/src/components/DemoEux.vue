<template>
  <div class="box">
    <nes-vue
      ref="nes"
      :url="gameUrl"
      label="Click to Start"
      :width="512"
      :height="480"
      @fps="getFps"
      @success="onSuccess"
      @error="onError"
      @saved="onSaved"
      @loaded="onLoaded"
    />
    <div class="show-fps">
      FPS:{{ currentFPS }}
    </div>
  </div>
  <div class="btns">
    <button @click="switchGame">
      Switch
    </button>
    <button @click="resetGame">
      Reset
    </button>
    <button @click="stopGame">
      Stop
    </button>
    <button
      :disabled="saveable"
      @click="save"
    >
      Save
    </button>
    <button
      :disabled="saveable"
      @click="load"
    >
      Load
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { EmitErrorObj, SavedOrLoaded } from 'nes-vue'
import { NesVue } from 'nes-vue'

type NesVueComponent = typeof NesVue

const nes = ref<NesVueComponent | null>(null)
const gameList = ['Wanpaku Duck Yume Bouken 2.nes', 'Chip to Dale no Dai Sakusen 2.nes']
const gameUrl = ref<string>(gameList[0])
const currentFPS = ref<string>('0')
const saveable = ref(true)
let i = 0

function switchGame() {
  i++
  if (i === gameList.length) {
    i = 0
  }
  gameUrl.value = gameList[i]
}

function getFps(fps: number) {
  currentFPS.value = fps.toFixed(2)
}

function resetGame() {
  if (nes.value) {
    nes.value.gameReset()
  }
}

function stopGame() {
  saveable.value = true
  currentFPS.value = '0'
  if (nes.value) {
    nes.value.gameStop()
  }
}

function save() {
  if (nes.value) {
    nes.value.save(gameUrl.value)
  }
}

function load() {
  if (nes.value) {
    nes.value.load(gameUrl.value)
  }
}

function onSuccess() {
  saveable.value = false
  console.log('Load successful')
}

function onError(error: EmitErrorObj) {
  console.log(error)
}

function onSaved({ id }: SavedOrLoaded) {
  console.log(id + ' saved')
}

function onLoaded({ id }: SavedOrLoaded) {
  console.log(id + ' loaded')
}
</script>

<style>
.box {
  position: relative;
  display: inline-block;
}

.btns {
  margin: 20px;
}

.show-fps {
  position: absolute;
  color: #fffef9;
  text-shadow: 0 0 5px #1e131d;
  top: 5px;
  left: 5px;
}

button {
  margin: 0 10px;
  color: #014a88;
}
</style>