import type { Locale } from '@/utilities/locale'

import { thoughtCopy } from './copy'
import { ThoughtMotion } from './ThoughtMotion.client'
import { ThoughtScene } from './ThoughtScene'
import './thought.css'

export function ThoughtFigure({ locale }: { locale: Locale }) {
  const copy = thoughtCopy[locale]
  return (
    <ThoughtMotion>
      <ThoughtScene />
      <figcaption>
        <ol className="thought-stages">
          {copy.stages.map((stage, i) => (
            <li key={stage}>
              <span className="index-code" aria-hidden="true">
                0{i + 1}
              </span>
              <span>{stage}</span>
            </li>
          ))}
        </ol>
        <p className="sr-only">{copy.description}</p>
      </figcaption>
    </ThoughtMotion>
  )
}
