/**
 * Colour maths for the house tokens: oklch → sRGB → WCAG contrast.
 * Used by the emitter tests and by the /design colour section.
 */

export type Oklch = { l: number; c: number; h: number; alpha?: number }

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

/** oklch (l 0–1) → linear sRGB components 0–1 (gamut-clipped). */
export function oklchToLinearSrgb({ l, c, h }: Oklch): [number, number, number] {
  const rad = (h * Math.PI) / 180
  const a = c * Math.cos(rad)
  const b = c * Math.sin(rad)
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b
  const s_ = l - 0.0894841775 * a - 1.291485548 * b
  const L = l_ ** 3
  const M = m_ ** 3
  const S = s_ ** 3
  return [
    clamp01(4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S),
    clamp01(-1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S),
    clamp01(-0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S),
  ]
}

const gamma = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055)

/** oklch → `#rrggbb` (gamut-clipped). */
export function oklchToHex(color: Oklch): string {
  const [r, g, b] = oklchToLinearSrgb(color).map((v) => Math.round(gamma(v) * 255))
  return `#${[r, g, b].map((v) => v!.toString(16).padStart(2, '0')).join('')}`
}

/** WCAG 2.x relative luminance of an oklch colour. */
export function luminance(color: Oklch): number {
  const [r, g, b] = oklchToLinearSrgb(color)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** WCAG contrast ratio between two opaque oklch colours (≥ 1). */
export function contrast(a: Oklch, b: Oklch): number {
  const la = luminance(a)
  const lb = luminance(b)
  const [hi, lo] = la > lb ? [la, lb] : [lb, la]
  return (hi + 0.05) / (lo + 0.05)
}
