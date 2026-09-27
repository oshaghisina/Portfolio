import type { Metadata } from 'next'

import type { Media, Page, Post, Project, Config } from '../payload-types'

import { getLocaleReadinessMap } from '@/i18n/contentReady'
import { localePath } from '@/i18n/navigation'
import { DEFAULT_LOCALE, LOCALES, type Locale } from './locale'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { withSiteName } from './site'

/** Open Graph locale tags — BCP 47 region forms expected by social crawlers. */
export const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  fa: 'fa_IR',
  ar: 'ar_SA',
  es: 'es_ES',
  de: 'de_DE',
  fr: 'fr_FR',
  ja: 'ja_JP',
}

/** S3 media URLs are already absolute; only local paths (`/api/media/…`) need the site origin. */
const withOrigin = (serverUrl: string, url: string) =>
  /^https?:\/\//i.test(url) ? url : serverUrl + url

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/sina-oshaghi-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const src = image.sizes?.og?.url || image.url

    if (src) url = withOrigin(serverUrl, src)
  }

  return url
}

const docTitle = (doc: Partial<Page> | Partial<Post> | Partial<Project> | null | undefined) =>
  doc?.meta?.title || doc?.title || null

const docDescription = (doc: Partial<Page> | Partial<Post> | Partial<Project> | null | undefined) => {
  if (doc?.meta?.description) return doc.meta.description
  if (doc && 'summary' in doc && typeof doc.summary === 'string' && doc.summary) return doc.summary
  return undefined
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | Partial<Project> | null
  /** Current locale — drives the canonical URL and which `alternates.languages` are emitted. */
  locale?: Locale
  /** Unprefixed logical path, e.g. `/about` or `/lab/hello` — defaults to the homepage. */
  logicalPath?: string
  /** When true (draft / live preview), emit noindex so preview HTML is not indexed. */
  draft?: boolean
}): Promise<Metadata> => {
  const { doc, locale = DEFAULT_LOCALE, logicalPath = '/', draft = false } = args

  const ogImage = getImageURL(doc?.meta?.image)
  const description = docDescription(doc)
  const title = withSiteName(docTitle(doc))

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

  const images = ogImage ? [{ url: ogImage }] : undefined

  return {
    alternates: {
      canonical: `${serverUrl}${canonicalPath}`,
      languages,
    },
    description,
    openGraph: mergeOpenGraph({
      description: description || '',
      images,
      locale: OG_LOCALE[locale],
      title,
      url: canonicalPath,
    }),
    ...(draft ? { robots: { index: false, follow: false } } : {}),
    title,
    twitter: {
      card: 'summary_large_image',
      description: description || undefined,
      images: ogImage ? [ogImage] : undefined,
      title,
    },
  }
}
