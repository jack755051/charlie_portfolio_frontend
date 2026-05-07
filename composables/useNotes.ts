import type { INote } from '~/types/notes.interface'
import notesData from '~/assets/data/notes.json'

export const useNotes = () => {
  const localNoteIds = ref(new Set<string>())

  // Load local content to check which notes have been synced
  const loadLocal = async () => {
    try {
      const result = await queryCollection('content').all()
      const notesPaths = result
        .filter((n: any) => n.path?.startsWith('/notes/'))
        .map((n: any) => n.path.replace('/notes/', ''))
      localNoteIds.value = new Set(notesPaths)
    } catch {
      localNoteIds.value = new Set()
    }
  }
  loadLocal()

  const visibleNotes = computed<(INote & { hasLocalContent: boolean })[]>(() =>
    (notesData.notes as INote[])
      .filter(note => note.isVisible)
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1
        const aTime = Date.parse(a.publishedAt) || 0
        const bTime = Date.parse(b.publishedAt) || 0
        return bTime - aTime
      })
      .map(note => ({
        ...note,
        hasLocalContent: localNoteIds.value.has(note.id),
      }))
  )

  const featuredNotes = computed(() => visibleNotes.value.filter(note => note.featured))
  const recentNotes = computed(() => visibleNotes.value.filter(note => !note.featured))

  const hackmdProfileUrl = 'https://hackmd.io/@jack755051'

  return { visibleNotes, featuredNotes, recentNotes, hackmdProfileUrl }
}
