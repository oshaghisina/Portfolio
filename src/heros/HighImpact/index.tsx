import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { PageOpener } from '@/components/PageOpener'
import RichText from '@/components/RichText'
import type { Locale } from '@/utilities/locale'

import { HeroFigure } from '../HeroFigure'
import { HERO_RICH_TEXT_CLASS } from '../richText'

/**
 * The same opener as every other page, with the image carrying more weight (loaded eagerly as
 * the page's LCP candidate). It no longer reaches under the header or forces the header dark —
 * nothing bleeds outside the sheet.
 */
export const HighImpactHero: React.FC<Page['hero'] & { locale?: Locale }> = ({
  links,
  locale,
  media,
  richText,
}) => (
  <>
    <PageOpener
      actions={
        Array.isArray(links) && links.length > 0
          ? links.map(({ link }, i) => (
              <CMSLink arrow={i === 0} key={i} locale={locale} {...link} />
            ))
          : null
      }
      titleSlot={
        richText ? (
          <RichText
            className={HERO_RICH_TEXT_CLASS}
            data={richText}
            enableGutter={false}
            enableProse={false}
          />
        ) : null
      }
    />
    <HeroFigure media={media} priority />
  </>
)
