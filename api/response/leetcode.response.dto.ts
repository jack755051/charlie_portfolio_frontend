// 基礎類型定義
interface DifficultyCount {
  difficulty: 'All' | 'Easy' | 'Medium' | 'Hard'
  count: number
}

interface SubmissionStat extends DifficultyCount {
  submissions: number
}

interface RecentSubmission {
  id: string
  title: string
  titleSlug: string
  timestamp: string // LeetCode 回傳的是字串型態的 timestamp
}

// 主要 Response DTO
export interface LeetCodeProfileResponse {
  data: {
    // 1. 總題目數
    allQuestionsCount: DifficultyCount[]

    // 2. 使用者資訊
    matchedUser: {
      username: string
      githubUrl: string | null
      twitterUrl: string | null

      /** * 注意：這是一個 JSON 格式的字串，包含 timestamps 和提交次數
       * 需要用 JSON.parse() 轉成物件
       */
      submissionCalendar: string

      submitStats: {
        acSubmissionNum: SubmissionStat[]
      }
    } | null // 如果找不到使用者，可能會是 null

    // 3. 競賽積分 (沒參加過可能是 null)
    userContestRanking: {
      rating: number
      globalRanking: number
      topPercentage: number
    } | null

    // 4. 最近解題紀錄
    recentAcSubmissionList: RecentSubmission[]
  }
}
