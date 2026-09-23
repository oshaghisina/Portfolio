import React from 'react'

import type { CapabilitySpotlightBlock as CapabilitySpotlightBlockProps } from '@/payload-types'

import { SectionHeader } from '@/components/SectionHeader'
import { cn } from '@/utilities/ui'

import { SpotlightIllustration } from '../CapabilityIcons'
import { isSpotlightKey } from '../CapabilityIcons/keys'

export type CapabilitySpotlightProps = Pick<
  CapabilitySpotlightBlockProps,
  'items' | 'sectionHeader'
> & {
  className?: string
}

/**
 * The four primary capabilities as one continuous ruled matrix — a shared `gap-px` grid over
 * `bg-line`, so the separators between panels are the same hairline that rules the rest of the
 * site. Not four cards: no radius, no shadow, no gap, nothing floating.
 *
 * `gap-px` is safe here specifically because four cells always fill 4, 2 and 1 columns exactly;
 * an unfilled cell would paint as a solid `--line` block (see WorkMosaic/Component.tsx:29-35 for
 * when to use per-cell hairlines instead).
 */
export const CapabilitySpotlightBlock: React.FC<CapabilitySpotlightProps> = ({
  className,
  items,
  sectionHeader,
}) => {
  const rows = (items ?? []).filter((item) => isSpotlightKey(item.key))
  if (!rows.length) return null

  return (
    <section className={cn(className)} id="capabilities">
      <SectionHeader {...sectionHeader} className="mb-10 max-md:mb-8" tagTone="brand" />
      <ol className="grid grid-cols-1 gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {rows.map((item, i) => (
          <li className="flex min-w-0 flex-col bg-paper p-6 lg:p-8" key={item.id ?? item.key}>
            <span className="index-code text-ink-3" dir="ltr">
              {String(i + 1).padStart(3, '0')}
            </span>
            <SpotlightIllustration
              className="mt-6 w-full max-w-[19rem] self-start"
              spotlightKey={item.key as Parameters<typeof SpotlightIllustration>[0]['spotlightKey']}
            />
            <h3 className="mt-6 text-h3 tracking-h3 font-medium text-foreground text-balance lg:mt-8">
              {item.title}
            </h3>
            <p className="mt-3 text-small font-medium text-foreground">{item.principle}</p>
            <p className="mt-2 text-small text-ink-3">{item.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
