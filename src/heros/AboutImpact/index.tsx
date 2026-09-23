import React from 'react'

import type { Page } from '@/payload-types'

import { IntersectionDiagram } from '@/components/IntersectionDiagram'
import { PageOpener } from '@/components/PageOpener'
import type { Locale } from '@/utilities/locale'

import { HeroWrittenRichText } from '../HeroWrittenRichText'

/**
 * The About page's take on `PageOpener`: the same copy-led opening as `lowImpact`, plus the
 * intersection diagram as a visual restatement of the headline beside it. Its own hero type for the
 * same reason `homeImpact` is one — `lowImpact` is the default for every new page and is documented
 * as opening on copy alone, so the diagram cannot ride along on it.
 */
export const AboutImpactHero: React.FC<Page['hero'] & { locale?: Locale }> = ({ locale, richText }) => (
  <PageOpener
    aside={
      // No `hidden lg:block` here, unlike the homepage console: below `lg` the opener is a flex
      // column and the aside follows the copy, which is exactly the intended mobile stack.
      <IntersectionDiagram className="w-full shrink-0 lg:w-[26rem] xl:w-[32rem]" locale={locale} />
    }
    locale={locale}
    titleSlot={richText ? <HeroWrittenRichText data={richText} locale={locale} /> : null}
    written
  />
)
