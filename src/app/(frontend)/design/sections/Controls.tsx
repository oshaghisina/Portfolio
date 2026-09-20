import React from 'react'

import { Button } from '@/components/ui/button'
import { Tag, TagList } from '@/components/Tag'
import type { Locale } from '@/utilities/locale'
import { SAMPLES } from '../samples'
import { Spec, Var } from './Spec'

const VARIANTS = ['default', 'outline', 'secondary', 'ghost', 'link', 'destructive'] as const
const SIZES = ['sm', 'default', 'lg'] as const

export const Controls: React.FC<{ locale: Locale }> = ({ locale }) => {
  const s = SAMPLES[locale]
  return (
    <Spec
      id="controls"
      index="04"
      lead="Two buttons,"
      lede="Filled brand and hairline outline do the work; the quiet variants exist for the template UI. Heights and paddings come from the control tokens, the arrow flips in RTL, the focus ring is the --ring token."
      tag="Controls · DS-16 DS-09 DS-10 DS-22"
      tail="one label style."
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-h3 font-medium">Variants × sizes</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-start">
              <thead>
                <tr>
                  <th className="eyebrow pb-3 text-start"></th>
                  {SIZES.map((size) => (
                    <th className="eyebrow pb-3 text-start" key={size}>
                      {size}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {VARIANTS.map((variant) => (
                  <tr className="border-t border-line-soft" key={variant}>
                    <th className="eyebrow py-4 text-start align-middle">{variant}</th>
                    {SIZES.map((size) => (
                      <td className="py-4 pe-4 align-middle" key={size}>
                        <Button arrow={variant === 'default' && size === 'default'} size={size} variant={variant}>
                          {s.nav[3]}
                        </Button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button arrow>{s.nav[0]}</Button>
            <Button arrow variant="outline">
              {s.nav[1]}
            </Button>
            <Button disabled>{s.nav[2]}</Button>
            <Button aria-label="icon" size="icon" variant="outline">
              <span aria-hidden>→</span>
            </Button>
            <Var>--size-control-height · --size-control-pad-x · --radius-control · --ring</Var>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h3 className="text-h3 font-medium">Eyebrow &amp; index code</h3>
            <p className="eyebrow">{s.eyebrow}</p>
            <p>
              <span className="index-code">01</span> <span className="index-code">02</span>{' '}
              <span className="index-code">03</span>
            </p>
            <Var>.eyebrow — mono, 12px floor, 0.14em, uppercase, ink-2 · fa: sans, 13px, no uppercase</Var>
            <Var>.index-code — mono, tabular digits, ink-3 (decorative)</Var>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-h3 font-medium">Tags</h3>
            <TagList items={s.meta.tools} />
            <div className="flex flex-wrap gap-2">
              <Tag tone="brand">{s.tag}</Tag>
              <Tag tone="soft">{s.meta.type}</Tag>
            </div>
            <Var>--radius-chip · --line · .eyebrow</Var>
          </div>
        </div>
      </div>
    </Spec>
  )
}
