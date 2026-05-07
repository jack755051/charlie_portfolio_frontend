<template>
  <button
    v-motion="motion.action"
    :type="type"
    :disabled="disabled"
    :class="[baseClass, variantClass, sizeClass, shadow && isHover ? 'shadow-xl' : '', customClass]"
    @click="$emit('click')"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonType = 'button' | 'submit' | 'reset'

const props = withDefaults(
  defineProps<{
    label: string
    variant?: ButtonVariant
    size?: ButtonSize
    type?: ButtonType
    shadow?: boolean
    disabled?: boolean
    customClass?: string
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    shadow: false,
    disabled: false,
    customClass: '',
  }
)

defineEmits<{
  (e: 'click'): void
}>()

const isHover = ref(false)
const motion = useMotionPresets()

const baseClass =
  'relative inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0'

const variantClass = computed<string>(() => {
  switch (props.variant) {
    case 'secondary':
      return 'border border-border text-foreground hover:bg-card hover:text-primary'
    case 'ghost':
      return 'text-foreground hover:bg-muted'
    case 'primary':
    default:
      return 'bg-gradient-to-r from-primary to-rose-500 hover:opacity-90 text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50'
  }
})

const sizeClass = computed<string>(() => {
  switch (props.size) {
    case 'sm':
      return 'text-sm px-4 py-1.5'
    case 'lg':
      return 'text-lg px-7 py-3'
    case 'md':
    default:
      return 'text-base px-5 py-2'
  }
})
</script>

<style scoped></style>
