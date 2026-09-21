/**
 * Regenerate every machine-owned table in Docs/ from frontmatter.
 *
 *   pnpm docs:index            write changes
 *   pnpm docs:index --check    exit 1 if anything would change
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

import {
  DOCS_ROOT,
  DS_DIR,
  EXPERIENCE_DIR,
  benchmarkDir,
  companyDirs,
  discover,
  fromRepo,
  tokenBenchmarks,
  tokensFile,
  type DocRef,
} from './lib/docs'
import { readDoc, setFields } from './lib/frontmatter'
import { extractBetween, replaceBetween } from './lib/markers'
import {
  formatPeriod,
  formatYears,
  hasDates,
  monthsBetween,
  overlaps,
  periodOf,
  round1,
  yearsOf,
} from './lib/period'
import { BENCHMARK_TYPES, QUESTION_MARK, SCORES, TOKEN_PATH, type BenchmarkType } from './lib/schema'
import { mdTable, parseTable } from './lib/table'
import { readTokens, setTokenItems, stringifyTokens } from './lib/tokens'

export interface RegenResult {
  file: string
  changed: boolean
}

type Data = Record<string, unknown>
const str = (v: unknown) => (typeof v === 'string' ? v.trim() : v === undefined || v === null ? '' : String(v))
const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : null)

/** Average of the non-zero criterion scores, one decimal; null if nothing scored. */
export function avgScores(scores: unknown, type: BenchmarkType): number | null {
  if (!scores || typeof scores !== 'object') return null
  const vals = SCORES[type]
    .map((k) => num((scores as Data)[k]))
    .filter((n): n is number => n !== null && n > 0)
  if (!vals.length) return null
  return round1(vals.reduce((a, b) => a + b, 0) / vals.length)
}

// ---------------------------------------------------------------------------
// Benchmarks

function benchmarkTable(type: BenchmarkType, docs: DocRef[]): string {
  const rows = docs
    .filter((d) => d.kind === 'benchmark' && d.benchmarkType === type)
    .map((d) => ({ d, data: readDoc(d.file).data }))
    .sort((a, b) => {
      const r = (num(b.data.relevance) ?? 0) - (num(a.data.relevance) ?? 0)
      return r !== 0 ? r : str(b.data.date_added).localeCompare(str(a.data.date_added))
    })
    .map(({ d, data }) => {
      const file = path.basename(d.file)
      const avg = avgScores(data.scores, type)
      return [
        str(data.title) || str(data.slug) || file,
        str(data.owner),
        str(data.site_kind),
        num(data.relevance) ? String(data.relevance) : '',
        avg === null ? '' : avg.toFixed(1),
        str(data.status),
        str(data.summary),
        `[${file}](${file})`,
      ]
    })
  return mdTable(['Site', 'Owner', 'Kind', 'Relevance', 'Avg', 'Status', 'Summary', 'File'], rows)
}

// ---------------------------------------------------------------------------
// Experience

interface Company {
  dir: string
  data: Data
  projects: { file: string; data: Data }[]
}

function loadCompanies(): Company[] {
  return companyDirs().map((dir) => {
    const full = path.join(EXPERIENCE_DIR, dir)
    const projects = fs
      .readdirSync(full, { withFileTypes: true })
      .filter(
        (e) => e.isDirectory() && e.name !== 'assets' && fs.existsSync(path.join(full, e.name, 'README.md')),
      )
      .map((e) => e.name)
      .sort()
      .map((slug) => ({
        file: `${slug}/README.md`,
        data: readDoc(path.join(full, slug, 'README.md')).data,
      }))
    return { dir, data: readDoc(path.join(full, 'README.md')).data, projects }
  })
}

function sortCompanies(companies: Company[]): Company[] {
  const dated = companies.every((c) => hasDates(periodOf(c.data.period)))
  return [...companies].sort((a, b) => {
    if (dated) return str(periodOf(b.data.period).start).localeCompare(str(periodOf(a.data.period).start))
    return (num(a.data.resume_order) ?? 99) - (num(b.data.resume_order) ?? 99)
  })
}

const companyTitle = (c: Company) =>
  `${str(c.data.company)}${str(c.data.product) ? ` — ${str(c.data.product)}` : ''}`

function experienceTable(companies: Company[]): string {
  const rows = sortCompanies(companies).map((c) => [
    `[${companyTitle(c)}](${c.dir}/README.md)`,
    str(c.data.role),
    formatPeriod(periodOf(c.data.period)),
    str(c.data.employment),
    str(c.data.domain),
    String(c.projects.filter((p) => p.data.featured === true).length),
    String(c.projects.length),
    str(c.data.status),
  ])
  return mdTable(
    ['Company', 'Role', 'Period', 'Type', 'Domain', 'Featured', 'Documented', 'Status'],
    rows,
  )
}

