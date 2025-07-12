import { defineStore } from 'pinia'
import type {RouterLink} from "~/types/foundation.interface";

export const useMockStore = defineStore('mock',()=>{
    // 路由列表
    const routerLink = ref<RouterLink[]>([
        { router: '/', label: '首頁' },
        { router: '/about', label: '關於' },
        { router: '/portfolio', label: '作品集' }
    ])


    return{
        routerLink,
    }
})