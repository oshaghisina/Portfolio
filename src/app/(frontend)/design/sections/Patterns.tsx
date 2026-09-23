import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { EditorialGrid } from '@/blocks/Content/EditorialGrid'
import { MetricsStripBlock } from '@/blocks/MetricsStrip/Component'
import { ExperienceGrid } from '@/components/ExperienceGrid'
import { ProjectMeta } from '@/components/ProjectMeta'
import { SectionHeader } from '@/components/SectionHeader'
import { ShippedList } from '@/components/ShippedList'
import { TwoTone } from '@/components/TwoTone'
import { MobileNav } from '@/Header/Nav/MobileNav'
import type { PreviewLocale } from '../samples'
import { SAMPLES } from '../samples'
import { Spec, Var } from './Spec'

const Demo: React.FC<{ title: string; ds: string; note?: string; children: React.ReactNode }> = ({ children, ds, note, title }) => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <h3 className="text-h3 font-medium">{title}</h3>
      <Var>{ds}</Var>
    </div>
    <div className="rounded-panel border border-line p-6 lg:p-10">{children}</div>
    {note ? <p className="text-caption text-ink-3">{note}</p> : null}
  </div>
)

export const Patterns: React.FC<{ locale: PreviewLocale }> = ({ locale }) => {
  const s = SAMPLES[locale]
  const header = {
    id: 0,
    navItems: s.nav.map((label, i) => ({
      id: String(i),
      link: { type: 'custom' as const, url: ['/work', '/experience', '/about', '/contact'][i]!, label },
    })),
  } as unknown as HeaderType

  return (
    <Spec
      id="patterns"
      index="05"
      lead="Components"
      lede="Every P1 pattern from the pleurat.com scan, rebuilt on the tokens. Switch the language above to check mirroring and the Persian type overrides."
      tag="Patterns"
      tail="and blocks."
    >
      <div className="flex flex-col gap-12">
        <Demo ds="DS-08 · TwoTone" title="Two-tone headline">
          <div className="flex flex-col gap-6">
            <TwoTone as="h1" lead={s.lead} tail={s.tail} />
            <TwoTone as="h2" lead={s.lead} tail={s.tail} />
          </div>
        </Demo>

        <Demo ds="DS-12 · SectionHeader" note="The tag is a real element (localised, read aloud) and sits on the rule with inset-inline-start." title="Section opener">
          <SectionHeader index="02" lead={s.lead} lede={s.lede} tag={s.tag} tail={s.tail} />
        </Demo>

        <Demo ds="DS-13 · Content layout=editorial" title="Two-column editorial">
          <EditorialGrid>
            <TwoTone as="h2" lead={s.lead} tail={s.tail} />
            <p className="text-body text-ink-2">{s.body}</p>
          </EditorialGrid>
        </Demo>

        <Demo ds="DS-17 · ProjectMeta" title="Case-study meta strip">
          <ProjectMeta
            back={{ href: '#patterns', label: locale === 'fa' ? 'همهٔ پروژه‌ها' : 'All work' }}
            locale={locale}
            values={{ ...s.meta, link: { href: 'https://example.com', label: 'example.com' } }}
          />
        </Demo>

        <Demo ds="DS-27 · ShippedList" title="What shipped">
          <ShippedList items={s.outcomes} locale={locale} />
        </Demo>

        <Demo ds="DS-18 · metricsStrip block" title="Metrics strip">
          <MetricsStripBlock
            metrics={s.metrics.map((m, i) => ({ id: String(i), ...m }))}
            sectionHeader={{ tag: locale === 'fa' ? 'در اعداد' : 'By the numbers', lead: s.lead, tail: s.tail }}
          />
        </Demo>

        <Demo ds="DS-20 · ExperienceGrid" note="Names stay primary; optional mono logos are secondary markers (D-032). The /design demo stays text-only." title="Typographic employer grid">
          <ExperienceGrid
            items={s.employers.map((e, i) => ({
              index: String(i + 1).padStart(2, '0'),
              ...e,
              href: '#patterns',
              linkLabel: locale === 'fa' ? `${new Intl.NumberFormat('fa-IR', { useGrouping: false }).format(i + 1)} پروژه` : `${i + 1} project${i ? 's' : ''}`,
            }))}
          />
        </Demo>

        <Demo ds="DS-32 · MobileNav" note="Native full-screen <dialog>: focus trap, Escape and an inert page." title="Mobile menu">
          <div className="flex items-center gap-4">
            <MobileNav alwaysVisible data={header} foot={<span>{s.footNote}</span>} locale={locale} />
            <span className="text-small text-ink-2">{locale === 'fa' ? 'منو را باز کنید' : 'Open the menu'}</span>
          </div>
        </Demo>
      </div>
    </Spec>
  )
}
