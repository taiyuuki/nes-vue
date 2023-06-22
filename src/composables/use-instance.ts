import type { Component, Ref } from 'vue'
import { ref } from 'vue'

export const useInstance = <T extends abstract new (...args: any[]) => Component>() => ref() as Ref<InstanceType<T>>
