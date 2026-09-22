import { Post } from '@/payload-types'

import { DEFAULT_LOCALE, type Locale } from './locale'

/**
 * Formats an array of `populatedAuthors` into one readable string in the visitor's locale.
 *
 * `Intl.ListFormat` replaces a hardcoded English `" and "` / `", "`: the separator, the
 * conjunction and whether there is an Oxford comma all differ by language, and Persian and
 * Arabic use a different comma character entirely.
 *
 * @example [A, B] → "A and B" (en) · "A و B" (fa) · "A und B" (de)
 */
export const formatAuthors = (
  authors: NonNullable<NonNullable<Post['populatedAuthors']>[number]>[],
  locale: Locale = DEFAULT_LOCALE,
) => {
  const authorNames = authors.map((author) => author.name).filter(Boolean) as string[]

  if (authorNames.length === 0) return ''
  if (authorNames.length === 1) return authorNames[0]

  return new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' }).format(authorNames)
}
