import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

import { heroLinks, heroRichText, homeLayout, homeMetaDescription, homeMetaTitle } from './home-content'

type HomeArgs = {
  heroImage: Media
  metaImage: Media
}

// `heroImage` is part of the seed's shared media set (see endpoints/seed/index.ts) but the
// homeImpact hero used here has no media field, so it's intentionally unused.
export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
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
    layout: homeLayout,
    meta: {
      description: homeMetaDescription,
      image: metaImage.id,
      title: homeMetaTitle,
    },
    title: 'Home',
  }
}
