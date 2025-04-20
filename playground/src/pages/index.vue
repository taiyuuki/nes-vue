<script setup lang="ts">
import { Repl, useStore } from '@vue/repl'
import { template, script, style } from '../template'
import CodeMirror from '@vue/repl/codemirror-editor'

const store = useStore()
Object.assign(store.builtinImportMap.imports!, { 'nes-vue': './nes-vue.es.js' })

store.setFiles({
  'App.vue': script + template + style,
})


</script>

<template>
  <MainHeader :store="store" />
  <Repl :editor="CodeMirror" :store="store" />
</template>

<style>
.vue-repl {
  height: calc(100vh - 60px);
}
</style>
