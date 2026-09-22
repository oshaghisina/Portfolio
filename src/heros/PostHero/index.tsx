import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { PageOpener } from '@/components/PageOpener'
import { formatAuthors } from '@/utilities/formatAuthors'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'

/** At most the canvas width, capped where the sheet stops growing. */
const COVER_SIZES = '(min-width: 110rem) 76rem, (min-width: 48rem) 78vw, 100vw'

/**
 * A post's opener. It used to be a full-bleed cover reaching under the sticky header, which was
 * the only thing on the site that broke out of the sheet; the cover is now a framed figure under
 * the same opening gesture every other page uses.
 */
export const PostHero: React.FC<{
  locale?: Locale
  post: Post
}> = ({ locale = DEFAULT_LOCALE, post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const copy = uiCopy[locale]
  const authors = populatedAuthors?.length ? formatAuthors(populatedAuthors, locale) : ''
  const labels =
    categories?.flatMap((category) =>
      typeof category === 'object' && category !== null ? [category.title || 'Untitled category'] : [],
    ) ?? []

  return (
    <>
      <PageOpener
        aside={
          authors || publishedAt ? (
            <dl className="grid w-full grid-cols-2 gap-x-6 gap-y-5 lg:w-[18rem] lg:shrink-0 lg:grid-cols-1">
              {authors ? (
                <div className="border-t border-line pt-3">
                  <dt className="eyebrow text-ink-3">{copy.author}</dt>
                  <dd className="mt-1 text-small">{authors}</dd>
                </div>
              ) : null}
              {publishedAt ? (
                <div className="border-t border-line pt-3">
                  <dt className="eyebrow text-ink-3">{copy.published}</dt>
                  <dd className="mt-1 text-small">
                    <time dateTime={publishedAt}>{formatDateTime(publishedAt, locale)}</time>
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : null
        }
        asideAlign="end"
        eyebrow={labels.length ? labels.join(' · ') : null}
        title={title}
      />
      {heroImage && typeof heroImage !== 'string' ? (
        <figure className="mt-12 md:mt-16">
          <Media
            className="overflow-hidden rounded-media border border-line bg-panel"
            imgClassName="h-auto w-full"
            priority
            resource={heroImage}
            size={COVER_SIZES}
          />
        </figure>
      ) : null}
    </>
  )
}
