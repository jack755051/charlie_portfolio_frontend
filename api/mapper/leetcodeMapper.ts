import type { LeetCodeStats } from '~/types/leetcode.interface'
import dayjs from 'dayjs'

export const transformLeetCodeStats = (data: any): LeetCodeStats => {
  // 0. 防呆：如果完全沒資料
  if (!data) {
    return {
      totalSolved: 0,
      totalQuestions: 0,
      easy: 0,
      medium: 0,
      hard: 0,
      easyPct: 0,
      mediumPct: 0,
      hardPct: 0,
      calendar: [],
      recent: [],
      skills: [],
    }
  }

  // 1. 基礎數值處理
  const totalSolved = data.totalSolved || 0
  const totalQuestions = data.totalQuestions || 1

  const easy = data.easySolved || 0
  const medium = data.mediumSolved || 0
  const hard = data.hardSolved || 0

  const totalEasy = data.totalEasy || 1
  const totalMedium = data.totalMedium || 1
  const totalHard = data.totalHard || 1

  // 2. 處理 submissionCalendar (熱力圖)
  const calendarData: [string, number][] = []
  if (data.submissionCalendar) {
    Object.entries(data.submissionCalendar).forEach(([ts, count]) => {
      // 轉成 YYYY-MM-DD 格式
      const dateStr = dayjs.unix(Number(ts)).format('YYYY-MM-DD')
      calendarData.push([dateStr, Number(count)])
    })
  }

  // 3. 處理 recentSubmissions (近期提交列表) - 這是你 JSON 裡有的
  const recent = (data.recentSubmissions || []).slice(0, 5).map((sub: any) => ({
    title: sub.title,
    titleSlug: sub.titleSlug, // 可以用來做題目連結
    // 轉成 MM/DD 格式顯示比較簡潔
    time: dayjs.unix(Number(sub.timestamp)).format('MM/DD'),
    status: sub.statusDisplay, // e.g., "Accepted", "Wrong Answer"
    lang: sub.lang, // e.g., "typescript"
    isSuccess: sub.statusDisplay === 'Accepted', //用來判斷顯示綠燈或紅燈
  }))

  // 4. 處理 Skills (雷達圖)
  // 因為你無法改 Query，這裡做一個 fallback：
  // 如果 data.matchedUser.tagProblemCounts 存在就用，不存在就回傳空陣列 (或你可以寫死假資料)
  let skills: { name: string; value: number }[] = []

  if (data.matchedUser?.tagProblemCounts) {
    const { advanced, intermediate, fundamental } = data.matchedUser.tagProblemCounts
    const allTags = [...(advanced || []), ...(intermediate || []), ...(fundamental || [])]

    // 取前 6 名
    skills = allTags
      .sort((a: any, b: any) => b.problemsSolved - a.problemsSolved)
      .slice(0, 6)
      .map((t: any) => ({ name: t.tagName, value: t.problemsSolved }))
  }

  // 5. 回傳完整結構
  return {
    totalSolved,
    totalQuestions,
    easy,
    medium,
    hard,
    easyPct: Math.round((easy / totalEasy) * 100),
    mediumPct: Math.round((medium / totalMedium) * 100),
    hardPct: Math.round((hard / totalHard) * 100),
    calendar: calendarData,
    recent,
    skills,
  }
}
