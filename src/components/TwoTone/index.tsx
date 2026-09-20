import { cn } from '@/utilities/ui'
import React from 'react'

/**
 * DS-08 two-tone headline: the lead in ink, the tail in ink-3. Stored as two fields
 * (`lead` / `tail`) so the split survives translation instead of parsing a <span>.
 */
export type TwoToneSize = 'display' | 'h1' | 'h2' | 'h3'

export interface TwoToneProps {
  lead: string
  tail?: string | null
  as?: 'h1' | 'h2' | 'h3' | 'p'
  size?: TwoToneSize
  className?: string
  id?: string
}

// Literal class strings so the Tailwind scanner sees them.
const SIZE: Record<TwoToneSize, string> = {
  display: 'text-display',
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
}

const DEFAULT_SIZE: Record<NonNullable<TwoToneProps['as']>, TwoToneSize> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  p: 'h2',
}

export const TwoTone: React.FC<TwoToneProps> = ({ as = 'h2', className, id, lead, size, tail }) => {
  const Tag = as
  return (
    <Tag className={cn(SIZE[size ?? DEFAULT_SIZE[as]], 'font-medium text-foreground text-balance', className)} id={id}>
      {lead}
      {tail ? (
        <>
          {' '}
          <span className="text-ink-3">{tail}</span>
        </>
      ) : null}
    </Tag>
  )
}
