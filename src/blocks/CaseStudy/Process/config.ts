import type { Block, TextFieldSingleValidation } from 'payload'
import { text } from 'payload/shared'

/**
 * Process map — the project's actual sequence as nodes and lines (thin hairlines, mono markers),
 * never a generic double diamond. `loop` closes the last step back to the first for iterative
 * systems (retention loops, state machines). `map` drops the order altogether: each step is one
 * area of a system with its `parts`, for architecture that has no sequence to draw. Nodes show the
 * step's position unless `markers` opts into per-step codes; codes stored while the block shows
 * numbers are kept but not rendered.
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
          admin: {
            description: 'Optional short title, e.g. "Six passes, in order".',
            width: '50%',
          },
        },
        {
          name: 'kind',
          type: 'select',
          defaultValue: 'process',
          options: [
            { label: 'Sequence — start to finish', value: 'process' },
            { label: 'Loop — the last step returns to the first', value: 'loop' },
            { label: 'Map — areas of one system, each with its parts', value: 'map' },
          ],
          admin: { width: '25%' },
        },
        {
          name: 'markers',
          type: 'select',
          defaultValue: 'number',
          options: [
            { label: 'Numbers — 01, 02, 03', value: 'number' },
            { label: 'Codes — one per step', value: 'code' },
          ],
          admin: {
            description: 'Codes only when they say more than the order, e.g. L1–L4 for a loop.',
            width: '25%',
          },
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
              maxLength: 4,
              validate: ((value, options) =>
                (options.blockData as { markers?: string } | undefined)?.markers === 'code' &&
                !value?.trim()
                  ? 'Add a code, or set the block to show numbers.'
                  : text(value, options)) as TextFieldSingleValidation,
              admin: {
                condition: (_data, _siblingData, { blockData }) => blockData?.markers === 'code',
                description: 'Latin code, e.g. "L1" — stays mono in every locale.',
                width: '25%',
              },
            },
            {
              name: 'label',
              type: 'text',
              localized: true,
              required: true,
              admin: { width: '75%' },
            },
          ],
        },
        {
          name: 'note',
          type: 'text',
          localized: true,
          admin: { description: 'Optional technical annotation under the label.' },
        },
        {
          name: 'parts',
          type: 'text',
          hasMany: true,
          localized: true,
          maxRows: 10,
          admin: {
            condition: (_data, _siblingData, { blockData }) => blockData?.kind === 'map',
            description: 'Map only: what this area is made of, as short names, e.g. "Order list".',
          },
        },
      ],
    },
  ],
}
