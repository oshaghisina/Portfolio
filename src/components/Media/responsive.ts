import type { Media } from '@/payload-types'

/**
 * Right-sized images from the copies Payload already made (R11). Bucket images skip Next's
 * resizer on purpose (the 1 vCPU server), so the browser chooses among the upload's own sizes
 * through a `<source srcset sizes>` instead. Nothing here re-encodes or uploads anything.
 */

/**
 * Where an image is shown decides which copies it may load.
 *
 * - `figure`: evidence to read (a case-study figure, a portrait). Every copy up to the original,
 *   so a wide or dense screen can still pick the full file.
 * - `thumbnail`: a card, cover, index tile or crop. The generated copies only; the original stands
 *   in only where it is lighter than the widest copy. On ~3× screens it loads a 2× copy.
 * - `viewer`: the full-screen viewer and downloads. The original file, nothing else.
 */
export type ImageUsage = 'figure' | 'thumbnail' | 'viewer'

/** The fields of an upload that the choice reads. */
export type ResponsiveResource = Pick<
  Media,
  'url' | 'width' | 'height' | 'filesize' | 'mimeType' | 'sizes' | 'filename'
>

export interface ImageCandidate {
  url: string
  width: number
  /** `null` when the size's byte count is unknown: then only its width counts. */
  bytes: number | null
  original: boolean
}

type Size = NonNullable<NonNullable<Media['sizes']>[keyof NonNullable<Media['sizes']>]>

/** Vector and animated files have one right file: the upload itself. */
export const hasNoSrcSet = (resource: Pick<Media, 'mimeType' | 'url' | 'filename'>): boolean => {
  const mime = resource.mimeType?.toLowerCase() ?? ''
  if (mime && !mime.startsWith('image/')) return true
  if (mime === 'image/svg+xml' || mime === 'image/gif') return true
  const name = (resource.filename || resource.url || '').split('?')[0]!.toLowerCase()
  return name.endsWith('.svg') || name.endsWith('.gif')
}

/**
 * A copy scaled down with the original's own shape. The `square` and `og` crops fail this, and so
 * would a copy as wide as the original or wider (a re-encode or an enlargement: more bytes, never
 * more detail).
 */
const isScaledCopy = (
  size: Size | undefined,
  width: number,
  height: number,
): size is Size & {
  url: string
  width: number
  height: number
} =>
  !!size?.url &&
  typeof size.width === 'number' &&
  typeof size.height === 'number' &&
  size.width > 0 &&
  size.width < width &&
  Math.abs(size.height - (size.width * height) / width) <= 1

const knownBytes = (value: number | null | undefined): number | null =>
  typeof value === 'number' && value > 0 ? value : null

/**
 * The files a browser may choose between for this upload and usage, narrowest first. A copy is
 * left out when a copy at least as wide weighs no more: Payload's PNG copies can outweigh the
 * original they came from (Khodro45's 600 px copy is heavier than its 780 px original), and a
 * browser must never pay more bytes for fewer pixels. Where byte counts are missing, width alone
 * decides. An empty list means "the original alone": no `srcset` is needed.
 */
export function imageCandidates(
  resource: ResponsiveResource,
  usage: ImageUsage = 'figure',
): ImageCandidate[] {
  const { height, url, width } = resource
  if (usage === 'viewer' || !url || !width || !height || hasNoSrcSet(resource)) return []

  const original: ImageCandidate = {
    url,
    width,
    bytes: knownBytes(resource.filesize),
    original: true,
  }
  // One copy per width (two names can share one): the lighter, else the first.
  const byWidth = new Map<number, ImageCandidate>()
  for (const size of Object.values(resource.sizes ?? {})) {
    if (!isScaledCopy(size, width, height)) continue
    const copy = {
      url: size.url,
      width: size.width,
      bytes: knownBytes(size.filesize),
      original: false,
    }
    const held = byWidth.get(copy.width)
    if (!held || (copy.bytes !== null && held.bytes !== null && copy.bytes < held.bytes))
      byWidth.set(copy.width, copy)
  }
  if (!byWidth.size) return []
  const widestCopy = Math.max(...byWidth.keys())

  // Widest first: keep a file only if it is lighter than every wider file kept so far.
  const kept: ImageCandidate[] = []
  let lightest = Number.POSITIVE_INFINITY
  for (const candidate of [original, ...[...byWidth.values()].sort((a, b) => b.width - a.width)]) {
    if (candidate.bytes !== null && candidate.bytes >= lightest) continue
    kept.push(candidate)
    if (candidate.bytes !== null) lightest = candidate.bytes
  }
  kept.reverse()

  // A thumbnail keeps the original only as the stand-in for a heavier widest copy it replaced.
  const list =
    usage === 'thumbnail' && kept.some((candidate) => candidate.width === widestCopy)
      ? kept.filter((candidate) => !candidate.original)
      : kept
  return list.length === 1 && list[0]!.original ? [] : list
}

