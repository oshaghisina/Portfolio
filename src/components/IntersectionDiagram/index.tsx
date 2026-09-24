import React, { useId } from 'react'

import { cn } from '@/utilities/ui'
import { DEFAULT_LOCALE, dirFor, type Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'
import { intersectionCopy } from './copy'

export interface IntersectionDiagramProps {
  className?: string
  locale?: Locale
}

/** Three overlapping fields share one working area. Labels remain HTML at every viewport size. */
export const IntersectionDiagram: React.FC<IntersectionDiagramProps> = ({
  className,
  locale = DEFAULT_LOCALE,
}) => {
  const id = useId().replace(/:/g, '')
  const copy = uiCopy[locale].aboutIntersection
  const detail = intersectionCopy[locale]
  const circles = [
    { x: 260, y: 144 },
    { x: 185, y: 272 },
    { x: 335, y: 272 },
  ]
  const label = (index: number) => (
    <div className={`intersection-label intersection-label-${index}`} dir={dirFor(locale)}>
      <span className="intersection-domain">
        <span className="index-code" dir="ltr">
          0{index + 1}
        </span>
        {copy.domains[index]}
      </span>
      <span className="intersection-lens">{detail.lenses[index]}</span>
    </div>
  )

  return (
    <figure className={cn('intersection-diagram', className)} dir="ltr">
      {label(0)}
      <svg aria-hidden="true" className="intersection-art" fill="none" viewBox="0 0 520 420">
        <defs>
          {circles.map(({ x, y }, i) => (
            <clipPath id={`${id}-field-${i}`} key={i}>
              <circle cx={x} cy={y} r="116" />
            </clipPath>
          ))}
          <linearGradient id={`${id}-surface`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="var(--foreground)" stopOpacity=".075" />
            <stop offset="1" stopColor="var(--foreground)" stopOpacity=".015" />
          </linearGradient>
          <linearGradient id={`${id}-overlap`} x1="0" y1="0" x2="0.8" y2="1">
            <stop stopColor="var(--track-accent)" stopOpacity=".9" />
            <stop offset="1" stopColor="var(--track-accent)" stopOpacity=".38" />
          </linearGradient>
        </defs>
        {/* Quiet drafting marks establish a stable field around the three domains. */}
        <g stroke="var(--line)" strokeWidth="1">
          <path d="M24 44 V24 H44 M476 24 H496 V44 M24 376 V396 H44 M476 396 H496 V376" />
          <path d="M260 6 V18 M10 224 H22 M498 224 H510" />
        </g>
        <g className="intersection-fields">
          {circles.map(({ x, y }, i) => (
            <circle
              className={`intersection-field intersection-field-${i}`}
              key={i}
              cx={x}
              cy={y}
              r="116"
              fill={`url(#${id}-surface)`}
              stroke="var(--ink-3)"
              strokeWidth="1.2"
              strokeOpacity=".65"
            />
          ))}
        </g>
        {/* A real three-way intersection, clipped to every field; never a floating unrelated node. */}
        <g clipPath={`url(#${id}-field-0)`}>
          <g clipPath={`url(#${id}-field-1)`}>
            <circle
              className="intersection-overlap"
              cx="335"
              cy="272"
              r="116"
              fill={`url(#${id}-overlap)`}
            />
          </g>
        </g>
        <g stroke="var(--track-accent)" strokeWidth="1.5" strokeDasharray="2 5" opacity=".6">
          <path d="M260 118 V207 M168 282 L244 234 M352 282 L276 234" />
        </g>
        {/* Distinct domain symbols occupy each field's exclusive area. */}
        <g
          className="intersection-symbol"
          stroke="var(--ink-2)"
          strokeWidth="1.7"
          strokeLinejoin="round"
        >
          <g transform="translate(231 68)">
            <rect width="58" height="40" rx="4" fill="var(--background)" />
            <path d="M0 12 H58 M19 12 V40 M27 21 H48 M27 29 H41" />
            <path d="M7 6 H9 M13 6 H15" stroke="var(--track-accent)" />
          </g>
          <g transform="translate(119 282)">
            <path d="M0 34 H54 M4 27 L20 14 L34 22 L52 0" />
            <path d="M42 0 H52 V10" stroke="var(--track-accent)" />
            <circle cx="20" cy="14" r="3" fill="var(--background)" />
            <circle cx="34" cy="22" r="3" fill="var(--background)" />
          </g>
          <g transform="translate(349 279)">
            <path d="M0 10 L26 0 L52 10 L26 20 Z" fill="var(--background)" />
            <path d="M0 21 L26 31 L52 21 M0 32 L26 42 L52 32" />
            <path d="M26 20 V42" stroke="var(--track-accent)" />
          </g>
        </g>
        <g className="intersection-core" transform="translate(260 224)">
          <circle r="24" fill="var(--background)" stroke="var(--track-accent)" strokeWidth="1.5" />
          <circle r="17" fill="var(--track-accent)" />
          <path d="M-7 0 H7 M0 -7 V7" stroke="var(--background)" strokeWidth="1.8" />
          <circle
            className="intersection-pulse"
            r="31"
            stroke="var(--track-accent)"
            strokeWidth="1"
            opacity=".35"
          />
        </g>
        {/* One-time signals gather at the centre; they do not loop beside the reader. */}
        <g fill="var(--track-accent)">
          <circle className="intersection-signal intersection-signal-0" cx="260" cy="224" r="3" />
          <circle className="intersection-signal intersection-signal-1" cx="260" cy="224" r="3" />
          <circle className="intersection-signal intersection-signal-2" cx="260" cy="224" r="3" />
        </g>
        <path
          d="M260 260 V408"
          stroke="var(--track-accent)"
          strokeWidth="1"
          strokeDasharray="2 5"
          opacity=".55"
        />
        <circle cx="260" cy="411" r="3" fill="var(--track-accent)" />
      </svg>
      <div className="intersection-bottom-labels">
        {label(1)}
        {label(2)}
      </div>
      <figcaption className="intersection-caption" dir={dirFor(locale)}>
        <span className="intersection-caption-kicker">{copy.caption}</span>
        <strong>{copy.centre}</strong>
        <p>{detail.outcome}</p>
        <span className="sr-only">{copy.description}</span>
      </figcaption>
    </figure>
  )
}
