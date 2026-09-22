import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import { slugify } from '../../scripts/docs/ds'
import { DOCS_ROOT, DS_DIR, benchmarkDir, classify, dsItemFiles, manifestFile, slugFromUrl } from '../../scripts/docs/lib/docs'
import { parseFrontmatter, setFields } from '../../scripts/docs/lib/frontmatter'
import { assertManifest } from '../../scripts/docs/lib/manifest'
import { extractBetween, replaceBetween } from '../../scripts/docs/lib/markers'
import { formatPeriod, overlaps, periodOf, yearsFromLegacy } from '../../scripts/docs/lib/period'
import {
  BENCHMARK_TYPES,
  DS_ADOPTION,
  DS_FILE,
  DS_TAKE,
  REQUIRED,
  SCORES,
  STATUS,
  TOKEN_EXT_NS,
  TOKEN_PATH,
} from '../../scripts/docs/lib/schema'
import { mdTable, parseTable } from '../../scripts/docs/lib/table'
import {
  flattenTokens,
  mergeTokens,
  parseCssValue,
  stringifyTokens,
  tokenFromParsed,
  type TokensFile,
} from '../../scripts/docs/lib/tokens'

const templates = {
  content: path.join(benchmarkDir('content'), '_template.md'),
  design: path.join(benchmarkDir('design'), '_template.md'),
  project: path.join(DOCS_ROOT, 'Experience', '_template.md'),
  dsitem: path.join(DS_DIR, '_template.md'),
}

describe('frontmatter', () => {
  it('parses every template', () => {
    for (const file of Object.values(templates)) {
      const { fm, data } = parseFrontmatter(fs.readFileSync(file, 'utf8'))
      expect(fm).not.toBeNull()
      expect(Object.keys(data).length).toBeGreaterThan(5)
    }
  })

  it('setFields changes only the targeted lines and keeps trailing comments', () => {
    const raw = fs.readFileSync(templates.content, 'utf8')
    const out = setFields(raw, {
      title: 'Example',
      url: 'https://example.com/#x',
      screenshots: ['a.png'],
    })
    const before = raw.split('\n')
    const after = out.split('\n')
    expect(after.length).toBe(before.length)
    const changed = after.filter((l, i) => l !== before[i])
    expect(changed).toHaveLength(3)
    expect(after.find((l) => l.startsWith('title:'))).toBe(
      'title: "Example"                 # Site / project name',
    )
    expect(after.find((l) => l.startsWith('screenshots:'))).toContain('["a.png"]')
    expect(parseFrontmatter(out).data).toMatchObject({
      title: 'Example',
      url: 'https://example.com/#x',
    })
  })

  it('setFields appends unknown keys before the closing fence', () => {
    const out = setFields('---\na: 1\n---\nbody\n', { b: 'two' })
    expect(out).toBe('---\na: 1\nb: "two"\n---\nbody\n')
  })
})

describe('schema ↔ templates ↔ rubric', () => {
  it('template scores keys equal the schema criteria', () => {
    for (const type of BENCHMARK_TYPES) {
      const { data } = parseFrontmatter(fs.readFileSync(templates[type], 'utf8'))
      expect(Object.keys(data.scores as object)).toEqual([...SCORES[type]])
      for (const key of REQUIRED.benchmark) expect(data).toHaveProperty(key)
    }
  })

  it('rubric lists the same criteria', () => {
    const { data } = parseFrontmatter(
      fs.readFileSync(path.join(DOCS_ROOT, 'Benchmarks', 'Rubric.md'), 'utf8'),
    )
    expect(data.content_criteria).toEqual([...SCORES.content])
    expect(data.design_criteria).toEqual([...SCORES.design])
  })

  it('project template has the required project keys', () => {
    const { data } = parseFrontmatter(fs.readFileSync(templates.project, 'utf8'))
    for (const key of REQUIRED.project) expect(data).toHaveProperty(key)
  })
})

