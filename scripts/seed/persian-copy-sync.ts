/**
 * Synchronize visitor-facing Persian copy with the connected local Payload database.
 *
 *   node --import tsx scripts/seed/persian-copy-sync.ts
 *   node --import tsx scripts/seed/persian-copy-sync.ts --apply
 *
 * The default run writes a path-based inventory and proposed diff to /tmp. Only --apply writes
 * to Payload. It never creates records, changes publication states, marks translations reviewed,
 * uploads media, or writes another locale.
 */
import 'dotenv/config'

import { writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { getPayload } from 'payload'

import { aboutGlobalFa } from '../../src/endpoints/seed/about-global'
import { localizeAboutLayoutFa } from '../../src/endpoints/seed/about-page'
import {
  aboutHeroRichTextFa,
  aboutMetaDescriptionFa,
  aboutMetaTitleFa,
} from '../../src/endpoints/seed/about-page-content'
import { CASE_STUDIES } from '../../src/endpoints/seed/case-studies'
import { contactCopy } from '../../src/endpoints/seed/contact-copy'
import { experiencePageCopy } from '../../src/endpoints/seed/experience-page-copy'
import {
  buildExperienceHero,
  localizeExperienceLayout,
} from '../../src/endpoints/seed/experience-page-content'
import { experienceFaData, experiencesData } from '../../src/endpoints/seed/experiences'
import { localizeHomeHero, localizeHomeLayout } from '../../src/endpoints/seed/home-content'
import { homeCopy } from '../../src/endpoints/seed/home-copy'
import { heading, paragraph, richText } from '../../src/endpoints/seed/lexical-helpers'
import { navCopy } from '../../src/endpoints/seed/nav-copy'
import { projectCompanyCopy, projectRoleCopy, projectTextCopy } from '../../src/endpoints/seed/project-copy'
import { buildWorkLayout, workCopy } from '../../src/endpoints/seed/work-content'
import config from '../../src/payload.config'
import { LOCALES } from '../../src/utilities/locale'

type Doc = Record<string, unknown>
type Collection = 'pages' | 'projects' | 'experiences' | 'forms' | 'media'
type Op = { surface: string; id: string; before: Doc; data: Doc; apply: () => Promise<unknown> }
type Difference = { path: string; before: unknown; after: unknown }

const payload = await getPayload({ config })
const apply = process.argv.includes('--apply')
const reportPath = '/tmp/persian-copy-sync-report.json'
const ops: Op[] = []

const asDoc = (value: unknown): Doc => value as Doc
const clean = (value: unknown): unknown => JSON.parse(JSON.stringify(value))
const omitTimestamps = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(omitTimestamps)
  if (value && typeof value === 'object')
    return Object.fromEntries(Object.entries(value).filter(([key]) => key !== 'updatedAt' && key !== 'createdAt').map(([key, item]) => [key, omitTimestamps(item)]))
  return value
}
const digest = (value: unknown) => createHash('sha256').update(JSON.stringify(omitTimestamps(clean(value)))).digest('hex')

async function otherLocaleSnapshot() {
  const snapshot: Record<string, string> = {}
  for (const locale of LOCALES) {
    if (locale === 'fa') continue
    for (const collection of ['pages', 'projects', 'experiences', 'forms', 'media'] as const) {
      const { docs } = await payload.find({ collection, depth: 0, draft: collection === 'pages' || collection === 'projects', fallbackLocale: false, limit: 500, locale, pagination: false, sort: 'id' })
      snapshot[`${locale}/${collection}`] = digest(docs)
    }
    for (const slug of ['about', 'header', 'footer'] as const) {
      snapshot[`${locale}/global/${slug}`] = digest(await payload.findGlobal({ slug, depth: 0, fallbackLocale: false, locale }))
    }
  }
  return snapshot
}

function ids(value: unknown, path = ''): { path: string; id: unknown }[] {
  if (Array.isArray(value)) return value.flatMap((item, i) => ids(item, `${path}[${i}]`))
  if (value && typeof value === 'object')
    return Object.entries(value).flatMap(([key, item]) => key === 'id' ? [{ path: `${path}.id`, id: item }] : ids(item, `${path}.${key}`))
  return []
}

