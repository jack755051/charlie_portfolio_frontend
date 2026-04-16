<template>
  <div :class="classGroup?.classWrapper ?? 'stack-card-wrapper'">
    <!-- 卡片表頭 -->
    <div :class="classGroup?.classTitleWrapper ?? 'stack-card-title'">
      <span :class="classGroup?.title ?? 'stack-title'">{{ title }}</span>
    </div>
    <div
      v-for="(item, index) in stack"
      :key="index"
      :class="classGroup?.contentWrapper ?? 'stack-card-content-wrapper'"
    >
      <div :class="classGroup?.stackName ?? 'stack-card-content-name'">
        {{ item.stackName }}
      </div>
      <div :class="classGroup?.stackIcon ?? 'stack-card-content-item'">
        <component
          :is="item.iconComponent || getIconComponent(item.icon)"
          v-if="item.iconComponent || getIconComponent(item.icon)"
          class="tech-icon"
        />
        <div v-else class="tech-icon-placeholder">?</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ITechnologyStack } from '~/types/technologyStack.interface'
import { getIconComponent } from '~/utils/iconMap'

const props = defineProps<ITechnologyStack>()
</script>

<style scoped>
.stack-card-wrapper {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border: 1px solid #e5e7eb;
  min-width: 200px;
}

.stack-card-title {
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f3f4f6;
}

.stack-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
}

.stack-card-content-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.stack-card-content-wrapper:hover .stack-card-content-name {
  color: #ff6b35;
}

.stack-card-content-wrapper:hover .tech-icon {
  color: #ff6b35;
}

.stack-card-content-name {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
  transition: color 0.2s ease-in-out;
}

.stack-card-content-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tech-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #3f3f3f; /* gray-700 */
  transition: color 0.2s ease-in-out;
}

.tech-icon-placeholder {
  width: 1.5rem;
  height: 1.5rem;
  background-color: #f3f4f6;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: #9ca3af;
  font-weight: bold;
}
</style>
