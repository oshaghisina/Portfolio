import React from 'react'

import { SkillIcon } from '@/blocks/CapabilityIcons'
import { SKILL_GROUP_KEYS, SKILL_KEYS, SKILLS_BY_GROUP } from '@/blocks/CapabilityIcons/keys'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'
import { cn } from '@/utilities/ui'

/**
 * The `/experience` opener's aside: the capability system as an index — four groups, their marks,
 * and the count.
 *
 * It says in one glance what the headline says in a sentence, so the right half of the opener
 * stops being whitespace (the same job `IntersectionDiagram` does on About, and the console does
 * on the homepage). It is an *index*, not a preview: no titles, no descriptions, no evidence —
 * all of that is the matrix's, further down.
 *
 * Counts come from `SKILLS_BY_GROUP`, never from a literal, so they cannot drift from the page
 * they describe.
 */
export const CapabilityIndex: React.FC<{ className?: string; locale?: Locale }> = ({
  className,
  locale = DEFAULT_LOCALE,
}) => {
  const copy = uiCopy[locale].capabilityIndex

  return (
    <figure className={cn('m-0', className)}>
      <div className="border-y border-line">
        {SKILL_GROUP_KEYS.map((groupKey, i) => {
          const skills = SKILLS_BY_GROUP[groupKey]
          return (
            <div
              className="flex items-center gap-4 border-line py-4 not-first:border-t"
              key={groupKey}
            >
              <span className="index-code text-ink-3" dir="ltr">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0 flex-1 eyebrow text-ink-2">{copy.groups[i]}</span>
              <span aria-hidden className="flex shrink-0 items-center gap-1.5">
                {skills.map((skillKey) => (
                  <SkillIcon className="size-5" key={skillKey} skillKey={skillKey} />
                ))}
              </span>
            </div>
          )
        })}
      </div>
      <figcaption className="mt-3 eyebrow text-track-accent">
        <span dir="ltr">{copy.total.replace('{n}', String(SKILL_KEYS.length))}</span>
      </figcaption>
      <span className="sr-only">{copy.description}</span>
    </figure>
  )
}