function differences(before: unknown, after: unknown, path = ''): Difference[] {
  if (after === undefined) return []
  if (Array.isArray(after)) {
    if (!Array.isArray(before)) return [{ path, before, after }]
    return [
      ...(before.length === after.length ? [] : [{ path: `${path}.length`, before: before.length, after: after.length }]),
      ...after.flatMap((value, index) => differences(before[index], value, `${path}[${index}]`)),
    ]
  }
  if (after && typeof after === 'object') {
    if (!before || typeof before !== 'object') return [{ path, before, after }]
    return Object.entries(after).flatMap(([key, value]) =>
      differences(asDoc(before)[key], value, path ? `${path}.${key}` : key),
    )
  }
  return Object.is(before, after) ? [] : [{ path, before, after }]
}

function textLeaves(value: unknown, path = ''): { path: string; text: string }[] {
  if (typeof value === 'string') return /[\u0600-\u06ff]/u.test(value) ? [{ path, text: value }] : []
  if (Array.isArray(value)) return value.flatMap((item, i) => textLeaves(item, `${path}[${i}]`))
  if (value && typeof value === 'object')
    return Object.entries(value).flatMap(([key, item]) => textLeaves(item, path ? `${path}.${key}` : key))
  return []
}

async function findOne(collection: Collection, field: string, value: string | number, locale: 'en' | 'fa' = 'en') {
  const result = await payload.find({
    collection,
    depth: 0,
    draft: collection === 'pages' || collection === 'projects',
    fallbackLocale: false,
    limit: 1,
    locale,
    pagination: false,
    where: { [field]: { equals: value } },
  })
  return result.docs[0] ? asDoc(result.docs[0]) : undefined
}

async function addCollection(collection: Collection, id: string, surface: string, data: Doc) {
  const before = asDoc(await payload.findByID({ collection, id, depth: 0, draft: collection === 'pages' || collection === 'projects', fallbackLocale: false, locale: 'fa' }))
  ops.push({
    surface,
    id,
    before,
    data,
    apply: () => payload.update({ collection, id, locale: 'fa', depth: 0, context: { disableRevalidate: true }, data: data as never }),
  })
}

async function addGlobal(slug: 'about' | 'header' | 'footer', data: Doc) {
  const before = asDoc(await payload.findGlobal({ slug, depth: 0, locale: 'fa', fallbackLocale: false }))
  ops.push({
    surface: `global/${slug}`,
    id: slug,
    before,
    data,
    apply: () => payload.updateGlobal({ slug, locale: 'fa', depth: 0, context: { disableRevalidate: true }, data: data as never }),
  })
}

const page = async (slug: string) => {
  const found = await findOne('pages', 'slug', slug)
  if (!found || !Array.isArray(found.layout)) throw new Error(`Missing source page/layout: ${slug}`)
  return found
}

const home = await page('home')
await addCollection('pages', String(home.id), 'page/home', {
  title: homeCopy.fa.title,
  hero: localizeHomeHero('fa', home.hero as never),
  layout: localizeHomeLayout('fa', home.layout as never),
  meta: { ...(asDoc(home.meta)), ...homeCopy.fa.meta },
})

const about = await page('about')
await addCollection('pages', String(about.id), 'page/about', {
  title: 'درباره',
  hero: { ...(asDoc(about.hero)), richText: aboutHeroRichTextFa },
  layout: localizeAboutLayoutFa(about.layout as never),
  meta: { ...(asDoc(about.meta)), title: aboutMetaTitleFa, description: aboutMetaDescriptionFa },
})
await addGlobal('about', aboutGlobalFa)

const experience = await page('experience')
await addCollection('pages', String(experience.id), 'page/experience', {
  title: experiencePageCopy.fa.title,
  hero: buildExperienceHero(experiencePageCopy.fa, 'fa'),
  layout: localizeExperienceLayout('fa', experience.layout as never),
  meta: { ...(asDoc(experience.meta)), ...experiencePageCopy.fa.meta },
})

const work = await page('work')
const workRows = work.layout as Doc[]
await addCollection('pages', String(work.id), 'page/work', {
  title: workCopy.fa.title,
  layout: buildWorkLayout(workCopy.fa, { archive: String(workRows[0]?.id), cta: String(workRows[1]?.id) }),
  meta: { ...(asDoc(work.meta)), ...workCopy.fa.meta },
})

