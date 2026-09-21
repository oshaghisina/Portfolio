import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

import { buildHomeLayout, heroLinks, heroRichText, homeMetaDescription, homeMetaTitle } from './home-content'

type HomeArgs = {
  heroImage: Media
  metaImage: Media
  /** Id of the seeded project the Featured Project block points at. */
  featuredProject: string
}

// `heroImage` is part of the seed's shared media set (see endpoints/seed/index.ts) but the
// homeImpact hero used here has no media field, so it's intentionally unused.
export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  featuredProject,
  heroImage: _heroImage,
  metaImage,
}) => {
  return {
    slug: 'home',
    _status: 'published',
    hero: {
      type: 'homeImpact',
      richText: heroRichText,
      links: heroLinks,
    },
    layout: buildHomeLayout({ project: featuredProject }),
    meta: {
      description: homeMetaDescription,
      image: metaImage.id,
      title: homeMetaTitle,
    },
    title: 'Home',
  }
}
