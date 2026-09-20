/**
 * Design-System items: scaffold and list.
 *
 *   pnpm docs:ds new "<title>" --category c --take t [--priority n] [--id DS-NN]
 *                    [--source slug:type:"Section"]… [--target kind:path:name]
 *                    [--rtl r] [--localization l] [--tokens a,b] [--related DS-01,DS-02]
 *                    [--summary "…"] [--question "Confirm: …"]…
 *   pnpm docs:ds seed <items.json>      create many items from a JSON array of the same fields
 *   pnpm docs:ds list [--category c] [--priority n]
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

import { DS_DIR, dsItemFiles, fromRepo, today } from './lib/docs'
import { readDoc, replaceBlock, setFields } from './lib/frontmatter'
import {
  BENCHMARK_TYPES,
  DS_CATEGORY,
  DS_ID,
  DS_LOCALIZATION,
  DS_PRIORITY_MAX,
  DS_RTL,
  DS_TAKE,
  DS_TARGET_KIND,
  TOKEN_PATH,
} from './lib/schema'
import { regenerateAll } from './index'

const USAGE = `usage:
  pnpm docs:ds new "<title>" --category c --take t [--priority n] [--id DS-NN] [--source slug:type:"Section"]… [--target kind:path:name] [--rtl r] [--localization l] [--tokens a,b] [--related DS-01,DS-02] [--summary "…"] [--question "Verb: …"]…
  pnpm docs:ds seed <items.json>
  pnpm docs:ds list [--category c] [--priority n]`

export interface Seed {
  id?: string
  title: string
  slug?: string
  category: string
  take: string
  priority?: number
  sources?: { benchmark: string; type: string; section: string }[]
  target?: { kind?: string; path?: string; name?: string }
  rtl?: string
  localization?: string
  tokens?: string[]
  related?: string[]
  /** One-line blockquote under the heading */
  summary?: string
  /** "Verb: question" — becomes a ❓ callout + checklist line */
  questions?: string[]
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/["'“”‘’]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function existingIds(): Set<string> {
  return new Set(dsItemFiles().map((f) => path.basename(f).slice(0, 5)))
}

function nextId(taken: Set<string>): string {
  for (let n = 1; n < 100; n++) {
    const id = `DS-${String(n).padStart(2, '0')}`
    if (!taken.has(id)) return id
  }
  throw new Error('no free DS id below DS-99')
}

const yamlStr = (v: unknown) => JSON.stringify(v ?? '')

function sourcesBlock(sources: Seed['sources']): string {
  const list = sources?.length ? sources : [{ benchmark: '', type: 'design', section: '' }]
  return [
    'sources:                  # every benchmark where the pattern was seen — grows over time',
    ...list.flatMap((s) => [
      `  - benchmark: ${yamlStr(s.benchmark)}`,
      `    type: ${s.type || 'design'}`,
      `    section: ${yamlStr(s.section)}`,
    ]),
  ].join('\n')
}

function targetBlock(target: Seed['target']): string {
  return [
    'target:                   # where it lands in the codebase (no code yet)',
    `  kind: ${yamlStr(target?.kind)}`,
    `  path: ${yamlStr(target?.path)}`,
    `  name: ${yamlStr(target?.name)}`,
  ].join('\n')
}

