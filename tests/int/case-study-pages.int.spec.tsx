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

const renderIndex = (items: Items, locale: 'en' | 'fa' = 'en') =>
  render(
    <FigureBlock
      blockType="csFigure"
      caption="Every page"
      copy={locale === 'en' ? en : fa}
      items={items}
      layout="pages"
      locale={locale}
      number="09"
      treatment="plain"
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
    renderIndex(pages(4, false))
    expect(screen.queryByRole('tablist')).toBeNull()
    expect(screen.queryByRole('navigation')).toBeNull()
    expect(tiles()).toHaveLength(4)
  })
})
