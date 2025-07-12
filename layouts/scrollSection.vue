<template>
  <section
      ref="sectionRef"
      class="h-screen snap-start flex items-center justify-center">
    <slot name="title" />
    <slot name="content" />
    <slot name="footer" />
  </section>

</template>

<script setup lang="ts">
import { ref } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)

defineExpose({
  scrollIntoView: () => {
    sectionRef.value?.scrollIntoView({ behavior: 'smooth' })
  }
})

</script>