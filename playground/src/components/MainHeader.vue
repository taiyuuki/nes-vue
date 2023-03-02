<template>
  <header class="header">
    <div>NesVue Playground</div>
    <div
      class="icon"
      @click="dark.on = !dark.on"
    >
      <Moon v-if="isDark" />
      <Sun v-else />
    </div>
  </header>
</template>

<script setup lang="ts">
import { useDark } from 'src/stores/dark'

const dark = useDark()
const isDark = computed(() => {
  const cls = document.documentElement.classList
  if (dark.on) {
    cls.add('dark')
  }
  else {
    cls.remove('dark')
  }
  return dark.on
})
</script>

<style>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20px;
  padding: 10px;
  font-weight: 500;
  font-size: 18px;
  box-shadow: inset 0 0 1px #000;
}

.dark .header {
  box-shadow: inset 0 0 1px #fff;
}

.header .icon {
  width: 20px;
  cursor: pointer;
  opacity: 0.8;
}

.header .icon:hover {
  opacity: 1;
}
</style>