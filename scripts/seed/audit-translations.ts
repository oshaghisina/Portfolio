/**
 * Check every translated surface for blank leaves, forked block row ids and wrong review flags:
 *   pnpm audit:translations
 * Read-only. Exits non-zero when anything is found, so it can gate a deploy.
 *
 * Or print what each locale shows a visitor (R12): public archive rows, public case studies,
 * missing title / summary / snapshot text, and the `translationReviewed` flags:
 *   pnpm audit:translations --report
 * Also read-only, and it always exits 0: the report describes, it doesn't gate.
 */
import 'dotenv/config'

import { getPayload, type Payload } from 'payload'

import { auditTranslations, hasText } from '../../src/endpoints/seed/translations/audit'
import config from '../../src/payload.config'
import { DEFAULT_LOCALE, LOCALES, type Locale } from '../../src/utilities/locale'

/** The report gets only the two read calls, never the Payload instance, so it cannot write. */
type Reader = Pick<Payload, 'count' | 'find'>

interface PublicProject {
  caseStudyStatus?: string | null
  sections?: unknown[] | null
  slug?: string | null
  snapshot?: Record<string, unknown> | null
  summary?: unknown
  title?: unknown
  translationReviewed?: boolean | null
}

const SNAPSHOT_FIELDS = ['problem', 'role', 'result'] as const

/**
 * The query the `/work` archive runs for a visitor: published in this locale (`localizeStatus`),
 * no English fallback, no draft, access enforced.
 */
async function publicProjects(reader: Reader, locale: Locale): Promise<PublicProject[]> {
  const { docs } = await reader.find({
    collection: 'projects',
    depth: 0,
    draft: false,
    fallbackLocale: false,
    limit: 0,
    locale,
    overrideAccess: false,
    pagination: false,
    select: {
      caseStudyStatus: true,
      sections: true,
      slug: true,
      snapshot: true,
      summary: true,
      title: true,
      translationReviewed: true,
    },
    sort: ['order', 'slug'],
  })
  return docs as unknown as PublicProject[]
}

/** The `/work/<slug>` gate: `caseStudyStatus` published and at least one section (D-022). */
const isPublicCaseStudy = (project: PublicProject): boolean =>
  project.caseStudyStatus === 'published' && (project.sections?.length ?? 0) > 0

const slugsOf = (projects: PublicProject[]): string[] => projects.map((p) => p.slug ?? '(no slug)')

const list = (items: string[]): string => (items.length ? items.join(', ') : 'none')

async function printReport(reader: Reader): Promise<void> {
  const { totalDocs } = await reader.count({ collection: 'projects', overrideAccess: true })
  const byLocale = new Map<Locale, { rows: PublicProject[]; studies: PublicProject[] }>()
  for (const locale of LOCALES) {
    const rows = await publicProjects(reader, locale)
    byLocale.set(locale, { rows, studies: rows.filter(isPublicCaseStudy) })
  }

  console.log(`# Per-locale content report (read-only)\n`)
  console.log(`Project records in the database, any status: ${totalDocs}\n`)
  console.log(
    '| Locale | Archive rows | Case studies | Rows missing title | Rows missing summary | Studies missing snapshot text | Rows reviewed / unreviewed | Studies reviewed / unreviewed |',
  )
  console.log('| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |')

  const details: string[] = []
  const english = byLocale.get(DEFAULT_LOCALE)!

  for (const locale of LOCALES) {
    const { rows, studies } = byLocale.get(locale)!
    const noTitle = rows.filter((p) => !hasText(p.title))
    const noSummary = rows.filter((p) => !hasText(p.summary))
    const snapshotGaps = studies
      .map((p) => ({
        missing: SNAPSHOT_FIELDS.filter((field) => !hasText(p.snapshot?.[field])),
        slug: p.slug ?? '(no slug)',
      }))
      .filter((gap) => gap.missing.length)
    const rowsReviewed = rows.filter((p) => p.translationReviewed === true).length
    const studiesReviewed = studies.filter((p) => p.translationReviewed === true)

    console.log(
      `| ${locale} | ${rows.length} | ${studies.length} | ${noTitle.length} | ${noSummary.length} | ${snapshotGaps.length} | ${rowsReviewed} / ${rows.length - rowsReviewed} | ${studiesReviewed.length} / ${studies.length - studiesReviewed.length} |`,
    )

    const here = new Set(slugsOf(rows))
    const studiesHere = new Set(slugsOf(studies))
    // "Unreviewed" is not "missing": the flag only says nobody has checked the text yet.
    const flagged =
      locale === DEFAULT_LOCALE
        ? `Case studies not marked reviewed (English is the source, so expected none): ${list(slugsOf(studies.filter((p) => p.translationReviewed !== true)))}\n- Archive rows not marked reviewed: ${list(slugsOf(rows.filter((p) => p.translationReviewed !== true)))}`
        : `Case studies marked reviewed: ${list(slugsOf(studiesReviewed))}`

    details.push(
      [
        `## ${locale}`,
        locale === DEFAULT_LOCALE
          ? null
          : `- Archive rows public in ${DEFAULT_LOCALE} but not here: ${list(slugsOf(english.rows).filter((s) => !here.has(s)))}`,
        locale === DEFAULT_LOCALE
          ? null
          : `- Case studies public in ${DEFAULT_LOCALE} but not here: ${list(slugsOf(english.studies).filter((s) => !studiesHere.has(s)))}`,
        `- Rows missing title: ${list(slugsOf(noTitle))}`,
        `- Rows missing summary: ${list(slugsOf(noSummary))}`,
        `- Case studies missing snapshot text: ${list(snapshotGaps.map((gap) => `${gap.slug} (${gap.missing.join(', ')})`))}`,
        `- ${flagged}`,
      ]
        .filter(Boolean)
        .join('\n'),
    )
  }

  console.log(
    `\nArchive rows: projects published in that locale. Case studies: rows whose case study is published with at least one section. Reviewed counts read \`translationReviewed\`; unreviewed text is present but not yet checked, which is different from missing.\n`,
  )
  console.log(details.join('\n\n'))
}

const payload = await getPayload({ config })

if (process.argv.includes('--report')) {
  await printReport({ count: payload.count.bind(payload), find: payload.find.bind(payload) })
  process.exit(0)
}

const findings = await auditTranslations({ payload })

if (!findings.length) {
  console.log('No findings — every audited surface is published, filled and id-consistent.')
  process.exit(0)
}

for (const finding of findings) {
  console.error(`[${finding.kind}] ${finding.locale} · ${finding.detail}`)
}
console.error(`\n${findings.length} finding(s).`)
process.exit(1)
