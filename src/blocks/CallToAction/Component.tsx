import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

/** Plain editorial closing transition — large type, inline links, no card treatment. */
export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="container border-t border-line pt-14">
      <div className="flex flex-col gap-8">
        <div className="max-w-[40rem]">
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
        {links?.length ? (
          <div className="flex flex-wrap gap-6">
            {(links || []).map(({ link }, i) => (
              <CMSLink arrow={i === 0} key={i} {...link} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
