// server/api/leetcode.post.ts
export default defineEventHandler(async (event) => {
  // 1. 讀取前端傳來的資料
  const body = await readBody(event)
  const { username, query } = body

  if (!username || !query) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username and Query are required',
    })
  }

  // 2. 定義 LeetCode URL
  const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql'

  try {
    // 3. 發送請求 (加強版 Headers)
    console.log(`[LeetCode API] Fetching data for: ${username}...`)

    const response = await $fetch(LEETCODE_API_ENDPOINT, {
      method: 'POST',
      headers: {
        // 核心偽裝：告訴伺服器我是瀏覽器，接受 JSON
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://leetcode.com/',
        'Origin': 'https://leetcode.com',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': '*/*',
        // 有時候需要這行來避免 Cloudflare 壓縮導致的解碼錯誤
        'Accept-Encoding': 'gzip, deflate, br', 
      },
      body: {
        query: query,
        variables: { username }
      }
    })

    console.log('[LeetCode API] Success!')
    return response

  } catch (error: any) {
    // 4. 進階錯誤除錯 (Debug)
    // 這裡會把詳細錯誤印在你的 VSCode 終端機，而不是瀏覽器
    console.error('❌ LeetCode Fetch Error Details:')
    console.error('Status:', error.statusCode || error.response?.status)
    console.error('Message:', error.message)
    console.error('Response Body:', error.data || error.response?._data)

    // 回傳給前端的友善錯誤
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: error.message || 'Failed to fetch data from LeetCode',
      data: error.data || error.response?._data // 讓前端也能看到部分錯誤內容
    })
  }
})