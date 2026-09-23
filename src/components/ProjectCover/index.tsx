import React from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

/**
 * Layout aspect of the cover area — `wide` for a full-canvas feature, `tall` for a split column,
 * and three fixed slots for the ruled mosaic. Geometry is always the caller's choice: the media's
 * own aspect ratio never decides a slot's height, or the grid would become masonry.
 */
export type CoverAspect = 'wide' | 'tall' | 'feature' | 'panel' | 'square'

const ASPECT: Record<CoverAspect, string> = {
  wide: 'aspect-[4/3] md:aspect-[21/9]',
  tall: 'aspect-[4/5]',
  feature: 'aspect-[4/3]',
  panel: 'aspect-[16/9]',
  // A square suits a quarter-row cell, but a full-width one on a narrow phone would be a lot of
  // column, so below the mosaic's pairing width the slot is a shallow banner instead.
  square: 'aspect-[16/10] min-[420px]:aspect-square',
}

export interface ProjectCoverProps {
  resource?: MediaType | string | number | null
  aspect?: CoverAspect
  /** Tiny figure label in the frame's corner, e.g. "Figure 01". */
  figure?: string | null
  /** Kind labels printed on the pending plate, e.g. ["Product", "Growth"]. */
  kinds?: string[]
  /** Localised "Project media pending" — required so the plate never falls back to English. */
  pendingLabel: string
  priority?: boolean
  /** `sizes` for next/image — always pass one; the default is far too large for a column. */
  size?: string
  /**
   * Draw the hairline frame. `false` where the parent grid already rules every edge — two
   * adjacent 1px borders would read as one 2px line.
   */
  bordered?: boolean
  className?: string
}

/** Portrait media (phone screens) is framed, never cropped into a landscape slot. */
export const isPortraitMedia = (resource: ProjectCoverProps['resource']): resource is MediaType =>
  typeof resource === 'object' &&
  !!resource &&
  typeof resource.width === 'number' &&
  typeof resource.height === 'number' &&
  resource.height > resource.width

const GRID_STYLE = {
  backgroundImage: 'radial-gradient(var(--line) 1px, transparent 1px)',
  backgroundSize: '1.5rem 1.5rem',
} as const

/**
 * The visual slot of a project everywhere it appears (home feature, `/work` features). Three
 * honest states: real landscape media fills the slot; real portrait media sits contained inside a
 * ruled panel; no media renders the deliberately abstract "media pending" plate — never a mocked
 * screenshot. Square geometry throughout; the imagery supplies the colour, the chrome stays quiet.
 */
export const ProjectCover: React.FC<ProjectCoverProps> = ({
  aspect = 'wide',
  bordered = true,
  className,
  figure,
  kinds = [],
  pendingLabel,
  priority,
  resource,
  size,
}) => {
  const hasMedia = typeof resource === 'object' && !!resource?.url
  const frame = bordered ? 'border border-line' : ''

  if (hasMedia && !isPortraitMedia(resource)) {
    return (
      <Media
        className={cn('relative overflow-hidden bg-panel', frame, ASPECT[aspect], className)}
        fill
        imgClassName="object-cover"
        priority={priority}
        resource={resource}
        size={size}
      />
    )
  }

  if (hasMedia) {
    return (
      <div
        className={cn('relative overflow-hidden bg-panel', frame, ASPECT[aspect], className)}
        style={GRID_STYLE}
      >
        {figure ? <span className="eyebrow absolute top-4 start-5 z-10 text-ink-3 md:top-5 md:start-6">{figure}</span> : null}
        <Media
          className="absolute inset-x-6 top-12 bottom-6 md:inset-x-10 md:top-14 md:bottom-10"
          fill
          imgClassName="object-contain object-center"
          priority={priority}
          resource={resource}
          size={size}
        />
      </div>
    )
  }

  // Provisional, intentionally abstract product plate — not a fabricated screenshot.
  return (
    <div
      className={cn(
        'relative flex items-end overflow-hidden bg-panel p-6 md:p-8',
        frame,
        ASPECT[aspect],
        className,
      )}
      style={GRID_STYLE}
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-brand" />
      <span
        aria-hidden
        className="absolute start-[12%] top-[18%] aspect-square h-[34%] rounded-full border border-track-accent bg-track-accent/75"
      />
      <span aria-hidden className="absolute start-[28%] top-[34%] aspect-[3/2] h-[42%] border border-line bg-background/80" />
      <span aria-hidden className="absolute end-[9%] top-[23%] h-px w-[30%] bg-line" />
      <span aria-hidden className="absolute end-[9%] top-[28%] h-px w-[20%] bg-line" />
      <span aria-hidden className="absolute end-[12%] bottom-[20%] h-[22%] w-px bg-line" />
      <span aria-hidden className="pointer-events-none absolute top-3 end-3 h-3 w-3 border-e border-t border-track-accent" />
      <span aria-hidden className="pointer-events-none absolute bottom-3 start-3 h-3 w-3 border-s border-b border-line" />
      {figure ? <span className="eyebrow absolute top-5 start-6 text-ink-3 md:start-8">{figure}</span> : null}
      <span className="relative z-10 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="eyebrow text-ink-3">{pendingLabel}</span>
        {kinds.length ? <span className="index-code">{kinds.join(' / ')}</span> : null}
      </span>
    </div>
  )
}
