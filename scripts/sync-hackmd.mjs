import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const notesJsonPath = resolve(root, 'assets/data/notes.json')
const contentDir = resolve(root, 'content/notes')

const hackmdApiToken = process.env.HACKMD_API_TOKEN || ''
const syncTag = process.env.HACKMD_SYNC_TAG || 'portfolio'

// ─── HackMD API (auto-discover mode) ───

const fetchHackmdNotes = async () => {
  const response = await fetch('https://api.hackmd.io/v1/notes', {
    headers: {
      Authorization: `Bearer ${hackmdApiToken}`,
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) throw new Error(`HackMD API failed: ${response.status}`)
  return response.json()
}

const discoverNotes = async () => {
  console.log(`Auto-discovering public notes with tag "${syncTag}"...`)
  const allNotes = await fetchHackmdNotes()

  // Filter: public + has the sync tag
  const filtered = allNotes.filter(note => {
    const isPublic = note.publishType === 'view' || note.readPermission === 'guest'
    const tags = note.tags || []
    const hasTag = tags.some(t => t.toLowerCase() === syncTag.toLowerCase())
    return isPublic && hasTag
  })

  console.log(`  Found ${filtered.length} notes with tag "${syncTag}" (out of ${allNotes.length} total)`)

  // Build notes.json entries from API data
  const notes = filtered.map((note, index) => ({
    id: note.permalink || note.shortId,
    url: `https://hackmd.io/@${note.userPath}/${note.permalink || note.shortId}`,
    title: note.title || 'Untitled',
    summary: '',
    tags: note.tags || [],
    publishedAt: note.createdAt ? note.createdAt.split('T')[0] : new Date().toISOString().split('T')[0],
    updatedAt: note.lastChangedAt ? note.lastChangedAt.split('T')[0] : null,
    featured: false,
    displayOrder: index,
    isVisible: true,
  }))

  return notes
}

// ─── Markdown Fetch & Transform ───

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

const stripHackmdFrontmatter = (markdown) => {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (match) return match[2]
  return markdown
}

const extractSummary = (body) => {
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
    const level = match[1].length
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
    `summary: "${(summary || '').replace(/"/g, '\\"')}"`,
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

// ─── Sync Logic ───

const syncNotes = async (notes) => {
  mkdirSync(contentDir, { recursive: true })

  let synced = 0
  let skipped = 0
  let failed = 0

  for (const note of notes) {
    const noteId = extractNoteId(note.url)
    if (!noteId) {
      console.log(`  ⊘ ${note.title} — profile URL, skipped`)
      skipped++
      continue
    }

    try {
      const raw = await fetchNoteMarkdown(note.url)
      if (!raw || raw.startsWith('<!DOCTYPE')) {
        console.warn(`  ⊘ ${note.title} — not public or unavailable`)
        skipped++
        continue
      }

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

  return { synced, skipped, failed }
}

// ─── Main ───

const main = async () => {
  let notes

  if (hackmdApiToken) {
    // Auto-discover mode: fetch all public notes with sync tag
    const discovered = await discoverNotes()

    // Merge with existing notes.json (preserve manual overrides like featured/summary)
    const existing = JSON.parse(readFileSync(notesJsonPath, 'utf8'))
    const existingMap = new Map(existing.notes.map(n => [n.url, n]))

    notes = discovered.map(n => {
      const prev = existingMap.get(n.url)
      if (prev) {
        // Preserve manual fields, update auto fields
        return {
          ...prev,
          title: n.title,
          tags: n.tags.length > 0 ? n.tags : prev.tags,
          updatedAt: n.updatedAt || prev.updatedAt,
        }
      }
      return n
    })

    // Update notes.json
    const updatedJson = {
      ...existing,
      generatedAt: new Date().toISOString(),
      version: (existing.version || 0) + 1,
      notes,
    }
    writeFileSync(notesJsonPath, JSON.stringify(updatedJson, null, 2) + '\n')
    console.log(`Updated notes.json: ${notes.length} notes.`)
  } else {
    // Whitelist mode: use existing notes.json
    console.log('No HACKMD_API_TOKEN set, using notes.json whitelist.')
    const existing = JSON.parse(readFileSync(notesJsonPath, 'utf8'))
    notes = existing.notes.filter(n => n.isVisible && n.url)
  }

  console.log(`\nSyncing ${notes.length} note(s)...`)
  const { synced, skipped, failed } = await syncNotes(notes)
  console.log(`\nSync complete: ${synced} synced, ${skipped} skipped, ${failed} failed.`)
}

console.log('Syncing HackMD notes...')
await main()