function projectsTable(c: Company): string {
  const rows = c.projects
    .sort((a, b) => (num(a.data.order) ?? 99) - (num(b.data.order) ?? 99))
    .map((p) => {
      const figma = Array.isArray(p.data.figma) ? p.data.figma.length : 0
      return [
        `[${str(p.data.title) || p.file}](${p.file})`,
        str(p.data.role),
        formatPeriod(periodOf(p.data.period)),
        p.data.featured === true ? '✓' : '',
        str(p.data.status),
        figma ? `${figma} file${figma > 1 ? 's' : ''}` : '',
        `\`${p.file}\``,
      ]
    })
  return mdTable(['Project', 'Role', 'Period', 'Featured', 'Status', 'Figma', 'File'], rows)
}

// ---------------------------------------------------------------------------
// Timeline

const TIMELINE_HEADERS = [
  '#',
  'Company (folder)',
  'Role',
  'Employment',
  'Start',
  'End',
  'Approx?',
  'Resume duration',
  'Computed duration',
  'Overlaps with',
  'Notes',
]

interface TimelineRow {
  n: number
  dir: string
  cells: string[]
  period: ReturnType<typeof periodOf>
}

/**
 * The Timeline table is both input (Start / End / Approx? / Notes typed by Sina) and output
 * (computed columns). Structured dates in a company README win; otherwise the cells already in
 * the table are preserved so regenerating never discards what was typed.
 */
function timelineTable(companies: Company[], existingBlock: string | null) {
  const existing = new Map<string, string[]>()
  if (existingBlock) {
    for (const row of parseTable(existingBlock)) {
      const dir = row[1]?.match(/`([^`]+)`/)?.[1]
      if (dir) existing.set(dir, row)
    }
  }
  const clean = (v: string | undefined) => (v && v !== '—' ? v.trim() : '')

  const rows: TimelineRow[] = [...companies]
    .sort((a, b) => (num(a.data.resume_order) ?? 99) - (num(b.data.resume_order) ?? 99))
    .map((c, i) => {
      const prev = existing.get(c.dir) ?? []
      const fromReadme = periodOf(c.data.period)
      const resumeDuration = fromReadme.legacy ?? clean(prev[7])
      const period = hasDates(fromReadme)
        ? fromReadme
        : {
            ...periodOf({
              start: clean(prev[4]),
              end: clean(prev[5]) || undefined,
              approx: clean(prev[6]) !== '',
            }),
            legacy: resumeDuration || undefined,
          }
      const role = `${str(c.data.role)}${str(c.data.product) ? ` — ${str(c.data.product)}` : ''}`
      return {
        n: i + 1,
        dir: c.dir,
        period,
        cells: [
          String(i + 1),
          `${str(c.data.company)} (\`${c.dir}\`)`,
          role,
          str(c.data.employment),
          period.start ?? '',
          period.present ? 'present' : (period.end ?? ''),
          period.approx ? '~' : '',
          resumeDuration,
          '', // computed
          '', // overlaps
          clean(prev[10]),
        ],
      }
    })

  for (const r of rows) {
    const yrs = hasDates(r.period) ? yearsOf(r.period) : null
    r.cells[8] = yrs === null ? '' : formatYears(yrs)
    r.cells[9] = rows
      .filter((o) => o !== r && overlaps(r.period, o.period))
      .map((o) => `#${o.n}`)
      .join(', ')
  }

  const dated = rows.filter((r) => hasDates(r.period))
  const starts = dated.map((r) => r.period.start as string).sort()
  const anyPresent = dated.some((r) => r.period.present)
  const ends = dated.filter((r) => !r.period.present).map((r) => r.period.end as string).sort()
  const spanStart = starts[0] ?? ''
  const spanEnd = anyPresent ? 'present' : (ends[ends.length - 1] ?? '')
  const yearsCalendar = spanStart
    ? round1(monthsBetween(spanStart, spanEnd === 'present' ? undefined : spanEnd) / 12)
    : 0
  const yearsSummed = round1(
    rows.reduce((sum, r) => sum + (yearsOf(r.period) ?? 0), 0),
  )

  return {
    table: mdTable(TIMELINE_HEADERS, rows.map((r) => r.cells)),
    fields: {
      span_start: spanStart,
      span_end: spanEnd,
      years_calendar: yearsCalendar,
      years_summed: yearsSummed,
    },
  }
}

// ---------------------------------------------------------------------------
// Design-System items

const DS_HEADERS = ['ID', 'Item', 'Category', 'Take', 'Priority', 'Sources', 'Target', 'Adoption', 'Status', 'File']

/** `sources[]` → unique benchmark slugs, each linked to its benchmark file (type from the first mention). */
function sourceLinks(sources: unknown): string {
  if (!Array.isArray(sources)) return ''
  const seen = new Map<string, string>()
  for (const src of sources) {
    if (!src || typeof src !== 'object') continue
    const slug = str((src as Data).benchmark)
    const type = str((src as Data).type).toLowerCase() === 'content' ? 'Content' : 'Design'
    if (slug && !seen.has(slug)) seen.set(slug, `[${slug}](../Benchmarks/${type}/${slug}.md)`)
  }
  return [...seen.values()].join(', ')
}

