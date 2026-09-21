/**
 * The drafting plate — the dot-grid panel the homepage feature and `/work` use behind portrait
 * media (`ProjectCover`) and the "media pending" state. Case-study figures sit on the same plate
 * so evidence reads as one system across Home, `/work` and `/work/<slug>`.
 */
export const PLATE_STYLE = {
  backgroundImage: 'radial-gradient(var(--line) 1px, transparent 1px)',
  backgroundSize: '1.5rem 1.5rem',
} as const

/** Zero-padded ordinal for chapter, decision, figure and lesson numbering: 1 → "01". */
export const pad = (n: number): string => String(n).padStart(2, '0')
