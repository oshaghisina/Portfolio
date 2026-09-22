import type { Block } from 'payload'

/**
 * Research evidence — a real quote or an aggregated finding, with attribution and method.
 * Never invented; aggregate or anonymise when the source is confidential.
 */
export const CaseStudyFinding: Block = {
  slug: 'csFinding',
  interfaceName: 'CaseStudyFindingBlock',
  labels: { singular: 'Research finding', plural: 'Research findings' },
  fields: [
    {
      name: 'kind',
      type: 'select',
      defaultValue: 'finding',
      required: true,
      options: [
        { label: 'Finding — synthesised evidence', value: 'finding' },
        { label: 'Quote — verbatim', value: 'quote' },
      ],
    },
    { name: 'text', type: 'textarea', localized: true, required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'attribution',
          type: 'text',
          localized: true,
          admin: {
            description: 'Who or what it comes from, e.g. "RP1 tone guideline".',
            width: '50%',
          },
        },
        {
          name: 'method',
          type: 'text',
          localized: true,
          admin: {
            description: 'How it was gathered, e.g. "8 interviews, aggregated".',
            width: '50%',
          },
        },
      ],
    },
  ],
}
