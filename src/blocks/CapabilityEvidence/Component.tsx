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
 * Evidence as sums. Each row names the work, then the capabilities that had to combine for it —
 * joined with a literal "+" so the page argues that the combination is the point, not any one
 * skill in it.
 *
 * The "+" is `aria-hidden` and the capabilities are a real list, so a screen reader hears three
 * items rather than a run-on sentence punctuated by plus signs.
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
              className="grid gap-x-8 gap-y-4 border-b border-line py-7 lg:grid-cols-12"
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
                  {item.note ? <p className="mt-2 text-small text-ink-3">{item.note}</p> : null}
                </div>
              </div>
              <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 lg:col-span-7">
                {capabilities.map((capability, c) => (
                  <React.Fragment key={capability.id ?? c}>
                    {c > 0 ? (
                      <li aria-hidden className="text-small text-ink-3">
                        +
                      </li>
                    ) : null}
                    <li className="flex items-center gap-2">
                      <SkillIcon className="size-6 shrink-0" skillKey={capability.key as SkillKey} />
                      <span className="eyebrow text-ink-2">{capability.label}</span>
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
