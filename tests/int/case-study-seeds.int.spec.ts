/**
 * Case-study seed modules (pure — no database): every locale payload must build the same block
 * tree as English, because block rows are shared across locales and only their leaves are
 * localized. A row that exists in one locale and not another, a shared field that differs (the
 * last locale written wins it for everyone), a required leaf left empty, or a row count outside a
 * block's limits all fail here instead of halfway through `pnpm seed:case-studies`, after some
 * locales were already written.
 */
import { existsSync } from 'node:fs'
import path from 'node:path'

import sharp from 'sharp'
import { describe, expect, it } from 'vitest'

import { FIGURE_ITEM_COUNT, type FigureLayout } from '@/blocks/CaseStudy/Figure/config'
import { CASE_STUDIES } from '@/endpoints/seed/case-studies'
import { CPRO_MEDIA, cproLocalizedFields } from '@/endpoints/seed/case-studies/carsparency/pro'
import {
  CPRO_APP_GROUPS,
  CPRO_APP_SCREENS,
  CPRO_SCREEN_COPY,
  CPRO_WEB_GROUPS,
  CPRO_WEB_PAGES,
} from '@/endpoints/seed/case-studies/carsparency/pro-screens'
import { DG_LOCALES, DG_MEDIA, dgLocalizedFields } from '@/endpoints/seed/case-studies/digital-gold'
import { RP1_MEDIA, rp1LocalizedFields } from '@/endpoints/seed/case-studies/rp1-arena'
import {
  RP1_SCREEN_COPY,
  RP1_SCREEN_GROUPS,
  RP1_SCREENS,
} from '@/endpoints/seed/case-studies/rp1-arena-screens'
import type { CaseStudyLocalizedFields } from '@/endpoints/seed/case-studies/seed-case-study'
import { PROJECT_SEED } from '@/endpoints/seed/projects'
import { collectIds, hasText } from '@/endpoints/seed/translations/audit'
import { LOCALES, type Locale } from '@/utilities/locale'

type Row = Record<string, unknown>
type Sections = CaseStudyLocalizedFields['sections']

/** Generated block types carry no index signature; the checks below walk them as plain rows. */
const rowsOf = (sections: Sections): Row[] => sections as unknown as Row[]

/** A media id for every key, so no `item()` drops a row for want of an upload. */
const fakeMedia = (media: Record<string, unknown>) =>
  Object.fromEntries(Object.keys(media).map((key) => [key, `media:${key}`]))

const isRowArray = (value: unknown): value is Row[] =>
  Array.isArray(value) && value.every((item) => item && typeof item === 'object' && 'id' in item)

/**
 * The fields every locale shares. `label` is a shared select only on a narrative block — on a
 * process step or an outcome it is localized text — so it is projected at block level only.
 */
const project = (row: Row, isBlock: boolean): Row => {
  const keys = isBlock
    ? ['blockType', 'id', 'layout', 'treatment', 'kind', ...(row.blockType === 'csNarrative' ? ['label'] : [])]
    : ['id', 'code', 'value', 'kind', 'media', 'mobile', 'full', 'mobileFull', 'file']
  const out: Row = {}
  for (const key of keys) if (key in row) out[key] = row[key]
  for (const [key, value] of Object.entries(row)) {
    if (isRowArray(value)) out[key] = value.map((child) => project(child, false))
  }
  return out
}

const within = (n: number, min: number, max: number) => n >= min && n <= max

/** Every rule a block's own config would reject at save time, checked for one locale. */
const blockProblems = (block: Row): string[] => {
  const problems: string[] = []
  const at = `${String(block.id)} (${String(block.blockType)})`
  const need = (value: unknown, what: string) => {
    if (!hasText(value)) problems.push(`${at}: empty ${what}`)
  }
  const rows = (key: string) => (Array.isArray(block[key]) ? (block[key] as Row[]) : [])

  switch (block.blockType) {
    case 'csNarrative':
      need(block.heading, 'heading')
      if (block.label === 'custom') need(block.customLabel, 'customLabel')
      break
    case 'csFinding':
      need(block.text, 'text')
      break
    case 'csProcess':
      if (!within(rows('steps').length, 3, 8)) problems.push(`${at}: ${rows('steps').length} steps`)
      for (const step of rows('steps')) {
        need(step.label, `step ${String(step.id)} label`)
        if (typeof step.code !== 'string' || step.code.length > 4) problems.push(`${at}: code ${String(step.code)}`)
        const parts = Array.isArray(step.parts) ? step.parts : []
        if (parts.length > 10) problems.push(`${at}: step ${String(step.id)} has ${parts.length} parts`)
        if (parts.length && block.kind !== 'map') problems.push(`${at}: parts on a ${String(block.kind)} step`)
      }
      break
    case 'csDecisions':
      if (!within(rows('items').length, 2, 6)) problems.push(`${at}: ${rows('items').length} decisions`)
      for (const item of rows('items')) {
        need(item.title, `decision ${String(item.id)} title`)
        need(item.why, `decision ${String(item.id)} why`)
      }
      break
    case 'csOutcomes':
      if (!within(rows('items').length, 1, 4)) problems.push(`${at}: ${rows('items').length} outcomes`)
      for (const item of rows('items')) need(item.label, `outcome ${String(item.id)} label`)
      break
    case 'csLessons':
      if (!within(rows('items').length, 2, 4)) problems.push(`${at}: ${rows('items').length} lessons`)
      for (const item of rows('items')) need(item.title, `lesson ${String(item.id)} title`)
      break
    case 'csDownloads':
      if (!within(rows('items').length, 1, 6)) problems.push(`${at}: ${rows('items').length} files`)
      for (const item of rows('items')) {
        need(item.title, `file ${String(item.id)} title`)
        if (!item.file) problems.push(`${at}: file ${String(item.id)} has no upload`)
      }
      break
    case 'csFigure': {
      const range = FIGURE_ITEM_COUNT[block.layout as FigureLayout]
      if (!range || !within(rows('items').length, range.min, range.max)) {
        problems.push(`${at}: ${rows('items').length} items for ${String(block.layout)}`)
      }
      if (rows('annotations').length > 8) problems.push(`${at}: ${rows('annotations').length} annotations`)
      for (const note of rows('annotations')) need(note.text, `annotation ${String(note.id)}`)
      break
    }
  }
  return problems
}

