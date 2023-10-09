<script setup lang="ts">
import { ref } from 'vue'
import type { EmitErrorObj } from '../'
import NesVue from 'src/components/NesVue.vue'
import { useInstance } from 'src/composables/use-instance'
import { vGamepad } from 'src/directives/v-gamepad'
import type { Controller } from 'src/types'

const nes = useInstance<typeof NesVue>()
const gameUrl = ref<string>('Super Mario Bros (JU).nes')
const saveable = ref(true)
const btnA = ref<keyof Controller>('A')
const btnB = ref<keyof Controller>('B')

function resetGame() {
    saveable.value = false
    nes.value.reset()
}

function stopGame() {
    saveable.value = true
    nes.value.stop()
}

function save() {
    nes.value.save(gameUrl.value)
}

function load() {
    nes.value.load(gameUrl.value)
}

function playVideo() {
    nes.value.fm2URL('happylee-supermariobros,warped.fm2', 0)
        .then(fm2Play => {
            fm2Play()
        })
}

function play() {
    nes.value.play()
}

function pause() {
    nes.value.pause()
}

// function prev() {
//     if (is_not_void(nes.value)) {
//         nes.value.prev()
//     }
// }

// function next() {
//     if (is_not_void(nes.value)) {
//         nes.value.next()
//     }
// }
function clear() {
    nes.value.clear()
}

function onError(error: EmitErrorObj) {
    console.log(error.message)
}

function testVGamepad() {
    btnA.value = 'C'
}
</script>

<template>
  <div class="box">
    <nes-vue
      ref="nes"
      :url="gameUrl"
      label="Click to Start"
      width="512"
      height="480"
      no-clip
      db-name="my-nes"
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
      @click="playVideo"
    >
      Play Video
    </button>
    <!-- <button @click="prev">
      Prev
    </button>
    <button @click="next">
      Next
    </button> -->
    <button @click="pause">
      Pause
    </button>
    <button @click="play">
      Play
    </button>
    <button @click="clear">
      Clear
    </button>
  </div>
  <div>
    <button v-gamepad="btnA">
      A
    </button>
    <button v-gamepad="btnB">
      B
    </button>
    <button @click="testVGamepad">
      Change A To C
    </button>
  </div>
</template>

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