function assertSeed(seed: Seed, taken: Set<string>) {
  const errors: string[] = []
  if (!seed.title?.trim()) errors.push('title required')
  if (!(DS_CATEGORY as readonly string[]).includes(seed.category)) errors.push(`category must be one of ${DS_CATEGORY.join(' | ')}`)
  if (!(DS_TAKE as readonly string[]).includes(seed.take)) errors.push(`take must be one of ${DS_TAKE.join(' | ')}`)
  if (seed.priority !== undefined && (!Number.isInteger(seed.priority) || seed.priority < 1 || seed.priority > DS_PRIORITY_MAX)) {
    errors.push(`priority must be 1–${DS_PRIORITY_MAX}`)
  }
  if (seed.id !== undefined) {
    if (!DS_ID.test(seed.id)) errors.push('id must look like DS-NN')
    else if (taken.has(seed.id)) errors.push(`${seed.id} already exists`)
  }
  if (seed.rtl !== undefined && !(DS_RTL as readonly string[]).includes(seed.rtl)) errors.push(`rtl must be one of ${DS_RTL.join(' | ')}`)
  if (seed.localization !== undefined && !(DS_LOCALIZATION as readonly string[]).includes(seed.localization)) {
    errors.push(`localization must be one of ${DS_LOCALIZATION.join(' | ')}`)
  }
  if (seed.target?.kind && !(DS_TARGET_KIND as readonly string[]).includes(seed.target.kind)) {
    errors.push(`target.kind must be one of ${DS_TARGET_KIND.join(' | ')}`)
  }
  for (const s of seed.sources ?? []) {
    if (!(BENCHMARK_TYPES as readonly string[]).includes(s.type)) errors.push(`source ${s.benchmark}: type must be content | design`)
  }
  for (const t of seed.tokens ?? []) if (!TOKEN_PATH.test(t)) errors.push(`token "${t}" is not a path like color.brand`)
  for (const r of seed.related ?? []) if (!DS_ID.test(r)) errors.push(`related "${r}" is not DS-NN`)
  if (errors.length) throw new Error(`${seed.id ?? seed.title}: ${errors.join('; ')}`)
}

/** Create one item file from the template. Returns the absolute path. */
export function createItem(seed: Seed, taken: Set<string>): string {
  assertSeed(seed, taken)
  const id = seed.id ?? nextId(taken)
  const slug = seed.slug ?? slugify(seed.title)
  const file = path.join(DS_DIR, `${id}-${slug}.md`)
  if (fs.existsSync(file)) throw new Error(`${fromRepo(file)} already exists`)

  const template = fs.readFileSync(path.join(DS_DIR, '_template.md'), 'utf8')
  let out = setFields(template, {
    id,
    title: seed.title,
    slug,
    category: seed.category,
    take: seed.take,
    priority: seed.priority ?? 3,
    adoption: 'candidate',
    rtl: seed.rtl ?? '',
    localization: seed.localization ?? '',
    tokens: seed.tokens ?? [],
    related: seed.related ?? [],
    open_questions: seed.questions?.length ?? 0,
    date_added: today(),
    updated: today(),
    status: 'draft',
  })
  out = replaceBlock(out, 'sources', sourcesBlock(seed.sources))
  out = replaceBlock(out, 'target', targetBlock(seed.target))
  out = out.replace('# {ID} — {Title}', `# ${id} — ${seed.title}`)
  if (seed.summary) out = out.replace("> One sentence: what the pattern is and why it earns a place in Sina's system.", `> ${seed.summary}`)
  const benchmark = seed.sources?.[0]?.benchmark
  if (benchmark) out = out.replace('assets/{benchmark}/', `assets/${benchmark}/`)

  const questions = seed.questions ?? []
  const callouts = questions.length
    ? questions.map((q, i) => {
        const [verb, ...rest] = q.split(':')
        const text = rest.length ? rest.join(':').trim() : q
        const v = rest.length ? verb!.trim() : 'Confirm'
        return `> ❓ **Q${i + 1} — ${v}:** ${text}`
      })
    : ['_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._']
  const checklist = [
    ...questions.map((q, i) => `- [ ] Q${i + 1} — ${q.split(':').slice(1).join(':').trim() || q}`),
    `- [ ] Measured table filled from \`assets/${benchmark ?? '<benchmark>'}/${id}.json\``,
    '- [ ] For Sina written (take · RTL · Persian)',
    '- [ ] Target mapping agreed',
  ]
  out = out
    .replace('> ❓ **Q1 — Confirm:** …', callouts.join('\n'))
    .replace('- [ ] Q1 — …', checklist.join('\n'))

  fs.writeFileSync(file, out)
  taken.add(id)
  return file
}

