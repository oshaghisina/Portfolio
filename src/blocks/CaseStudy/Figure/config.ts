import type { Block } from 'payload'

/**
 * DS-30 figure patterns. Editors pick a *pattern*, never a size: `full` (one visual), `split`
 * (two related visuals), `sequence` (2–4 states of a flow), `annotated` (one visual + a numbered
 * key), `compare` (before / after), `gallery` (a body of work, 2–40 visuals in columns). `treatment` says what the media *is*; the page decides how
 * to frame it — portrait phone captures are framed as screens, diagrams sit on the drafting plate.
 */
export const FIGURE_LAYOUTS = ['full', 'split', 'sequence', 'annotated', 'compare', 'gallery'] as const
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
}

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
      maxRows: 40,
      labels: { singular: 'Visual', plural: 'Visuals' },
      admin: {
        description:
          'Full / annotated: exactly one. Split / compare: exactly two. Sequence: two to four. Gallery: two to forty.',
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
        { name: 'media', type: 'upload', relationTo: 'media', required: true },
        {
          name: 'caption',
          type: 'text',
          localized: true,
          admin: {
            description:
              'Optional per-visual note; keep the explanation in the figure caption below.',
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
