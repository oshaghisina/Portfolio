import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

/**
 * Controlled section vocabulary (D-022): a narrative block opens a numbered chapter whose label
 * is rendered from `src/components/CaseStudy/copy.ts`, never typed by the editor — so every
 * case study reads "01 CONTEXT · 02 PROBLEM …" in every locale. `custom` is the escape hatch.
 */
export const NARRATIVE_LABELS = [
  'context',
  'problem',
  'constraints',
  'approach',
  'solution',
  'research',
  'outcome',
  'custom',
] as const
export type NarrativeLabel = (typeof NARRATIVE_LABELS)[number]

const LABEL_OPTIONS: { label: string; value: NarrativeLabel }[] = [
  { label: 'Context', value: 'context' },
  { label: 'Problem', value: 'problem' },
  { label: 'Constraints', value: 'constraints' },
  { label: 'Approach', value: 'approach' },
  { label: 'Solution', value: 'solution' },
  { label: 'Research', value: 'research' },
  { label: 'Result', value: 'outcome' },
  { label: 'Custom label…', value: 'custom' },
]

/** Narrative: a chapter opener — controlled label, short verdict heading, genuine prose. */
export const CaseStudyNarrative: Block = {
  slug: 'csNarrative',
  interfaceName: 'CaseStudyNarrativeBlock',
  labels: { singular: 'Narrative', plural: 'Narrative' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'label',
          type: 'select',
          required: true,
          defaultValue: 'context',
          options: LABEL_OPTIONS,
          admin: {
            description: 'Opens a numbered chapter ("01 CONTEXT"). Labels are translated in code.',
            width: '50%',
          },
        },
        {
          name: 'customLabel',
          type: 'text',
          localized: true,
          admin: {
            condition: (_data, siblingData) => siblingData?.label === 'custom',
            description: 'Short — one or two words.',
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'heading',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description: 'A short verdict, not a label — e.g. "Competitive and rewarding without becoming a casino."',
      },
    },
    {
      name: 'body',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          UnorderedListFeature(),
          OrderedListFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      admin: { description: 'Two to four sentences per chapter reads best; lists are fine for constraints.' },
    },
    {
      name: 'insight',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Optional one-sentence takeaway, set as a pull line after the body — the line you would want someone to remember.',
      },
    },
  ],
}
