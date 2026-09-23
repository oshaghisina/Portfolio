import { cn } from '@/utilities/ui'
import * as React from 'react'

import { formCellClassName } from '../fieldStyles'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  const numeric = typeof width === 'string' ? Number.parseFloat(width) : width
  const half = typeof numeric === 'number' && numeric > 0 && numeric <= 50

  return (
    <div
      className={cn(
        formCellClassName,
        half ? 'basis-full md:basis-1/2 md:odd:border-e md:odd:border-line' : 'basis-full',
        className,
      )}
    >
      {children}
    </div>
  )
}
