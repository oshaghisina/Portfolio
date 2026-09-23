/**
 * Work Mosaic (jsdom): the packing arithmetic that keeps the grid from opening a grey hole, and
 * the tile contracts — CMS order is DOM order, an unpublished project is dropped without leaving
 * the last row ragged, media resolves override → cover → hero → plate, and a tile links only
 * where there is somewhere to go.
 */
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'

import { WorkMosaicBlock } from '@/blocks/WorkMosaic/Component'
import { WorkMosaic } from '@/blocks/WorkMosaic/config'
import {
  MOSAIC,
  MOSAIC_COLS,
  MOSAIC_SIZES,
  isMosaicSize,
  tailSpan,
  toMosaicSize,
  type MosaicSize,
  type MosaicTrack,
} from '@/blocks/WorkMosaic/sizes'
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

/**
 * Walks the sequence exactly as CSS grid auto-placement does — in order, wrapping when a tile
 * cannot fit the row — and reports how many cells are left unfilled. Zero means the mosaic is a
 * closed rectangle at that width.
 */
const unfilledCells = (sizes: MosaicSize[], track: MosaicTrack): number => {
  const cols = MOSAIC_COLS[track]
  const weights = [...sizes.map((s) => MOSAIC[s].weight[track]), tailSpan(sizes, track)]
  let used = 0
  let holes = 0
  for (const weight of weights) {
    if (used + weight > cols) {
      holes += cols - used
      used = 0
    }
    used += weight
    if (used === cols) used = 0
  }
  return holes + (used === 0 ? 0 : cols - used)
}

describe('mosaic geometry', () => {
  it('gives every size a weight that divides its track, so a hole is never a sliver', () => {
    for (const track of ['pair', 'lg'] as MosaicTrack[]) {
      for (const size of MOSAIC_SIZES) {
        expect(MOSAIC_COLS[track] % MOSAIC[size].weight[track]).toBe(0)
      }
    }
  })

  it('packs the seeded composition into closed rectangles at both widths', () => {
    const seeded = HOME_MOSAIC.map(({ size }) => size)
    expect(seeded).toHaveLength(9)
    expect(tailSpan(seeded, 'lg')).toBe(3)
    expect(tailSpan(seeded, 'pair')).toBe(1)
    expect(unfilledCells(seeded, 'lg')).toBe(0)
    expect(unfilledCells(seeded, 'pair')).toBe(0)
  })

  it('never lets the closing cell leave a ragged last row', () => {
    const sequences: MosaicSize[][] = [
      ['wide'],
      ['small', 'small', 'small', 'large'],
      ['large', 'large'],
      ['small', 'wide', 'medium'],
      ['medium', 'medium', 'medium'],
    ]
    for (const sizes of sequences) {
      for (const track of ['pair', 'lg'] as MosaicTrack[]) {
        const total = sizes.reduce((n, s) => n + MOSAIC[s].weight[track], 0) + tailSpan(sizes, track)
        expect(total % MOSAIC_COLS[track]).toBe(0)
      }
    }
  })

  it('falls back to the smallest size for a value the schema no longer allows', () => {
    expect(isMosaicSize('large')).toBe(true)
    expect(isMosaicSize('enormous')).toBe(false)
    expect(toMosaicSize('enormous')).toBe('small')
    expect(toMosaicSize(undefined)).toBe('small')
  })
})

