import type { RequiredDataFromCollectionSlug } from 'payload'

import { buildHomeLayout, heroLinks, heroRichText, homeMetaDescription, homeMetaTitle } from './home-content'
import { DEFAULT_LOCALE } from '@/utilities/locale'
import { homeMosaicProjectsStatic } from './projects'

// Used for pre-seeded content so that the homepage is not empty
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  hero: {
    type: 'homeImpact',
    richText: heroRichText,
    links: heroLinks,
  },
  layout: buildHomeLayout({ locale: DEFAULT_LOCALE, projects: homeMosaicProjectsStatic }),
  meta: {
    title: homeMetaTitle,
    description: homeMetaDescription,
  },
  title: 'Home',
}
