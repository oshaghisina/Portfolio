import type { File, Payload } from 'payload'

import fs from 'fs/promises'
import path from 'path'

import type { Locale } from '@/utilities/locale'

export type SeedLocale = Extract<Locale, 'en' | 'fa' | 'ar' | 'de'>

export interface MediaSpec {
  /** Path inside the project's `assets/` folder in Docs, e.g. `duel/duel-main.png`. */
  file: string
  /** Stored filename — the idempotency key; reuse an existing upload with this name. */
  name: string
  alt: Record<SeedLocale, string>
}

const MIME: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
}

/** Reads a real project asset from `Docs/` (dev only — `Docs/` is not deployed). */
export async function readAsset(
  assetsDir: string,
  relativePath: string,
  name: string,
): Promise<File | null> {
  const absolute = path.resolve(assetsDir, relativePath)
  try {
    const data = await fs.readFile(absolute)
    return {
      name,
      data,
      mimetype: MIME[path.extname(name).toLowerCase()] ?? 'application/octet-stream',
      size: data.byteLength,
    }
  } catch {
    return null
  }
}

/**
 * Upload-or-reuse by filename, then write the localized `alt` for every seed locale. Running the
 * seed twice creates no second copy — the media document keeps its id, so every project that
 * references it keeps working.
 */
export async function upsertMedia(
  payload: Payload,
  assetsDir: string,
  spec: MediaSpec,
): Promise<string | null> {
  const existing = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 1,
    pagination: false,
    where: { filename: { equals: spec.name } },
  })

  let id = existing.docs[0]?.id
  if (!id) {
    const file = await readAsset(assetsDir, spec.file, spec.name)
    if (!file) {
      payload.logger.warn(`— Asset not found on disk, skipping: ${spec.file}`)
      return null
    }
    const created = await payload.create({
      collection: 'media',
      depth: 0,
      data: { alt: spec.alt.en },
      file,
    })
    id = created.id
  }

  for (const locale of Object.keys(spec.alt) as SeedLocale[]) {
    await payload.update({
      collection: 'media',
      id,
      depth: 0,
      locale,
      data: { alt: spec.alt[locale] },
    })
  }

  return id
}
