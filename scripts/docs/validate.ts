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

import {
  DOCS_ROOT,
  DS_DIR,
  EXPERIENCE_DIR,
  REPO_ROOT,
  benchmarkDir,
  classify,
  discover,
  fromRepo,
  manifestBenchmarks,
  manifestFile,
  toRel,
  tokenBenchmarks,
  tokensFile,
  type DocRef,
} from './lib/docs'
import { readDoc } from './lib/frontmatter'
import { assertManifest } from './lib/manifest'
import { countMarkers, extractBetween } from './lib/markers'
import { hasDates, periodOf } from './lib/period'
import {
  BENCHMARK_TYPES,
  DERIVED_FROM,
  DS_ADOPTION,
  DS_CATEGORY,
  DS_FILE,
  DS_ID,
  DS_LOCALIZATION,
  DS_PRIORITY_MAX,
  DS_RTL,
  DS_TAKE,
  DS_TARGET_KIND,
  EMPLOYMENT,
  INVENTORY_ID,
  ISO_DATE,
  KNOWN_KEYS,
  MARKER_START,
  OWN_TOKENS,
  QUESTION_MARK,
  READY_FA,
  READY_NONEMPTY,
  RELEVANCE_AVG_TOLERANCE,
  REQUIRED,
  SCORES,
  SITE_KIND,
  STATUS,
  SYNTHESIS_LAG,
  TOKEN_PATH,
  YEAR_MONTH,
} from './lib/schema'
import { parseTable } from './lib/table'
import { ext, fileExt, flattenTokens, readTokens } from './lib/tokens'
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

/** Cross-document lookups built once per run. */
export interface Ctx {
  inventoryIds: Set<string>
  /** DS ids that exist as files */
  dsIds: Set<string>
  /** benchmark slug → token path → effective $type */
  tokenIndex: Map<string, Map<string, string | undefined>>
}

const oneOf = (list: readonly string[], v: unknown) => (list as readonly unknown[]).includes(v)

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
  const expectedSlug = path.basename(path.dirname(d.file))
  if (data.slug !== expectedSlug) r.error('slug', `must equal the project folder name "${expectedSlug}"`)

  const readmeFile = path.join(path.dirname(path.dirname(d.file)), 'README.md')
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

