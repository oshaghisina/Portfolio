'use client'

import Link from 'next/link'
import React, { useId, useRef, useState } from 'react'

import { SectionHeader } from '@/components/SectionHeader'
import { DEFAULT_LOCALE, isRtl, type Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'
import { cn } from '@/utilities/ui'

import { WorkspaceBench } from './Bench'
import { padStageIndex, type ResolvedStage, type StageKey } from './stages'

export type WorkspaceClientProps = {
  className?: string
  locale?: Locale
  loopLabel: string
  principle: string
  sectionHeader?: {
    tag?: string | null
    lead?: string | null
    tail?: string | null
    lede?: string | null
  } | null
  stages: ResolvedStage[]
}

/**
 * How I work: an operating loop (Frame → Map → Decide → Ship → Measure) under one ownership
 * principle. Real WAI-ARIA tabs with roving tabindex; one morphing bench; a stage panel with
 * Output / Seen in / Next. No autoplay — the rail already tells the whole story at rest.
 */
export const WorkspaceClient: React.FC<WorkspaceClientProps> = ({
  className,
  locale = DEFAULT_LOCALE,
  loopLabel,
  principle,
  sectionHeader,
  stages,
}) => {
  const baseId = useId()
  const [index, setIndex] = useState(0)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])
  const copy = uiCopy[locale].workbench

  if (!stages.length) return null

  const active = Math.min(index, stages.length - 1)
  const last = stages.length - 1
  const current = stages[active]!
  const stageKey = current.key as StageKey
  const totalCode = padStageIndex(last)

  const select = (next: number) => {
    if (next < 0 || next > last) return
    setIndex(next)
    tabsRef.current[next]?.focus()
  }

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const rtl = isRtl(locale)
    let next: null | number = null

    switch (event.key) {
      case 'ArrowLeft':
        next = rtl ? active + 1 : active - 1
        break
      case 'ArrowRight':
        next = rtl ? active - 1 : active + 1
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = last
        break
      default:
        return
    }

    if (next < 0 || next > last) return
    event.preventDefault()
    select(next)
  }

  const tabId = (i: number) => `${baseId}-tab-${i}`
  const panelId = (i: number) => `${baseId}-panel-${i}`

  return (
    <section className={cn(className)}>
      <SectionHeader
        {...sectionHeader}
        className="mb-10 max-md:mb-8 max-md:border-t-0 max-md:pt-0"
        tagTone="mono"
      />

      <div className="border border-line bg-panel/20">
        {/* Ownership bracket — eyebrow on mobile, spanning rule on desktop */}
        <div className="border-b border-line px-4 py-3 sm:px-6">
          <p className="eyebrow text-ink-3 md:hidden">{principle}</p>
          <div className="hidden items-center gap-3 md:flex" aria-hidden>
            <span className="h-px w-3 bg-ink-3/40" />
            <span className="eyebrow shrink-0 text-ink-3">{principle}</span>
            <span className="h-px flex-1 bg-ink-3/40" />
          </div>
        </div>

        {/* Stage rail — tablist */}
        <div
          className="grid grid-cols-5 border-b border-line"
          onKeyDown={onTabKeyDown}
          role="tablist"
          aria-label={sectionHeader?.tag ?? 'How I work'}
        >
          {stages.map((stage, i) => {
            const selected = i === active
            return (
              <button
                aria-controls={panelId(i)}
                aria-selected={selected}
                className={cn(
                  'relative min-h-11 min-w-0 border-e border-line px-2 py-3 text-start last:border-e-0',
                  'transition-colors duration-(--duration-fast) ease-standard',
                  'hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring',
                  'md:min-h-0 md:px-3 md:py-4',
                  selected ? 'text-foreground' : 'text-ink-3',
                )}
                id={tabId(i)}
                key={stage.id ?? stage.key}
                onClick={() => select(i)}
                ref={(el) => {
                  tabsRef.current[i] = el
                }}
                role="tab"
                tabIndex={selected ? 0 : -1}
                type="button"
              >
                {selected ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-0.5 bg-brand md:bottom-0 md:top-auto"
                  />
                ) : null}
                <span className="index-code block text-ink-3" dir="ltr">
                  {padStageIndex(i)}
                </span>
                <span className="eyebrow mt-1 block truncate">{stage.label}</span>
                <span
                  className={cn(
                    'mt-1.5 hidden text-caption leading-snug md:block',
                    selected ? 'text-foreground' : 'text-ink-3',
                  )}
                >
                  {stage.statement}
                </span>
              </button>
            )
          })}
        </div>

        {/* Loop edge label */}
        <div className="flex items-center justify-center gap-2 border-b border-line px-4 py-2">
          <span
            aria-hidden
            className={cn(
              'hidden h-px w-8 border-t border-dashed border-ink-3/50 sm:block',
              stageKey === 'measure' && 'border-brand',
            )}
          />
          <p className="text-caption text-ink-3">
            <span aria-hidden>↺ </span>
            {loopLabel}
          </p>
          <span
            aria-hidden
            className={cn(
              'hidden h-px w-8 border-t border-dashed border-ink-3/50 sm:block',
              stageKey === 'measure' && 'border-brand',
            )}
          />
        </div>

        {/* Body: bench + panel */}
        <div className="flex flex-col lg:min-h-[28rem] lg:flex-row">
          <div className="min-w-0 flex-1 p-4 sm:p-6 lg:w-8/12 lg:flex-[8] lg:border-e lg:border-line lg:p-8">
            <WorkspaceBench className="hidden md:block" stage={stageKey} />
            <WorkspaceBench className="md:hidden" compact stage={stageKey} />
          </div>

          <div className="relative flex min-w-0 flex-col p-4 sm:p-6 lg:w-4/12 lg:flex-[4] lg:p-8">
            {/* 1×1 grid stack — height = tallest panel */}
            <div className="grid flex-1 grid-cols-1 grid-rows-1">
              {stages.map((stage, i) => {
                const selected = i === active
                const panelIsLast = i === last
                const panelNext = stages[panelIsLast ? 0 : i + 1]!
                return (
                  <div
                    aria-hidden={!selected}
                    aria-labelledby={tabId(i)}
                    className={cn(
                      'col-start-1 row-start-1 flex flex-col',
                      'transition-opacity duration-(--duration-fast) ease-standard motion-reduce:transition-none',
                      selected ? 'opacity-100' : 'pointer-events-none opacity-0',
                    )}
                    id={panelId(i)}
                    key={stage.id ?? stage.key}
                    role="tabpanel"
                    tabIndex={selected ? 0 : -1}
                  >
                    <span className="index-code text-ink-3" dir="ltr">
                      {padStageIndex(i)} / {totalCode}
                    </span>
                    {/* Desktop: core question as h3. Mobile: statement as h3. */}
                    <h3 className="mt-3 text-h3 tracking-h3 font-medium text-foreground max-md:hidden">
                      {stage.question}
                    </h3>
                    <h3 className="mt-3 text-h3 tracking-h3 font-medium text-foreground md:hidden">
                      {stage.statement}
                    </h3>
                    <p className="mt-3 text-small text-ink-2">{stage.description}</p>

                    <dl className="mt-6 space-y-3 text-caption">
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        <dt className="eyebrow text-ink-3">{copy.output}</dt>
                        <dd className="text-foreground">{stage.output}</dd>
                      </div>
                      {stage.evidence ? (
                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                          <dt className="eyebrow text-ink-3">{copy.seenIn}</dt>
                          <dd>
                            <Link
                              className="text-foreground underline decoration-line underline-offset-4 transition-colors duration-(--duration-fast) ease-standard hover:text-brand hover:decoration-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                              href={stage.evidence.href}
                            >
                              {stage.evidence.title}
                            </Link>
                          </dd>
                        </div>
                      ) : null}
                    </dl>

                    <div className="mt-auto pt-8">
                      <button
                        className={cn(
                          'inline-flex min-h-11 w-full items-center justify-center gap-2 border border-line bg-background px-4 py-2.5',
                          'text-small font-medium text-foreground',
                          'transition-colors duration-(--duration-fast) ease-standard',
                          'hover:border-brand hover:text-brand',
                          'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring',
                          'lg:w-auto',
                        )}
                        onClick={() => select(panelIsLast ? 0 : i + 1)}
                        type="button"
                      >
                        {panelIsLast ? (
                          <>
                            {copy.backToFrame}
                            <span aria-hidden>↺</span>
                          </>
                        ) : (
                          <>
                            {copy.next} {panelNext.label}
                            <span aria-hidden>→</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
