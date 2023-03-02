<template>
  <Repl :store="store" />
</template>

<script setup lang="ts">
import { Repl, ReplStore } from '@vue/repl'
import '@vue/repl/style.css'
import { template, script, style } from '../code'

const store = new ReplStore()

store.state.files['App.vue'].code = template + script + style

store.setImportMap({ imports: { 'nes-vue': 'https://cdn.jsdelivr.net/npm/nes-vue@1.3.6/dist/nes-vue.es.js' } })
</script>

<style>
.vue-repl {
  height: calc(100vh - 100px);
}
</style>