import type { RequiredDataFromCollectionSlug } from 'payload'

import {
  SKILL_GROUP_KEYS,
  SKILLS_BY_GROUP,
  SPOTLIGHT_KEYS,
  type SkillGroupKey,
  type SkillKey,
} from '@/blocks/CapabilityIcons/keys'
import { dirFor, type Locale } from '@/utilities/locale'

import { heading, paragraph, richText } from './lexical-helpers'
import {
  experiencePageCopy,
  experienceTeaserCopy,
  type EvidenceKey,
  type ExperiencePageCopy,
} from './experience-page-copy'

type PageLayout = RequiredDataFromCollectionSlug<'pages'>['layout']
type PageBlock = NonNullable<PageLayout>[number]

/** Reorder stored rows without rebuilding them, so CMS ids and localized leaves survive. */
export const orderExperienceLayout = (layout: PageLayout): PageLayout => {
  if (!layout) return layout
  const evidenceIndex = layout.findIndex((block) => block.blockType === 'capabilityEvidence')
  const matrixIndex = layout.findIndex((block) => block.blockType === 'capabilityMatrix')
  if (evidenceIndex < 0 || matrixIndex < 0 || evidenceIndex < matrixIndex) return layout

  const ordered = [...layout]
  const [evidence] = ordered.splice(evidenceIndex, 1)
  ordered.splice(ordered.findIndex((block) => block.blockType === 'capabilityMatrix'), 0, evidence!)
  return ordered
}

export const EXPERIENCE_SLUG = 'experience'
/** Logical (unprefixed) path of the capability page. */
export const EXPERIENCE_PATH = `/${EXPERIENCE_SLUG}`

/**
 * Which evidence each capability points at — shared across every locale, because a capability was
 * used where it was used regardless of the language describing it (§46). Only the *names* are
 * translated, in `experience-page-copy.ts`.
 *
 * Every entry below is backed by `Docs/` — the résumé, a company README or a project file under
 * `Docs/Experience/`. Nothing is listed here that is not written there.
 */
const SKILL_EVIDENCE: Record<SkillKey, EvidenceKey[]> = {
  // 01 CORE
  'product-management': ['digikala', 'yaravan', 'oteacher', 'biomaze'],
  'product-discovery': ['razhmana', 'oteacher', 'greenrest'],
  'service-design': ['yaravan', 'razhmana', 'renova'],
  requirements: ['yaravan', 'razhmana'],
  'ai-product-development': ['yaravan', 'portfolio'],
  // 02 SYSTEMS
  'process-operations': ['razhmana', 'yaravan', 'oteacher'],
  'business-modeling': ['rp1', 'digikala', 'fibona', 'nimDang'],
  'technical-pm': ['fayman', 'yaravan', 'arvan'],
  'documentation-spec': ['yaravan', 'razhmana', 'carsparency'],
  // 03 EXECUTION & EVIDENCE
  'analytics-experimentation': ['digikala', 'arvan', 'fayman'],
  'ux-direction': ['arvan', 'carsparency', 'vin'],
  'stakeholder-management': ['digikala', 'yaravan', 'fibona'],
  // 04 SPECIALIZED EXPERIENCE
  'fintech-strategy': ['digikala', 'fayman', 'nimDang'],
  'rtl-persian': ['marqevon', 'fayman', 'arashRezvani', 'khodro45'],
  gamification: ['rp1', 'a1paradise'],
  'product-function-setup': ['oteacher', 'yaravan', 'fibona'],
}

/**
 * Evidence name → the `projects` slug it refers to, where one exists in `PROJECT_SEED`.
 *
 * Attaching the relationship is what makes the reference self-updating: the label renders as
 * plain text until that project has a **published case study**, then becomes a link with no code
 * or content change (`hasPublicCaseStudy`, see `components/EvidenceRef`).
 *
 * `portfolio` is absent on purpose: "this site" is not a project document, so it stays text-only
 * rather than pointing at a URL that does not exist. Every other key resolves;
 * `syncProjects` warns if one stops resolving.
 */
