<template>
  <div class="box">
    <nes-vue
      ref="nes"
      :url="gameUrl"
      label="Click to Start"
      width="512"
      height="480"
      :clip="clip"
      debugger
      @error="onError"
    />
  </div>
  <div class="btns">
    <button @click="resetGame">
      Reset
    </button>
    <button @click="stopGame">
      Stop
    </button>
    <button
      @click="save"
    >
      Save
    </button>
    <button
      @click="load"
    >
      Load
    </button>
    <button
      @click="clear"
    >
      Clear
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { EmitErrorObj, NesVueInstance } from '../'
import NesVue from '../nes/NesVue.vue'
import { isNotVoid } from '@taiyuuki/utils'

const nes = ref<NesVueInstance | null>(null)
const gameUrl = ref<string>('SuperContra.nes')
const saveable = ref(true)
const clip = ref(true)

function resetGame() {
  saveable.value = false
  if (isNotVoid(nes.value)) {
    nes.value.reset()
  }
}

function stopGame() {
  saveable.value = true
  if (isNotVoid(nes.value)) {
    nes.value.stop()
  }
}

function save() {
  if (isNotVoid(nes.value)) {
    nes.value.save(gameUrl.value)
  }
}

function load() {
  if (isNotVoid(nes.value)) {
    nes.value.load(gameUrl.value)
  }
}

function clear() {
  if (isNotVoid(nes.value)) {
    nes.value.clear()
  }
}

function onError(error: EmitErrorObj) {
  console.log(error.message)
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

button {
  margin: 0 10px;
  color: #646cff;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  transition: border-color 0.25s;
}

button:not(:disabled):hover{
  cursor: pointer;
  border-color: #646cff;
}
</style>