import { transformLeetCodeStats } from '~/api/mapper/leetcodeMapper'
import type { LeetCodeStats } from '~/types/leetcode.interface'
import mockData from '~/assets/data/leetcode-mock.json'

export const useLeetcodeStore = defineStore('leetcode', {
  state: () => ({
    stats: null as LeetCodeStats | null,
    loading: false,
    error: null as string | null,
  }),
  getters: {
    getStats: state => state.stats,
    // 這裡加一個 getter 方便前端拿到清洗後的資料
    userStats: state => state.stats,
  },
  actions: {
    // 執行api取得資料
    async fetchLeetcodeData(username: string) {
      this.loading = true
      this.error = null

      try {
        // --- 模擬 API 請求 ---

        // 1. 模擬網路延遲 (0.5秒)，讓 Loading 動畫跑一下，使用者體驗比較好
        await new Promise(resolve => setTimeout(resolve, 500))

        // 2. 使用引入的 mockData，並經過 Mapper 清洗
        // transformLeetCodeStats 會幫你算出百分比、格式化日期
        const cleanedData = transformLeetCodeStats(mockData)

        // 3. 存入 State
        this.stats = cleanedData

        console.log('LeetCode Data Loaded (Mock Mode from JSON file)')
      } catch (error: any) {
        console.error('Failed to load LeetCode data:', error)
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    // 這個 action 如果沒用到可以移除，因為我們直接在 fetch 裡設定了
    handleSetLeetcodeData(payload: LeetCodeStats) {
      this.stats = payload
    },
  },
})
