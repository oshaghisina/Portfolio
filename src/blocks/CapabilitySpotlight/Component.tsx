import React from 'react'

import type { CapabilitySpotlightBlock as CapabilitySpotlightBlockProps } from '@/payload-types'

import { SectionHeader } from '@/components/SectionHeader'
import { cn } from '@/utilities/ui'

import { isSpotlightKey, type SpotlightKey } from '../CapabilityIcons/keys'
import { CapabilityIllustration } from '../CapabilityIllustrations/Illustrations'
import { MotionGrid } from '../CapabilityIllustrations/MotionGrid.client'

export type CapabilitySpotlightProps = Pick<
  CapabilitySpotlightBlockProps,
  'items' | 'sectionHeader'
> & {
  className?: string
}

/**
 * The four primary capabilities as one continuous ruled matrix — a shared `gap-px` grid over
 * `bg-line`, so the separators between panels are the same hairline that rules the rest of the
 * site. Not four cards: no radius, no shadow, no gap, nothing floating. The shared capability
 * machines get enough width here to remain legible beside the fuller description.
 *
 * `gap-px` is safe here specifically because four cells always fill 2 and 1 columns exactly;
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
      <MotionGrid className="grid grid-cols-1 gap-px border-y border-line bg-line md:grid-cols-2">
        {rows.map((item, i) => (
          <li className="flex min-w-0 flex-col bg-paper p-6 lg:p-8" key={item.id ?? item.key}>
            <span className="index-code text-ink-3" dir="ltr">
              {String(i + 1).padStart(3, '0')}
            </span>
            <div className="mt-4 flex h-[clamp(11.25rem,50vw,13.75rem)] w-full items-center justify-center md:h-[clamp(12.5rem,19vw,15rem)]">
              <CapabilityIllustration spotlightKey={item.key as SpotlightKey} />
            </div>
            <h3 className="mt-5 text-h3 tracking-h3 font-medium text-foreground text-balance">
              {item.title}
            </h3>
            <p className="mt-2 text-small font-medium text-foreground">{item.principle}</p>
            <p className="mt-2 text-small text-ink-3">{item.description}</p>
          </li>
        ))}
      </MotionGrid>
    </section>
  )
}
