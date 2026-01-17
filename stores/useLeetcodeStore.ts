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
        // 修改這裡：打自己的 Nuxt Server API
        const { data, error } = await useFetch<LeetCodeProfileResponse>('/api/leetcode', {
          method: 'POST',
          body: {
            username,
            query: USER_PROFILE_QUERY,
          },
        })

        if (error.value) {
          throw new Error(error.value.message)
        }

        if (data.value) {
          // 注意：這裡取回的 data.value 已經是 JSON 物件，不需要再 res.json()
          // 且結構通常是 { data: { ... } }，要看 LeetCode 回傳的層級
          this.stats = transformLeetCodeStats(data.value.data)
        }
      } catch (err: any) {
        console.error('Failed to fetch LeetCode data:', err)
        this.error = err.message || 'Unknown Error'
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
