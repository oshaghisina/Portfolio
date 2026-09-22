import { cn } from '@/utilities/ui'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { TagList } from '@/components/Tag'
import type { Locale } from '@/utilities/locale'
import { DEFAULT_LOCALE } from '@/utilities/locale'

/**
 * DS-17 case-study meta strip. Cells come from a fixed key list so the order never drifts
 * between projects; empty keys are skipped. "Company" is Sina's addition — employers matter
 * more than clients here; `industry`, `team` and `status` are the case-study header's facts.
 */
export const PROJECT_META_KEYS = [
  'company',
  'role',
  'period',
  'type',
  'industry',
  'team',
  'status',
  'tools',
  'client',
  'link',
] as const
export type ProjectMetaKey = (typeof PROJECT_META_KEYS)[number]

export type ProjectMetaValue =
  string | string[] | { href: string; label: string } | null | undefined

export const PROJECT_META_LABELS: Record<Locale, Record<ProjectMetaKey, string>> = {
  en: {
    company: 'Company',
    role: 'Role',
    period: 'Period',
    type: 'Type',
    industry: 'Industry',
    team: 'Team',
    status: 'Status',
    tools: 'Tools',
    client: 'Client',
    link: 'Live',
  },
  fa: {
    company: 'شرکت',
    role: 'نقش',
    period: 'دوره',
    type: 'نوع',
    industry: 'صنعت',
    team: 'تیم',
    status: 'وضعیت',
    tools: 'ابزارها',
    client: 'کارفرما',
    link: 'نسخهٴ زنده',
  },
  ar: {
    company: 'الشركة',
    role: 'الدور',
    period: 'الفترة',
    type: 'النوع',
    industry: 'المجال',
    team: 'الفريق',
    status: 'الحالة',
    tools: 'الأدوات',
    client: 'العميل',
    link: 'الرابط',
  },
  es: {
    company: 'Empresa',
    role: 'Rol',
    period: 'Período',
    type: 'Tipo',
    industry: 'Sector',
    team: 'Equipo',
    status: 'Estado',
    tools: 'Herramientas',
    client: 'Cliente',
    link: 'En vivo',
  },
  de: {
    company: 'Unternehmen',
    role: 'Rolle',
    period: 'Zeitraum',
    type: 'Typ',
    industry: 'Branche',
    team: 'Team',
    status: 'Status',
    tools: 'Werkzeuge',
    client: 'Kunde',
    link: 'Live',
  },
  fr: {
    company: 'Entreprise',
    role: 'Rôle',
    period: 'Période',
    type: 'Type',
    industry: 'Secteur',
    team: 'Équipe',
    status: 'Statut',
    tools: 'Outils',
    client: 'Client',
    link: 'En ligne',
  },
  ja: {
    company: '会社',
    role: '役割',
    period: '期間',
    type: '種類',
    industry: '業界',
    team: 'チーム',
    status: 'ステータス',
    tools: 'ツール',
    client: 'クライアント',
    link: '公開ページ',
  },
}

/** `grid` = the bordered DS-17 cells; `compact` = hairline rows for a page header (no card). */
export type ProjectMetaVariant = 'grid' | 'compact'

export interface ProjectMetaProps {
  values: Partial<Record<ProjectMetaKey, ProjectMetaValue>>
  /** Override individual labels (e.g. "Employer"). */
  labels?: Partial<Record<ProjectMetaKey, string>>
  locale?: Locale
  back?: { href: string; label: string }
  variant?: ProjectMetaVariant
  className?: string
}

const isLink = (v: ProjectMetaValue): v is { href: string; label: string } =>
  !!v && typeof v === 'object' && !Array.isArray(v) && 'href' in v

export const ProjectMeta: React.FC<ProjectMetaProps> = ({
  back,
  className,
  labels,
  locale = DEFAULT_LOCALE,
  values,
  variant = 'grid',
}) => {
  const compact = variant === 'compact'
  const rows = PROJECT_META_KEYS.filter((k) => {
    const v = values[k]
    return Array.isArray(v) ? v.length > 0 : Boolean(v)
  })
  if (!rows.length && !back) return null

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {back ? (
        <Link
          className="eyebrow inline-flex items-center gap-2 self-start hover:text-foreground"
          href={back.href}
        >
          <ArrowLeft aria-hidden className="size-3.5 rtl:-scale-x-100" />
          {back.label}
        </Link>
      ) : null}
      {rows.length ? (
        <dl
          className={cn(
            compact
              ? 'grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-1'
              : 'grid grid-cols-2 border-t border-s border-line md:grid-cols-4',
          )}
        >
          {rows.map((key) => {
            const v = values[key]
            return (
              <div
                className={cn(
                  'flex flex-col',
                  compact
                    ? 'gap-1.5 border-t border-line pt-3'
                    : 'gap-2 border-b border-e border-line p-5',
                )}
                key={key}
              >
                <dt className="eyebrow text-ink-3">
                  {labels?.[key] ?? PROJECT_META_LABELS[locale][key]}
                </dt>
                <dd className="text-small font-medium text-foreground">
                  {Array.isArray(v) ? (
                    <TagList items={v} />
                  ) : isLink(v) ? (
                    <Link
                      className="underline-offset-4 hover:underline"
                      href={v.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {v.label}
                    </Link>
                  ) : (
                    v
                  )}
                </dd>
              </div>
            )
          })}
        </dl>
      ) : null}
    </div>
  )
}
