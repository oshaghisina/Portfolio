import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'
import { linkGroup } from '@/fields/linkGroup'

import { SPOTLIGHT_KEYS, type SpotlightKey } from '../CapabilityIcons/keys'

const SPOTLIGHT_LABELS: Record<SpotlightKey, string> = {
  'ai-execution': 'AI-assisted execution',
  discovery: 'Product discovery',
  service: 'Service design',
  systems: 'Product systems',
}

/**
 * The homepage's Experience section: a preview of `/experience`, not a second copy of it. The four
 * primary capabilities with one line each, the proof metrics demoted beneath them, and one way
 * onward. The sixteen skills, the evidence matrix and the discipline model stay on the page they
 * belong to — Home is the doorway.
 *
 * Every word here is written once, on `/experience`, and carried over by the seed
 * (`buildExperienceTeaserBlock`); nothing is retyped, so the two can never describe the same
 * capability differently.
 *
 * A distinct block rather than a second `cta` row, because `localizeHomeLayout` dispatches on
 * `blockType` — two `cta` rows on one page would both receive the same translated copy.
 */
export const ExperienceTeaser: Block = {
  slug: 'experienceTeaser',
  interfaceName: 'ExperienceTeaserBlock',
  labels: { plural: 'Experience teaser', singular: 'Experience teaser' },
  fields: [
    sectionHeader(),
    {
      name: 'capabilities',
      type: 'array',
      admin: {
        description:
          'The four primary capabilities, in reading order — drag to reorder. The index code (01, 02 …) follows this order. Each key selects a fixed mark that cannot be edited here. Keep these in step with the capability spotlight on /experience.',
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
          admin: { description: 'Stable id — selects the mark' },
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
          admin: {
            description: 'One short declarative sentence, e.g. "Understand before building."',
          },
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'metrics',
      type: 'array',
      admin: {
        description:
          'The proof beneath the capabilities — three or four at most. These support the section; they are not its subject.',
      },
      labels: { plural: 'Metrics', singular: 'Metric' },
      maxRows: 4,
      minRows: 1,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'value',
              type: 'text',
              localized: true,
              required: true,
              // Localized because a metric is rarely a bare numeral: "10 yrs" carries an English
              // unit word, and fa wants its own digits (DS-10 keeps only ornamental codes Latin).
              admin: { description: 'Short — "10 yrs", "20+", "~$0.03"', width: '40%' },
            },
            {
              name: 'caption',
              type: 'text',
              localized: true,
              required: true,
              admin: { description: 'What the number measures', width: '60%' },
            },
          ],
        },
        {
          name: 'source',
          type: 'text',
          localized: true,
          admin: {
            description:
              'Where it comes from (report, dashboard, date) — every number is traceable. Stored for the editor, not rendered.',
          },
        },
      ],
    },
    // `appearances: false` drops the CMS appearance selector: this link is a quiet continuation
    // into `/experience`, never a button, so the treatment is the block's decision rather than a
    // per-edit one (the section would stop reading as a preview the moment it grew a filled CTA).
    linkGroup({ appearances: false, overrides: { maxRows: 1 } }),
  ],
}
