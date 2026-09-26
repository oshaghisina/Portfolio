import { access } from 'node:fs/promises'
import path from 'node:path'

import type { IndexRow } from './rows'

/** Prefer an exact local upload in development. Never rewrite CMS data or production URLs. */
export async function withLocalPreviewMedia(rows: IndexRow[]): Promise<IndexRow[]> {
  if (process.env.NODE_ENV !== 'development') return rows
  return Promise.all(
    rows.map(async (row) => {
      const filename = row.cover?.filename
      if (!filename || path.basename(filename) !== filename) return row
      try {
        await access(path.join(process.cwd(), 'public', 'media', filename))
        return { ...row, cover: { ...row.cover!, url: `/media/${encodeURIComponent(filename)}` } }
      } catch {
        return row
      }
    }),
  )
}
