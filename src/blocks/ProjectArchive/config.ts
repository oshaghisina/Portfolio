import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'

/**
 * The body of the `/work` page: a compact intro and a searchable gallery/list of every published
 * project. Holds no project copy of its own — everything comes
 * from the `projects` collection (D-021), so Home, `/work` and `/work/<slug>` agree by construction.
 */
export const ProjectArchive: Block = {
  slug: 'projectArchive',
  interfaceName: 'ProjectArchiveBlock',
  labels: { singular: 'Project archive', plural: 'Project archives' },
  fields: [
    sectionHeader({
      admin: {
        description:
          'Page intro: tag (e.g. "Work / Selected projects / Archive"), the two-tone statement, and one short paragraph. Projects themselves are managed in the Projects collection.',
      },
    }),
  ],
}
