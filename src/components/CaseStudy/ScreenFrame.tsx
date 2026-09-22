import React from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export interface ScreenFrameProps {
  resource: MediaType | string | number | null | undefined
  /** `sizes` for next/image — always pass one; a framed screen is never wider than a column. */
  sizes: string
  priority?: boolean
  className?: string
}

/**
 * The one place a phone capture is framed: a fixed 390×844 viewport, top-aligned so a full-page
 * capture (3,000 px and more) shows its first screen instead of a seven-metre column. A hairline
 * and the panel colour, no device bezel — the screenshot is evidence, not decoration. The frame
 * uses no directional properties, so RTL pages never mirror the product.
 */
export const ScreenFrame: React.FC<ScreenFrameProps> = ({
  className,
  priority,
  resource,
  sizes,
}) => {
  if (!resource || typeof resource !== 'object') return null
  return (
    <Media
      className={cn(
        'relative aspect-[390/844] overflow-hidden rounded-media border border-line bg-panel',
        className,
      )}
      fill
      imgClassName="object-cover object-top"
      priority={priority}
      resource={resource}
      size={sizes}
    />
  )
}