const ARABIC_SCRIPT = /[\u0600-\u06FF]/
const JAPANESE_SCRIPT = /[\u3040-\u30FF\u4E00-\u9FFF]/

/** Catches a translation pasted into the wrong locale's slot. */
const scriptProblem = (locale: Locale, text: string): string | null => {
  const arabic = ARABIC_SCRIPT.test(text)
  const japanese = JAPANESE_SCRIPT.test(text)
  if (locale === 'fa' || locale === 'ar') return arabic ? null : `${locale}: no Arabic script in “${text}”`
  if (locale === 'ja') return japanese ? null : `ja: no kana or kanji in “${text}”`
  return arabic || japanese ? `${locale}: foreign script in “${text}”` : null
}

describe.each(CASE_STUDIES.map((config) => [config.label, config] as const))(
  '%s case study seed',
  (_label, config) => {
    const media = fakeMedia(config.media)
    const locales = config.seedLocales as readonly Locale[]
    const build = (locale: Locale) => config.localizedFields(locale, media) as CaseStudyLocalizedFields
    const english = build('en')
    const englishShape = rowsOf(english.sections).map((block) => project(block, true))

    it.each(locales)('%s builds the same shared block tree as English', (locale) => {
      const fields = build(locale)
      expect(collectIds(fields.sections)).toEqual(collectIds(english.sections))
      expect(rowsOf(fields.sections).map((block) => project(block, true))).toEqual(englishShape)
      expect(fields.hero?.items ?? []).toEqual(english.hero?.items ?? [])
    })

    it.each(locales)('%s fills every required leaf within block limits', (locale) => {
      const fields = build(locale)
      const problems = rowsOf(fields.sections).flatMap(blockProblems)
      if ((fields.hero?.items.length ?? 1) > 3) problems.push(`hero: ${fields.hero?.items.length} items`)
      for (const [key, value] of Object.entries({
        title: fields.title,
        summary: fields.summary,
        statement: fields.statement,
        'meta.title': fields.meta.title,
        'meta.description': fields.meta.description,
      })) {
        if (!hasText(value)) problems.push(`empty ${key}`)
      }
      // UTF-16 length, the same count Payload's `maxLength` applies.
      if (fields.statement.length > 160) problems.push(`statement is ${fields.statement.length} chars`)
      expect(problems).toEqual([])
    })

    it.each(locales)('%s copy is written in its own script', (locale) => {
      const fields = build(locale)
      const headings = (fields.sections as Sections)
        .filter((block) => block.blockType === 'csNarrative')
        .map((block) => (block as { heading: string }).heading)
      const problems = [fields.statement, fields.snapshot.problem, ...headings]
        .map((text) => scriptProblem(locale, text))
        .filter(Boolean)
      expect(problems).toEqual([])
    })
  },
)

describe('Digital Gold publication gates', () => {
  const media = fakeMedia(DG_MEDIA)

  it('is written in every locale, since its archive row is published in all seven', () => {
    expect(DG_LOCALES).toEqual(LOCALES)
  })

  it.each(LOCALES)('%s: every figure says what its media is', (locale) => {
    const figures = rowsOf(dgLocalizedFields(locale, media).sections).filter(
      (block) => block.blockType === 'csFigure',
    )
    expect(figures.length).toBeGreaterThan(0)
    // `auto` would crop any portrait capture — a desktop page, a brochure — into a phone.
    for (const figure of figures) expect(figure.treatment, String(figure.id)).not.toBe('auto')
  })

  it.each(LOCALES)('%s: outcomes carry percentages only, and a delivered output no number', (locale) => {
    const outcomes = rowsOf(dgLocalizedFields(locale, media).sections).find(
      (block) => block.blockType === 'csOutcomes',
    )
    for (const item of (outcomes?.items ?? []) as Row[]) {
      if (item.kind === 'measured') expect(item.value).toMatch(/^\d+(–\d+)?%$/)
      else expect(item.value).toBeUndefined()
    }
  })

  it.each(LOCALES)('%s: the P&L blocks name no currency', (locale) => {
    // Absolute rial values from the business review are never published — not even a currency
    // word near it, which is where one would slip in.
    const sections = rowsOf(dgLocalizedFields(locale, media).sections)
    const pnl = sections.filter((block) => block.blockType === 'csOutcomes' || block.id === 'dg-s17')
    expect(pnl).toHaveLength(2)
    expect(JSON.stringify(pnl)).not.toMatch(/rial|toman|ریال|ريال|تومان|トマン|リアル/i)
  })

  it('never references brochure page 5', () => {
    expect(JSON.stringify(DG_MEDIA)).not.toContain('brochure-05')
  })
})

