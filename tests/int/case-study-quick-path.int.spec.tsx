/**
 * R06 (jsdom): the quick path and the phone contents. The snapshot opens the reading path ahead
 * of the hero's gallery, once; below `xl` a sticky contents row lists the same chapters with the
 * same anchors as the margin rail, opens and closes like a disclosure, and hands focus to the
 * chapter it jumps to. The evidence around it is untouched: every screen, every download.
 */
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import React from 'react'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'

import { buildChapters } from '@/blocks/CaseStudy/chapters'
import { ContentsMenu } from '@/components/CaseStudy/ContentsMenu'
import { caseStudyCopy } from '@/components/CaseStudy/copy'
import { CaseStudyReadingPath } from '@/components/CaseStudy/ReadingPath'
import { SectionIndex } from '@/components/CaseStudy/SectionIndex'
import type { Media, Project } from '@/payload-types'

afterEach(cleanup)

// The Lexical renderer pulls the admin UI's Code block (and its SCSS) into the bundle; the prose
// is Payload's converter, not this layout's contract.
vi.mock('@/components/RichText', () => ({
  default: () => <div data-testid="richtext" />,
}))

beforeAll(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe() {}
      disconnect() {}
      unobserve() {}
    },
  )
})

const en = caseStudyCopy.en
const fa = caseStudyCopy.fa

const media = (id: string, overrides: Partial<Media> = {}): Media => ({
  id,
  alt: id,
  url: `/media/${id}.webp`,
  width: 780,
  height: 1688,
  updatedAt: '2026-09-27T00:00:00.000Z',
  createdAt: '2026-09-27T00:00:00.000Z',
  ...overrides,
})

const workbook = media('workbook', {
  url: '/media/vin-app--problem-inventory.xlsx',
  filename: 'vin-app--problem-inventory.xlsx',
  mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  filesize: 39_339,
  width: null,
  height: null,
})

/** An app's screens in two flows: 14 + 3, one sheet of twelve plus a second in the first flow. */
const screens = [
  ...Array.from({ length: 14 }, (_, i) => ({
    id: `a${i}`,
    media: media(`a${i}`),
    caption: `Onboarding ${i + 1}`,
    group: 'Onboarding',
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    id: `b${i}`,
    media: media(`b${i}`),
    caption: `Venue ${i + 1}`,
    group: 'Venue',
  })),
]

const sections: NonNullable<Project['sections']> = [
  { id: 'n1', blockType: 'csNarrative', label: 'context', heading: 'Connections, not events.' },
  { id: 'n2', blockType: 'csNarrative', label: 'problem', heading: 'Not another event app.' },
  { id: 'o1', blockType: 'csOwnership', own: ['The brief'], coOwn: [], collaborate: [] },
  {
    id: 'n3',
    blockType: 'csNarrative',
    label: 'custom',
    customLabel: 'Roadmap',
    heading: 'Fifty-seven problems.',
  },
  {
    id: 'd1',
    blockType: 'csDownloads',
    items: [
      { id: 'w1', file: workbook, title: 'Problem inventory' },
      { id: 'w2', file: { ...workbook, id: 'kpi' }, title: 'KPI starter pack' },
    ],
  },
  {
    id: 'n4',
    blockType: 'csNarrative',
    label: 'custom',
    customLabel: 'Screens',
    heading: 'Every screen.',
  },
  {
    id: 'f1',
    blockType: 'csFigure',
    layout: 'pages',
    treatment: 'screen',
    items: screens,
  },
  { id: 'l1', blockType: 'csLessons', items: [{ id: 'x', title: 'Audit the promises' }] },
]

const project: Pick<Project, 'hero' | 'sections' | 'snapshot'> = {
  hero: {
    items: [
      { id: 'h1', media: media('hero-1') },
      { id: 'h2', media: media('hero-2') },
      { id: 'h3', media: media('hero-3') },
    ],
    caption: 'Three of the screens.',
  },
  snapshot: {
    problem: 'Event apps sell tickets.',
    role: 'Product design and strategy lead.',
    result: 'A documented system, audited against itself.',
  },
  sections,
}

const follows = (a: Node, b: Node) =>
  Boolean(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING)

