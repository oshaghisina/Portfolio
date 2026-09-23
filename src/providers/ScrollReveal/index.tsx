'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { collectRevealTargets } from './targets'

/** One observer for the whole public page. Content is fully visible until JS opts it in. */
export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || typeof window.matchMedia !== 'function')
      return

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const registered = new Map<HTMLElement, boolean>()
    const pending = new Set<HTMLElement>()
    let observer: IntersectionObserver | undefined
    let mutations: MutationObserver | undefined
    let frame = 0

    const show = (element: HTMLElement, immediate = false, delay = 0) => {
      element.style.setProperty('--reveal-delay', `${delay}ms`)
      element.dataset.revealState = immediate ? 'visible' : 'entering'
      pending.delete(element)
      observer?.unobserve(element)
    }

    const showAll = () => {
      for (const element of registered.keys()) show(element, true)
    }

    const revealDestination = (target: Element) => {
      for (const element of pending) {
        if (element.contains(target) || target.contains(element)) show(element, true)
      }
    }

    const revealHash = (hash = window.location.hash) => {
      try {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)))
        if (target) revealDestination(target)
      } catch {
        // A malformed fragment must not prevent the rest of the document from appearing.
      }
    }

    const onFocus = (event: FocusEvent) => {
      if (event.target instanceof Element) revealDestination(event.target)
    }
    const onHashChange = () => revealHash()
    const onAnimationEnd = (event: AnimationEvent) => {
      if (event.animationName !== 'section-arrive' || !(event.target instanceof Element)) return
      const element = event.target.closest<HTMLElement>('[data-reveal-state="entering"]')
      if (element && registered.has(element)) show(element, true)
    }
    const onAnchorClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return
      const anchor = event.target.closest<HTMLAnchorElement>('a[href*="#"]')
      if (!anchor) return
      const url = new URL(anchor.href, window.location.href)
      if (
        url.origin === location.origin &&
        url.pathname === location.pathname &&
        url.search === location.search
      ) {
        revealHash(url.hash)
      }
    }

    const scan = () => {
      frame = 0
      if (preference.matches) return

      const targets = Array.from(
        document.querySelectorAll<HTMLElement>('[data-reveal-root]'),
      ).flatMap(collectRevealTargets)
      const current = new Set(targets.map(({ element }) => element))
      // A streamed container can become a collection of smaller sections. Release its old
      // entrance so newly registered children can never sit behind a hidden ancestor.
      for (const element of registered.keys()) {
        if (!element.isConnected || !current.has(element)) {
          observer?.unobserve(element)
          pending.delete(element)
          registered.delete(element)
          delete element.dataset.revealState
          delete element.dataset.revealMode
          element.style.removeProperty('--reveal-delay')
        }
      }

      // Read geometry together, then write state. Nothing in the current viewport is hidden.
      const additions = targets
        .filter(({ element }) => !registered.has(element))
        .map((target) => ({ ...target, rect: target.element.getBoundingClientRect() }))

      for (const { element, contents, rect } of additions) {
        registered.set(element, contents)
        element.dataset.revealMode = contents ? 'contents' : 'self'
        if (rect.top < window.innerHeight || rect.width === 0 || rect.height === 0) {
          show(element, true)
        } else {
          element.dataset.revealState = 'pending'
          pending.add(element)
          observer?.observe(element)
        }
      }
      revealHash()
    }

    const configure = () => {
      observer?.disconnect()
      mutations?.disconnect()
      cancelAnimationFrame(frame)
      frame = 0
      if (preference.matches) {
        showAll()
        return
      }

      observer = new IntersectionObserver(
        (entries) => {
          const rows = new Map<Element | null, { top: number; count: number }>()
          for (const entry of entries) {
            const element = entry.target as HTMLElement
            if (!pending.has(element) || !entry.isIntersecting) continue
            const parent = element.parentElement
            const previous = rows.get(parent)
            const top = entry.boundingClientRect.top
            const count = previous && Math.abs(previous.top - top) < 32 ? previous.count + 1 : 0
            rows.set(parent, { top, count })
            show(element, false, Math.min(count, 3) * 65)
          }
        },
        { threshold: 0, rootMargin: '0px 0px -32px 0px' },
      )

      scan()
      // Handles streamed routes, search/filter updates and CMS live preview. Text animation and
      // style changes do not trigger a scan; a single frame batches structural changes.
      mutations = new MutationObserver((records) => {
        const structural = records.some((record) =>
          [...record.addedNodes, ...record.removedNodes].some(
            (node) => node instanceof HTMLElement,
          ),
        )
        if (structural && !frame) frame = requestAnimationFrame(scan)
      })
      mutations.observe(document.body, { childList: true, subtree: true })
    }

    configure()
    preference.addEventListener('change', configure)
    document.addEventListener('focusin', onFocus)
    document.addEventListener('animationend', onAnimationEnd)
    document.addEventListener('click', onAnchorClick, true)
    window.addEventListener('hashchange', onHashChange)
    window.addEventListener('beforeprint', showAll)

    return () => {
      observer?.disconnect()
      mutations?.disconnect()
      cancelAnimationFrame(frame)
      preference.removeEventListener('change', configure)
      document.removeEventListener('focusin', onFocus)
      document.removeEventListener('animationend', onAnimationEnd)
      document.removeEventListener('click', onAnchorClick, true)
      window.removeEventListener('hashchange', onHashChange)
      window.removeEventListener('beforeprint', showAll)
      for (const element of registered.keys()) {
        delete element.dataset.revealState
        delete element.dataset.revealMode
        element.style.removeProperty('--reveal-delay')
      }
    }
  }, [pathname])

  return null
}
