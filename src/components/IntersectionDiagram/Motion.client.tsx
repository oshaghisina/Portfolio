'use client'

import { useEffect, useRef, type ReactNode } from 'react'

import { cn } from '@/utilities/ui'

/**
 * Single-figure motion host (Capability MotionGrid pattern, without a grid).
 * Static SVG remains complete when motion is off or JS is unavailable.
 */
export function IntersectionMotion({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const root = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const figure = root.current
    if (!figure || typeof window.matchMedia !== 'function') return

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let observer: IntersectionObserver | undefined
    let visible = false

    const sync = () => {
      figure.dataset.capVisible = String(visible && !document.hidden)
    }

    const configure = () => {
      observer?.disconnect()
      visible = false
      figure.dataset.capMotion = String(!preference.matches)
      if (!preference.matches && typeof IntersectionObserver !== 'undefined') {
        observer = new IntersectionObserver(
          ([entry]) => {
            visible = Boolean(entry?.isIntersecting)
            sync()
          },
          { threshold: 0, rootMargin: '0px' },
        )
        observer.observe(figure)
      }
      sync()
    }

    configure()
    preference.addEventListener('change', configure)
    document.addEventListener('visibilitychange', sync)
    return () => {
      observer?.disconnect()
      preference.removeEventListener('change', configure)
      document.removeEventListener('visibilitychange', sync)
      delete figure.dataset.capMotion
      delete figure.dataset.capVisible
    }
  }, [])

  return (
    <figure className={cn('intersection-diagram', className)} dir="ltr" ref={root}>
      {children}
    </figure>
  )
}