describe('docs classification', () => {
  it.each([
    ['Benchmarks/Content/linear-app.md', 'benchmark'],
    ['Benchmarks/Design/README.md', 'index'],
    ['Benchmarks/Design/_template.md', null],
    ['Experience/Digikala/README.md', 'experience'],
    ['Experience/Digikala/zero-fee/README.md', 'project'],
    ['Experience/Digikala/zero-fee.md', 'meta'],
    ['Experience/Timeline.md', 'meta'],
    ['About-Me/Brand-Brief.md', 'meta'],
    ['README.md', 'index'],
    ['Benchmarks/Design/assets/x/desktop.png', null],
    ['Design-System/DS-01-single-accent-rule.md', 'dsitem'],
    ['Design-System/README.md', 'index'],
    ['Design-System/_template.md', null],
    ['Design-System/tokens/pleurat-com.tokens.json', null],
    ['Design-System/tokens/README.md', null],
    ['Design-System/sources/pleurat-com.capture.json', null],
    ['Design-System/assets/pleurat-com/DS-01-1.png', null],
  ])('%s → %s', (rel, kind) => {
    expect(classify(rel)?.kind ?? null).toBe(kind)
  })

  it('dsitem carries the id parsed from the file name', () => {
    expect(classify('Design-System/DS-07-control-tokens.md')?.dsId).toBe('DS-07')
  })

  it('slugFromUrl', () => {
    expect(slugFromUrl('https://www.linear.app/features')).toBe('linear-app')
    expect(slugFromUrl('https://sub.domain.co.uk')).toBe('sub-domain-co-uk')
  })
})

describe('markers and tables', () => {
  const doc = 'intro\n<!-- index:start -->\nold\n<!-- index:end -->\noutro\n'
  it('replaceBetween swaps only the block', () => {
    expect(replaceBetween(doc, 'new')).toBe(
      'intro\n<!-- index:start -->\nnew\n<!-- index:end -->\noutro\n',
    )
    expect(extractBetween(doc)).toBe('old')
  })
  it('replaceBetween refuses missing or duplicate markers', () => {
    expect(() => replaceBetween('no markers', 'x')).toThrow(/exactly one/)
    expect(() => replaceBetween(doc + doc, 'x')).toThrow(/exactly one/)
  })
  it('mdTable ↔ parseTable round-trips and escapes pipes', () => {
    const table = mdTable(
      ['A', 'B'],
      [
        ['x|y', ''],
        ['1', '2'],
      ],
    )
    expect(parseTable(table)).toEqual([
      ['x|y', '—'],
      ['1', '2'],
    ])
  })
})

describe('periods', () => {
  it('legacy strings', () => {
    expect(yearsFromLegacy('2.5 yr')).toBe(2.5)
    expect(yearsFromLegacy('8 mos')).toBe(0.7)
    expect(formatPeriod(periodOf('1.2 yr'))).toBe('1.2 yr')
  })
  it('structured periods and overlaps', () => {
    const a = periodOf({ start: '2021-03', end: '2023-08' })
    const b = periodOf({ start: '2023-01', end: 'present' })
    const c = periodOf({ start: '2019-01', end: '2020-12', approx: true })
    expect(formatPeriod(a)).toBe('2021-03 → 2023-08 · 2.5 yr')
    expect(formatPeriod(c)).toBe('c. 2019-01 → 2020-12 · 2 yr')
    expect(overlaps(a, b)).toBe(true)
    expect(overlaps(a, c)).toBe(false)
  })
})

