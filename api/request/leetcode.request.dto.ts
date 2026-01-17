export interface LeetCodeGraphQLRequest {
  query: string // <--- 你的 const query 字串就在這裡！
  variables?: {
    // 你的 jack755051 變數在這裡
    username: string
    [key: string]: any
  }
  operationName?: string
}
