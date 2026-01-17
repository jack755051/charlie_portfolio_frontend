// composable/useTechStack.ts
import { ref } from 'vue'
import type { Component } from 'vue'

// 定義介面
export interface ITechItem {
  name: string
  iconName: string // 對應您的 Icon Component 名稱
  color?: string // (選用) 該技術的品牌色，例如 Vue 是 #42b883
}

export interface ITechCategory {
  title: string
  description?: string // 增加一行描述，更有質感
  items: ITechItem[]
  class?: string // 用於控制 Bento Grid 的跨欄 (col-span-2)
}

export const useTechStack = () => {
  const techStack = ref<ITechCategory[]>([
    {
      title: '核心前端框架',
      description: 'Modern Frontend',
      class: 'col-span-1 md:col-span-2', // 這一格比較重要，讓它寬一點
      items: [
        { name: 'Vue 3', iconName: 'VueIcon', color: 'text-green-500' },
        { name: 'Nuxt 3', iconName: 'NuxtIcon', color: 'text-green-600' },
        { name: 'Angular', iconName: 'AngularIcon', color: 'text-red-600' },
        { name: 'React', iconName: 'ReactIcon', color: 'text-blue-400' },
        { name: 'TypeScript', iconName: 'TypeScriptIcon', color: 'text-blue-600' },
      ],
    },
    {
      title: '後端與架構',
      description: 'Backend & Architecture',
      items: [
        { name: 'Node.js', iconName: 'NodeJSIcon', color: 'text-green-600' },
        { name: 'NestJS', iconName: 'NestJSIcon', color: 'text-red-500' },
        { name: 'Docker', iconName: 'DockerIcon', color: 'text-blue-500' },
        { name: 'Nx', iconName: 'NxIcon' }, // 假設您有 Monorepo 經驗
      ],
    },
    {
      title: '狀態管理與資料流',
      description: 'State Management',
      items: [
        { name: 'Pinia', iconName: 'PiniaIcon', color: 'text-yellow-500' },
        { name: 'RxJS', iconName: 'RxJSIcon', color: 'text-pink-600' },
        { name: 'NgRx', iconName: 'NgrxIcon', color: 'text-purple-600' },
        { name: 'TanStack Query', iconName: 'TanstackIcon' },
      ],
    },
    {
      title: '樣式與 UI 系統',
      description: 'Styling & UI',
      class: 'col-span-1 md:col-span-2', // 這格內容多，也讓它寬一點
      items: [
        { name: 'Tailwind CSS', iconName: 'TailWindIcon', color: 'text-cyan-400' },
        { name: 'Ant Design', iconName: 'AntDesignIcon', color: 'text-blue-500' },
        { name: 'Angular Material', iconName: 'AngularMaterialIcon' },
        { name: 'Shadcn/UI', iconName: 'ShadcnIcon' },
        { name: 'SCSS', iconName: 'SassIcon', color: 'text-pink-500' },
        { name: 'ECharts', iconName: 'EchartIcon' },
      ],
    },
    {
      title: '資料庫',
      description: 'Database',
      items: [
        { name: 'MySQL', iconName: 'MysqlIcon' },
        { name: 'MongoDB', iconName: 'MongoDBIcon', color: 'text-green-500' },
        { name: 'PostgreSQL', iconName: 'PostgresIcon' },
      ],
    },
    {
      title: '開發工具',
      description: 'DevOps & Tools',
      items: [
        { name: 'Git', iconName: 'GitIcon', color: 'text-orange-600' },
        { name: 'NVM', iconName: 'NvmIcon' },
        { name: 'Postman', iconName: 'PostmanIcon' },
      ],
    },
  ])

  return { techStack }
}
