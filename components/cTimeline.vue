<template>
    <a-timeline mode="alternate">
        <a-timeline-item
        v-for="(item, index) in data" 
        :key="index"
        :color="item.type === 'color-pointer' && item.color ? item.color : 'blue'"
        > 
        <h3 v-if="item.title" class="text-lg font-semibold mb-2">{{ item.title }}</h3>
        <!-- 判斷 content 是 array -->
        <template v-if="Array.isArray(item.content)">
            <ul class="list-disc pl-5 space-y-1">
                <li v-for="(line, i) in item.content" :key="i">{{ line }}</li>
            </ul>
        </template>

        <!-- content 是 string -->
        <p v-else-if="item.content">{{ item.content }}</p>
    </a-timeline-item>
    </a-timeline>
</template>

<script  setup lang="ts">
import { defineProps } from 'vue';
import type { ITimelineItem } from '~/types/timeline.interface';

interface Props {
  data: Array<ITimelineItem>
}

const rawProps = defineProps<{
  data?: ITimelineItem[]
}>()

const data = computed(() => rawProps.data ?? [])

</script>