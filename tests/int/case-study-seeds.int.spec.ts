/**
 * Case-study seed modules (pure — no database): every locale payload must build the same block
 * tree as English, because block rows are shared across locales and only their leaves are
 * localized. A row that exists in one locale and not another, a shared field that differs (the
 * last locale written wins it for everyone), a required leaf left empty, or a row count outside a
 * block's limits all fail here instead of halfway through `pnpm seed:case-studies`, after some
 * locales were already written.
 */
import { describe, expect, it } from 'vitest'

import { FIGURE_ITEM_COUNT, type FigureLayout } from '@/blocks/CaseStudy/Figure/config'
import { CASE_STUDIES } from '@/endpoints/seed/case-studies'
import { DG_LOCALES, DG_MEDIA, dgLocalizedFields } from '@/endpoints/seed/case-studies/digital-gold'
import type { CaseStudyLocalizedFields } from '@/endpoints/seed/case-studies/seed-case-study'
import { collectIds, hasText } from '@/endpoints/seed/translations/audit'
import { LOCALES, type Locale } from '@/utilities/locale'

type Row = Record<string, unknown>
type Sections = CaseStudyLocalizedFields['sections']

/** Generated block types carry no index signature; the checks below walk them as plain rows. */
const rowsOf = (sections: Sections): Row[] => sections as unknown as Row[]

/** A media id for every key, so no `item()` drops a row for want of an upload. */
const fakeMedia = (media: Record<string, unknown>) =>
  Object.fromEntries(Object.keys(media).map((key) => [key, `media:${key}`]))

const isRowArray = (value: unknown): value is Row[] =>
  Array.isArray(value) && value.every((item) => item && typeof item === 'object' && 'id' in item)

/**
 * The fields every locale shares. `label` is a shared select only on a narrative block — on a
 * process step or an outcome it is localized text — so it is projected at block level only.
 */
const project = (row: Row, isBlock: boolean): Row => {
  const keys = isBlock
    ? ['blockType', 'id', 'layout', 'treatment', 'kind', ...(row.blockType === 'csNarrative' ? ['label'] : [])]
    : ['id', 'code', 'value', 'kind', 'media']
  const out: Row = {}
  for (const key of keys) if (key in row) out[key] = row[key]
  for (const [key, value] of Object.entries(row)) {
    if (isRowArray(value)) out[key] = value.map((child) => project(child, false))
  }
  return out
}

const within = (n: number, min: number, max: number) => n >= min && n <= max

/** Every rule a block's own config would reject at save time, checked for one locale. */
const blockProblems = (block: Row): string[] => {
  const problems: string[] = []
  const at = `${String(block.id)} (${String(block.blockType)})`
  const need = (value: unknown, what: string) => {
    if (!hasText(value)) problems.push(`${at}: empty ${what}`)
  }
  const rows = (key: string) => (Array.isArray(block[key]) ? (block[key] as Row[]) : [])

  switch (block.blockType) {
    case 'csNarrative':
      need(block.heading, 'heading')
      if (block.label === 'custom') need(block.customLabel, 'customLabel')
      break
    case 'csFinding':
      need(block.text, 'text')
      break
    case 'csProcess':
      if (!within(rows('steps').length, 3, 8)) problems.push(`${at}: ${rows('steps').length} steps`)
      for (const step of rows('steps')) {
        need(step.label, `step ${String(step.id)} label`)
        if (typeof step.code !== 'string' || step.code.length > 4) problems.push(`${at}: code ${String(step.code)}`)
      }
      break
    case 'csDecisions':
      if (!within(rows('items').length, 2, 6)) problems.push(`${at}: ${rows('items').length} decisions`)
      for (const item of rows('items')) {
        need(item.title, `decision ${String(item.id)} title`)
        need(item.why, `decision ${String(item.id)} why`)
      }
      break
    case 'csOutcomes':
      if (!within(rows('items').length, 1, 4)) problems.push(`${at}: ${rows('items').length} outcomes`)
      for (const item of rows('items')) need(item.label, `outcome ${String(item.id)} label`)
      break
    case 'csLessons':
      if (!within(rows('items').length, 2, 4)) problems.push(`${at}: ${rows('items').length} lessons`)
      for (const item of rows('items')) need(item.title, `lesson ${String(item.id)} title`)
      break
    case 'csFigure': {
      const range = FIGURE_ITEM_COUNT[block.layout as FigureLayout]
      if (!range || !within(rows('items').length, range.min, range.max)) {
        problems.push(`${at}: ${rows('items').length} items for ${String(block.layout)}`)
      }
      if (rows('annotations').length > 8) problems.push(`${at}: ${rows('annotations').length} annotations`)
      for (const note of rows('annotations')) need(note.text, `annotation ${String(note.id)}`)
      break
    }
  }
  return problems
}

