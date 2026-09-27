'use client'

import React, { useState } from 'react'

import { ProjectArt } from '@/components/ProjectArt'

import type { IndexRow } from './rows'

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
          size="(min-width: 1100px) 30vw, (min-width: 640px) 45vw, 90vw"
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
