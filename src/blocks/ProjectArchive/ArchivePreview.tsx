'use client'

import Image from 'next/image'
import React, { useState } from 'react'

import { getMediaUrl } from '@/utilities/getMediaUrl'
import { isPortraitMedia } from '@/components/ProjectCover'
import { cn } from '@/utilities/ui'

import { coverObjectClass } from './coverFocus'
import type { IndexRow } from './rows'

/** Fixed geometry, actual source images. Entries without images get an honest type specimen. */
export function ArchivePreview({ row }: { row: IndexRow }) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null)
  const src = getMediaUrl(row.cover?.url, row.cover?.updatedAt)
  const portrait = isPortraitMedia(row.cover)
  const veryTall = Boolean(portrait && row.cover!.height! / row.cover!.width! > 2.5)
  const initials = row.title
    .split(/[\s–—-]+/)
    .slice(0, 2)
    .map((word) => [...word][0])
    .join('')

  return (
    <div aria-hidden="true" className="archive-preview" data-portrait={portrait || undefined}>
      <span className="archive-preview-index index-code">{row.index}</span>
      {src && failedUrl !== src ? (
        <div className="archive-preview-media">
          <Image
            alt=""
            fill
            className={cn(coverObjectClass(row.slug, veryTall))}
            onError={() => setFailedUrl(src)}
            quality={100}
            src={src}
            unoptimized={/^https?:\/\//i.test(src) || src.startsWith('/media/')}
            sizes="(min-width: 1100px) 30vw, (min-width: 640px) 45vw, 90vw"
          />
        </div>
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
