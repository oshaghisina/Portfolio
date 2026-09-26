import React from 'react'

import type { Media as MediaType, Page } from '@/payload-types'

import { IntersectionDiagram } from '@/components/IntersectionDiagram'
import { Media } from '@/components/Media'
import { PageOpener } from '@/components/PageOpener'
import type { Locale } from '@/utilities/locale'

import { HeroWrittenRichText } from '../HeroWrittenRichText'

/** Aside widths match the intersection diagram so the opener row does not jump when swapping. */
const ASIDE_CLASS = 'w-full shrink-0 lg:w-[26rem] xl:w-[32rem]'

/** Square portrait: full width below `lg`, then the aside column up to 32rem. */
const PORTRAIT_SIZES = '(max-width: 1023px) 100vw, 32rem'

/**
 * The About page's take on `PageOpener`: the same copy-led opening as `lowImpact`, plus either
 * the editorial portrait from the `about` global or the intersection diagram as a visual
 * restatement of the headline beside it. Its own hero type for the same reason `homeImpact` is
 * one — `lowImpact` is the default for every new page and is documented as opening on copy alone,
 * so the aside cannot ride along on it.
 */
export const AboutImpactHero: React.FC<
  Page['hero'] & { locale?: Locale; portrait?: MediaType | string | null }
> = ({ locale, portrait, richText }) => {
  const portraitMedia = typeof portrait === 'object' && portrait !== null ? portrait : null

  return (
    <PageOpener
      aside={
        // No `hidden lg:block` here, unlike the homepage console: below `lg` the opener is a flex
        // column and the aside follows the copy, which is exactly the intended mobile stack.
        portraitMedia ? (
          <figure className={ASIDE_CLASS}>
            <Media
              className="aspect-square overflow-hidden rounded-media border border-line bg-panel"
              imgClassName="h-auto w-full"
              priority
              resource={portraitMedia}
              size={PORTRAIT_SIZES}
            />
          </figure>
        ) : (
          <IntersectionDiagram className={ASIDE_CLASS} locale={locale} />
        )
      }
      asideSupports
      locale={locale}
      titleSlot={richText ? <HeroWrittenRichText data={richText} locale={locale} /> : null}
      written
    />
  )
}
