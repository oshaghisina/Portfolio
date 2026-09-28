/**
 * Site search (R08). Pure parts first — URL building, matching, the publication gates and the
 * links each result may carry — then the `/search` field and ledger in jsdom, then a read-only
 * pass over the real catalogue (Mongo from `.env`): every result in every locale must be a page
 * that exists. Nothing here writes to the database.
 */
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

const router = vi.hoisted(() => ({ push: vi.fn(), replace: vi.fn() }))

vi.mock('next/navigation', async (importOriginal) => ({
  ...(await importOriginal<typeof import('next/navigation')>()),
  useRouter: () => router,
}))

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { isLogicalPathReady } from '@/i18n/contentReady'
import { hasPublicCaseStudy, projectPath } from '@/i18n/routes'
import { Search } from '@/search/Component'
import {
  matchScore,
  postCandidate,
  projectCandidate,
  rankResults,
  type SearchPost,
  type SearchProject,
  type SearchResult,
} from '@/search/results'
import { SearchResults } from '@/search/SearchResults'
import { searchSite } from '@/search/searchSite'
import { cleanSearchQuery, MAX_SEARCH_LENGTH, readSearchQuery, searchHref } from '@/search/url'
import { LOCALES } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'

const project = (overrides: Partial<SearchProject> = {}): SearchProject => ({
  id: 'p1',
  title: 'VIN — Making Connections the Product',
  slug: 'vin-app',
  summary: 'A networking app built around real meetups.',
  company: 'Independent',
  role: 'Product designer',
  kind: ['product'],
  caseStudyStatus: 'published',
  _status: 'published',
  ...overrides,
})

const post = (overrides: Partial<SearchPost> = {}): SearchPost => ({
  id: 'n1',
  title: 'Design notes',
  slug: 'design-notes',
  meta: { title: 'Design notes', description: 'Saving time on handoff.' },
  _status: 'published',
  ...overrides,
})

afterEach(() => {
  cleanup()
  vi.useRealTimers()
  router.push.mockReset()
  router.replace.mockReset()
})

describe('search URLs', () => {
  it('encodes the query with URLSearchParams and keeps the locale prefix', () => {
    expect(searchHref('en', 'vin')).toBe('/search?q=vin')
    expect(searchHref('en', '  ')).toBe('/search')
    expect(searchHref('fa', '')).toBe('/fa/search')
    expect(searchHref('en', 'R&D #1?')).toBe('/search?q=R%26D+%231%3F')

    const persian = searchHref('fa', '  مریخ   بافت ')
    expect(persian.startsWith('/fa/search?q=')).toBe(true)
    expect(persian).not.toMatch(/[\s؀-ۿ]/)
    expect(new URL(persian, 'https://x.test').searchParams.get('q')).toBe('مریخ بافت')
  })

  it('reads ?q= the way Next hands it over: missing, repeated, spaced or too long', () => {
    expect(readSearchQuery(undefined)).toBe('')
    expect(readSearchQuery(['vin', 'rp1'])).toBe('vin')
    expect(readSearchQuery(' digi \n kala ')).toBe('digi kala')
    expect(readSearchQuery('x'.repeat(500))).toHaveLength(MAX_SEARCH_LENGTH)
    expect(cleanSearchQuery(`${'a'.repeat(MAX_SEARCH_LENGTH - 1)} b`)).toBe(
      'a'.repeat(MAX_SEARCH_LENGTH - 1),
    )
  })
})