const contact = await page('contact')
const formBlock = (contact.layout as Doc[]).find((row) => row.blockType === 'formBlock')
if (!formBlock) throw new Error('Missing contact form block')
await addCollection('pages', String(contact.id), 'page/contact', {
  title: contactCopy.fa.title,
  hero: {
    type: 'contactImpact',
    richText: richText(heading(contactCopy.fa.headline, 'h1', 'rtl')),
    aside: richText(paragraph(contactCopy.fa.aside, 'rtl')),
  },
  layout: (contact.layout as Doc[]).map((row) =>
    row.blockType === 'formBlock'
      ? {
          ...row,
          enableIntro: false,
          introContent: null,
          sectionTitle: contactCopy.fa.sectionTitle,
          emailPath: {
            index: contactCopy.fa.paths.email.index,
            title: contactCopy.fa.paths.email.title,
            description: contactCopy.fa.paths.email.description,
            ctaLabel: contactCopy.fa.paths.email.ctaLabel,
          },
          formPath: {
            index: contactCopy.fa.paths.form.index,
            title: contactCopy.fa.paths.form.title,
            description: contactCopy.fa.paths.form.description,
            ctaLabel: contactCopy.fa.paths.form.ctaLabel,
          },
          closingNote: richText(paragraph(contactCopy.fa.closingNote, 'rtl')),
        }
      : row,
  ),
  meta: { ...(asDoc(contact.meta)), ...contactCopy.fa.meta },
})
const formId = typeof formBlock.form === 'object' ? String(asDoc(formBlock.form).id) : String(formBlock.form)
await addCollection('forms', formId, 'form/contact', {
  submitButtonLabel: contactCopy.fa.form.submitLabel,
  confirmationMessage: richText(
    heading(contactCopy.fa.form.confirmationTitle, 'h2', 'rtl'),
    paragraph(contactCopy.fa.form.confirmation, 'rtl'),
  ),
  fields: [
    {
      name: 'full-name',
      blockName: 'full-name',
      blockType: 'text',
      label: contactCopy.fa.form.labels.fullName,
      required: true,
      width: 50,
    },
    {
      name: 'email',
      blockName: 'email',
      blockType: 'email',
      label: contactCopy.fa.form.labels.email,
      required: true,
      width: 50,
    },
    {
      name: 'company',
      blockName: 'company',
      blockType: 'text',
      label: contactCopy.fa.form.labels.company,
      required: false,
      width: 50,
    },
    {
      name: 'project-type',
      blockName: 'project-type',
      blockType: 'select',
      label: contactCopy.fa.form.labels.projectType,
      options: contactCopy.fa.form.projectTypes,
      required: false,
      width: 50,
    },
    {
      name: 'message',
      blockName: 'message',
      blockType: 'textarea',
      label: contactCopy.fa.form.labels.message,
      required: true,
      width: 100,
    },
  ],
})

const header = asDoc(await payload.findGlobal({ slug: 'header', depth: 0, locale: 'en' }))
const footer = asDoc(await payload.findGlobal({ slug: 'footer', depth: 0, locale: 'en' }))
const headerLabels = Object.values(navCopy.fa.header)
if ((header.navItems as unknown[]).length !== 4 || (footer.navItems as unknown[]).length !== 3) throw new Error('Unexpected navigation structure')
await addGlobal('header', {
  navItems: (header.navItems as Doc[]).map((row, i) => ({ ...row, link: { ...asDoc(row.link), label: headerLabels[i] } })),
})
await addGlobal('footer', {
  description: navCopy.fa.footer.description,
  pagesTitle: navCopy.fa.footer.pagesTitle,
  navLabel: navCopy.fa.footer.navLabel,
  navItems: (footer.navItems as Doc[]).map((row, i) => ({ ...row, link: { ...asDoc(row.link), label: headerLabels[i] } })),
  social: (footer.social as Doc[]).map((row, i) => ({ ...row, ariaLabel: navCopy.fa.footer.social[i] })),
  about: { ...asDoc(footer.about), ...navCopy.fa.footer.about },
  contact: { ...asDoc(footer.contact), ...navCopy.fa.footer.contact },
})

