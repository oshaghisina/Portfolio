import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { act, cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ThoughtFigure } from '@/heros/HomeImpact/ThoughtFigure'
import { thoughtCopy } from '@/heros/HomeImpact/copy'
import { LOCALES } from '@/utilities/locale'

afterEach(() => {
  cleanup()
  document.documentElement.removeAttribute('data-signature-intro')
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('home opening illustration', () => {
  it.each(LOCALES)('provides the complete static story with HTML labels in %s', (locale) => {
    const html = renderToStaticMarkup(<ThoughtFigure locale={locale} />)
    for (const label of thoughtCopy[locale].stages) expect(html).toContain(label)
    expect(html).toContain(thoughtCopy[locale].description)
    for (const object of ['evidence', 'product', 'learning']) {
      expect(html).toContain(`data-thought-object="${object}"`)
    }
    expect(html).toContain('width="600" height="540"')
    expect(html).not.toContain('data-thought-started')
    expect(html).not.toContain('<canvas')
    expect(html).not.toContain('<text')
  })
})

function setup(reducedInitially = false) {
  let reduced = reducedInitially
  let hidden = false
  let preferenceChanged = () => {}
  let intersect: IntersectionObserverCallback = () => {}
  const disconnect = vi.fn()
  const removePreferenceListener = vi.fn()
  vi.spyOn(document, 'hidden', 'get').mockImplementation(() => hidden)
  vi.stubGlobal('matchMedia', () => ({
    get matches() {
      return reduced
    },
    addEventListener: (_: string, fn: () => void) => {
      preferenceChanged = fn
    },
    removeEventListener: removePreferenceListener,
  }))
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(fn: IntersectionObserverCallback) {
        intersect = fn
      }
      observe = vi.fn()
      disconnect = disconnect
    },
  )
  const view = render(<ThoughtFigure locale="en" />)
  const figure = view.container.querySelector('figure')!
  return {
    ...view,
    figure,
    disconnect,
    removePreferenceListener,
    enter: (isIntersecting: boolean) =>
      act(() =>
        intersect([{ isIntersecting } as IntersectionObserverEntry], {} as IntersectionObserver),
      ),
    hide: (value: boolean) =>
      act(() => {
        hidden = value
        document.dispatchEvent(new Event('visibilitychange'))
      }),
    reduce: (value: boolean) =>
      act(() => {
        reduced = value
        preferenceChanged()
      }),
    finish: () =>
      act(() => {
        const event = new Event('animationend', { bubbles: true })
        Object.defineProperty(event, 'animationName', { value: 'thought-travel' })
        figure.querySelector('.thought-travel')!.dispatchEvent(event)
      }),
  }
}

describe('finite hero motion', () => {
  it('starts after the signature curtain has left, rather than playing behind it', async () => {
    document.documentElement.setAttribute('data-signature-intro', 'play')
    const view = setup()
    view.enter(true)
    expect(view.figure.dataset.thoughtStarted).toBeUndefined()
    await act(async () => {
      document.documentElement.removeAttribute('data-signature-intro')
    })
    expect(view.figure.dataset.thoughtRunning).toBe('true')
  })

  it('waits for visibility, pauses offscreen and in hidden tabs, and never replays after completion', () => {
    const view = setup()
    expect(view.figure.dataset.thoughtStarted).toBeUndefined()
    view.enter(true)
    expect(view.figure.dataset.thoughtRunning).toBe('true')
    view.enter(false)
    expect(view.figure.dataset.thoughtRunning).toBe('false')
    expect(view.figure.dataset.thoughtStarted).toBe('true')
    view.enter(true)
    view.hide(true)
    expect(view.figure.dataset.thoughtRunning).toBe('false')
    view.hide(false)
    expect(view.figure.dataset.thoughtRunning).toBe('true')
    view.finish()
    view.enter(false)
    view.enter(true)
    expect(view.figure.dataset.thoughtRunning).toBe('false')
    expect(view.figure.dataset.thoughtComplete).toBe('true')
    view.unmount()
    expect(view.disconnect).toHaveBeenCalledOnce()
    expect(view.removePreferenceListener).toHaveBeenCalledOnce()
  })

  it('leaves reduced-motion visits static and resolves immediately when reduction is enabled', () => {
    const view = setup(true)
    view.enter(true)
    expect(view.figure.dataset.thoughtStarted).toBeUndefined()
    view.reduce(false)
    expect(view.figure.dataset.thoughtRunning).toBe('true')
    view.reduce(true)
    expect(view.figure.dataset.thoughtStarted).toBeUndefined()
    expect(view.figure.dataset.thoughtRunning).toBe('false')
    view.reduce(false)
    expect(view.figure.dataset.thoughtStarted).toBeUndefined()
  })
})