describe('CaseStudyReadingPath (R06 quick path)', () => {
  const renderPath = (copy = en, locale: 'en' | 'fa' = 'en') =>
    render(
      <article>
        <CaseStudyReadingPath
          chapters={buildChapters(sections, copy)}
          copy={copy}
          locale={locale}
          project={project}
        />
      </article>,
    )

  it('opens with the one snapshot, ahead of the contents, the hero and the chapters', () => {
    const { container } = renderPath()
    const snapshots = [...container.querySelectorAll('dl')].filter(
      (dl) => dl.querySelector('dt')?.textContent === en.snapshot.problem,
    )
    expect(snapshots).toHaveLength(1)
    const snapshot = snapshots[0]!
    expect(within(snapshot).getByText('Product design and strategy lead.')).toBeTruthy()
    expect(within(snapshot).getByText('A documented system, audited against itself.')).toBeTruthy()

    // jsdom lays every chapter out at the top, so the row already names the last one.
    const contents = screen.getByRole('button', { name: new RegExp(`^${en.contents}`) })
    const hero = container.querySelector('figure')!
    const firstChapter = container.querySelector('section#s01-context')!
    expect(follows(snapshot, contents)).toBe(true)
    expect(follows(contents, hero)).toBe(true)
    expect(follows(hero, firstChapter)).toBe(true)
  })

  it('keeps every screen, every download and the chapter anchors', () => {
    const { container } = renderPath()
    const counts = screen
      .getAllByRole('tab')
      .map((tab) => Number(tab.querySelector('.index-code')?.textContent))
    expect(counts).toEqual([14, 3])
    expect(counts.reduce((a, b) => a + b, 0)).toBe(screens.length)
    expect(container.querySelectorAll('a[download]')).toHaveLength(2)
    expect([...container.querySelectorAll('section[aria-labelledby]')].map((s) => s.id)).toEqual(
      buildChapters(sections, en).map((c) => c.id),
    )
  })

  it('gives the rail and the phone contents the same anchors, in every locale', () => {
    const { container } = renderPath(fa, 'fa')
    const navs = [...container.querySelectorAll('nav')].filter((nav) =>
      nav.querySelector('a[href^="#s0"]'),
    )
    expect(navs).toHaveLength(2)
    const hrefs = navs.map((nav) =>
      [...nav.querySelectorAll('a')].map((a) => a.getAttribute('href')),
    )
    expect(hrefs[0]).toEqual(hrefs[1])
    expect(hrefs[0]).toEqual(buildChapters(sections, en).map((c) => `#${c.id}`))
    expect(navs.every((nav) => nav.getAttribute('aria-label') === fa.contents)).toBe(true)
  })
})

