<template>
    <div
        :class="['portfolio-card-wrapper', { 'hover-effect': !disableHover }]"
        @click="handleClick"
    >
        <!-- 卡片頂部漸層背景 -->
        <div class="portfolio-card-header">
            <h3 class="portfolio-title">{{ title }}</h3>
            <div class="portfolio-meta">
                <span class="meta-item">{{ role }}</span>
                <span class="meta-divider">•</span>
                <span class="meta-item">{{ duration }}</span>
            </div>
        </div>

        <!-- 卡片內容 -->
        <div class="portfolio-card-content">
            <!-- 專案描述 -->
            <p class="portfolio-description">{{ description }}</p>

            <!-- 技術標籤 -->
            <div class="tech-tags-wrapper">
                <span
                    v-for="(tech, index) in displayTechnologies"
                    :key="index"
                    class="tech-tag"
                >
                    {{ tech.name }}
                </span>
                <span v-if="remainingTechCount > 0" class="tech-tag tech-tag-more">
                    +{{ remainingTechCount }}
                </span>
            </div>
        </div>

        <!-- 查看詳情提示 -->
        <div class="card-footer">
            <span class="view-detail-text">點擊查看詳情 →</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { IPortfolio } from '~/types/protfolio.interface';

interface Props {
    id: string;
    title: string;
    description: string;
    role: string;
    duration: string;
    technologies: IPortfolio['technologies'];
    maxTechDisplay?: number;
    disableHover?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    maxTechDisplay: 6,
    disableHover: false
});

const emit = defineEmits<{
    click: [id: string]
}>();

// 顯示的技術標籤（限制數量）
const displayTechnologies = computed(() => {
    return props.technologies.slice(0, props.maxTechDisplay);
});

// 剩餘的技術數量
const remainingTechCount = computed(() => {
    const remaining = props.technologies.length - props.maxTechDisplay;
    return remaining > 0 ? remaining : 0;
});

const handleClick = () => {
    if (!props.disableHover) {
        emit('click', props.id);
    }
};
</script>

<style scoped>
.portfolio-card-wrapper {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: all 0.3s ease;
    border: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
}

.portfolio-card-wrapper.hover-effect {
    cursor: pointer;
}

.portfolio-card-wrapper.hover-effect:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
    border-color: #FF6B35;
}

.portfolio-card-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 1.5rem;
    color: white;
}

.portfolio-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: white;
}

.portfolio-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    opacity: 0.95;
}

.meta-item {
    display: flex;
    align-items: center;
}

.meta-divider {
    opacity: 0.6;
}

.portfolio-card-content {
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.portfolio-description {
    color: #4b5563;
    font-size: 0.938rem;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.tech-tags-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: auto;
}

.tech-tag {
    padding: 0.375rem 0.75rem;
    background: #f3f4f6;
    color: #4b5563;
    border-radius: 6px;
    font-size: 0.813rem;
    font-weight: 500;
    transition: all 0.2s ease;
}

.tech-tag:hover {
    background: #e5e7eb;
}

.tech-tag-more {
    background: #dbeafe;
    color: #2563eb;
    font-weight: 600;
}

.card-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid #f3f4f6;
    display: flex;
    justify-content: flex-end;
}

.view-detail-text {
    color: #667eea;
    font-size: 0.875rem;
    font-weight: 600;
    transition: all 0.2s ease;
}

.portfolio-card-wrapper.hover-effect:hover .view-detail-text {
    color: #FF6B35;
    transform: translateX(4px);
}
</style>
