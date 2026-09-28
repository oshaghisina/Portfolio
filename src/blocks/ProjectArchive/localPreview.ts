import { access } from 'node:fs/promises'
import path from 'node:path'

import type { Media } from '@/payload-types'

import type { IndexRow } from './rows'

/** `/media/<file>` when `public/media` holds that file, else null. */
async function localUrl(filename: string | null | undefined): Promise<string | null> {
  if (!filename || path.basename(filename) !== filename) return null
  try {
    await access(path.join(process.cwd(), 'public', 'media', filename))
    return `/media/${encodeURIComponent(filename)}`
  } catch {
    return null
  }
}

/**
 * The same media pointed at its local copy in `public/media`, or unchanged when there is none.
 * Its scaled copies (the `srcset`, R11) follow wherever a local file exists for them too.
 */
async function localCopy(media: Media | null): Promise<Media | null> {
  const url = await localUrl(media?.filename)
  if (!media || !url) return media
  const sizes = media.sizes
    ? Object.fromEntries(
        await Promise.all(
          Object.entries(media.sizes).map(async ([name, size]) => {
            const local = await localUrl(size?.filename)
            return [name, local ? { ...size, url: local } : size] as const
          }),
        ),
      )
    : media.sizes
  return { ...media, url, sizes }
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
