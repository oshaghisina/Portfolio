import type { Project } from '@/payload-types'
import { dirFor, LOCALES, type Locale } from '@/utilities/locale'

import type { MediaSpec } from '../../media'
import { archiveIdentity } from '../archive'
import { bullets, paragraph, prose } from '../lexical'

/**
 * The five Carsparency case studies (`carsparency-pro`, `-back-office`, `-inspection`, `-web`,
 * `-design-system`) share one chapter grammar, so a visitor who reads two of them can compare
 * them: context → problem → flow → decisions → solution → ecosystem → contribution → result →
 * lessons. Each study supplies a `CspPlan` (the ordered blocks, with shared fields: layouts,
 * treatments, media, codes, values) and one `CspCopy` per locale (every localized leaf).
 *
 * Every claim in the copy comes from the Figma files, read 2026-09-26 and recorded in
 * `Docs/Experience/Carsparency-Khodro45/CARSPARENCY-AUDIT.md`. Publication gates, held in the
 * copy and in `tests/int/case-study-seeds.int.spec.ts`:
 * - no Figma URL, no private file name;
 * - no outcome, KPI reading, team size, date or launch claim — none exists in the files;
 * - no benchmark or placeholder leftovers quoted as fact (US listings in Pro, UK copy in Web's
 *   first iteration and the dealer landing page, review and dealer counts on marketing pages);
 * - not uploaded: the inspection report's cover (an inspector's name and a phone number), the
 *   proof-of-payment and document modals (a bank-statement placeholder), the dealer landing page.
 */

type NarrativeLabel =
  | 'context'
  | 'problem'
  | 'constraints'
  | 'approach'
  | 'solution'
  | 'research'
  | 'outcome'
  | 'custom'

export interface CspChapterCopy {
  heading: string
  /** Only for `custom` chapters: the label shown as "05 ECOSYSTEM". */
  customLabel?: string
  body: string[]
  bullets?: string[]
  insight?: string
}

export interface CspFigureCopy {
  caption: string
  /** One per media item, in plan order; omit for figures without per-item notes. */
  items?: string[]
  /** Annotated figures only. */
  annotations?: string[]
}

export interface CspCopy {
  statement: string
  industry: string
  team: string
  heroCaption: string
  snapshot: { problem: string; role: string; result: string }
  alt: Record<string, string>
  chapters: Record<string, CspChapterCopy>
  figures: Record<string, CspFigureCopy>
  process: { heading: string; steps: { label: string; note: string }[] }
  decisions: {
    heading: string
    lede: string
    items: { title: string; why: string; alternatives?: string; tradeoff?: string; evidence?: string }[]
  }
  ownership: { heading: string; intro: string; own: string[]; collaborate: string[]; note: string }
  outcomes: {
    heading: string
    intro: string
    delivered: { label: string; context: string }[]
    shipped: string[]
  }
  lessons: { heading: string; items: { title: string; body: string }[] }
}

export type CspPlanEntry<K extends string> =
  | { type: 'narrative'; key: string; label: NarrativeLabel }
  | {
      type: 'figure'
      key: string
      layout: 'full' | 'split' | 'sequence' | 'annotated' | 'compare'
      treatment: 'screen' | 'plain' | 'diagram'
      media: K[]
    }
  | { type: 'process'; codes: string[] }
  | { type: 'decisions'; media?: Partial<Record<number, K>> }
  | { type: 'ownership' }
  | { type: 'outcomes'; values: (string | undefined)[] }
  | { type: 'lessons' }

export interface CspStudy<K extends string> {
  slug: string
  /** Row-id prefix, identical in every locale, e.g. `cpro`. */
  prefix: string
  assetsDir: string
  files: Record<K, { file: string; name: string }>
  hero: K[]
  cover: K
  plan: CspPlanEntry<K>[]
  copy: Record<Locale, CspCopy>
}

type Sections = NonNullable<Project['sections']>
const pad = (n: number) => String(n).padStart(2, '0')

export function cspMedia<K extends string>(study: CspStudy<K>): Record<K, MediaSpec> {
  return Object.fromEntries(
    (Object.keys(study.files) as K[]).map((key) => [
      key,
      {
        ...study.files[key],
        alt: Object.fromEntries(LOCALES.map((locale) => [locale, study.copy[locale].alt[key]])),
      },
    ]),
  ) as Record<K, MediaSpec>
}

