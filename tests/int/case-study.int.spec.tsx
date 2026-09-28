/**
 * Case-study template (jsdom): the contracts the docs promise — chapters are numbered from the
 * controlled labels with locale-independent anchors, figures follow the hero, decisions are an
 * ordered sequence, media patterns stack on phones, portrait captures are framed, outcomes never
 * fake a number, and every link is locale-prefixed.
 */
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'

import { buildChapters, figureNumbers } from '@/blocks/CaseStudy/chapters'
import { DecisionsBlock } from '@/blocks/CaseStudy/Decisions/Component'
import { DownloadsBlock, fileFormat, fileSize } from '@/blocks/CaseStudy/Downloads/Component'
import { FigureBlock } from '@/blocks/CaseStudy/Figure/Component'
import { OutcomesBlock } from '@/blocks/CaseStudy/Outcomes/Component'
import { RenderCaseStudy } from '@/blocks/CaseStudy/RenderCaseStudy'
import { caseStudyCopy } from '@/components/CaseStudy/copy'
import { ScreenFrame } from '@/components/CaseStudy/ScreenFrame'
import { SectionIndex } from '@/components/CaseStudy/SectionIndex'
import { Snapshot } from '@/components/CaseStudy/Snapshot'
import { NextProject } from '@/components/NextProject'
import { ProjectMeta } from '@/components/ProjectMeta'
import type { Media, Project } from '@/payload-types'

afterEach(cleanup)

// The Lexical renderer pulls the admin UI's Code block (and its SCSS) into the bundle; the prose
// itself is Payload's converter, not this template's contract, so it is stubbed here.
vi.mock('@/components/RichText', () => ({
  default: () => <div data-testid="richtext" />,
}))