export const EVIDENCE_PROJECT_SLUG: Partial<Record<EvidenceKey, string>> = {
  a1paradise: 'a1paradise-call-apps',
  arashRezvani: 'arash-rezvani',
  arvan: 'arvan-cloud-platform-redesign',
  biomaze: 'biomaze-website-education-panel',
  carsparency: 'carsparency-web',
  digikala: 'digital-gold',
  fayman: 'faymen',
  fibona: 'fibona-website',
  greenrest: 'greenrest',
  khodro45: 'khodro45-dealer-app',
  marqevon: 'marqevon',
  nimDang: 'nim-dang',
  oteacher: 'oteacher-matchmaking-redesign',
  razhmana: 'razhmana',
  renova: 'renova-plus',
  rp1: 'rp1-arena',
  vin: 'vin-app',
  yaravan: 'yaravan',
}

/**
 * The five selected-evidence rows, positionally matched to `copy.evidence.items`. Structure here,
 * words there — the same split as everything else on this page.
 */
const EVIDENCE_COMBINATIONS: Array<{ evidence: EvidenceKey; capabilities: SkillKey[] }> = [
  {
    evidence: 'digikala',
    capabilities: ['product-management', 'fintech-strategy', 'analytics-experimentation'],
  },
  {
    evidence: 'yaravan',
    capabilities: ['service-design', 'requirements', 'ai-product-development'],
  },
  {
    evidence: 'razhmana',
    capabilities: ['product-discovery', 'process-operations', 'documentation-spec'],
  },
  { evidence: 'rp1', capabilities: ['gamification', 'business-modeling', 'ux-direction'] },
  { evidence: 'fayman', capabilities: ['technical-pm', 'rtl-persian', 'fintech-strategy'] },
]

const WORK_HREF = '/work'
const CONTACT_HREF = '/contact'

type ProjectIds = Map<string, string> | Record<string, string>

const lookupProject = (ids: ProjectIds | undefined, slug: string | undefined): string | undefined => {
  if (!ids || !slug) return undefined
  return ids instanceof Map ? ids.get(slug) : ids[slug]
}

/**
 * The page's five blocks, in English or any other locale.
 *
 * `projectIds` is only consulted on the English create. Later locales go through
 * `localizeExperienceLayout`, which overlays copy onto the stored rows and carries relationships
 * (and every row id, at every depth) through untouched.
 */
export const buildExperienceLayout = (copy: ExperiencePageCopy, projectIds?: ProjectIds): PageLayout => {
  const evidenceRefs = (skill: SkillKey) =>
    SKILL_EVIDENCE[skill].map((key) => {
      const project = lookupProject(projectIds, EVIDENCE_PROJECT_SLUG[key])
      return { label: copy.evidenceNames[key], ...(project ? { project } : {}) }
    })

  return [
    {
      blockName: 'Primary capabilities',
      blockType: 'capabilitySpotlight',
      sectionHeader: copy.spotlight.header,
      items: SPOTLIGHT_KEYS.map((key) => ({ key, ...copy.spotlight.items[key] })),
    },
    {
      blockName: 'Selected evidence',
      blockType: 'capabilityEvidence',
      sectionHeader: copy.evidence.header,
      items: EVIDENCE_COMBINATIONS.map((combination, i) => {
        const item = copy.evidence.items[i]!
        const project = lookupProject(projectIds, EVIDENCE_PROJECT_SLUG[combination.evidence])
        return {
          label: item.label,
          note: item.note,
          ...(project ? { project } : {}),
          capabilities: combination.capabilities.map((key, c) => ({
            key,
            label: item.capabilities[c]!,
          })),
        }
      }),
    },
    {
      blockName: 'Capability matrix',
      blockType: 'capabilityMatrix',
      sectionHeader: copy.matrix.header,
      evidenceLabel: copy.matrix.evidenceLabel,
      groups: SKILL_GROUP_KEYS.map((groupKey: SkillGroupKey) => ({
        key: groupKey,
        title: copy.matrix.groups[groupKey],
        skills: SKILLS_BY_GROUP[groupKey].map((skillKey) => ({
          key: skillKey,
          title: copy.matrix.skills[skillKey].title,
          description: copy.matrix.skills[skillKey].description,
          evidence: evidenceRefs(skillKey),
        })),
      })),
    },
    {
      blockName: 'Working across disciplines',
      blockType: 'capabilityModel',
      sectionHeader: copy.model.header,
      disciplines: copy.model.disciplines.map((label) => ({ label })),
      outputLabel: copy.model.outputLabel,
      output: copy.model.output,
    },
    {
      blockName: 'Next: Work',
      blockType: 'cta',
      richText: richText(heading(copy.cta.heading, 'h3')),
      links: [
        { link: { type: 'custom', appearance: 'default', label: copy.cta.workLabel, url: WORK_HREF } },
        {
          link: {
            type: 'custom',
            appearance: 'outline',
            label: copy.cta.contactLabel,
            url: CONTACT_HREF,
          },
        },
      ],
    },
  ] as PageLayout
}

