/** Entrance write window: short headlines finish sooner; long ones cap so German/JA never crawl. */
export const WRITE_START_DELAY_MS = 100
export const WRITE_MIN_MS = 700
export const WRITE_MAX_MS = 1600

/**
 * Map unit count → total reveal duration. Rough bands:
 * short (~≤12) → ~700–900ms · medium → ~900–1200ms · long → up to 1600ms.
 */
export function writeDurationMs(unitCount: number): number {
  if (unitCount <= 0) return WRITE_MIN_MS
  const t = Math.min(1, (unitCount - 1) / 48)
  return Math.round(WRITE_MIN_MS + t * (WRITE_MAX_MS - WRITE_MIN_MS))
}
