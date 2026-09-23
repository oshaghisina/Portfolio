import React from 'react'

import type { Page } from '@/payload-types'

import { PageOpener } from '@/components/PageOpener'
import RichText from '@/components/RichText'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { contactCopy } from '@/endpoints/seed/contact-copy'

import { HeroWrittenRichText } from '../HeroWrittenRichText'

/** Contact aside: lede weight without forcing max-width of the left column. */
const CONTACT_ASIDE_CLASS =
  'w-full shrink-0 text-lede text-ink-2 lg:max-w-[28rem] [&_p]:text-lede [&_p]:text-ink-2 [&_p+p]:mt-4'

/**
 * Contact opener: shared PageOpener with a copy aside (why/how to reach out) instead of a
 * decorative panel. Eyebrow is locale chrome from `contactCopy`; headline lives in `richText`.
 */
export const ContactImpactHero: React.FC<Page['hero'] & { locale?: Locale }> = ({
  aside,
  locale = DEFAULT_LOCALE,
  richText,
}) => (
  <PageOpener
    aside={
      aside ? (
        <RichText className={CONTACT_ASIDE_CLASS} data={aside} enableGutter={false} enableProse={false} />
      ) : null
    }
    asideAlign="start"
    asideSupports
    eyebrow={contactCopy[locale].eyebrow}
    locale={locale}
    titleSlot={richText ? <HeroWrittenRichText data={richText} headingClassName="mt-4" locale={locale} /> : null}
    written
  />
)
