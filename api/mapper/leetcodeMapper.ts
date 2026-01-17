import type { LeetCodeStats } from '~/types/leetcode.interface'

export const transformLeetCodeStats = (data: any): LeetCodeStats => {
  // 防呆：確保 data 存在
  if (!data) return { total: 0, easy: 0, medium: 0, hard: 0, easyPct: 0, mediumPct: 0, hardPct: 0 }

  // 1. 取出數值 (API 欄位名稱變了，這裡對應新的名稱)
  const easy = data.easySolved || 0
  const medium = data.mediumSolved || 0
  const hard = data.hardSolved || 0
  const total = data.totalSolved || 0

  const totalEasy = data.totalEasy || 1
  const totalMedium = data.totalMedium || 1
  const totalHard = data.totalHard || 1

  // 2. 回傳原本 UI 需要的格式 (介面不變)
  return {
    total,
    easy,
    medium,
    hard,
    easyPct: Math.round((easy / totalEasy) * 100),
    mediumPct: Math.round((medium / totalMedium) * 100),
    hardPct: Math.round((hard / totalHard) * 100),
  }
}
