import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import React from 'react'

import type { ProjectArchiveBlock as ProjectArchiveBlockProps } from '@/payload-types'

import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'

import { EmptyState } from './EmptyState'
import { FeaturedProject, type FeaturedVariant } from './FeaturedProject'
import { ProjectIndex } from './ProjectIndex'
import { countCompanies, padIndex, toIndexRows } from './rows'
import { WorkIntro } from './WorkIntro'

/**
 * How many featured chapters open the archive, and the canvas each one gets. The list is sliced to
 * this length, so a row flagged `featured` beyond it renders only in the index — keep the count of
 * `featured: true` rows in `PROJECT_SEED` equal to this (D-010 asks for six to eight).
 *
 * One `primary` full-width opening, then alternating splits. `FeaturedProject` falls back to
 * `'split'` for an index past the end, so the array only has to cover the common case.
 */
const FEATURED_LIMIT = 6
const FEATURED_VARIANTS: FeaturedVariant[] = [
  'primary',
  'split',
  'split-reverse',
  'split',
  'split-reverse',
  'split',
]

export type ProjectArchiveProps = ProjectArchiveBlockProps & {
  className?: string
  locale?: Locale
}

/**
 * The evidence layer: reads every project published in this locale (drafts too in preview),
 * hands the first `FEATURED_LIMIT` featured ones to the large → medium → medium chapters, and
 * lists all of them in the index. Empty in a locale means empty — no English leaks in (D-009).
 */
export const ProjectArchiveBlock: React.FC<ProjectArchiveProps> = async ({
  className,
  locale = DEFAULT_LOCALE,
  sectionHeader,
}) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'projects',
    depth: 1,
    draft,
    fallbackLocale: false,
    limit: 100,
    locale,
    overrideAccess: draft,
    pagination: false,
    sort: ['order', 'title'],
  })

  const featured = docs.filter((doc) => doc.featured).slice(0, FEATURED_LIMIT)
  const [primary, ...secondary] = featured

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
        <>
          {primary ? (
            <div className="flex flex-col gap-section-sm pt-section-sm">
              <FeaturedProject index={padIndex(0)} locale={locale} project={primary} variant="primary" />
              {secondary.length ? (
                <div className="flex flex-col gap-section-sm">
                  {secondary.map((project, i) => (
                    <FeaturedProject
                      index={padIndex(i + 1)}
                      key={project.id}
                      locale={locale}
                      project={project}
                      variant={FEATURED_VARIANTS[i + 1] ?? 'split'}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          <ProjectIndex className="pt-section-sm" locale={locale} rows={toIndexRows(docs, locale)} />
        </>
      )}
    </section>
  )
}
