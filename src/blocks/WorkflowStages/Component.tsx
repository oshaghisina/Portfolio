import { cn } from '@/utilities/ui'
import React from 'react'

import type { WorkflowStagesBlock as WorkflowStagesBlockProps } from '@/payload-types'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'

import { CAPABILITY_KEYS, isCapabilityKey } from './capabilities'
import { ToolLogo } from './ToolLogo'
import { isToolKey, TOOL_LOGOS } from './toolLogos'
import './skills.css'

export type WorkflowStagesProps = Pick<
  WorkflowStagesBlockProps,
  'capabilities' | 'sectionHeader' | 'tools' | 'toolsLabel'
> & { className?: string; locale?: Locale }

const separatorFor = (locale: Locale) => (locale === 'ja' ? '・' : ' ·')

/** A typographic set of working notes: contribution first, methods beneath, tools in the margin. */
export const WorkflowStagesBlock: React.FC<WorkflowStagesProps> = ({
  capabilities,
  className,
  locale = DEFAULT_LOCALE,
  sectionHeader,
  tools,
  toolsLabel,
}) => {
  const seen = new Set<string>()
  const rows = (capabilities ?? [])
    .filter((row) => {
      if (
        !isCapabilityKey(row.key) ||
        seen.has(row.key) ||
        !(row.skills ?? []).some((skill) => skill.trim())
      )
        return false
      seen.add(row.key)
      return true
    })
    .slice()
    .sort((a, b) => CAPABILITY_KEYS.indexOf(a.key) - CAPABILITY_KEYS.indexOf(b.key))
  const shownTools = (tools ?? []).filter(
    (tool, index, all) =>
      isToolKey(tool.toolKey) && all.findIndex((item) => item.toolKey === tool.toolKey) === index,
  )
  if (!rows.length && !shownTools.length) return null

  return (
    <section className={cn('skills-editorial scroll-mt-28', className)} id="skills" lang={locale}>
      <header className="skills-intro" data-reveal-unit="">
        <div className="skills-kicker">
          <span className="eyebrow">{sectionHeader?.tag}</span>
          <svg aria-hidden="true" className="skills-asterisk" viewBox="0 0 64 64" fill="none">
            <path
              d="M32 5v54M5 32h54M13 13l38 38M13 51l38-38"
              stroke="currentColor"
              strokeWidth="3"
            />
            <circle
              cx="32"
              cy="32"
              r="7"
              fill="var(--paper)"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
        {sectionHeader?.lead ? (
          <h2 className="skills-heading">
            {sectionHeader.lead}
            {sectionHeader.tail ? (
              <span className="skills-heading-tail">{sectionHeader.tail}</span>
            ) : null}
          </h2>
        ) : null}
        {sectionHeader?.lede ? <p className="skills-lede">{sectionHeader.lede}</p> : null}
        <div aria-hidden="true" className="skills-pencil-line" />
      </header>

      {rows.length ? (
        <ol className="skills-notes">
          {rows.map((row) => {
            const skills = (row.skills ?? []).filter((skill) => skill.trim())
            return (
              <li
                className="skills-note"
                data-capability={row.key}
                data-reveal-unit=""
                key={row.id ?? row.key}
              >
                <div className="skills-note-label">
                  <span className="index-code" dir="ltr">
                    {String(CAPABILITY_KEYS.indexOf(row.key) + 1).padStart(2, '0')}
                  </span>
                  <p className="eyebrow">{row.title}</p>
                </div>
                <h3 className="skills-contribution">{row.contribution?.trim() || row.title}</h3>
                <ul className="skills-methods">
                  {skills.map((skill, index) => (
                    <li key={`${index}-${skill}`}>
                      {skill}
                      {index < skills.length - 1 ? (
                        <>
                          <span aria-hidden="true">{separatorFor(locale)}</span>
                          {locale !== 'ja' ? ' ' : null}
                        </>
                      ) : null}
                    </li>
                  ))}
                </ul>
                {row.note ? <p className="skills-personal-note">{row.note}</p> : null}
              </li>
            )
          })}
        </ol>
      ) : null}

      {shownTools.length ? (
        <aside className="skills-toolkit" aria-label={toolsLabel || undefined} data-reveal-unit="">
          {toolsLabel ? <h3 className="eyebrow skills-tools-label">{toolsLabel}</h3> : null}
          <ul className="skills-tools">
            {shownTools.map((tool) => {
              const entry = TOOL_LOGOS[tool.toolKey]
              return (
                <li key={tool.id ?? tool.toolKey}>
                  <a
                    className="skills-tool"
                    href={entry.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="skills-tool-mark">
                      <ToolLogo size="sm" toolKey={tool.toolKey} />
                    </span>
                    <span dir="ltr">{entry.name}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </aside>
      ) : null}
    </section>
  )
}
