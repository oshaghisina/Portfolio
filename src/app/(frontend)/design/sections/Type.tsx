import React from 'react'

import type { TokensFile } from '../../../../../scripts/docs/lib/tokens'
import type { PreviewLocale } from '../samples'
import { SAMPLES } from '../samples'
import { rows } from '../tokens'
import { Spec, Var } from './Spec'

// Literal class per role so the scanner sees them.
const ROLE_CLASS: Record<string, string> = {
  display: 'text-display font-medium',
  h1: 'text-h1 font-medium',
  h2: 'text-h2 font-medium',
  h3: 'text-h3 font-medium',
  lede: 'text-lede text-ink-2',
  body: 'text-body',
  small: 'text-small',
  caption: 'text-caption text-ink-3',
  eyebrow: 'eyebrow',
  button: 'text-button font-medium',
  num: 'text-num font-medium tabular-nums',
}

const SAMPLE: Record<string, (l: PreviewLocale) => string> = {
  display: (l) => SAMPLES[l].lead,
  h1: (l) => `${SAMPLES[l].lead} ${SAMPLES[l].tail}`,
  h2: (l) => `${SAMPLES[l].lead} ${SAMPLES[l].tail}`,
  h3: (l) => SAMPLES[l].lead,
  lede: (l) => SAMPLES[l].lede,
  body: (l) => SAMPLES[l].body,
  small: (l) => SAMPLES[l].body,
  caption: (l) => SAMPLES[l].pangram,
  eyebrow: (l) => SAMPLES[l].eyebrow,
  button: (l) => SAMPLES[l].nav.join(' · '),
  num: () => '38%',
}

export const Type: React.FC<{ json: TokensFile }> = ({ json }) => {
  const sizes = rows(json, 'font.size.')
  const order = Object.keys(ROLE_CLASS)
  sizes.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name))
  const families = rows(json, 'font.family.')
  const fa = rows(json, 'font.fa.')

  return (
    <Spec
      id="type"
      index="02"
      lead="Roles, not steps,"
      lede="Geist Sans for reading, Geist Mono for labels and codes, Vazirmatn as the Persian partner. Sizes are fluid roles emitted as clamp(); each carries its own line-height and tracking. Inside lang=fa the same variables take Persian values — taller leading, zero tracking, no uppercase, a 13px eyebrow floor."
      tag="Type · DS-03 DS-04"
      tail="in two scripts."
    >
      <ul className="grid gap-3 sm:grid-cols-3">
        {families.map((f) => (
          <li className="flex flex-col gap-1 rounded-panel border border-line p-4" key={f.path}>
            <span className="eyebrow">{f.name}</span>
            <Var>{f.css}</Var>
          </li>
        ))}
      </ul>

      <ol className="flex flex-col divide-y divide-line border-y border-line">
        {sizes.map((s) => (
          <li className="grid gap-4 py-6 lg:grid-cols-12" key={s.path}>
            <div className="flex flex-col gap-1 lg:col-span-3">
              <span className="eyebrow">{s.name}</span>
              <Var>{s.variable}</Var>
              <Var>{s.css}</Var>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-9">
              <p className={ROLE_CLASS[s.name] ?? 'text-body'} lang="en" dir="ltr">
                {SAMPLE[s.name]?.('en') ?? SAMPLES.en.pangram}
              </p>
              <p className={ROLE_CLASS[s.name] ?? 'text-body'} lang="fa" dir="rtl">
                {SAMPLE[s.name]?.('fa') ?? SAMPLES.fa.pangram}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="flex flex-col gap-3">
        <h3 className="text-h3 font-medium">Persian overrides (:lang(fa))</h3>
        <ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
          {fa.map((r) => (
            <li key={r.path}>
              <Var>
                {r.variable}: {r.css}
              </Var>
            </li>
          ))}
        </ul>
      </div>
    </Spec>
  )
}
