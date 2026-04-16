<template>
  <a-table :data-source="dataSource" :columns="columns" />
</template>

<script lang="ts" setup>
interface Props {
  dataSource?: Record<string, unknown>[]
  columns?: Record<string, unknown>[]
}

withDefaults(defineProps<Props>(), {
  dataSource: () => [],
  columns: () => [],
})
</script>
