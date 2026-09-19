import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import { DOCS_ROOT, benchmarkDir, classify, slugFromUrl } from '../../scripts/docs/lib/docs'
import { parseFrontmatter, setFields } from '../../scripts/docs/lib/frontmatter'
import { extractBetween, replaceBetween } from '../../scripts/docs/lib/markers'
import { formatPeriod, overlaps, periodOf, yearsFromLegacy } from '../../scripts/docs/lib/period'
import { BENCHMARK_TYPES, SCORES, REQUIRED } from '../../scripts/docs/lib/schema'
import { mdTable, parseTable } from '../../scripts/docs/lib/table'

const templates = {
  content: path.join(benchmarkDir('content'), '_template.md'),
  design: path.join(benchmarkDir('design'), '_template.md'),
  project: path.join(DOCS_ROOT, 'Experience', '_template.md'),
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
    ['Experience/Digikala/zero-fee.md', 'project'],
    ['Experience/Timeline.md', 'meta'],
    ['About-Me/Brand-Brief.md', 'meta'],
    ['README.md', 'index'],
    ['Benchmarks/Design/assets/x/desktop.png', null],
  ])('%s → %s', (rel, kind) => {
    expect(classify(rel)?.kind ?? null).toBe(kind)
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
