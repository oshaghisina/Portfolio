import React from 'react'
import { act, cleanup, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { MotionGrid } from '@/blocks/CapabilityIllustrations/MotionGrid.client'

let reduced = false
let hidden = false
let onPreferenceChange: () => void
let onIntersection: IntersectionObserverCallback
const observe = vi.fn()
const disconnect = vi.fn()
const removePreferenceListener = vi.fn()

function renderGrid() {
  const view = render(
    <MotionGrid>
      <li>Discovery</li>
      <li>Service</li>
    </MotionGrid>,
  )
  const grid = view.container.querySelector('ol')!
  const cells = Array.from(grid.children) as HTMLLIElement[]
  return { ...view, grid, cells }
}

function enter(target: Element, isIntersecting: boolean) {
  act(() =>
    onIntersection(
      [{ target, isIntersecting } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    ),
  )
}

beforeEach(() => {
  reduced = false
  hidden = false
  vi.clearAllMocks()
  vi.spyOn(document, 'hidden', 'get').mockImplementation(() => hidden)
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      get matches() {
        return reduced
      },
      addEventListener: (_event: string, callback: () => void) => {
        onPreferenceChange = callback
      },
      removeEventListener: removePreferenceListener,
    })),
  )
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(callback: IntersectionObserverCallback) {
        onIntersection = callback
      }
      observe = observe
      disconnect = disconnect
    },
  )
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('capability motion lifecycle', () => {
  it('runs only the visible cell and pauses it when it leaves the viewport', () => {
    const { grid, cells } = renderGrid()
    expect(grid.dataset.capMotion).toBe('true')
    expect(cells.every((cell) => cell.dataset.capVisible === 'false')).toBe(true)
    enter(cells[0], true)
    expect(cells.map((cell) => cell.dataset.capVisible)).toEqual(['true', 'false'])
    enter(cells[0], false)
    enter(cells[1], true)
    expect(cells.map((cell) => cell.dataset.capVisible)).toEqual(['false', 'true'])
  })

  it('pauses a hidden browser tab and resumes only the cells still in view', () => {
    const { cells } = renderGrid()
    enter(cells[0], true)
    hidden = true
    act(() => document.dispatchEvent(new Event('visibilitychange')))
    expect(cells.map((cell) => cell.dataset.capVisible)).toEqual(['false', 'false'])
    hidden = false
    act(() => document.dispatchEvent(new Event('visibilitychange')))
    expect(cells.map((cell) => cell.dataset.capVisible)).toEqual(['true', 'false'])
  })

  it('keeps reduced-motion artwork static and handles preference changes live', () => {
    reduced = true
    const { grid, cells } = renderGrid()
    expect(grid.dataset.capMotion).toBe('false')
    expect(observe).not.toHaveBeenCalled()
    reduced = false
    act(() => onPreferenceChange())
    expect(observe).toHaveBeenCalledTimes(2)
    enter(cells[0], true)
    reduced = true
    act(() => onPreferenceChange())
    expect(grid.dataset.capMotion).toBe('false')
    expect(cells[0].dataset.capVisible).toBe('false')
    expect(disconnect).toHaveBeenCalled()
  })

  it('cleans up observation and preference listeners on unmount', () => {
    const { unmount } = renderGrid()
    unmount()
    expect(disconnect).toHaveBeenCalledOnce()
    expect(removePreferenceListener).toHaveBeenCalledWith('change', onPreferenceChange)
  })

  it('retains readable content when browser motion APIs are unavailable', () => {
    vi.stubGlobal('matchMedia', undefined)
    const { grid } = renderGrid()
    expect(grid.textContent).toBe('DiscoveryService')
    expect(grid.dataset.capMotion).toBeUndefined()
    expect(observe).not.toHaveBeenCalled()
  })

  it('supports browsers without IntersectionObserver while still pausing hidden tabs', () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    const { cells } = renderGrid()
    expect(cells.every((cell) => cell.dataset.capVisible === 'true')).toBe(true)
    hidden = true
    act(() => document.dispatchEvent(new Event('visibilitychange')))
    expect(cells.every((cell) => cell.dataset.capVisible === 'false')).toBe(true)
  })
})
