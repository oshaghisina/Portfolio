import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

const { find, draftMode } = vi.hoisted(() => ({
  find: vi.fn(),
  draftMode: vi.fn(async () => ({ isEnabled: false })),
}))
vi.mock('payload', () => ({ getPayload: async () => ({ find }) }))
vi.mock('@payload-config', () => ({ default: {} }))
vi.mock('next/headers', () => ({ draftMode }))

import { ProjectArchiveBlock } from '@/blocks/ProjectArchive/Component'
import { ProjectIndex } from '@/blocks/ProjectArchive/ProjectIndex'
import { ArchivePreview } from '@/blocks/ProjectArchive/ArchivePreview'
import { archiveCopy } from '@/blocks/ProjectArchive/copy'
import { archiveCover, matchesProject, toIndexRows } from '@/blocks/ProjectArchive/rows'
import { PROJECT_SEED } from '@/endpoints/seed/projects'
import type { Media, Project } from '@/payload-types'
import { LOCALES } from '@/utilities/locale'

const project = (i: number, overrides: Partial<Project> = {}): Project => ({
  id: `p${i}`,
  slug: `project-${i}`,
  title: `Project ${i}`,
  company: 'Studio',
  summary: 'A service for people.',
  order: i,
  kind: ['product'],
  caseStudyStatus: 'none',
  createdAt: '2026-09-26T00:00:00.000Z',
  updatedAt: '2026-09-26T00:00:00.000Z',
  ...overrides,
})
const media = (id: string): Media => ({
  id,
  url: `/media/${id}.png`,
  alt: 'Screen',
  width: 800,
  height: 600,
  createdAt: '',
  updatedAt: '',
})
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('complete Work archive', () => {
  it('requests all locale-published projects and renders each exactly once, beyond the old limit', async () => {
    const docs = Array.from({ length: 121 }, (_, i) => project(i, { featured: i < 7 }))
    find.mockResolvedValue({ docs })
    const { container } = render(
      await ProjectArchiveBlock({ blockType: 'projectArchive', locale: 'fa' }),
    )
    expect(find).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'projects',
        locale: 'fa',
        fallbackLocale: false,
        draft: false,
        overrideAccess: false,
        limit: 0,
        pagination: false,
        sort: ['order', 'title'],
      }),
    )
    expect(container.querySelectorAll('[data-project-slug]')).toHaveLength(121)
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(121)
    expect(screen.getByRole('heading', { name: 'Project 120' })).toBeTruthy()
    expect(container.querySelectorAll('a')).toHaveLength(0)
  })

  it('includes every active seed project, independently of feature, cover or case-study availability', () => {
    const docs = PROJECT_SEED.filter((row) => row.status === 'published').map((row, i) =>
      project(i, { ...row, cover: null }),
    )
    const { container } = render(<ProjectIndex locale="en" rows={toIndexRows(docs, 'en')} />)
    expect(
      [...container.querySelectorAll('[data-project-slug]')].map((el) =>
        el.getAttribute('data-project-slug'),
      ),
    ).toEqual(docs.map((doc) => doc.slug))
    expect(new Set(docs.map((doc) => doc.slug)).size).toBe(docs.length)
  })

  it('replaces a failed image without removing the project or its reserved preview frame', () => {
    const [row] = toIndexRows([project(1, { cover: media('missing') })], 'en')
    const { container } = render(<ArchivePreview row={row} />)
    const frame = container.querySelector('.archive-preview')
    fireEvent.error(container.querySelector('img')!)
    expect(container.querySelector('img')).toBeNull()
    expect(container.querySelector('.archive-preview')).toBe(frame)
    expect(container.querySelector('.archive-specimen')).toBeTruthy()
  })

  it('uses cover then a populated hero and never invents an image', () => {
    const cover = media('cover'),
      hero = media('hero')
    expect(archiveCover({ cover, hero: { items: [{ media: hero }] } })).toEqual(cover)
    expect(
      archiveCover({
        cover: 'unpopulated',
        hero: { items: [{ media: 'unpopulated' }, { media: hero }] },
      }),
    ).toEqual(hero)
    expect(archiveCover({ cover: null })).toBeNull()
  })
})

describe('archive browsing', () => {
  const docs = [
    project(1, {
      title: 'Digital Gold',
      company: 'Digikala',
      kind: ['product', 'growth'],
      summary: 'Trading and dashboards.',
      caseStudyStatus: 'published',
    }),
    project(2, { title: 'Server research', company: 'Arvan', kind: ['research'] }),
    project(3, {
      title: 'Campaign',
      company: 'Digikala',
      kind: ['growth'],
      liveUrl: 'https://example.com',
    }),
  ]

  it('combines search with company and kind filters, reports no matches, and resets everything', () => {
    const { container } = render(<ProjectIndex locale="en" rows={toIndexRows(docs, 'en')} />)
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'dashboards' } })
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'digikala' } })
    fireEvent.click(screen.getByRole('button', { name: /Growth/ }))
    expect(container.querySelectorAll('[data-project-slug]')).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 3 }).textContent).toBe('Digital Gold')
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'no such project' } })
    expect(container.querySelectorAll('[data-project-slug]')).toHaveLength(0)
    expect(screen.getByText(archiveCopy.en.noResults)).toBeTruthy()
    fireEvent.click(screen.getAllByRole('button', { name: archiveCopy.en.clear })[0])
    expect(container.querySelectorAll('[data-project-slug]')).toHaveLength(3)
    expect((screen.getByRole('searchbox') as HTMLInputElement).value).toBe('')
    expect((screen.getByRole('combobox') as HTMLSelectElement).value).toBe('')
  })

  it('switches view without changing the filtered set, links or editorial order', () => {
    const { container } = render(<ProjectIndex locale="en" rows={toIndexRows(docs, 'en')} />)
    fireEvent.click(screen.getByRole('button', { name: /Growth/ }))
    const before = [...container.querySelectorAll('[data-project-slug]')].map((el) =>
      el.getAttribute('data-project-slug'),
    )
    fireEvent.click(screen.getByRole('button', { name: archiveCopy.en.list }))
    expect(
      screen.getByRole('button', { name: archiveCopy.en.list }).getAttribute('aria-pressed'),
    ).toBe('true')
    expect(container.querySelector('ol')!.getAttribute('data-view')).toBe('list')
    expect(
      [...container.querySelectorAll('[data-project-slug]')].map((el) =>
        el.getAttribute('data-project-slug'),
      ),
    ).toEqual(before)
    expect(
      within(container.querySelector('ol')!)
        .getAllByRole('link')
        .map((el) => el.getAttribute('href')),
    ).toEqual(['/work/project-1', 'https://example.com'])
  })

  it('normalizes Persian keyboard variants and can search localized work by its stable slug', () => {
    const [row] = toIndexRows(
      [project(1, { title: 'دیجی‌کالا', slug: 'digital-gold', summary: 'طراحی کیف پول' })],
      'fa',
    )
    expect(matchesProject(row, 'ديجيكالا كيف', 'all', '')).toBe(true)
    expect(matchesProject(row, 'DIGITAL-GOLD', 'all', '')).toBe(true)
    expect(matchesProject(row, 'unrelated', 'all', '')).toBe(false)
  })

  it('has complete browser controls in every site locale', () => {
    for (const locale of LOCALES) {
      expect(Object.keys(archiveCopy[locale])).toEqual(Object.keys(archiveCopy.en))
      expect(Object.values(archiveCopy[locale]).every((value) => value.trim().length > 0)).toBe(
        true,
      )
    }
  })
})
