import React from 'react'

import type { Project } from '@/payload-types'

import { cn } from '@/utilities/ui'

import type { CaseStudyCopy } from './copy'
import { FigureMedia } from './FigureMedia'
import { PLATE_STYLE, pad } from './plate'
import { ScreenFrame } from './ScreenFrame'

export interface CaseStudyHeroProps {
  hero: Project['hero'] | null | undefined
  copy: CaseStudyCopy
  className?: string
}

/** Whether a project's hero has at least one populated visual — the header's figure numbering starts after it. */
export const hasHeroMedia = (hero: Project['hero'] | null | undefined): boolean =>
  (hero?.items ?? []).some((item) => typeof item.media === 'object' && !!item.media)

/**
 * The dominant visual after the header. One item renders as a single figure (portrait captures on
 * their plate, landscape media full width). Two or three items become one composition: a row of
 * framed screens on the drafting plate — on phones only the first screen shows, large, so the hero
 * stays substantial instead of shrinking to three unreadable columns. Item 0 loads with priority.
 */
export const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({ className, copy, hero }) => {
  const items = (hero?.items ?? []).filter((item) => typeof item.media === 'object' && !!item.media)
  if (!items.length) return null
  const label = `${copy.figure} ${pad(1)}`

  return (
    <figure className={className}>
      {items.length === 1 ? (
        <FigureMedia
          priority
          resource={items[0]!.media}
          sizes="(min-width: 86rem) 76rem, 100vw"
          standalone
          treatment="auto"
        />
      ) : (
        <div
          className="relative grid grid-cols-1 gap-4 border border-line bg-panel px-4 pt-11 pb-4 sm:grid-cols-3 sm:gap-6 sm:px-8 sm:pt-12 sm:pb-8 lg:gap-10 lg:px-12 lg:pt-14 lg:pb-12"
          style={PLATE_STYLE}
        >
          <span className="eyebrow absolute top-4 start-4 text-ink-3 sm:start-6 lg:start-8">
            {label}
          </span>
          {items.map((item, i) => (
            <ScreenFrame
              className={cn(
                'w-full',
                i === 0 ? 'mx-auto max-w-[17rem] sm:max-w-none' : 'max-sm:hidden',
              )}
              key={item.id ?? i}
              priority={i === 0}
              resource={item.media}
              sizes="(min-width: 640px) 30vw, 70vw"
            />
          ))}
        </div>
      )}
      {hero?.caption ? (
        <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-caption text-ink-3">
          <span className="eyebrow text-ink-3">{label}</span>
          <span>{hero.caption}</span>
        </figcaption>
      ) : null}
    </figure>
  )
}
