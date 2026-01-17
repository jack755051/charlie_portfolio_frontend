// server/api/leetcode.post.ts
export default defineEventHandler(async event => {
  const body = await readBody(event)
  const { username, query } = body

  if (!username) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username is required',
    })
  }

  try {
    const response = await $fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 偽裝成瀏覽器，騙過 LeetCode 的防火牆
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Referer: 'https://leetcode.com/',
        Origin: 'https://leetcode.com',
      },
      body: {
        query: query,
        variables: { username },
      },
    })

    return response
  } catch (error) {
    console.error('LeetCode API Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch data from LeetCode',
    })
  }
})
