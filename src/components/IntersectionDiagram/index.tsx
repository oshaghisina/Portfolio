import type { FC } from 'react'

import { DEFAULT_LOCALE, dirFor, type Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'
import { intersectionCopy } from './copy'
import { IntersectionMotion } from './Motion.client'
import { IntersectionScene } from './Scene'

export interface IntersectionDiagramProps {
  className?: string
  locale?: Locale
}

/** Three isometric disciplines converge on one operating core. Labels stay HTML for i18n. */
export const IntersectionDiagram: FC<IntersectionDiagramProps> = ({
  className,
  locale = DEFAULT_LOCALE,
}) => {
  const copy = uiCopy[locale].aboutIntersection
  const detail = intersectionCopy[locale]
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
    <IntersectionMotion className={className}>
      {label(0)}
      <svg
        aria-hidden="true"
        className="intersection-art cap-illustration"
        fill="none"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 400 280"
      >
        <IntersectionScene />
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
    </IntersectionMotion>
  )
}
