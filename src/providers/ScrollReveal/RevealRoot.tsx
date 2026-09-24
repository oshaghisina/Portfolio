'use client'

import React, { useEffect, useRef } from 'react'

import { registerRevealRoot } from './roots'

/** A scroll-reveal root. Its effect only runs once everything beneath it has hydrated. */
export function RevealRoot({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => (ref.current ? registerRevealRoot(ref.current) : undefined), [])

  return (
    <div className={className} data-reveal-root="" ref={ref}>
      {children}
    </div>
  )
}
