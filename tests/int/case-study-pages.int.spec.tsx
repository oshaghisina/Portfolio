/**
 * The `pages` figure (DS-25 inside a case study, jsdom): every page of a site as an index of first
 * screens, one tab per viewport with its count, sheets of twelve, and a viewer that opens the whole
 * page, steps through the rest and hands focus back. Captures never mirror; the controls do.
 */
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import React from 'react'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'

import { FigureBlock } from '@/blocks/CaseStudy/Figure/Component'
import { caseStudyCopy } from '@/components/CaseStudy/copy'
import type { CaseStudyFigureBlock, Media } from '@/payload-types'

afterEach(cleanup)

beforeAll(() => {
  // jsdom has the element but not its modal behaviour.
  const proto = HTMLDialogElement.prototype
  if (!Object.getOwnPropertyDescriptor(proto, 'open')) {
    Object.defineProperty(proto, 'open', {
      configurable: true,
      get(this: HTMLDialogElement) {
        return this.hasAttribute('open')
      },
    })
  }
  proto.showModal = function (this: HTMLDialogElement) {
    this.setAttribute('open', '')
  }
  proto.close = function (this: HTMLDialogElement) {
    this.removeAttribute('open')
    this.dispatchEvent(new Event('close'))
  }
})

const en = caseStudyCopy.en
const fa = caseStudyCopy.fa

const shot = (id: string, width: number, height: number): Media => ({
  id,
  alt: id,
  url: `/media/${id}.webp`,
  width,
  height,
  updatedAt: '2026-09-26T00:00:00.000Z',
  createdAt: '2026-09-26T00:00:00.000Z',
})

type Items = NonNullable<CaseStudyFigureBlock['items']>

const pages = (count: number, withPhone = true): Items =>
  Array.from({ length: count }, (_, i) => ({
    id: `p${i + 1}`,
    media: shot(`desktop-${i + 1}`, 1440, 900),
    full: shot(`desktop-full-${i + 1}`, 1440, 6000),
    ...(withPhone
      ? {
          mobile: shot(`mobile-${i + 1}`, 780, 1688),
          mobileFull: shot(`mobile-full-${i + 1}`, 780, 12000),
        }
      : {}),
    caption: `Page ${i + 1}`,
  }))

/** An app's screens: one phone capture each, a section per flow, and a few whole screens. */
const appScreens = (sections: [string, number][]): Items =>
  sections.flatMap(([group, count]) =>
    Array.from({ length: count }, (_, i) => ({
      id: `${group}-${i + 1}`,
      media: shot(`${group}-${i + 1}`, 780, 1688),
      ...(i === 0 ? { mobileFull: shot(`${group}-whole-${i + 1}`, 780, 5000) } : {}),
      caption: `${group} ${i + 1}`,
      group,
    })),
  )

const renderIndex = (
  items: Items,
  locale: 'en' | 'fa' = 'en',
  treatment: CaseStudyFigureBlock['treatment'] = 'plain',
) =>
  render(
    <FigureBlock
      blockType="csFigure"
      caption="Every page"
      copy={locale === 'en' ? en : fa}
      items={items}
      layout="pages"
      locale={locale}
      number="09"
      treatment={treatment}
    />,
  )

const tiles = () => screen.getAllByRole('button', { name: new RegExp(en.pages.open) })

