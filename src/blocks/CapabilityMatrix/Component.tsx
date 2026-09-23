import React from 'react'

import type { CapabilityMatrixBlock as CapabilityMatrixBlockProps } from '@/payload-types'

import { EvidenceRef } from '@/components/EvidenceRef'
import { SectionHeader } from '@/components/SectionHeader'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'
import { uiCopy } from '@/utilities/uiCopy'

import { SkillIcon } from '../CapabilityIcons'
import { isSkillKey, type SkillKey } from '../CapabilityIcons/keys'

export type CapabilityMatrixProps = Pick<
  CapabilityMatrixBlockProps,
  'evidenceLabel' | 'groups' | 'sectionHeader'
> & {
  className?: string
  locale?: Locale
}

/**
 * The complete sixteen-capability inventory, grouped.
 *
 * One ruled row per capability rather than sixteen cards: at this count a card grid turns the
 * page into a wall and buries the group hierarchy, which is the only thing that tells a reader
 * what is core and what is specialised. Rows keep the four headings unmissable and let a long
 * German or Japanese title grow its own line instead of clipping.
 *
 * The index runs 01…16 across the whole matrix, not per group, so a capability has one number on
 * the page and can be referred to by it.
 */
export const CapabilityMatrixBlock: React.FC<CapabilityMatrixProps> = ({
  className,
  evidenceLabel,
  groups,
  locale = DEFAULT_LOCALE,
  sectionHeader,
}) => {
  const rows = (groups ?? []).map((group) => ({
    group,
    skills: (group.skills ?? []).filter((skill) => isSkillKey(skill.key)),
  }))
  if (!rows.length) return null

  /** Where a group's numbering starts. Derived rather than accumulated, so nothing mutates mid-render. */
  const startOf = (g: number) => rows.slice(0, g).reduce((n, row) => n + row.skills.length, 0)

  return (
    <section className={cn(className)} id="capability-matrix">
      <SectionHeader {...sectionHeader} className="mb-10 max-md:mb-8" tagTone="mono" />
      <div className="flex flex-col gap-section-sm">
        {rows.map(({ group, skills }, g) => (
          <section
            className="scroll-mt-28"
            id={`capability-group-${group.key}`}
            key={group.id ?? group.key}
          >
            <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line pb-4">
              <div className="flex items-baseline gap-3">
                <span className="index-code text-ink-3" dir="ltr">
                  {String(g + 1).padStart(2, '0')}
                </span>
                <h3 className="text-h3 tracking-h3 font-medium text-foreground text-balance">
                  {group.title}
                </h3>
              </div>
              <span className="eyebrow text-ink-3">
                {uiCopy[locale].capabilityIndex.total.replace('{n}', String(skills.length))}
              </span>
            </header>
            <ol>
              {skills.map((skill, s) => {
                const index = startOf(g) + s + 1
                const evidence = (skill.evidence ?? []).filter((e) => e.label)
                return (
                  <li
                    className="grid gap-x-8 gap-y-2 border-b border-line py-5 lg:grid-cols-12 lg:gap-y-4 lg:py-7"
                    key={skill.id ?? skill.key}
                  >
                    <div className="flex min-w-0 items-start gap-4 lg:col-span-4">
                      <SkillIcon
                        className="mt-0.5 size-8 shrink-0 sm:size-9"
                        skillKey={skill.key as SkillKey}
                      />
                      <div className="min-w-0">
                        <span className="index-code text-ink-3" dir="ltr">
                          {String(index).padStart(2, '0')}
                        </span>
                        <h4 className="mt-1 text-h3 tracking-h3 font-medium text-foreground text-balance">
                          {skill.title}
                        </h4>
                      </div>
                    </div>
                    <p className="text-small text-ink-2 lg:col-span-5">{skill.description}</p>
                    {evidence.length ? (
                      <div className="flex flex-wrap items-baseline gap-x-2 lg:col-span-3 lg:block">
                        <span className="eyebrow text-ink-3">{evidenceLabel}</span>
                        <p className="text-small text-ink-3 lg:mt-1.5">
                          {evidence.map((item, i) => (
                            <React.Fragment key={item.id ?? i}>
                              {i > 0 ? <span aria-hidden> · </span> : null}
                              <EvidenceRef
                                label={item.label!}
                                locale={locale}
                                project={item.project}
                              />
                            </React.Fragment>
                          ))}
                        </p>
                      </div>
                    ) : null}
                  </li>
                )
              })}
            </ol>
          </section>
        ))}
      </div>
    </section>
  )
}
