import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { Payload } from 'payload'
import type { IndustryGridBlock as IndustryBlock, Page } from '@/payload-types'
import { IndustryGridBlock } from '@/blocks/IndustryGrid/Component'
import { IndustryGrid } from '@/blocks/IndustryGrid/config'
import {
  INDUSTRY_COUNT,
  INDUSTRY_KEYS,
  industryHeaders,
  industryLabels,
  industryCountLabel,
} from '@/blocks/IndustryGrid/catalogue'
import {
  buildHomeLayout,
  buildIndustryGridBlock,
  HOME_MOSAIC,
  localizeHomeLayout,
} from '@/endpoints/seed/home-content'
import { homeStatic } from '@/endpoints/seed/home-static'
import { homeCopy } from '@/endpoints/seed/home-copy'
import { seedHomeIndustries, upsertHomeIndustries } from '@/endpoints/seed/home-industries'
import { collectRevealTargets } from '@/providers/ScrollReveal/targets'
import { LOCALES, type Locale } from '@/utilities/locale'

afterEach(cleanup)
const projects = Object.fromEntries(HOME_MOSAIC.map(({ slug }) => [slug, `project-${slug}`]))
const layoutFor = (locale: Locale) => buildHomeLayout({ locale, projects })
const oldLayout = (locale: Locale): Page['layout'] =>
  layoutFor(locale)
    .filter((block) => block.blockType !== 'industryGrid')
    .map((block, index) => ({ ...block, id: `block-${index}` }))

describe('Industry catalogue and rendering', () => {
  it('has 15 distinct keys and complete, distinct labels in all seven languages', () => {
    expect(INDUSTRY_COUNT).toBe(15)
    expect(new Set(INDUSTRY_KEYS).size).toBe(15)
    for (const locale of LOCALES) {
      expect(Object.keys(industryLabels[locale])).toEqual([...INDUSTRY_KEYS])
      expect(new Set(Object.values(industryLabels[locale])).size).toBe(15)
      expect(Object.values(industryLabels[locale]).every((label) => label.trim().length > 0)).toBe(
        true,
      )
      expect(homeCopy[locale].proof.metrics[2]!.value).toBe(industryCountLabel(locale))
    }
    expect(industryLabels.fa.consulting).toBe('مشاورهٔ کسب‌وکار')
  })

  it('rejects duplicate, missing and unknown keys in the CMS', () => {
    const field = IndustryGrid.fields.find(
      (field) => 'name' in field && field.name === 'industries',
    )
    const validate = (field as { validate: (value: unknown) => true | string }).validate
    const rows = INDUSTRY_KEYS.map((key) => ({ key }))
    expect(validate(rows)).toBe(true)
    expect(validate(rows.slice(1))).not.toBe(true)
    expect(validate([...rows.slice(1), rows[1]])).not.toBe(true)
    expect(validate([...rows.slice(1), { key: 'unknown' }])).not.toBe(true)
  })

  it.each(['en', 'fa'] as const)(
    'renders only a heading, 15 names and 15 different static illustrations in %s',
    (locale) => {
      const { container } = render(
        <IndustryGridBlock {...buildIndustryGridBlock(locale)} locale={locale} />,
      )
      expect(screen.getAllByRole('listitem')).toHaveLength(15)
      expect(screen.getAllByRole('heading', { level: 3 }).map((el) => el.textContent)).toEqual(
        INDUSTRY_KEYS.map((key) => industryLabels[locale][key]),
      )
      expect(container.querySelectorAll('.industry-row')).toHaveLength(1)
      expect(
        container.querySelectorAll('.industry-set:not([aria-hidden]) .industry-window'),
      ).toHaveLength(15)
      const illustrations = [
        ...container.querySelectorAll('.industry-set:not([aria-hidden]) svg'),
      ]
      expect(illustrations).toHaveLength(15)
      expect(new Set(illustrations.map((svg) => svg.innerHTML)).size).toBe(15)
      expect(
        illustrations.every(
          (svg) =>
            svg.getAttribute('viewBox') === '0 0 400 280' &&
            svg.getAttribute('aria-hidden') === 'true',
        ),
      ).toBe(true)
      expect(container.querySelector('a, button, img, animate, .cap-anim, p')).toBeNull()
      const reveal = collectRevealTargets(container.firstElementChild as HTMLElement)
      expect(
        reveal.filter((target) => target.element.matches('.industry-row') && target.contents),
      ).toHaveLength(1)
    },
  )

  it('places industries first in the seed, fallback and every locale overlay', () => {
    const layouts = [
      homeStatic.layout,
      ...LOCALES.map((locale) => layoutFor(locale)),
      ...LOCALES.map((locale) => localizeHomeLayout(locale, layoutFor('en'))),
    ]
    for (const layout of layouts) {
      expect(layout[0]!.blockType).toBe('industryGrid')
      expect(layout.filter((block) => block.blockType === 'industryGrid')).toHaveLength(1)
      const mosaic = layout.findIndex((block) => block.blockType === 'workMosaic')
      const workspace = layout.findIndex((block) => block.blockType === 'workspace')
      expect(mosaic).toBeGreaterThanOrEqual(0)
      expect(workspace).toBe(mosaic + 1)
    }
  })
})