export function cspSections<K extends string>(
  study: CspStudy<K>,
  locale: Locale,
  media: Partial<Record<K, string>>,
): Sections {
  const c = study.copy[locale]
  const dir = dirFor(locale)
  const p = study.prefix
  const need = <T>(value: T | undefined, what: string): T => {
    if (value === undefined) throw new Error(`${study.slug} (${locale}): missing ${what}`)
    return value
  }

  return study.plan.map((entry, index) => {
    const id = `${p}-s${pad(index + 1)}`
    switch (entry.type) {
      case 'narrative': {
        const ch = need(c.chapters[entry.key], `chapter ${entry.key}`)
        return {
          id,
          blockType: 'csNarrative' as const,
          label: entry.label,
          ...(entry.label === 'custom' ? { customLabel: need(ch.customLabel, `${entry.key}.customLabel`) } : {}),
          heading: ch.heading,
          body: prose(
            dir,
            ...ch.body.map((value) => paragraph(value, dir)),
            ...(ch.bullets?.length ? [bullets(ch.bullets, dir)] : []),
          ),
          ...(ch.insight ? { insight: ch.insight } : {}),
        }
      }
      case 'figure': {
        const fig = need(c.figures[entry.key], `figure ${entry.key}`)
        return {
          id,
          blockType: 'csFigure' as const,
          layout: entry.layout,
          treatment: entry.treatment,
          items: entry.media.flatMap((key, i) =>
            media[key]
              ? [
                  {
                    id: `${p}-f${pad(index + 1)}-${i + 1}`,
                    media: media[key]!,
                    ...(fig.items?.[i] ? { caption: fig.items[i] } : {}),
                  },
                ]
              : [],
          ),
          ...(entry.layout === 'annotated'
            ? {
                annotations: (fig.annotations ?? []).map((text, i) => ({
                  id: `${p}-a${pad(i + 1)}`,
                  text,
                })),
              }
            : {}),
          caption: fig.caption,
        }
      }
      case 'process':
        return {
          id,
          blockType: 'csProcess' as const,
          kind: 'process' as const,
          heading: c.process.heading,
          steps: c.process.steps.map((step, i) => ({
            id: `${p}-p${pad(i + 1)}`,
            code: need(entry.codes[i], `process code ${i}`),
            label: step.label,
            note: step.note,
          })),
        }
      case 'decisions':
        return {
          id,
          blockType: 'csDecisions' as const,
          heading: c.decisions.heading,
          lede: c.decisions.lede,
          items: c.decisions.items.map((item, i) => {
            const key = entry.media?.[i]
            return {
              id: `${p}-d${pad(i + 1)}`,
              title: item.title,
              why: item.why,
              ...(item.alternatives ? { alternatives: item.alternatives } : {}),
              ...(item.tradeoff ? { tradeoff: item.tradeoff } : {}),
              ...(item.evidence ? { evidence: item.evidence } : {}),
              ...(key && media[key] ? { media: media[key]! } : {}),
            }
          }),
        }
      case 'ownership':
        return {
          id,
          blockType: 'csOwnership' as const,
          heading: c.ownership.heading,
          intro: c.ownership.intro,
          own: c.ownership.own,
          collaborate: c.ownership.collaborate,
          note: c.ownership.note,
        }
      case 'outcomes':
        return {
          id,
          blockType: 'csOutcomes' as const,
          heading: c.outcomes.heading,
          intro: c.outcomes.intro,
          items: c.outcomes.delivered.map((outcome, i) => ({
            id: `${p}-o${pad(i + 1)}`,
            kind: 'delivered' as const,
            ...(entry.values[i] ? { value: entry.values[i] } : {}),
            label: outcome.label,
            context: outcome.context,
          })),
          shipped: c.outcomes.shipped,
        }
      case 'lessons':
        return {
          id,
          blockType: 'csLessons' as const,
          heading: c.lessons.heading,
          items: c.lessons.items.map((lesson, i) => ({
            id: `${p}-l${pad(i + 1)}`,
            title: lesson.title,
            body: lesson.body,
          })),
        }
    }
  }) as Sections
}

export function cspLocalizedFields<K extends string>(study: CspStudy<K>) {
  const archive = archiveIdentity(study.slug)
  return (locale: Locale, media: Partial<Record<K, string>>) => {
    const c = study.copy[locale]
    const identity = archive.text(locale)
    return {
      ...identity,
      statement: c.statement,
      industry: c.industry,
      team: c.team,
      hero: {
        items: study.hero
          .filter((key) => media[key])
          .map((key, index) => ({ id: `${study.prefix}-h${pad(index + 1)}`, media: media[key]! })),
        caption: c.heroCaption,
      },
      snapshot: c.snapshot,
      sections: cspSections(study, locale, media),
      meta: {
        title: identity.title,
        description: identity.summary,
        ...(media[study.cover] ? { image: media[study.cover] } : {}),
      },
    }
  }
}

/** Fails at import when a locale's copy is missing a key another locale has (shape drift). */
export function assertCopyShape(slug: string, copy: Record<Locale, CspCopy>): void {
  const shape = (value: unknown): unknown =>
    Array.isArray(value)
      ? value.map(shape)
      : value && typeof value === 'object'
        ? Object.fromEntries(
            Object.keys(value)
              .sort()
              .map((k) => [k, shape((value as Record<string, unknown>)[k])]),
          )
        : typeof value
  const en = JSON.stringify(shape(copy.en))
  for (const locale of LOCALES) {
    if (JSON.stringify(shape(copy[locale])) !== en)
      throw new Error(`${slug}: ${locale} copy does not have the same shape as English`)
  }
}

export const CSP_SHARED_FIELDS: Pick<Project, 'projectStatus' | 'tools' | 'period'> = {
  tools: ['Figma'],
}
