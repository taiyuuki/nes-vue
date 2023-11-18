# Cheat Code

Start with v1.8.0, nes-vue supports cheat code.

## Usage

Just like the cheat code in VirtuaNES, The format of cheat code is `xxxx-yz-vv`, where `xxxx` is memory address, `y` is type, `z` is length and `vv` is value.  for example, one cheat code of Super Mario Bros is `079F-01-01`:

```vue
<script setup>
import { NesVue } from 'nes-vue'
import { ref } from 'vue'

const nes = ref()

function injectCheat() {
    // Enable cheat code
    nes.value.cheatCode('079F-01-01')
}

function cancelCheat() {
    // Disable cheat code
    nes.value.cancelCheatCode('079F-01-01')
}

function cancelAll() {
    // Disable all
    nes.value.cancelCheatCodeAll()
}
</script>

<template>
  <nes-vue
    ref="nes"
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
  />
  <button @click="injectCheat">Enable cheat code</button>
  <button @click="cancelCheat">Disable Cheat Code</button>
  <button @click="cancelAll">Disable All</button>
</template>
```
