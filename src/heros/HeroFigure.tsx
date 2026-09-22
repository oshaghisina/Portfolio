import React from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

import { HERO_MEDIA_SIZES } from './richText'

/**
 * Hero media, framed inside the sheet. These heroes used to break the page open full-bleed and
 * reach under the sticky header; now the image is a figure like any other piece of evidence.
 */
export const HeroFigure: React.FC<{
  className?: string
  media?: Page['hero']['media']
  priority?: boolean
}> = ({ className, media, priority }) => {
  if (!media || typeof media !== 'object') return null

  return (
    <figure className={cn('mt-12 md:mt-16', className)}>
      <Media
        className="overflow-hidden rounded-media border border-line bg-panel"
        imgClassName="h-auto w-full"
        priority={priority}
        resource={media}
        size={HERO_MEDIA_SIZES}
      />
      {media.caption ? (
        <figcaption className="mt-3 text-caption text-ink-3">
          <RichText data={media.caption} enableGutter={false} enableProse={false} />
        </figcaption>
      ) : null}
    </figure>
  )
}
