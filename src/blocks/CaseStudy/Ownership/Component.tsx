import React from 'react'

import type { CaseStudyOwnershipBlock } from '@/payload-types'

import { cn } from '@/utilities/ui'

import type { CaseStudyBlockContext } from '../types'

export type OwnershipBlockProps = CaseStudyOwnershipBlock &
  CaseStudyBlockContext & { headingId?: string }

const COLUMNS = ['own', 'coOwn', 'collaborate'] as const

/**
 * The ownership map: three short lists under mono labels — owned (brand marker), co-owned and
 * collaborated (muted). Deliberately small: it gives credit precisely instead of listing skills.
 */
export const OwnershipBlock: React.FC<OwnershipBlockProps> = ({
  collaborate,
  coOwn,
  copy,
  heading,
  headingId,
  intro,
  note,
  own,
}) => {
  const lists = { own: own ?? [], coOwn: coOwn ?? [], collaborate: collaborate ?? [] }
  const hasLists = COLUMNS.some((key) => lists[key].length)

  return (
    <div>
      <h2 className="text-h2 font-medium text-balance text-foreground" id={headingId}>
        {heading || copy.sectionLabels.ownership}
      </h2>
      {intro ? <p className="mt-4 max-w-measure text-lede text-ink-2">{intro}</p> : null}
      {hasLists ? (
        <div className="mt-10 grid gap-8 border-t border-line pt-8 md:grid-cols-3 md:gap-12">
          {COLUMNS.map((key) => (
            <div key={key}>
              <h3 className="eyebrow text-ink-3">{copy.ownership[key]}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {lists[key].length ? (
                  lists[key].map((item, i) => (
                    <li className="flex gap-3 text-small text-foreground" key={i}>
                      <span
                        aria-hidden
                        className={cn(
                          'shrink-0 font-mono rtl:-scale-x-100',
                          key === 'own' ? 'text-brand' : 'text-ink-3',
                        )}
                      >
                        ↳
                      </span>
                      {item}
                    </li>
                  ))
                ) : (
                  <li className="text-small text-ink-3">—</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
      {note ? <p className="mt-8 max-w-measure text-caption text-ink-3">{note}</p> : null}
    </div>
  )
}
