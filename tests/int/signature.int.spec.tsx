/**
 * The signature and its writing (jsdom). The outline data stays one closed shape per contour
 * however it is drawn, the animated SVG carries the pen windows its CSS reads, the route loader
 * writes it, and the first-load controller decides, docks, skips and caps the intro on its own,
 * without React.
 */
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import Loading from '@/app/(frontend)/loading'
import { Signature } from '@/components/Signature'
import { SIGNATURE_INTRO, signatureIntro } from '@/components/Signature/intro'
import { drawSignature, SIGNATURE_PATH, SIGNATURE_STROKES } from '@/components/Signature/outline'
import { SignatureDraw } from '@/components/Signature/SignatureDraw'
import { SignatureIntro, SignatureIntroScript } from '@/components/Signature/SignatureIntro'
import { uiCopy } from '@/utilities/uiCopy'

vi.mock('@/utilities/getLocale', () => ({ getLocale: async () => 'fa' }))

afterEach(cleanup)

const pairs = (points: string) => {
  const xy = points.split(' ')
  return Array.from({ length: xy.length / 2 }, (_, i) => `${xy[2 * i]} ${xy[2 * i + 1]}`)
}

describe('signature outline', () => {
  it('writes the strokes in order, inside one write', () => {
    let previous = -1
    for (const {
      pen: [start, end],
    } of SIGNATURE_STROKES) {
      expect(start).toBeGreaterThan(previous)
      expect(end).toBeGreaterThan(start)
      expect(end).toBeLessThanOrEqual(1)
      previous = start
    }
  })

  it('draws each outline as two sides from the start tip to the lift, covering every point once', () => {
    for (const stroke of SIGNATURE_STROKES) {
      for (const contour of stroke.contours) {
        const points = pairs(contour.points)
        const lines = drawSignature([{ ...stroke, contours: [contour] }])[0]!.lines
        if (contour.tip === undefined) {
          expect(lines.map(({ d }) => d)).toEqual([`M${contour.points}Z`])
          continue
        }
        expect(lines).toHaveLength(2)
        const sides = lines.map(({ d }) => pairs(d.slice(1)))
        for (const side of sides) {
          expect(side[0]).toBe(points[0])
          expect(side.at(-1)).toBe(points[contour.tip])
        }
        // Both sides hold the two tips; every other point belongs to exactly one side.
        expect(new Set([...sides[0]!, ...sides[1]!])).toEqual(new Set(points))
        expect(sides[0]!.length + sides[1]!.length).toBe(points.length + 2)
      }
    }
  })

  it('draws every line while the pen is on its stroke, and inks the stroke as the pen leaves', () => {
    for (const [index, stroke] of drawSignature().entries()) {
      const [start, end] = SIGNATURE_STROKES[index]!.pen
      expect(stroke.inkAt).toBe(end)
      for (const { from, to } of stroke.lines) {
        expect(from).toBeGreaterThanOrEqual(start)
        expect(to).toBeLessThanOrEqual(end)
        expect(to).toBeGreaterThan(from)
      }
    }
  })

  it('fills every outline once in the finished mark', () => {
    const contours = SIGNATURE_STROKES.flatMap(({ contours }) => contours)
    expect(SIGNATURE_PATH.match(/M/g)).toHaveLength(contours.length)
    expect(SIGNATURE_PATH.match(/Z/g)).toHaveLength(contours.length)
  })
})

describe('Signature and SignatureDraw', () => {
  it('keeps the wordmark decorative and passes data hooks to the svg', () => {
    const { container } = render(<Signature className="h-9" data-signature-anchor="" />)
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('aria-hidden')).toBe('true')
    expect(svg.hasAttribute('data-signature-anchor')).toBe(true)
    expect(svg.querySelector('path')!.getAttribute('d')).toBe(SIGNATURE_PATH)
  })

  it('renders one ink per stroke and normalised lines that carry their pen window', () => {
    const { container } = render(<SignatureDraw mode="loop" />)
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('data-mode')).toBe('loop')
    expect(svg.getAttribute('aria-hidden')).toBe('true')
    expect(svg.querySelectorAll('.signature-ink')).toHaveLength(SIGNATURE_STROKES.length)

    const lines = svg.querySelectorAll<SVGPathElement>('.signature-line')
    expect(lines).toHaveLength(drawSignature().flatMap(({ lines }) => lines).length)
    for (const line of lines) {
      expect(line.getAttribute('pathLength')).toBe('1')
      expect(line.style.getPropertyValue('--signature-from')).not.toBe('')
      expect(line.style.getPropertyValue('--signature-to')).not.toBe('')
    }
  })

  it('loads a route by writing the signature on a sheet one viewport tall', async () => {
    const { container } = render(await Loading())
    const status = screen.getByRole('status')
    expect(status.getAttribute('aria-busy')).toBe('true')
    expect(status.textContent).toBe(uiCopy.fa.loadingLabel)
    expect(status.hasAttribute('data-reveal-skip')).toBe(true)
    expect(status.querySelector('svg')!.getAttribute('data-mode')).toBe('loop')
    expect(container.querySelector('main')!.className).toContain('min-h-[calc(100svh-3.5rem)]')
  })
})

