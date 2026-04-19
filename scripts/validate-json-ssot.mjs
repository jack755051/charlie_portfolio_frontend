import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()

const readJson = path => JSON.parse(readFileSync(resolve(root, path), 'utf8'))
const readJsonIfExists = path => {
  const abs = resolve(root, path)
  if (!existsSync(abs)) return null
  return JSON.parse(readFileSync(abs, 'utf8'))
}

const siteReference = readJson('assets/data/site-reference.json')
const portfolioProjects = readJson('assets/data/portfolio-projects.json')
const leetcodeProfile = readJson('assets/data/leetcode-profile.json')
const githubProjects = readJsonIfExists('assets/data/github-projects.json')
const githubOverrides = readJsonIfExists('assets/data/github-projects.overrides.json')

const errors = []

const assert = (condition, message) => {
  if (!condition) errors.push(message)
}

const isDateTime = value => typeof value === 'string' && !Number.isNaN(Date.parse(value))
const isSlug = value => typeof value === 'string' && /^[a-z0-9-]+$/.test(value)
const isIconKey = value => typeof value === 'string' && /^[A-Za-z0-9]+Icon$/.test(value)
const isHttpsOrNull = value =>
  value === null || (typeof value === 'string' && /^https:\/\//.test(value))

assert(siteReference.schema_version === 1, 'site-reference.schema_version must be 1')
assert(isDateTime(siteReference.generatedAt), 'site-reference.generatedAt must be date-time')
assert(Array.isArray(siteReference.navigationMenus), 'site-reference.navigationMenus must be array')
assert(Array.isArray(siteReference.pageAnchors), 'site-reference.pageAnchors must be array')
assert(
  Array.isArray(siteReference.technologyCatalogs),
  'site-reference.technologyCatalogs must be array'
)
assert(Array.isArray(siteReference.iconRegistry), 'site-reference.iconRegistry must be array')
assert(
  Number.isInteger(siteReference.version) && siteReference.version >= 1,
  'site-reference.version must be positive integer'
)

const iconKeys = new Set()
for (const icon of siteReference.iconRegistry || []) {
  assert(isSlug(icon.id), `iconRegistry id is invalid: ${icon.id}`)
  assert(isIconKey(icon.iconKey), `iconRegistry iconKey is invalid: ${icon.iconKey}`)
  assert(
    typeof icon.assetPath === 'string' && icon.assetPath.length > 0,
    `iconRegistry assetPath is required: ${icon.id}`
  )
  assert(
    typeof icon.componentName === 'string' && icon.componentName.length > 0,
    `iconRegistry componentName is required: ${icon.id}`
  )
  assert(
    icon.fallbackIconKey === null || isIconKey(icon.fallbackIconKey),
    `iconRegistry fallbackIconKey is invalid: ${icon.id}`
  )
  assert(
    typeof icon.isAvailable === 'boolean',
    `iconRegistry isAvailable must be boolean: ${icon.id}`
  )
  iconKeys.add(icon.iconKey)
}

for (const item of siteReference.navigationMenus || []) {
  assert(isSlug(item.id), `navigationMenus id is invalid: ${item.id}`)
  assert(
    typeof item.routePath === 'string' && /^\/[A-Za-z0-9_/-]*$/.test(item.routePath),
    `navigationMenus routePath is invalid: ${item.id}`
  )
  assert(
    typeof item.label === 'string' && item.label.length > 0,
    `navigationMenus label is required: ${item.id}`
  )
  assert(
    Number.isInteger(item.displayOrder) && item.displayOrder >= 0,
    `navigationMenus displayOrder is invalid: ${item.id}`
  )
  assert(
    typeof item.isVisible === 'boolean',
    `navigationMenus isVisible must be boolean: ${item.id}`
  )
}

for (const anchor of siteReference.pageAnchors || []) {
  assert(isSlug(anchor.id), `pageAnchors id is invalid: ${anchor.id}`)
  assert(
    ['home', 'about', 'portfolio'].includes(anchor.pageCode),
    `pageAnchors pageCode is invalid: ${anchor.id}`
  )
  assert(/^section[0-9]+$/.test(anchor.key), `pageAnchors key is invalid: ${anchor.id}`)
  assert(/^#section[0-9]+$/.test(anchor.href), `pageAnchors href is invalid: ${anchor.id}`)
  assert(
    typeof anchor.title === 'string' && anchor.title.length > 0,
    `pageAnchors title is required: ${anchor.id}`
  )
  assert(
    Number.isInteger(anchor.displayOrder) && anchor.displayOrder >= 0,
    `pageAnchors displayOrder is invalid: ${anchor.id}`
  )
}

for (const category of siteReference.technologyCatalogs || []) {
  assert(isSlug(category.id), `technologyCatalogs id is invalid: ${category.id}`)
  assert(
    typeof category.titleKey === 'string' && category.titleKey.length > 0,
    `technologyCatalogs titleKey is required: ${category.id}`
  )
  assert(
    typeof category.descriptionKey === 'string' && category.descriptionKey.length > 0,
    `technologyCatalogs descriptionKey is required: ${category.id}`
  )
  assert(Array.isArray(category.items), `technologyCatalogs items must be array: ${category.id}`)
  for (const item of category.items || []) {
    assert(
      typeof item.name === 'string' && item.name.length > 0,
      `technology item name is required: ${category.id}`
    )
    assert(
      iconKeys.has(item.iconName),
      `technology item iconName is not registered: ${category.id}.${item.iconName}`
    )
    assert(
      item.color === null || typeof item.color === 'string',
      `technology item color must be string or null: ${category.id}.${item.name}`
    )
  }
}

assert(portfolioProjects.schema_version === 1, 'portfolio-projects.schema_version must be 1')
assert(
  isDateTime(portfolioProjects.generatedAt),
  'portfolio-projects.generatedAt must be date-time'
)
assert(Array.isArray(portfolioProjects.projects), 'portfolio-projects.projects must be array')
assert(
  Number.isInteger(portfolioProjects.version) && portfolioProjects.version >= 1,
  'portfolio-projects.version must be positive integer'
)

for (const project of portfolioProjects.projects || []) {
  assert(isSlug(project.id), `project id is invalid: ${project.id}`)
  assert(
    ['company', 'personal'].includes(project.projectType),
    `projectType is invalid: ${project.id}`
  )
  assert(project.i18nNamespace === 'portfolio.projects', `i18nNamespace is invalid: ${project.id}`)
  assert(isHttpsOrNull(project.link), `project link must be https or null: ${project.id}`)
  assert(Array.isArray(project.technologies), `project technologies must be array: ${project.id}`)
  assert(Array.isArray(project.screenshots), `project screenshots must be array: ${project.id}`)
  assert(
    Number.isInteger(project.displayOrder) && project.displayOrder >= 0,
    `project displayOrder is invalid: ${project.id}`
  )
  assert(
    typeof project.isPublished === 'boolean',
    `project isPublished must be boolean: ${project.id}`
  )

  for (const tech of project.technologies || []) {
    assert(
      typeof tech.name === 'string' && tech.name.length > 0,
      `project technology name is required: ${project.id}`
    )
    assert(
      iconKeys.has(tech.icon),
      `project technology icon is not registered: ${project.id}.${tech.icon}`
    )
    assert(
      tech.category === null || typeof tech.category === 'string',
      `project technology category must be string or null: ${project.id}.${tech.name}`
    )
  }

  for (const screenshot of project.screenshots || []) {
    assert(
      typeof screenshot.url === 'string' && screenshot.url.length > 0,
      `project screenshot url is required: ${project.id}`
    )
    assert(
      screenshot.caption === null || typeof screenshot.caption === 'string',
      `project screenshot caption must be string or null: ${project.id}`
    )
  }
}

assert(leetcodeProfile.schema_version === 1, 'leetcode-profile.schema_version must be 1')
assert(/^leetcode:[A-Za-z0-9_-]{1,32}$/.test(leetcodeProfile.id), 'leetcode-profile.id is invalid')
assert(
  /^[A-Za-z0-9_-]{1,32}$/.test(leetcodeProfile.username),
  'leetcode-profile.username is invalid'
)

for (const key of [
  'totalSolved',
  'totalQuestions',
  'easy',
  'medium',
  'hard',
  'easyPct',
  'mediumPct',
  'hardPct',
  'version',
]) {
  assert(
    Number.isInteger(leetcodeProfile[key]) && leetcodeProfile[key] >= 0,
    `leetcode-profile.${key} must be non-negative integer`
  )
}

for (const key of ['easyPct', 'mediumPct', 'hardPct']) {
  assert(leetcodeProfile[key] <= 100, `leetcode-profile.${key} must be <= 100`)
}

assert(Array.isArray(leetcodeProfile.calendar), 'leetcode-profile.calendar must be array')
for (const item of leetcodeProfile.calendar || []) {
  assert(Array.isArray(item) && item.length === 2, 'leetcode-profile.calendar item must be tuple')
  assert(
    /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(item[0]),
    `leetcode-profile.calendar date is invalid: ${item[0]}`
  )
  assert(
    Number.isInteger(item[1]) && item[1] >= 0,
    `leetcode-profile.calendar count is invalid: ${item[0]}`
  )
}

assert(Array.isArray(leetcodeProfile.recent), 'leetcode-profile.recent must be array')
for (const item of leetcodeProfile.recent || []) {
  assert(
    typeof item.title === 'string' && item.title.length > 0,
    'leetcode-profile.recent.title is required'
  )
  assert(
    typeof item.titleSlug === 'string' && item.titleSlug.length > 0,
    `leetcode-profile.recent.titleSlug is required: ${item.title}`
  )
  assert(
    typeof item.time === 'string' && item.time.length > 0,
    `leetcode-profile.recent.time is required: ${item.title}`
  )
  assert(
    typeof item.status === 'string' && item.status.length > 0,
    `leetcode-profile.recent.status is required: ${item.title}`
  )
  assert(
    typeof item.lang === 'string' && item.lang.length > 0,
    `leetcode-profile.recent.lang is required: ${item.title}`
  )
  assert(
    typeof item.isSuccess === 'boolean',
    `leetcode-profile.recent.isSuccess must be boolean: ${item.title}`
  )
}

assert(Array.isArray(leetcodeProfile.skills), 'leetcode-profile.skills must be array')
for (const skill of leetcodeProfile.skills || []) {
  assert(
    typeof skill.name === 'string' && skill.name.length > 0,
    'leetcode-profile.skills.name is required'
  )
  assert(
    Number.isInteger(skill.value) && skill.value >= 0,
    `leetcode-profile.skills.value is invalid: ${skill.name}`
  )
}

assert(
  ['mock', 'provider', 'manual', 'stale-cache'].includes(leetcodeProfile.source),
  'leetcode-profile.source is invalid'
)
assert(
  isDateTime(leetcodeProfile.sourceFetchedAt),
  'leetcode-profile.sourceFetchedAt must be date-time'
)
assert(isDateTime(leetcodeProfile.expiresAt), 'leetcode-profile.expiresAt must be date-time')
assert(typeof leetcodeProfile.isStale === 'boolean', 'leetcode-profile.isStale must be boolean')

// ==========================================================================
// github-projects.json (optional — bootstrap may be empty)
// ==========================================================================
if (githubProjects) {
  assert(githubProjects.schema_version === 1, 'github-projects.schema_version must be 1')
  assert(githubProjects.source === 'github', 'github-projects.source must be "github"')
  assert(
    isDateTime(githubProjects.sourceFetchedAt),
    'github-projects.sourceFetchedAt must be date-time'
  )
  assert(typeof githubProjects.isStale === 'boolean', 'github-projects.isStale must be boolean')
  assert(
    githubProjects.staleAt === null || isDateTime(githubProjects.staleAt),
    'github-projects.staleAt must be date-time or null'
  )
  assert(
    Number.isInteger(githubProjects.version) && githubProjects.version >= 0,
    'github-projects.version must be non-negative integer'
  )
  assert(Array.isArray(githubProjects.projects), 'github-projects.projects must be array')

  const seenIds = new Set()
  const allowedStatuses = new Set(['wip', 'done', 'archived'])
  for (const project of githubProjects.projects || []) {
    assert(
      typeof project.id === 'string' && /^[a-z0-9][a-z0-9._-]{0,99}$/.test(project.id),
      `github-projects.id is invalid: ${project.id}`
    )
    assert(!seenIds.has(project.id), `github-projects.id must be unique: ${project.id}`)
    seenIds.add(project.id)
    assert(
      typeof project.title === 'string' && project.title.length > 0,
      `github-projects.title is required: ${project.id}`
    )
    assert(
      typeof project.description === 'string',
      `github-projects.description must be string: ${project.id}`
    )
    assert(
      typeof project.duration === 'string' && project.duration.length > 0,
      `github-projects.duration is required: ${project.id}`
    )
    assert(
      allowedStatuses.has(project.status),
      `github-projects.status is invalid: ${project.id} / ${project.status}`
    )
    assert(project.type === 'personal', `github-projects.type must be "personal": ${project.id}`)
    assert(
      typeof project.repoUrl === 'string' && /^https:\/\/github\.com\//.test(project.repoUrl),
      `github-projects.repoUrl must start with https://github.com/: ${project.id}`
    )
    assert(
      Number.isInteger(project.stars) && project.stars >= 0,
      `github-projects.stars must be non-negative integer: ${project.id}`
    )
    assert(
      isDateTime(project.lastUpdatedAt),
      `github-projects.lastUpdatedAt must be date-time: ${project.id}`
    )
    assert(
      typeof project.pinned === 'boolean',
      `github-projects.pinned must be boolean: ${project.id}`
    )
    assert(
      typeof project.isVisible === 'boolean',
      `github-projects.isVisible must be boolean: ${project.id}`
    )
    assert(
      Array.isArray(project.technologies),
      `github-projects.technologies must be array: ${project.id}`
    )
    assert(
      project.homepage === undefined ||
        project.homepage === null ||
        isHttpsOrNull(project.homepage),
      `github-projects.homepage must be https:// or null: ${project.id}`
    )
  }
}

// ==========================================================================
// github-projects.overrides.json (optional)
// ==========================================================================
if (githubOverrides) {
  assert(githubOverrides.schema_version === 1, 'github-projects-overrides.schema_version must be 1')
  assert(
    typeof githubOverrides.entries === 'object' && githubOverrides.entries !== null,
    'github-projects-overrides.entries must be object'
  )
  const allowedForceStatuses = new Set(['wip', 'done', 'archived'])
  for (const [slug, entry] of Object.entries(githubOverrides.entries || {})) {
    assert(
      typeof slug === 'string' && slug.length > 0,
      `github-projects-overrides key is invalid: ${slug}`
    )
    if (entry.force_status !== undefined) {
      assert(
        allowedForceStatuses.has(entry.force_status),
        `github-projects-overrides.${slug}.force_status is invalid`
      )
    }
  }
}

if (errors.length > 0) {
  console.error('JSON SSOT validation failed:')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('JSON SSOT validation passed.')
