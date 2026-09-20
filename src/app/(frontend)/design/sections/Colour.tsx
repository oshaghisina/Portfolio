import React from 'react'

import type { TokensFile } from '../../../../../scripts/docs/lib/tokens'
import type { ThemeName } from '../../../../../scripts/tokens/lib/emit'
import { colorRoles, colorSlots } from '../tokens'
import { Spec, Var } from './Spec'

const Palette: React.FC<{ json: TokensFile; theme: ThemeName }> = ({ json, theme }) => {
  const roles = colorRoles(json, theme)
  const slots = colorSlots(json, theme)
  return (
    <div className="rounded-panel border border-line bg-background p-6 text-foreground flex flex-col gap-6" data-theme={theme}>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-h3 font-medium">{theme === 'light' ? 'Light — warm paper' : 'Dark — true slate'}</h3>
        <Var>[data-theme=&apos;{theme}&apos;]</Var>
      </div>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {roles.map((r) => (
          <li className="flex flex-col gap-2" key={r.path}>
            <div className="h-16 rounded-control border border-line" style={{ background: `var(${r.variable})` }} />
            <div className="flex flex-col gap-0.5">
              <span className="text-small font-medium">{r.name}</span>
              <Var>{r.css}</Var>
              <span className="text-caption text-ink-3" dir="ltr">
                ≈ {r.hex}
                {r.onPaper && r.name !== 'paper' ? ` · ${r.onPaper.toFixed(1)}:1 on paper` : ''}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <details className="text-caption text-ink-3">
        <summary className="cursor-pointer eyebrow">shadcn slots → roles</summary>
        <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3" dir="ltr">
          {slots.map((s) => (
            <li className="index-code normal-case tracking-normal" key={s.slot}>
              --{s.slot} → {s.role}
            </li>
          ))}
        </ul>
      </details>
    </div>
  )
}

export const Colour: React.FC<{ json: TokensFile }> = ({ json }) => (
  <Spec
    id="colour"
    index="01"
    lead="Two themes,"
    lede="One paper, one panel, three inks, two hairlines, one accent with its foreground and focus ring, three status tints. The dark theme is a different palette, not an inversion. shadcn's slots (--background, --card …) alias the roles so the template UI keeps working. The accent is a placeholder until DS-01 Q1 is decided."
    tag="Colour · DS-01 DS-02"
    tail="genuinely different."
  >
    <div className="grid gap-6 lg:grid-cols-2">
      <Palette json={json} theme="light" />
      <Palette json={json} theme="dark" />
    </div>
  </Spec>
)
