import { DEFAULT_LOCALE, type Locale } from './locale'

/**
 * A date in the visitor's own locale. The template shipped a hardcoded `MM/DD/YYYY`, which is
 * not just untranslated but actively misread outside the US — `03/04` is 4 March to most of the
 * world. `Intl.DateTimeFormat` also picks the right calendar and numerals per locale.
 *
 * `numberingSystem: 'latn'` is deliberate: DS-10 keeps digits Latin everywhere, so a Persian
 * date reads `۱۴ مارس`-style month names with Latin numerals rather than switching numeral
 * systems mid-page.
 */
export const formatDateTime = (timestamp: string, locale: Locale = DEFAULT_LOCALE): string => {
  const date = timestamp ? new Date(timestamp) : new Date()
  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat(`${locale}-u-nu-latn`, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}
