<template>
    <div :class="classGroup?.classWrapper ?? 'stack-card-wrapper'">
        <!-- 卡片表頭 -->
        <div :class="classGroup?.classTitleWrapper ?? 'stack-card-title'">
            <span :class="classGroup?.title ??'stack-title'">{{ title }}</span>
        </div>
        <div 
            :class="classGroup?.contentWrapper ?? 'stack-card-content-wrapper'"
            v-for="(item, index) in stack"
            :key="index"
        >
            <div :class="classGroup?.stackName ??'stack-card-content-name'">
                {{ item.stackName }}
            </div>
            <div :class="classGroup?.stackIcon ??'stack-card-content-item'">
                <component :is="getIconComponent(item.icon)" class="tech-icon" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ITechnologyStack } from '~/types/technologyStack.interface';
import { defineProps } from 'vue';

import AngularIcon from "@/assets/image/angular-icon.svg?component";
import VueIcon from "@/assets/image/vue-icon.svg?component";
import MysqlIcon from "@/assets/image/mysql-icon.svg?component";
import MongoDBIcon from "@/assets/image/mongodb-icon.svg?component";
import DockerIcon from "@/assets/image/docker-icon.svg?component";
import NestJSIcon from "@/assets/image/nestjs-icon.svg?component";

const props = defineProps<ITechnologyStack>();

// 圖標組件映射
const iconComponentMap = {
  'AngularIcon': AngularIcon,
  'VueIcon': VueIcon,
  'MysqlIcon': MysqlIcon,
  'MongoDBIcon': MongoDBIcon,
  'DockerIcon': DockerIcon,
  'NestJSIcon': NestJSIcon,
};

// 根據字串名稱獲取對應的圖標組件
const getIconComponent = (iconName: string) => {
  return iconComponentMap[iconName as keyof typeof iconComponentMap] || null;
};

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
}

.stack-card-content-name {
    font-size: 0.875rem;
    color: #6b7280;
    font-weight: 500;
}

.stack-card-content-item {
    display: flex;
    align-items: center;
    justify-content: center;
}

.tech-icon {
    width: 1.5rem;
    height: 1.5rem;
}
</style>