describe('matching', () => {
  it('needs every term, and ranks a word-start title hit above a hit inside a word', () => {
    const fields = (title: string, summary: string) => [
      { text: title, weight: 4 },
      { text: summary, weight: 1 },
    ]
    expect(matchScore('vin', fields('VIN app', ''))).toBeGreaterThan(
      matchScore('vin', fields('Wallet', 'Saving money')),
    )
    expect(matchScore('vin', fields('Wallet', 'Saving money'))).toBeGreaterThan(0)
    expect(matchScore('vin gold', fields('VIN app', 'meetups'))).toBe(0)
    expect(matchScore('   ', fields('VIN app', ''))).toBe(0)
  })

  it('treats Persian and Arabic letter variants, ZWNJ and spacing as the archive does', () => {
    const fields = [
      { text: 'دیجی‌کالا', weight: 3 },
      { text: 'مریخ بافت — ردیابی هر طاقه پارچه', weight: 4 },
      { text: 'کمپین‌های جذب بازدیدکننده', weight: 1 },
    ]
    expect(matchScore('ديجيكالا', fields)).toBeGreaterThan(0)
    expect(matchScore('دیجی کالا', fields)).toBeGreaterThan(0)
    expect(matchScore('مريخ', fields)).toBeGreaterThan(0)
    expect(matchScore('كمپين', fields)).toBeGreaterThan(0)
  })

  it('searches title, organisation, summary and the localized kind labels', () => {
    const vin = projectCandidate(project(), 'fa', true)!
    expect(matchScore('Independent', vin.fields)).toBeGreaterThan(0)
    expect(matchScore('meetups', vin.fields)).toBeGreaterThan(0)
    // `product` is «محصول» in Persian — the label the visitor sees, not the stored value.
    expect(matchScore('محصول', vin.fields)).toBeGreaterThan(0)
    expect(matchScore('VIN', vin.fields)).toBeGreaterThan(0)
  })
})

describe('publication gates and links', () => {
  it('links a public case study to its page in the current locale', () => {
    expect(projectCandidate(project(), 'fa', true)?.result).toMatchObject({
      type: 'caseStudy',
      href: '/fa/work/vin-app',
      context: 'Independent',
    })
    expect(projectCandidate(project(), 'en', true)?.result.href).toBe('/work/vin-app')
  })

  it('links an archive-only project to its Work row, never to a detail page', () => {
    for (const caseStudyStatus of ['none', 'draft'] as const) {
      const result = projectCandidate(
        project({ caseStudyStatus, slug: 'fibona-website' }),
        'fa',
        true,
      )?.result
      expect(result).toMatchObject({ type: 'project', href: '/fa/work#work-fibona-website' })
    }
    expect(projectCandidate(project({ caseStudyStatus: 'none' }), 'en', true)?.result.href).toBe(
      '/work#work-vin-app',
    )
    // No Work page in this locale: an archive entry has nowhere to lead, a case study still does.
    expect(projectCandidate(project({ caseStudyStatus: 'none' }), 'ja', false)).toBeNull()
    expect(projectCandidate(project(), 'ja', false)?.result.href).toBe('/ja/work/vin-app')
  })

  it('drops drafts and missing translations', () => {
    expect(projectCandidate(project({ _status: 'draft' }), 'en', true)).toBeNull()
    expect(projectCandidate(project({ _status: undefined }), 'de', true)).toBeNull()
    expect(projectCandidate(project({ title: '' }), 'de', true)).toBeNull()
    expect(postCandidate(post({ _status: 'draft' }), 'en')).toBeNull()
    expect(postCandidate(post({ title: '  ' }), 'fr')).toBeNull()
    expect(postCandidate(post(), 'fr')?.result).toMatchObject({
      type: 'post',
      href: '/fr/lab/design-notes',
    })
  })

  it('ranks the best match first and keeps archive order on ties', () => {
    const results = rankResults('vin', [
      projectCandidate(
        project({ id: 'a', title: 'Wallet', slug: 'wallet', summary: 'Saving' }),
        'en',
        true,
      ),
      null,
      projectCandidate(project({ id: 'b' }), 'en', true),
      postCandidate(post(), 'en'),
    ])
    expect(results.map((result) => result.id)).toEqual(['projects:b', 'projects:a', 'posts:n1'])
    expect(rankResults('nothing like this', [projectCandidate(project(), 'en', true)])).toEqual([])
  })
})

