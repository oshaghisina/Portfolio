import React from 'react'

import type { CaseStudyDecisionsBlock } from '@/payload-types'

import { FigureMedia } from '@/components/CaseStudy/FigureMedia'
import { pad } from '@/components/CaseStudy/plate'

import type { CaseStudyBlockContext } from '../types'

export type DecisionsBlockProps = CaseStudyDecisionsBlock &
  CaseStudyBlockContext & { headingId?: string }

const FACT_KEYS = ['alternatives', 'tradeoff', 'evidence'] as const

/**
 * Key decisions as an editorial sequence, not a card grid: a numbered rule per decision, the
 * decision itself set large, the reasoning at reading measure, and the alternatives / trade-off /
 * evidence as a small fact list beside it. Generous vertical space lets each decision breathe.
 */
export const DecisionsBlock: React.FC<DecisionsBlockProps> = ({
  copy,
  heading,
  headingId,
  items,
  lede,
}) => {
  const rows = items ?? []
  if (!rows.length) return null

  return (
    <div>
      <h2 className="text-h2 font-medium text-balance text-foreground" id={headingId}>
        {heading || copy.sectionLabels.decisions}
      </h2>
      {lede ? <p className="mt-4 max-w-measure text-lede text-ink-2">{lede}</p> : null}
      <ol className="mt-12 border-b border-line md:mt-16">
        {rows.map((decision, i) => {
          const facts = FACT_KEYS.map((key) => ({ key, value: decision[key]?.trim() })).filter(
            (fact) => fact.value,
          )
          const media = decision.media && typeof decision.media === 'object' ? decision.media : null
          return (
            <li
              className="grid gap-6 border-t border-line py-12 lg:grid-cols-12 lg:gap-x-12 lg:py-16"
              key={decision.id ?? i}
            >
              <span className="index-code text-ink-3 lg:col-span-1">{pad(i + 1)}</span>
              <div className="flex flex-col gap-5 lg:col-span-6">
                <h3 className="text-track-title leading-[1.2] tracking-h3 font-medium text-balance text-foreground">
                  {decision.title}
                </h3>
                <p className="max-w-measure text-body text-ink-2">{decision.why}</p>
              </div>
              {facts.length || media ? (
                <div className="flex flex-col gap-6 lg:col-span-5 lg:col-start-8">
                  {facts.length ? (
                    <dl className="flex flex-col gap-5">
                      {facts.map((fact) => (
                        <div key={fact.key}>
                          <dt className="eyebrow text-ink-3">{copy.decision[fact.key]}</dt>
                          <dd className="mt-1.5 text-small text-ink-2">{fact.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                  {media ? (
                    <FigureMedia
                      className="max-w-[14rem]"
                      resource={media}
                      sizes="14rem"
                      treatment="auto"
                    />
                  ) : null}
                </div>
              ) : null}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
