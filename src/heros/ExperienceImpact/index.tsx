import React from 'react'

import type { Page } from '@/payload-types'

import { CapabilityIndex } from '@/components/CapabilityIndex'
import { PageOpener } from '@/components/PageOpener'
import type { Locale } from '@/utilities/locale'

import { HeroWrittenRichText } from '../HeroWrittenRichText'

/**
 * The `/experience` opener: the same copy-led opening as `lowImpact`, plus the capability index
 * beside it. Its own hero type for the same reason `aboutImpact` is one — `lowImpact` is the
 * default for every new page and is documented as opening on copy alone, so the index cannot ride
 * along on it.
 *
 * As on About, no `hidden lg:block`: below `lg` the opener is a flex column and the aside simply
 * follows the copy, which is the intended mobile stack.
 */
export const ExperienceImpactHero: React.FC<Page['hero'] & { locale?: Locale }> = ({
  locale,
  richText,
}) => (
  <PageOpener
    aside={<CapabilityIndex className="w-full shrink-0 lg:w-[24rem] xl:w-[28rem]" locale={locale} />}
    locale={locale}
    titleSlot={richText ? <HeroWrittenRichText data={richText} locale={locale} /> : null}
    written
  />
)