describe('design-system items', () => {
  it('template has every required key and valid defaults', () => {
    const { data } = parseFrontmatter(fs.readFileSync(templates.dsitem, 'utf8'))
    for (const key of REQUIRED.dsitem) expect(data).toHaveProperty(key)
    expect(DS_ADOPTION).toContain(data.adoption)
    expect(STATUS).toContain(data.status)
    expect(Array.isArray(data.sources)).toBe(true)
    expect(data.target).toMatchObject({ kind: '', path: '', name: '' })
  })

  it.each([
    ['DS-07-control-tokens.md', 'DS-07', 'control-tokens'],
    ['DS-40-illustration-system.md', 'DS-40', 'illustration-system'],
  ])('DS_FILE accepts %s', (file, id, slug) => {
    const m = DS_FILE.exec(file)
    expect(m?.[1]).toBe(id)
    expect(m?.[2]).toBe(slug)
  })

  it.each(['DS-7-x.md', 'ds-07-x.md', 'DS-07-Control.md', 'DS-07.md', 'DS-07-a--b.md'])('DS_FILE rejects %s', (file) => {
    expect(DS_FILE.test(file)).toBe(false)
  })

  it('slugify', () => {
    expect(slugify('“What shipped” list')).toBe('what-shipped-list')
    expect(slugify('Surface + ink scale')).toBe('surface-ink-scale')
    expect(slugify('Tool tile & row')).toBe('tool-tile-and-row')
  })

  it('every item file agrees with its name and take/adoption enums', () => {
    const files = dsItemFiles()
    expect(files.length).toBeGreaterThan(0)
    const ids = new Set<string>()
    for (const file of files) {
      const m = DS_FILE.exec(path.basename(file))
      expect(m, path.basename(file)).not.toBeNull()
      const { data } = parseFrontmatter(fs.readFileSync(file, 'utf8'))
      expect(data.id).toBe(m?.[1])
      expect(data.slug).toBe(m?.[2])
      expect(DS_TAKE).toContain(data.take)
      expect(DS_ADOPTION).toContain(data.adoption)
      expect(ids.has(String(data.id)), `duplicate ${String(data.id)}`).toBe(false)
      ids.add(String(data.id))
    }
  })
})

describe('adopted design-system items', () => {
  it('point their target at a file that exists in the repo', () => {
    const REPO = path.resolve(DOCS_ROOT, '..')
    for (const file of dsItemFiles()) {
      const { data } = parseFrontmatter(fs.readFileSync(file, 'utf8'))
      if (data.adoption !== 'adopted') continue
      const target = data.target as { path?: string } | undefined
      expect(target?.path, `${path.basename(file)} target.path`).toBeTruthy()
      expect(fs.existsSync(path.join(REPO, target!.path!)), `${path.basename(file)} → ${target!.path}`).toBe(true)
    }
  })
})

