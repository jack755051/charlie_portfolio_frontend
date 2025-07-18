<template>
    <div class="stack-card-wrapper">
        <!-- 卡片表頭 -->
        <div class="stack-card-title">
            <span class="stack-title">{{ title }}</span>
        </div>
        <div 
            class="stack-card-content-wrapper"
            v-for="(item, index) in stack"
            :key="index"
        >
            <div class="stack-card-content-name">
                {{ item.stackName }}
            </div>
            <div class="stack-card-content-item">
                <img 
                    :src="getIconPath(item.icon)" 
                    :alt="`${item.stackName} icon`"
                    class="tech-icon" 
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ITechnologyStack } from '~/types/technologyStack.interface';

const props = defineProps<ITechnologyStack>();

// 圖標路徑映射
const iconPathMap = {
  'AngularIcon': '/images/angular-icon.svg',
  'VueIcon': '/images/vue-icon.svg',
  'MysqlIcon': '/images/mysql-icon.svg',
  'MongoDBIcon': '/images/mongodb-icon.svg',
  'DockerIcon': '/images/docker-icon.svg',
  'NestJSIcon': '/images/nestjs-icon.svg',
};

// 根據字串名稱獲取對應的圖標路徑
const getIconPath = (iconName: string) => {
  return iconPathMap[iconName as keyof typeof iconPathMap] || '';
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