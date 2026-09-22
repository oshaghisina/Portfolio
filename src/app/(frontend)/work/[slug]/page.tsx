import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React, { cache } from 'react'

import type { Project } from '@/payload-types'

import { buildChapters } from '@/blocks/CaseStudy/chapters'
import { RenderCaseStudy } from '@/blocks/CaseStudy/RenderCaseStudy'
import { CaseStudyHeader } from '@/components/CaseStudy/CaseStudyHeader'
import { CaseStudyHero, hasHeroMedia } from '@/components/CaseStudy/CaseStudyHero'
import { caseStudyCopy } from '@/components/CaseStudy/copy'
import { SectionIndex } from '@/components/CaseStudy/SectionIndex'
import { Snapshot } from '@/components/CaseStudy/Snapshot'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { NextProject, type NextProjectDoc } from '@/components/NextProject'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { localePath } from '@/i18n/navigation'
import { hasPublicCaseStudy, projectPath } from '@/i18n/routes'
import { buildCreativeWorkJsonLd } from '@/utilities/creativeWorkSchema'
import { generateMeta } from '@/utilities/generateMeta'
import { getLocale } from '@/utilities/getLocale'
import { getServerSideURL } from '@/utilities/getURL'
import type { Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'

import PageClient from './page.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const projects = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
    where: { caseStudyStatus: { equals: 'published' } },
  })

  return projects.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{ slug?: string }>
}

/**
 * `/work/<slug>` — the case study (D-022). Same locale/draft plumbing as `posts/[slug]`: the
 * proxy resolves `/fa/work/<slug>` to this route with the locale on a header, and a draft is only
 * visible with draft mode on. A project that exists but has no published case study is an
 * archive entry, not a page: it is never linked to, and a direct hit is a 404.
 */
export default async function ProjectPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const locale = await getLocale()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = projectPath({ slug: decodedSlug })
  const project = await queryProjectBySlug({ locale, slug: decodedSlug })

  if (!project) return <PayloadRedirects locale={locale} url={url} />

  const sections = project.sections ?? []
  if (!draft && !(hasPublicCaseStudy(project) && sections.length)) notFound()

  const copy = caseStudyCopy[locale]
  const chapters = buildChapters(sections, copy)
  const next = await queryNextProject({ current: project, locale })
  const serverUrl = getServerSideURL()
  const jsonLd = buildCreativeWorkJsonLd({ locale, project, serverUrl, url: `${serverUrl}${localePath(locale, url)}` })

  return (
    <article className="pt-8 pb-section md:pt-14">
      <PageClient />
      <PayloadRedirects disableNotFound locale={locale} url={url} />
      {draft && <LivePreviewListener />}
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} type="application/ld+json" />

      <div className="container">
        <CaseStudyHeader copy={copy} locale={locale} project={project} />
        <CaseStudyHero className="mt-12 md:mt-16" copy={copy} hero={project.hero} />
        <Snapshot className="mt-12 md:mt-20" copy={copy} snapshot={project.snapshot} />
        {/* Wide viewports get the DS-14 margin index in an inline-start rail; below `xl` the narrative takes the full width. */}
        <div className="xl:grid xl:grid-cols-[9rem_minmax(0,1fr)] xl:gap-x-10">
          <SectionIndex chapters={chapters} className="xl:pt-section" label={copy.contents} />
          <RenderCaseStudy copy={copy} firstFigure={hasHeroMedia(project.hero) ? 2 : 1} locale={locale} sections={sections} />
        </div>
        <NextProject
          className="mt-section"
          copy={copy}
          locale={locale}
          pendingLabel={uiCopy[locale].workMediaPending}
          project={next}
        />
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const locale = await getLocale()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const project = await queryProjectBySlug({ locale, slug: decodedSlug })

  return generateMeta({ doc: project, locale, logicalPath: projectPath({ slug: decodedSlug }) })
}

const queryProjectBySlug = cache(async ({ locale, slug }: { locale: Locale; slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    // Depth 2 reaches the next project's cover and hero media through the `nextProject` relationship.
    depth: 2,
    draft,
    fallbackLocale: false,
    limit: 1,
    locale,
    overrideAccess: draft,
    pagination: false,
    where: { slug: { equals: slug } },
  })

  return result.docs?.[0] || null
})

/**
 * The hand-over at the end of the page: the editor's explicit pick when it is a public case study
 * in this locale, otherwise the next published case study by `order`, wrapping around to the first.
 */
const queryNextProject = cache(
  async ({ current, locale }: { current: Project; locale: Locale }): Promise<NextProjectDoc | null> => {
    const explicit = current.nextProject
    if (explicit && typeof explicit === 'object' && hasPublicCaseStudy(explicit) && explicit.slug !== current.slug) {
      return explicit
    }

    const payload = await getPayload({ config: configPromise })
    const query = {
      collection: 'projects' as const,
      depth: 1,
      draft: false,
      fallbackLocale: false as const,
      limit: 1,
      locale,
      overrideAccess: false,
      pagination: false,
      sort: 'order',
    }
    const published = { caseStudyStatus: { equals: 'published' } }
    const notSelf = { slug: { not_equals: current.slug } }

    const after = await payload.find({ ...query, where: { and: [published, notSelf, { order: { greater_than: current.order } }] } })
    if (after.docs[0]) return after.docs[0]

    const wrap = await payload.find({ ...query, where: { and: [published, notSelf] } })
    return wrap.docs[0] ?? null
  },
)
