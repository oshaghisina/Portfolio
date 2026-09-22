import type { Metadata } from 'next'

import type { Media, Page, Post, Project, Config } from '../payload-types'

import { getLocaleReadinessMap } from '@/i18n/contentReady'
import { localePath } from '@/i18n/navigation'
import { DEFAULT_LOCALE, LOCALES, type Locale } from './locale'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { withSiteName } from './site'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | Partial<Project> | null
  /** Current locale — drives the canonical URL and which `alternates.languages` are emitted. */
  locale?: Locale
  /** Unprefixed logical path, e.g. `/about` or `/lab/hello` — defaults to the homepage. */
  logicalPath?: string
}): Promise<Metadata> => {
  const { doc, locale = DEFAULT_LOCALE, logicalPath = '/' } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = withSiteName(doc?.meta?.title)

  const serverUrl = getServerSideURL()
  const canonicalPath = localePath(locale, logicalPath)

  // English is unprefixed and always canonical/x-default; other locales appear only once their
  // copy of this logical page is actually publicly ready (D-009) — never advertise a hreflang
  // alternate that resolves to not-found.
  const readiness = await getLocaleReadinessMap(logicalPath)
  const languages: Record<string, string> = {
    'x-default': `${serverUrl}${localePath(DEFAULT_LOCALE, logicalPath)}`,
  }
  for (const candidate of LOCALES) {
    if (readiness[candidate])
      languages[candidate] = `${serverUrl}${localePath(candidate, logicalPath)}`
  }

  return {
    alternates: {
      canonical: `${serverUrl}${canonicalPath}`,
      languages,
    },
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: canonicalPath,
    }),
    title,
  }
}
