import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'

/**
 * Selected Work: the homepage's one featured project. The block owns *how* it appears here
 * (section header, placement); the project record owns *what* it is — title, organisation, role,
 * summary, cover — so Home and `/work` can never disagree (D-021).
 */
export const SelectedWork: Block = {
  slug: 'selectedWork',
  interfaceName: 'SelectedWorkBlock',
  labels: { singular: 'Selected work', plural: 'Selected work' },
  fields: [
    sectionHeader(),
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
      required: true,
      admin: {
        description:
          'Project facts (title, organisation, role, summary, cover) come from the Projects collection. Publish the project in each language it should appear in.',
      },
    },
  ],
}
