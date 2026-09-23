import React from 'react'

import type { CapabilityEvidenceBlock as CapabilityEvidenceBlockProps } from '@/payload-types'

import { EvidenceRef } from '@/components/EvidenceRef'
import { SectionHeader } from '@/components/SectionHeader'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'

import { SkillIcon } from '../CapabilityIcons'
import { isSkillKey, type SkillKey } from '../CapabilityIcons/keys'

export type CapabilityEvidenceProps = Pick<
  CapabilityEvidenceBlockProps,
  'items' | 'sectionHeader'
> & {
  className?: string
  locale?: Locale
}

/**
 * Evidence as sums. Each row names the work, then places the capabilities that combined for it
 * on one quiet rail. The project remains the visual lead, ahead of the complete skill inventory.
 *
 * The "+" is `aria-hidden` inside its preceding item, so a screen reader hears only the real list.
 */
export const CapabilityEvidenceBlock: React.FC<CapabilityEvidenceProps> = ({
  className,
  items,
  locale = DEFAULT_LOCALE,
  sectionHeader,
}) => {
  const rows = items ?? []
  if (!rows.length) return null

  return (
    <section className={cn(className)} id="selected-evidence">
      <SectionHeader {...sectionHeader} className="mb-10 max-md:mb-8" tagTone="mono" />
      <ol className="border-t border-line">
        {rows.map((item, i) => {
          const capabilities = (item.capabilities ?? []).filter(
            (c) => c.label && isSkillKey(c.key),
          )
          return (
            <li
              className="grid gap-x-8 gap-y-5 border-b border-line py-7 lg:grid-cols-12 lg:items-center"
              key={item.id ?? i}
            >
              <div className="flex min-w-0 items-baseline gap-3 lg:col-span-5">
                <span className="index-code text-ink-3" dir="ltr">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="text-h3 tracking-h3 font-medium text-foreground text-balance">
                    <EvidenceRef label={item.label!} locale={locale} project={item.project} />
                  </h3>
                  {item.note ? <p className="mt-2 text-small text-ink-2">{item.note}</p> : null}
                </div>
              </div>
              <ul className="flex flex-wrap items-center gap-x-3 gap-y-3 border-s border-line ps-4 lg:col-span-7 lg:ms-4">
                {capabilities.map((capability, c) => (
                    <li className="flex items-center gap-2" key={capability.id ?? c}>
                      <SkillIcon className="size-6 shrink-0" skillKey={capability.key as SkillKey} />
                      <span className="eyebrow text-ink-2">{capability.label}</span>
                      {c < capabilities.length - 1 ? (
                        <span aria-hidden className="ms-1 text-small text-ink-3">+</span>
                      ) : null}
                    </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
