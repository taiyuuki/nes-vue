<template>
  <div class="box">
    <nes-vue :url="gameUrl" label="Click to Start" @fps="getFps" @success="isSuccessful" @error="getError"
      :width="512" :height="480" ref="eux" />
    <div class="show-fps">FPS:{{ currentFPS }}</div>
  </div>
  <div>
    <button @click="switchGame">Switch</button>
    <button @click="resetGame">Reset</button>
    <button @click="stopGame">Stop</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { NesVue } from 'nes-vue';

const eux = ref(null);
const gameList = ['Wanpaku Duck Yume Bouken 2.nes', 'Chip to Dale no Dai Sakusen 2.nes'];
let gameUrl = ref<string>(gameList[0]);
let currentFPS = ref<string>('0')
let i = 0;

function switchGame() {
  i++;
  if (i === gameList.length) {
    i = 0
  }
  gameUrl.value = gameList[i]
}

function getFps(fps: number) {
  currentFPS.value = fps.toFixed(2);
}

function resetGame() {
  if (eux.value) {
    (<typeof NesVue>eux.value).gameReset()
  }
}

function stopGame() {
  if (eux.value) {
    (<typeof NesVue>eux.value).gameStop()
  }
}

function isSuccessful() {
  console.log('Load successful')
}

function getError(message: string) {
  console.log(message);
}

</script>
<style>
.box {
  position: relative;
  display: inline-block;
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
