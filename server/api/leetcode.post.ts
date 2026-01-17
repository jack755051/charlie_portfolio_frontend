export default defineEventHandler(async event => {
  const body = await readBody(event)
  const { username } = body

  if (!username) {
    throw createError({ statusCode: 400, statusMessage: 'Username is required' })
  }

  try {
    // 改用第三方代理 API，自動處理 Cloudflare 驗證
    const response = await $fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`)

    // 檢查是否成功 (如果 username 錯誤，這個 API 會回傳 errors 物件)
    if ((response as any).errors) {
      throw new Error('User not found')
    }

    return response
  } catch (error: any) {
    console.error('LeetCode Proxy Error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch data' })
  }
})
