import React from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

import { projectArt } from './art'
import { artLayout, isPhoneScreen } from './pair'
import './art.css'

export interface ProjectArtProps {
  slug: string
  lead: MediaType
  companion?: MediaType | null
  /** `sizes` for next/image — the plate's rendered width is a fair upper bound. */
  size?: string
  priority?: boolean
  /** The surrounding card already names the project, so the screens stay silent. */
  decorative?: boolean
  /** Show only the lead, filling the plate with this object-fit class — for thumbnails too small for two screens. */
  fillClassName?: string
  onImageError?: () => void
  className?: string
}

/**
 * A project's cover everywhere it is previewed (Home, /work, the next-project card): real screens
 * on a plate tinted with the product's own colour. The lead stands in front on the right and its
 * companion leans behind it on the left; desktop screens sit behind a phone or each other. The
 * lead comes first in the DOM whatever the layout, so the cover a reader hears is the cover.
 */
export const ProjectArt: React.FC<ProjectArtProps> = ({
  className,
  companion = null,
  decorative,
  fillClassName,
  lead,
  onImageError,
  priority,
  size,
  slug,
}) => {
  const style = projectArt(slug)
  const layout = fillClassName ? 'fill' : artLayout({ lead, companion })
  const screens =
    companion && layout !== 'fill'
      ? ([
          ['lead', lead],
          ['companion', companion],
        ] as const)
      : ([['lead', lead]] as const)

  return (
    <div
      aria-hidden={decorative || undefined}
      className={cn('project-art', className)}
      data-layout={layout}
      style={{ '--art-tint': style.tint } as React.CSSProperties}
    >
      {screens.map(([role, media]) => {
        const phone = isPhoneScreen(media)
        const focus = (role === 'lead' ? style.leadFocus : style.companionFocus) ?? 'object-top'
        const fit = fillClassName ?? (phone ? `object-cover ${focus}` : 'object-cover object-top')
        return (
          <Media
            alt={decorative || role === 'companion' ? '' : undefined}
            className={cn(
              'project-art-screen',
              `project-art-${role}`,
              phone ? 'project-art-phone' : 'project-art-desktop',
            )}
            fill
            imgClassName={fit}
            key={role}
            onError={onImageError}
            priority={priority && role === 'lead'}
            resource={media}
            size={size}
            videoClassName={fit}
          />
        )
      })}
    </div>
  )
}
