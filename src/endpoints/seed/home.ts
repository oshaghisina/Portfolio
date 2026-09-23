import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

import { buildHomeLayout, heroLinks, heroRichText, homeMetaDescription, homeMetaTitle } from './home-content'
import { DEFAULT_LOCALE } from '@/utilities/locale'

type HomeArgs = {
  heroImage: Media
  metaImage: Media
  /** Seeded project ids for the work mosaic, keyed by slug — one per `HOME_MOSAIC` entry. */
  mosaicProjects: Record<string, string>
}

// `heroImage` is part of the seed's shared media set (see endpoints/seed/index.ts) but the
// homeImpact hero used here has no media field, so it's intentionally unused.
export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage: _heroImage,
  metaImage,
  mosaicProjects,
}) => {
  return {
    slug: 'home',
    _status: 'published',
    hero: {
      type: 'homeImpact',
      richText: heroRichText,
      links: heroLinks,
    },
    layout: buildHomeLayout({ locale: DEFAULT_LOCALE, projects: mosaicProjects }),
    meta: {
      description: homeMetaDescription,
      image: metaImage.id,
      title: homeMetaTitle,
    },
    title: 'Home',
  }
}
