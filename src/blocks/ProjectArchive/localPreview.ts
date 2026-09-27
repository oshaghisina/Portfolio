import { access } from 'node:fs/promises'
import path from 'node:path'

import type { Media } from '@/payload-types'

import type { IndexRow } from './rows'

/** The same media pointed at its local copy in `public/media`, or unchanged when there is none. */
async function localCopy(media: Media | null): Promise<Media | null> {
  const filename = media?.filename
  if (!media || !filename || path.basename(filename) !== filename) return media
  try {
    await access(path.join(process.cwd(), 'public', 'media', filename))
    return { ...media, url: `/media/${encodeURIComponent(filename)}` }
  } catch {
    return media
  }
}

/** Prefer an exact local upload in development. Never rewrite CMS data or production URLs. */
export async function withLocalPreviewMedia(rows: IndexRow[]): Promise<IndexRow[]> {
  if (process.env.NODE_ENV !== 'development') return rows
  return Promise.all(
    rows.map(async (row) => ({
      ...row,
      cover: await localCopy(row.cover),
      companion: await localCopy(row.companion),
    })),
  )
}
