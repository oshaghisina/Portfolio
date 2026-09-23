import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'

import {
  SKILL_GROUP_KEYS,
  SKILLS_BY_GROUP,
  type SkillGroupKey,
  type SkillKey,
} from '../CapabilityIcons/keys'

const GROUP_LABELS: Record<SkillGroupKey, string> = {
  core: '01 Core',
  execution: '03 Execution & evidence',
  specialized: '04 Specialized experience',
  systems: '02 Systems',
}

export const SKILL_LABELS: Record<SkillKey, string> = {
  'ai-product-development': 'AI-assisted Product Development',
  'analytics-experimentation': 'Analytics & Experimentation',
  'business-modeling': 'Business & Product Modeling',
  'documentation-spec': 'Documentation & Specification Design',
  'fintech-strategy': 'Fintech Product Strategy',
  gamification: 'Gamification Design',
  'process-operations': 'Process & Operations Design',
  'product-discovery': 'Product Discovery & Problem Framing',
  'product-function-setup': 'Product Function Setup',
  'product-management': 'Product Management',
  requirements: 'Requirements Engineering',
  'rtl-persian': 'RTL & Persian Product Design',
  'service-design': 'Service Design',
  'stakeholder-management': 'Stakeholder & Cross-functional Management',
  'technical-pm': 'Technical Product Management',
  'ux-direction': 'UX / Product Design Direction',
}

/**
 * The full capability matrix: sixteen skills in four evidence groups. The hierarchy is the
 * argument — Core says what defines the practice, Systems what supports it, Execution what
 * proves it, Specialized what differentiates it. Flattening them into one grid would lose that.
 *
 * Deliberately no proficiency field of any kind. Evidence is the credibility mechanism here, not
 * self-assessment, so there is nowhere in this schema to store a percentage, a star or an
 * "Advanced" label.
 *
 * House pattern — shared arrays, localized leaves. `key` on a group and on a skill is a shared
 * identity; it selects the code-owned mini mark and fixes which group a skill belongs to.
 */
export const CapabilityMatrix: Block = {
  slug: 'capabilityMatrix',
  interfaceName: 'CapabilityMatrixBlock',
  labels: { plural: 'Capability matrix', singular: 'Capability matrix' },
  fields: [
    sectionHeader(),
    {
      name: 'evidenceLabel',
      type: 'text',
      admin: {
        description:
          'The small label above each capability\u2019s evidence list, e.g. "Evidence". One string for the whole section rather than sixteen copies of the same word.',
      },
      defaultValue: 'Evidence',
      localized: true,
      required: true,
    },
    {
      name: 'groups',
      type: 'array',
      admin: {
        description:
          'The four capability groups, in reading order. Every one of the sixteen skills must appear exactly once, in its own group — the page is a complete inventory, so nothing may silently drop out of it.',
        initCollapsed: true,
      },
      labels: { plural: 'Groups', singular: 'Group' },
      maxRows: 4,
      minRows: 4,
      required: true,
      validate: (value: unknown) => {
        const rows = Array.isArray(value) ? value : []

        const groupKeys = rows
          .map((row) => (row as { key?: string })?.key)
          .filter(Boolean) as string[]
        const duplicateGroups = [
          ...new Set(groupKeys.filter((key, i) => groupKeys.indexOf(key) !== i)),
        ]
        if (duplicateGroups.length) {
          return `Each group can only appear once. Duplicated: ${duplicateGroups.join(', ')}.`
        }

        const seen: string[] = []
        for (const row of rows) {
          const groupKey = (row as { key?: string })?.key as SkillGroupKey | undefined
          const skills = (row as { skills?: unknown })?.skills
          const skillKeys = Array.isArray(skills)
            ? (skills.map((s) => (s as { key?: string })?.key).filter(Boolean) as string[])
            : []
          seen.push(...skillKeys)

          if (!groupKey) continue
          const expected = SKILLS_BY_GROUP[groupKey] as readonly string[] | undefined
          if (!expected) continue
          const misfiled = skillKeys.filter((key) => !expected.includes(key))
          if (misfiled.length) {
            return `${GROUP_LABELS[groupKey]} cannot hold: ${misfiled
              .map((key) => SKILL_LABELS[key as SkillKey] ?? key)
              .join(', ')}.`
          }
        }

        const duplicateSkills = [...new Set(seen.filter((key, i) => seen.indexOf(key) !== i))]
        if (duplicateSkills.length) {
          return `A skill can only appear in one group. Duplicated: ${duplicateSkills
            .map((key) => SKILL_LABELS[key as SkillKey] ?? key)
            .join(', ')}.`
        }

        const missing = (Object.keys(SKILL_LABELS) as SkillKey[]).filter(
          (key) => !seen.includes(key),
        )
        if (missing.length) {
          return `All sixteen capabilities must appear. Missing: ${missing
            .map((key) => SKILL_LABELS[key])
            .join(', ')}.`
        }

        return true
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'key',
              type: 'select',
              admin: { description: 'Stable id — fixes which skills may sit here', width: '40%' },
              options: SKILL_GROUP_KEYS.map((value) => ({ label: GROUP_LABELS[value], value })),
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              admin: { description: 'Group heading, e.g. "Core"', width: '60%' },
              localized: true,
              required: true,
            },
          ],
        },
        {
          name: 'skills',
          type: 'array',
          admin: { initCollapsed: true },
          labels: { plural: 'Skills', singular: 'Skill' },
          maxRows: 6,
          minRows: 1,
          required: true,
          fields: [
            {
              name: 'key',
              type: 'select',
              admin: { description: 'Stable id — selects the mini mark' },
              options: (Object.keys(SKILL_LABELS) as SkillKey[]).map((value) => ({
                label: SKILL_LABELS[value],
                value,
              })),
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              admin: { description: 'One concise sentence. Not an essay.' },
              localized: true,
              required: true,
            },
            {
              name: 'evidence',
              type: 'array',
              admin: {
                description:
                  'Where this capability was actually used. Attach the project when one exists — the label becomes a link on its own once that project has a published case study, and stays plain text until then.',
                initCollapsed: true,
              },
              labels: { plural: 'Evidence', singular: 'Evidence' },
              maxRows: 4,
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      admin: { description: 'Company or project as it should read', width: '55%' },
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
              ],
            },
          ],
        },
      ],
    },
  ],
}
