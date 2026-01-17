import { defineProps, defineEmits, withDefaults } from 'vue'

declare global {
  const defineProps: (typeof import('vue'))['defineProps']
  const defineEmits: (typeof import('vue'))['defineEmits']
  const withDefaults: (typeof import('vue'))['withDefaults']
}

declare module '*.svg?component' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

export {}
