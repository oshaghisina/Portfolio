import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'

/**
 * Tiny, centered final action — a quiet close, not another editorial chapter.
 */
export const CallToActionBlock: React.FC<
  CTABlockProps & { disableInnerContainer?: boolean; locale?: Locale }
> = ({ disableInnerContainer, links, locale = DEFAULT_LOCALE, richText }) => {
  return (
    <div className={cn(!disableInnerContainer && 'container', 'py-10 md:py-14')}>
      <div className="mx-auto flex max-w-[24rem] flex-col items-center gap-5 text-center">
        {richText && (
          <RichText
            className="mb-0 [&_h3]:text-h3 [&_h3]:tracking-h3 [&_h3]:font-medium [&_h3]:text-foreground [&_p]:mt-2 [&_p]:text-small [&_p]:text-ink-3"
            data={richText}
            enableGutter={false}
            enableProse={false}
          />
        )}
        {links?.length ? (
          <div className="flex flex-col items-center gap-3">
            {(links || []).map(({ link }, i) => (
              <CMSLink
                arrow={i === 0}
                className={i === 0 ? 'h-(--size-control-height-sm) px-4 text-small' : 'h-auto border-0 bg-transparent px-0 text-small text-ink-3 hover:translate-y-0 hover:bg-transparent hover:text-foreground'}
                key={i}
                locale={locale}
                {...link}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
