<template>
  <div class="flex items-center justify-between mb-4">
    <h3
      class="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2"
    >
      <slot name="prefix" />
      {{ title }}
    </h3>
    <slot name="action" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