describe('mosaic tiles', () => {
  it('renders one cell per tile plus the closing index cell, in CMS order', () => {
    const { container } = render(
      <WorkMosaicBlock
        items={[tile('large', { id: 'a', title: 'Alpha' }), tile('small', { id: 'b', title: 'Beta' })]}
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

  it('drops a project unpublished in this locale and recomputes the closing span', () => {
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
    // One `small` survives, so the closing cell claims the other nine of twelve columns.
    expect(container.querySelector<HTMLElement>('[style*="--tail-lg"]')!.style.getPropertyValue('--tail-lg')).toBe('9')
  })

  it('renders nothing at all when no tile survives', () => {
    const { container } = render(
      <WorkMosaicBlock items={[{ id: 't1', project: 'unpopulated-id', size: 'large' }]} locale="en" sectionHeader={header} />,
    )
    expect(container.textContent).toBe('')
  })

  it('prefers the override, then the cover, then the hero, then the plate', () => {
    const cover = media({ id: 'cover', url: '/api/media/file/cover.png' })
    const hero = media({ id: 'hero', url: '/api/media/file/hero.png' })
    const override = media({ id: 'override', url: '/api/media/file/override.png' })
    const src = (c: HTMLElement) => c.querySelector('img')?.getAttribute('src') ?? ''

    const withOverride = render(
      <WorkMosaicBlock
        items={[tile('large', { id: 'a', cover, hero: { items: [{ media: hero }] } }, { mediaOverride: override })]}
        locale="en"
        sectionHeader={header}
      />,
    )
    expect(src(withOverride.container)).toContain('override.png')
    cleanup()

    const withCover = render(
      <WorkMosaicBlock items={[tile('large', { id: 'a', cover, hero: { items: [{ media: hero }] } })]} locale="en" sectionHeader={header} />,
    )
    expect(src(withCover.container)).toContain('cover.png')
    cleanup()

    const withHero = render(
      <WorkMosaicBlock items={[tile('large', { id: 'a', hero: { items: [{ media: hero }] } })]} locale="en" sectionHeader={header} />,
    )
    expect(src(withHero.container)).toContain('hero.png')
    cleanup()

    // No media at all: the deliberate pending plate, localised — never an English fallback.
    const plate = render(<WorkMosaicBlock items={[tile('large', { id: 'a' })]} locale="fa" sectionHeader={header} />)
    expect(plate.container.querySelector('img')).toBeNull()
    expect(plate.container.textContent).toContain(uiCopy.fa.workMediaPending)
    expect(plate.container.textContent).not.toContain(uiCopy.en.workMediaPending)
  })

  it('links to a case study, out to a live URL, or nowhere at all', () => {
    const cased = render(
      <WorkMosaicBlock items={[tile('large', { id: 'a', caseStudyStatus: 'published', slug: 'rp1-arena' })]} locale="fa" sectionHeader={header} />,
    )
    const internal = cased.container.querySelectorAll('a')[0]
    expect(internal.getAttribute('href')).toBe('/fa/work/rp1-arena')
    expect(internal.getAttribute('target')).toBeNull()
    cleanup()

    const live = render(
      <WorkMosaicBlock items={[tile('large', { id: 'a', liveUrl: 'https://example.com' })]} locale="en" sectionHeader={header} />,
    )
    const external = live.container.querySelectorAll('a')[0]
    expect(external.getAttribute('target')).toBe('_blank')
    expect(external.textContent).toContain(uiCopy.en.opensInNewTab)
    cleanup()

    // Nothing to link to: an article, not a dead anchor. Only the closing index cell links.
    const none = render(<WorkMosaicBlock items={[tile('large', { id: 'a' })]} locale="en" sectionHeader={header} />)
    expect(none.container.querySelectorAll('a')).toHaveLength(1)
    expect(none.container.querySelector('article')).toBeTruthy()
  })

  it('says less on a small tile than on a wide one', () => {
    const wide = render(<WorkMosaicBlock items={[tile('wide', { id: 'a' })]} locale="en" sectionHeader={header} />)
    expect(wide.container.textContent).toContain('Vision, growth and dashboards.')
    expect(wide.container.textContent).toContain('Designer')
    cleanup()

    const small = render(<WorkMosaicBlock items={[tile('small', { id: 'a' })]} locale="en" sectionHeader={header} />)
    expect(small.container.textContent).not.toContain('Vision, growth and dashboards.')
    expect(small.container.textContent).not.toContain('Designer')
    expect(small.container.textContent).toContain('Digikala')
  })

  it('keeps the hero anchor and claims no empty viewport height', () => {
    const { container } = render(<WorkMosaicBlock items={[tile('large', { id: 'a' })]} locale="en" sectionHeader={header} />)
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
    expect(validate([{ project: { id: 'a' } }, { project: 'a' }])).toBe('Each project may appear once in the mosaic.')
    // Empty rows are `minRows`' business, not the duplicate check's.
    expect(validate([{ project: undefined }, { project: undefined }])).toBe(true)
    expect(validate(undefined)).toBe(true)
  })
})
