import type { LeetCodeProfile } from '~/types/leetcode.interface'
import leetcodeProfile from '~/assets/data/leetcode-profile.json'

export const useLeetcodeProfile = () => {
  const profile = computed(() => leetcodeProfile as LeetCodeProfile)
  const loading = ref(false)
  const error = computed(() => null as string | null)

  return {
    profile,
    loading,
    error,
  }
}
