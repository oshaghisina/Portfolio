import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'
import { SITE_NAME } from './site'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Product designer working across product strategy, design, growth and AI.',
  images: [
    {
      url: `${getServerSideURL()}/sina-oshaghi-OG.webp`,
    },
  ],
  siteName: SITE_NAME,
  title: SITE_NAME,
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
