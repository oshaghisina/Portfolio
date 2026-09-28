/**
 * Smooth scrolling follows the visitor's motion setting for the whole visit, not only at start:
 * switching reduced motion on mid-visit hands the page back to native scrolling, and switching it
 * off brings the smooth scroll back, without remounting the page underneath.
 */
import { act, cleanup, render, screen } from '@testing-library/react'
import React, { useEffect } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { LOADER_MIN_MS } from '@/components/Signature/loader'
import { SmoothScrollProvider } from '@/providers/SmoothScroll'
import { InitTheme } from '@/providers/Theme/InitTheme'

const lenis = vi.hoisted(() => ({
  created: 0,
  destroyed: 0,
  pathname: '/',
  scrollTo: vi.fn(),
}))

vi.mock('next/navigation', () => ({ usePathname: () => lenis.pathname }))

// Stands in for `ReactLenis`: one instance per mount, destroyed on unmount.
vi.mock('lenis/react', async () => {
  const { createElement, forwardRef, Fragment, useEffect, useImperativeHandle } =
    await import('react')
  const ReactLenis = forwardRef<unknown, { children?: React.ReactNode }>(({ children }, ref) => {
    useImperativeHandle(ref, () => ({
      content: null,
      lenis: { scrollTo: lenis.scrollTo },
      wrapper: null,
    }))
    useEffect(() => {
      lenis.created += 1
      return () => {
        lenis.destroyed += 1
      }
    }, [])
    return createElement(Fragment, null, children)
  })
  ReactLenis.displayName = 'ReactLenis'
  return { ReactLenis }
})

let reduced = false
const listeners = new Set<() => void>()

function setReduced(value: boolean) {
  act(() => {
    reduced = value
    listeners.forEach((listener) => listener())
  })
}

let pageMounts = 0
function Page() {
  useEffect(() => {
    pageMounts += 1
  }, [])
  return <p>Page</p>
}

const renderProvider = () =>
  render(
    <SmoothScrollProvider>
      <Page />
    </SmoothScrollProvider>,
  )

beforeEach(() => {
  reduced = false
  listeners.clear()
  pageMounts = 0
  lenis.created = 0
  lenis.destroyed = 0
  lenis.pathname = '/'
  lenis.scrollTo.mockClear()
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      get matches() {
        return reduced
      },
      addEventListener: (_event: string, listener: () => void) => listeners.add(listener),
      removeEventListener: (_event: string, listener: () => void) => listeners.delete(listener),
    })),
  )
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe('smooth scroll and the motion setting', () => {
  it('smooth-scrolls while motion is allowed and stops the moment reduced motion is switched on', () => {
    renderProvider()
    const page = screen.getByText('Page')
    expect(lenis.created).toBe(1)

    setReduced(true)
    expect(lenis.destroyed).toBe(1)
    // The page itself stays mounted: same DOM, no second mount.
    expect(screen.getByText('Page')).toBe(page)
    expect(pageMounts).toBe(1)
  })

  it('never starts for reduced motion, and starts once the visitor allows motion again', () => {
    reduced = true
    renderProvider()
    expect(lenis.created).toBe(0)

    setReduced(false)
    expect(lenis.created).toBe(1)
    expect(pageMounts).toBe(1)
  })

  it('stops listening once it unmounts', () => {
    const view = renderProvider()
    expect(listeners.size).toBe(1)
    view.unmount()
    expect(listeners.size).toBe(0)
  })

  it('snaps to the top after a navigation, but not when smooth scrolling comes back on', () => {
    const view = renderProvider()
    lenis.pathname = '/work'
    view.rerender(
      <SmoothScrollProvider>
        <Page />
      </SmoothScrollProvider>,
    )
    expect(lenis.scrollTo).toHaveBeenCalledTimes(1)
    expect(lenis.scrollTo).toHaveBeenCalledWith(0, { force: true, immediate: true })

    // Navigating with reduced motion on, then allowing motion, must not jump the reader to the top.
    setReduced(true)
    lenis.pathname = '/about'
    view.rerender(
      <SmoothScrollProvider>
        <Page />
      </SmoothScrollProvider>,
    )
    setReduced(false)
    expect(lenis.scrollTo).toHaveBeenCalledTimes(1)
  })
})

describe('first paint', () => {
  const themeScript = () => {
    const holder = document.createElement('div')
    holder.innerHTML = renderToStaticMarkup(<InitTheme />)
    return holder
  }

  afterEach(() => document.documentElement.removeAttribute('data-theme'))

  it('lifts the anti-flash transparency when no script can set the theme', () => {
    const markup = renderToStaticMarkup(<InitTheme />)
    expect(markup).toContain('<noscript><style>html{opacity:1!important}</style></noscript>')
  })

  it('sets the theme from an inline script, not one queued for the framework runtime', () => {
    const script = themeScript().querySelector('script#theme-script')
    expect(script?.textContent).not.toContain('__next_s')
    new Function(script!.textContent!)()
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('still shows the page when storage is blocked', () => {
    reduced = false
    vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
      throw new DOMException('blocked', 'SecurityError')
    })
    const script = themeScript().querySelector('script#theme-script')
    expect(() => new Function(script!.textContent!)()).not.toThrow()
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    vi.restoreAllMocks()
  })
})

describe('route loader', () => {
  it('keeps the 1.5 s minimum Sina chose (D-049)', () => {
    expect(LOADER_MIN_MS).toBe(1500)
  })
})
