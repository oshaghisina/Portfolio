import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

/** Tiny, centered final action — a quiet close, not another editorial statement. */
export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="border-t border-line py-20 lg:py-28">
      <div className="mx-auto flex max-w-[32rem] flex-col items-center gap-8 text-center">
        {richText && (
          <RichText
            className="mb-0 [&_h3]:text-h2 [&_h3]:tracking-h2 [&_h3]:font-medium [&_h3]:text-foreground [&_h3]:text-balance [&_p]:mt-3 [&_p]:text-body [&_p]:text-ink-2"
            data={richText}
            enableGutter={false}
            enableProse={false}
          />
        )}
        {links?.length ? (
          <div className="flex flex-wrap justify-center gap-6">
            {(links || []).map(({ link }, i) => (
              <CMSLink arrow={i === 0} key={i} {...link} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
