import fs from 'node:fs/promises'
import path from 'node:path'

import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

import { COLLECTION_PATH_PREFIX } from '@/i18n/routes'
import { DEFAULT_LOCALE, LOCALES } from '@/utilities/locale'

import { about, localizeAboutLayoutFa } from './about-page'
import {
  aboutHeroRichTextFa,
  aboutMetaDescriptionFa,
  aboutMetaTitleFa,
} from './about-page-content'
import { aboutGlobalEn, aboutGlobalFa } from './about-global'
import { seedCaseStudies } from './case-studies'
import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { experienceEnData, experienceFaData, experiencesData } from './experiences'
import { experiencePageCopy } from './experience-page-copy'
import {
  buildExperienceHero,
  buildExperiencePage,
  EXPERIENCE_SLUG,
  localizeExperienceLayout,
} from './experience-page-content'
import { home } from './home'
import { HOME_MOSAIC } from './home-content'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'
import { PROJECT_SEED, toProjectData } from './projects'
import { syncCarsparencyNextProjects } from './sync-carsparency-next'
import { syncRetiredRedirects } from './sync-retired-redirects'
import { buildWorkLayout, buildWorkPage, WORK_SLUG, workCopy } from './work-content'

const collections: CollectionSlug[] = [
  'categories',
  'experiences',
  'media',
  'pages',
  'posts',
  'projects',
  'forms',
  'form-submissions',
  'search',
]

// Only the nav globals are cleared (both have `navItems`); other globals keep their content.
const globals = ['header', 'footer'] as const satisfies readonly GlobalSlug[]