function checkDsItem(r: Report, d: DocRef, data: Data, body: string, ctx: Ctx) {
  checkCommon(r, data, body, REQUIRED.dsitem)
  checkUnknownKeys(r, data, KNOWN_KEYS.dsitem)
  checkReadyNonEmpty(r, data, READY_NONEMPTY.dsitem)

  const base = path.basename(d.file)
  const m = DS_FILE.exec(base)
  if (!m) r.error('file', 'name must be DS-NN-<kebab-slug>.md')
  else {
    if (data.id !== m[1]) r.error('id', `must equal the file prefix "${m[1]}"`)
    if (data.slug !== m[2]) r.error('slug', `must equal the file name after the id "${m[2]}"`)
  }

  if (!oneOf(DS_CATEGORY, data.category)) r.error('category', `must be one of ${DS_CATEGORY.join(' | ')}`)
  if (!oneOf(DS_TAKE, data.take)) r.error('take', `must be one of ${DS_TAKE.join(' | ')}`)
  if (!oneOf(DS_ADOPTION, data.adoption)) r.error('adoption', `must be one of ${DS_ADOPTION.join(' | ')}`)
  if (!oneOf(DS_RTL, data.rtl)) r.error('rtl', `must be one of ${DS_RTL.join(' | ')}`)
  if (!oneOf(DS_LOCALIZATION, data.localization)) r.error('localization', `must be one of ${DS_LOCALIZATION.join(' | ')}`)
  if (!isInt(data.priority) || data.priority < 1 || data.priority > DS_PRIORITY_MAX) {
    r.error('priority', `integer 1–${DS_PRIORITY_MAX} expected`)
  }

  if (data.adoption === 'superseded') {
    const by = String(data.superseded_by ?? '')
    if (!DS_ID.test(by)) r.error('superseded_by', 'DS-NN required when adoption is superseded')
    else if (!ctx.dsIds.has(by)) r.error('superseded_by', `${by} does not exist`)
  } else if (!isBlank(data.superseded_by)) {
    r.warn('superseded_by', 'set but adoption is not "superseded"')
  }

  const target = data.target
  if (!target || typeof target !== 'object') r.error('target', 'expected { kind, path, name }')
  else {
    const t = target as Data
    if (!isBlank(t.kind) && !oneOf(DS_TARGET_KIND, t.kind)) r.error('target.kind', `must be one of ${DS_TARGET_KIND.join(' | ')}`)
    // candidates point at code that doesn't exist yet by definition; only nag once adopted
    if (data.adoption === 'adopted' && !isBlank(t.path) && String(t.path).startsWith('src/') && !fs.existsSync(path.join(REPO_ROOT, String(t.path)))) {
      r.warn('target.path', `${String(t.path)} not in the repo yet`)
    }
    if (data.status === 'ready') {
      if (isBlank(t.kind) || isBlank(t.path)) r.error('target', 'kind and path must be set before ready')
      if (data.adoption === 'candidate') r.error('adoption', 'ready means decided — adopt, reject or supersede first')
    }
  }

  const sourceSlugs = new Set<string>()
  if (!Array.isArray(data.sources) || data.sources.length === 0) r.error('sources', 'at least one { benchmark, type, section } required')
  else {
    data.sources.forEach((src, i) => {
      if (!src || typeof src !== 'object') return r.error(`sources[${i}]`, 'expected { benchmark, type, section }')
      const sd = src as Data
      const slug = String(sd.benchmark ?? '')
      const type = String(sd.type ?? '')
      if (!oneOf(BENCHMARK_TYPES, type)) return r.error(`sources[${i}].type`, `must be one of ${BENCHMARK_TYPES.join(' | ')}`)
      const file = path.join(benchmarkDir(type as (typeof BENCHMARK_TYPES)[number]), `${slug}.md`)
      if (!slug || !fs.existsSync(file)) return r.error(`sources[${i}].benchmark`, `no benchmark file ${fromRepo(file)}`)
      sourceSlugs.add(slug)
      const section = String(sd.section ?? '').trim()
      if (!section) r.warn(`sources[${i}].section`, 'blank — name the heading in the benchmark file')
      else {
        const headings = fs.readFileSync(file, 'utf8').match(/^## .+$/gm) ?? []
        if (!headings.some((h) => h.slice(3).trim().toLowerCase().startsWith(section.toLowerCase()))) {
          r.warn(`sources[${i}].section`, `"${section}" is not a ## heading in ${path.basename(file)}`)
        }
      }
    })
  }

  if (data.tokens !== undefined) {
    if (!Array.isArray(data.tokens)) r.error('tokens', 'expected a list of token paths')
    else {
      const withFile = [...sourceSlugs].filter((slug) => ctx.tokenIndex.has(slug))
      if (data.tokens.length && sourceSlugs.size && !withFile.length) {
        r.warn('tokens', `no tokens file yet for ${[...sourceSlugs].join(', ')} — run pnpm docs:ds-capture`)
      }
      data.tokens.forEach((t, i) => {
        const p = String(t)
        if (!TOKEN_PATH.test(p)) return r.error(`tokens[${i}]`, `"${p}" is not a token path (e.g. color.brand)`)
        if (withFile.length && !withFile.some((slug) => ctx.tokenIndex.get(slug)?.has(p))) {
          r.warn(`tokens[${i}]`, `${p} not found in the tokens file of any source`)
        }
      })
    }
  }

  if (data.evidence !== undefined) {
    if (!Array.isArray(data.evidence)) r.error('evidence', 'expected a list of assets/<benchmark>/<file> paths')
    else
      data.evidence.forEach((e, i) => {
        const rel = String(e)
        const slug = rel.split('/')[0] ?? ''
        if (!slug || !rel.includes('/')) return r.error(`evidence[${i}]`, 'expected <benchmark>/<file>')
        if (!sourceSlugs.has(slug)) r.error(`evidence[${i}]`, `${slug} is not one of this item's sources`)
        else if (!fs.existsSync(path.join(DS_DIR, 'assets', rel))) r.warn(`evidence[${i}]`, `${rel} not found locally (assets are local-only)`)
      })
  }

  if (data.related !== undefined) {
    if (!Array.isArray(data.related)) r.error('related', 'expected a list of DS ids')
    else
      data.related.forEach((id, i) => {
        const v = String(id)
        if (!DS_ID.test(v)) r.error(`related[${i}]`, 'expected DS-NN')
        else if (v === data.id) r.error(`related[${i}]`, 'an item cannot relate to itself')
        else if (!ctx.dsIds.has(v)) r.error(`related[${i}]`, `${v} does not exist`)
      })
  }

  const questions = body.split(QUESTION_MARK).length - 1
  if (data.open_questions !== undefined && data.open_questions !== questions) {
    r.error('open_questions', `is ${String(data.open_questions)} but the body has ${questions} ${QUESTION_MARK} — run pnpm docs:index`)
  }
  for (const key of ['date_added', 'updated'] as const) {
    if (!ISO_DATE.test(String(data[key]))) r.error(key, 'expected YYYY-MM-DD')
  }
  if (ISO_DATE.test(String(data.updated)) && ISO_DATE.test(String(data.date_added)) && String(data.updated) < String(data.date_added)) {
    r.warn('updated', 'earlier than date_added')
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

function checkCrossDoc(findings: Finding[], docs: DocRef[], ctx: Ctx) {
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
  checkDesignSystem(findings, docs, ctx)
}

/** Design-System: unique ids, tokens files, capture manifests, Content-Model references. */
function checkDesignSystem(findings: Finding[], docs: DocRef[], ctx: Ctx) {
  const seen = new Map<string, string>()
  for (const d of docs) {
    if (d.kind !== 'dsitem') continue
    const id = String(readDoc(d.file).data.id ?? '')
    if (!id) continue
    const prev = seen.get(id)
    if (prev) {
      const r = new Report(fromRepo(d.file))
      r.error('id', `duplicate of ${prev}`)
      findings.push(...r.findings)
    } else seen.set(id, d.rel)
  }

  for (const benchmark of tokenBenchmarks()) {
    const file = tokensFile(benchmark)
    const r = new Report(fromRepo(file))
    let json: ReturnType<typeof readTokens> = null
    try {
      json = readTokens(file)
    } catch (err) {
      r.error('json', `does not parse: ${(err as Error).message.split('\n')[0]}`)
    }
    if (json) {
      const meta = fileExt(json)
      if (!meta) r.error('$extensions', 'root block must carry { benchmark, … } under the docs namespace')
      else {
        if (meta.benchmark !== benchmark) r.error('$extensions.benchmark', `must equal the file stem "${benchmark}"`)
        const exists = BENCHMARK_TYPES.some((t) => fs.existsSync(path.join(benchmarkDir(t), `${benchmark}.md`)))
        if (!exists && benchmark !== OWN_TOKENS) r.error('$extensions.benchmark', `no benchmark file for ${benchmark}`)
      }
      const own = benchmark === OWN_TOKENS
      for (const entry of flattenTokens(json)) {
        if (entry.kind === 'token') {
          if ((entry.node as { $value?: unknown }).$value === undefined) r.error(entry.path, 'missing $value')
          if (!entry.type) r.error(entry.path, 'no own or inherited $type')
        }
        const e = ext(entry.node)
        for (const id of e.items ?? []) if (!ctx.dsIds.has(id)) r.warn(`${entry.path}.items`, `${id} does not exist`)
        if (e.stale) r.warn(entry.path, `stale since ${e.stale} — the source no longer defines it`)
        if (own) {
          // House tokens carry provenance instead of measurements.
          if (e.item && !ctx.dsIds.has(e.item)) r.warn(`${entry.path}.item`, `${e.item} does not exist`)
          if (e.derivedFrom) {
            const m = DERIVED_FROM.exec(e.derivedFrom)
            if (!m) r.warn(`${entry.path}.derivedFrom`, `"${e.derivedFrom}" is not <benchmark>:<token path>`)
            else if (!ctx.tokenIndex.get(m[1]!)?.has(m[2]!))
              r.warn(`${entry.path}.derivedFrom`, `${m[2]} is not a token of ${m[1]}`)
          }
        }
      }
      if (own && json.color && typeof json.color === 'object') {
        // Light and dark must define the same roles, or the emitted aliases break in one theme.
        const roles = (theme: string) =>
          flattenTokens(json).filter((e) => e.path.startsWith(`color.${theme}.`)).map((e) => e.path.slice(`color.${theme}.`.length))
        const light = new Set(roles('light'))
        const dark = new Set(roles('dark'))
        for (const k of light) if (!dark.has(k)) r.error(`color.dark.${k}`, 'defined for light but not dark')
        for (const k of dark) if (!light.has(k)) r.error(`color.light.${k}`, 'defined for dark but not light')
      }
    }
    findings.push(...r.findings)
  }

  for (const benchmark of manifestBenchmarks()) {
    const file = manifestFile(benchmark)
    const r = new Report(fromRepo(file))
    try {
      const m = assertManifest(JSON.parse(fs.readFileSync(file, 'utf8')), path.basename(file))
      if (m.benchmark !== benchmark) r.error('benchmark', `must equal the file stem "${benchmark}"`)
      for (const it of m.items) if (!ctx.dsIds.has(it.id)) r.warn(`items.${it.id}`, 'no matching DS item file')
    } catch (err) {
      r.error('manifest', (err as Error).message.split('\n').join(' '))
    }
    findings.push(...r.findings)
  }

  const cm = path.join(DOCS_ROOT, 'Content-Model.md')
  if (fs.existsSync(cm) && ctx.dsIds.size) {
    const r = new Report(fromRepo(cm))
    for (const m of fs.readFileSync(cm, 'utf8').matchAll(/\bDS-\d{2}\b/g)) {
      if (!ctx.dsIds.has(m[0])) r.warn('DS item', `${m[0]} referenced but no such item`)
    }
    findings.push(...r.findings)
  }
}

function buildCtx(docs: DocRef[]): Ctx {
  const dsIds = new Set<string>()
  for (const d of docs) {
    if (d.kind !== 'dsitem') continue
    const id = readDoc(d.file).data.id
    if (typeof id === 'string' && DS_ID.test(id)) dsIds.add(id)
  }
  const tokenIndex = new Map<string, Map<string, string | undefined>>()
  for (const benchmark of tokenBenchmarks()) {
    try {
      const json = readTokens(tokensFile(benchmark))
      if (json) tokenIndex.set(benchmark, new Map(flattenTokens(json).map((e) => [e.path, e.type])))
    } catch {
      // reported by checkDesignSystem
    }
  }
  return { inventoryIds: inventoryIds(), dsIds, tokenIndex }
}

export function validateDoc(d: DocRef, ctx: Ctx): Finding[] {
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
      checkProject(r, d, data, body, ctx.inventoryIds)
      break
    case 'dsitem':
      checkDsItem(r, d, data, body, ctx)
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
  const ctx = buildCtx(all)
  const findings = targets.flatMap((d) => validateDoc(d, ctx))
  if (!files?.length) checkCrossDoc(findings, all, ctx)
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
