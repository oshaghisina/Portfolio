import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'

/**
 * "How I work with teams" as a responsibility/process map, not a people-icon diagram and not
 * "I'm collaborative" copy. `nodes` mirrors ThinkingMap's fixed-layout pattern (6, in order:
 * Business Context, Product Decision, Design, Engineering, Validation, Learning). `statements`
 * intentionally allows zero rows — sourced evidence for this section is thin; don't pad it.
 */
export const TeamProcess: Block = {
  slug: 'teamProcess',
  interfaceName: 'TeamProcessBlock',
  labels: { singular: 'Team process', plural: 'Team processes' },
  fields: [
    sectionHeader(),
    {
      name: 'intro',
      type: 'richText',
      localized: true,
      admin: { description: 'Optional short intro above the diagram.' },
    },
    {
      name: 'nodes',
      type: 'array',
      minRows: 6,
      maxRows: 6,
      labels: { singular: 'Node', plural: 'Nodes' },
      admin: {
        description: 'Exactly 6, in this order: Business Context, Product Decision, Design, Engineering, Validation, Learning.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'annotation',
          type: 'textarea',
          localized: true,
        },
      ],
    },
    {
      name: 'statements',
      type: 'array',
      minRows: 0,
      maxRows: 4,
      labels: { singular: 'Statement', plural: 'Statements' },
      admin: {
        description: 'Only include statements with real supporting evidence — leave empty rather than pad with generic collaboration claims.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          required: true,
        },
      ],
    },
  ],
}