describe('tokens (DTCG)', () => {
  it('parseCssValue', () => {
    expect(parseCssValue('clamp(36px, 3.5vw, 54px)')).toEqual({
      type: 'fluid',
      min: { value: 36, unit: 'px' },
      vw: 3.5,
      vwUnit: 'vw',
      max: { value: 54, unit: 'px' },
    })
    expect(parseCssValue('cubic-bezier(.22, 1, .36, 1)')).toEqual({ type: 'cubicBezier', value: [0.22, 1, 0.36, 1] })
    expect(parseCssValue('#F3B44A')).toEqual({
      type: 'color',
      value: { colorSpace: 'srgb', components: [0.953, 0.706, 0.29], hex: '#F3B44A' },
    })
    expect(parseCssValue('rgba(15,21,36,.1)')).toMatchObject({ type: 'color', value: { alpha: 0.1, hex: '#0F1524' } })
    expect(parseCssValue('200ms')).toEqual({ type: 'duration', value: { value: 200, unit: 'ms' } })
    expect(parseCssValue('.32s')).toEqual({ type: 'duration', value: { value: 0.32, unit: 's' } })
    expect(parseCssValue('-2px')).toEqual({ type: 'dimension', value: { value: -2, unit: 'px' } })
    expect(parseCssValue('"General Sans", system-ui, sans-serif')).toEqual({
      type: 'fontFamily',
      value: ['General Sans', 'system-ui', 'sans-serif'],
    })
    expect(parseCssValue('var(--lime)')).toEqual({ type: 'alias', ref: '--lime' })
    expect(parseCssValue('linear(0, 0.5 50%, 1)')).toMatchObject({ type: 'cubicBezier', approximation: true })
    expect(parseCssValue('not a value at all!')).toBeNull()
  })

  it('tokenFromParsed builds a fluid group with the house extension', () => {
    const g = tokenFromParsed(parseCssValue('clamp(96px, 15vh, 200px)')!) as Record<string, unknown>
    expect(g.min).toEqual({ $value: { value: 96, unit: 'px' }, $type: 'dimension' })
    expect((g.$extensions as Record<string, unknown>)[TOKEN_EXT_NS]).toEqual({ fluid: true, vwUnit: 'vh' })
  })

  it('mergeTokens keeps hand-written fields, marks stale, serialises byte-stable', () => {
    const existing: TokensFile = {
      $description: 'test',
      $extensions: { [TOKEN_EXT_NS]: { benchmark: 'x' } },
      color: {
        $type: 'color',
        brand: {
          $value: { colorSpace: 'srgb', components: [0, 0, 0], hex: '#000000' },
          $description: 'the accent',
          $extensions: { [TOKEN_EXT_NS]: { var: '--old', origin: 'stylesheet', items: ['DS-01'] } },
        },
        manual: { $value: { colorSpace: 'srgb', components: [1, 1, 1], hex: '#FFFFFF' }, $extensions: { [TOKEN_EXT_NS]: { origin: 'manual' } } },
        gone: { $value: { colorSpace: 'srgb', components: [0, 0, 0], hex: '#000000' }, $extensions: { [TOKEN_EXT_NS]: { origin: 'stylesheet' } } },
      },
    }
    const merged = mergeTokens(
      existing,
      [
        { path: 'color.brand', node: tokenFromParsed(parseCssValue('#F3B44A')!)!, ext: { var: '--accent', origin: 'stylesheet', css: '#F3B44A' } },
        { path: 'color.manual', node: tokenFromParsed(parseCssValue('#123456')!)!, ext: { origin: 'stylesheet' } },
        { path: 'motion.ease.out', node: tokenFromParsed(parseCssValue('cubic-bezier(.22,1,.36,1)')!)!, ext: { var: '--ease', origin: 'stylesheet' } },
      ],
      '2026-09-19',
    )
    const flat = new Map(flattenTokens(merged).map((e) => [e.path, e]))
    expect((flat.get('color.brand')!.node as { $value: { hex: string } }).$value.hex).toBe('#F3B44A')
    expect(flat.get('color.brand')!.node.$description).toBe('the accent')
    expect((flat.get('color.brand')!.node.$extensions![TOKEN_EXT_NS] as Record<string, unknown>).items).toEqual(['DS-01'])
    expect((flat.get('color.manual')!.node as { $value: { hex: string } }).$value.hex).toBe('#FFFFFF')
    expect((flat.get('color.gone')!.node.$extensions![TOKEN_EXT_NS] as Record<string, unknown>).stale).toBe('2026-09-19')
    expect(flat.get('motion.ease.out')!.type).toBe('cubicBezier')
    expect(flat.get('color.gone')!.type).toBe('color') // inherited from the group

    const once = stringifyTokens(merged)
    const twice = stringifyTokens(JSON.parse(once) as TokensFile)
    expect(twice).toBe(once)
    expect(Object.keys(JSON.parse(once) as object)).toEqual(['$description', '$extensions', 'color', 'motion'])
  })
})

describe('capture manifests', () => {
  it('pleurat-com manifest is valid and consistent with the item files', () => {
    const file = manifestFile('pleurat-com')
    const m = assertManifest(JSON.parse(fs.readFileSync(file, 'utf8')), 'pleurat-com')
    const ids = new Set(dsItemFiles().map((f) => path.basename(f).slice(0, 5)))
    for (const it of m.items) expect(ids.has(it.id), `${it.id} has no item file`).toBe(true)
    for (const [k, v] of Object.entries(m.tokenMap ?? {})) {
      expect(k.startsWith('--')).toBe(true)
      expect(TOKEN_PATH.test(v), `${k} → ${v}`).toBe(true)
    }
  })

  it('assertManifest lists every problem', () => {
    expect(() =>
      assertManifest({ benchmark: 'x', type: 'nope', baseUrl: 'ftp://x', items: [{ id: 'DS-1', route: 'home', targets: [], capture: ['zzz'] }] }),
    ).toThrow(/type: one of[\s\S]*baseUrl[\s\S]*items\[0\]\.id[\s\S]*route[\s\S]*targets[\s\S]*unknown kind/)
  })
})
