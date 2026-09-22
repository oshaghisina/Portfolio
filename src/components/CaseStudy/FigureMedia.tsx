import React from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { isPortraitMedia } from '@/components/ProjectCover'
import { cn } from '@/utilities/ui'

import { PLATE_STYLE } from './plate'
import { ScreenFrame } from './ScreenFrame'

export type FigureTreatment = 'auto' | 'screen' | 'plain' | 'diagram'
export type ResolvedTreatment = Exclude<FigureTreatment, 'auto'>

/** `auto` is decided by the media itself: portrait captures are screens, everything else is plain. */
export const resolveTreatment = (
  treatment: FigureTreatment | null | undefined,
  resource: MediaType | string | number | null | undefined,
): ResolvedTreatment => {
  if (treatment && treatment !== 'auto') return treatment
  return isPortraitMedia(resource) ? 'screen' : 'plain'
}

export interface FigureMediaProps {
  resource: MediaType | string | number | null | undefined
  treatment?: FigureTreatment | null
  sizes: string
  priority?: boolean
  /** `full` puts a screen on its own plate; inside a grid the cell is the plate. */
  standalone?: boolean
  className?: string
}

/**
 * One visual, framed by what it is: a screen (phone viewport), a plain image (natural aspect,
 * hairline), or a diagram (natural aspect on the drafting plate). Layout components decide the
 * grid; this decides the treatment — the only two kinds of choice the system exposes.
 */
export const FigureMedia: React.FC<FigureMediaProps> = ({
  className,
  priority,
  resource,
  sizes,
  standalone,
  treatment,
}) => {
  if (!resource || typeof resource !== 'object') return null
  const resolved = resolveTreatment(treatment, resource)

  if (resolved === 'screen') {
    const frame = (
      <ScreenFrame
        className="mx-auto w-full max-w-xs"
        priority={priority}
        resource={resource}
        sizes={sizes}
      />
    )
    return standalone ? (
      <div
        className={cn('border border-line bg-panel px-6 py-8 sm:px-10 sm:py-12', className)}
        style={PLATE_STYLE}
      >
        {frame}
      </div>
    ) : (
      <div className={className}>{frame}</div>
    )
  }

  if (resolved === 'diagram') {
    return (
      <div className={cn('border border-line bg-panel p-4 sm:p-8', className)} style={PLATE_STYLE}>
        <Media imgClassName="h-auto w-full" priority={priority} resource={resource} size={sizes} />
      </div>
    )
  }

  return (
    <Media
      className={cn('overflow-hidden rounded-media border border-line bg-panel', className)}
      imgClassName="h-auto w-full"
      priority={priority}
      resource={resource}
      size={sizes}
    />
  )
}
