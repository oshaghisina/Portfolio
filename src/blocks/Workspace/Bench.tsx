import React from 'react'
import {
  ArrowDown,
  ArrowRight,
  Check,
  Circle,
  Crosshair,
  Layers,
  ScanLine,
  Workflow,
} from 'lucide-react'

import { cn } from '@/utilities/ui'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { STAGE_KEYS, padStageIndex, type StageKey } from './stages'
import { visualCaptions, visualCopy } from './visualCopy'

/** Real HTML labels stay readable at every width; the diagram is a schematic, not project data. */
export function WorkspaceBench({
  className,
  locale = DEFAULT_LOCALE,
  stage,
}: {
  className?: string
  locale?: Locale
  stage: StageKey
}) {
  const c = visualCopy(locale)
  return (
    <div
      className={cn('workbench-bench motion-reduce:[&_*]:!animate-none', className)}
      data-stage={stage}
    >
      <div className="wb-canvas-heading">
        <span>
          <span className="wb-status-dot" />
          {c.model}
        </span>
        <span className="index-code" dir="ltr">
          {padStageIndex(STAGE_KEYS.indexOf(stage))} / 05
        </span>
      </div>
      <div className="wb-stage-stack">
        {STAGE_KEYS.map((key) => (
          <BenchStage key={key} locale={locale} stage={key} active={key === stage} />
        ))}
      </div>
    </div>
  )
}

function BenchStage({
  locale,
  stage,
  active,
}: {
  locale: Locale
  stage: StageKey
  active: boolean
}) {
  const c = visualCopy(locale)
  return (
    <figure className="wb-stage" aria-hidden={!active} inert={!active}>
      <div className="wb-scene">
        {stage === 'frame' && (
          <div className="wb-frame wb-composition">
            <div className="wb-inputs">
              {[c.research, c.constraints, c.baseline].map((label, i) => (
                <div className="wb-chip" key={label}>
                  <span className="wb-node-number">0{i + 1}</span>
                  {label}
                </div>
              ))}
            </div>
            <div className="wb-converge" aria-hidden>
              <i />
              <i />
              <i />
            </div>
            <div className="wb-focus-card">
              <Crosshair size={26} strokeWidth={1.5} />
              <strong>{c.problem}</strong>
              <div className="wb-skeleton">
                <i />
                <i />
              </div>
            </div>
            <div className="wb-vertical-link" aria-hidden>
              <ArrowDown size={18} />
            </div>
            <div className="wb-result">
              <Check size={16} />
              {c.success}
            </div>
          </div>
        )}
        {stage === 'map' && (
          <div className="wb-map wb-composition">
            <svg
              className="wb-map-lines"
              viewBox="0 0 500 300"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path d="M125 45 V150 H375 V255 M375 45 V150 H125 V255" />
            </svg>
            {[c.people, c.business, c.operations, c.technology].map((label, i) => (
              <div className={`wb-map-node wb-map-node-${i}`} key={label}>
                <span className="wb-node-number">0{i + 1}</span>
                <strong>{label}</strong>
              </div>
            ))}
            <div className="wb-map-hub">
              <Workflow size={25} strokeWidth={1.5} />
              <strong>{c.experience}</strong>
            </div>
          </div>
        )}
        {stage === 'decide' && (
          <div className="wb-priorities wb-composition">
            {[
              { status: c.now, title: c.journey, icon: Check },
              { status: c.next, title: c.assumption, icon: Circle },
              { status: c.later, title: c.extras, icon: Layers },
            ].map(({ status, title, icon: Icon }, i) => (
              <div className={`wb-priority wb-priority-${i}`} key={status}>
                <span className="wb-node-number">0{i + 1}</span>
                <div>
                  <small>{status}</small>
                  <strong>{title}</strong>
                </div>
                <Icon size={21} strokeWidth={1.5} />
              </div>
            ))}
          </div>
        )}
        {stage === 'ship' && (
          <div className="wb-ship wb-composition">
            <div className="wb-product">
              <div className="wb-window-bar">
                <span aria-hidden>•••</span>
                <span>
                  <span className="wb-status-dot" />
                  {c.ready}
                </span>
              </div>
              <div className="wb-product-body">
                <ScanLine size={32} strokeWidth={1.3} />
                <strong>{c.complete}</strong>
                <div className="wb-journey" aria-hidden>
                  <span>
                    <Check size={17} />
                  </span>
                  <i />
                  <span>
                    <Check size={17} />
                  </span>
                  <i />
                  <span>
                    <Check size={17} />
                  </span>
                </div>
              </div>
            </div>
            <div className="wb-checklist">
              {[c.design, c.build, c.operate].map((label) => (
                <span key={label}>
                  <Check size={14} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}
        {stage === 'measure' && (
          <div className="wb-measure wb-composition">
            <div className="wb-chart">
              <div className="wb-chart-legend">
                <span>
                  <i />
                  {c.observed}
                </span>
                <span>
                  <i />
                  {c.target}
                </span>
              </div>
              <svg viewBox="0 0 440 150" preserveAspectRatio="none" aria-hidden>
                <path className="wb-chart-grid" d="M0 30 H440 M0 80 H440 M0 130 H440" />
                <path className="wb-chart-target" d="M0 52 H440" />
                <path
                  className="wb-chart-line"
                  pathLength="1"
                  d="M0 116 L55 100 L110 111 L165 66 L220 83 L275 48 L330 70 L385 56 L440 63"
                />
                <circle cx="275" cy="48" r="5" />
              </svg>
            </div>
            <div className="wb-learning">
              <span>{c.observed}</span>
              <ArrowRight size={16} aria-hidden />
              <span>{c.learn}</span>
              <ArrowRight size={16} aria-hidden />
              <strong>{c.decision}</strong>
            </div>
            <div className="wb-feedback" aria-hidden>
              ↶
            </div>
          </div>
        )}
      </div>
      <figcaption className="wb-caption">
        <span>{c.illustrative}</span>
        <strong>{visualCaptions[locale][STAGE_KEYS.indexOf(stage)]}</strong>
      </figcaption>
    </figure>
  )
}
