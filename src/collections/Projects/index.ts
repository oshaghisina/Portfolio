import type { CollectionConfig } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import {
  caseStudyTab,
  projectHeaderFields,
  translationReviewedField,
  validateCaseStudyStatus,
} from './caseStudy'
import { PROJECT_KIND_LABELS, PROJECT_KINDS } from './kinds'
import { revalidateDelete, revalidateProject } from './hooks/revalidateProject'

/**
 * One record per project — the single source of what a project *is* (D-021). Pages decide how
 * it is presented: the homepage `selectedWork` block references one record, the `/work` archive
 * lists every published one, and `/work/<slug>` renders the same document's case-study layer
 * (D-022, see `./caseStudy.ts`).
 *
 * `company` is plain text until projects relate to `experiences`. Publication is Payload's
 * per-locale draft/publish; `caseStudyStatus` is the separate gate for a detail link, and it
 * cannot be set to published while the case study has no sections.
 */
export const Projects: CollectionConfig<'projects'> = {
  slug: 'projects',
  labels: { singular: 'Project', plural: 'Projects' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // What a referencing document (the homepage block) receives — the archive-row fields plus the
  // cover and its companion, which must be listed here or they never reach the page. See
  // `defaultPopulate` on Posts.
  defaultPopulate: {
    title: true,
    slug: true,
    summary: true,
    company: true,
    role: true,
    kind: true,
    period: true,
    cover: true,
    coverCompanion: true,
    liveUrl: true,
    caseStudyStatus: true,
    featured: true,
    order: true,
    // NextProject / SelectedWork read the positioning line and the first hero screen.
    statement: true,
    hero: true,
  },
  admin: {
    defaultColumns: [
      'title',
      'company',
      'kind',
      'caseStudyStatus',
      'featured',
      'order',
      '_status',
      'updatedAt',
    ],
    description:
      'What a project is: title, organisation, role, one-paragraph summary, cover. How it appears is decided by the page that references it. Publish a project to list it on /work; set "Case study" to published only once /work/<slug> has real content.',
    useAsTitle: 'title',
    // A Persian admin preview opens `/fa/work/<slug>` — the locale comes from the admin's selection.
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({ slug: data?.slug, collection: 'projects', req }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({ slug: data?.slug as string, collection: 'projects', req }),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Project',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'company',
                  type: 'text',
                  localized: true,
                  required: true,
                  admin: {
                    description:
                      'Organisation or product owner — "Independent" for freelance work.',
                    width: '50%',
                  },
                },
                {
                  name: 'role',
                  type: 'text',
                  localized: true,
                  admin: {
                    description: 'Sina\'s role on this project, e.g. "Product designer".',
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'summary',
              type: 'textarea',
              localized: true,
              required: true,
              admin: {
                description:
                  'One or two sentences — source-backed, no unverified outcomes or numbers.',
              },
            },
            {
              name: 'kind',
              type: 'select',
              hasMany: true,
              options: PROJECT_KINDS.map((value) => ({ label: PROJECT_KIND_LABELS[value], value })),
              admin: {
                description:
                  'The nature of the work (not the tools). One or two values; drives the /work filter.',
              },
            },
            {
              name: 'period',
              type: 'group',
              admin: {
                description:
                  'Leave empty until dates are confirmed — the archive shows the organisation instead.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'start',
                      type: 'date',
                      admin: { date: { pickerAppearance: 'monthOnly' }, width: '50%' },
                    },
                    {
                      name: 'end',
                      type: 'date',
                      admin: {
                        condition: (_data, siblingData) => !siblingData?.present,
                        date: { pickerAppearance: 'monthOnly' },
                        width: '50%',
                      },
                    },
                  ],
                },
                {
                  name: 'present',
                  type: 'checkbox',
                  label: 'Ongoing',
                },
              ],
            },
            ...projectHeaderFields,
            {
              name: 'cover',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'Real project evidence — UI, dashboard, artifact. Portrait screens are fine; the page frames them instead of cropping. Leave empty to show the "media pending" placeholder.',
              },
            },
            {
              name: 'coverCompanion',
              type: 'upload',
              relationTo: 'media',
              label: 'Cover companion',
              admin: {
                description:
                  'A second, clearly different screen of the same product, tilted behind the cover on Home, /work and the next-project card. A phone screen pairs with a phone cover or a desktop one. Leave empty to use the case study’s second hero screen.',
              },
            },
            {
              name: 'liveUrl',
              type: 'text',
              label: 'Live / external URL',
              admin: {
                description:
                  'Optional. A live product or external page; archive rows show it with an outward arrow.',
              },
              validate: (value: string | null | undefined) => {
                if (!value) return true
                try {
                  const url = new URL(value)
                  return (
                    url.protocol === 'https:' ||
                    url.protocol === 'http:' ||
                    'Enter a full URL starting with https://'
                  )
                } catch {
                  return 'Enter a full URL starting with https://'
                }
              },
            },
          ],
        },
        caseStudyTab,
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      admin: {
        description: 'Editorial selection marker. The /work archive includes every published project, regardless of this setting.',
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 50,
      admin: {
        description:
          'Editorial order in the /work gallery and list — lower first.',
        position: 'sidebar',
        step: 1,
      },
    },
    {
      name: 'caseStudyStatus',
      type: 'select',
      label: 'Case study',
      defaultValue: 'none',
      required: true,
      options: [
        { label: 'None — archive entry only', value: 'none' },
        { label: 'Draft — being written', value: 'draft' },
        { label: 'Published — link to /work/<slug>', value: 'published' },
      ],
      admin: {
        description:
          'Separate from publishing the project: only "Published" turns archive rows into links.',
        position: 'sidebar',
      },
      validate: validateCaseStudyStatus,
    },
    translationReviewedField,
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateProject],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      // Per-locale publication, like Pages/Posts (D-009): an English project is not automatically
      // public under /fa/work.
      localizeStatus: true,
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
