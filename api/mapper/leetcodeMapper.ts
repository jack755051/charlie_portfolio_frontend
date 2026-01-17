// utils/mappers/leetcodeMapper.ts
import type { LeetCodeProfileResponse } from '@/types/LeetCodeProfileResponse'
import type { LeetCodeStats } from '@/types/leetcode'

export const transformLeetCodeStats = (
  data: LeetCodeProfileResponse | null
): LeetCodeStats | null => {
  // 1. 安全檢查
  const stats = data?.data?.matchedUser?.submitStats?.acSubmissionNum

  if (!stats) return null

  // 2. 提取邏輯
  const getCount = (diff: string) => stats.find((s: any) => s.difficulty === diff)?.count || 0

  const total = getCount('All')
  const easy = getCount('Easy')
  const medium = getCount('Medium')
  const hard = getCount('Hard')

  // 3. 回傳清洗後的資料
  return {
    total,
    easy,
    medium,
    hard,
    easyPct: total ? (easy / total) * 100 : 0,
    mediumPct: total ? (medium / total) * 100 : 0,
    hardPct: total ? (hard / total) * 100 : 0,
  }
}
