import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'

/** Numbered, full-width principle statements — no cards, generous whitespace per entry. */
export const Principles: Block = {
  slug: 'principles',
  interfaceName: 'PrinciplesBlock',
  labels: { singular: 'Principles', plural: 'Principles' },
  fields: [
    sectionHeader(),
    {
      name: 'items',
      type: 'array',
      minRows: 4,
      maxRows: 6,
      labels: { singular: 'Principle', plural: 'Principles' },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
          admin: { description: 'Short, specific — avoid slogans ("Design with empathy").' },
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          required: true,
          admin: { description: 'One concise explanation — what this reveals about how decisions get made.' },
        },
        {
          name: 'evidenceLabel',
          type: 'text',
          localized: true,
          admin: { description: 'Optional, e.g. "Seen in → Digital Gold".' },
        },
      ],
    },
  ],
}
