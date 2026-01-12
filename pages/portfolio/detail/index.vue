<template>
    <div class="scrollable-content-wrapper h-screen overflow-hidden relative">
        <div class="snap-y snap-mandatory h-full overflow-y-scroll scroll-smooth pt-[60px]">
            <div class="w-full">
                <!-- 返回按鈕 -->
                <div class="back-button-wrapper">
                    <button @click="goBack" class="back-button">
                        <span class="back-arrow">←</span>
                        <span>返回作品集</span>
                    </button>
                </div>

                <!-- 專案詳情區塊 -->
                <ScrollSection
                    v-if="currentProject"
                    ref="detailSection"
                    id="section1"
                    :class="['flex-col gap-[50px] !justify-start']"
                >
                    <template #title>
                        <div :class="['flex w-full py-6 items-center justify-center']">
                            <p class="underline-title">{{ currentProject.title }}</p>
                        </div>
                    </template>
                    <template #content>
                        <div class="detail-content-wrapper mx-auto max-w-[75%]">
                            <!-- 專案基本資訊 -->
                            <div class="project-info-section">
                                <div class="info-item">
                                    <span class="info-label">專案角色：</span>
                                    <span class="info-value">{{ currentProject.role }}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">專案時間：</span>
                                    <span class="info-value">{{ currentProject.duration }}</span>
                                </div>
                            </div>

                            <!-- 專案描述 -->
                            <div class="section-block">
                                <h3 class="section-title">專案描述</h3>
                                <p class="section-text">{{ currentProject.description }}</p>
                            </div>

                            <!-- 使用技術 -->
                            <div class="section-block">
                                <h3 class="section-title">使用技術</h3>
                                <div class="tech-grid">
                                    <div
                                        v-for="(tech, index) in currentProject.technologies"
                                        :key="index"
                                        class="tech-item"
                                    >
                                        <component
                                            v-if="getIconComponent(tech.icon)"
                                            :is="getIconComponent(tech.icon)"
                                            class="tech-icon"
                                        />
                                        <div class="tech-info">
                                            <span class="tech-name">{{ tech.name }}</span>
                                            <span v-if="tech.category" class="tech-category">{{ tech.category }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 主要功能 -->
                            <div v-if="currentProject.features && currentProject.features.length > 0" class="section-block">
                                <h3 class="section-title">主要功能</h3>
                                <ul class="feature-list">
                                    <li
                                        v-for="(feature, index) in currentProject.features"
                                        :key="index"
                                        class="feature-item"
                                    >
                                        <span class="feature-bullet">•</span>
                                        <span class="feature-text">{{ feature }}</span>
                                    </li>
                                </ul>
                            </div>

                            <!-- 專案成果 -->
                            <div v-if="currentProject.achievements && currentProject.achievements.length > 0" class="section-block">
                                <h3 class="section-title">專案成果</h3>
                                <ul class="achievement-list">
                                    <li
                                        v-for="(achievement, index) in currentProject.achievements"
                                        :key="index"
                                        class="achievement-item"
                                    >
                                        <span class="achievement-check">✓</span>
                                        <span class="achievement-text">{{ achievement }}</span>
                                    </li>
                                </ul>
                            </div>

                            <!-- 專案連結 (如果有的話) -->
                            <div v-if="currentProject.link" class="section-block">
                                <a :href="currentProject.link" target="_blank" rel="noopener noreferrer" class="project-link">
                                    查看專案 →
                                </a>
                            </div>
                        </div>
                    </template>
                </ScrollSection>

                <!-- 專案不存在提示 -->
                <div v-else class="not-found-wrapper">
                    <p class="not-found-text">找不到該專案資料</p>
                    <button @click="goBack" class="not-found-button">返回作品集</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useMockStore } from "~/stores/useMockStore";
import ScrollSection from "~/layouts/scrollSection.vue";
import { getIconComponent } from '~/utils/iconMap';
import type { IPortfolio } from '~/types/protfolio.interface';

const mockStore = useMockStore();
const router = useRouter();
const route = useRoute();

// 從 URL 參數獲取專案 ID
const projectId = computed(() => route.query.id as string);

// 根據 ID 獲取當前專案資料
const currentProject = computed<IPortfolio | undefined>(() => {
    return mockStore.portfolioPageData.find(project => project.id === projectId.value);
});

// 返回作品集列表
const goBack = () => {
    router.push('/portfolio');
};
</script>

<style scoped>
.back-button-wrapper {
    position: fixed;
    top: 80px;
    left: 2rem;
    z-index: 100;
}

.back-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    color: #4b5563;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.back-button:hover {
    background: #f9fafb;
    border-color: #FF6B35;
    color: #FF6B35;
    transform: translateX(-4px);
}

.back-arrow {
    font-size: 1.25rem;
    transition: transform 0.2s ease;
}

.back-button:hover .back-arrow {
    transform: translateX(-4px);
}

.underline-title {
    position: relative;
    padding-bottom: 0.5rem;
    font-size: 2rem;
    font-weight: 700;
}

.underline-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    background: linear-gradient(90deg, #FF6B35, #FFA726);
}

.detail-content-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.project-info-section {
    display: flex;
    gap: 2rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    color: white;
}

.info-item {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.info-label {
    font-weight: 600;
    opacity: 0.9;
}

.info-value {
    font-weight: 500;
}

.section-block {
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
}

.section-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid #f3f4f6;
}

.section-text {
    color: #4b5563;
    font-size: 1rem;
    line-height: 1.8;
    text-align: justify;
}

.tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
}

.tech-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    transition: all 0.2s ease;
}

.tech-item:hover {
    background: #f3f4f6;
    border-color: #667eea;
}

.tech-icon {
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
    color: #4b5563;
}

.tech-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.tech-name {
    font-weight: 600;
    color: #1f2937;
    font-size: 0.938rem;
}

.tech-category {
    font-size: 0.75rem;
    color: #6b7280;
}

.feature-list,
.achievement-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.feature-item,
.achievement-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.75rem;
    background: #f9fafb;
    border-radius: 8px;
    transition: background 0.2s ease;
}

.feature-item:hover,
.achievement-item:hover {
    background: #f3f4f6;
}

.feature-bullet {
    color: #667eea;
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1;
}

.achievement-check {
    color: #10b981;
    font-size: 1.25rem;
    font-weight: bold;
}

.feature-text,
.achievement-text {
    color: #4b5563;
    line-height: 1.6;
    flex: 1;
}

.project-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-weight: 600;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.3s ease;
}

.project-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}

.not-found-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    gap: 2rem;
}

.not-found-text {
    font-size: 1.5rem;
    color: #6b7280;
    font-weight: 600;
}

.not-found-button {
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.not-found-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}

/* 響應式設計 */
@media (max-width: 768px) {
    .back-button-wrapper {
        top: 70px;
        left: 1rem;
    }

    .detail-content-wrapper {
        max-width: 90% !important;
    }

    .project-info-section {
        flex-direction: column;
        gap: 1rem;
    }

    .tech-grid {
        grid-template-columns: 1fr;
    }
}
</style>