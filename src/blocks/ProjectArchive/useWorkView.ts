'use client'

import type Lenis from 'lenis'
import { useLenis } from 'lenis/react'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import { workRowId } from './rows'
import {
  parseWorkView,
  rememberWorkReturn,
  serializeWorkView,
  workReturnTarget,
  type WorkReturnMark,
  type WorkView,
  type WorkViewOptions,
} from './workView'

type WriteMode = 'push' | 'replace'

interface BrowseState {
  view: WorkView
  /** The URL view last rendered from the router. */
  seen: string
  /** Views this page wrote that the router may still echo back; anything else is a navigation. */
  written: string[]
  write: WriteMode | null
  writeId: number
}

/** Typing settles for this long before the URL follows, so history isn't rewritten per key. */
const TYPING_DELAY = 250

/**
 * Writes through the native History API, which Next keeps in step with `useSearchParams` without
 * a server round trip or a scroll to the top. `data` marks the entry (see `leave`).
 */
function writeWorkUrl(view: WorkView, mode: WriteMode, data: object | null = null) {
  const { hash, pathname, search } = window.location
  const query = serializeWorkView(view, search)
  const href = `${pathname}${query ? `?${query}` : ''}`
  if (!data && href === `${pathname}${search}${hash}`) return
  try {
    if (mode === 'push') window.history.pushState(data, '', href)
    else window.history.replaceState(data, '', href)
  } catch {
    // Safari caps history writes per second; the list on screen is right, only the URL lags.
  }
}

/** Frames to wait for the list to hold still before giving up; the browser's own position stands. */
const SETTLE_FRAMES = 120
const VISITOR_INPUT = ['wheel', 'touchstart', 'pointerdown', 'keydown'] as const

/** Layout position in the page, ignoring the scroll-reveal's entrance `translate`. */
function pageTop(element: HTMLElement): number {
  let top = 0
  for (let node: HTMLElement | null = element; node; node = node.offsetParent as HTMLElement | null)
    top += node.offsetTop
  return top
}

/**
 * Puts the row back where it was in the viewport, or just under the sticky header. It measures
 * only once the route loader is gone and the row has held still for two frames, so a list that is
 * still laying out can't send the page elsewhere, and it stands down as soon as the visitor
 * scrolls, taps or types. Returns a cancel function.
 */
function landOnRow({ slug, top }: WorkReturnMark, getLenis: () => Lenis | undefined) {
  let frame = 0
  let frames = 0
  let last: number | null = null
  const stop = () => {
    cancelAnimationFrame(frame)
    for (const type of VISITOR_INPUT) window.removeEventListener(type, stop)
  }
  const step = () => {
    const row = document.getElementById(workRowId(slug))
    const loading = document.querySelector('[role="status"][aria-busy="true"]')
    const at = row && row.getClientRects().length && !loading ? pageTop(row) : null
    if (!row || at === null || at !== last) {
      last = at
      frames += 1
      if (frames < SETTLE_FRAMES) frame = requestAnimationFrame(step)
      else stop()
      return
    }
    stop()
    const margin = Number.parseFloat(getComputedStyle(row).scrollMarginTop) || 0
    const offset = top === null ? margin : Math.min(Math.max(top, margin), window.innerHeight * 0.6)
    const y = Math.max(0, at - offset)
    if (Math.abs(window.scrollY - y) < 2) return
    // Lenis owns wheel scrolling; moving it keeps its target in step with the real position. Its
    // size is re-measured first: it may still hold the route loader's short sheet and clamp to it.
    const lenis = getLenis()
    if (lenis) {
      lenis.resize()
      lenis.scrollTo(y, { immediate: true, force: true })
    } else window.scrollTo({ top: y, behavior: 'instant' })
  }
  for (const type of VISITOR_INPUT) window.addEventListener(type, stop, { passive: true })
  frame = requestAnimationFrame(step)
  return stop
}

/**
 * The Work archive's view, read from the URL on the server and on first paint (no flash of the
 * unfiltered list), then kept in React state and mirrored back: `push` for discrete choices,
 * `replace` while typing. Back/Forward and same-page links re-read the URL.
 */
export function useWorkView(options: WorkViewOptions) {
  const params = useSearchParams()
  const urlKey = serializeWorkView(parseWorkView(params, options))
  const [state, setState] = useState<BrowseState>(() => ({
    view: parseWorkView(params, options),
    seen: urlKey,
    written: [],
    write: null,
    writeId: 0,
  }))

  if (state.seen !== urlKey) {
    const echo = state.written.lastIndexOf(urlKey)
    setState(
      echo >= 0
        ? { ...state, seen: urlKey, written: state.written.slice(echo) }
        : {
            ...state,
            view: parseWorkView(params, options),
            seen: urlKey,
            written: [],
            write: null,
          },
    )
  }

  const update = useCallback((patch: Partial<WorkView>, mode: WriteMode) => {
    setState((current) => {
      const view = { ...current.view, ...patch }
      return {
        ...current,
        view,
        written: [...current.written, serializeWorkView(view)].slice(-32),
        write: mode,
        writeId: current.writeId + 1,
      }
    })
  }, [])

  // Pending typing is dropped when the view is re-read or the page unmounts, so it can never
  // land on the next page's history entry.
  const { view, write, writeId } = state
  useEffect(() => {
    if (!write) return
    if (write === 'push') {
      writeWorkUrl(view, write)
      return
    }
    const timer = window.setTimeout(() => writeWorkUrl(view, write), TYPING_DELAY)
    return () => window.clearTimeout(timer)
  }, [view, write, writeId])

  // Back/Forward between two views of this page. Next re-renders the params too; this is the
  // same answer, sooner, and it forgets echoes so an old view can't be mistaken for one.
  const optionsRef = useRef(options)
  useEffect(() => {
    optionsRef.current = options
  }, [options])
  useEffect(() => {
    const home = window.location.pathname
    const onPopState = () => {
      if (window.location.pathname !== home) return
      const next = parseWorkView(new URLSearchParams(window.location.search), optionsRef.current)
      setState((current) => ({ ...current, view: next, written: [], write: null }))
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  // Arriving on a row (Back from a study, "All work", a search result): land on it once the list
  // has settled, after Next's own hash jump and the smooth-scroll reset on a path change.
  const lenis = useLenis()
  const lenisRef = useRef(lenis)
  useEffect(() => {
    lenisRef.current = lenis
  }, [lenis])
  useEffect(() => {
    const target = workReturnTarget(window.history.state, window.location.hash)
    return target ? landOnRow(target, () => lenisRef.current) : undefined
  }, [])

  /**
   * Before a study opens: pin the current view to this history entry together with the row, so
   * Back lands on it, and remember both for the study's "All work" link.
   */
  const leave = useCallback(
    (slug: string, row: Element | null) => {
      const top = row ? Math.round(row.getBoundingClientRect().top) : null
      const query = serializeWorkView(view)
      rememberWorkReturn({ path: `${window.location.pathname}${query ? `?${query}` : ''}`, slug })
      writeWorkUrl(view, 'replace', { workReturn: { slug, top } satisfies WorkReturnMark })
    },
    [view],
  )

  return { view, update, leave }
}
