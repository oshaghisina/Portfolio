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

const FEATURED_LIMIT = 3
const FEATURED_VARIANTS: FeaturedVariant[] = ['primary', 'split', 'split-reverse']

export type ProjectArchiveProps = ProjectArchiveBlockProps & {
  className?: string
  disableInnerContainer?: boolean
  locale?: Locale
}

/**
 * The evidence layer: reads every project published in this locale (drafts too in preview),
 * hands the first `FEATURED_LIMIT` featured ones to the large → medium → medium chapters, and
 * lists all of them in the index. Empty in a locale means empty — no English leaks in (D-009).
 */
export const ProjectArchiveBlock: React.FC<ProjectArchiveProps> = async ({
  className,
  disableInnerContainer,
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
    <section className={cn(!disableInnerContainer && 'container', className)}>
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
            <div className="flex flex-col gap-section pt-section">
              <FeaturedProject index={padIndex(0)} locale={locale} project={primary} variant="primary" />
              {secondary.length ? (
                <div className="flex flex-col gap-section">
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

          <ProjectIndex className="pt-section lg:pt-[18vh]" locale={locale} rows={toIndexRows(docs, locale)} />
        </>
      )}
    </section>
  )
}
