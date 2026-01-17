import { transformLeetCodeStats } from '~/api/mapper/leetcodeMapper'
import type { LeetCodeProfileResponse } from '~/api/response/leetcode.response.dto'
import { USER_PROFILE_QUERY } from '~/constants/Common.contant'
import type { LeetCodeStats } from '~/types/leetcode.interface'

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
        // 修改重點：只傳 username，不傳 query 了
        const { data, error } = await useFetch('/api/leetcode', {
          method: 'POST',
          body: { username },
        })

        if (error.value) throw new Error(error.value.message)

        if (data.value) {
          // 這裡傳進去的 data.value 已經是新格式，Mapper 會處理好
          this.stats = transformLeetCodeStats(data.value)
        }
      } catch (error: any) {
        console.error('Failed to fetch LeetCode data:', error)
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    // 執行api回傳的資料存入store
    handleSetLeetcodeData(payload: LeetCodeStats) {
      this.stats = payload
    },
  },
})
