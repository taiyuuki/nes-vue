<template>
  <MainHeader :store="store" />
  <Repl :store="store" />
</template>

<script setup lang="ts">
import { Repl, ReplStore } from '@vue/repl'
import '@vue/repl/style.css'
import { template, script, style } from '../template'

const store = new ReplStore()

store.state.files['App.vue'].code = template + script + style

store.setImportMap({ imports: { 'nes-vue': './nes-vue.es.js' } })
</script>

<style>
.vue-repl {
  height: calc(100vh - 60px);
}
</style>