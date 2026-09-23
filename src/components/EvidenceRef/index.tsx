import Link from 'next/link'
import React from 'react'

import type { Project } from '@/payload-types'

import { hasPublicCaseStudy, projectUrl } from '@/i18n/routes'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'

export type EvidenceRefProps = {
  className?: string
  label: string
  locale?: Locale
  project?: number | Project | string | null
}

/**
 * One evidence reference under a capability — "Digikala", "Yaravan", "RP1 Arena".
 *
 * It becomes a link only when the referenced project has a **published case study**, which is the
 * same predicate `/work` and the sitemap use (`hasPublicCaseStudy`, D-021/D-022). A project may be
 * published in the archive without having a detail page, so linking on `_status` alone would send
 * readers to a 404.
 *
 * That is why the label is stored as text beside the relationship rather than read off the
 * project: most evidence has no case study yet and must still be nameable. When one publishes,
 * this turns into a link on its own — no code change, no content migration.
 */
export const EvidenceRef: React.FC<EvidenceRefProps> = ({
  className,
  label,
  locale = DEFAULT_LOCALE,
  project,
}) => {
  const doc = typeof project === 'object' && project !== null ? project : null

  if (doc && hasPublicCaseStudy(doc)) {
    return (
      <Link
        className={cn(
          'underline decoration-line underline-offset-4 transition-colors duration-(--duration-fast) ease-standard hover:text-brand hover:decoration-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
          className,
        )}
        href={projectUrl(doc, locale)}
      >
        {label}
      </Link>
    )
  }

  return <span className={className}>{label}</span>
}