function dsTable(docs: DocRef[]): string {
  const rows = docs
    .filter((d) => d.kind === 'dsitem')
    .map((d) => ({ d, data: readDoc(d.file).data }))
    .sort((a, b) => str(a.data.id).localeCompare(str(b.data.id)))
    .map(({ d, data }) => {
      const file = path.basename(d.file)
      const target = (data.target ?? {}) as Data
      const targetCell = [str(target.kind), str(target.name) || str(target.path)].filter(Boolean).join(' · ')
      const priority = num(data.priority)
      return [
        str(data.id) || d.dsId || '',
        `[${str(data.title) || file}](${file})`,
        str(data.category),
        str(data.take),
        priority ? `P${priority}` : '',
        sourceLinks(data.sources),
        targetCell,
        str(data.adoption),
        str(data.status),
        `[${file}](${file})`,
      ]
    })
  return mdTable(DS_HEADERS, rows)
}

/** Token path → DS ids that list it in `tokens[]`. */
function tokenItems(docs: DocRef[]): Map<string, string[]> {
  const map = new Map<string, string[]>()
  for (const d of docs) {
    if (d.kind !== 'dsitem') continue
    const { data } = readDoc(d.file)
    const id = str(data.id)
    if (!id || !Array.isArray(data.tokens)) continue
    for (const t of data.tokens) {
      const p = str(t)
      if (!TOKEN_PATH.test(p)) continue
      map.set(p, [...(map.get(p) ?? []), id])
    }
  }
  return map
}

// ---------------------------------------------------------------------------
// Orchestration

function updateFile(file: string, next: string, write: boolean, results: RegenResult[]) {
  const current = fs.readFileSync(file, 'utf8')
  const changed = current !== next
  if (changed && write) fs.writeFileSync(file, next)
  results.push({ file, changed })
}

export function regenerateAll(write: boolean): RegenResult[] {
  const results: RegenResult[] = []
  const docs = discover()
  const companies = loadCompanies()

  for (const type of BENCHMARK_TYPES) {
    const file = path.join(benchmarkDir(type), 'README.md')
    const current = fs.readFileSync(file, 'utf8')
    updateFile(file, replaceBetween(current, benchmarkTable(type, docs), fromRepo(file)), write, results)
  }

  const expIndex = path.join(EXPERIENCE_DIR, 'README.md')
  updateFile(
    expIndex,
    replaceBetween(fs.readFileSync(expIndex, 'utf8'), experienceTable(companies), fromRepo(expIndex)),
    write,
    results,
  )

  for (const c of companies) {
    const file = path.join(EXPERIENCE_DIR, c.dir, 'README.md')
    const current = fs.readFileSync(file, 'utf8')
    updateFile(file, replaceBetween(current, projectsTable(c), fromRepo(file)), write, results)
  }

  const timelineFile = path.join(EXPERIENCE_DIR, 'Timeline.md')
  if (fs.existsSync(timelineFile)) {
    const current = fs.readFileSync(timelineFile, 'utf8')
    const { table, fields } = timelineTable(companies, extractBetween(current))
    const next = setFields(replaceBetween(current, table, fromRepo(timelineFile)), fields)
    updateFile(timelineFile, next, write, results)
  }

  // Design-System: index table, per-item ❓ counts, token back-references
  const dsIndex = path.join(DS_DIR, 'README.md')
  if (fs.existsSync(dsIndex)) {
    const current = fs.readFileSync(dsIndex, 'utf8')
    updateFile(dsIndex, replaceBetween(current, dsTable(docs), fromRepo(dsIndex)), write, results)
  }
  for (const d of docs) {
    if (d.kind !== 'dsitem') continue
    const { raw, body } = readDoc(d.file)
    const questions = body.split(QUESTION_MARK).length - 1
    updateFile(d.file, setFields(raw, { open_questions: questions }), write, results)
  }
  const items = tokenItems(docs)
  for (const benchmark of tokenBenchmarks()) {
    const file = tokensFile(benchmark)
    const json = readTokens(file)
    if (!json) continue
    updateFile(file, stringifyTokens(setTokenItems(json, items)), write, results)
  }

  return results
}

function main() {
  const { values } = parseArgs({ options: { check: { type: 'boolean', default: false } } })
  const results = regenerateAll(!values.check)
  const changed = results.filter((r) => r.changed)
  if (values.check) {
    if (changed.length) {
      console.error('docs:index --check: these files are out of date:')
      for (const r of changed) console.error(`  ${fromRepo(r.file)}`)
      process.exitCode = 1
    } else {
      console.log(`docs:index --check: ${results.length} files up to date`)
    }
    return
  }
  for (const r of changed) console.log(`updated  ${fromRepo(r.file)}`)
  console.log(`docs:index: ${changed.length} of ${results.length} files updated`)
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) main()

export { DOCS_ROOT }
