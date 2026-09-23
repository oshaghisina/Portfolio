import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import React from 'react'

import RichText from '@/components/RichText'
import { WrittenHeadline } from '@/components/WrittenHeadline'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'

import { HERO_HEADING_CLASS, HERO_LEDE_CLASS } from './richText'
import { splitHeroRichText } from './splitHeroRichText'

export type HeroWrittenRichTextProps = {
  data: DefaultTypedEditorState
  locale?: Locale
  className?: string
  /** Extra class on the written H1 (e.g. `mt-4` when an eyebrow sits above). */
  headingClassName?: string
}

/**
 * Hero opener copy: script-aware written H1 + optional lede RichText marked for entrance fade.
 */
export const HeroWrittenRichText: React.FC<HeroWrittenRichTextProps> = ({
  className,
  data,
  headingClassName,
  locale = DEFAULT_LOCALE,
}) => {
  const { body, title } = splitHeroRichText(data)

  return (
    <div className={cn(className)}>
      {title ? (
        <WrittenHeadline
          className={cn(HERO_HEADING_CLASS, headingClassName)}
          locale={locale}
          text={title}
        />
      ) : null}
      {body ? (
        <div data-hero-supporting="">
          <RichText
            className={HERO_LEDE_CLASS}
            data={body}
            enableGutter={false}
            enableProse={false}
            locale={locale}
          />
        </div>
      ) : null}
    </div>
  )
}

export { splitHeroRichText } from './splitHeroRichText'
