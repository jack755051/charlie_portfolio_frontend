import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const notesJsonPath = resolve(root, 'assets/data/notes.json')
const contentDir = resolve(root, 'content/notes')

// ─── Helpers ───

const extractNoteId = (url) => {
  const cleaned = url.split('?')[0].split('#')[0]
  const segments = cleaned.replace(/\/$/, '').split('/')
  const lastSegment = segments[segments.length - 1]
  if (lastSegment.startsWith('@')) return null
  return lastSegment
}

const fetchNoteMarkdown = async (url) => {
  const noteId = extractNoteId(url)
  if (!noteId) return null

  const downloadUrl = `https://hackmd.io/${noteId}/download`
  const response = await fetch(downloadUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' },
    redirect: 'follow',
  })

  if (!response.ok) throw new Error(`Failed to fetch ${downloadUrl}: ${response.status}`)
  return response.text()
}

// ─── Transform Layer ───

const stripHackmdFrontmatter = (markdown) => {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (match) return match[2]
  return markdown
}

const extractSummary = (body) => {
  // First non-heading, non-empty paragraph
  const lines = body.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#') || trimmed === '---') continue
    return trimmed.slice(0, 200)
  }
  return ''
}

const generateToc = (body) => {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const toc = []
  let match
  while ((match = headingRegex.exec(body)) !== null) {
    const level = match[1].length // 2 or 3
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fff\s-]/g, '')
      .replace(/\s+/g, '-')
    toc.push({ level, text, id })
  }
  return toc
}

const demoteHeadings = (body) => {
  // h1 → h2, h2 → h3, etc. (page title is in the header, not in prose)
  return body.replace(/^(#{1,5})\s/gm, (_, hashes) => '#' + hashes + ' ')
}

const buildNoteMd = (note, rawBody) => {
  const body = stripHackmdFrontmatter(rawBody)
  const summary = note.summary || extractSummary(body)
  const toc = generateToc(body)
  const demotedBody = demoteHeadings(body)

  const tocYaml = toc.length > 0
    ? `toc:\n${toc.map(t => `  - { level: ${t.level}, text: "${t.text.replace(/"/g, '\\"')}", id: "${t.id}" }`).join('\n')}`
    : 'toc: []'

  const lines = [
    '---',
    `title: "${note.title.replace(/"/g, '\\"')}"`,
    `hackmd_url: "${note.url}"`,
    `summary: "${summary.replace(/"/g, '\\"')}"`,
    `tags: [${note.tags.map(t => `"${t}"`).join(', ')}]`,
    `published_at: "${note.publishedAt}"`,
    `featured: ${note.featured}`,
    tocYaml,
    '---',
    '',
    demotedBody.trim(),
    '',
  ]
  return lines.join('\n')
}

// ─── Main ───

const main = async () => {
  const notesData = JSON.parse(readFileSync(notesJsonPath, 'utf8'))
  const notes = notesData.notes.filter(n => n.isVisible && n.url)

  mkdirSync(contentDir, { recursive: true })

  let synced = 0
  let skipped = 0
  let failed = 0

  for (const note of notes) {
    const noteId = extractNoteId(note.url)
    if (!noteId) {
      console.log(`  ⊘ ${note.title} — profile URL, no note to fetch`)
      skipped++
      continue
    }

    try {
      const raw = await fetchNoteMarkdown(note.url)
      if (!raw) { skipped++; continue }

      const slug = note.id || noteId
      const filePath = resolve(contentDir, `${slug}.md`)
      const md = buildNoteMd(note, raw)
      writeFileSync(filePath, md)
      console.log(`  ✓ ${note.title} → content/notes/${slug}.md`)
      synced++

      await new Promise(r => setTimeout(r, 300))
    } catch (err) {
      console.warn(`  ✗ ${note.title}: ${err.message}`)
      failed++
    }
  }

  console.log(`\nSync complete: ${synced} synced, ${skipped} skipped, ${failed} failed.`)
}

console.log('Syncing HackMD notes...')
await main()