describe('Additive homepage update', () => {
  it.each(LOCALES)(
    'keeps custom copy, relationships and row ids intact in %s; rerunning is identical',
    (locale) => {
      const layout = oldLayout(locale)
      const workspace = layout.find((block) => block.blockType === 'workspace')!
      workspace.principle = `Custom editorial copy ${locale}`
      const teaser = layout.find((block) => block.blockType === 'experienceTeaser')!
      teaser.metrics![2]!.value = locale === 'fa' ? '۱۶' : '16'
      teaser.metrics![2]!.id = 'industry-total'
      const input = structuredClone(layout)
      const next = upsertHomeIndustries(layout, locale)
      expect(layout).toEqual(input)
      expect(
        next.filter((block) => !['industryGrid', 'experienceTeaser'].includes(block.blockType)),
      ).toEqual(input.filter((block) => block.blockType !== 'experienceTeaser'))
      const updated = next.find((block) => block.blockType === 'experienceTeaser')!
      expect(updated.metrics![2]).toEqual({
        ...teaser.metrics![2],
        value: industryCountLabel(locale),
        source: 'Experience/Industries.md',
      })
      expect(updated.metrics!.slice(0, 2)).toEqual(teaser.metrics!.slice(0, 2))
      expect(upsertHomeIndustries(next, locale)).toEqual(next)
    },
  )

  it('deduplicates and moves the existing block, retaining its identity and translated header', () => {
    const industry: IndustryBlock = {
      ...buildIndustryGridBlock('fa'),
      id: 'keep-block',
      sectionHeader: { lead: 'عنوان سفارشی', tail: '' },
      industries: INDUSTRY_KEYS.map((key) => ({ key, id: `keep-${key}` })),
    }
    const layout = [...oldLayout('fa'), industry, { ...industry, id: 'duplicate' }]
    const next = upsertHomeIndustries(layout, 'fa')
    expect(next[0]).toEqual(industry)
    expect(next[1]!.blockType).toBe('tracks')
    expect(next.filter((block) => block.blockType === 'industryGrid')).toHaveLength(1)
  })

  it('fails before modifying a layout without the required workspace', () => {
    expect(() => upsertHomeIndustries([], 'en')).toThrow(/workspace/)
  })

  it('snapshots every translation before the shared write, reuses generated ids, and performs no writes on rerun', async () => {
    const pages = new Map(
      LOCALES.map((locale) => [
        locale,
        { id: 'home', _status: 'published', layout: oldLayout(locale) } as Page,
      ]),
    )
    const events: string[] = []
    const update = vi.fn(async ({ locale, data }: { locale: Locale; data: Partial<Page> }) => {
      events.push(`write:${locale}`)
      const layout = data.layout!.map((block) =>
        block.blockType === 'industryGrid'
          ? {
              ...block,
              id: block.id ?? 'generated-block',
              industries: block.industries.map((row) => ({
                ...row,
                id: row.id ?? `generated-${row.key}`,
              })),
            }
          : block,
      )
      const saved = { ...pages.get(locale)!, ...data, layout }
      pages.set(locale, saved)
      return structuredClone(saved)
    })
    const payload = {
      find: vi.fn(async () => ({ docs: [structuredClone(pages.get('en'))] })),
      findByID: vi.fn(async ({ locale }: { locale: Locale }) => {
        events.push(`read:${locale}`)
        return structuredClone(pages.get(locale))
      }),
      update,
    } as unknown as Payload
    expect((await seedHomeIndustries({ payload })).updatedLocales).toBe(7)
    expect(events.slice(0, 6)).toEqual(LOCALES.slice(1).map((locale) => `read:${locale}`))
    for (const locale of LOCALES) {
      const block = pages.get(locale)!.layout[0] as IndustryBlock
      expect(block.id).toBe('generated-block')
      expect(block.industries.every((row) => row.id === `generated-${row.key}`)).toBe(true)
      expect(block.sectionHeader).toEqual(industryHeaders[locale])
    }
    expect((await seedHomeIndustries({ payload })).updatedLocales).toBe(0)
    expect(update).toHaveBeenCalledTimes(7)
  })
})
