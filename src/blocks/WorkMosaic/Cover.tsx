import React from 'react'

import type { Media as MediaType, Project } from '@/payload-types'
import { Media } from '@/components/Media'
import { isPortraitMedia } from '@/components/ProjectCover'
import { projectMedia } from '@/components/ProjectCover/media'
import { coverObjectClass } from '@/blocks/ProjectArchive/coverFocus'

import type { MosaicItem } from './Tile'

const imageMedia = (media: unknown): media is MediaType =>
  typeof media === 'object' && media !== null && 'url' in media && Boolean(media.url)

/** An explicit override must not acquire unrelated companion imagery. */
export function mosaicMedia(project: Project, override?: MosaicItem['mediaOverride']) {
  const lead = imageMedia(override) ? override : projectMedia(project)
  if (!imageMedia(lead)) return { lead: null, companion: null }
  const hero = project.hero?.items?.map((item) => item.media) ?? []
  // Hero's second frame is supporting evidence; its first often repeats the cover in full.
  const companion = imageMedia(override)
    ? null
    : ([...hero.slice(1), hero[0]].find(
        (media): media is MediaType =>
          imageMedia(media) &&
          media.id !== lead.id &&
          media.url !== lead.url &&
          !media.mimeType?.startsWith('video/'),
      ) ?? null)
  return { lead, companion }
}

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
  const { lead, companion } = mosaicMedia(project, override)
  if (!lead) {
    return (
      <div aria-hidden="true" className="work-art work-art-specimen">
        <span className="work-art-initial">
          {project.slug.charAt(0).toUpperCase()}
        </span>
        <span className="work-art-rule" />
      </div>
    )
  }
  const portrait = isPortraitMedia(lead) && !lead.mimeType?.startsWith('video/')
  const tall = portrait && lead.height! / lead.width! > 2.5
  const paired = featured && portrait && isPortraitMedia(companion)
  const imageSizes = featured
    ? '(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 75vw'
    : '(min-width: 640px) 120px, 90vw'

  return (
    <div
      className="work-art"
      data-portrait={portrait || undefined}
      data-paired={paired || undefined}
    >
      {paired ? (
        <Media
          className="work-art-screen work-art-companion"
          resource={companion}
          fill
          imgClassName="object-cover object-top"
          size={imageSizes}
        />
      ) : null}
      <Media
        className="work-art-screen work-art-lead"
        resource={lead}
        fill
        imgClassName={
          featured && portrait && !tall ? 'object-contain' : coverObjectClass(project.slug, tall)
        }
        size={imageSizes}
      />
    </div>
  )
}
