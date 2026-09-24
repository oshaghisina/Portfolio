/**
 * The observer mounts with the layout, before the page segment hydrates. It must leave the page's
 * server HTML alone until `RevealRoot` reports that React has claimed it.
 */
import { act, cleanup, render } from '@testing-library/react'
import React from 'react'
import { hydrateRoot, type Root } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ScrollReveal } from '@/providers/ScrollReveal'
import { RevealRoot } from '@/providers/ScrollReveal/RevealRoot'

vi.mock('next/navigation', () => ({ usePathname: () => '/fa' }))

const Page = () => (
  <RevealRoot>
    <section>
      <h2>How I work</h2>
      <p>From request to release.</p>
    </section>
  </RevealRoot>
)

const nextFrame = () => act(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())))

let page: Root | undefined

beforeEach(() => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
  )
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe = vi.fn()
      unobserve = vi.fn()
      disconnect = vi.fn()
    },
  )
})

afterEach(() => {
  act(() => page?.unmount())
  page = undefined
  cleanup()
  document.body.innerHTML = ''
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('scroll reveal and hydration', () => {
  it('annotates a page only after it hydrates', async () => {
    const errors = vi.spyOn(console, 'error').mockImplementation(() => {})
    const container = document.createElement('div')
    container.innerHTML = renderToString(<Page />)
    document.body.append(container)
    const heading = container.querySelector('h2')!

    render(<ScrollReveal />)
    await nextFrame()
    expect(heading.hasAttribute('data-reveal-mode')).toBe(false)

    await act(async () => {
      page = hydrateRoot(container, <Page />)
    })
    await nextFrame()

    expect(errors.mock.calls.flat().join(' ')).not.toMatch(/hydrat/i)
    expect(heading.dataset.revealMode).toBe('self')
  })
})