describe('every case study agrees with its archive row', () => {
  // `createFields` only applies when a fresh database has no row yet; if it drifts from
  // `PROJECT_SEED`, a clean seed would number or feature the project differently.
  it.each(CASE_STUDIES.map((config) => [config.label, config] as const))('%s', (_label, config) => {
    const row = PROJECT_SEED.find((candidate) => candidate.slug === config.slug)
    expect(row, config.slug).toBeDefined()
    expect(config.createFields.kind).toEqual(row!.kind)
    expect(config.createFields.order).toBe(row!.order)
    expect(config.createFields.featured ?? false).toBe(row!.featured ?? false)
  })
})

describe('every case study names its cover pair', () => {
  // Home, /work and the next-project card show the cover in front of a second screen. Both come
  // from the study's own manifest, so a thumbnail never shows anything its page does not.
  it.each(CASE_STUDIES.map((config) => [config.label, config] as const))('%s', (_label, config) => {
    const keys = Object.keys(config.media)
    const cover = config.createFields.coverMediaKey
    const companion = config.coverCompanionMediaKey
    expect(keys, 'cover').toContain(cover)
    expect(keys, 'companion').toContain(companion)
    expect(config.media[companion!].name).not.toBe(config.media[cover!].name)
  })
})

describe('every phone frame holds a phone capture', () => {
  // Every item of a two- or three-item hero, every Screen figure, and any portrait image in a
  // one-item hero or an Auto figure is cropped to a 390×844 phone viewport, so a desktop or tablet capture there loses both sides
  // (Biomaze, 2026-09-27). Phone captures are exported under 1,000 px wide. `Docs/` is local-only,
  // so a file that is not on disk is skipped.
  it.each(CASE_STUDIES.map((config) => [config.label, config] as const))('%s', async (_label, config) => {
    const fields = config.localizedFields('en', fakeMedia(config.media)) as CaseStudyLocalizedFields
    const hero = fields.hero?.items ?? []
    const figures = rowsOf(fields.sections).filter((block) => block.blockType === 'csFigure')
    const framed = [
      ...hero.map((item) => ({ media: item.media, portraitOnly: hero.length === 1 })),
      ...figures
        .filter(
          (block) =>
            block.treatment === 'screen' || (block.treatment === 'auto' && block.layout !== 'pages'),
        )
        .flatMap((block) =>
          (block.items as Row[]).map((item) => ({ media: item.media, portraitOnly: block.treatment === 'auto' })),
        ),
    ]
    const problems: string[] = []
    for (const { media, portraitOnly } of framed) {
      const spec = config.media[String(media).replace(/^media:/, '')]
      const file = spec && path.resolve(config.assetsDir, spec.file)
      if (!file || !existsSync(file)) continue
      const { width = 0, height = 0 } = await sharp(file).metadata()
      if (portraitOnly && height <= width) continue
      if (width >= 1000) problems.push(`${spec.file} is ${width}×${height}`)
    }
    expect(problems).toEqual([])
  })
})

/**
 * Publication gates for the studies added on 2026-09-23. Each lists the source files that must
 * never be uploaded and the strings that must never be written, in any locale or alt text — the
 * reasons are in each module's header and in its Docs README.
 */
/**
 * The five Carsparency studies share one gate (`carsparency/shared.ts`): the report cover (an
 * inspector's name and a phone number), the dealer landing page (benchmark copy and press logos) and
 * the payment and document dialogs (a bank-statement placeholder) and the uncropped dealer profile (a
 * photographic portrait of unknown origin) are never uploaded; no private
 * Figma link, no Khodro45 lineage (a separate employer), and no benchmark or placeholder leftover
 * — US listings, UK services, review and dealer counts — is repeated as fact.
 */
const CARSPARENCY_GATE = {
  files: [/car-report\/cover/, /dealer-landing/, /proof-over-payment/, /car-documents/, /negotiation-detail-desktop/, /title-transfer-desktop/, /console\/user-detail/],
  text: [
    /figma\.com/i,
    /\(Copy\)/i,
    // The brand, not the word: «خودرو» alone is simply Persian for "car".
    /khodro|خودرو\s?(45|۴۵)/i,
    /Austin/i,
    /Wells Fargo/i,
    /Motorway/i,
    /ULEZ/i,
    /Trustpilot/i,
    /Morteza|مرتضی/i,
    /504829786/,
    /17[,٬.]?168|۱۷[٬,]?۱۶۸/,
    /24[,٬.]?718/,
  ],
}

/**
 * Yaravan's two studies (service design and platform, split 2026-09-26) share one gate: product
 * name only, and only redacted crops — never an invoice, extension-order or warranties screen
 * (prices, extension terms).
 */