describe('first-load intro', () => {
  const root = document.documentElement
  const { attribute, storageKey } = SIGNATURE_INTRO
  const writeEnd = () =>
    Object.assign(new Event('animationend', { bubbles: true }), {
      animationName: SIGNATURE_INTRO.writeAnimation,
    })

  beforeEach(() => {
    vi.useFakeTimers()
    localStorage.clear()
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({ matches: false })),
    )
  })

  afterEach(() => {
    // Ends any intro a test left running, so its listeners never leak into the next test.
    vi.runAllTimers()
    vi.useRealTimers()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
    Reflect.deleteProperty(HTMLElement.prototype, 'animate')
    root.removeAttribute(attribute)
    window.history.replaceState(null, '', '/')
  })

  it('ships as a self-contained head script', () => {
    const html = renderToStaticMarkup(<SignatureIntroScript />)
    const code = html.replace(/^<script>/, '').replace(/<\/script>$/, '')
    expect(code).toContain(JSON.stringify(SIGNATURE_INTRO))
    // Run it the way the page does: no module scope, only the browser's globals.
    new Function(code)()
    expect(root.getAttribute(attribute)).toBe('play')
  })

  it('plays for a first visit and remembers when', () => {
    signatureIntro(SIGNATURE_INTRO)
    expect(root.getAttribute(attribute)).toBe('play')
    expect(Number(localStorage.getItem(storageKey))).toBe(Date.now())
  })

  it('leaves a recent visitor alone unless ?intro asks for it', () => {
    localStorage.setItem(storageKey, String(Date.now() - 60_000))
    signatureIntro(SIGNATURE_INTRO)
    expect(root.hasAttribute(attribute)).toBe(false)

    window.history.replaceState(null, '', '/?intro')
    signatureIntro(SIGNATURE_INTRO)
    expect(root.getAttribute(attribute)).toBe('play')
  })

  it('never plays for reduced motion, or in a tab opened in the background', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({ matches: true })),
    )
    signatureIntro(SIGNATURE_INTRO)
    expect(root.hasAttribute(attribute)).toBe(false)

    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({ matches: false })),
    )
    vi.spyOn(document, 'visibilityState', 'get').mockReturnValue('hidden')
    signatureIntro(SIGNATURE_INTRO)
    expect(root.hasAttribute(attribute)).toBe(false)
    expect(localStorage.getItem(storageKey)).toBeNull()
  })

  it('docks the written name onto the header mark, then hands over to it', async () => {
    const animate = vi.fn(() => ({ finished: Promise.resolve() }))
    Object.defineProperty(HTMLElement.prototype, 'animate', { configurable: true, value: animate })
    const rect = (left: number, top: number, width: number, height: number) =>
      ({ left, top, width, height }) as DOMRect
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: Element,
    ) {
      return this.matches('[data-signature-anchor]')
        ? rect(24, 10, 117, 36)
        : rect(368, 316, 544, 168)
    })
    render(
      <>
        <SignatureIntro />
        <Signature data-signature-anchor="" />
      </>,
    )

    signatureIntro(SIGNATURE_INTRO)
    document.dispatchEvent(writeEnd())
    expect(root.getAttribute(attribute)).toBe('dock')

    const mark = document.querySelector('.signature-intro-mark')
    const dock = animate.mock.contexts.indexOf(mark)
    expect(dock).toBeGreaterThan(-1)
    expect(animate.mock.calls[dock]).toEqual([
      { transform: ['none', 'translate(-344px, -306px) scale(0.21428571428571427)'] },
      expect.objectContaining({ duration: 550, fill: 'forwards' }),
    ])

    // The dock's `finished` settles on the next microtask; no timer is involved.
    await Promise.resolve()
    expect(root.hasAttribute(attribute)).toBe(false)
  })

  it('lifts the curtain at the first input, and ends on its own if the write never runs', () => {
    render(<SignatureIntro />)
    signatureIntro(SIGNATURE_INTRO)
    // No Web Animations in jsdom: leaving ends at once instead of fading.
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }))
    expect(root.hasAttribute(attribute)).toBe(false)

    localStorage.clear()
    signatureIntro(SIGNATURE_INTRO)
    vi.advanceTimersByTime(SIGNATURE_INTRO.capMs)
    expect(root.hasAttribute(attribute)).toBe(false)
  })
})
