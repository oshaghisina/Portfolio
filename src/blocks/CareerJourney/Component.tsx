import { cn } from '@/utilities/ui'
import React from 'react'

import type { CareerJourneyBlock as CareerJourneyBlockProps, Experience } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

import RichText from '@/components/RichText'
import { SectionHeader } from '@/components/SectionHeader'
import { DEFAULT_LOCALE } from '@/utilities/locale'

export type CareerJourneyProps = Pick<CareerJourneyBlockProps, 'sectionHeader' | 'stages'> & {
  className?: string
  locale?: Locale
}

const EMPLOYMENT_LABELS: Record<Locale, Record<string, string>> = {
  en: { 'full-time': 'Full-time', 'part-time': 'Part-time', freelance: 'Freelance', contract: 'Contract' },
  fa: { 'full-time': 'تمام‌وقت', 'part-time': 'پاره‌وقت', freelance: 'فریلنس', contract: 'قراردادی' },
  ar: { 'full-time': 'دوام كامل', 'part-time': 'دوام جزئي', freelance: 'مستقل', contract: 'تعاقد' },
  es: { 'full-time': 'Tiempo completo', 'part-time': 'Medio tiempo', freelance: 'Freelance', contract: 'Contrato' },
  de: { 'full-time': 'Vollzeit', 'part-time': 'Teilzeit', freelance: 'Freiberuflich', contract: 'Vertrag' },
  fr: { 'full-time': 'Temps plein', 'part-time': 'Temps partiel', freelance: 'Freelance', contract: 'Contrat' },
  ja: { 'full-time': 'フルタイム', 'part-time': 'パートタイム', freelance: 'フリーランス', contract: '契約' },
}

const LABELS: Record<Locale, { company: string; period: string; role: string }> = {
  en: { company: 'Company', period: 'Period', role: 'Role' },
  fa: { company: 'شرکت', period: 'دوره', role: 'نقش' },
  ar: { company: 'الشركة', period: 'الفترة', role: 'الدور' },
  es: { company: 'Empresa', period: 'Período', role: 'Rol' },
  de: { company: 'Unternehmen', period: 'Zeitraum', role: 'Rolle' },
  fr: { company: 'Entreprise', period: 'Période', role: 'Rôle' },
  ja: { company: '会社', period: '期間', role: '役割' },
}

const periodLabel = (experience: Experience, locale: Locale): string => {
  const { period } = experience
  const parts: string[] = []
  if (period?.durationLabel) parts.push(period.approx ? `~${period.durationLabel}` : period.durationLabel)
  const employment = experience.employment ? EMPLOYMENT_LABELS[locale][experience.employment] : null
  if (employment) parts.push(employment)
  return parts.join(' · ')
}

/**
 * The About page's narrative career timeline: left column carries company/role/period authority
 * (from the linked `experiences` doc), right column carries the editorial "what changed"
 * statement. Sequence stays a vertical `<ol>` regardless of locale — chronology is never encoded
 * as physical left/right, only the two-column split flips via logical start/end.
 */
export const CareerJourneyBlock: React.FC<CareerJourneyProps> = ({
  className,
  locale = DEFAULT_LOCALE,
  sectionHeader,
  stages,
}) => {
  const rows = (stages ?? []).filter((stage) => typeof stage.experience === 'object' && stage.experience)
  if (!rows.length) return null

  const labels = LABELS[locale]

  return (
    <section className={cn(className)}>
      <SectionHeader {...sectionHeader} className="mb-10 max-md:mb-8 max-md:border-t-0 max-md:pt-0" tagTone="mono" />
      <ol className="flex flex-col divide-y divide-line border-y border-line">
        {rows.map((stage, i) => {
          const experience = stage.experience as Experience
          return (
            <li className="grid gap-4 py-10 first:pt-0 last:pb-0 lg:grid-cols-12 lg:gap-x-16" key={stage.id ?? i}>
              <div className="flex flex-col gap-1 lg:col-span-4">
                <span className="index-code text-ink-3">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-h3 tracking-h3 font-medium text-foreground">{experience.company}</span>
                {experience.product ? <span className="text-small text-ink-2">{experience.product}</span> : null}
                <dl className="mt-3 flex flex-col gap-1 text-caption text-ink-3">
                  <div>
                    <dt className="sr-only">{labels.role}</dt>
                    <dd>{experience.role}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">{labels.period}</dt>
                    <dd dir="ltr" className="inline-block">{periodLabel(experience, locale)}</dd>
                  </div>
                </dl>
              </div>
              <div className="flex flex-col gap-3 lg:col-span-8">
                {stage.narrative ? (
                  <RichText data={stage.narrative} enableGutter={false} enableProse={false} locale={locale} className="text-body text-ink-2 max-w-measure" />
                ) : null}
                {stage.relatedProjectLabel ? (
                  <span className="eyebrow text-ink-3">{stage.relatedProjectLabel}</span>
                ) : null}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
