import { defineStore } from 'pinia'
import type {RouterLink} from "~/types/foundation.interface";
import type { IPortfolio } from '~/types/protfolio.interface';
import type { ITechnologyStack } from '~/types/technologyStack.interface';
import type { ITimeline } from '~/types/timeline.interface';
import { getIconComponent } from '~/utils/iconMap';

export const useMockStore = defineStore('mock',()=>{
    // 路由列表
    const routerLink = ref<RouterLink[]>([
        { router: '/', label: '首頁' },
        { router: '/about', label: '關於' },
        { router: '/portfolio', label: '作品集' }
    ])

    const timelineData = ref<ITimeline>({
        type: 'left',
        data: [
            {
                type: 'color-pointer',
                title: '資策會',
                time: '2021-05',
                content: '進入資策會學習前端技術。',
            },
            {
                type: 'color-pointer',
                title: '哈瑪星科技',
                time: '2021-11',
                content: [
                    '原住民族住宅業務系統',
                    '原住民族知識體系',
                    '台北市公報網前台&後台',
                    '台塑書城',
                    '電子書系統開發：(三民書局/奇鼎出版社/龍騰出版社/國家太空中心)',
                    '系統維護與功能巡檢：(監察院/司法院/銓敘部/國科會/台灣鐵路局/聯合醫院/土銀/台企銀/永豐銀/調查局)'
                ],
            },
            {
                  type: 'color-pointer',
                  title: '精誠資訊',
                  time: '2024-04',
                  content: [
                      '全國公教人員退休撫卹系統',
                  ],
              },
            {
                type: 'color-pointer',
                title: '昕力科技',
                time: '2024-07',
                content: [
                    'Systalk.Flow',
                    'Systalk.Audit',
                    '全球人壽Poc',
                    '微笑單車chatbot',
                    '饗賓chatbot',
                ],
            },
        ]
    });
    /**技術棧 */
    const technologyStack = ref<ITechnologyStack[]>([
      {
        title: '前端技術',
        stack: [
          { stackName: 'Angular', icon: 'AngularIcon' },
          { stackName: 'Vue', icon: 'VueIcon' },
          { stackName: 'Nuxt', icon: 'NuxtIcon' }
        ]
      },
      {
        title: '後端技術',
        stack: [
          { stackName: 'NodeJS', icon: 'NodeJSIcon' },
          { stackName: 'NestJS', icon: 'NestJSIcon' }
        ]
      },
      {
        title: '資料庫',
        stack: [
          { stackName: 'MySQL', icon: 'MysqlIcon' },
          { stackName: 'MongoDB', icon: 'MongoDBIcon' }
        ]
      },
      {
        title: '容器化技術',
        stack: [
          { stackName: 'Docker', icon: 'DockerIcon' }
        ]
      },
      {
        title: '狀態管理工具',
        stack: [
          { stackName: 'Ngrx', icon: 'NgrxIcon' },
          { stackName: 'RxJS', icon: 'RxJSIcon' },
          { stackName: 'Pinia', icon: 'PiniaIcon' }
        ]
      },
      {
        title: '圖表與視覺化',
        stack: [
          { stackName: 'Echart', icon: 'EchartIcon' }
        ]
      },
      {
        title: 'UI 框架',
        stack: [
          { stackName: 'AngularMaterial', icon: 'AngularMaterialIcon' },
          { stackName: 'AntDesign', icon: 'AntDesignIcon' }
        ]
      },
      {
        title: 'CSS 工具',
        stack: [
          { stackName: 'TailWind', icon: 'TailWindIcon' }
        ]
    },
      {
        title: '版控工具',
        stack: [
            { stackName: 'Git', icon: 'GitIcon' },
            { stackName: 'Nvm', icon: 'NvmIcon' }
        ]
      }
    ]);
  
    // ---- 作品頁面 相關資料 ----
    /** 作品頁面資料  */
    const portfolioPageData = ref<IPortfolio[]>([
        {
            id: 'systalk-adminhub',
            title: 'Systalk AdminHub',
            description: '企業級管理後台系統，提供完整的內容管理、用戶管理及數據分析功能。採用現代化前端技術棧，實現響應式設計與良好的用戶體驗。',
            role: '前端工程師',
            duration: '2024-07 ~ 至今',
            technologies: [
                { name: 'Nuxt 4', icon: 'NuxtIcon', category: '前端框架' },
                { name: 'Vue 3', icon: 'VueIcon', category: '前端框架' },
                { name: 'TypeScript', icon: 'TypeScriptIcon', category: '程式語言' },
                { name: 'Pinia', icon: 'PiniaIcon', category: '狀態管理' },
                { name: 'TailwindCSS', icon: 'TailWindIcon', category: 'CSS 框架' },
                { name: 'Vee-Validate', icon: 'VeeValidateIcon', category: '表單驗證' },
                { name: 'Vue I18n', icon: 'VueI18nIcon', category: '國際化' },
                { name: 'Heroicons', icon: 'HeroiconsIcon', category: '圖標庫' },
                { name: 'Lucide Icons', icon: 'LucideIcon', category: '圖標庫' },
                { name: 'ESLint', icon: 'ESLintIcon', category: '代碼品質' },
                { name: 'Prettier', icon: 'PrettierIcon', category: '代碼格式化' },
                { name: 'Docker', icon: 'DockerIcon', category: '容器化' },
                { name: 'Nginx', icon: 'NginxIcon', category: '網頁伺服器' }
            ],
            features: [
                '採用 Nuxt 4 最新版本，支援 SSR/SPA 模式切換',
                '使用 Composition API 與 TypeScript 開發，提升代碼可維護性',
                '整合 Pinia 進行狀態管理，實現數據流清晰可控',
                'TailwindCSS 實現響應式設計，支援多種螢幕尺寸',
                '使用 Vee-Validate 進行表單驗證，提升用戶體驗',
                '支援多語系切換（Vue I18n）',
                '整合 ESLint + Prettier 確保代碼品質與一致性',
                'Docker 容器化部署，搭配 Nginx 反向代理',
                '模組化組件設計（base/common/features 分層架構）'
            ],
            achievements: [
                '建立完整的組件庫架構，提升開發效率 40%',
                '實現可重用的 composables（路由、表格、API 等）',
                '設計統一的 API 請求/響應處理機制',
                '建立完善的專案結構與開發規範'
            ]
        }
    ]);
  
    // 處理技術棧資料並加入圖標組件的 computed
    const processedTechnologyStack = computed(() => {
        return technologyStack.value.map(category => ({
            ...category,
            stack: category.stack.map(item => ({
                ...item,
                iconComponent: getIconComponent(item.icon)
            }))
        }));
    });
  
    return{
        routerLink,
        timelineData,
        technologyStack,
        processedTechnologyStack,
        portfolioPageData
    }
})