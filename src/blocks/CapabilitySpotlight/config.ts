import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'

import { SPOTLIGHT_KEYS, type SpotlightKey } from '../CapabilityIcons/keys'

const SPOTLIGHT_LABELS: Record<SpotlightKey, string> = {
  'ai-execution': 'AI-assisted execution',
  discovery: 'Product discovery',
  service: 'Service design',
  systems: 'Product systems',
}

/**
 * The four primary capabilities — the editorial gateways into the capability system, not the
 * names of the sixteen skills beneath them. They explain the operating model; the matrix
 * explains the inventory.
 *
 * House pattern — shared array, localized leaves: `key` is a shared identity that maps to a
 * code-owned illustration (`../CapabilityIcons`), and every word a visitor reads is translated.
 * Editors own the copy and the order; they do not own the drawing.
 */
export const CapabilitySpotlight: Block = {
  slug: 'capabilitySpotlight',
  interfaceName: 'CapabilitySpotlightBlock',
  labels: { plural: 'Capability spotlight', singular: 'Capability spotlight' },
  fields: [
    sectionHeader(),
    {
      name: 'items',
      type: 'array',
      admin: {
        description:
          'The four primary capabilities, in reading order — drag to reorder. The index code (001, 002 …) follows this order. Each key selects a fixed illustration that cannot be edited here.',
        initCollapsed: true,
      },
      labels: { plural: 'Capabilities', singular: 'Capability' },
      maxRows: 4,
      minRows: 4,
      required: true,
      // Payload has no cross-row constraint, so the two rules that would read as mistakes on the
      // page — a duplicated capability, or a missing one — are enforced here.
      validate: (value: unknown) => {
        const rows = Array.isArray(value) ? value : []
        const keys = rows.map((row) => (row as { key?: string })?.key).filter(Boolean) as string[]

        const duplicates = [...new Set(keys.filter((key, i) => keys.indexOf(key) !== i))]
        if (duplicates.length) {
          return `Each capability can only appear once. Duplicated: ${duplicates.join(', ')}.`
        }

        const missing = SPOTLIGHT_KEYS.filter((key) => !keys.includes(key))
        if (missing.length) {
          return `All four primary capabilities must be present. Missing: ${missing
            .map((key) => SPOTLIGHT_LABELS[key])
            .join(', ')}.`
        }

        return true
      },
      fields: [
        {
          name: 'key',
          type: 'select',
          admin: { description: 'Stable id — selects the illustration' },
          options: SPOTLIGHT_KEYS.map((value) => ({ label: SPOTLIGHT_LABELS[value], value })),
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'principle',
          type: 'text',
          admin: { description: 'One short declarative sentence, e.g. "Understand before building."' },
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          admin: { description: 'Two lines at most — what the capability actually does' },
          localized: true,
          required: true,
        },
      ],
    },
  ],
}
