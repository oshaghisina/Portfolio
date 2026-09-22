/**
 * `/work` + Projects (jsdom): the route helper, the active-nav rule, and the archive pieces'
 * contracts — rows link only where there is somewhere to go, portrait media is framed not
 * cropped, the pending plate never falls back to English, the filter hides without renumbering.
 */
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'

import { FeaturedProject } from '@/blocks/ProjectArchive/FeaturedProject'
import { ProjectIndex } from '@/blocks/ProjectArchive/ProjectIndex'
import { countCompanies, projectLink, projectYear, toIndexRows } from '@/blocks/ProjectArchive/rows'
import { WorkIntro } from '@/blocks/ProjectArchive/WorkIntro'
import { SelectedWorkBlock } from '@/blocks/SelectedWork/Component'
import { kindLabels, PROJECT_KINDS } from '@/collections/Projects/kinds'
import { hrefFromLink } from '@/components/Link'
import { ProjectCover } from '@/components/ProjectCover'
import { isActivePath } from '@/i18n/navigation'
import { docPath, hasPublicCaseStudy, projectUrl } from '@/i18n/routes'
import type { Media, Project } from '@/payload-types'
import { pluralCopy, uiCopy } from '@/utilities/uiCopy'

afterEach(cleanup)

const project = (overrides: Partial<Project> = {}): Project => ({
  id: 'p1',
  slug: 'digital-gold',
  title: 'Digital Gold',
  summary: 'Vision, growth and dashboards.',
  company: 'Digikala',
  role: 'Designer, Marketer, BI developer',
  kind: ['product', 'growth'],
  order: 1,
  caseStudyStatus: 'none',
  createdAt: '2026-09-21T00:00:00.000Z',
  updatedAt: '2026-09-21T00:00:00.000Z',
  ...overrides,
})

const media = (overrides: Partial<Media> = {}): Media => ({
  id: 'm1',
  alt: 'Duel sheet',
  url: '/api/media/file/duel.png',
  width: 780,
  height: 1704,
  mimeType: 'image/png',
  createdAt: '2026-09-21T00:00:00.000Z',
  updatedAt: '2026-09-21T00:00:00.000Z',
  ...overrides,
})

describe('routes', () => {
  it('builds every collection path from one table', () => {
    expect(docPath('pages', 'work')).toBe('/work')
    expect(docPath('posts', 'hi')).toBe('/lab/hi')
    expect(docPath('projects', 'rp1-arena')).toBe('/work/rp1-arena')
    expect(hrefFromLink({ type: 'reference', reference: { relationTo: 'projects', value: { slug: 'rp1-arena' } as never } })).toBe(
      '/work/rp1-arena',
    )
  })

  it('prefixes project urls per locale, English unprefixed', () => {
    expect(projectUrl({ slug: 'rp1-arena' }, 'en')).toBe('/work/rp1-arena')
    expect(projectUrl({ slug: 'rp1-arena' }, 'fa')).toBe('/fa/work/rp1-arena')
    expect(projectUrl({ slug: 'rp1-arena' }, 'de')).toBe('/de/work/rp1-arena')
  })

  it('only a published case study earns a detail link', () => {
    expect(hasPublicCaseStudy({ caseStudyStatus: 'published' })).toBe(true)
    expect(hasPublicCaseStudy({ caseStudyStatus: 'draft' })).toBe(false)
    expect(hasPublicCaseStudy({ caseStudyStatus: 'none' })).toBe(false)
    expect(hasPublicCaseStudy(null)).toBe(false)
  })
})

describe('isActivePath', () => {
  it('matches the destination and anything beneath it, on segment boundaries', () => {
    expect(isActivePath('/work', '/work')).toBe(true)
    expect(isActivePath('/work/rp1-arena', '/work')).toBe(true)
    expect(isActivePath('/workshop', '/work')).toBe(false)
    expect(isActivePath('/work', '/fa/work')).toBe(true)
  })

  it('treats home as exact and ignores hash and external hrefs', () => {
    expect(isActivePath('/', '/')).toBe(true)
    expect(isActivePath('/work', '/')).toBe(false)
    expect(isActivePath('/', '/#experience')).toBe(false)
    expect(isActivePath('/work', 'https://example.com/work')).toBe(false)
    expect(isActivePath('/work', null)).toBe(false)
  })
})

describe('kinds', () => {
  it('labels every kind in every locale and drops unknown values', () => {
    expect(kindLabels(['product', 'growth'], 'en')).toEqual(['Product', 'Growth'])
    expect(kindLabels(['data'], 'fa')).toEqual(['داده'])
    expect(kindLabels(['product', 'ai', null], 'de')).toEqual(['Produkt'])
    expect(PROJECT_KINDS).not.toContain('ai')
  })

  it('pluralises counts through CLDR rules with Latin digits', () => {
    expect(pluralCopy('en', uiCopy.en.workProjects, 1)).toBe('1 project')
    expect(pluralCopy('en', uiCopy.en.workProjects, 28)).toBe('28 projects')
    expect(pluralCopy('fa', uiCopy.fa.workProjects, 28)).toBe('28 پروژه')
    expect(pluralCopy('ar', uiCopy.ar.workCompanies, 10)).toBe('10 شركات')
  })
})

