<template>
  <section
    :id="id"
    ref="sectionRef"
    class="min-h-screen snap-start flex flex-col items-center justify-center py-16"
  >
    <slot name="title" />
    <slot name="content" />
    <slot name="footer" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  id?: string
}

const props = defineProps<Props>()

const sectionRef = ref<HTMLElement | null>(null)

defineExpose({
  scrollIntoView: () => {
    sectionRef.value?.scrollIntoView({ behavior: 'smooth' })
  },
})
</script>
