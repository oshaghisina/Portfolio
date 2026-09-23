import type { CoverAspect } from '@/components/ProjectCover'

/**
 * The mosaic's one size table. Payload stores a semantic size; everything visual — column spans,
 * media aspect, `sizes`, type roles and content density — is derived here and nowhere else, so a
 * tile never grows its own `if (size === 'large')`.
 *
 * Sizes are ordered heaviest first, which is also the order the editor sees in the select.
 */
export const MOSAIC_SIZES = ['wide', 'large', 'medium', 'small'] as const

export type MosaicSize = (typeof MOSAIC_SIZES)[number]

/**
 * The two multi-column tracks: `pair` is the phone/tablet two-column grid, `lg` the full
 * twelve-column canvas. Below `pair` every tile is one full-width column.
 *
 * `pair` opens at 420px rather than Tailwind's `sm`, so phones get the two-up rhythm of small
 * tiles instead of nine full-width bands. Narrower than that, a quarter-row title wraps to a
 * ribbon, so one column is the honest answer.
 */
export type MosaicTrack = 'pair' | 'lg'

export const PAIR_TRACK = 'min-[420px]:'

export const MOSAIC_COLS: Record<MosaicTrack, number> = { pair: 2, lg: 12 }

export interface MosaicGeometry {
  /** Column spans. Base is always one column, so only `pair` and `lg` appear here. */
  span: string
  /** Columns consumed per track — the arithmetic `tailSpan` and the packing test run on. */
  weight: Record<MosaicTrack, number>
  /** Media geometry. Never derived from the image's own aspect ratio — that would be masonry. */
  aspect: CoverAspect
  /**
   * next/image `sizes`. The canvas is `min(78vw, 86rem)` from `md` and near-full-bleed below it;
   * `sizes` cannot read a CSS variable, so the percentages are written out.
   */
  imageSizes: string
  /** Cell padding and the gap between media, title and metadata. */
  pad: string
  gap: string
  title: string
  /** Summary type role, or `null` where the tile is too small to carry prose. */
  summary: string | null
  /** `Figure NN` label and kind names on the pending plate — only where the plate is large. */
  plateDetail: boolean
  /** Kind names in the metadata line. */
  showKinds: boolean
  showRole: boolean
  /** `false` renders the arrow alone instead of "Case study" / "Live" + arrow. */
  showCtaLabel: boolean
}

export const MOSAIC: Record<MosaicSize, MosaicGeometry> = {
  wide: {
    span: 'min-[420px]:col-span-2 lg:col-span-12',
    weight: { pair: 2, lg: 12 },
    aspect: 'wide',
    imageSizes: '(min-width: 768px) 76vw, 92vw',
    pad: 'p-5 lg:p-8',
    gap: 'gap-5',
    title: 'text-h3 md:text-h2',
    summary: 'max-w-measure text-body text-ink-2',
    plateDetail: true,
    showKinds: true,
    showRole: true,
    showCtaLabel: true,
  },
  large: {
    span: 'min-[420px]:col-span-2 lg:col-span-6',
    weight: { pair: 2, lg: 6 },
    aspect: 'feature',
    imageSizes: '(min-width: 1024px) 38vw, (min-width: 768px) 76vw, 92vw',
    pad: 'p-5 lg:p-8',
    gap: 'gap-4',
    title: 'text-h3',
    summary: 'text-small text-ink-2',
    plateDetail: true,
    showKinds: true,
    showRole: true,
    showCtaLabel: true,
  },
  medium: {
    span: 'min-[420px]:col-span-2 lg:col-span-6',
    weight: { pair: 2, lg: 6 },
    aspect: 'panel',
    imageSizes: '(min-width: 1024px) 38vw, (min-width: 768px) 76vw, 92vw',
    pad: 'p-5 lg:p-6',
    gap: 'gap-3',
    title: 'text-h3',
    summary: null,
    plateDetail: false,
    showKinds: true,
    showRole: false,
    showCtaLabel: true,
  },
  small: {
    span: 'lg:col-span-3',
    weight: { pair: 1, lg: 3 },
    aspect: 'square',
    imageSizes: '(min-width: 1024px) 19vw, (min-width: 768px) 38vw, 46vw',
    pad: 'p-5',
    gap: 'gap-3',
    title: 'text-body font-medium',
    summary: null,
    plateDetail: false,
    showKinds: false,
    showRole: false,
    showCtaLabel: false,
  },
}

/** A stored value the type says is impossible — an older version, a hand-edited import. */
export const isMosaicSize = (value: unknown): value is MosaicSize =>
  typeof value === 'string' && (MOSAIC_SIZES as readonly string[]).includes(value)

export const toMosaicSize = (value: unknown): MosaicSize => (isMosaicSize(value) ? value : 'small')

/**
 * Columns left over on the last row, which the closing index cell claims so the mosaic can never
 * end on a ragged edge. A full last row yields a full-width cell of its own rather than zero.
 *
 * Every `lg` weight divides 12 and every `pair` weight divides 2, so the result is always a whole
 * number of `small` slots — a mid-sequence hole is possible (the editor mixed sizes that don't add
 * up) but it renders as paper, never as a sliver.
 */
export const tailSpan = (sizes: MosaicSize[], track: MosaicTrack): number => {
  const cols = MOSAIC_COLS[track]
  const used = sizes.reduce((total, size) => total + MOSAIC[size].weight[track], 0) % cols
  return used === 0 ? cols : cols - used
}
