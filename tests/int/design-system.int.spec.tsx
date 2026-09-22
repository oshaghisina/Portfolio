/**
 * Design-system components (jsdom): the contracts the docs promise — fixed label order,
 * real tag element, arrow with asChild, count caps — not pixel output.
 */
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'

import { MetricsStripBlock } from '@/blocks/MetricsStrip/Component'
import { EditorialGrid } from '@/blocks/Content/EditorialGrid'
import { ExperienceGrid } from '@/components/ExperienceGrid'
import { CMSLink, hrefFromLink } from '@/components/Link'
import { PROJECT_META_KEYS, ProjectMeta } from '@/components/ProjectMeta'
import { SectionHeader } from '@/components/SectionHeader'
import { ShippedList } from '@/components/ShippedList'
import { Tag } from '@/components/Tag'
import { TwoTone } from '@/components/TwoTone'
import { Button } from '@/components/ui/button'
import { MobileNav } from '@/Header/Nav/MobileNav'
import type { Header } from '@/payload-types'

afterEach(cleanup)

describe('Button (DS-16)', () => {
  it('uses the control tokens and renders a trailing arrow', () => {
    const { container } = render(<Button arrow>Work</Button>)
    const btn = container.querySelector('button')!
    expect(btn.className).toContain('h-(--size-control-height)')
    expect(btn.className).toContain('bg-brand')
    expect(btn.querySelectorAll('svg')).toHaveLength(1)
    expect(btn.querySelector('svg')!.getAttribute('class')).toContain('rtl:-scale-x-100')
  })

  it('keeps the arrow when rendering asChild through Slottable', () => {
    const { container } = render(
      <Button arrow asChild variant="outline">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- plain anchor on purpose: the test is about Slot */}
        <a href="/work">Work</a>
      </Button>,
    )
    const a = container.querySelector('a')!
    expect(a.className).toContain('border-line')
    expect(a.textContent).toContain('Work')
    expect(a.querySelectorAll('svg')).toHaveLength(1)
  })
})

describe('CMSLink', () => {
  it('resolves references and custom urls the same way for nav and buttons', () => {
    expect(hrefFromLink({ type: 'custom', url: '/about' })).toBe('/about')
    expect(hrefFromLink({ type: 'reference', reference: { relationTo: 'pages', value: { slug: 'work' } as never } })).toBe('/work')
    expect(hrefFromLink({ type: 'reference', reference: { relationTo: 'posts', value: { slug: 'hi' } as never } })).toBe('/lab/hi')
  })

  it('passes arrow through to the button appearance', () => {
    const { container } = render(<CMSLink appearance="default" arrow label="Contact" type="custom" url="/contact" />)
    expect(container.querySelector('a svg')).not.toBeNull()
  })
})

describe('TwoTone (DS-08)', () => {
  it('renders the tail muted and sizes from the element by default', () => {
    render(<TwoTone as="h1" lead="Product designer" tail="who reads dashboards." />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.className).toContain('text-h1')
    expect(h1.querySelector('span')!.className).toContain('text-ink-3')
  })
})

describe('SectionHeader (DS-12)', () => {
  it('renders the tag as a real element and nothing when empty', () => {
    const { container, rerender } = render(<SectionHeader lead="Work" tag="By the numbers" />)
    expect(screen.getByText('By the numbers').tagName).toBe('SPAN')
    expect(screen.getByText('By the numbers').className).toContain('bg-brand')
    rerender(<SectionHeader />)
    expect(container.innerHTML).toBe('')
  })
})

describe('Tag (DS-22)', () => {
  it('is an eyebrow in a chip', () => {
    render(<Tag>Figma</Tag>)
    expect(screen.getByText('Figma').className).toContain('eyebrow')
  })
})

