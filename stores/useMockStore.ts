import { defineStore } from 'pinia'
import type { IAnchor } from '~/types/anchor.interface';
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
    /**首頁頁面錨點*/
    const anchorHomePage = ref<IAnchor[]>([
        { key: 'section1', href: '#section1', title: '首頁' },
    ]);
    /**關於頁面錨點*/
    const anchorAboutPage = ref<IAnchor[]>([
        { key: 'section1', href: '#section1', title: '關於我' },
        { key: 'section2', href: '#section2', title: '我的經驗' },
        { key: 'section3', href: '#section3', title: '我的技術棧' }
    ]);
    /**作品集頁面錨點*/
    const anchorPortfolioPage = ref<IAnchor[]>([
        { key: 'section1', href: '#section1', title: '最上方' },
        { key: 'section2', href: '#section2', title: '關於我' },
        { key: 'section3', href: '#section3', title: '我的經驗' }
    ]);
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
    const portfolioPageData = ref<IPortfolio | null>(null);
  
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
        anchorHomePage,
        anchorAboutPage,
        anchorPortfolioPage,
        technologyStack,
        processedTechnologyStack,
        portfolioPageData
    }
})