/**
 * `experienceImpact` rather than `lowImpact`: the copy is identical CMS rich text, but the hero
 * carries the capability index beside it so the opener's right half argues capability instead of
 * sitting empty.
 */
export const buildExperienceHero = (copy: ExperiencePageCopy, locale: Locale) => ({
  type: 'experienceImpact' as const,
  richText: richText(
    heading(copy.hero.heading, 'h1', dirFor(locale)),
    paragraph(copy.hero.lede, dirFor(locale)),
  ),
})

export const buildExperiencePage = (
  copy: ExperiencePageCopy,
  projectIds?: ProjectIds,
  metaImage?: string,
): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: EXPERIENCE_SLUG, // explicit → `generateSlug` stays off, as on the work page
  _status: 'published',
  // English is the source this copy was written from, so it is reviewed by definition; every
  // other locale is drafted and stays unticked until a native speaker reads it (D-022).
  translationReviewed: true,
  title: copy.title,
  hero: buildExperienceHero(copy, 'en'),
  layout: buildExperienceLayout(copy, projectIds),
  meta: { ...copy.meta, ...(metaImage ? { image: metaImage } : {}) },
})

/**
 * Overlay a locale's words onto the stored English layout.
 *
 * **Overlay, never rebuild.** Every row is spread, at every depth, so its `id` survives — the
 * blocks array is shared across locales, and a row sent without its id counts as a *new* row,
 * which would grow the English page a duplicate section carrying text in one language. Spreading
 * is also what carries the project relationships through without re-resolving them.
 */
export const localizeExperienceLayout = (locale: Locale, layout: PageLayout): PageLayout => {
  const copy = experiencePageCopy[locale]

  return (layout ?? []).map((block): PageBlock => {
    switch (block.blockType) {
      case 'capabilitySpotlight':
        return {
          ...block,
          sectionHeader: { ...block.sectionHeader, ...copy.spotlight.header },
          items: (block.items ?? []).map((row) => {
            const item = copy.spotlight.items[row.key as keyof typeof copy.spotlight.items]
            return item ? { ...row, ...item } : row
          }),
        }

      case 'capabilityMatrix':
        return {
          ...block,
          sectionHeader: { ...block.sectionHeader, ...copy.matrix.header },
          evidenceLabel: copy.matrix.evidenceLabel,
          groups: (block.groups ?? []).map((group) => ({
            ...group,
            title: copy.matrix.groups[group.key as SkillGroupKey] ?? group.title,
            skills: (group.skills ?? []).map((skill) => {
              const text = copy.matrix.skills[skill.key as SkillKey]
              return {
                ...skill,
                ...(text ? { title: text.title, description: text.description } : {}),
                // Keyed by position within the skill, matching the shared `SKILL_EVIDENCE` order.
                evidence: (skill.evidence ?? []).map((ref, i) => {
                  const key = SKILL_EVIDENCE[skill.key as SkillKey]?.[i]
                  return key ? { ...ref, label: copy.evidenceNames[key] } : ref
                }),
              }
            }),
          })),
        }

      case 'capabilityEvidence':
        return {
          ...block,
          sectionHeader: { ...block.sectionHeader, ...copy.evidence.header },
          items: (block.items ?? []).map((row, i) => {
            const item = copy.evidence.items[i]
            if (!item) return row
            return {
              ...row,
              label: item.label,
              note: item.note,
              capabilities: (row.capabilities ?? []).map((capability, c) => ({
                ...capability,
                label: item.capabilities[c] ?? capability.label,
              })),
            }
          }),
        }

      case 'capabilityModel':
        return {
          ...block,
          sectionHeader: { ...block.sectionHeader, ...copy.model.header },
          disciplines: (block.disciplines ?? []).map((row, i) => ({
            ...row,
            label: copy.model.disciplines[i] ?? row.label,
          })),
          outputLabel: copy.model.outputLabel,
          output: copy.model.output,
        }

      case 'cta':
        return {
          ...block,
          richText: richText(heading(copy.cta.heading, 'h3', dirFor(locale))),
          links: (block.links ?? []).map((row, i) => ({
            ...row,
            link: {
              ...row.link,
              label: i === 0 ? copy.cta.workLabel : copy.cta.contactLabel,
            },
          })),
        }

      default:
        return block
    }
  }) as PageLayout
}

