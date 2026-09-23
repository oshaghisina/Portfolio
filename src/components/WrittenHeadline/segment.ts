import { isRtl, type Locale } from '@/utilities/locale'

export type WrittenTone = {
  text: string
  className?: string
}

export type WriteUnit = {
  text: string
  className?: string
}

/** Flatten tone spans into reveal units; progression runs continuously across tones. */
export function unitsFromTones(tones: WrittenTone[], locale: Locale): WriteUnit[] {
  const units: WriteUnit[] = []
  tones.forEach((tone, index) => {
    const text =
      index > 0 && tone.text && !/^\s/.test(tone.text) && !/\s$/.test(tones[index - 1]?.text ?? '')
        ? ` ${tone.text}`
        : tone.text
    for (const part of segmentText(text, locale)) {
      units.push({ text: part, className: tone.className })
    }
  })
  return units
}

/**
 * Script-aware segmentation:
 * - fa/ar → whitespace-delimited words (preserves نیم‌فاصله / shaping inside tokens)
 * - Latin + ja → grapheme clusters via Intl.Segmenter
 */
export function segmentText(text: string, locale: Locale): string[] {
  if (!text) return []
  if (isRtl(locale)) return segmentWords(text)
  return segmentGraphemes(text)
}

/** Keep whitespace as its own units so opacity reveal never collapses gaps. */
function segmentWords(text: string): string[] {
  return text.split(/(\s+)/u).filter((part) => part.length > 0)
}

function segmentGraphemes(text: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' })
    return Array.from(segmenter.segment(text), (s) => s.segment)
  }
  // Surrogate-safe fallback — never String#split('') for multilingual text.
  return Array.from(text)
}

export function fullTextFromTones(tones: WrittenTone[]): string {
  return tones
    .map((t, i) => {
      if (i === 0) return t.text
      if (!t.text) return ''
      if (/^\s/.test(t.text) || /\s$/.test(tones[i - 1]?.text ?? '')) return t.text
      return ` ${t.text}`
    })
    .join('')
}
