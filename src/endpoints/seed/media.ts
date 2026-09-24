import type { File, Payload } from 'payload'

import fs from 'fs/promises'
import path from 'path'

import type { Locale } from '@/utilities/locale'

export interface MediaSpec {
  /** Path inside the project's `assets/` folder in Docs, e.g. `duel/duel-main.png`. */
  file: string
  /** Stored filename — the idempotency key; reuse an existing upload with this name. */
  name: string
  /** English is the only alt a project cover has; case-study media supply one per seed locale. */
  alt: Partial<Record<Locale, string>>
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

/** Where the media collection writes its files — `public/media` unless the config moves it. */
function mediaStaticDir(payload: Payload): string | undefined {
  const upload = payload.config.collections.find((c) => c.slug === 'media')?.upload
  return typeof upload === 'object' && typeof upload.staticDir === 'string'
    ? upload.staticDir
    : undefined
}

/**
 * Upload-or-reuse by filename, then write the localized `alt` for every seed locale. Running the
 * seed twice creates no second copy — the media document keeps its id, so every project that
 * references it keeps working. A re-export that changed the bytes (a frame fixed in Figma) replaces
 * the file on the existing document, so references and the cover survive the swap.
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

  const current = existing.docs[0]
  let id = current?.id
  if (!id) {
    const file = await readAsset(assetsDir, spec.file, spec.name)
    if (!file) {
      payload.logger.warn(`— Asset not found on disk, skipping: ${spec.file}`)
      return null
    }
    const created = await payload.create({
      collection: 'media',
      depth: 0,
      data: { alt: spec.alt.en ?? '' },
      file,
    })
    id = created.id
  } else {
    const file = await readAsset(assetsDir, spec.file, spec.name)
    // A re-export changed the bytes — swap the file on the document rather than adding a second one.
    if (file && file.size !== current.filesize) {
      // Local disk only: Payload picks `name-1.png` while the target name is still on disk, so
      // clear the old file first. With Arvan S3 (`S3_BUCKET` set), `disableLocalStorage` is on
      // and the adapter owns object lifecycle on update — skip the fs.rm.
      const staticDir = mediaStaticDir(payload)
      const usingLocalDisk = Boolean(staticDir) && !process.env.S3_BUCKET
      if (usingLocalDisk && current.filename) {
        await fs.rm(path.join(staticDir!, current.filename), { force: true })
      }
      await payload.update({ collection: 'media', id, depth: 0, data: {}, file })
      payload.logger.info(`— Replaced changed asset: ${spec.name}`)
    }
  }

  for (const [locale, alt] of Object.entries(spec.alt) as [Locale, string | undefined][]) {
    if (alt === undefined) continue
    await payload.update({
      collection: 'media',
      id,
      depth: 0,
      locale,
      data: { alt },
    })
  }

  return id
}
