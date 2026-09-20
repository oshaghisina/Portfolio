import type { RequiredDataFromCollectionSlug } from 'payload'

import { heroLinks, heroRichText, homeLayout, homeMetaDescription, homeMetaTitle } from './home-content'

// Used for pre-seeded content so that the homepage is not empty
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  hero: {
    type: 'homeImpact',
    richText: heroRichText,
    links: heroLinks,
  },
  layout: homeLayout,
  meta: {
    title: homeMetaTitle,
    description: homeMetaDescription,
  },
  title: 'Home',
}
