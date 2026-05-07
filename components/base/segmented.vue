<template>
  <div
    class="inline-flex items-center bg-muted/80 backdrop-blur-sm rounded-full p-0.5 border border-border"
  >
    <button
      v-for="opt in options"
      :key="opt.value"
      class="px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ease-out"
      :class="
        modelValue === opt.value
          ? 'bg-card text-primary shadow-sm'
          : 'text-muted-foreground hover:text-foreground'
      "
      @click="$emit('update:modelValue', opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface SegmentOption {
  label: string
  value: string
}

defineProps<{
  options: SegmentOption[]
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
