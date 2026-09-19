/** Normalised view of a `period` frontmatter value (legacy string or structured map). */
export interface Period {
  start?: string
  end?: string
  present: boolean
  approx: boolean
  /** The resume-style duration string when no dates exist, e.g. "2.5 yr" */
  legacy?: string
}

export function periodOf(value: unknown): Period {
  if (typeof value === 'string') return { present: false, approx: false, legacy: value.trim() }
  if (value && typeof value === 'object') {
    const v = value as Record<string, unknown>
    const end = typeof v.end === 'string' ? v.end.trim() : undefined
    return {
      start: typeof v.start === 'string' && v.start.trim() ? v.start.trim() : undefined,
      end: end && end !== 'present' ? end : undefined,
      present: end === 'present' || v.present === true,
      approx: v.approx === true,
    }
  }
  return { present: false, approx: false }
}

export const hasDates = (p: Period) => Boolean(p.start && (p.end || p.present))

/** Months between two `YYYY-MM` values (end inclusive of its month). `present` = this month. */
export function monthsBetween(start: string, end?: string): number {
  const [sy, sm] = start.split('-').map(Number) as [number, number]
  const now = new Date()
  const [ey, em] = end
    ? (end.split('-').map(Number) as [number, number])
    : [now.getFullYear(), now.getMonth() + 1]
  return Math.max(0, (ey - sy) * 12 + (em - sm) + 1)
}

export function yearsOf(p: Period): number | null {
  if (hasDates(p) && p.start) return round1(monthsBetween(p.start, p.end) / 12)
  if (p.legacy) return yearsFromLegacy(p.legacy)
  return null
}

/** "2.5 yr" → 2.5, "8 mos" → 0.7, "1.2 yr" → 1.2 */
export function yearsFromLegacy(s: string): number | null {
  const m = s.match(/([\d.]+)\s*(yr|year|years|mo|mos|month|months)/i)
  if (!m) return null
  const n = Number(m[1])
  return round1(/^mo/i.test(m[2] ?? '') ? n / 12 : n)
}

export function formatPeriod(p: Period): string {
  if (hasDates(p) && p.start) {
    const end = p.present ? 'present' : p.end
    const yrs = yearsOf(p)
    const approx = p.approx ? 'c. ' : ''
    return `${approx}${p.start} → ${end}${yrs !== null ? ` · ${formatYears(yrs)}` : ''}`
  }
  return p.legacy ?? ''
}

export function formatYears(y: number): string {
  if (y < 1) return `${Math.round(y * 12)} mos`
  return `${round1(y)} yr`
}

export const round1 = (n: number) => Math.round(n * 10) / 10

/** Do two dated periods intersect? */
export function overlaps(a: Period, b: Period): boolean {
  if (!hasDates(a) || !hasDates(b) || !a.start || !b.start) return false
  const now = new Date().toISOString().slice(0, 7)
  const aEnd = a.present ? now : (a.end as string)
  const bEnd = b.present ? now : (b.end as string)
  return a.start <= bEnd && b.start <= aEnd
}
