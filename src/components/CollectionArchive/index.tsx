import React from 'react'

import { Card, CardPostData } from '@/components/Card'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'

export type Props = {
  locale?: Locale
  posts: CardPostData[]
}

/** Card grid. Width comes from the page frame, so this brings no container of its own. */
export const CollectionArchive: React.FC<Props> = (props) => {
  const { locale = DEFAULT_LOCALE, posts } = props

  return (
    <div className="grid grid-cols-4 gap-x-4 gap-y-4 sm:grid-cols-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-8">
      {posts?.map((result, index) => {
        if (typeof result === 'object' && result !== null) {
          return (
            <div className="col-span-4" key={index}>
              <Card className="h-full" doc={result} locale={locale} relationTo="posts" showCategories />
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
