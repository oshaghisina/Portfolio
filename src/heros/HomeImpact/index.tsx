import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

/**
 * Dedicated homepage hero: dominant first viewport (headline + one-liner + links) paired with a
 * small static index panel as a visual anchor. The panel mirrors the Capabilities section's own
 * categories — decorative chrome, not CMS data, in the same spirit as a non-localized decorative
 * console (see Docs/Benchmarks/Content/pleurat-com.md).
 */
const WORKSPACE_INDEX = [
  { code: '01', label: 'Product' },
  { code: '02', label: 'Design' },
  { code: '03', label: 'Research' },
  { code: '04', label: 'Growth' },
]

export const HomeImpactHero: React.FC<Page['hero']> = ({ links, richText }) => {
  return (
    <section className="container flex min-h-[70vh] flex-col justify-center gap-10 pt-24 pb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
      <div className="max-w-[40rem]">
        {richText && <RichText data={richText} enableGutter={false} />}
        {links?.length ? (
          <div className="mt-8 flex flex-wrap gap-4">
            {links.map(({ link }, i) => (
              <CMSLink arrow={i === 0} key={i} {...link} />
            ))}
          </div>
        ) : null}
      </div>
      <div className="hidden shrink-0 flex-col gap-3 border-s border-line ps-8 lg:flex">
        {WORKSPACE_INDEX.map((row) => (
          <div className="flex items-baseline gap-3" key={row.code}>
            <span className="index-code text-ink-3">{row.code}</span>
            <span className="eyebrow text-ink-2">{row.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
