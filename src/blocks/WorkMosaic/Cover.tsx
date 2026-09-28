import React from 'react'

import type { Project } from '@/payload-types'
import { isPortraitMedia } from '@/components/ProjectCover'
import { ProjectArt } from '@/components/ProjectArt'
import { coverPair } from '@/components/ProjectArt/pair'
import { coverObjectClass } from '@/blocks/ProjectArchive/coverFocus'

import type { MosaicItem } from './Tile'

/**
 * Screen widths on a featured plate, measured at 360–2560 px (R11): a phone screen is 41vw less
 * 16 px below 768 (143 px at 390, within a pixel everywhere), under 25vw to 1099, then 263 px;
 * a desktop screen is at most 80% of the plate. The phone value is tight on purpose: a 390 px
 * phone just fits the 300 px copy at 2×, and a few per cent more would load the 600 px one.
 */
const FEATURED_SIZES = {
  phone: '(min-width: 1100px) 264px, (min-width: 768px) 25vw, calc(41vw - 16px)',
  desktop: '(min-width: 1800px) 572px, (min-width: 1100px) 32vw, (min-width: 768px) 59vw, 76vw',
}

/** A note's thumbnail: 76 px on a phone, 96–120 px from 768. */
const NOTE_SIZES = '(min-width: 768px) 120px, 76px'

/** Real screens at a useful scale. Missing media is typography, never a mock UI. */
export function MosaicCover({
  project,
  override,
  featured,
}: {
  project: Project
  override?: MosaicItem['mediaOverride']
  featured: boolean
}) {
  const { lead, companion } = coverPair(project, override)
  if (!lead) {
    return (
      <div aria-hidden="true" className="work-art work-art-specimen">
        <span className="work-art-initial">{project.slug.charAt(0).toUpperCase()}</span>
        <span className="work-art-rule" />
      </div>
    )
  }
  const tall =
    isPortraitMedia(lead) &&
    !lead.mimeType?.startsWith('video/') &&
    lead.height! / lead.width! > 2.5

  return (
    <ProjectArt
      className="work-art"
      companion={featured ? companion : null}
      // A note's thumbnail is too small for two screens: its lead fills the plate instead.
      fillClassName={featured ? undefined : coverObjectClass(project.slug, tall)}
      lead={lead}
      size={featured ? FEATURED_SIZES : NOTE_SIZES}
      slug={project.slug}
    />
  )
}
