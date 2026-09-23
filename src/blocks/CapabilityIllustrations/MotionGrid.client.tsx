'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/utilities/ui'

/** A single observer gates all four inexpensive SVG loops. Static art remains complete without JS. */
export const MotionGrid = ({
  children,
  className = 'grid grid-cols-1 gap-px border-t border-line bg-line sm:grid-cols-2',
}: {
  children: ReactNode
  className?: string
}) => {
  const gridRef = useRef<HTMLOListElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    if (typeof IntersectionObserver === 'undefined') {
      const timeout = window.setTimeout(() => setVisible(true), 0)
      return () => window.clearTimeout(timeout)
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    )
    observer.observe(grid)
    return () => observer.disconnect()
  }, [])

  return (
    <ol
      className={cn(className, visible && 'cap-motion-active')}
      ref={gridRef}
    >
      {children}
    </ol>
  )
}