describe('rows', () => {
  it('links to the case study first, the live url second, nowhere otherwise', () => {
    expect(projectLink(project({ caseStudyStatus: 'published' }), 'fa')).toEqual({ href: '/fa/work/digital-gold', external: false })
    expect(projectLink(project({ liveUrl: 'https://digikala.com/gold' }), 'en')).toEqual({
      href: 'https://digikala.com/gold',
      external: true,
    })
    expect(projectLink(project(), 'en')).toBeNull()
  })

  it('formats years only when dates exist', () => {
    expect(projectYear(undefined)).toBeNull()
    expect(projectYear({ start: '2026-02-01T00:00:00.000Z' })).toBe('2026')
    expect(projectYear({ start: '2023-01-01T00:00:00.000Z', end: '2025-06-01T00:00:00.000Z' })).toBe('2023–2025')
    expect(projectYear({ start: '2023-01-01T00:00:00.000Z', present: true })).toBe('2023–')
  })

  it('numbers rows by archive position and counts organisations loosely', () => {
    const rows = toIndexRows([project(), project({ id: 'p2', slug: 'x', company: 'digikala ' }), project({ id: 'p3', slug: 'y', company: 'Arvan Cloud' })], 'en')
    expect(rows.map((r) => r.index)).toEqual(['01', '02', '03'])
    expect(rows[0].kinds.map((k) => k.label)).toEqual(['Product', 'Growth'])
    expect(countCompanies([project(), project({ company: 'digikala ' }), project({ company: 'Arvan Cloud' })])).toBe(2)
  })
})

describe('ProjectCover', () => {
  it('renders the localised pending plate without media', () => {
    const { container } = render(<ProjectCover kinds={['محصول']} pendingLabel={uiCopy.fa.workMediaPending} />)
    expect(container.textContent).toContain('تصویر پروژه در انتظار')
    expect(container.textContent).toContain('محصول')
    expect(container.querySelector('img')).toBeNull()
  })

  it('frames portrait media with object-contain instead of cropping', () => {
    const { container } = render(<ProjectCover pendingLabel="x" resource={media()} size="100vw" />)
    expect(container.querySelector('img')!.className).toContain('object-contain')
  })

  it('lets landscape media fill the slot', () => {
    const { container } = render(<ProjectCover pendingLabel="x" resource={media({ width: 1600, height: 900 })} size="100vw" />)
    expect(container.querySelector('img')!.className).toContain('object-cover')
  })
})

describe('ProjectIndex', () => {
  const rows = toIndexRows(
    [
      project({ caseStudyStatus: 'published' }),
      project({ id: 'p2', slug: 'live', title: 'Live thing', kind: ['growth'], liveUrl: 'https://example.com' }),
      project({ id: 'p3', slug: 'plain', title: 'Plain thing', kind: ['research'] }),
    ],
    'en',
  )

  it('renders a link only where there is somewhere to go, marking external ones', () => {
    render(<ProjectIndex locale="en" rows={rows} />)
    const links = screen.getAllByRole('link')
    expect(links.map((a) => a.getAttribute('href'))).toEqual(['/work/digital-gold', 'https://example.com'])
    expect(links[1].getAttribute('target')).toBe('_blank')
    expect(links[1].getAttribute('rel')).toContain('noopener')
    expect(links[1].textContent).toContain(uiCopy.en.opensInNewTab)
    expect(screen.getByText('Plain thing').closest('a')).toBeNull()
  })

  it('filters by kind with aria-pressed and keeps the original numbering', () => {
    const { container } = render(<ProjectIndex locale="en" rows={rows} />)
    const growth = screen.getByRole('button', { name: /Growth/ })
    expect(growth.getAttribute('aria-pressed')).toBe('false')
    fireEvent.click(growth)
    expect(growth.getAttribute('aria-pressed')).toBe('true')
    const items = Array.from(container.querySelectorAll('li'))
    expect(items.filter((li) => !li.classList.contains('hidden'))).toHaveLength(2) // Digital Gold is product+growth
    expect(items[1].querySelector('.index-code')!.textContent).toBe('02')
  })
})

describe('FeaturedProject / WorkIntro / SelectedWork', () => {
  it('renders a chapter without a link when the project leads nowhere', () => {
    const { container } = render(<FeaturedProject index="01" locale="en" project={project()} variant="primary" />)
    expect(container.querySelector('a')).toBeNull()
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('Digital Gold')
    expect(container.textContent).toContain('Digikala')
    expect(container.textContent).toContain(uiCopy.en.workMediaPending)
  })

  it('computes the intro count from published documents', () => {
    render(<WorkIntro companyCount={10} locale="en" projectCount={28} sectionHeader={{ tag: 'Work', lead: 'Work across', tail: 'product.' }} />)
    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('Work across')
    expect(screen.getByText(/28 projects/)).toBeTruthy()
    expect(screen.getByText(/10 companies/)).toBeTruthy()
  })

  it('renders nothing for an unpopulated relationship and links into /work otherwise', () => {
    const empty = render(<SelectedWorkBlock locale="fa" project="some-id" sectionHeader={{ tag: 'Work', lead: 'Featured' }} />)
    expect(empty.container.textContent).toBe('')
    cleanup()
    const { container } = render(<SelectedWorkBlock locale="fa" project={project()} sectionHeader={{ tag: 'Work', lead: 'Featured' }} />)
    expect(container.querySelector('a')!.getAttribute('href')).toBe('/fa/work')
  })
})
