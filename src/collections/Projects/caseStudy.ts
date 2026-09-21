import type { Field, Tab, Where } from 'payload'

import { caseStudyBlocks } from '@/blocks/CaseStudy'

/**
 * The case-study layer of a project (D-022) — everything `/work/<slug>` needs beyond the
 * archive facts D-021 defined. Kept in its own module so `index.ts` stays a readable table of
 * contents: header metadata, the "Case study" tab, the per-locale translation flag, and the
 * publish rule for `caseStudyStatus`.
 */
export const PROJECT_STATUSES = ['shipped', 'in-progress', 'pre-launch', 'paused', 'concept'] as const
export type ProjectStatusValue = (typeof PROJECT_STATUSES)[number]

/** Appended to the "Project" tab after `period`: the compact header metadata. */
export const projectHeaderFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'industry',
        type: 'text',
        localized: true,
        admin: {
          description: 'e.g. "Gaming · play-to-earn". Free text until a domain taxonomy is decided (Content-Model §13).',
          width: '50%',
        },
      },
      {
        name: 'team',
        type: 'text',
        localized: true,
        admin: { description: 'Who else was on it, one line — roles, not names unless public.', width: '50%' },
      },
    ],
  },
  {
    type: 'row',
    fields: [
      {
        name: 'projectStatus',
        type: 'select',
        label: 'Status',
        options: [
          { label: 'Shipped', value: 'shipped' },
          { label: 'In progress', value: 'in-progress' },
          { label: 'Pre-launch', value: 'pre-launch' },
          { label: 'Paused', value: 'paused' },
          { label: 'Concept', value: 'concept' },
        ],
        admin: { description: 'Shown in the case-study header; labels are translated in code.', width: '50%' },
      },
      {
        name: 'tools',
        type: 'text',
        hasMany: true,
        admin: { description: 'Tool names in Latin — not translated.', width: '50%' },
      },
    ],
  },
]

/** The "Case study" tab: statement, hero, snapshot, the controlled block narrative, next project. */
export const caseStudyTab: Tab = {
  label: 'Case study',
  description:
    'The argument: Context → Problem → Constraints → Ownership → Approach → Decisions → Evidence → Outcomes → Learning. Six to nine chapters; figures, process maps and findings are evidence inside a chapter.',
  fields: [
    {
      name: 'statement',
      type: 'text',
      localized: true,
      maxLength: 160,
      admin: {
        description:
          'One-line positioning under the title — "Building a digital gold product from proposition to growth system." Falls back to the summary.',
      },
    },
    {
      name: 'hero',
      type: 'group',
      interfaceName: 'CaseStudyHero',
      admin: {
        description:
          'One dominant visual after the header. One item = a full-width visual; two or three = a row of screens on a panel. Portrait phone captures are framed, never mocked into a device.',
      },
      fields: [
        {
          name: 'items',
          type: 'array',
          minRows: 1,
          maxRows: 3,
          labels: { singular: 'Visual', plural: 'Visuals' },
          fields: [{ name: 'media', type: 'upload', relationTo: 'media', required: true }],
        },
        {
          name: 'caption',
          type: 'text',
          localized: true,
          admin: { description: 'What the hero shows and why it matters.' },
        },
      ],
    },
    {
      name: 'snapshot',
      type: 'group',
      interfaceName: 'CaseStudySnapshot',
      admin: { description: 'One sentence each — a reader should get the whole case in ten seconds.' },
      fields: [
        { name: 'problem', type: 'textarea', localized: true },
        { name: 'role', type: 'textarea', localized: true },
        { name: 'result', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'sections',
      type: 'blocks',
      blocks: caseStudyBlocks,
      admin: { initCollapsed: true },
    },
    {
      name: 'nextProject',
      type: 'relationship',
      relationTo: 'projects',
      filterOptions: ({ id }) => {
        const where: Where = { and: [{ id: { not_in: [id] } }, { caseStudyStatus: { equals: 'published' } }] }
        return where
      },
      admin: {
        description: 'Optional. Empty = the next published case study by order (wrapping around).',
      },
    },
  ],
}

/** Sidebar: per-locale review flag so machine-drafted translations are visible as such. */
export const translationReviewedField: Field = {
  name: 'translationReviewed',
  type: 'checkbox',
  localized: true,
  defaultValue: false,
  label: 'Translation reviewed',
  admin: {
    description: 'Tick per language once a native speaker has reviewed this locale. Machine-drafted locales stay unticked.',
    position: 'sidebar',
  },
}

/** A published case study needs at least one chapter — otherwise `/work/<slug>` would be an empty page. */
export const validateCaseStudyStatus = (
  value: unknown,
  { data }: { data?: Partial<{ sections: unknown }> | undefined },
): string | true => {
  const sections = data?.sections
  if (value === 'published' && Array.isArray(sections) && sections.length === 0) {
    return 'Add at least one case-study section before publishing the case study.'
  }
  return true
}
