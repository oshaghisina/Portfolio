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

/** The phone viewport's width over its height. */
const VIEWPORT = 390 / 844

/**
 * The one place a phone capture is framed: a 390×844 viewport, top-aligned so a full-page
 * capture (3,000 px and more) shows its first screen instead of a seven-metre column. A screen
 * drawn shorter than that — an older 360×640 phone — keeps its own shape: the frame only ever
 * clips a capture's foot, never its sides. A hairline and the panel colour, no device bezel — the
 * screenshot is evidence, not decoration. The frame uses no directional properties, so RTL pages
 * never mirror the product.
 */
export const ScreenFrame: React.FC<ScreenFrameProps> = ({
  className,
  priority,
  resource,
  sizes,
}) => {
  if (!resource || typeof resource !== 'object') return null
  const { height, width } = resource
  // Over 1% wider than the viewport, the cover crop would cut into the screen's sides; below
  // that, rounding keeps a row of screens at one height.
  const short = !!width && !!height && width / height > VIEWPORT * 1.01
  return (
    <div
      className={cn(
        'relative aspect-[390/844] overflow-hidden rounded-media border border-line bg-panel',
        className,
      )}
      style={short ? { aspectRatio: `${width} / ${height}` } : undefined}
    >
      <Media
        fill
        htmlElement={null}
        imgClassName="object-cover object-top"
        priority={priority}
        resource={resource}
        size={sizes}
      />
    </div>
  )
}