const { docs: projectDocs } = await payload.find({ collection: 'projects', depth: 0, draft: true, locale: 'en', fallbackLocale: false, limit: 500, pagination: false })
const allMedia = await payload.find({ collection: 'media', depth: 0, locale: 'en', limit: 500, pagination: false })
const mediaByName = new Map(allMedia.docs.map((doc) => [doc.filename, doc.id]))
const configs = new Map(CASE_STUDIES.map((item) => [item.slug, item]))
for (const project of projectDocs) {
  if (!project.slug) continue
  const caseConfig = configs.get(project.slug)
  if (caseConfig && project.sections?.length) {
    const mediaIds: Record<string, string> = {}
    for (const [key, spec] of Object.entries(caseConfig.media)) {
      const id = mediaByName.get(spec.name)
      if (id) mediaIds[key] = id
    }
    await addCollection('projects', project.id, `case-study/${project.slug}`, asDoc(caseConfig.localizedFields('fa', mediaIds)))
  } else {
    const copy = projectTextCopy[project.slug]?.fa
    if (!copy) throw new Error(`No Persian project copy: ${project.slug}`)
    const company = project.company ? projectCompanyCopy.fa[project.company] : undefined
    const role = project.role ? projectRoleCopy.fa[project.role] : undefined
    if (project.company && !company) throw new Error(`No Persian company copy: ${project.company}`)
    if (project.role && !role) throw new Error(`No Persian role copy: ${project.role}`)
    await addCollection('projects', project.id, `project/${project.slug}`, { ...copy, company, role })
  }
}

for (const entry of experiencesData) {
  const doc = await findOne('experiences', 'order', entry.order)
  if (!doc) throw new Error(`Missing experience order ${entry.order}`)
  await addCollection('experiences', String(doc.id), `experience/${entry.order}`, experienceFaData(entry) as Doc)
}

for (const caseConfig of CASE_STUDIES) {
  for (const spec of Object.values(caseConfig.media)) {
    const id = mediaByName.get(spec.name)
    if (id && spec.alt.fa) await addCollection('media', id, `media/${spec.name}`, { alt: spec.alt.fa })
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  mode: apply ? 'apply' : 'dry-run',
  locales: [...LOCALES],
  operations: ops.map(({ surface, id, before, data }) => ({
    surface,
    id,
    status: before._status,
    differences: differences(before, clean(data)),
    inventory: textLeaves(before),
  })),
}
await writeFile(reportPath, JSON.stringify(report, null, 2))
const changed = report.operations.filter((op) => op.differences.length)
const leafCount = report.operations.reduce((count, op) => count + op.inventory.length, 0)
const nonText = changed.flatMap((op) => op.differences.filter((difference) => typeof difference.before !== 'string' || typeof difference.after !== 'string').map((difference) => `${op.surface}: ${difference.path}`))
if (nonText.length) throw new Error(`Refusing to change structural or non-text fields:\n${nonText.join('\n')}`)
console.log(`${apply ? 'Applying' : 'Dry-run'}: ${changed.length}/${ops.length} records differ; ${leafCount} Persian text leaves inventoried. Report: ${reportPath}`)
for (const op of changed) console.log(`${op.surface}: ${op.differences.length} changed paths`)

if (apply) {
  const otherBefore = await otherLocaleSnapshot()
  for (const op of ops) {
    if (!differences(op.before, clean(op.data)).length) continue
    await op.apply()
  }
  const otherAfter = await otherLocaleSnapshot()
  const changedOtherLocales = Object.keys(otherBefore).filter((key) => otherBefore[key] !== otherAfter[key])
  if (changedOtherLocales.length) throw new Error(`Other locale snapshots changed: ${changedOtherLocales.join(', ')}`)
  for (const op of ops) {
    if (!differences(op.before, clean(op.data)).length) continue
    const after = op.surface.startsWith('global/')
      ? asDoc(await payload.findGlobal({ slug: op.id as 'about' | 'header' | 'footer', depth: 0, fallbackLocale: false, locale: 'fa' }))
      : asDoc(await payload.findByID({ collection: op.surface.startsWith('page/') ? 'pages' : op.surface.startsWith('project/') || op.surface.startsWith('case-study/') ? 'projects' : op.surface.startsWith('experience/') ? 'experiences' : op.surface.startsWith('form/') ? 'forms' : 'media', id: op.id, depth: 0, fallbackLocale: false, locale: 'fa' }))
    if (op.before._status !== after._status || op.before.translationReviewed !== after.translationReviewed || JSON.stringify(ids(op.before)) !== JSON.stringify(ids(after)))
      throw new Error(`Publication state, review flag, or row IDs changed on ${op.surface}`)
  }
  console.log('Persian-only synchronization complete. Run translation audit and snapshot comparison next.')
}

process.exit(0)
