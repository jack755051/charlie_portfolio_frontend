import type { Component } from 'vue'

// 定義介面
export interface ITechItem {
  name: string
  iconName: string
  color?: string
}

export interface ITechCategory {
  titleKey: string // 改為返回 i18n key
  descriptionKey: string // 改為返回 i18n key
  items: ITechItem[]
  class?: string
}

export const useTechStack = () => {
  const techStack = ref<ITechCategory[]>([
    {
      titleKey: 'about.section3.categories.frontend.title',
      descriptionKey: 'about.section3.categories.frontend.description',
      class: 'col-span-1 md:col-span-2',
      items: [
        { name: 'Vue 3', iconName: 'VueIcon', color: 'text-green-500' },
        { name: 'Nuxt 3', iconName: 'NuxtIcon', color: 'text-green-600' },
        { name: 'Angular', iconName: 'AngularIcon', color: 'text-red-600' },
        { name: 'React', iconName: 'ReactIcon', color: 'text-blue-400' },
        { name: 'TypeScript', iconName: 'TypeScriptIcon', color: 'text-blue-600' },
      ],
    },
    {
      titleKey: 'about.section3.categories.backend.title',
      descriptionKey: 'about.section3.categories.backend.description',
      items: [
        { name: 'Node.js', iconName: 'NodeJSIcon', color: 'text-green-600' },
        { name: 'NestJS', iconName: 'NestJSIcon', color: 'text-red-500' },
        { name: 'Docker', iconName: 'DockerIcon', color: 'text-blue-500' },
        { name: 'Nx', iconName: 'NxIcon' },
      ],
    },
    {
      titleKey: 'about.section3.categories.state.title',
      descriptionKey: 'about.section3.categories.state.description',
      items: [
        { name: 'Pinia', iconName: 'PiniaIcon', color: 'text-yellow-500' },
        { name: 'RxJS', iconName: 'RxJSIcon', color: 'text-pink-600' },
        { name: 'NgRx', iconName: 'NgrxIcon', color: 'text-purple-600' },
        { name: 'TanStack Query', iconName: 'TanstackIcon' },
      ],
    },
    {
      titleKey: 'about.section3.categories.ui.title',
      descriptionKey: 'about.section3.categories.ui.description',
      class: 'col-span-1 md:col-span-2',
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
      titleKey: 'about.section3.categories.database.title',
      descriptionKey: 'about.section3.categories.database.description',
      items: [
        { name: 'MySQL', iconName: 'MysqlIcon' },
        { name: 'MongoDB', iconName: 'MongoDBIcon', color: 'text-green-500' },
        { name: 'PostgreSQL', iconName: 'PostgresIcon' },
      ],
    },
    {
      titleKey: 'about.section3.categories.tools.title',
      descriptionKey: 'about.section3.categories.tools.description',
      items: [
        { name: 'Git', iconName: 'GitIcon', color: 'text-orange-600' },
        { name: 'NVM', iconName: 'NvmIcon' },
        { name: 'Postman', iconName: 'PostmanIcon' },
      ],
    },
  ])

  return { techStack }
}
