'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/utilities/ui'

/** One observer, per-cell playback, no render loop. Static artwork is the complete state. */
export const MotionGrid = ({
  children,
  className = 'grid grid-cols-1 gap-px border-t border-line bg-line sm:grid-cols-2',
}: {
  children: ReactNode
  className?: string
}) => {
  const gridRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid || typeof window.matchMedia !== 'function') return

    const cells = Array.from(grid.children).filter(
      (child): child is HTMLLIElement => child instanceof HTMLLIElement,
    )
    const visible = new Set<Element>()
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let observer: IntersectionObserver | undefined

    const syncPlayback = () => {
      for (const cell of cells) {
        cell.dataset.capVisible = String(visible.has(cell) && !document.hidden)
      }
    }

    const configureMotion = () => {
      observer?.disconnect()
      visible.clear()
      grid.dataset.capMotion = String(!preference.matches)
      if (!preference.matches) {
        if (typeof IntersectionObserver === 'undefined') {
          cells.forEach((cell) => visible.add(cell))
        } else {
          observer = new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) visible.add(entry.target)
                else visible.delete(entry.target)
              }
              syncPlayback()
            },
            { threshold: 0, rootMargin: '0px' },
          )
          cells.forEach((cell) => observer?.observe(cell))
        }
      }
      syncPlayback()
    }

    configureMotion()
    document.addEventListener('visibilitychange', syncPlayback)
    preference.addEventListener('change', configureMotion)
    return () => {
      observer?.disconnect()
      document.removeEventListener('visibilitychange', syncPlayback)
      preference.removeEventListener('change', configureMotion)
      delete grid.dataset.capMotion
      cells.forEach((cell) => delete cell.dataset.capVisible)
    }
  }, [children])

  return (
    <ol className={cn(className, 'cap-motion-grid')} ref={gridRef}>
      {children}
    </ol>
  )
}
