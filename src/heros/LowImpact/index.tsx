import React from 'react'

import type { Page } from '@/payload-types'

import { PageOpener } from '@/components/PageOpener'
import RichText from '@/components/RichText'
import type { Locale } from '@/utilities/locale'

import { HERO_RICH_TEXT_CLASS } from '../richText'

/** A page that opens on copy alone — the shared opener, nothing else. */
export const LowImpactHero: React.FC<Page['hero'] & { locale?: Locale }> = ({ richText }) => (
  <PageOpener
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
)