describe('ProjectMeta (DS-17)', () => {
  it('keeps the fixed key order and skips empty values', () => {
    render(<ProjectMeta values={{ tools: ['Figma', 'GA4'], company: 'Acme', role: 'Designer', client: '' }} />)
    const labels = screen.getAllByRole('term').map((el) => el.textContent)
    expect(labels).toEqual(['Company', 'Role', 'Tools'])
    expect(PROJECT_META_KEYS[0]).toBe('company')
  })

  it('has Persian labels', () => {
    render(<ProjectMeta locale="fa" values={{ role: 'طراح' }} />)
    expect(screen.getByText('نقش')).toBeTruthy()
  })
})

describe('ShippedList (DS-27)', () => {
  it('uses a preset or a free label', () => {
    const { rerender } = render(<ShippedList items={['A', 'B']} label="changed" />)
    expect(screen.getByRole('heading', { level: 3 }).textContent).toBe('What changed')
    rerender(<ShippedList items={['A']} label="What we broke" />)
    expect(screen.getByRole('heading', { level: 3 }).textContent).toBe('What we broke')
  })
})

describe('ExperienceGrid (DS-20)', () => {
  it('renders one cell per employer with index code and role', () => {
    render(<ExperienceGrid items={[{ index: '01', name: 'Acme', role: 'Designer' }, { index: '02', name: 'Beta', role: 'PM' }]} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('01').className).toContain('index-code')
  })
})

describe('MetricsStrip block (DS-18)', () => {
  const metrics = Array.from({ length: 5 }, (_, i) => ({ id: String(i), value: `${i}%`, caption: `c${i}`, source: 's' }))
  it('caps at four and lays them out as a four-column grid from lg', () => {
    const { container } = render(<MetricsStripBlock disableInnerContainer metrics={metrics} />)
    expect(container.querySelectorAll('dt').length).toBe(4)
    expect(container.querySelectorAll('dd').length).toBe(4) // one value per metric
    expect(container.querySelector('dl')!.className).toContain('lg:grid-cols-4')
  })
  it('gives only the first row the accent fill in the phone composition', () => {
    const { container } = render(<MetricsStripBlock disableInnerContainer metrics={metrics.slice(0, 3)} />)
    const rows = Array.from(container.querySelectorAll('dl > div'))
    expect(rows).toHaveLength(3)
    const phoneBars = rows.map((row) => row.querySelector('span.sm\\:hidden')!)
    expect(phoneBars[0].className).toContain('bg-brand')
    expect(phoneBars[1].className).not.toContain('bg-brand')
    expect(phoneBars[2].className).not.toContain('bg-brand')
  })
})

describe('Content editorial grid (DS-13)', () => {
  it('gives the first child 5/12 and the rest 7/12', () => {
    const { container } = render(
      <EditorialGrid>
        <h2>Lead</h2>
        <p>Body</p>
      </EditorialGrid>,
    )
    const cells = container.querySelectorAll(':scope > div > div')
    expect(cells[0]!.className).toContain('lg:col-span-5')
    expect(cells[1]!.className).toContain('lg:col-span-7')
  })
})

describe('MobileNav (DS-32)', () => {
  const data = {
    id: 1,
    navItems: [
      { id: 'a', link: { type: 'custom', url: '/work', label: 'Work' } },
      { id: 'b', link: { type: 'custom', url: '/about', label: 'About' } },
    ],
  } as unknown as Header

  it('renders a native dialog with numbered links and a foot slot', () => {
    const { container } = render(<MobileNav data={data} foot={<span>Tehran</span>} locale="en" />)
    // The closed <dialog> is hidden from the a11y tree, so query the DOM directly.
    const dialog = container.querySelector('dialog')!
    expect(dialog).not.toBeNull()
    expect(dialog.querySelector('.index-code')!.textContent).toBe('01')
    expect(dialog.querySelector('a[href="/work"]')!.textContent).toContain('Work')
    expect(dialog.textContent).toContain('Tehran')
    expect(screen.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded')).toBe('false')
  })
})