describe('the /search field', () => {
  it('starts from ?q= and does not navigate on its first render', () => {
    vi.useFakeTimers()
    render(<Search locale="fa" query="مریخ بافت" />)
    expect((screen.getByRole('searchbox') as HTMLInputElement).value).toBe('مریخ بافت')
    act(() => vi.advanceTimersByTime(2000))
    expect(router.replace).not.toHaveBeenCalled()
    expect(router.push).not.toHaveBeenCalled()
  })

  it('replaces the URL once typing pauses, encoded, and never pushes history', () => {
    vi.useFakeTimers()
    render(<Search locale="fa" query="" />)
    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'مر' } })
    fireEvent.change(input, { target: { value: 'مریخ بافت' } })
    act(() => vi.advanceTimersByTime(400))
    expect(router.replace).toHaveBeenCalledTimes(1)
    expect(router.replace).toHaveBeenCalledWith(searchHref('fa', 'مریخ بافت'), { scroll: false })
    // A trailing space is the same query: no second navigation.
    fireEvent.change(input, { target: { value: 'مریخ بافت ' } })
    act(() => vi.advanceTimersByTime(400))
    expect(router.replace).toHaveBeenCalledTimes(1)
    expect(router.push).not.toHaveBeenCalled()
  })

  it('follows a URL change from Back or the header link, but not its own late echo', () => {
    vi.useFakeTimers()
    const { rerender } = render(<Search locale="en" query="vin" />)
    const input = () => screen.getByRole('searchbox') as HTMLInputElement

    rerender(<Search locale="en" query="" />)
    expect(input().value).toBe('')

    fireEvent.change(input(), { target: { value: 'digi' } })
    act(() => vi.advanceTimersByTime(400))
    fireEvent.change(input(), { target: { value: 'digi kala' } })
    // The page for `digi` arrives while the visitor has already typed more.
    rerender(<Search locale="en" query="digi" />)
    expect(input().value).toBe('digi kala')
  })

  it('submits without JavaScript as a GET to the localized search page', () => {
    render(<Search locale="de" query="" />)
    const form = screen.getByRole('search') as HTMLFormElement
    expect(form.getAttribute('action')).toBe('/de/search')
    expect(form.getAttribute('method')).toBe('get')
    expect(screen.getByRole('searchbox').getAttribute('name')).toBe('q')
  })
})

describe('the /search ledger', () => {
  const results: SearchResult[] = [
    projectCandidate(project(), 'en', true)!.result,
    projectCandidate(
      project({
        id: 'p2',
        caseStudyStatus: 'none',
        slug: 'fibona-website',
        title: 'Fibona website',
        company: 'Fibona',
      }),
      'en',
      true,
    )!.result,
    postCandidate(post(), 'en')!.result,
  ]

  it('shows the content type on every result and announces the count', () => {
    render(<SearchResults locale="en" query="vin" results={results} />)
    expect(screen.getByRole('status').textContent).toBe('3 results')
    expect(screen.getByRole('status').getAttribute('aria-live')).toBe('polite')
    const items = within(screen.getByRole('list')).getAllByRole('listitem')
    expect(items.map((item) => item.getAttribute('data-search-type'))).toEqual([
      'caseStudy',
      'project',
      'post',
    ])
    expect(items[0].textContent).toContain(uiCopy.en.workCaseStudy)
    expect(items[1].textContent).toContain(uiCopy.en.searchTypeProject)
    expect(items[2].textContent).toContain(uiCopy.en.searchTypePost)
    expect(
      within(screen.getByRole('list'))
        .getAllByRole('link')
        .map((a) => a.getAttribute('href')),
    ).toEqual(['/work/vin-app', '/work#work-fibona-website', '/lab/design-notes'])
  })

  it.each(LOCALES)('has prompt, no-results and error lines in %s', (locale) => {
    const copy = uiCopy[locale]
    for (const text of [
      copy.searchPrompt,
      copy.searchNoResults,
      copy.searchError,
      copy.searchTypeProject,
      copy.searchTypePost,
    ]) {
      expect(text.trim()).not.toBe('')
    }
    expect(copy.searchResults.other).toContain('{n}')
    if (locale === 'fa') {
      expect(Object.values(copy).join(' ')).not.toContain('هٔ')
    }

    const { unmount } = render(<SearchResults locale={locale} query="" results={[]} />)
    expect(screen.getByRole('status').textContent).toBe(copy.searchPrompt)
    unmount()
    render(<SearchResults locale={locale} query="zzzz" results={[]} />)
    expect(screen.getByRole('status').textContent).toBe(copy.searchNoResults)
    expect(screen.queryByRole('list')).toBeNull()
    cleanup()
    render(<SearchResults failed locale={locale} query="vin" results={results} />)
    expect(screen.getByRole('status').textContent).toBe(copy.searchError)
    expect(screen.queryByRole('list')).toBeNull()
  })
})

