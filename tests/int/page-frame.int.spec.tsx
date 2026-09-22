/**
 * The site frame (DS-11) and the shared page opener (jsdom): every route renders into one sheet
 * that owns the width, and opens with the same gesture. The contracts here are structural — one
 * `main`, one `.canvas`, no block bringing its own `.container` — not pixel output.
 */
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ContentBlock } from '@/blocks/Content/Component'
import { MetricsStripBlock } from '@/blocks/MetricsStrip/Component'
import { WorkIntro } from '@/blocks/ProjectArchive/WorkIntro'
import { CaseStudyHeader } from '@/components/CaseStudy/CaseStudyHeader'
import { caseStudyCopy } from '@/components/CaseStudy/copy'
import { PageFrame } from '@/components/PageFrame'
import { PageOpener } from '@/components/PageOpener'
import type { Project } from '@/payload-types'

afterEach(cleanup)

vi.mock('@/components/RichText', () => ({
  default: () => <div data-testid="richtext" />,
}))

describe('PageFrame (DS-11)', () => {
  it('puts every page in one ruled sheet that owns the width', () => {
    const { container } = render(
      <PageFrame>
        <p>content</p>
      </PageFrame>,
    )

    const main = container.querySelectorAll('main')
    expect(main).toHaveLength(1)
    expect(main[0]!.className.split(' ')).toContain('ruled-paper')

    const canvas = main[0]!.firstElementChild!
    expect(canvas.className.split(' ')).toContain('canvas')
    expect(canvas.querySelector('p')!.textContent).toBe('content')
  })

  it('opens flush against the header — the opener carries the top air, not the frame', () => {
    const { container } = render(<PageFrame>{null}</PageFrame>)
    const classes = container.querySelector('main')!.className.split(' ')
    expect(classes.some((c) => /^p?t-/.test(c))).toBe(false)
  })
})

describe('PageOpener', () => {
  const opener = (props: React.ComponentProps<typeof PageOpener>) => render(<PageOpener {...props} />)

  it('renders the page heading at the display role', () => {
    const { container } = opener({ title: 'Selected work.' })
    const h1 = container.querySelector('h1')!
    expect(h1.textContent).toBe('Selected work.')
    expect(h1.className.split(' ')).toContain('text-display')
  })

  it('caps the lede at the reading measure', () => {
    opener({ lede: 'One or two sentences.', title: 'Work.' })
    expect(screen.getByText('One or two sentences.').className).toContain('max-w-[34ch]')
  })

  it('pairs an index code with the eyebrow', () => {
    const { container } = opener({ eyebrow: 'Work', index: '02', title: 'Work.' })
    expect(container.querySelector('.index-code')!.textContent).toBe('02')
    expect(container.querySelector('.eyebrow')!.textContent).toContain('Work')
  })

  it('puts the back link above the eyebrow, not after the heading', () => {
    const { container } = opener({
      // eslint-disable-next-line @next/next/no-html-link-for-pages -- plain anchor on purpose: the test is about slot order
      before: <a href="/work">All work</a>,
      eyebrow: 'Case study',
      title: 'RP1 Arena',
    })
    const column = container.querySelector('a')!.parentElement!
    expect(column.firstElementChild!.tagName).toBe('A')
    expect(column.querySelector('h1')!.textContent).toBe('RP1 Arena')
  })

  it('closes on the hairline rail, and can drop it', () => {
    const { container: withRail } = opener({ title: 'Work.' })
    expect(withRail.querySelectorAll('[aria-hidden]').length).toBeGreaterThan(0)

    const { container: withoutRail } = render(<PageOpener rail={false} title="Work." />)
    expect(withoutRail.querySelector('section')!.children).toHaveLength(1)
  })

  it('renders the aside verbatim so each page owns its own responsive behaviour', () => {
    const { container } = opener({ aside: <p className="hidden lg:block">meta</p>, title: 'Work.' })
    expect(container.querySelector('p.hidden')!.textContent).toBe('meta')
  })
})

describe('the frame owns width', () => {
  it('no block brings its own container', () => {
    const metrics = [{ id: '1', value: '30%', caption: 'Faster', source: 'Dashboard, 2026' }]
    const { container: strip } = render(<MetricsStripBlock metrics={metrics} />)
    expect(strip.firstElementChild!.className.split(' ')).not.toContain('container')

    const { container: content } = render(
      <ContentBlock blockType="content" columns={[]} layout="editorial" locale="en" />,
    )
    expect(content.querySelector('.container')).toBeNull()
  })
})

describe('page openers share the gesture', () => {
  it('the work archive opens on the shared opener with a computed count line', () => {
    const { container } = render(
      <WorkIntro
        companyCount={4}
        locale="en"
        projectCount={7}
        sectionHeader={{ tag: 'Work', lead: 'Selected', tail: 'work.', lede: 'What I have shipped.' }}
      />,
    )
    expect(container.querySelector('h1')!.textContent).toContain('Selected')
    expect(container.querySelector('h1')!.className).toContain('text-display')
    expect(container.textContent).toContain('7 projects')
    expect(container.querySelector('.container')).toBeNull()
  })

  it('the case study opens on the same shared opener, facts beside the title', () => {
    const project = {
      id: 1,
      title: 'RP1 Arena',
      slug: 'rp1-arena',
      statement: 'A competitive layer for casual games.',
      company: 'RP1',
      role: 'Product design & strategy',
      kind: [],
      tools: [],
    } as unknown as Project

    const { container } = render(<CaseStudyHeader copy={caseStudyCopy.en} locale="en" project={project} />)
    expect(container.querySelector('h1')!.textContent).toBe('RP1 Arena')
    expect(container.querySelector('h1')!.className).toContain('text-display')
    expect(container.querySelector('a')!.getAttribute('href')).toBe('/work')
    expect(container.textContent).toContain('A competitive layer for casual games.')
    expect(container.textContent).toContain('RP1')
  })
})
