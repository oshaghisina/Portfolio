import type { Block } from 'payload'

/**
 * DS-30 figure patterns. Editors pick a *pattern*, never a size: `full` (one visual), `split`
 * (two related visuals), `sequence` (2–4 states of a flow), `annotated` (one visual + a numbered
 * key), `compare` (before / after), `gallery` (a body of work, 2–40 visuals in columns), `pages`
 * (every page of a site, one row per page: its first screen at desktop and phone width, the whole
 * page on click — DS-25; with the Screen treatment, every screen of an app, phone width only).
 * `treatment` says what the media *is*; the page decides how to frame it — portrait phone
 * captures are framed as screens, diagrams sit on the drafting plate.
 */
export const FIGURE_LAYOUTS = [
  'full',
  'split',
  'sequence',
  'annotated',
  'compare',
  'gallery',
  'pages',
] as const
export type FigureLayout = (typeof FIGURE_LAYOUTS)[number]

export const FIGURE_TREATMENTS = ['auto', 'screen', 'plain', 'diagram'] as const
export type FigureTreatment = (typeof FIGURE_TREATMENTS)[number]

/** How many media items each layout takes — enforced at save time, relied on by the component. */
export const FIGURE_ITEM_COUNT: Record<FigureLayout, { min: number; max: number }> = {
  full: { min: 1, max: 1 },
  split: { min: 2, max: 2 },
  sequence: { min: 2, max: 4 },
  annotated: { min: 1, max: 1 },
  compare: { min: 2, max: 2 },
  gallery: { min: 2, max: 40 },
  // An app's screen index runs past a site's page count (VIN: 138 screens in ten sections;
  // Carsparency Pro: about 180 desktop pages in fourteen).
  pages: { min: 2, max: 240 },
}

/** Only a `pages` figure pairs each page with its phone capture and full-page captures. */
const onlyForPages = (
  _data: unknown,
  _siblingData: unknown,
  { blockData }: { blockData?: unknown },
) => (blockData as { layout?: FigureLayout } | undefined)?.layout === 'pages'

export const CaseStudyFigure: Block = {
  slug: 'csFigure',
  interfaceName: 'CaseStudyFigureBlock',
  labels: { singular: 'Figure', plural: 'Figures' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'layout',
          type: 'select',
          required: true,
          defaultValue: 'full',
          options: [
            { label: 'Full width — one visual', value: 'full' },
            { label: 'Split — two related visuals', value: 'split' },
            { label: 'Sequence — 2–4 states of a flow', value: 'sequence' },
            { label: 'Annotated — one visual + numbered key', value: 'annotated' },
            { label: 'Compare — before / after', value: 'compare' },
            { label: 'Gallery — a body of work, 2–40 visuals', value: 'gallery' },
            { label: 'Pages — every page, desktop + phone, whole page on click', value: 'pages' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'treatment',
          type: 'select',
          defaultValue: 'auto',
          options: [
            { label: 'Auto — portrait = screen, landscape = plain', value: 'auto' },
            { label: 'Screen — framed phone viewport', value: 'screen' },
            { label: 'Plain — natural aspect', value: 'plain' },
            { label: 'Diagram — on the drafting plate', value: 'diagram' },
          ],
          admin: { description: 'What the media is, not how big it should be.', width: '50%' },
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: FIGURE_ITEM_COUNT.pages.max,
      labels: { singular: 'Visual', plural: 'Visuals' },
      admin: {
        description:
          'Full / annotated: exactly one. Split / compare: exactly two. Sequence: two to four. Gallery: two to forty. Pages: one row per page or screen, two to 240.',
      },
      validate: (
        value: unknown,
        { siblingData }: { siblingData: Partial<{ layout: FigureLayout }> },
      ) => {
        const count = Array.isArray(value) ? value.length : 0
        const layout = siblingData?.layout
        const range = layout ? FIGURE_ITEM_COUNT[layout] : undefined
        if (!range) return true
        if (count < range.min || count > range.max) {
          return range.min === range.max
            ? `A "${layout}" figure takes exactly ${range.min} visual${range.min === 1 ? '' : 's'}.`
            : `A "${layout}" figure takes ${range.min}–${range.max} visuals.`
        }
        return true
      },
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description:
              'Pages: the first screen at desktop width — with the Screen treatment, the first screen on the phone.',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'mobile',
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: onlyForPages,
                description: 'The first screen on a phone.',
                width: '33%',
              },
            },
            {
              name: 'full',
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: onlyForPages,
                description: 'The whole page at desktop width, opened on click.',
                width: '33%',
              },
            },
            {
              name: 'mobileFull',
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: onlyForPages,
                description: 'The whole page on a phone, opened on click.',
                width: '33%',
              },
            },
          ],
        },
        {
          name: 'caption',
          type: 'text',
          localized: true,
          admin: {
            description:
              'Optional per-visual note; keep the explanation in the figure caption below. Pages: the page’s name.',
          },
        },
        {
          name: 'group',
          type: 'text',
          localized: true,
          admin: {
            condition: onlyForPages,
            description:
              'The section the page belongs to. Two or more sections become the index’s tabs, in order of first appearance — give every row one.',
          },
        },
      ],
    },
    {
      name: 'annotations',
      type: 'array',
      maxRows: 8,
      labels: { singular: 'Annotation', plural: 'Annotations' },
      admin: {
        condition: (_data, siblingData) => siblingData?.layout === 'annotated',
        description:
          'Numbered key rendered beside the visual (01, 02 …). Number the callouts on the image to match.',
      },
      fields: [{ name: 'text', type: 'text', localized: true, required: true }],
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
      admin: {
        description: 'What we are looking at and why it matters — not a repeat of the visible UI.',
      },
    },
  ],
}
