import React from 'react'

import type { TokensFile } from '../../../../../scripts/docs/lib/tokens'
import { rows } from '../tokens'
import { Spec, Var } from './Spec'

export const Foundations: React.FC<{ json: TokensFile }> = ({ json }) => {
  const space = rows(json, 'space.')
  const size = rows(json, 'size.')
  const radius = rows(json, 'radius.')
  const ease = rows(json, 'motion.ease.')
  const duration = rows(json, 'motion.duration.')
  const breakpoints = rows(json, 'breakpoint.')

  return (
    <Spec
      id="foundations"
      index="03"
      lead="Rhythm, controls,"
      lede="Section padding and gutters are fluid; control heights and paddings size every button and input; radii are small and deliberate — not pleurat's 0px by accident; one easing does almost everything."
      tag="Foundations · DS-05 DS-06 DS-07"
      tail="motion."
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h3 className="text-h3 font-medium">Space</h3>
          <ul className="flex flex-col gap-3">
            {space.map((s) => (
              <li className="flex flex-col gap-1" key={s.path}>
                <div className="h-3 bg-brand/80 rounded-sm" style={{ width: `var(${s.variable})` }} />
                <Var>
                  {s.variable}: {s.css}
                </Var>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-h3 font-medium">Size</h3>
          <ul className="flex flex-col gap-2">
            {size.map((s) => (
              <li className="flex items-center justify-between gap-4 border-b border-line-soft py-2" key={s.path}>
                <span className="text-small">{s.path.replace('size.', '')}</span>
                <Var>
                  {s.variable}: {s.css}
                </Var>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-h3 font-medium">Radius</h3>
          <ul className="flex flex-wrap gap-4">
            {radius.map((r) => (
              <li className="flex flex-col items-center gap-2" key={r.path}>
                <div className="size-16 border border-line bg-panel" style={{ borderRadius: `var(${r.variable})` }} />
                <span className="eyebrow">{r.name}</span>
                <Var>{r.css}</Var>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-h3 font-medium">Motion</h3>
          <p className="text-small text-ink-2">Hover a card: translate by --lift with each easing.</p>
          <ul className="grid grid-cols-2 gap-4">
            {ease.map((e) => (
              <li
                className={
                  e.name === 'spring'
                    ? 'group rounded-panel border border-line bg-panel p-4 transition-[translate,border-color] duration-(--duration-slow) ease-spring hover:translate-y-(--lift) hover:border-brand'
                    : 'group rounded-panel border border-line bg-panel p-4 transition-[translate,border-color] duration-(--duration-base) ease-standard hover:translate-y-(--lift) hover:border-brand'
                }
                key={e.path}
              >
                <span className="eyebrow">{e.name}</span>
                <div className="mt-2">
                  <Var>{e.css}</Var>
                </div>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {duration.map((d) => (
              <li key={d.path}>
                <Var>
                  {d.variable}: {d.css}
                </Var>
              </li>
            ))}
            <li>
              <Var>--lift: {rows(json, 'motion.lift')[0]?.css}</Var>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-h3 font-medium">Breakpoints</h3>
        <ul className="flex flex-wrap gap-x-6 gap-y-1">
          {breakpoints.map((b) => (
            <li key={b.path}>
              <Var>
                {b.variable}: {b.css}
              </Var>
            </li>
          ))}
        </ul>
      </div>
    </Spec>
  )
}
