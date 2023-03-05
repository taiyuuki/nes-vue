<template>
  <header class="header">
    <div>NesVue Playground</div>
    <div class="icons">
      <div
        class="icon"
        title="Download project files"
        @click="download"
      >
        <IconDownload />
      </div>
      <div
        class="icon"
        @click="dark.on = !dark.on"
      >
        <IconMoon v-if="isDark" />
        <IconSun v-else />
      </div>
      <div class="icon">
        <a
          :href="repoURL"
          target="_blank"
          title="View on repository"
        >
          <IconGitee v-if="isGitee" />
          <IconGithub v-else />
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { ReplStore } from '@vue/repl'
import { useDark } from 'src/stores/dark'
import { downloadProject } from 'src/download'
import { isGitee, repoURL } from 'src/template'

const props = defineProps<{ store: ReplStore }>()

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

let iaDownloading = false
async function download() {
  if (iaDownloading) {
    alert('Already downloading')
  }
  else {
    iaDownloading = true
    await downloadProject(props.store)
    iaDownloading = false
  }
}
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

.icons {
  display: flex;
}

.icon {
  width: 30px;
  margin-left: 5px;
  transform: scale(0.6);
  cursor: pointer;
  opacity: 0.5;
}

.icon:hover {
  opacity: 1;
}
</style>