export const USER_PROFILE_QUERY = `
  query getUserProfile($username: String!) {
    allQuestionsCount { difficulty, count }
    matchedUser(username: $username) { ... }
  }
`