beforeAll(() => {
  // jsdom has no IntersectionObserver; the index guards for it, but stub anyway for the active state.
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

const media = (overrides: Partial<Media> = {}): Media => ({
  id: 'm1',
  alt: 'A screen',
  url: '/media/screen.png',
  width: 780,
  height: 1704,
  updatedAt: '2026-01-01T00:00:00.000Z',
  createdAt: '2026-01-01T00:00:00.000Z',
  ...overrides,
})

const sections: NonNullable<Project['sections']> = [
  { id: 's1', blockType: 'csNarrative', label: 'context', heading: 'Many small games, one layer.' },
  { id: 'f1', blockType: 'csFigure', layout: 'full', items: [{ id: 'i1', media: media() }] },
  {
    id: 's2',
    blockType: 'csOwnership',
    own: ['Research'],
    coOwn: [],
    collaborate: ['The game spec'],
  },
  {
    id: 's3',
    blockType: 'csNarrative',
    label: 'custom',
    customLabel: 'Tone',
    heading: 'ESPN, not Stake.',
  },
  {
    id: 'f2',
    blockType: 'csFigure',
    layout: 'split',
    items: [
      { id: 'i2', media: media() },
      { id: 'i3', media: media({ id: 'm2' }) },
    ],
  },
  {
    id: 's4',
    blockType: 'csLessons',
    items: [
      { id: 'l1', title: 'Logs beat rewrites' },
      { id: 'l2', title: 'Projects drift' },
    ],
  },
]

describe('chapters', () => {
  it('numbers only chapter-opening blocks and keeps anchors locale-independent', () => {
    const chapters = buildChapters(sections, en)
    expect(chapters.map((c) => c.number)).toEqual(['01', '02', '03', '04'])
    expect(chapters.map((c) => c.id)).toEqual([
      's01-context',
      's02-ownership',
      's03-custom',
      's04-lessons',
    ])
    expect(chapters.map((c) => c.label)).toEqual(['Context', 'My role', 'Tone', 'What I learned'])
    expect(buildChapters(sections, fa).map((c) => c.id)).toEqual(
      buildChapters(sections, en).map((c) => c.id),
    )
    expect(buildChapters(sections, fa)[0]!.label).toBe('زمینه')
  })

  it('numbers figures after the hero', () => {
    expect([...figureNumbers(sections, 2).values()]).toEqual(['02', '03'])
    expect([...figureNumbers(sections).values()]).toEqual(['01', '02'])
  })
})

describe('RenderCaseStudy', () => {
  it('wraps chapters in labelled sections with a technical kicker', () => {
    const { container } = render(<RenderCaseStudy copy={en} locale="en" sections={sections} />)
    const first = container.querySelector('section#s01-context')!
    expect(first.getAttribute('aria-labelledby')).toBe('s01-context-heading')
    expect(first.textContent).toContain('01')
    expect(first.textContent).toContain('Context')
    expect(container.querySelector('#s01-context-heading')!.tagName).toBe('H2')
    // figures are evidence inside the chapter, not chapters of their own
    expect(container.querySelectorAll('section[id^="s0"]')).toHaveLength(4)
    expect(container.querySelectorAll('figure')).toHaveLength(2)
  })
})

describe('FigureBlock (DS-30)', () => {
  const items = [
    { id: 'a', media: media() },
    { id: 'b', media: media({ id: 'm2' }) },
  ]

  it('stacks a split pair below md and frames portrait captures', () => {
    const { container } = render(
      <FigureBlock
        blockType="csFigure"
        copy={en}
        items={items}
        layout="split"
        locale="en"
        number="02"
      />,
    )
    const grid = container.querySelector('figure > div')!
    expect(grid.className.split(' ')).toContain('md:grid-cols-2')
    expect(grid.className.split(' ')).not.toContain('grid-cols-2')
    expect(container.querySelectorAll('.aspect-\\[390\\/844\\]')).toHaveLength(2)
    expect(container.querySelector('figcaption')!.textContent).toContain('Figure 02')
  })

  it('runs a sequence two-up on phones and by count on large screens', () => {
    const { container } = render(
      <FigureBlock
        blockType="csFigure"
        copy={en}
        items={[...items, { id: 'c', media: media({ id: 'm3' }) }]}
        layout="sequence"
        locale="en"
        number="03"
      />,
    )
    const grid = container.querySelector('figure > div')!
    expect(grid.className.split(' ')).toContain('grid-cols-2')
    expect(grid.className.split(' ')).toContain('lg:grid-cols-3')
  })

  it('renders an annotated figure with a numbered key', () => {
    const { container } = render(
      <FigureBlock
        annotations={[
          { id: 'x', text: 'Balance' },
          { id: 'y', text: 'Withdraw' },
        ]}
        blockType="csFigure"
        copy={en}
        items={[items[0]!]}
        layout="annotated"
        locale="en"
        number="04"
      />,
    )
    const key = container.querySelectorAll('ol li')
    expect(key).toHaveLength(2)
    expect(key[0]!.textContent).toContain('01')
    expect(key[1]!.textContent).toContain('Withdraw')
  })

  it('labels a comparison before and after in the page language', () => {
    const { container } = render(
      <FigureBlock
        blockType="csFigure"
        copy={fa}
        items={items}
        layout="compare"
        locale="fa"
        number="05"
      />,
    )
    expect(container.textContent).toContain('قبل')
    expect(container.textContent).toContain('بعد')
  })

  it('keeps landscape media at its natural aspect', () => {
    const { container } = render(
      <FigureBlock
        blockType="csFigure"
        copy={en}
        items={[{ id: 'a', media: media({ width: 1600, height: 900 }) }]}
        layout="full"
        locale="en"
        number="06"
      />,
    )
    expect(container.querySelector('.aspect-\\[390\\/844\\]')).toBeNull()
    expect(container.querySelector('img')).not.toBeNull()
  })
})

describe('ScreenFrame', () => {
  it('is a fixed phone viewport that never mirrors', () => {
    const { container } = render(<ScreenFrame resource={media()} sizes="20rem" />)
    const frame = container.firstElementChild!
    expect(frame.className).toContain('aspect-[390/844]')
    expect(frame.className).not.toContain('rtl:')
    expect(container.querySelector('img')!.getAttribute('class')).toContain('object-top')
    expect((frame as HTMLElement).style.aspectRatio).toBe('')
  })

  it('keeps a screen shorter than the viewport whole instead of cutting its sides', () => {
    const { container } = render(
      <ScreenFrame resource={media({ width: 720, height: 1280 })} sizes="20rem" />,
    )
    const frame = container.firstElementChild as HTMLElement
    expect(frame.style.aspectRatio).toBe('720 / 1280')
    expect(frame.querySelectorAll('img')).toHaveLength(1)
  })
})

describe('DecisionsBlock', () => {
  it('numbers decisions and lists only the facts that exist', () => {
    const { container } = render(
      <DecisionsBlock
        blockType="csDecisions"
        copy={en}
        items={[
          { id: 'd1', title: 'Three tabs.', why: 'Smaller scope.', tradeoff: 'No token.' },
          {
            id: 'd2',
            title: 'Rename formats.',
            why: 'One naming.',
            alternatives: 'Keep PVP.',
            evidence: 'The log.',
          },
        ]}
        locale="en"
      />,
    )
    const rows = container.querySelectorAll('ol > li')
    expect(rows).toHaveLength(2)
    expect(rows[0]!.textContent).toContain('01')
    expect(rows[0]!.querySelectorAll('dt')).toHaveLength(1)
    expect(rows[0]!.querySelector('dt')!.textContent).toBe('Trade-off')
    expect(rows[1]!.querySelectorAll('dt')).toHaveLength(2)
    expect(container.querySelector('h2')!.textContent).toBe('Key decisions')
  })
})

describe('OutcomesBlock', () => {
  it('never fabricates a number for a qualitative outcome and names provenance', () => {
    const { container } = render(
      <OutcomesBlock
        blockType="csOutcomes"
        copy={en}
        items={[
          { id: 'o1', kind: 'delivered', label: 'A resolved MVP scope', source: 'The scope doc' },
          { id: 'o2', kind: 'measured', label: 'Conversion', value: '+18%', source: 'GA4, Q2' },
        ]}
        locale="en"
        shipped={['Eleven sections wireframed']}
      />,
    )
    expect(container.querySelectorAll('.text-num')).toHaveLength(1)
    expect(container.querySelector('.text-num')!.getAttribute('dir')).toBe('ltr')
    expect(container.textContent).toContain('Delivered output · The scope doc')
    expect(container.textContent).toContain('Measured outcome · GA4, Q2')
    expect(container.textContent).toContain('What was delivered')
  })
})

describe('DownloadsBlock', () => {
  const workbook = media({
    id: 'x1',
    alt: 'A workbook',
    url: '/media/vin-app--problem-inventory.xlsx',
    filename: 'vin-app--problem-inventory.xlsx',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    filesize: 39_339,
    width: null,
    height: null,
  })

  it('offers each file with its format and size, and skips a row whose upload is missing', () => {
    render(
      <DownloadsBlock
        blockType="csDownloads"
        copy={en}
        heading="The two workbooks"
        items={[
          { id: 'd1', file: workbook, title: 'Problem inventory', description: '57 problems.' },
          { id: 'd2', file: 'an-unpopulated-id', title: 'Not uploaded' },
        ]}
        locale="en"
      />,
    )
    const link = screen.getByRole('link', { name: 'Download Problem inventory' })
    expect(link.getAttribute('href')).toBe('/media/vin-app--problem-inventory.xlsx')
    expect(link.getAttribute('download')).toBe('vin-app--problem-inventory.xlsx')
    expect(screen.getByText('XLSX · 39 kB')).toBeTruthy()
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
    expect(screen.queryByText('Not uploaded')).toBeNull()
  })

  it('renders nothing when no file has an upload', () => {
    const { container } = render(
      <DownloadsBlock
        blockType="csDownloads"
        copy={en}
        items={[{ id: 'd1', file: 'an-unpopulated-id', title: 'Not uploaded' }]}
        locale="en"
      />,
    )
    expect(container.innerHTML).toBe('')
  })

  it('labels the button and writes the size in the page language', () => {
    render(
      <DownloadsBlock
        blockType="csDownloads"
        copy={fa}
        items={[{ id: 'd1', file: workbook, title: 'فهرست مسئله‌ها' }]}
        locale="fa"
      />,
    )
    expect(screen.getByRole('link').textContent).toContain('دانلود')
    expect(screen.getByText('XLSX · ۳۹ kB')).toBeTruthy()
  })

  it('reads the format from the filename and rounds the size', () => {
    expect(fileFormat('deck.final.PDF')).toBe('PDF')
    expect(fileFormat('no-extension')).toBeNull()
    expect(fileSize(20_068, 'en')).toBe('20 kB')
    expect(fileSize(120, 'en')).toBe('1 kB')
    expect(fileSize(2_450_000, 'en')).toBe('2.5 MB')
    expect(fileSize(0, 'en')).toBeNull()
  })
})

describe('Snapshot', () => {
  it('renders the three terms, or nothing at all', () => {
    const { container } = render(
      <Snapshot copy={en} snapshot={{ problem: 'P', role: 'R', result: 'X' }} />,
    )
    expect([...container.querySelectorAll('dt')].map((dt) => dt.textContent)).toEqual([
      'The problem',
      'The role',
      'The result',
    ])
    const { container: empty } = render(<Snapshot copy={en} snapshot={{ problem: ' ' }} />)
    expect(empty.innerHTML).toBe('')
  })
})

describe('SectionIndex (DS-14)', () => {
  it('needs enough chapters to earn its place and links every chapter', () => {
    const chapters = buildChapters(sections, en)
    const { container } = render(<SectionIndex chapters={chapters} label="Contents" />)
    expect(container.querySelectorAll('a')).toHaveLength(4)
    expect(screen.getByRole('navigation', { name: 'Contents' })).toBeTruthy()
    const { container: short } = render(
      <SectionIndex chapters={chapters.slice(0, 2)} label="Contents" />,
    )
    expect(short.innerHTML).toBe('')
  })
})

describe('NextProject (DS-28)', () => {
  const project = {
    slug: 'digital-gold',
    title: 'Digital Gold',
    summary: 'Vision and growth.',
    statement: 'From proposition to growth system.',
    kind: ['product' as const],
  }

  it('links into the next case study and back to the archive with the locale prefix', () => {
    const { container } = render(
      <NextProject copy={fa} locale="fa" pendingLabel="pending" project={project} />,
    )
    const links = [...container.querySelectorAll('a')].map((a) => a.getAttribute('href'))
    expect(links).toEqual(['/fa/work/digital-gold', '/fa/work'])
    expect(container.textContent).toContain('پروژه‌ی بعدی')
    expect(container.textContent).toContain('From proposition to growth system.')
  })

  it('falls back to the archive link alone', () => {
    const { container } = render(
      <NextProject copy={en} locale="en" pendingLabel="pending" project={null} />,
    )
    expect([...container.querySelectorAll('a')].map((a) => a.getAttribute('href'))).toEqual([
      '/work',
    ])
  })
})

describe('ProjectMeta compact variant (DS-17)', () => {
  it('renders the header facts as hairline rows without the bordered cells', () => {
    const { container } = render(
      <ProjectMeta
        locale="de"
        values={{
          company: 'Independent',
          role: 'Designer',
          period: '2026',
          industry: 'Gaming',
          team: 'PO + me',
          status: 'Vor dem Launch',
          tools: ['Figma'],
        }}
        variant="compact"
      />,
    )
    const terms = [...container.querySelectorAll('dt')].map((dt) => dt.textContent)
    expect(terms).toEqual([
      'Unternehmen',
      'Rolle',
      'Zeitraum',
      'Branche',
      'Team',
      'Status',
      'Werkzeuge',
    ])
    expect(container.querySelector('.border-e')).toBeNull()
  })
})
