/** Selection contracts: order, media evidence, destinations, and all existing CMS sizes. */
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'

import { WorkMosaicBlock } from '@/blocks/WorkMosaic/Component'
import { WorkMosaic } from '@/blocks/WorkMosaic/config'
import { isMosaicSize, toMosaicSize, type MosaicSize } from '@/blocks/WorkMosaic/sizes'
import { mosaicMedia } from '@/blocks/WorkMosaic/Cover'
import { HOME_MOSAIC } from '@/endpoints/seed/home-content'
import type { Media, Project } from '@/payload-types'
import { uiCopy } from '@/utilities/uiCopy'

afterEach(cleanup)

const project = (overrides: Partial<Project> = {}): Project => ({
  id: 'p1',
  slug: 'digital-gold',
  title: 'Digital Gold',
  summary: 'Vision, growth and dashboards.',
  company: 'Digikala',
  role: 'Designer',
  kind: ['product', 'growth'],
  order: 1,
  caseStudyStatus: 'none',
  createdAt: '2026-09-21T00:00:00.000Z',
  updatedAt: '2026-09-21T00:00:00.000Z',
  ...overrides,
})

const media = (overrides: Partial<Media> = {}): Media => ({
  id: 'm1',
  alt: 'Cover',
  url: '/api/media/file/cover.png',
  width: 1600,
  height: 900,
  mimeType: 'image/png',
  createdAt: '2026-09-21T00:00:00.000Z',
  updatedAt: '2026-09-21T00:00:00.000Z',
  ...overrides,
})

const tile = (size: MosaicSize, overrides: Partial<Project> = {}, extra = {}) => ({
  id: `t-${overrides.id ?? size}`,
  project: project({ id: `p-${overrides.id ?? size}`, ...overrides }),
  size,
  ...extra,
})

const header = { tag: 'Work', lead: 'Selected', tail: 'work' }

describe('selection emphasis', () => {
  it('retains all seven seeded projects and accepts existing CMS size values', () => {
    expect(HOME_MOSAIC).toHaveLength(7)
    expect(new Set(HOME_MOSAIC.map((item) => item.slug)).size).toBe(7)
    for (const item of HOME_MOSAIC) expect(isMosaicSize(item.size)).toBe(true)
    expect(toMosaicSize('enormous')).toBe('small')
    expect(toMosaicSize(undefined)).toBe('small')
  })
})