describe('the real catalogue (read-only)', () => {
  const queries = ['a', 'e', 'ی', 'ا', 'ン', '-']

  it('returns only pages that exist, in every locale', async () => {
    const payload = await getPayload({ config: configPromise })
    for (const locale of LOCALES) {
      const seen = new Map<string, SearchResult>()
      for (const query of queries) {
        for (const result of await searchSite({ locale, query })) seen.set(result.id, result)
      }
      const publicProjects = await payload.find({
        collection: 'projects',
        depth: 0,
        draft: false,
        fallbackLocale: false,
        limit: 0,
        locale,
        overrideAccess: false,
        pagination: false,
        select: { slug: true, caseStudyStatus: true },
      })
      const bySlug = new Map(publicProjects.docs.map((doc) => [doc.slug, doc]))
      const workPath = locale === 'en' ? '/work' : `/${locale}/work`
      // `-` hits every hyphenated slug, so a locale with public projects can't pass empty.
      if (publicProjects.docs.some((doc) => doc.slug.includes('-'))) {
        expect(seen.size).toBeGreaterThan(0)
      }

      for (const result of seen.values()) {
        if (result.type === 'caseStudy') {
          const slug = result.href.slice(`${workPath}/`.length)
          expect(result.href).toBe(`${workPath}/${slug}`)
          expect(await isLogicalPathReady(projectPath({ slug }), locale)).toBe(true)
        } else if (result.type === 'project') {
          const slug = result.href.slice(`${workPath}#work-`.length)
          expect(result.href).toBe(`${workPath}#work-${slug}`)
          expect(bySlug.has(slug)).toBe(true)
          expect(hasPublicCaseStudy(bySlug.get(slug))).toBe(false)
        } else {
          const slug = result.href.split('/').pop()!
          expect(await isLogicalPathReady(`/lab/${slug}`, locale)).toBe(true)
        }
      }
    }
  }, 180_000)

  it('finds VIN, an organisation and a Persian spelling variant where those projects are public', async (ctx) => {
    const [en, fa] = await Promise.all([
      searchSite({ locale: 'en', query: 'VIN' }),
      searchSite({ locale: 'fa', query: 'VIN' }),
    ])
    if (!en.some((result) => result.href === '/work/vin-app')) ctx.skip()
    expect(en[0]?.href).toBe('/work/vin-app')
    expect(fa[0]?.href).toBe('/fa/work/vin-app')

    // The organisation's own projects come before any project that merely mentions it.
    const contexts = (await searchSite({ locale: 'en', query: 'carsparency' })).map(
      (result) => result.context,
    )
    expect(contexts[0]).toBe('Carsparency')
    const firstOther = contexts.findIndex((context) => context !== 'Carsparency')
    if (firstOther >= 0) expect(contexts.slice(firstOther)).not.toContain('Carsparency')

    // «مریخ» typed with an Arabic yeh.
    const merikh = await searchSite({ locale: 'fa', query: 'مريخ' })
    expect(merikh[0]?.href).toBe('/fa/work/merikh-baft')
  }, 120_000)
})
