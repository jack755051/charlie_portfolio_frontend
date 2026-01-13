<template>
  <button
      :class="[baseClass, sizeClass, shadow && isHover ? 'shadow-md' : '', customClass]"
      @click="$emit('click')"
      @mouseenter="isHover = true"
      @mouseleave="isHover = false"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string;
  // style
  size?: 'sm' | 'md' | 'lg'
  shadow?: boolean
  customClass?: string // 讓使用者可以額外傳入 Tailwind class
}>();

const emit = defineEmits<{
  (e: 'click'): void
}>()

const isHover = ref(false);


/** 最基礎Class */
const baseClass = 'relative rounded-[1.2rem] font-medium transition duration-200 px-[1.8rem] py-[0.5rem] bg-[#FF6B35] hover:bg-[#FF8C42] text-[#FFFFFF] hover:text-[#F9F9F9]  focus:outline-none'

/** 預設值處理 */
const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-sm px-3 py-1.5'
    case 'lg':
      return 'text-lg px-6 py-3'
    case 'md':
    default:
      return 'text-base px-4 py-2'
  }
})
</script>

<style scoped>
</style>