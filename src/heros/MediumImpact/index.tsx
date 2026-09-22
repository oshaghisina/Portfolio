import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { PageOpener } from '@/components/PageOpener'
import RichText from '@/components/RichText'
import type { Locale } from '@/utilities/locale'

import { HeroFigure } from '../HeroFigure'
import { HERO_RICH_TEXT_CLASS } from '../richText'

/** Copy, then one framed image below the rail. */
export const MediumImpactHero: React.FC<Page['hero'] & { locale?: Locale }> = ({
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
    <HeroFigure media={media} />
  </>
)