const YARAVAN_GATE = {
  // Product name only (2026-09-26): only redacted crops are uploaded — never the confidential
  // charter, the competitor or portrait slides, or a raw screenshot or board. Page 09's imported
  // icon set appears once, as `crops/icon-set-page.png`, captioned as imported; `/icons/` still
  // keeps the raw library folder out.
  files: [/^(?!crops\/)/, /invoice|extension|warranties/, /charter/, /market-analysis\/(03|09|14)/, /product-report\/23/, /icons/, /about/, /slide-00/, /edit-view/, /ROLE-001/],
  text: [
    /Mobile\s?140|موبایل\s?۱۴۰|موبايل/i,
    /(?<![\d۰-۹])(140|۱۴۰)(?![\d۰-۹])/,
    /Golzar|گلزار/i,
    /Hamid|حمید|حميد/i,
    /Bahaeddin|بهاالدین|بهاءالدین|baha sharif/i,
    /Teamyar|تیم‌یار|تیمیار|تیم یار/i,
    /Gohar|گوهر/i,
    /زرین صنعت/,
    /Digikala|دیجی‌کالا|دیجیکالا|ديجي/i,
    /staging\.yaravan|yaravan\.ir/i,
    /18[- ]?month|۱۸ ?ماه|18 meses|18 Monate|18 mois|18か月|18 شهر/i,
    /250[,٬.]?000|۲۵۰[٬,]?۰۰۰/,
    /Mamali|Archer/i,
  ],
}

