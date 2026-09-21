import type { Block } from 'payload'

/**
 * Ownership map — what Sina owned, co-owned and collaborated on, in three short lists. It
 * exists to give credit precisely, which is why the "collaborate" list is as important as "own".
 */
export const CaseStudyOwnership: Block = {
  slug: 'csOwnership',
  interfaceName: 'CaseStudyOwnershipBlock',
  labels: { singular: 'Ownership', plural: 'Ownership' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      admin: { description: 'Optional — defaults to "My role" in the page language.' },
    },
    {
      name: 'intro',
      type: 'textarea',
      localized: true,
      admin: { description: 'Two to four sentences: scope, who else was involved, what was decided vs. contributed to.' },
    },
    {
      name: 'own',
      type: 'text',
      hasMany: true,
      localized: true,
      label: 'Owned',
      admin: { description: 'Areas Sina owned outright.' },
    },
    {
      name: 'coOwn',
      type: 'text',
      hasMany: true,
      localized: true,
      label: 'Co-owned',
      admin: { description: 'Shared with a named role.' },
    },
    {
      name: 'collaborate',
      type: 'text',
      hasMany: true,
      localized: true,
      label: 'Collaborated',
      admin: { description: 'Owned by others; Sina contributed.' },
    },
    {
      name: 'note',
      type: 'textarea',
      localized: true,
      admin: { description: 'Optional caveat — e.g. who owned engineering or marketing.' },
    },
  ],
}
