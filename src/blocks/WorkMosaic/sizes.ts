/** Existing CMS values remain valid; emphasis changes presentation, never reading order. */
export const MOSAIC_SIZES = ['wide', 'large', 'medium', 'small'] as const
export type MosaicSize = (typeof MOSAIC_SIZES)[number]

export const isMosaicSize = (value: unknown): value is MosaicSize =>
  typeof value === 'string' && (MOSAIC_SIZES as readonly string[]).includes(value)

export const toMosaicSize = (value: unknown): MosaicSize => (isMosaicSize(value) ? value : 'small')

export const isFeaturedSize = (size: MosaicSize): boolean => size === 'wide' || size === 'large'