describe('mosaic tiles', () => {
  it('uses distinct hero evidence beside the cover, while respecting explicit overrides', () => {
    const cover = media({ id: 'cover' })
    const secondary = media({
      id: 'secondary',
      url: '/api/media/file/secondary.png',
      width: 390,
      height: 860,
    })
    const doc = project({ cover, hero: { items: [{ media: cover }, { media: secondary }] } })
    expect(mosaicMedia(doc)).toEqual({ lead: cover, companion: secondary })
    const fullCover = media({ id: 'cover-full', url: '/api/media/file/cover-full.png' })
    expect(
      mosaicMedia(project({ cover, hero: { items: [{ media: fullCover }, { media: secondary }] } }))
        .companion,
    ).toBe(secondary)
    expect(mosaicMedia(doc, secondary)).toEqual({ lead: secondary, companion: null })
  })

  it('keeps context visible for project notes without a public case study', () => {
    const { container } = render(
      <WorkMosaicBlock items={[tile('small')]} locale="en" sectionHeader={header} />,
    )
    expect(container.textContent).toContain('Vision, growth and dashboards.')
    expect(container.querySelector('.work-story')?.tagName).toBe('ARTICLE')
  })

  it('renders one cell per tile plus the closing index cell, in CMS order', () => {
    const { container } = render(
      <WorkMosaicBlock
        items={[
          tile('large', { id: 'a', title: 'Alpha' }),
          tile('small', { id: 'b', title: 'Beta' }),
        ]}
        locale="en"
        sectionHeader={header}
      />,
    )
    const headings = [...container.querySelectorAll('h3')].map((h) => h.textContent)
    expect(headings).toEqual(['Alpha', 'Beta'])
    // `.index-code` is also the plate's kind line, so read the positions specifically.
    const positions = [...container.querySelectorAll('.index-code')]
      .map((n) => n.textContent ?? '')
      .filter((t) => /^\d\d$/.test(t))
    expect(positions).toEqual(['01', '02'])
    expect(container.textContent).toContain(uiCopy.en.workIndexTitle)
  })

  it('drops a project unpublished in this locale and keeps the archive destination', () => {
    const { container } = render(
      <WorkMosaicBlock
        items={[
          { id: 't1', project: 'unpopulated-id', size: 'large' },
          tile('small', { id: 'b', title: 'Beta' }),
        ]}
        locale="fa"
        sectionHeader={header}
      />,
    )
    expect(container.querySelectorAll('h3')).toHaveLength(1)
    expect(container.querySelector('.work-selection-footer')?.getAttribute('href')).toBe('/fa/work')
  })

  it('renders nothing at all when no tile survives', () => {
    const { container } = render(
      <WorkMosaicBlock
        items={[{ id: 't1', project: 'unpopulated-id', size: 'large' }]}
        locale="en"
        sectionHeader={header}
      />,
    )
    expect(container.textContent).toBe('')
  })

  it('prefers the override, then the cover, then the hero, then an honest type specimen', () => {
    const cover = media({ id: 'cover', url: '/api/media/file/cover.png' })
    const hero = media({ id: 'hero', url: '/api/media/file/hero.png' })
    const override = media({ id: 'override', url: '/api/media/file/override.png' })
    const src = (c: HTMLElement) => c.querySelector('img')?.getAttribute('src') ?? ''

    const withOverride = render(
      <WorkMosaicBlock
        items={[
          tile(
            'large',
            { id: 'a', cover, hero: { items: [{ media: hero }] } },
            { mediaOverride: override },
          ),
        ]}
        locale="en"
        sectionHeader={header}
      />,
    )
    expect(src(withOverride.container)).toContain('override.png')
    cleanup()

    const withCover = render(
      <WorkMosaicBlock
        items={[tile('large', { id: 'a', cover, hero: { items: [{ media: hero }] } })]}
        locale="en"
        sectionHeader={header}
      />,
    )
    expect(src(withCover.container)).toContain('cover.png')
    cleanup()

    const withHero = render(
      <WorkMosaicBlock
        items={[tile('large', { id: 'a', hero: { items: [{ media: hero }] } })]}
        locale="en"
        sectionHeader={header}
      />,
    )
    expect(src(withHero.container)).toContain('hero.png')
    cleanup()

    // Missing media contributes no invented screenshot or English placeholder.
    const plate = render(
      <WorkMosaicBlock items={[tile('large', { id: 'a' })]} locale="fa" sectionHeader={header} />,
    )
    expect(plate.container.querySelector('img')).toBeNull()
    expect(plate.container.querySelector('.work-art-specimen')).toBeTruthy()
    expect(plate.container.textContent).toContain('Digikala')
    expect(plate.container.textContent).not.toContain(uiCopy.en.workMediaPending)
  })

  it('links to a case study, out to a live URL, or nowhere at all', () => {
    const cased = render(
      <WorkMosaicBlock
        items={[tile('large', { id: 'a', caseStudyStatus: 'published', slug: 'rp1-arena' })]}
        locale="fa"
        sectionHeader={header}
      />,
    )
    const internal = cased.container.querySelectorAll('a')[0]
    expect(internal.getAttribute('href')).toBe('/fa/work/rp1-arena')
    expect(internal.getAttribute('target')).toBeNull()
    cleanup()

    const live = render(
      <WorkMosaicBlock
        items={[tile('large', { id: 'a', liveUrl: 'https://example.com' })]}
        locale="en"
        sectionHeader={header}
      />,
    )
    const external = live.container.querySelectorAll('a')[0]
    expect(external.getAttribute('target')).toBe('_blank')
    expect(external.textContent).toContain(uiCopy.en.opensInNewTab)
    cleanup()

    // Nothing to link to: an article, not a dead anchor. Only the closing index cell links.
    const none = render(
      <WorkMosaicBlock items={[tile('large', { id: 'a' })]} locale="en" sectionHeader={header} />,
    )
    expect(none.container.querySelectorAll('a')).toHaveLength(1)
    expect(none.container.querySelector('article')).toBeTruthy()
  })

  it('says less on a small tile than on a wide one', () => {
    const wide = render(
      <WorkMosaicBlock items={[tile('wide', { id: 'a' })]} locale="en" sectionHeader={header} />,
    )
    expect(wide.container.textContent).toContain('Vision, growth and dashboards.')
    expect(wide.container.textContent).toContain('Designer')
    cleanup()

    const small = render(
      <WorkMosaicBlock
        items={[tile('small', { id: 'a', caseStudyStatus: 'published' })]}
        locale="en"
        sectionHeader={header}
      />,
    )
    expect(small.container.textContent).not.toContain('Vision, growth and dashboards.')
    expect(small.container.textContent).not.toContain('Designer')
    expect(small.container.textContent).toContain('Digikala')
  })

  it('keeps the hero anchor and claims no empty viewport height', () => {
    const { container } = render(
      <WorkMosaicBlock items={[tile('large', { id: 'a' })]} locale="en" sectionHeader={header} />,
    )
    const section = container.querySelector('section')!
    expect(section.id).toBe('selected-work')
    expect([...section.classList].some((c) => c.startsWith('pb-'))).toBe(false)
    expect(screen.getByRole('heading', { level: 2 }).textContent).toContain('Selected')
  })
})

describe('mosaic schema', () => {
  const items = WorkMosaic.fields.find((f) => 'name' in f && f.name === 'items')!
  const validate = (items as { validate: (value: unknown) => true | string }).validate

  it('refuses the same project twice and allows everything else', () => {
    expect(validate([{ project: 'a' }, { project: 'b' }])).toBe(true)
    expect(validate([{ project: { id: 'a' } }, { project: 'a' }])).toBe(
      'Each project may appear once in the mosaic.',
    )
    // Empty rows are `minRows`' business, not the duplicate check's.
    expect(validate([{ project: undefined }, { project: undefined }])).toBe(true)
    expect(validate(undefined)).toBe(true)
  })
})
