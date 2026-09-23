/**
 * The stable capability vocabulary. Payload stores these strings and owns every word a visitor
 * reads; this file and `./index.tsx` own the geometry behind them (D-021's split, applied to
 * icons: content is editable, the drawing is not).
 *
 * Nothing here is localized. A key is an identity, not copy — the same `service-design` row
 * carries Persian text in the `fa` locale and still renders the same mark.
 */

export const SPOTLIGHT_KEYS = ['discovery', 'service', 'systems', 'ai-execution'] as const
export type SpotlightKey = (typeof SPOTLIGHT_KEYS)[number]

export const SKILL_GROUP_KEYS = ['core', 'systems', 'execution', 'specialized'] as const
export type SkillGroupKey = (typeof SKILL_GROUP_KEYS)[number]

export const SKILL_KEYS = [
  // 01 CORE
  'product-management',
  'product-discovery',
  'service-design',
  'requirements',
  'ai-product-development',
  // 02 SYSTEMS
  'process-operations',
  'business-modeling',
  'technical-pm',
  'documentation-spec',
  // 03 EXECUTION & EVIDENCE
  'analytics-experimentation',
  'ux-direction',
  'stakeholder-management',
  // 04 SPECIALIZED EXPERIENCE
  'fintech-strategy',
  'rtl-persian',
  'gamification',
  'product-function-setup',
] as const
export type SkillKey = (typeof SKILL_KEYS)[number]

/**
 * Which group each skill belongs to. The matrix block validates against this, so a skill can
 * never be filed under the wrong heading or quietly go missing from the page.
 */
export const SKILLS_BY_GROUP: Record<SkillGroupKey, readonly SkillKey[]> = {
  core: [
    'product-management',
    'product-discovery',
    'service-design',
    'requirements',
    'ai-product-development',
  ],
  systems: ['process-operations', 'business-modeling', 'technical-pm', 'documentation-spec'],
  execution: ['analytics-experimentation', 'ux-direction', 'stakeholder-management'],
  specialized: ['fintech-strategy', 'rtl-persian', 'gamification', 'product-function-setup'],
}

export const isSkillKey = (v: unknown): v is SkillKey =>
  typeof v === 'string' && (SKILL_KEYS as readonly string[]).includes(v)

export const isSpotlightKey = (v: unknown): v is SpotlightKey =>
  typeof v === 'string' && (SPOTLIGHT_KEYS as readonly string[]).includes(v)