const GATES: Record<string, { files: RegExp[]; text: RegExp[] }> = {
  'vin-app': {
    // The screen index uploads the masked exports only: `gallery/raw/` still shows the sample
    // account's email on the sign-in screens and the unblurred profile photo (D-051).
    files: [/gallery\/raw\//],
    text: [/sinaosh(a|g)(g|h)i@/i],
  },
  faymen: {
    // The 2026-09-22 live captures of home, the search overlay, cart and checkout carry a live
    // coupon and a sales number; contact carries phones and the showroom address; about, lookbook
    // and made-to-measure carry imagery of unconfirmed origin. Cart, checkout, account and admin
    // screens come only from the masked local-build set (2026-09-27), never from the live store.
    files: [
      /^(home|search|cart|checkout|about|lookbook|support|account|guides)\//,
      /contact|find-order|create-account|made-to-measure|lookbook|about/,
      /^study-2026-09-27\/(?!(live|phone|phone-whole|checkout|desktop|admin|admin-whole)\/)/,
      /^study-2026-09-27\/live\/(?!(product-carousel|shop-filter-sheet-mob|shop-wedding-mob|search-mob)\.webp$)/,
    ],
    text: [/DEAKJP/i, /09\d{9}/, /۰۹[۰-۹]{9}/, /44964292/, /reorder/i, /\bRCE\b/, /Metabase/i, /incident/i, /فایمن|فايمن/],
  },
  'nim-dang': {
    // A national ID, a real name and phone numbers; desktop footers with a company name, phone and
    // address; a map of the wrong country; stock galleries; the design system's lineage.
    files: [/person-verification/, /step-1/, /register-login/, /profile/, /map-modal/, /gallery-modal/, /splash/, /step-5/, /desktop/],
    text: [/00223/, /0933|۰۹۳۳/, /برهان/, /خیابان پاسداران/, /91005453|۹۱۰۰۵۴۵۳/, /khodro|خودرو|carsparency|didestan|دیدستان/i, /V\.3\.1/],
  },
  'arash-rezvani': {
    // Screenshots are type only: never the pages that carry his photographs, covers and posters,
    // the full books page, or the contact page below the calendar (his address and handle). The
    // imagery chapter is Sina's generated work only — no crop of his own photographs, no cover.
    // The live home page (2026-09-26) only in its hero, six-ways, map and notes sections.
    // The 2026-09-27 rewrite adds type-only captures (search, the booking details step, two empty
    // states) and two diagrams drawn from the routes — each by exact name, nothing else in either folder.
    files: [
      /^(?!capture-2026-09\/|capture-2026-09-27\/|diagrams\/|imagery\/(turnarounds|site|studies)\/|live-2026-09-26\/)/,
      /^capture-2026-09-27\/(?!(mobile\/(search-(en|fa)|booking-fa-details)|desktop\/(poetry-fa-poems|work-en-notyet))\.png$)/,
      /^diagrams\/(?!(site-structure|record-reach)\.png$)/,
      /^live-2026-09-26\/(?!(desktop|mobile)\/home-(en|fa)-(\d-)?(hero|masthead|ways|map|notes)\.(jpg|png)$)/,
      /^capture-2026-09\/.*(home|about|music|teach|road|looking|icon|logo|books(?!-fa-fold)|contact-(fa|en)-full)/,
      /bookshelves|pigeons|riders|eroded|translated|book-|cover|avatar|IMG_/i,
    ],
    text: [/1359|1980|۱۳۵۹|۱۹۸۰/, /Khuzestan|خوزستان/i, /Shooshtari|شوشتری|شوشتري/i, /\bbrother|برادر|hermano|Bruder|frère|兄弟/i, /arash@/i, /ADVBROZ/i, /git\.arashrezvani/i, /dossier/i, /\bborn\b|متولد|nacido|geboren|年生まれ|テヘラン生まれ/i, /Farvardin|فروردین/i],
  },
  marqevon: {
    // Type crops (`crops/`) and, since 2026-09-26 (Sina's call), the `pages` index (`gallery/`):
    // every page exported from the 2026-09-26 capture, the home page's market prices masked in the
    // page before capture. Never a raw capture — the 2026-09-22 set shows the prices — or the logos.
    files: [/^(?!crops\/|gallery\/)/, /icon|logo/],
    text: [/Platts/i, /AAIDL|PJAA|AAZB/, /194\.59/, /OFAC/i, /sanction|sancion|Sanktion|تحریم|العقوبات|制裁/i, /jurisdiction|juridiction|jurisdicci|Gerichtsstand|管轄/i, /Vitol|Trafigura|Gunvor|Mercuria|Glencore/i, /\.example\b/i, /Inquery|همبرگری|نمی‌خواهیم/],
  },
  cproperty: {
    // Only derived exports: never the home page (press logos, sample-sale cards, borrowed marketing
    // copy, a portrait as placeholder realtor), the developer page (portrait, email, a placeholder
    // phone), sign-in states that show email addresses, the blog (another product's copy), desktop
    // footers, or the archived benchmark footer, market note and checkout. No design-system lineage,
    // no benchmark leftover repeated as fact, no live link. The earlier version ("Wear House") is
    // not Sina's work (2026-09-26): none of its frames or crops, and not its tier names or prices.
    files: [/^(?!crops\/|2x\/components\/|design-system\/color\.png$)/, /home\//, /developer-page\//, /login-signup\//, /blog\//, /footer|motorway|lower-mainland|canada-map|checkout/, /wear-house\/|v1-/],
    text: [
      /\bStarter\b|\bEnhanced\b/,
      /\$\s?(150|250|50|75)\b|\b(150|250|50|75)\s?(\$|ドル|دولار)|(۱۵۰|۲۵۰|۵۰|۷۵)\sدلار/,
      /Motorway/i,
      /ULEZ/i,
      /Sell my van/i,
      /Everlodge|Airbnb/i,
      /Vauxhall/i,
      /£/,
      /\bAED\b/,
      /BBC|Daily Mail|Guardian/i,
      /carsparency|کارسپرنسی|khodro|خودرو\s?(45|۴۵)/i,
      /Propertyeers|Online Ltd/i,
      /Milford/i,
      /Blue Yonder/i,
      /@|gmail/i,
      /21443214321/,
      /figma\.com/i,
      /cproperty\.ca/i,
    ],
  },
  'merikh-baft': {
    // Crops only (`crops/`): the two back-office screens have a real person's name painted out.
    // Never the investor deck (executives, capital, valuation, capacity), the business cards (names,
    // address, phone), the group that owns the mill, the pages pasted from other clients (OTeacher,
    // IranicaCard, a car app, a pill reminder, a Pierre Cardin kit, a Decathlon palette), the website
    // footer (another client's phone numbers and copyright), or the domain.
    files: [/^(?!crops\/)/, /bp\/|pdf\/|business-card|customer-panel|leftover/],
    text: [
      /Joodaki|جودکی|Karimi|کریمی/i,
      /Merikh Novin|مریخ نوین|مريخ نوين/i,
      /khodro|خودرو\s?(45|۴۵)|carsparency|کارسپرنسی|azki|ازکی|EFDC/i,
      /Sprich ?Baft|اسپریچ/i,
      /OTeacher|اُتیچر|اتیچر|Iranica|ایرانیکارت/i,
      /Pierre Cardin|پیرکاردین|Decathlon|دکاتلون/i,
      /Arvan|آروان/i,
      /ایده گزین|Borhan|برهان/i,
      /071|۰۷۱/,
      /merikhbaft\.com/i,
      /figma\.com/i,
      /@|gmail/i,
      /Snapp|اسنپ/i,
      /billion|میلیارد|مليار|Milliard|milliard|mil millones|億/i,
    ],
  },
  'mall-management-app-concept': {
    // Hadish Mall branding only (Sina, 2026-09-26): nothing from the Home Plus or Hamila Center
    // rebrands. Only redacted crops, two clean phone exports and four Hadish deck slides; the panel
    // exports and the unredacted panel, three-services and transparency slides carry Sina's email
    // and a mobile number. No prices (README Q3), no clinic product, no domain.
    files: [
      /^(?!crops\/|customers-app\/(home|wallet)\.png$|hadish-deck\/v2-(03|07|09|17)-)/,
      /panel\//,
      /hamila|homeplus/,
      /hadish-deck\/v1-|hadish-deck\/v2-(02|06|08)-/,
    ],
    text: [
      /hamila|home ?plus|home\+|همیلا|هامیلا|هوم ?پلاس|ハミラ|ホームプラス/i,
      /@|gmail/i,
      /0933|۰۹۳۳|\+98/,
      /figma\.com/i,
      /hadishmall\.(com|ir)/i,
      /million|millón|millones|百万|میلیون|مليون/i,
      /14[.,٫]7|۱۴[.٫]۷/,
      /مطب|پزشک|doctor|Arzt|médecin|médico|医師/i,
    ],
  },
  'oteacher-product-roadmap': {
    // Only `study/`: the Questions page's four rows, the event deck's roadmap, brand-position and
    // education slides, and the interview photographs Sina chose (frame 102). Never the market-size
    // slide (revenue estimates), the SWOT slide (a template about another company), the
    // teacher-interview spreadsheet slide, the persona boards (interviewees' names), the team,
    // board and timeline slides (staff and investors) or the roadmap's sticky-note draft (the
    // product manager's stickies, each signed with their name). No person is named. The names
    // themselves are not listed here, since this repository is public; the study's local `SCAN.md`
    // (Docs, not committed) records them.
    files: [/^(?!study\/)/, /market-size|swot|147-|persona\/|team|timeline|path|roadmap-draft/i],
    text: [
      /Airbnb/i,
      /billion|میلیارد|مليار|Milliard|milliard|mil millones|億/i,
      /toman|تومان|トマン/i,
      /Skyroom|اسکای ?روم|سكاي ?روم|スカイルーム/i,
      /DALL/i,
      /figma\.com/i,
      /@|gmail/i,
    ],
  },
  'taha-gasht-platform': {
    // Only `study/`: Sina's own frames and boards, masked for personal data, and the live site as
    // captured on 2026-09-27. Never a benchmark capture, UI kit, community template or the bought
    // icon set; never a frame pasted in from another client (an online school, a digital-gold buy
    // box and checkout line, a car marketplace's menu, a software vendor's header); never the
    // Opportunity board's journey map (another project, a colleague's stickies); never the Ware
    // House or Logo pages (authorship unconfirmed). No colleague, reviewer or vendor is named.
    files: [/^(?!study\/)/, /bench|template|kit|icons?\//i, /ware-?house|logo|journey/i],
    text: [
      /@|gmail/i,
      /figma\.com/i,
      /OTeacher|اتیچر|اُتیچر|ایده ?گزین/i,
      /Digikala|دیجی‌?کالا|دیجی‌?پلاس|ديجي/i,
      /carsparency|کارسپرنسی/i,
      /Moghim|مقیم ?سافت/i,
      /Lavin|لاوین/i,
      /Bilito|بیلیتو|Go ?Trip|Golobe|Travelint/i,
      /Parsa|پارسا|کیارسی|Kiarsi/i,
      /Meysam|میثم|Shafiei/i,
      /Arvan|آروان/i,
      /گنجه|Ganjeh/i,
      /0933|۰۹۳۳|0991|۰۹۹۱/,
      /91005453|۹۱۰۰۵۴۵۳/,
    ],
  },
  'arvan-cloud-platform-redesign': {
    // Only `study/`: the research images from Sina's Dribbble write-up (the group-analysis table with
    // its user counts blurred) and the two panel screens cropped out of their Dribbble frames. Never
    // the title card (a 3D hand-and-tablet mock-up). No company superlatives, NPS or satisfaction
    // claim, sanctions context, prices or absolute counts; the write-up's "100% vs 87.74%" is not
    // repeated as the sliders' win (README, "Reading the group analysis"). "A/B" is allowed since
    // 2026-09-27: Sina confirmed the size comparison was a real A/B test.
    files: [/^(?!study\/)/, /title-card|mock-?up/i],
    text: [
      /\bNPS\b|net promoter/i,
      /frustrat/i,
      /\bleading\b|global cloud|40 (locations|countries)/i,
      /sanction|sancion|Sanktion|OFAC|تحریم|العقوبات|制裁/i,
      /\brials?\b|ریال|ريال|\btomans?\b|تومان/i,
      /1[,٬]?925|۱[,٬]?۹۲۵/,
      /\b(510|283|221|603|26[,.]?493)\b|(۵۱۰|۲۸۳|۲۲۱|۶۰۳)/,
      /dribbble/i,
      /figma\.com/i,
      /@|gmail/i,
    ],
  },
  'biomaze-website-education-panel': {
    // Brand Brief Tier-1: never the unverified “first player” market claim, in any locale.
    files: [],
    text: [
      /first player/i,
      /official education system/i,
      /اولین بازیکن|اولین\s*بازیکن/,
      /نظام رسمی آموزش|نظام\s*رسمی\s*آموزش/,
      /primer (jugador|actor).{0,40}(educaci[oó]n|sistema)/i,
      /erster player|offiziellen bildungssystem/i,
      /premier (acteur|joueur).{0,40}(éducation|educatif)/i,
      /第一人者|公式教育/,
    ],
  },
  'khodro45-dealer-app': {
    // Rebuilt 2026-09-26 from 2× crops only. Never the order page below its financial block (a
    // seller's name, national ID, card number and IBAN, and a delivery address), the profile, bank
    // or login screens (IDs, card and phone numbers), or a raw export; the avatar photo is blanked.
    // No Carsparency lineage (a separate employer), no company registration numbers, and none of the
    // superseded counts.
    files: [/_raw2x\//, /_prev1x\//, /profile\//, /register-login/, /kyc/, /onboarding/],
    text: [
      /figma\.com/i,
      /\(Copy\)/i,
      /carsparency|کارسپرنسی|كارسبرنسي/i,
      /Pedram|پدرام/i,
      /سود ?بخش/,
      /1360893409|۱۳۶۰۸۹۳۴۰۹/,
      /5022|۵۰۲۲/,
      /0933|۰۹۳۳/,
      /Jannat|جنت ?آباد/i,
      /526336|۵۲۶۳۳۶/,
      /14007593370|۱۴۰۰۷۵۹۳۳۷۰/,
      /Jahangiri|جهانگیری/i,
      /Didestan|دیدستان/i,
      /28[- ]?(frame|screen)|۲۸ ?(فریم|صفحه)/i,
    ],
  },
  'carsparency-pro': CARSPARENCY_GATE,
  'carsparency-back-office': CARSPARENCY_GATE,
  'carsparency-inspection': CARSPARENCY_GATE,
  'carsparency-web': CARSPARENCY_GATE,
  'carsparency-design-system': CARSPARENCY_GATE,
  yaravan: YARAVAN_GATE,
  'yaravan-platform': {
    // The service study's gate, plus the live public site (2026-09-26, Sina's call): every page
    // under `gallery/`, captured with the names, contact details and warranty lengths masked in the
    // page itself. The public customer-charter and about pages are allowed there only.
    files: [
      /^(?!crops\/|gallery\/)/,
      ...YARAVAN_GATE.files.filter((pattern) => !['/^(?!crops\\/)/', '/charter/', '/about/'].includes(String(pattern))),
      /^(?!gallery\/).*(charter|about)/,
    ],
    text: YARAVAN_GATE.text,
  },
}

/**
 * Looser than `scriptProblem`: a caption may quote the product's own Persian UI inside English, so
 * this only asks that each string carries its own locale's script.
 */
const ownScriptProblem = (locale: Locale, text: string): string | null => {
  const own =
    locale === 'fa' || locale === 'ar'
      ? ARABIC_SCRIPT.test(text)
      : locale === 'ja'
        ? JAPANESE_SCRIPT.test(text)
        : /[A-Za-z]/.test(text) && !JAPANESE_SCRIPT.test(text)
  return own ? null : `${locale}: not written in its own script: “${text}”`
}

describe.each(CASE_STUDIES.filter((config) => config.slug in GATES).map((config) => [config.label, config] as const))(
  '%s publication gates',
  (_label, config) => {
    const gate = GATES[config.slug]
    const media = fakeMedia(config.media)
    const specs = Object.values(config.media) as { file: string; alt: Partial<Record<Locale, string>> }[]

    it('uploads no gated source file', () => {
      for (const spec of specs) for (const pattern of gate.files) expect(spec.file, String(pattern)).not.toMatch(pattern)
    })

    it('is written in every locale', () => {
      expect(config.seedLocales).toEqual(LOCALES)
    })

    it.each(LOCALES)('%s: gives every upload an alt text in its own script', (locale) => {
      for (const spec of specs) {
        expect(hasText(spec.alt[locale]), `${spec.file} alt`).toBe(true)
        expect(scriptProblem(locale, spec.alt[locale] ?? '')).toBeNull()
      }
    })

    it.each(LOCALES)('%s: writes none of the gated strings', (locale) => {
      const text = JSON.stringify(config.localizedFields(locale, media)) + JSON.stringify(specs.map((s) => s.alt[locale]))
      for (const pattern of gate.text) expect(text, String(pattern)).not.toMatch(pattern)
    })

    it.each(LOCALES)('%s: every figure says what its media is', (locale) => {
      const figures = rowsOf((config.localizedFields(locale, media) as CaseStudyLocalizedFields).sections).filter(
        (block) => block.blockType === 'csFigure',
      )
      for (const figure of figures) expect(figure.treatment, String(figure.id)).not.toBe('auto')
    })

    it.each(LOCALES)('%s: titles, labels and captions are in its own script', (locale) => {
      const fields = config.localizedFields(locale, media) as CaseStudyLocalizedFields
      const texts: string[] = [fields.snapshot.role, fields.snapshot.result, fields.hero?.caption ?? '']
      for (const block of rowsOf(fields.sections)) {
        if (typeof block.caption === 'string') texts.push(block.caption)
        for (const key of ['items', 'steps', 'annotations']) {
          for (const item of (Array.isArray(block[key]) ? block[key] : []) as Row[]) {
            for (const leaf of ['title', 'label', 'caption', 'text']) {
              if (typeof item[leaf] === 'string' && item[leaf]) texts.push(item[leaf] as string)
            }
          }
        }
      }
      expect(texts.map((text) => ownScriptProblem(locale, text)).filter(Boolean)).toEqual([])
    })
  },
)

/**
 * RP1's screen index (D-051). Not in `GATES`: that table also bars `auto` figures, which the
 * study's older story figures still use.
 */
describe('RP1 screen index', () => {
  const media = fakeMedia(RP1_MEDIA)
  const index = (locale: Locale) =>
    rowsOf(rp1LocalizedFields(locale, media).sections).find((block) => block.id === 'rp1-s16b')!
  const uploads = Object.entries(RP1_MEDIA).filter(([key]) => key.startsWith('screen:'))
  // The six modes keep the app's own names on their tabs, in Latin script in every locale.
  const MODES: string[] = ['solo', 'duel', 'team', 'tournaments', 'spotlight', 'legend']

  it('indexes every distinct frame once, within the figure’s limit', () => {
    expect(index('en').items).toHaveLength(RP1_SCREENS.length)
    expect(RP1_SCREENS.length).toBeLessThanOrEqual(FIGURE_ITEM_COUNT.pages.max)
    expect(new Set(RP1_SCREENS.map((screen) => screen.node)).size).toBe(RP1_SCREENS.length)
  })

  it('uploads the masked gallery cut only, never a raw export', () => {
    for (const [, spec] of uploads) expect(spec.file).toMatch(/^gallery\/(first|whole)\//)
  })

  it.each(LOCALES)('%s: labels every screen, flow by flow, in its own script', (locale) => {
    const items = index(locale).items as Row[]
    const problems = items.flatMap((item, i) => {
      const screen = RP1_SCREENS[i]!
      const texts = [item.caption, ...(MODES.includes(screen.group) ? [] : [item.group])]
      return texts.map((text) =>
        hasText(text) ? ownScriptProblem(locale, text as string) : `${screen.slug}: empty label`,
      )
    })
    expect(problems.filter(Boolean)).toEqual([])
    // Each flow's screens are contiguous, and the tabs follow the app's order.
    const tabs = items.map((item) => item.group).filter((group, i, all) => group !== all[i - 1])
    expect(tabs).toEqual(RP1_SCREEN_GROUPS.map((group) => RP1_SCREEN_COPY[locale].groups[group]))
  })

  it.each(LOCALES)('%s: says in the alt what is masked, and writes no email', (locale) => {
    const { masked } = RP1_SCREEN_COPY[locale]
    for (const screen of RP1_SCREENS) {
      const text = RP1_MEDIA[`screen:${screen.slug}` as const].alt[locale] ?? ''
      const note = Object.entries(masked).find(([, value]) => text.endsWith(value))?.[0]
      expect(note, screen.slug).toBe(screen.mask)
    }
    const copy =
      JSON.stringify(rp1LocalizedFields(locale, media)) +
      JSON.stringify(uploads.map(([, spec]) => spec.alt[locale]))
    expect(copy).not.toMatch(/sinaosh(a|g)(g|h)i@/i)
  })
})

describe('Carsparency Pro screen index', () => {
  const media = fakeMedia(CPRO_MEDIA)
  const block = (locale: Locale, id: string) =>
    rowsOf(cproLocalizedFields(locale, media).sections).find((row) => row.id === id)!
  const uploads = Object.entries(CPRO_MEDIA).filter(([key]) => /^(app|web):/.test(key))
  const INDEXES = [
    { id: 'cpro-s13b', list: CPRO_APP_SCREENS, groups: CPRO_APP_GROUPS, copy: 'app' },
    { id: 'cpro-s13c', list: CPRO_WEB_PAGES, groups: CPRO_WEB_GROUPS, copy: 'web' },
  ] as const

  it('sits after the solution figures, before the ecosystem chapter', () => {
    const ids = rowsOf(cproLocalizedFields('en', media).sections).map((row) => row.id)
    expect(ids.slice(ids.indexOf('cpro-s13'), ids.indexOf('cpro-s14') + 1)).toEqual([
      'cpro-s13',
      'cpro-s13a',
      'cpro-s13b',
      'cpro-s13c',
      'cpro-s14',
    ])
  })

  it.each(INDEXES)('$id indexes every distinct frame once, within the figure’s limit', ({ id, list }) => {
    expect(block('en', id).items).toHaveLength(list.length)
    expect(list.length).toBeLessThanOrEqual(FIGURE_ITEM_COUNT.pages.max)
    expect(new Set(list.map((screen) => screen.node)).size).toBe(list.length)
    expect(new Set(list.map((screen) => screen.slug)).size).toBe(list.length)
  })

  it('uploads the masked gallery cut only, never a raw export', () => {
    for (const [, spec] of uploads) {
      expect(spec.file).toMatch(/^gallery\/(app\/(first|whole)|web\/(first|full))\/[a-z0-9-]+\.(webp|jpg)$/)
    }
  })

  it.each(LOCALES)('%s: labels every screen, flow by flow, in its own script', (locale) => {
    for (const { id, list, groups, copy } of INDEXES) {
      const items = block(locale, id).items as Row[]
      const problems = items.flatMap((item, i) =>
        [item.caption, item.group].map((text) =>
          hasText(text) ? ownScriptProblem(locale, text as string) : `${list[i]!.slug}: empty label`,
        ),
      )
      expect(problems.filter(Boolean)).toEqual([])
      // Each flow's screens are contiguous, and the tabs follow the dealer's order.
      const tabs = items.map((item) => item.group).filter((group, i, all) => group !== all[i - 1])
      const names = CPRO_SCREEN_COPY[locale][copy === 'app' ? 'appGroups' : 'webGroups']
      expect(tabs).toEqual(groups.map((group) => names[group as keyof typeof names]))
    }
  })

  it.each(LOCALES)('%s: says in the alt what is masked, and writes no personal email', (locale) => {
    const { masked } = CPRO_SCREEN_COPY[locale]
    for (const [surface, list] of [
      ['app', CPRO_APP_SCREENS],
      ['web', CPRO_WEB_PAGES],
    ] as const) {
      for (const screen of list) {
        const text = CPRO_MEDIA[`${surface}:${screen.slug}` as const].alt[locale] ?? ''
        const note = Object.entries(masked).find(([, value]) => text.endsWith(value))?.[0]
        expect(note, `${surface} ${screen.slug}`).toBe(screen.mask)
      }
    }
    const copy =
      JSON.stringify(cproLocalizedFields(locale, media)) +
      JSON.stringify(uploads.map(([, spec]) => spec.alt[locale]))
    expect(copy).not.toMatch(/sinaosh(a|g)(g|h)i@|oscarisa+c+@|9360642041/i)
  })
})