/** `url 300w, url 600w`, with the same cache tag the original's URL carries. */
export const toSrcSet = (candidates: ImageCandidate[], cacheTag?: string | null): string =>
  candidates
    .map(
      ({ url, width }) => `${cacheTag ? `${url}?${encodeURIComponent(cacheTag)}` : url} ${width}w`,
    )
    .join(', ')

// ------------------------------------------------------------------------------------ sizes

/** Screens at about 3× (phones). A 2.625× or 3.5× screen falls in the same step. */
export const HIGH_DENSITY = '(min-resolution: 2.5dppx)'

/** Split at commas outside brackets: `calc(…)` and media conditions keep theirs. */
const splitList = (value: string): string[] => {
  const parts: string[] = []
  let depth = 0
  let start = 0
  for (let i = 0; i < value.length; i++) {
    const c = value[i]
    if (c === '(') depth++
    else if (c === ')') depth = Math.max(0, depth - 1)
    else if (c === ',' && depth === 0) {
      parts.push(value.slice(start, i))
      start = i + 1
    }
  }
  parts.push(value.slice(start))
  return parts.map((part) => part.trim()).filter(Boolean)
}

/** One `sizes` entry as its media condition (may be empty) and its length, or null. */
const splitEntry = (entry: string): { condition: string; length: string } | null => {
  let at: number
  if (entry.endsWith(')')) {
    let depth = 0
    at = entry.length - 1
    for (; at >= 0; at--) {
      if (entry[at] === ')') depth++
      else if (entry[at] === '(' && --depth === 0) break
    }
    const name = /[a-z-]+$/i.exec(entry.slice(0, at))?.[0]
    if (!name || !/^(calc|min|max|clamp)$/i.test(name)) return null
    at -= name.length
  } else {
    at = entry.search(/\S+$/)
  }
  if (at < 0) return null
  return { condition: entry.slice(0, at).trim(), length: entry.slice(at).trim() }
}

const twoThirds = (length: string): string => {
  const match = /^(\d*\.?\d+)(px|vw|vh|vmin|vmax|rem|em)?$/i.exec(length)
  if (match) return `${Math.round(((Number(match[1]) * 2) / 3) * 100) / 100}${match[2] ?? ''}`
  // No nested `calc()`: the sizes parsers of older engines read one level only.
  const inner = /^calc\((.*)\)$/i.exec(length)?.[1]
  return `calc(${inner === undefined ? length : `(${inner})`} * 2 / 3)`
}

/**
 * The same `sizes`, with each slot at two thirds on ~3× screens, so a phone loads a 2× copy of a
 * preview: at a card's size the third pixel is not seen, and R14's budget is ≤ 2× the displayed
 * width. The capped entries come first and all carry the density condition, so every other
 * screen reads the original list unchanged. A browser without `resolution` media queries skips
 * them. A list this cannot read is returned as it is.
 */
export function capDensity(sizes: string): string {
  const entries = splitList(sizes)
  const parsed = entries.map(splitEntry)
  if (!entries.length || parsed.some((entry) => !entry)) return sizes
  const capped = parsed.map((entry) => {
    const { condition, length } = entry!
    const guard = /^not\s|\sor\s/i.test(condition) ? `(${condition})` : condition
    return `${guard ? `${guard} and ` : ''}${HIGH_DENSITY} ${twoThirds(length)}`
  })
  return [...capped, ...entries].join(', ')
}

/**
 * The `<source>` attributes for an upload, or null when the original alone is right (a vector or
 * animated file, the viewer, or an upload without usable copies).
 */
export function responsiveSource(
  resource: ResponsiveResource,
  {
    cacheTag,
    sizes,
    usage = 'figure',
  }: { cacheTag?: string | null; sizes: string; usage?: ImageUsage },
): { srcSet: string; sizes: string } | null {
  const candidates = imageCandidates(resource, usage)
  if (!candidates.length) return null
  return {
    srcSet: toSrcSet(candidates, cacheTag),
    sizes: usage === 'thumbnail' ? capDensity(sizes) : sizes,
  }
}

/**
 * Only the copies a `srcset` can use, with only the fields it reads — for data that crosses to
 * the browser in bulk (a page index of 160 screens), never the whole media document.
 */
export function scaledSizes(resource: ResponsiveResource): Media['sizes'] | undefined {
  const { height, sizes, width } = resource
  if (!sizes || !width || !height || hasNoSrcSet(resource)) return undefined
  const kept = Object.entries(sizes).flatMap(([name, size]) =>
    isScaledCopy(size, width, height)
      ? [[name, { url: size.url, width: size.width, height: size.height, filesize: size.filesize }]]
      : [],
  )
  return kept.length ? (Object.fromEntries(kept) as Media['sizes']) : undefined
}