describe('FigureBlock pages (DS-25)', () => {
  it('indexes every page by viewport, twelve first screens to a sheet', () => {
    const { container } = renderIndex(pages(14))
    const tabs = screen.getAllByRole('tab')
    expect(tabs.map((tab) => tab.textContent)).toEqual(['Desktop14', 'Mobile14'])
    expect(tabs[0]!.getAttribute('aria-selected')).toBe('true')
    expect(tiles()).toHaveLength(12)
    expect(container.querySelectorAll('.aspect-\\[1440\\/900\\]')).toHaveLength(12)

    const sheets = within(screen.getByRole('navigation', { name: en.pages.sheets })).getAllByRole(
      'button',
    )
    expect(sheets.map((sheet) => sheet.getAttribute('aria-label'))).toEqual([
      'Pages 1–12',
      'Pages 13–14',
    ])
    fireEvent.click(sheets[1]!)
    expect(tiles().map((tile) => tile.textContent)).toEqual(['13Page 13', '14Page 14'])

    fireEvent.click(tabs[1]!)
    expect(tabs[1]!.getAttribute('aria-selected')).toBe('true')
    expect(container.querySelectorAll('.aspect-\\[390\\/844\\]')).toHaveLength(2)
    expect(container.querySelector('figcaption')!.textContent).toContain('Figure 09')
  })

  it('opens the whole page, steps through every page and hands focus back', () => {
    const { container } = renderIndex(pages(3))
    const dialog = container.querySelector('dialog')!
    const opener = tiles()[0]!
    opener.focus()
    fireEvent.click(opener)

    expect(dialog.hasAttribute('open')).toBe(true)
    // Smooth scroll must leave the wheel to the viewer, or the whole page cannot be scrolled.
    expect(dialog.hasAttribute('data-lenis-prevent')).toBe(true)
    expect(within(dialog).getByRole('img').getAttribute('alt')).toBe('desktop-full-1')
    expect(dialog.textContent).toContain('01 / 03')

    fireEvent.click(within(dialog).getByRole('button', { name: en.pages.next }))
    expect(within(dialog).getByRole('img').getAttribute('alt')).toBe('desktop-full-2')
    fireEvent.keyDown(dialog, { key: 'ArrowRight' })
    fireEvent.keyDown(dialog, { key: 'ArrowRight' })
    expect(dialog.textContent).toContain('01 / 03')
    fireEvent.click(within(dialog).getByRole('button', { name: en.pages.previous }))
    expect(within(dialog).getByRole('img').getAttribute('alt')).toBe('desktop-full-3')

    fireEvent.click(within(dialog).getByRole('button', { name: en.pages.close }))
    expect(dialog.hasAttribute('open')).toBe(false)
    expect(within(dialog).queryByRole('img')).toBeNull()
    expect(document.activeElement).toBe(opener)
    expect(document.documentElement.style.overflow).toBe('')
  })

  it('opens the phone capture from the mobile tab and falls back to the first screen', () => {
    const items = pages(2)
    items[1] = { ...items[1]!, mobileFull: null }
    const { container } = renderIndex(items)
    fireEvent.click(screen.getAllByRole('tab')[1]!)
    fireEvent.click(tiles()[1]!)
    const dialog = container.querySelector('dialog')!
    expect(within(dialog).getByRole('img').getAttribute('alt')).toBe('mobile-2')
    expect(dialog.textContent).toContain('Mobile')
  })

  it('mirrors the keys, never the captures, right to left', () => {
    const { container } = renderIndex(pages(3), 'fa')
    const tablist = screen.getByRole('tablist')
    fireEvent.keyDown(tablist, { key: 'ArrowLeft' })
    expect(screen.getAllByRole('tab')[1]!.getAttribute('aria-selected')).toBe('true')

    fireEvent.click(screen.getAllByRole('button', { name: new RegExp(fa.pages.open) })[0]!)
    const dialog = container.querySelector('dialog')!
    fireEvent.keyDown(dialog, { key: 'ArrowLeft' })
    expect(within(dialog).getByRole('img').getAttribute('alt')).toBe('mobile-full-2')
    expect(container.querySelector('.aspect-\\[390\\/844\\]')!.className).not.toContain('rtl:')
  })

  it('shows one plain index when no page has a phone capture', () => {
    const { container } = renderIndex(pages(4, false))
    expect(screen.queryByRole('tablist')).toBeNull()
    expect(screen.queryByRole('navigation')).toBeNull()
    expect(tiles()).toHaveLength(4)

    // With nothing to switch to, the viewer names the page alone, not its width.
    fireEvent.click(tiles()[0]!)
    const title = container.querySelector('dialog p')!
    expect(title.textContent).toBe('Page 1')
  })

  it('indexes an app’s screens by section, at phone width only', () => {
    const { container } = renderIndex(
      appScreens([
        ['Onboarding', 2],
        ['Profile', 14],
        ['Chat', 1],
      ]),
      'en',
      'screen',
    )
    const tablist = screen.getByRole('tablist', { name: en.pages.groups })
    // A long row of sections scrolls sideways; smooth scroll must leave that swipe to it.
    expect(tablist.hasAttribute('data-lenis-prevent-horizontal')).toBe(true)
    const tabs = within(tablist).getAllByRole('tab')
    expect(tabs.map((tab) => tab.textContent)).toEqual(['Onboarding2', 'Profile14', 'Chat1'])
    expect(tiles().map((tile) => tile.textContent)).toEqual(['01Onboarding 1', '02Onboarding 2'])
    expect(container.querySelectorAll('.aspect-\\[390\\/844\\]')).toHaveLength(2)
    expect(container.querySelector('.aspect-\\[1440\\/900\\]')).toBeNull()

    fireEvent.click(tabs[1]!)
    expect(tiles()).toHaveLength(12)
    const sheets = within(screen.getByRole('navigation', { name: en.pages.sheets })).getAllByRole(
      'button',
    )
    fireEvent.click(sheets[1]!)
    expect(tiles().map((tile) => tile.textContent)).toEqual(['13Profile 13', '14Profile 14'])

    // Another section starts at its own first sheet and numbers from one.
    fireEvent.keyDown(tablist, { key: 'ArrowRight' })
    expect(tabs[2]!.getAttribute('aria-selected')).toBe('true')
    expect(tiles().map((tile) => tile.textContent)).toEqual(['01Chat 1'])
    expect(screen.queryByRole('navigation')).toBeNull()
  })

  it('fades whichever edge of a scrolling section row hides more, mirrored right to left', () => {
    const sections = appScreens([
      ['Home', 1],
      ['Tickets', 1],
      ['Chat', 1],
    ])
    // jsdom has no layout: give the row a phone's overflow, then scroll it.
    const scroll = (row: HTMLElement, left: number) => {
      Object.defineProperties(row, {
        scrollWidth: { configurable: true, value: 600 },
        clientWidth: { configurable: true, value: 300 },
        scrollLeft: { configurable: true, value: left },
      })
      fireEvent.scroll(row)
      return row.style.maskImage
    }
    const fadesRight = /^linear-gradient\(to right, #000, .*, transparent\)$/
    const fadesLeft = /^linear-gradient\(to right, transparent, .*, #000\)$/

    renderIndex(sections, 'en', 'screen')
    const row = screen.getByRole('tablist', { name: en.pages.groups })
    // Everything fits until the row is measured.
    expect(row.getAttribute('style')).toBeNull()
    expect(scroll(row, 0)).toMatch(fadesRight)
    expect(scroll(row, 150)).toMatch(/^linear-gradient\(to right, transparent, .*, transparent\)$/)
    expect(scroll(row, 300)).toMatch(fadesLeft)
    cleanup()

    // Right to left the row starts at its right edge and scrolls to negative offsets.
    renderIndex(sections, 'fa', 'screen')
    const rtlRow = screen.getByRole('tablist', { name: fa.pages.groups })
    expect(scroll(rtlRow, 0)).toMatch(fadesLeft)
    expect(scroll(rtlRow, -300)).toMatch(fadesRight)
  })

  it('opens the whole screen and names its section in the viewer', () => {
    const { container } = renderIndex(
      appScreens([
        ['Home', 2],
        ['Tickets', 1],
      ]),
      'en',
      'screen',
    )
    const dialog = container.querySelector('dialog')!
    fireEvent.click(tiles()[0]!)
    expect(within(dialog).getByRole('img').getAttribute('alt')).toBe('Home-whole-1')
    expect(container.querySelector('dialog p')!.textContent).toBe('Home 1 · Home')
    expect(dialog.textContent).toContain('01 / 02')

    // Stepping stays inside the section; a screen with no whole capture opens its first screen.
    fireEvent.click(within(dialog).getByRole('button', { name: en.pages.next }))
    expect(within(dialog).getByRole('img').getAttribute('alt')).toBe('Home-2')
    fireEvent.click(within(dialog).getByRole('button', { name: en.pages.next }))
    expect(within(dialog).getByRole('img').getAttribute('alt')).toBe('Home-whole-1')
  })

  it('keeps the width tabs when only some pages name a section', () => {
    const items = pages(3)
    items[0] = { ...items[0]!, group: 'About' }
    renderIndex(items)
    const tabs = screen.getAllByRole('tab')
    expect(tabs.map((tab) => tab.textContent)).toEqual(['Desktop3', 'Mobile3'])
    expect(screen.getByRole('tablist').getAttribute('aria-label')).toBe(en.pages.views)
  })
})
