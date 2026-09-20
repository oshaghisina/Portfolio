import { cn } from '@/utilities/ui'
import React from 'react'

/**
 * DS-13 editorial grid: heading side 5/12, body side 7/12 at `lg`, stacked below.
 * Its own file (no Lexical import) so the style guide and tests can use it directly.
 */
export const EditorialGrid: React.FC<{ children: React.ReactNode[]; className?: string }> = ({ children, className }) => (
  <div className={cn('grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-16', className)}>
    {children.map((child, index) => (
      <div
        className={cn(index === 0 ? 'lg:col-span-5' : 'lg:col-span-7 lg:col-start-6', index > 0 && 'max-w-measure')}
        key={index}
      >
        {child}
      </div>
    ))}
  </div>
)
