import { cn } from '@/utilities/ui'
import React from 'react'

import { SectionHeader } from '@/components/SectionHeader'

/** A style-guide chapter: section opener + content. */
export const Spec: React.FC<{
  index: string
  tag: string
  lead: string
  tail?: string
  lede?: string
  id: string
  children: React.ReactNode
  className?: string
}> = ({ children, className, id, index, lead, lede, tag, tail }) => (
  <section className={cn('flex flex-col gap-10', className)} id={id}>
    <SectionHeader index={index} lead={lead} lede={lede} tag={tag} tail={tail} />
    {children}
  </section>
)

/** Small mono caption under a specimen: `--text-h1 · clamp(…)`. */
export const Var: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <code className={cn('index-code normal-case tracking-normal break-all', className)} dir="ltr">
    {children}
  </code>
)
