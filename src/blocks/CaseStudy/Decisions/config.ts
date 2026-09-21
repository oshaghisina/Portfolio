import type { Block } from 'payload'

/**
 * Key decisions — the section where judgment shows. Each item answers: what was chosen, why,
 * what else was considered, what it cost, what supported it. Rendered as a numbered editorial
 * sequence with room to breathe, never as a card grid.
 */
export const CaseStudyDecisions: Block = {
  slug: 'csDecisions',
  interfaceName: 'CaseStudyDecisionsBlock',
  labels: { singular: 'Key decisions', plural: 'Key decisions' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      admin: { description: 'Optional — defaults to "Key decisions" in the page language.' },
    },
    {
      name: 'lede',
      type: 'textarea',
      localized: true,
      admin: { description: 'One sentence framing the decisions (optional).' },
    },
    {
      name: 'items',
      type: 'array',
      minRows: 2,
      maxRows: 6,
      labels: { singular: 'Decision', plural: 'Decisions' },
      admin: { description: 'Three to six decisions that materially shaped the result.', initCollapsed: true },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
          admin: { description: 'The decision as a statement — "Reduce onboarding from six steps to four."' },
        },
        {
          name: 'why',
          type: 'textarea',
          localized: true,
          required: true,
          admin: { description: 'Why this direction was chosen.' },
        },
        { name: 'alternatives', type: 'textarea', localized: true, admin: { description: 'What else was considered.' } },
        { name: 'tradeoff', type: 'textarea', localized: true, admin: { description: 'What was gained and what was given up.' } },
        { name: 'evidence', type: 'textarea', localized: true, admin: { description: 'What supported the decision — data, research, a documented log.' } },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Optional small visual that shows the decision (not decoration).' },
        },
      ],
    },
  ],
}
