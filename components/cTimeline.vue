<template>
    <a-timeline :mode="timeline.type">
        <a-timeline-item
        v-for="(item, index) in timeline.data" 
        :key="index"
        :color="item.type === 'color-pointer' && item.color ? item.color : 'blue'"
        > 
            <div class="flex flex-col justify-center">
                <h3 v-if="item.title" class="text-lg font-semibold">{{ item.title }}</h3>
                <span class="text-gray-500">{{ item.time }}</span>
                <div class="mt-2">
                    <!-- 判斷 content 是 array -->
                    <template v-if="Array.isArray(item.content)">
                        <ul class="list-disc pl-5 space-y-1">
                            <li v-for="(line, i) in item.content" :key="i">{{ line }}</li>
                        </ul>
                    </template>

                    <!-- content 是 string -->
                    <p v-else-if="item.content">{{ item.content }}</p>
                </div>
            </div>
            
            

        </a-timeline-item>
    </a-timeline>
</template>

<script  setup lang="ts">
import { defineProps } from 'vue';
import type { ITimeline } from '~/types/timeline.interface';

interface Props {
  timeline: ITimeline
}

const rawProps = defineProps<{
  timeline?: ITimeline
}>()

const timeline = computed(() => rawProps.timeline ?? { type: 'alternate', data: [] })

</script>