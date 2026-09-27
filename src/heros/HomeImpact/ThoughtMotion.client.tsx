'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/** A single, finite accent pass. The server-rendered composition is already complete. */
export function ThoughtMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const figure = root.current
    if (!figure || typeof window.matchMedia !== 'function') return

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    let finished = false

    const sync = () => {
      const introduction = document.documentElement.hasAttribute('data-signature-intro')
      const running =
        visible && !document.hidden && !introduction && !preference.matches && !finished
      if (running) figure.dataset.thoughtStarted = 'true'
      figure.dataset.thoughtRunning = String(running)
    }
    const end = (event: AnimationEvent) => {
      if (event.animationName !== 'thought-travel') return
      finished = true
      figure.dataset.thoughtComplete = 'true'
      sync()
    }
    const reduce = () => {
      // Turning motion off resolves the image immediately and never replays the introduction.
      if (preference.matches && figure.dataset.thoughtStarted) {
        finished = true
        delete figure.dataset.thoughtStarted
      }
      sync()
    }

    const observer =
      typeof IntersectionObserver === 'undefined'
        ? undefined
        : new IntersectionObserver(
            ([entry]) => {
              visible = Boolean(entry?.isIntersecting)
              sync()
            },
            { threshold: 0.15 },
          )
    observer?.observe(figure)
    const introObserver = new MutationObserver(sync)
    introObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-signature-intro'],
    })
    preference.addEventListener('change', reduce)
    document.addEventListener('visibilitychange', sync)
    figure.addEventListener('animationend', end)

    return () => {
      observer?.disconnect()
      introObserver.disconnect()
      preference.removeEventListener('change', reduce)
      document.removeEventListener('visibilitychange', sync)
      figure.removeEventListener('animationend', end)
      delete figure.dataset.thoughtStarted
      delete figure.dataset.thoughtRunning
      delete figure.dataset.thoughtComplete
    }
  }, [])

  return (
    <figure className="home-thought" ref={root}>
      {children}
    </figure>
  )
}
