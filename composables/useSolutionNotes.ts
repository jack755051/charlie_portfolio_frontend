export const useSolutionNotes = () => {
  const { data: notes } = useAsyncData('solution-notes', () =>
    queryContent('/solutions').find()
  )

  const getSolution = (titleSlug: string) => {
    if (!notes.value) return null
    return notes.value.find(n => n._path === `/solutions/${titleSlug}`) || null
  }

  return { notes, getSolution }
}
