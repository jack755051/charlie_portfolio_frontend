import { defineStore } from 'pinia'
import type {RouterLink} from "~/types/foundation.interface";
import type { ITimelineItem } from '~/types/timeline.interface';

export const useMockStore = defineStore('mock',()=>{
    // 路由列表
    const routerLink = ref<RouterLink[]>([
        { router: '/', label: '首頁' },
        { router: '/about', label: '關於' },
        { router: '/portfolio', label: '作品集' }
    ])

    const timelineData = ref<ITimelineItem[]>([
        {
            type: 'color-pointer',
            title: '開始學習程式設計',
            time: '2015-09',
            content: '在大學期間接觸到程式設計，開始自學前端技術。',
        },
        {
            type: 'color-pointer',
            title: '加入開源社區',
            time: '2017-06',
            content: ['參與多個開源項目', '貢獻代碼和文檔'],
        },
    ])
    return{
        routerLink,
        timelineData
    }
})