import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload, type Payload } from 'payload'
import React from 'react'

import type { ProjectArchiveBlock as ProjectArchiveBlockProps } from '@/payload-types'

import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'

import { EmptyState } from './EmptyState'
import { ProjectIndex } from './ProjectIndex'
import { withLocalPreviewMedia } from './localPreview'
import { countCompanies, toIndexRows } from './rows'
import { WorkIntro } from './WorkIntro'
import './archive.css'

export type ProjectArchiveProps = ProjectArchiveBlockProps & {
  className?: string
  locale?: Locale
}

/** Default-locale company names by project id: `?company=` must not change with the language. */
async function defaultCompanyNames(payload: Payload, draft: boolean): Promise<Map<string, string>> {
  const { docs } = await payload.find({
    collection: 'projects',
    depth: 0,
    draft,
    fallbackLocale: false,
    limit: 0,
    locale: DEFAULT_LOCALE,
    overrideAccess: draft,
    pagination: false,
    select: { company: true },
  })
  return new Map(docs.flatMap((doc) => (doc.company ? [[doc.id, doc.company] as const] : [])))
}

/**
 * One complete catalogue in editorial order. Case-study readiness and featured status never
 * exclude an archive entry. Empty in a locale means empty — no English fallback (D-009).
 */
export const ProjectArchiveBlock: React.FC<ProjectArchiveProps> = async ({
  className,
  locale = DEFAULT_LOCALE,
  sectionHeader,
}) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const [{ docs }, companyNames] = await Promise.all([
    payload.find({
      collection: 'projects',
      depth: 1,
      draft,
      fallbackLocale: false,
      limit: 0,
      locale,
      overrideAccess: draft,
      pagination: false,
      sort: ['order', 'title'],
      select: {
        title: true,
        slug: true,
        summary: true,
        company: true,
        role: true,
        kind: true,
        period: true,
        cover: true,
        coverCompanion: true,
        hero: true,
        liveUrl: true,
        caseStudyStatus: true,
      },
    }),
    locale === DEFAULT_LOCALE ? undefined : defaultCompanyNames(payload, draft),
  ])

  const rows = await withLocalPreviewMedia(toIndexRows(docs, locale, companyNames))

  return (
    <section className={cn(className)}>
      <WorkIntro
        companyCount={countCompanies(docs)}
        locale={locale}
        projectCount={docs.length}
        sectionHeader={sectionHeader}
      />

      {docs.length === 0 ? (
        <EmptyState className="mt-section-sm" locale={locale} />
      ) : (
        <ProjectIndex locale={locale} rows={rows} />
      )}
    </section>
  )
}
