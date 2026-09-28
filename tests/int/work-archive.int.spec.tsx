import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vitest'

const { find, draftMode, url } = vi.hoisted(() => ({
  find: vi.fn(),
  draftMode: vi.fn(async () => ({ isEnabled: false })),
  // What the router's `useSearchParams` reports; tests move it to simulate navigations.
  url: { search: '' },
}))
vi.mock('payload', () => ({ getPayload: async () => ({ find }) }))
vi.mock('@payload-config', () => ({ default: {} }))
vi.mock('next/headers', () => ({ draftMode }))
vi.mock('next/navigation', async (importOriginal) => ({
  ...(await importOriginal<typeof import('next/navigation')>()),
  useSearchParams: () => new URLSearchParams(url.search),
}))

import { ProjectArchiveBlock } from '@/blocks/ProjectArchive/Component'
import { ProjectIndex } from '@/blocks/ProjectArchive/ProjectIndex'
import { ArchivePreview } from '@/blocks/ProjectArchive/ArchivePreview'
import { archiveCopy } from '@/blocks/ProjectArchive/copy'
import {
  archiveCover,
  companyKey,
  matchesProject,
  toIndexRows,
  workRowId,
} from '@/blocks/ProjectArchive/rows'
import {
  DEFAULT_WORK_VIEW,
  MAX_QUERY_LENGTH,
  parseWorkView,
  safeWorkReturn,
  serializeWorkView,
  WORK_RETURN_TTL,
  workReturnHref,
  workReturnTarget,
  type WorkReturn,
} from '@/blocks/ProjectArchive/workView'
import { WorkReturnLink } from '@/blocks/ProjectArchive/WorkReturnLink'
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
  url.search = ''
  window.history.replaceState(null, '', '/')
  window.sessionStorage.clear()
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

  it('shows the cover and its companion as two phones on the project tint', () => {
    const phone = (id: string): Media => ({ ...media(id), width: 390, height: 844 })
    const [row] = toIndexRows(
      [project(1, { slug: 'vin-app', cover: phone('lead'), coverCompanion: phone('second') })],
      'en',
    )
    const { container } = render(<ArchivePreview row={row} />)
    const art = container.querySelector<HTMLElement>('.project-art')!
    expect(art.getAttribute('data-layout')).toBe('phones')
    expect(art.style.getPropertyValue('--art-tint')).toBe('#467d79')
    const [lead, companion] = [...art.querySelectorAll('img')]
    expect(lead.getAttribute('src')).toContain('lead.png')
    expect(companion.getAttribute('src')).toContain('second.png')
    // A phone frame crops from the top instead of letterboxing.
    expect(lead.className).toContain('object-cover')
    expect(lead.className).not.toContain('object-contain')
  })

  it('leans a desktop cover behind a phone companion', () => {
    const [row] = toIndexRows(
      [project(1, { cover: media('desk'), coverCompanion: { ...media('phone'), width: 390, height: 844 } })],
      'en',
    )
    const { container } = render(<ArchivePreview row={row} />)
    expect(container.querySelector('.project-art')!.getAttribute('data-layout')).toBe('desktop-phone')
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

describe('shareable Work view (R09)', () => {
  const docs = [
    project(1, {
      title: 'Digital Gold',
      company: 'Digikala',
      kind: ['product', 'growth'],
      summary: 'Trading and dashboards.',
      caseStudyStatus: 'published',
    }),
    project(2, { title: 'Server research', company: 'Arvan Cloud', kind: ['research'] }),
    project(3, { title: 'Campaign', company: 'Digikala', kind: ['growth'] }),
  ]
  const rows = toIndexRows(docs, 'en')
  const slugs = (container: HTMLElement) =>
    [...container.querySelectorAll('[data-project-slug]')].map((el) =>
      el.getAttribute('data-project-slug'),
    )
  const pressed = () =>
    screen
      .getAllByRole('button', { pressed: true })
      .map((el) => el.getAttribute('aria-label') ?? el.textContent?.replace(/\d+$/, ''))

  it('round-trips a view through the URL and leaves defaults out', () => {
    const view = parseWorkView(
      new URLSearchParams('q=gold&kind=product&company=digikala&view=list'),
    )
    expect(view).toEqual({ q: 'gold', kind: 'product', company: 'digikala', view: 'list' })
    expect(serializeWorkView(view)).toBe('q=gold&kind=product&company=digikala&view=list')
    expect(serializeWorkView(DEFAULT_WORK_VIEW)).toBe('')
    expect(parseWorkView(null)).toEqual(DEFAULT_WORK_VIEW)
    // Campaign tags survive; a stale view parameter is replaced, not duplicated.
    expect(
      serializeWorkView({ ...DEFAULT_WORK_VIEW, kind: 'growth' }, 'utm_source=cv&kind=bad&view=list'),
    ).toBe('utm_source=cv&kind=growth')
  })

  it('reads unknown or mangled parameters as "all"', () => {
    const options = { kinds: ['product', 'growth'], companies: ['digikala'] }
    const read = (search: string) => parseWorkView(new URLSearchParams(search), options)
    expect(read('kind=ai&company=nobody&view=table')).toEqual(DEFAULT_WORK_VIEW)
    // A real kind with no filter button on this page, and a company key that isn't a key.
    expect(read('kind=research&company=../admin').kind).toBe('all')
    expect(read('company=Digi%20kala').company).toBe('')
    expect(read('kind=product&kind=growth').kind).toBe('product')
    expect(read(`q=${'x'.repeat(500)}`).q).toHaveLength(MAX_QUERY_LENGTH)
    expect(read('q=%20%20dash%0A%0Aboards%20').q).toBe('dash boards')
  })

  it('keeps Persian text intact through the URL and keys companies on the default-locale name', () => {
    const q = 'دیجی‌کالا کیف'
    const search = serializeWorkView({ ...DEFAULT_WORK_VIEW, q })
    expect(search).not.toMatch(/[^\x20-\x7e]/)
    expect(parseWorkView(new URLSearchParams(search)).q).toBe(q)

    expect(companyKey('Hadish Mall')).toBe('hadish-mall')
    expect(companyKey(' A1Paradise ')).toBe('a1paradise')
    expect(companyKey('دیجی‌کالا')).toBe('دیجیکالا')
    // The same project filters under the same key in every locale.
    const [fa] = toIndexRows(
      [project(1, { company: 'دیجی‌کالا' })],
      'fa',
      new Map([['p1', 'Digikala']]),
    )
    const [en] = toIndexRows([project(1, { company: 'Digikala' })], 'en')
    expect(fa.companyKey).toBe('digikala')
    expect(fa.companyKey).toBe(en.companyKey)
    expect(matchesProject(fa, '', 'all', 'digikala')).toBe(true)
    // No default-locale copy: the row's own company still gives a usable key.
    expect(toIndexRows([project(2, { company: 'مجتمع هدیش' })], 'fa', new Map())[0].companyKey).toBe(
      'مجتمع-هدیش',
    )
  })

  it('asks for default-locale company names only outside the default locale', async () => {
    find.mockResolvedValue({ docs: [project(1, { company: 'دیجی‌کالا' })] })
    await ProjectArchiveBlock({ blockType: 'projectArchive', locale: 'fa' })
    expect(find).toHaveBeenCalledWith(
      expect.objectContaining({ locale: 'en', fallbackLocale: false, select: { company: true } }),
    )
    find.mockClear()
    await ProjectArchiveBlock({ blockType: 'projectArchive', locale: 'en' })
    expect(find).toHaveBeenCalledTimes(1)
  })

  it('renders a pasted link already filtered on the server, with no unfiltered first paint', () => {
    url.search = 'q=dashboards&kind=growth&company=digikala&view=list'
    const html = renderToString(<ProjectIndex locale="en" rows={rows} />)
    expect(html.match(/data-project-slug=/g)).toHaveLength(1)
    expect(html).toContain('data-view="list"')
    expect(html).toContain('value="dashboards"')

    const { container } = render(<ProjectIndex locale="en" rows={rows} />)
    expect(slugs(container)).toEqual(['project-1'])
    expect((screen.getByRole('searchbox') as HTMLInputElement).value).toBe('dashboards')
    expect((screen.getByRole('combobox') as HTMLSelectElement).value).toBe('digikala')
    expect(pressed()).toEqual([archiveCopy.en.list, 'Growth'])
    // Index labels stay the archive positions.
    expect(container.querySelector('.archive-row-index')!.textContent).toBe('01')
  })

  it('keeps every record reachable under bad parameters, without a fixed count', () => {
    const seed = PROJECT_SEED.filter((row) => row.status === 'published').map((row, i) =>
      project(i, { ...row, cover: null }),
    )
    url.search = 'kind=nonsense&company=nobody&view=table&q='
    const { container } = render(<ProjectIndex locale="en" rows={toIndexRows(seed, 'en')} />)
    expect(slugs(container)).toEqual(seed.map((doc) => doc.slug))
    expect(container.querySelector('ol')!.getAttribute('data-view')).toBe('grid')
    expect(
      screen.getByText(
        archiveCopy.en.results
          .replace('{shown}', String(seed.length))
          .replace('{total}', String(seed.length)),
      ),
    ).toBeTruthy()
  })

  it('pushes discrete choices, replaces while typing, and never scrolls or reloads', async () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    render(<ProjectIndex locale="en" rows={rows} />)
    const start = window.history.length
    fireEvent.click(screen.getByRole('button', { name: /Growth/ }))
    expect(window.location.search).toBe('?kind=growth')
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'digikala' } })
    fireEvent.click(screen.getByRole('button', { name: archiveCopy.en.list }))
    expect(window.location.search).toBe('?kind=growth&company=digikala&view=list')
    expect(window.history.length).toBe(start + 3)

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'دیجی' } })
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'دیجی‌کالا' } })
    await waitFor(() =>
      expect(new URLSearchParams(window.location.search).get('q')).toBe('دیجی‌کالا'),
    )
    expect(window.history.length).toBe(start + 3)
    expect(scrollTo).not.toHaveBeenCalled()
    scrollTo.mockRestore()
  })

  it('follows Back and Forward between views of the page', async () => {
    const { container } = render(<ProjectIndex locale="en" rows={rows} />)
    fireEvent.click(screen.getByRole('button', { name: /Growth/ }))
    fireEvent.click(screen.getByRole('button', { name: /Research/ }))
    expect(slugs(container)).toEqual(['project-2'])

    act(() => window.history.back())
    await waitFor(() => expect(slugs(container)).toEqual(['project-1', 'project-3']))
    expect(pressed()).toEqual([archiveCopy.en.grid, 'Growth'])
    act(() => window.history.forward())
    await waitFor(() => expect(slugs(container)).toEqual(['project-2']))
  })

  it('re-reads the URL after a same-page navigation but ignores late echoes of its own writes', async () => {
    const { container, rerender } = render(<ProjectIndex locale="en" rows={rows} />)
    const search = screen.getByRole('searchbox') as HTMLInputElement
    fireEvent.change(search, { target: { value: 'ser' } })
    fireEvent.change(search, { target: { value: 'server' } })
    // The router reports an older value this page wrote: typing must not jump back.
    url.search = 'q=ser'
    rerender(<ProjectIndex locale="en" rows={rows} />)
    expect(search.value).toBe('server')
    url.search = 'q=server'
    rerender(<ProjectIndex locale="en" rows={rows} />)
    expect(search.value).toBe('server')
    // A link elsewhere on the page (the header's Work item) opens the plain archive.
    url.search = ''
    rerender(<ProjectIndex locale="en" rows={rows} />)
    expect(search.value).toBe('')
    expect(slugs(container)).toHaveLength(rows.length)
    // …and a pending typed URL never lands afterwards.
    await new Promise((resolve) => setTimeout(resolve, 400))
    expect(window.location.search).toBe('')
  })

  it('reports zero matches, clears back to everything and hands focus to the search field', () => {
    url.search = 'q=%D9%87%DB%8C%DA%86'
    const { container } = render(<ProjectIndex locale="fa" rows={toIndexRows(docs, 'fa')} />)
    expect(slugs(container)).toHaveLength(0)
    expect(screen.getByText(archiveCopy.fa.noResults)).toBeTruthy()
    const [clear] = screen.getAllByRole('button', { name: archiveCopy.fa.clear })
    clear.focus()
    fireEvent.click(clear)
    expect(slugs(container)).toHaveLength(docs.length)
    expect(document.activeElement).toBe(screen.getByRole('searchbox'))
    expect(window.location.search).toBe('')
  })

  it('keeps focus on the control that changed the view', () => {
    render(<ProjectIndex locale="fa" rows={toIndexRows(docs, 'fa')} />)
    const growth = screen.getByRole('button', { name: /رشد/ })
    growth.focus()
    fireEvent.click(growth)
    expect(screen.getByRole('button', { name: /رشد/ })).toBe(growth)
    expect(document.activeElement).toBe(growth)
    const list = screen.getByRole('button', { name: archiveCopy.fa.list })
    list.focus()
    fireEvent.click(list)
    expect(document.activeElement).toBe(list)
    // Rows stay in the tab order.
    for (const link of within(document.querySelector('ol')!).queryAllByRole('link'))
      expect(link.getAttribute('tabindex')).toBeNull()
  })

  it('filters a Persian page by the shared company key', () => {
    url.search = 'company=digikala&q=%D9%83%D9%85%D9%BE%D9%8A%D9%86'
    const faRows = toIndexRows(
      [
        project(1, { title: 'طلای دیجیتال', company: 'دیجی‌کالا' }),
        project(2, { title: 'کمپین', company: 'دیجی‌کالا' }),
        project(3, { title: 'کمپین ابر', company: 'ابر آروان' }),
      ],
      'fa',
      new Map([
        ['p1', 'Digikala'],
        ['p2', 'Digikala'],
        ['p3', 'Arvan Cloud'],
      ]),
    )
    const { container } = render(<ProjectIndex locale="fa" rows={faRows} />)
    // Arabic-keyboard «كمپين» finds the Persian «کمپین», only within Digikala.
    expect(slugs(container)).toEqual(['project-2'])
    const select = screen.getByRole('combobox') as HTMLSelectElement
    expect(select.value).toBe('digikala')
    expect(select.selectedOptions[0].textContent).toBe('دیجی‌کالا (۲)')
  })

  it('pins the view and row to the history entry before a study opens', () => {
    url.search = 'kind=growth'
    window.history.replaceState(null, '', '/fa/work?kind=growth&utm_source=cv')
    render(<ProjectIndex locale="en" rows={rows} />)
    const link = screen.getByRole('link', { name: /Digital Gold/ })
    // Stop the navigation itself; the archive's own click handling still runs first.
    link.addEventListener('click', (event) => event.preventDefault())
    fireEvent.click(link)
    expect(window.history.state.workReturn).toEqual({ slug: 'project-1', top: 0 })
    expect(window.location.pathname + window.location.search).toBe(
      '/fa/work?kind=growth&utm_source=cv',
    )
    const record = JSON.parse(window.sessionStorage.getItem('work-return')!)
    expect(record).toMatchObject({ path: '/fa/work?kind=growth', slug: 'project-1' })
  })

  it('accepts only same-site Work paths as a way back', () => {
    expect(safeWorkReturn('/work?kind=growth&company=digikala', 'fa')).toBe(
      '/fa/work?kind=growth&company=digikala',
    )
    expect(safeWorkReturn('/fa/work?q=%D8%AF&view=list', 'en')).toBe('/work?q=%D8%AF&view=list')
    expect(safeWorkReturn('/work?kind=growth&next=https://evil.example', 'en')).toBe(
      '/work?kind=growth',
    )
    for (const hostile of [
      'https://evil.example/work',
      '//evil.example/work',
      '/\\evil.example/work',
      '/\t/evil.example/work',
      'javascript:alert(1)',
      ' /work',
      '/work/rp1-arena',
      '/workshop',
      '/about?next=/work',
      42,
      null,
    ])
      expect(safeWorkReturn(hostile, 'en')).toBeNull()
  })

  it('offers the remembered view only from the study it was opened for, and not forever', () => {
    const record: WorkReturn = { path: '/work?kind=growth', slug: 'rp1-arena', at: 1000 }
    expect(workReturnHref(record, 'rp1-arena', 'fa', 2000)).toBe(
      `/fa/work?kind=growth#${workRowId('rp1-arena')}`,
    )
    expect(workReturnHref(record, 'vin-app', 'fa', 2000)).toBeNull()
    expect(workReturnHref(record, 'rp1-arena', 'fa', 1000 + WORK_RETURN_TTL + 1)).toBeNull()
    expect(workReturnHref({ ...record, path: '//evil.example/work' }, 'rp1-arena', 'en', 2000)).toBeNull()
    expect(workReturnHref(null, 'rp1-arena', 'en')).toBeNull()

    const view = (slug: string) =>
      render(
        <WorkReturnLink locale="en" slug={slug}>
          All work
        </WorkReturnLink>,
      ).container.querySelector('a')!
    expect(view('rp1-arena').getAttribute('href')).toBe('/work')
    cleanup()
    window.sessionStorage.setItem('work-return', JSON.stringify({ ...record, at: Date.now() }))
    expect(view('rp1-arena').getAttribute('href')).toBe('/work?kind=growth#work-rp1-arena')
    cleanup()
    expect(view('vin-app').getAttribute('href')).toBe('/work')
  })

  it('finds the row to land on from Back state or a row hash, never from a stray fragment', () => {
    const back = { workReturn: { slug: 'vin-app', top: 90 } }
    // Back restores the row's old place in the viewport.
    expect(workReturnTarget(back, '')).toEqual({ slug: 'vin-app', top: 90 })
    // A row link wins and sets the row just under the header.
    expect(workReturnTarget(back, '#work-rp1-arena')).toEqual({ slug: 'rp1-arena', top: null })
    expect(workReturnTarget(null, '#work-rp1-arena')).toEqual({ slug: 'rp1-arena', top: null })
    for (const hash of ['#work-', '#work-%3Cimg%3E', '#work-%E0%A4%A'])
      expect(workReturnTarget(back, hash)).toBeNull()
    for (const state of [null, { workReturn: { slug: '<img>' } }, { workReturn: { slug: 'x', top: 'y' } }])
      expect(workReturnTarget(state, '#top')).toBeNull()
  })

  it('lands hash-targeted rows below the sticky header', () => {
    const css = readFileSync(
      path.join(process.cwd(), 'src/blocks/ProjectArchive/archive.css'),
      'utf8',
    )
    const rule = css.match(/\.archive-projects > li \{([^}]*)\}/)![1]
    expect(rule).toMatch(/scroll-margin-block-start:\s*[\d.]+rem/)
  })
})
