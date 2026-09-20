import type { Locale } from './locale'

/** Hand-translated interface chrome — not CMS content, so translating it directly is safe. */
export const uiCopy: Record<
  Locale,
  {
    closeMenu: string
    openMenu: string
    search: string
    switchToEnglish: string
    switchToPersian: string
    theme: string
  }
> = {
  en: {
    closeMenu: 'Close menu',
    openMenu: 'Open menu',
    search: 'Search',
    switchToEnglish: 'Switch to English',
    switchToPersian: 'Switch to Persian',
    theme: 'Toggle theme',
  },
  fa: {
    closeMenu: 'بستن منو',
    openMenu: 'باز کردن منو',
    search: 'جستجو',
    switchToEnglish: 'تغییر به انگلیسی',
    switchToPersian: 'تغییر به فارسی',
    theme: 'تغییر پوسته',
  },
}
