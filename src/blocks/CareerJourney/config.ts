import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'

/**
 * The About page's narrative version of the career timeline — distinct from the homepage's
 * ExperienceCatalogue grid (breadth). Company/role/period facts come from the `experiences`
 * collection (single source of truth); the editorial "what changed" statement is written here,
 * per stage, specific to this page.
 */
export const CareerJourney: Block = {
  slug: 'careerJourney',
  interfaceName: 'CareerJourneyBlock',
  labels: { singular: 'Career journey', plural: 'Career journeys' },
  fields: [
    sectionHeader(),
    {
      name: 'stages',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Stage', plural: 'Stages' },
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'experience',
          type: 'relationship',
          relationTo: 'experiences',
          required: true,
          admin: { description: 'Company/role/period authority — edit facts on the Experiences collection, not here.' },
        },
        {
          name: 'narrative',
          type: 'richText',
          localized: true,
          required: true,
          admin: { description: 'What changed in Sina’s thinking or responsibility at this stage — not a duties list.' },
        },
        {
          name: 'relatedProjectLabel',
          type: 'text',
          localized: true,
          admin: { description: 'Optional plain-text reference, e.g. "Selected work → Digital Gold" — no /work route exists yet to link to.' },
        },
      ],
    },
  ],
}