const categories = ['Technology', 'News', 'Finance', 'Design', 'Software', 'Engineering']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding demo author and user...`)

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: 'demo-author@example.com',
      },
    },
  })

  payload.logger.info(`— Seeding media...`)

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-post1.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-post2.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-post3.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-hero1.webp',
    ),
  ])

  const [demoAuthor, image1Doc, image2Doc, image3Doc, imageHomeDoc] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        name: 'Demo Author',
        email: 'demo-author@example.com',
        password: 'password',
      },
    }),
    payload.create({
      collection: 'media',
      data: image1,
      file: image1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image2Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image3Buffer,
    }),
    payload.create({
      collection: 'media',
      data: imageHero1,
      file: hero1Buffer,
    }),
    categories.map((category) =>
      payload.create({
        collection: 'categories',
        data: {
          title: category,
          slug: category,
        },
      }),
    ),
  ])

  payload.logger.info(`— Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const post1Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post1({ heroImage: image1Doc, blockImage: image2Doc, author: demoAuthor }),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post2({ heroImage: image2Doc, blockImage: image3Doc, author: demoAuthor }),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post3({ heroImage: image3Doc, blockImage: image1Doc, author: demoAuthor }),
  })

  // update each post with related posts
  await payload.update({
    id: post1Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post2Doc.id, post3Doc.id],
    },
    context: { disableRevalidate: true },
  })
  await payload.update({
    id: post2Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post3Doc.id],
    },
    context: { disableRevalidate: true },
  })
  await payload.update({
    id: post3Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post2Doc.id],
    },
    context: { disableRevalidate: true },
  })

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  payload.logger.info(`— Seeding projects...`)

  // Sequential on purpose: 28 small creates, and the cover upload has to land before its project.
  const projectIds = new Map<string, string>()
  for (const row of PROJECT_SEED) {
    let coverId: string | undefined
    if (row.cover) {
      const file = await readLocalFile(row.cover.path)
      if (file) {
        const cover = await payload.create({
          collection: 'media',
          depth: 0,
          data: { alt: row.cover.alt },
          file,
        })
        coverId = cover.id
      } else {
        payload.logger.warn(`— Cover not found on disk, seeding without it: ${row.cover.path}`)
      }
    }
    const project = await payload.create({
      collection: 'projects',
      depth: 0,
      data: toProjectData(row, coverId),
      context: { disableRevalidate: true },
    })
    projectIds.set(row.slug, project.id)
  }

  // Fail loudly here rather than let `buildHomeLayout` render a mosaic with a row missing.
  const mosaicProjects = Object.fromEntries(
    HOME_MOSAIC.map(({ slug }) => {
      const id = projectIds.get(slug)
      if (!id) throw new Error(`Seed: mosaic project "${slug}" was not created`)
      return [slug, id]
    }),
  )

  payload.logger.info(`— Seeding experiences...`)

  const experienceEntries = await Promise.all(
    experiencesData.map((entry) =>
      payload.create({
        collection: 'experiences',
        depth: 0,
        data: experienceEnData(entry),
      }),
    ),
  )
  // fa is the only locale with real translated experience copy today (D-009) — every other
  // locale stays unseeded rather than silently showing English.
  await Promise.all(
    experiencesData.map((entry, i) =>
      payload.update({
        collection: 'experiences',
        id: experienceEntries[i]!.id,
        locale: 'fa',
        depth: 0,
        data: experienceFaData(entry),
      }),
    ),
  )
  const experienceDocs: Record<number, (typeof experienceEntries)[number]> = {}
  experiencesData.forEach((entry, i) => {
    experienceDocs[entry.order] = experienceEntries[i]!
  })

  payload.logger.info(`— Seeding résumé...`)

  const resumeBuffer = await fs.readFile(path.resolve(process.cwd(), 'Docs/About-Me/Resume.pdf'))
  const resumeDoc = await payload.create({
    collection: 'media',
    depth: 0,
    data: { alt: 'Sina Oshaghi — résumé (PDF)' },
    file: {
      name: 'sina-oshaghi-resume.pdf',
      data: resumeBuffer,
      mimetype: 'application/pdf',
      size: resumeBuffer.byteLength,
    },
  })

  payload.logger.info(`— Seeding pages...`)

  const [_, contactPage, workPage] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      data: home({ heroImage: imageHomeDoc, metaImage: image2Doc, mosaicProjects }),
      context: { disableRevalidate: true },
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: contactPageData({ contactForm: contactForm }),
      context: { disableRevalidate: true },
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: buildWorkPage(workCopy.en),
      context: { disableRevalidate: true },
    }),
  ])

  payload.logger.info(`— Seeding the about page...`)

  const aboutPage = await payload.create({
    collection: 'pages',
    depth: 0,
    data: about({ experienceDocs, metaImage: image2Doc }),
    context: { disableRevalidate: true },
  })

  payload.logger.info(`— Seeding the experience page...`)

  const experiencePage = await payload.create({
    collection: 'pages',
    depth: 0,
    data: buildExperiencePage(experiencePageCopy.en, projectIds, image2Doc.id),
    context: { disableRevalidate: true },
  })

  payload.logger.info(`— Localising the about page...`)

  // Only en/fa have real content today (D-009) — other locales stay unseeded rather than
  // silently mixing in English, matching `fallbackLocale: false` on public queries.
  await payload.update({
    collection: 'pages',
    id: aboutPage.id,
    locale: 'fa',
    depth: 0,
    data: {
      _status: 'published',
      title: 'درباره',
      hero: { type: 'aboutImpact', richText: aboutHeroRichTextFa },
      layout: localizeAboutLayoutFa(aboutPage.layout),
      meta: {
        description: aboutMetaDescriptionFa,
        image: image2Doc.id,
        title: aboutMetaTitleFa,
      },
    },
    context: { disableRevalidate: true },
  })

  payload.logger.info(`— Localising the work page...`)

  // Each locale publishes its own copy of the page (localizeStatus). Block rows must be sent back
  // with the ids the English create produced — rows without ids are treated as new rows and the
  // English leaves would be lost.
  const [archiveRow, ctaRow] = workPage.layout ?? []
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue
    const copy = workCopy[locale]
    await payload.update({
      collection: 'pages',
      id: workPage.id,
      locale,
      depth: 0,
      data: {
        _status: 'published',
        title: copy.title,
        layout: buildWorkLayout(copy, { archive: archiveRow?.id ?? undefined, cta: ctaRow?.id ?? undefined }),
        meta: copy.meta,
      },
      context: { disableRevalidate: true },
    })
  }

  const workCheck = await payload.findByID({ collection: 'pages', id: workPage.id, depth: 0, locale: DEFAULT_LOCALE })
  if (workCheck.slug !== WORK_SLUG || workCheck._status !== 'published') {
    throw new Error(`Seed: the work page lost its English slug/status (${workCheck.slug}, ${workCheck._status})`)
  }

  payload.logger.info(`— Localising the experience page...`)

  // Overlay, never rebuild: `localizeExperienceLayout` spreads the stored rows so every row id —
  // and every project relationship — survives. Leaves and `_status` go in the same call, or a
  // locale publishes before its text lands and `contentReady` advertises a blank page in hreflang.
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue
    const copy = experiencePageCopy[locale]
    await payload.update({
      collection: 'pages',
      id: experiencePage.id,
      locale,
      depth: 0,
      data: {
        _status: 'published',
        title: copy.title,
        hero: buildExperienceHero(copy, locale),
        layout: localizeExperienceLayout(locale, experiencePage.layout),
        meta: { ...copy.meta, image: image2Doc.id },
      },
      context: { disableRevalidate: true },
    })
  }

  const experienceCheck = await payload.findByID({
    collection: 'pages',
    id: experiencePage.id,
    depth: 0,
    locale: DEFAULT_LOCALE,
  })
  if (experienceCheck.slug !== EXPERIENCE_SLUG || experienceCheck._status !== 'published') {
    throw new Error(
      `Seed: the experience page lost its English slug/status (${experienceCheck.slug}, ${experienceCheck._status})`,
    )
  }

  payload.logger.info(`— Seeding the about global...`)

  await payload.updateGlobal({
    slug: 'about',
    data: {
      ...aboutGlobalEn,
      resume: resumeDoc.id,
    },
    context: { disableRevalidate: true },
  })
  await payload.updateGlobal({
    slug: 'about',
    locale: 'fa',
    data: aboutGlobalFa,
    context: { disableRevalidate: true },
  })

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            link: {
              type: 'reference',
              label: 'Work',
              reference: {
                relationTo: 'pages',
                value: workPage.id,
              },
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Lab',
              url: COLLECTION_PATH_PREFIX.posts,
            },
          },
          {
            link: {
              type: 'reference',
              label: 'About',
              reference: {
                relationTo: 'pages',
                value: aboutPage.id,
              },
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Experience',
              reference: {
                relationTo: 'pages',
                value: experiencePage.id,
              },
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Contact',
              reference: {
                relationTo: 'pages',
                value: contactPage.id,
              },
            },
          },
        ],
      },
      context: { disableRevalidate: true },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        description: 'Product, design, growth and AI systems — built as one connected practice.',
        pagesTitle: 'Explore',
        navLabel: 'Footer navigation',
        navItems: [
          {
            link: {
              type: 'reference',
              label: 'Work',
              reference: {
                relationTo: 'pages',
                value: workPage.id,
              },
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Lab',
              url: COLLECTION_PATH_PREFIX.posts,
            },
          },
          {
            link: {
              type: 'reference',
              label: 'About',
              reference: {
                relationTo: 'pages',
                value: aboutPage.id,
              },
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Experience',
              reference: {
                relationTo: 'pages',
                value: experiencePage.id,
              },
            },
          },
        ],
        social: [
          {
            kind: 'email',
            href: 'mailto:sinaoshaghi@gmail.com',
            ariaLabel: 'Email Sina',
          },
          {
            kind: 'linkedin',
            href: 'https://ir.linkedin.com/in/sinaoshaghi',
            ariaLabel: 'Sina on LinkedIn',
          },
          // Same destinations the `about` global already publishes as `sameAs` (about-global.ts).
          // Telegram and Instagram are selectable in the admin but unseeded: no confirmed handle
          // exists yet, and a dead social action is worse than a missing one.
          {
            kind: 'dribbble',
            href: 'https://dribbble.com/ceendesign',
            ariaLabel: 'Sina on Dribbble',
          },
          {
            kind: 'behance',
            href: 'https://behance.net/sinaoshaghi',
            ariaLabel: 'Sina on Behance',
          },
        ],
        about: {
          title: 'Approach',
          text: 'Turning ambiguous product and business problems into structured systems and shipped outcomes.',
          linkLabel: 'Experience',
          linkHref: `/${EXPERIENCE_SLUG}`,
        },
        contact: {
          title: 'Get in touch',
          text: 'For product, design and growth work.',
          linkLabel: 'Email Sina',
          linkHref: 'mailto:sinaoshaghi@gmail.com',
        },
        copyright: `© ${new Date().getFullYear()} Sina Oshaghi`,
      },
      context: { disableRevalidate: true },
    }),
  ])

  // The RP1 case study sits on top of its archive entry — additive, so it also runs standalone
  // against a live database via `pnpm seed:case-studies`.
  await seedCaseStudies({ payload })

  // Retired `/work/<slug>` → `/work`, plus Carsparency next-project links when case studies exist.
  await syncRetiredRedirects({ payload })
  await syncCarsparencyNextProjects({ payload })

  payload.logger.info('Seeded database successfully!')
}

/** A file from this checkout (project covers under `Docs/`) — null when absent, e.g. on a deployed server. */
async function readLocalFile(relativePath: string): Promise<File | null> {
  const absolute = path.resolve(process.cwd(), relativePath)
  try {
    const data = await fs.readFile(absolute)
    const ext = path.extname(absolute).slice(1).toLowerCase()
    return {
      name: path.basename(absolute),
      data,
      mimetype: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
      size: data.byteLength,
    }
  } catch {
    return null
  }
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
