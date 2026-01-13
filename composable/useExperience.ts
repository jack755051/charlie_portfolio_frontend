// composable/useExperience.ts
import { ref } from 'vue'

export interface IExperience {
    company: string
    role: string
    period: string
    description: string
    projects: string[] // 專案列表
    stack: string[]    // 使用技術
    isActive?: boolean // 是否為在職中
}

export const useExperience = () => {
    const experienceData = ref<IExperience[]>([
        {
            company: '昕力科技 (TPIsoftware)',
            role: 'Frontend Engineer',
            period: '2024.07 - Present',
            isActive: true, // 亮燈顯示
            description: '專注於 AI 對話產品與企業級管理系統的前端開發。負責將複雜的 AI 邏輯轉化為直觀的對話介面，並構建高擴展性的後台架構。',
            projects: [
                'Systalk.Flow (AI 對話流程設計)',
                'Systalk.Audit (稽核系統)',
                'AdminHub (金鑰管理平台)', // 補上您提到的
                '微笑單車 Chatbot',
                '饗賓餐旅 Chatbot',
                '全球人壽 POC'
            ],
            stack: ['Vue 3', 'Nuxt 3', 'Tailwind', 'Docker', 'LLM Integration']
        },
        {
            company: '精誠資訊 (SYSTEX)',
            role: 'Frontend Engineer',
            period: '2024.04 - 2024.06',
            isActive: false,
            description: '參與政府大型退休撫卹系統開發，專注於複雜表單邏輯處理與舊系統移轉。',
            projects: [
                '全國公教人員退休撫卹系統'
            ],
            stack: ['Vue 2', 'Element UI', 'Legacy System Migration']
        },
        {
            company: '哈瑪星科技 (HaMaStar)',
            role: 'Frontend Engineer',
            period: '2021.11 - 2024.03',
            isActive: false,
            description: '擔任主力前端開發，跨足電子書商城、政府標案與系統維運。具備同時維護多個專案並快速切換 context 的能力。',
            projects: [
                '原住民族住宅業務系統',
                '原住民族知識體系',
                '台北市公報網',
                '台塑書城',
                '電子書系統 (三民/奇鼎/龍騰)',
                '系統維護 (監察院/司法院/台鐵)' // 合併過多的維護項目
            ],
            stack: ['Angular', 'RxJS', 'TypeScript', 'SCSS']
        },
        {
            company: '資策會 (III)',
            role: 'Frontend Trainee',
            period: '2021.05 - 2021.10',
            isActive: false,
            description: '透過高強度的集訓，建立紮實的網頁開發基礎，包含 HTML/CSS/JS 核心觀念與框架入門。',
            projects: [],
            stack: ['HTML/CSS', 'JavaScript', 'Vue.js Basics']
        }
    ])

    return {
        experienceData
    }
}