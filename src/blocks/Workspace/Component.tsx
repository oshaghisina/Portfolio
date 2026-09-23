import React from 'react'

import type { Project, WorkspaceBlock as WorkspaceBlockProps } from '@/payload-types'

import { hasPublicCaseStudy, projectUrl } from '@/i18n/routes'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'

import { WorkspaceClient } from './Component.client'
import { orderStages, type ResolvedStage } from './stages'

export type WorkspaceProps = Pick<
  WorkspaceBlockProps,
  'sectionHeader' | 'principle' | 'loopLabel' | 'stages'
> & {
  className?: string
  locale?: Locale
}

function resolveEvidence(
  evidence: (string | null) | Project | undefined,
  locale: Locale,
): ResolvedStage['evidence'] {
  if (!evidence || typeof evidence !== 'object') return null
  if (!hasPublicCaseStudy(evidence)) return null
  return {
    href: projectUrl(evidence, locale),
    title: evidence.title,
  }
}

/**
 * Server shell: orders stages by key, resolves “Seen in” only for published case studies, and
 * hands an interactive client the rest. SSR still paints stage 01 with the full rail.
 */
export const WorkspaceBlock: React.FC<WorkspaceProps> = ({
  className,
  locale = DEFAULT_LOCALE,
  loopLabel,
  principle,
  sectionHeader,
  stages,
}) => {
  const ordered = orderStages(stages).map((stage) => {
    const row = (stages ?? []).find((s) => s.key === stage.key)
    return {
      ...stage,
      evidence: resolveEvidence(row?.evidence ?? undefined, locale),
    }
  })

  if (!ordered.length || !principle || !loopLabel) return null

  return (
    <WorkspaceClient
      className={className}
      locale={locale}
      loopLabel={loopLabel}
      principle={principle}
      sectionHeader={sectionHeader}
      stages={ordered}
    />
  )
}