const ARABIC_SCRIPT = /[\u0600-\u06FF]/
const JAPANESE_SCRIPT = /[\u3040-\u30FF\u4E00-\u9FFF]/

/** Catches a translation pasted into the wrong locale's slot. */
const scriptProblem = (locale: Locale, text: string): string | null => {
  const arabic = ARABIC_SCRIPT.test(text)
  const japanese = JAPANESE_SCRIPT.test(text)
  if (locale === 'fa' || locale === 'ar') return arabic ? null : `${locale}: no Arabic script in “${text}”`
  if (locale === 'ja') return japanese ? null : `ja: no kana or kanji in “${text}”`
  return arabic || japanese ? `${locale}: foreign script in “${text}”` : null
}

describe.each(CASE_STUDIES.map((config) => [config.label, config] as const))(
  '%s case study seed',
  (_label, config) => {
    const media = fakeMedia(config.media)
    const locales = config.seedLocales as readonly Locale[]
    const build = (locale: Locale) => config.localizedFields(locale, media) as CaseStudyLocalizedFields
    const english = build('en')
    const englishShape = rowsOf(english.sections).map((block) => project(block, true))

    it.each(locales)('%s builds the same shared block tree as English', (locale) => {
      const fields = build(locale)
      expect(collectIds(fields.sections)).toEqual(collectIds(english.sections))
      expect(rowsOf(fields.sections).map((block) => project(block, true))).toEqual(englishShape)
      expect(fields.hero?.items ?? []).toEqual(english.hero?.items ?? [])
    })

    it.each(locales)('%s fills every required leaf within block limits', (locale) => {
      const fields = build(locale)
      const problems = rowsOf(fields.sections).flatMap(blockProblems)
      if ((fields.hero?.items.length ?? 1) > 3) problems.push(`hero: ${fields.hero?.items.length} items`)
      for (const [key, value] of Object.entries({
        title: fields.title,
        summary: fields.summary,
        statement: fields.statement,
        'meta.title': fields.meta.title,
        'meta.description': fields.meta.description,
      })) {
        if (!hasText(value)) problems.push(`empty ${key}`)
      }
      // UTF-16 length, the same count Payload's `maxLength` applies.
      if (fields.statement.length > 160) problems.push(`statement is ${fields.statement.length} chars`)
      expect(problems).toEqual([])
    })

    it.each(locales)('%s copy is written in its own script', (locale) => {
      const fields = build(locale)
      const headings = (fields.sections as Sections)
        .filter((block) => block.blockType === 'csNarrative')
        .map((block) => (block as { heading: string }).heading)
      const problems = [fields.statement, fields.snapshot.problem, ...headings]
        .map((text) => scriptProblem(locale, text))
        .filter(Boolean)
      expect(problems).toEqual([])
    })
  },
)

describe('Digital Gold publication gates', () => {
  const media = fakeMedia(DG_MEDIA)

  it('is written in every locale, since its archive row is published in all seven', () => {
    expect(DG_LOCALES).toEqual(LOCALES)
  })

  it.each(LOCALES)('%s: every figure says what its media is', (locale) => {
    const figures = rowsOf(dgLocalizedFields(locale, media).sections).filter(
      (block) => block.blockType === 'csFigure',
    )
    expect(figures.length).toBeGreaterThan(0)
    // `auto` would crop any portrait capture — a desktop page, a brochure — into a phone.
    for (const figure of figures) expect(figure.treatment, String(figure.id)).not.toBe('auto')
  })

  it.each(LOCALES)('%s: outcomes carry percentages only, and a delivered output no number', (locale) => {
    const outcomes = rowsOf(dgLocalizedFields(locale, media).sections).find(
      (block) => block.blockType === 'csOutcomes',
    )
    for (const item of (outcomes?.items ?? []) as Row[]) {
      if (item.kind === 'measured') expect(item.value).toMatch(/^\d+(–\d+)?%$/)
      else expect(item.value).toBeUndefined()
    }
  })

  it.each(LOCALES)('%s: the P&L blocks name no currency', (locale) => {
    // Absolute rial values from the business review are never published — not even a currency
    // word near it, which is where one would slip in.
    const sections = rowsOf(dgLocalizedFields(locale, media).sections)
    const pnl = sections.filter((block) => block.blockType === 'csOutcomes' || block.id === 'dg-s17')
    expect(pnl).toHaveLength(2)
    expect(JSON.stringify(pnl)).not.toMatch(/rial|toman|ریال|ريال|تومان|トマン|リアル/i)
  })

  it('never references brochure page 5', () => {
    expect(JSON.stringify(DG_MEDIA)).not.toContain('brochure-05')
  })
})
