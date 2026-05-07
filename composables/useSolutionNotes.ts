import type { Ref } from 'vue'

export const useSolutionNotes = () => {
  const notes: Ref<any[] | null> = ref(null)
  const loaded = ref(false)

  const load = async () => {
    if (loaded.value) return
    try {
      const result = await queryCollection('content').all()
      notes.value = result.filter((n: any) => n.path?.startsWith('/solutions/'))
      loaded.value = true
    } catch {
      notes.value = []
      loaded.value = true
    }
  }

  const getSolution = (titleSlug: string) => {
    if (!notes.value) return null
    return notes.value.find((n: any) => n.path === `/solutions/${titleSlug}`) || null
  }

  // Trigger load immediately
  load()

  return { notes, loaded, getSolution }
}