function cmdNew(values: Record<string, unknown>, positionals: string[]) {
  const title = positionals[1]
  if (!title) fail(USAGE)
  const seed: Seed = {
    id: values.id as string | undefined,
    title,
    category: String(values.category ?? ''),
    take: String(values.take ?? ''),
    priority: values.priority ? Number(values.priority) : undefined,
    sources: ((values.source as string[] | undefined) ?? []).map((s) => {
      const [benchmark = '', type = 'design', ...rest] = s.split(':')
      return { benchmark, type, section: rest.join(':').replace(/^"|"$/g, '') }
    }),
    target: values.target ? parseTarget(String(values.target)) : undefined,
    rtl: values.rtl as string | undefined,
    localization: values.localization as string | undefined,
    tokens: splitList(values.tokens),
    related: splitList(values.related),
    summary: values.summary as string | undefined,
    questions: (values.question as string[] | undefined) ?? [],
  }
  const file = createItem(seed, existingIds())
  console.log(`✓ wrote ${fromRepo(file)}`)
  reindex()
}

function parseTarget(s: string) {
  const [kind = '', ...rest] = s.split(':')
  const name = rest.length > 1 ? (rest.pop() as string) : ''
  return { kind, path: rest.join(':'), name }
}

const splitList = (v: unknown) =>
  typeof v === 'string' && v.trim() ? v.split(',').map((x) => x.trim()).filter(Boolean) : undefined

function cmdSeed(positionals: string[]) {
  const file = positionals[1]
  if (!file) fail(USAGE)
  const seeds = JSON.parse(fs.readFileSync(path.resolve(file), 'utf8')) as Seed[]
  if (!Array.isArray(seeds)) fail('seed file must be a JSON array')
  const taken = existingIds()
  // validate everything first so a bad row doesn't leave half the batch written
  const preview = new Set(taken)
  for (const s of seeds) {
    assertSeed(s, preview)
    preview.add(s.id ?? nextId(preview))
  }
  for (const s of seeds) console.log(`✓ wrote ${fromRepo(createItem(s, taken))}`)
  reindex()
}

function cmdList(values: Record<string, unknown>) {
  const rows = dsItemFiles()
    .map((f) => readDoc(f).data)
    .filter((d) => !values.category || d.category === values.category)
    .filter((d) => !values.priority || String(d.priority) === String(values.priority))
  for (const d of rows) {
    console.log(
      `${String(d.id).padEnd(6)} P${String(d.priority)} ${String(d.category).padEnd(12)} ${String(d.take).padEnd(7)} ${String(d.adoption).padEnd(10)} ${String(d.status).padEnd(6)} ${String(d.title)}`,
    )
  }
  console.log(`${rows.length} item(s)`)
}

function reindex() {
  for (const r of regenerateAll(true).filter((x) => x.changed)) console.log(`✓ updated ${fromRepo(r.file)}`)
}

function fail(message: string): never {
  console.error(message)
  process.exit(1)
}

function main() {
  const { values, positionals } = parseArgs({
    options: {
      id: { type: 'string' },
      category: { type: 'string' },
      take: { type: 'string' },
      priority: { type: 'string' },
      source: { type: 'string', multiple: true },
      target: { type: 'string' },
      rtl: { type: 'string' },
      localization: { type: 'string' },
      tokens: { type: 'string' },
      related: { type: 'string' },
      summary: { type: 'string' },
      question: { type: 'string', multiple: true },
    },
    allowPositionals: true,
  })
  switch (positionals[0]) {
    case 'new':
      return cmdNew(values, positionals)
    case 'seed':
      return cmdSeed(positionals)
    case 'list':
      return cmdList(values)
    default:
      fail(USAGE)
  }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) main()
