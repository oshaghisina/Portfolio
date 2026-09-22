import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { ConsolePanel } from '@/components/ConsolePanel'
import RichText from '@/components/RichText'
import { SystemLandscape } from '@/components/SystemLandscape'
import type { Locale } from '@/utilities/locale'

/**
 * Dedicated homepage hero: dominant first viewport (headline + one-liner + links) paired with a
 * small workspace console preview as an always-visible visual anchor, then a technical-landscape
 * strip bridging into the Workbench below. The panel mirrors the Workbench's own categories and
 * chrome — decorative, non-CMS chrome, not new data (see Docs/Benchmarks/Content/pleurat-com.md).
 */
const WORKSPACE_INDEX = [
  { code: '01', label: 'Product' },
  { code: '02', label: 'Design' },
  { code: '03', label: 'Research' },
  { code: '04', label: 'Growth' },
]

export const HomeImpactHero: React.FC<Page['hero'] & { locale?: Locale }> = ({ links, locale, richText }) => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col gap-10 pt-6 pb-12 md:gap-12 md:pt-16 md:pb-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:pt-24 lg:pb-20">
        <div className="max-w-[42rem]">
          <span className="eyebrow text-ink-3">Sina Oshaghi</span>
          {richText && (
            <RichText
              className="mt-4 [&_h1]:text-display [&_h1]:tracking-display [&_h1]:font-medium [&_h1]:text-foreground [&_h1]:text-balance [&_p]:mt-6 [&_p]:max-w-[34ch] md:[&_p]:max-w-[34rem] [&_p]:text-lede [&_p]:text-ink-2"
              data={richText}
              enableGutter={false}
              enableProse={false}
            />
          )}
          {links?.length ? (
            // Phones: one dominant full-width primary, the secondary reduced to a quiet text line
            // on the same node (no duplicate DOM); from `sm` the CMS appearances return.
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              {links.map(({ link }, i) => (
                <CMSLink
                  arrow={i === 0}
                  className={
                    i === 0
                      ? 'w-full sm:w-auto'
                      : 'max-sm:h-auto max-sm:justify-start max-sm:border-0 max-sm:bg-transparent max-sm:px-0 max-sm:text-small max-sm:text-ink-2 max-sm:hover:translate-y-0 max-sm:hover:bg-transparent max-sm:hover:text-foreground'
                  }
                  key={i}
                  locale={locale}
                  {...link}
                />
              ))}
            </div>
          ) : null}
        </div>
        {/* The preview console only earns its place beside the copy at lg; on phones it would just
            repeat the standalone Workbench one screen later. */}
        <ConsolePanel className="hidden w-full shrink-0 lg:block lg:w-[22rem]" status="Active" title="sina — workspace">
          <ol className="flex flex-col gap-4">
            {WORKSPACE_INDEX.map((row) => (
              <li className="flex items-center gap-3" key={row.code}>
                <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                <span className="index-code text-ink-3">{row.code}</span>
                <span className="eyebrow text-ink-2">{row.label}</span>
              </li>
            ))}
          </ol>
        </ConsolePanel>
      </div>
      <SystemLandscape labels={WORKSPACE_INDEX.map((row) => `${row.code} · ${row.label}`)} />
    </section>
  )
}
