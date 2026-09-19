/**
 * Validate Docs/ frontmatter and cross-document consistency.
 *
 *   pnpm docs:validate                 whole tree
 *   pnpm docs:validate Docs/foo.md …   specific files
 *   pnpm docs:validate --strict        warnings fail too
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

import { DOCS_ROOT, EXPERIENCE_DIR, classify, discover, fromRepo, toRel, type DocRef } from './lib/docs'
import { readDoc } from './lib/frontmatter'
import { countMarkers, extractBetween } from './lib/markers'
import { hasDates, periodOf } from './lib/period'
import {
  BENCHMARK_TYPES,
  EMPLOYMENT,
  INVENTORY_ID,
  ISO_DATE,
  KNOWN_KEYS,
  MARKER_START,
  QUESTION_MARK,
  READY_FA,
  READY_NONEMPTY,
  RELEVANCE_AVG_TOLERANCE,
  REQUIRED,
  SCORES,
  SITE_KIND,
  STATUS,
  SYNTHESIS_LAG,
  YEAR_MONTH,
} from './lib/schema'
import { parseTable } from './lib/table'
import { avgScores } from './index'

type Level = 'error' | 'warn'
export interface Finding {
  level: Level
  file: string
  key: string
  message: string
}

type Data = Record<string, unknown>
const isBlank = (v: unknown) =>
  v === undefined || v === null || (typeof v === 'string' && v.trim() === '') ||
  (Array.isArray(v) && v.length === 0)
const isInt = (v: unknown): v is number => typeof v === 'number' && Number.isInteger(v)
const isUrl = (v: unknown) => typeof v === 'string' && /^https?:\/\//.test(v)

class Report {
  findings: Finding[] = []
  constructor(private file: string) {}
  error(key: string, message: string) {
    this.findings.push({ level: 'error', file: this.file, key, message })
  }
  warn(key: string, message: string) {
    this.findings.push({ level: 'warn', file: this.file, key, message })
  }
}

// ---------------------------------------------------------------------------

function checkCommon(r: Report, data: Data, body: string, required: readonly string[]) {
  for (const key of required) if (!(key in data)) r.error(key, 'required key missing')
  const status = data.status
  if (!(STATUS as readonly unknown[]).includes(status)) {
    r.error('status', `must be one of ${STATUS.join(' | ')}, got ${JSON.stringify(status)}`)
  }
  if (status === 'ready') {
    const questions = body.split(QUESTION_MARK).length - 1
    if (questions) r.error('status', `ready but ${questions} ${QUESTION_MARK} question(s) remain`)
  }
}

function checkUnknownKeys(r: Report, data: Data, known: readonly string[]) {
  for (const key of Object.keys(data)) {
    if (!known.includes(key) && !key.endsWith('_fa')) r.warn(key, 'unknown key (typo?)')
  }
}

function checkReadyNonEmpty(r: Report, data: Data, keys: readonly string[]) {
  if (data.status !== 'ready') return
  for (const key of keys) if (isBlank(data[key])) r.error(key, 'must be filled before ready')
}

function checkPeriod(r: Report, data: Data, allowLegacy: boolean) {
  const raw = data.period
  if (raw === undefined) return
  if (typeof raw === 'string') {
    if (!allowLegacy) r.error('period', 'legacy duration string; needs { start, end } once past draft')
    return
  }
  if (!raw || typeof raw !== 'object') {
    r.error('period', 'must be a string (draft only) or a { start, end, approx } map')
    return
  }
  const p = raw as Data
  if (!isBlank(p.start) && !YEAR_MONTH.test(String(p.start))) r.error('period.start', 'expected YYYY-MM')
  if (!isBlank(p.end) && p.end !== 'present' && !YEAR_MONTH.test(String(p.end))) {
    r.error('period.end', 'expected YYYY-MM or "present"')
  }
  if (p.approx !== undefined && typeof p.approx !== 'boolean') r.error('period.approx', 'expected true/false')
  if (data.status !== 'draft' && !hasDates(periodOf(raw))) r.error('period', 'start and end required past draft')
}

// ---------------------------------------------------------------------------

function checkBenchmark(r: Report, d: DocRef, data: Data, body: string) {
  const type = d.benchmarkType as (typeof BENCHMARK_TYPES)[number]
  checkCommon(r, data, body, REQUIRED.benchmark)
  checkUnknownKeys(r, data, KNOWN_KEYS.benchmark)
  checkReadyNonEmpty(r, data, READY_NONEMPTY.benchmark)

  if (data.type !== type) r.error('type', `must be "${type}" for a file in this folder`)
  const expectedSlug = path.basename(d.file, '.md')
  if (data.slug !== expectedSlug) r.error('slug', `must equal the file name "${expectedSlug}"`)
  if (!isUrl(data.url)) r.error('url', 'must start with http(s)://')
  if (!ISO_DATE.test(String(data.date_added))) r.error('date_added', 'expected YYYY-MM-DD')
  if (!isBlank(data.site_kind) && !(SITE_KIND as readonly unknown[]).includes(data.site_kind)) {
    r.error('site_kind', `must be one of ${SITE_KIND.join(' | ')}`)
  }

  const rel = data.relevance
  if (!isInt(rel) || rel < 0 || rel > 5) r.error('relevance', 'integer 0–5 expected')
  else if (rel === 0 && data.status !== 'draft') r.error('relevance', 'must be scored (1–5) past draft')

  const scores = data.scores
  if (!scores || typeof scores !== 'object') {
    r.error('scores', 'expected a map of criteria')
  } else {
    const keys = SCORES[type]
    for (const k of Object.keys(scores as Data)) {
      if (!keys.includes(k)) r.error(`scores.${k}`, `unknown criterion for ${type}; allowed: ${keys.join(', ')}`)
    }
    for (const k of keys) {
      const v = (scores as Data)[k]
      if (!isInt(v) || v < 0 || v > 5) r.error(`scores.${k}`, 'integer 0–5 expected')
      else if (v === 0 && data.status !== 'draft') r.warn(`scores.${k}`, 'unscored (0) past draft — say why in Scores')
    }
    const avg = avgScores(scores, type)
    if (avg !== null && isInt(rel) && rel > 0 && Math.abs(rel - avg) > RELEVANCE_AVG_TOLERANCE) {
      r.warn('relevance', `relevance ${rel} vs criteria average ${avg} — worth a sentence in the analysis`)
    }
  }

  if (Array.isArray(data.screenshots)) {
    const dir = path.join(path.dirname(d.file), 'assets', expectedSlug)
    for (const s of data.screenshots) {
      if (typeof s !== 'string') r.error('screenshots', 'entries must be file names')
      else if (!fs.existsSync(path.join(dir, s))) r.warn('screenshots', `${s} not found locally (screenshots are local-only)`)
    }
  } else if (data.screenshots !== undefined) {
    r.error('screenshots', 'expected a list of file names')
  }
}

function checkExperience(r: Report, d: DocRef, data: Data, body: string) {
  checkCommon(r, data, body, REQUIRED.experience)
  checkUnknownKeys(r, data, KNOWN_KEYS.experience)
  checkReadyNonEmpty(r, data, READY_NONEMPTY.experience)
  const folder = d.company as string
  if (data.slug !== folder.toLowerCase()) r.error('slug', `must equal the folder name in lowercase "${folder.toLowerCase()}"`)
  if (!isInt(data.resume_order) || data.resume_order < 1) r.error('resume_order', 'positive integer expected')
  if (!(EMPLOYMENT as readonly unknown[]).includes(data.employment)) {
    r.error('employment', `must be one of ${EMPLOYMENT.join(' | ')}`)
  }
  checkPeriod(r, data, data.status === 'draft')
  const { start, end } = countMarkers(body)
  if (start !== 1 || end !== 1) r.error('markers', `expected exactly one ${MARKER_START} pair, found ${start}/${end}`)
}

function checkProject(r: Report, d: DocRef, data: Data, body: string, inventoryIds: Set<string>) {
  checkCommon(r, data, body, REQUIRED.project)
  checkUnknownKeys(r, data, KNOWN_KEYS.project)
  checkReadyNonEmpty(r, data, READY_NONEMPTY.project)
  const expectedSlug = path.basename(d.file, '.md')
  if (data.slug !== expectedSlug) r.error('slug', `must equal the file name "${expectedSlug}"`)

  const readmeFile = path.join(path.dirname(d.file), 'README.md')
  const company = fs.existsSync(readmeFile) ? readDoc(readmeFile).data : null
  if (!company) {
    r.error('company', 'folder has no README.md')
  } else if (String(data.company).trim().toLowerCase() !== String(company.company).trim().toLowerCase()) {
    r.error('company', `must match the folder's company "${String(company.company)}"`)
  }

  if (!(EMPLOYMENT as readonly unknown[]).includes(data.employment)) {
    r.error('employment', `must be one of ${EMPLOYMENT.join(' | ')}`)
  }
  checkPeriod(r, data, false)
  const p = periodOf(data.period)
  const cp = company ? periodOf(company.period) : null
  if (cp && hasDates(p) && hasDates(cp) && p.start && cp.start) {
    const now = new Date().toISOString().slice(0, 7)
    const pEnd = p.present ? now : (p.end as string)
    const cEnd = cp.present ? now : (cp.end as string)
    if (p.start < cp.start || pEnd > cEnd) r.warn('period', `outside the company's ${cp.start} → ${cp.present ? 'present' : cp.end}`)
  }

  if (!isBlank(data.inventory_id)) {
    const id = String(data.inventory_id)
    if (!INVENTORY_ID.test(id)) r.error('inventory_id', 'expected e.g. DGK-01')
    else if (!inventoryIds.has(id)) r.warn('inventory_id', `${id} not found in Experience/Inventory.md`)
  }
  if (data.featured !== undefined && typeof data.featured !== 'boolean') r.error('featured', 'expected true/false')

  if (Array.isArray(data.metrics)) {
    data.metrics.forEach((m, i) => {
      if (!m || typeof m !== 'object' || isBlank((m as Data).label) || isBlank((m as Data).value)) {
        r.error(`metrics[${i}]`, 'expected { label, value }')
      }
    })
  }
  for (const key of ['figma', 'links'] as const) {
    if (!Array.isArray(data[key])) continue
    ;(data[key] as unknown[]).forEach((item, i) => {
      const url = typeof item === 'string' ? item : (item as Data)?.url
      if (!isUrl(url)) r.error(`${key}[${i}]`, 'expected a URL or { url, label }')
    })
  }
  if (data.status === 'ready') {
    for (const key of READY_FA.project) if (isBlank(data[key])) r.warn(key, 'Persian value missing (site falls back to English)')
  }
}

function checkMeta(r: Report, data: Data, body: string) {
  checkCommon(r, data, body, REQUIRED.meta)
  if (!ISO_DATE.test(String(data.updated))) r.error('updated', 'expected YYYY-MM-DD')
  const { start, end } = countMarkers(body)
  if (start + end > 0 && (start !== 1 || end !== 1)) {
    r.error('markers', `expected exactly one ${MARKER_START} pair, found ${start}/${end}`)
  }
}

function checkIndex(r: Report, rel: string, raw: string) {
  const { start, end } = countMarkers(raw)
  if (rel !== 'README.md' && (start !== 1 || end !== 1)) {
    r.error('markers', `expected exactly one ${MARKER_START} pair, found ${start}/${end}`)
  }
  checkLinks(r, path.join(DOCS_ROOT, rel), raw)
}

/** Relative markdown links must resolve to files. */
function checkLinks(r: Report, file: string, content: string) {
  const dir = path.dirname(file)
  for (const m of content.matchAll(/\]\(([^)\s#]+)(?:#[^)]*)?\)/g)) {
    const target = decodeURIComponent(m[1] as string)
    if (/^[a-z]+:/i.test(target)) continue
    if (!fs.existsSync(path.resolve(dir, target))) r.error('link', `broken link → ${target}`)
  }
}

// ---------------------------------------------------------------------------

function inventoryIds(): Set<string> {
  const file = path.join(EXPERIENCE_DIR, 'Inventory.md')
  const ids = new Set<string>()
  if (!fs.existsSync(file)) return ids
  for (const m of fs.readFileSync(file, 'utf8').matchAll(/^\| ([A-Z0-9]{3}-\d{2}) \|/gm)) ids.add(m[1] as string)
  return ids
}

function checkCrossDoc(findings: Finding[], docs: DocRef[]) {
  // Inventory: File column links must resolve
  const inv = path.join(EXPERIENCE_DIR, 'Inventory.md')
  if (fs.existsSync(inv)) {
    const r = new Report(fromRepo(inv))
    checkLinks(r, inv, fs.readFileSync(inv, 'utf8'))
    findings.push(...r.findings)
  }
  // Synthesis lag
  const syn = path.join(DOCS_ROOT, 'Benchmarks', 'Synthesis.md')
  if (fs.existsSync(syn)) {
    const r = new Report(fromRepo(syn))
    const reviewed = Number(readDoc(syn).data.benchmarks_reviewed ?? 0)
    const total = docs.filter((d) => d.kind === 'benchmark').length
    if (total - reviewed >= SYNTHESIS_LAG) {
      r.warn('benchmarks_reviewed', `${total} benchmarks exist but only ${reviewed} synthesised — time to update Synthesis.md`)
    }
    findings.push(...r.findings)
  }
  // Timeline table rows must reference existing company folders
  const tl = path.join(EXPERIENCE_DIR, 'Timeline.md')
  if (fs.existsSync(tl)) {
    const r = new Report(fromRepo(tl))
    const block = extractBetween(fs.readFileSync(tl, 'utf8'))
    for (const row of block ? parseTable(block) : []) {
      const dir = row[1]?.match(/`([^`]+)`/)?.[1]
      if (dir && !fs.existsSync(path.join(EXPERIENCE_DIR, dir, 'README.md'))) r.error('table', `row references unknown folder ${dir}`)
    }
    findings.push(...r.findings)
  }
}

export function validateDoc(d: DocRef, ids: Set<string>): Finding[] {
  const r = new Report(fromRepo(d.file))
  const { fm, data, body, raw } = readDoc(d.file)
  if (d.kind === 'index') {
    checkIndex(r, d.rel, raw)
    return r.findings
  }
  if (fm === null) {
    r.error('frontmatter', 'missing frontmatter block')
    return r.findings
  }
  switch (d.kind) {
    case 'benchmark':
      checkBenchmark(r, d, data, body)
      break
    case 'experience':
      checkExperience(r, d, data, body)
      break
    case 'project':
      checkProject(r, d, data, body, ids)
      break
    case 'meta':
      checkMeta(r, data, body)
      break
  }
  return r.findings
}

export function validateAll(files?: string[]): Finding[] {
  const all = discover()
  const targets = files?.length
    ? files
        .map((f) => path.resolve(f))
        .map((file) => {
          const c = classify(toRel(file))
          if (!c) throw new Error(`${fromRepo(file)} is not a managed Docs file`)
          return { file, ...c } as DocRef
        })
    : all
  const ids = inventoryIds()
  const findings = targets.flatMap((d) => validateDoc(d, ids))
  if (!files?.length) checkCrossDoc(findings, all)
  return findings
}

function main() {
  const { values, positionals } = parseArgs({
    options: { strict: { type: 'boolean', default: false } },
    allowPositionals: true,
  })
  const findings = validateAll(positionals)
  for (const f of findings) {
    const tag = f.level === 'error' ? 'ERROR' : 'warn '
    console.log(`${tag}  ${f.file} · ${f.key} · ${f.message}`)
  }
  const errors = findings.filter((f) => f.level === 'error').length
  const warns = findings.length - errors
  console.log(`docs:validate: ${errors} error(s), ${warns} warning(s)`)
  if (errors || (values.strict && warns)) process.exitCode = 1
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) main()
