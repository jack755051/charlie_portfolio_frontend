import type { INote } from '~/types/notes.interface'
import notesData from '~/assets/data/notes.json'

export const useNotes = () => {
  const visibleNotes = computed<INote[]>(() =>
    (notesData.notes as INote[])
      .filter(note => note.isVisible)
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1
        const aTime = Date.parse(a.publishedAt) || 0
        const bTime = Date.parse(b.publishedAt) || 0
        return bTime - aTime
      })
  )

  const featuredNotes = computed(() => visibleNotes.value.filter(note => note.featured))
  const recentNotes = computed(() => visibleNotes.value.filter(note => !note.featured))

  const hackmdProfileUrl = 'https://hackmd.io/@jack755051'

  return { visibleNotes, featuredNotes, recentNotes, hackmdProfileUrl }
}
