import React from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { isPortraitMedia, ProjectCover } from '@/components/ProjectCover'
import { cn } from '@/utilities/ui'

import { COVER_FOCUS } from './coverFocus'

interface WorkCoverProps {
  resource?: MediaType | string | number | null
  slug: string
  index: string
  primary: boolean
  kinds: string[]
  pendingLabel: string
  className?: string
}

const GRID_STYLE = {
  backgroundImage: 'radial-gradient(var(--line) 1px, transparent 1px)',
  backgroundSize: '1.5rem 1.5rem',
} as const

/**
 * Homepage covers stay unchanged. In the archive, long source captures get one large, honest
 * detail crop and one complete overview. The overview carries the image alt; the crop is visual
 * emphasis, not a second announcement of the same media to screen readers.
 */
export const WorkCover: React.FC<WorkCoverProps> = ({
  className,
  index,
  kinds,
  pendingLabel,
  primary,
  resource,
  slug,
}) => {
  const aspect = primary ? 'wide' : 'tall'
  const hasPortrait = isPortraitMedia(resource) && !resource.mimeType?.startsWith('video/')
  const ratio = hasPortrait ? resource.height! / resource.width! : 0

  if (!hasPortrait || ratio < 1.65 || !resource.url) {
    return (
      <ProjectCover
        aspect={aspect}
        className={cn(!primary && 'max-lg:aspect-[5/4]', className)}
        figure={index}
        kinds={kinds}
        pendingLabel={pendingLabel}
        priority={primary}
        resource={resource}
        size={primary ? '(min-width: 768px) 78vw, 100vw' : '(min-width: 1024px) 39vw, 100vw'}
      />
    )
  }

  const focus = COVER_FOCUS[slug] ?? 'object-center'
  const detailSize = primary ? '(min-width: 768px) 35vw, 68vw' : '(min-width: 1024px) 27vw, 68vw'
  const overviewSize = primary ? '(min-width: 768px) 18vw, 25vw' : '(min-width: 1024px) 11vw, 25vw'

  return (
    <div
      className={cn(
        'relative isolate overflow-hidden border border-line bg-panel',
        primary ? 'aspect-[4/3] md:aspect-[21/9]' : 'aspect-[5/4] lg:aspect-[4/5]',
        className,
      )}
      style={GRID_STYLE}
    >
      <span className="index-code absolute top-4 start-5 z-10 text-ink-3 md:top-5 md:start-7">{index}</span>
      <div
        className={cn(
          'absolute inset-x-4 top-11 bottom-4 grid gap-3 md:inset-x-7 md:top-14 md:bottom-7 md:gap-4',
          primary
            ? 'grid-cols-[minmax(0,1fr)_minmax(4.5rem,0.36fr)] md:grid-cols-[minmax(0,1fr)_minmax(8rem,0.4fr)_minmax(0,1fr)]'
            : 'grid-cols-[minmax(0,1fr)_minmax(4.25rem,0.48fr)]',
        )}
      >
        <div aria-hidden="true" className="relative overflow-hidden border border-line bg-background">
          <Media
            className="relative h-full w-full"
            fill
            imgClassName={cn('object-cover', focus)}
            priority={primary}
            resource={resource}
            size={detailSize}
            usage="thumbnail"
          />
        </div>
        <div className="relative overflow-hidden">
          <Media
            className="relative h-full w-full"
            fill
            imgClassName="object-contain"
            resource={resource}
            size={overviewSize}
            usage="thumbnail"
          />
        </div>
        {primary ? (
          <div aria-hidden="true" className="relative hidden overflow-hidden border border-line bg-background md:block">
            <Media
              className="relative h-full w-full"
              fill
              imgClassName="object-cover object-[center_86%]"
              resource={resource}
              size={detailSize}
              usage="thumbnail"
            />
          </div>
        ) : null}
      </div>
      <span aria-hidden="true" className="absolute bottom-0 start-0 h-px w-1/5 bg-brand" />
    </div>
  )
}
