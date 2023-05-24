import { defineStore } from 'pinia'

export const useDark = defineStore('dark', {
    state: () => ({ on: false }),
    persist: true,
})