/** A proof metric on the homepage section — Home's own data, passed in by `home-content`. */
export type TeaserMetric = { caption: string; source?: string; value: string }

/**
 * The homepage's Experience section: a preview of this page, built from this page's own words.
 *
 * The tag, heading and all four capability titles and principles are read straight out of
 * `experiencePageCopy[locale].spotlight` — never retyped — so the two surfaces cannot drift into
 * describing the same capability differently, in any of the seven locales. Only the lede and the
 * link label are the teaser's own, and the metrics belong to Home.
 *
 * The `url` stays logical and unprefixed; `CMSLink` applies the locale prefix at render time.
 */
export const buildExperienceTeaserBlock = (locale: Locale, metrics: TeaserMetric[]) => {
  const page = experiencePageCopy[locale]
  const teaser = experienceTeaserCopy[locale]
  return {
    blockName: 'Experience preview',
    blockType: 'experienceTeaser' as const,
    sectionHeader: {
      tag: page.spotlight.header.tag,
      lead: page.spotlight.header.lead,
      tail: page.spotlight.header.tail,
      lede: teaser.lede,
    },
    capabilities: SPOTLIGHT_KEYS.map((key) => ({
      key,
      title: page.spotlight.items[key].title,
      principle: page.spotlight.items[key].principle,
    })),
    metrics,
    links: [
      {
        link: {
          type: 'custom' as const,
          label: teaser.linkLabel,
          url: EXPERIENCE_PATH,
        },
      },
    ],
  }
}

/**
 * Re-applies a locale's words to an already-seeded homepage teaser row. Keyed for the
 * capabilities (so a reorder survives) and index-matched for the metrics, and every row is spread
 * so its id comes back unchanged — a row sent without its id is a *new* row, and the layout array
 * is shared across locales.
 */
export const localizeExperienceTeaserBlock = (
  locale: Locale,
  block: Record<string, unknown>,
  metrics: TeaserMetric[],
) => {
  const page = experiencePageCopy[locale]
  const teaser = experienceTeaserCopy[locale]
  const rows = (name: string) =>
    (Array.isArray(block[name]) ? block[name] : []) as Record<string, unknown>[]

  return {
    ...block,
    sectionHeader: {
      ...((block.sectionHeader as Record<string, unknown>) ?? {}),
      tag: page.spotlight.header.tag,
      lead: page.spotlight.header.lead,
      tail: page.spotlight.header.tail,
      lede: teaser.lede,
    },
    capabilities: rows('capabilities').map((row) => {
      const item = page.spotlight.items[row.key as keyof typeof page.spotlight.items]
      return item ? { ...row, principle: item.principle, title: item.title } : row
    }),
    metrics: rows('metrics').map((row, i) => ({ ...row, ...metrics[i] })),
    links: rows('links').map((row) => ({
      ...row,
      link: { ...(row.link as Record<string, unknown>), label: teaser.linkLabel },
    })),
  }
}
