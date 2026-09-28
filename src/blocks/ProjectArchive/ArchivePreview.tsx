'use client'

import React, { useState } from 'react'

import { ProjectArt } from '@/components/ProjectArt'

import type { IndexRow } from './rows'

/**
 * Screen widths on a grid card's plate, measured at 360–2560 px (R11). The list view's 144 px
 * thumbnail is smaller still, so these stay an upper bound there.
 */
const PREVIEW_SIZES = {
  phone:
    '(min-width: 1800px) 156px, (min-width: 1100px) 9vw, (min-width: 768px) 13.5vw, (min-width: 640px) 17vw, 35vw',
  desktop:
    '(min-width: 1800px) 314px, (min-width: 1100px) 18vw, (min-width: 768px) 26.5vw, (min-width: 640px) 34vw, 70vw',
}

/** Fixed geometry, actual source images. Entries without images get an honest type specimen. */
export function ArchivePreview({ row }: { row: IndexRow }) {
  const art = [row.cover?.url, row.companion?.url].join(' ')
  const [failedArt, setFailedArt] = useState<string | null>(null)
  const initials = row.title
    .split(/[\s–—-]+/)
    .slice(0, 2)
    .map((word) => [...word][0])
    .join('')

  return (
    <div aria-hidden="true" className="archive-preview">
      <span className="archive-preview-index index-code">{row.index}</span>
      {row.cover && failedArt !== art ? (
        <ProjectArt
          className="archive-preview-media"
          companion={row.companion}
          decorative
          lead={row.cover}
          onImageError={() => setFailedArt(art)}
          size={PREVIEW_SIZES}
          slug={row.slug}
        />
      ) : (
        <div className="archive-specimen">
          <span className="archive-specimen-initials" dir="auto">
            {initials}
          </span>
          <span className="archive-specimen-company" dir="auto">
            {row.company}
          </span>
          <span className="archive-specimen-kind eyebrow">
            {row.kinds.map((kind) => kind.label).join(' / ')}
          </span>
        </div>
      )}
      <span className="archive-preview-corner" />
    </div>
  )
}
