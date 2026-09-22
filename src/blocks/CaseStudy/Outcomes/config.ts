import type { Block } from 'payload'

/**
 * Outcomes — two to four results in the homepage's editorial-data language. A measured outcome
 * carries a value and its provenance; a delivered output has no number and never pretends to.
 */
export const CaseStudyOutcomes: Block = {
  slug: 'csOutcomes',
  interfaceName: 'CaseStudyOutcomesBlock',
  labels: { singular: 'Outcomes', plural: 'Outcomes' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      admin: { description: 'Optional — defaults to "Outcomes" in the page language.' },
    },
    {
      name: 'intro',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'One or two sentences of context — including what cannot be reported yet.',
      },
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Outcome', plural: 'Outcomes' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'value',
              type: 'text',
              admin: {
                description:
                  'Only a credible number — "34", "+18%". Leave empty for a qualitative outcome.',
                width: '30%',
              },
            },
            {
              name: 'label',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description: 'What it is — the statement itself when there is no number.',
                width: '70%',
              },
            },
          ],
        },
        {
          name: 'context',
          type: 'textarea',
          localized: true,
          admin: { description: 'Meaning and time frame.' },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'kind',
              type: 'select',
              defaultValue: 'delivered',
              required: true,
              options: [
                { label: 'Measured outcome', value: 'measured' },
                { label: 'Delivered output', value: 'delivered' },
              ],
              admin: { width: '40%' },
            },
            {
              name: 'source',
              type: 'text',
              localized: true,
              admin: {
                description: 'Provenance — dashboard, report, document, date.',
                width: '60%',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'shipped',
      type: 'text',
      hasMany: true,
      localized: true,
      label: 'What was delivered',
      admin: { description: 'Optional terse list of what actually shipped (DS-27).' },
    },
  ],
}
