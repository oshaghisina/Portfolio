import type { Block } from 'payload'

/**
 * Process map — the project's actual sequence as nodes and lines (thin hairlines, mono codes),
 * never a generic double diamond. `loop` closes the last step back to the first for iterative
 * systems (retention loops, state machines).
 */
export const CaseStudyProcess: Block = {
  slug: 'csProcess',
  interfaceName: 'CaseStudyProcessBlock',
  labels: { singular: 'Process map', plural: 'Process maps' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'heading',
          type: 'text',
          localized: true,
          admin: { description: 'Optional short title, e.g. "Six passes, in order".', width: '60%' },
        },
        {
          name: 'kind',
          type: 'select',
          defaultValue: 'process',
          options: [
            { label: 'Sequence — start to finish', value: 'process' },
            { label: 'Loop — the last step returns to the first', value: 'loop' },
          ],
          admin: { width: '40%' },
        },
      ],
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 3,
      maxRows: 8,
      labels: { singular: 'Step', plural: 'Steps' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'code',
              type: 'text',
              required: true,
              maxLength: 4,
              admin: { description: 'Latin code, e.g. "R1" — stays mono in every locale.', width: '25%' },
            },
            { name: 'label', type: 'text', localized: true, required: true, admin: { width: '75%' } },
          ],
        },
        {
          name: 'note',
          type: 'text',
          localized: true,
          admin: { description: 'Optional technical annotation under the label.' },
        },
      ],
    },
  ],
}
