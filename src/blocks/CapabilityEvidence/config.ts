import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'

import { SKILL_KEYS, type SkillKey } from '../CapabilityIcons/keys'
import { SKILL_LABELS } from '../CapabilityMatrix/config'

/**
 * Selected evidence, written as capability *combinations* rather than roles and responsibilities.
 * "Service design + requirements engineering + AI-assisted development" says something a job
 * title cannot: that these capabilities were used together, on one problem, by one person.
 *
 * Intentionally not the homepage employer grid. That answers "where has he worked"; this answers
 * "what combined to make that work possible", and the two must not be the same list.
 */
export const CapabilityEvidence: Block = {
  slug: 'capabilityEvidence',
  interfaceName: 'CapabilityEvidenceBlock',
  labels: { plural: 'Capability evidence', singular: 'Capability evidence' },
  fields: [
    sectionHeader(),
    {
      name: 'items',
      type: 'array',
      admin: {
        description:
          'Three to five examples where several capabilities combined. Attach the project when one exists — the title becomes a link on its own once that project has a published case study.',
        initCollapsed: true,
      },
      labels: { plural: 'Examples', singular: 'Example' },
      maxRows: 5,
      minRows: 3,
      required: true,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              admin: { description: 'Company or project, e.g. "Digikala — Digital Gold"', width: '55%' },
              localized: true,
              required: true,
            },
            {
              name: 'project',
              type: 'relationship',
              admin: { description: 'Optional — links once a case study publishes', width: '45%' },
              relationTo: 'projects',
            },
          ],
        },
        {
          name: 'note',
          type: 'textarea',
          admin: { description: 'One line on what the work was (optional)' },
          localized: true,
        },
        {
          name: 'capabilities',
          type: 'array',
          admin: {
            description:
              'The capabilities that combined here. Use the short display form — these read as a sum, not as full skill titles.',
            initCollapsed: true,
          },
          labels: { plural: 'Capabilities', singular: 'Capability' },
          maxRows: 4,
          minRows: 2,
          required: true,
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'key',
                  type: 'select',
                  admin: { description: 'Selects the mini mark', width: '55%' },
                  options: SKILL_KEYS.map((value) => ({ label: SKILL_LABELS[value as SkillKey], value })),
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  admin: { description: 'Short display form, e.g. "Service Design"', width: '45%' },
                  localized: true,
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