describe('ContentsMenu (phone contents)', () => {
  const chapters = buildChapters(sections, en)

  it('stays out of a short study, like the rail', () => {
    const { container } = render(<ContentsMenu chapters={chapters.slice(0, 3)} label="Contents" />)
    expect(container.innerHTML).toBe('')
    const { container: rail } = render(
      <SectionIndex chapters={chapters.slice(0, 3)} label="Contents" />,
    )
    expect(rail.innerHTML).toBe('')
  })

  it('is a sticky row below xl whose list scrolls on its own', () => {
    const { container } = render(<ContentsMenu chapters={chapters} label="Contents" />)
    const root = container.firstElementChild as HTMLElement
    const classes = root.className.split(' ')
    expect(classes).toContain('sticky')
    expect(classes).toContain('xl:hidden')
    expect(root.hasAttribute('data-reveal-skip')).toBe(true)
    const button = screen.getByRole('button', { name: 'Contents' })
    const list = document.getElementById(button.getAttribute('aria-controls')!)!
    expect(list.tagName).toBe('NAV')
    expect(list.hasAttribute('data-lenis-prevent')).toBe(true)
    expect(list.className).toContain('overflow-y-auto')
  })

  it('opens and closes as a disclosure: click, Escape with focus back, tap outside', () => {
    render(<ContentsMenu chapters={chapters} label="Contents" />)
    const button = screen.getByRole('button', { name: 'Contents' })
    const list = document.getElementById(button.getAttribute('aria-controls')!)!
    expect(button.getAttribute('aria-expanded')).toBe('false')
    expect(list.hidden).toBe(true)

    fireEvent.click(button)
    expect(button.getAttribute('aria-expanded')).toBe('true')
    expect(list.hidden).toBe(false)
    expect(
      within(list)
        .getAllByRole('link')
        .map((a) => a.getAttribute('href')),
    ).toEqual(chapters.map((c) => `#${c.id}`))

    const link = within(list).getAllByRole('link')[2]!
    link.focus()
    fireEvent.keyDown(link, { key: 'Escape' })
    expect(button.getAttribute('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(button)

    fireEvent.click(button)
    expect(button.getAttribute('aria-expanded')).toBe('true')
    fireEvent.pointerDown(document.body)
    expect(button.getAttribute('aria-expanded')).toBe('false')
  })

  it('closes when focus leaves it, and stays open while focus moves inside', () => {
    const { container } = render(
      <>
        <ContentsMenu chapters={chapters} label="Contents" />
        <button type="button">After</button>
      </>,
    )
    const root = container.firstElementChild as HTMLElement
    const button = screen.getByRole('button', { name: 'Contents' })
    fireEvent.click(button)
    const first = within(root).getAllByRole('link')[0]!
    fireEvent.blur(button, { relatedTarget: first })
    expect(button.getAttribute('aria-expanded')).toBe('true')
    fireEvent.blur(first, { relatedTarget: screen.getByRole('button', { name: 'After' }) })
    expect(button.getAttribute('aria-expanded')).toBe('false')
  })

  it('names the chapter being read and marks it in the list', async () => {
    const observed: Element[] = []
    let callback: () => void = () => {}
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: () => void) {
          callback = cb
        }
        observe(el: Element) {
          observed.push(el)
        }
        disconnect() {}
        unobserve() {}
      },
    )
    // Chapter tops relative to the viewport: the third has passed the reading line.
    const tops = [-900, -400, 100, 700, 1400, 2200]
    const { container } = render(
      <>
        <ContentsMenu chapters={chapters} label="Contents" />
        {chapters.map((chapter, i) => (
          <section
            id={chapter.id}
            key={chapter.id}
            ref={(el) => {
              if (el) el.getBoundingClientRect = () => ({ top: tops[i]! }) as DOMRect
            }}
          />
        ))}
      </>,
    )
    expect(observed).toHaveLength(chapters.length)
    await React.act(async () => callback())
    const button = screen.getByRole('button', { name: /Contents/ })
    expect(button.textContent).toContain('03')
    expect(button.textContent).toContain(chapters[2]!.label)
    fireEvent.click(button)
    const current = container.querySelector('a[aria-current="location"]')!
    expect(current.getAttribute('href')).toBe(`#${chapters[2]!.id}`)
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe() {}
        disconnect() {}
        unobserve() {}
      },
    )
  })

  it('closes on a chapter and hands the chapter focus; a modified click is left alone', () => {
    render(
      <>
        <ContentsMenu chapters={chapters} label="Contents" />
        {chapters.map((chapter) => (
          <section id={chapter.id} key={chapter.id} />
        ))}
      </>,
    )
    const button = screen.getByRole('button', { name: /^Contents/ })
    fireEvent.click(button)
    const target = chapters[3]!
    fireEvent.click(screen.getByRole('link', { name: new RegExp(target.label) }))
    expect(button.getAttribute('aria-expanded')).toBe('false')
    const section = document.getElementById(target.id)!
    expect(document.activeElement).toBe(section)
    expect(section.getAttribute('tabindex')).toBe('-1')
    fireEvent.blur(section)
    expect(section.hasAttribute('tabindex')).toBe(false)

    fireEvent.click(button)
    const other = chapters[1]!
    fireEvent.click(screen.getByRole('link', { name: new RegExp(other.label) }), { metaKey: true })
    expect(document.activeElement).not.toBe(document.getElementById(other.id))
  })

  it('speaks the page language', () => {
    const chaptersFa = buildChapters(sections, fa)
    render(<ContentsMenu chapters={chaptersFa} label={fa.contents} />)
    const button = screen.getByRole('button', { name: fa.contents })
    fireEvent.click(button)
    const list = screen.getByRole('navigation', { name: fa.contents })
    expect(within(list).getByText('زمینه')).toBeTruthy()
    expect(
      within(list)
        .getAllByRole('link')
        .map((a) => a.getAttribute('href')),
    ).toEqual(chapters.map((c) => `#${c.id}`))
  })
})
