import { localePath } from '@/i18n/navigation'
import { LOCALE_LABELS, LOCALES, type Locale } from '@/utilities/locale'
import { switchToLanguageLabel } from '@/utilities/uiCopy'

/** Shared destination policy for the header menu, mobile list, and footer disclosure. */
export function localeDestinations(
  currentLocale: Locale,
  logicalPath: string,
  readiness: Partial<Record<Locale, boolean>>,
) {
  return LOCALES.map((locale) => ({
    locale,
    label: LOCALE_LABELS[locale],
    current: locale === currentLocale,
    href: localePath(locale, locale === 'en' || Boolean(readiness[locale]) ? logicalPath : '/'),
    switchLabel: switchToLanguageLabel(currentLocale, LOCALE_LABELS[locale]),
  }))
}
