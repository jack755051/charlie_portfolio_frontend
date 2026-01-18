export interface LeetCodeStats {
  // 基礎數據
  totalSolved: number
  totalQuestions: number
  easy: number
  medium: number
  hard: number

  // 百分比 (UI 進度條用)
  easyPct: number
  mediumPct: number
  hardPct: number

  // 熱力圖數據
  calendar: [string, number][]

  // --- 新增部分 ---

  // 近期提交列表 (從 recentSubmissions 轉換)
  recent: {
    title: string
    titleSlug: string
    time: string
    status: string
    lang: string
    isSuccess: boolean
  }[]

  // 技能雷達圖數據 (如果第三方 API 沒給 tag，這會是空陣列或預設值)
  skills: {
    name: string
    value: number
  }[]
}
