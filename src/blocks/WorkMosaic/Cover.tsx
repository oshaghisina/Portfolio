import React from 'react'

import type { Project } from '@/payload-types'
import { isPortraitMedia } from '@/components/ProjectCover'
import { ProjectArt } from '@/components/ProjectArt'
import { coverPair } from '@/components/ProjectArt/pair'
import { coverObjectClass } from '@/blocks/ProjectArchive/coverFocus'

import type { MosaicItem } from './Tile'

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
      size={
        featured
          ? '(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 75vw'
          : '(min-width: 640px) 120px, 90vw'
      }
      slug={project.slug}
    />
  )
}
