import type { Project } from '@/payload-types'
import { dirFor, LOCALES, type Locale } from '@/utilities/locale'

import type { MediaSpec } from '../media'
import { archiveIdentity } from './archive'
import { paragraph, prose } from './lexical'

/**
 * Yaravan: service design (`/work/yaravan`). The after-sales operation behind a warranty brand,
 * drawn at six levels only as far as the evidence allowed. Its companion, the platform built on
 * top of it, is `yaravan-platform.ts` (`/work/yaravan-platform`); this study's Next card points
 * there. Every sentence comes from `Docs/Experience/Projects/yaravan/README.md`, its Figma
 * coverage audit (`assets/figma/COVERAGE.md`) and the board text itself.
 *
 * Split from one study into two on 2026-09-26, at Sina's request: service design keeps this URL,
 * the platform moved to its own. The warranty economics stays here; the market study closes the
 * platform study.
 *
 * Publication gates, decided with Sina on 2026-09-26 (held here and in
 * `tests/int/case-study-seeds.int.spec.ts`):
 * - Product name only: the parent retailer, its holding, its legal entity, every person and every
 *   competitor stay unnamed. The support system the agents already use is "the existing support
 *   system".
 * - Sina is the lead within a team, not the sole author: the client's engineering team contributed.
 * - The economics deck is current: warranty extension is out of scope and is never presented as a
 *   revenue line. The business-line charter (confidential) contributes nothing.
 * - Allowed evidence: process-architecture crops (not the access matrices) and the economics
 *   method. No legal exposure, no code weakness, no warranty terms, prices or SLA figures, no
 *   staging hostname, no comment authors.
 * - Every board crop stops above its risk panel (the concurrency note is a code weakness) and
 *   above any row naming the retailer or the support system; the coverage matrix and most
 *   economics slides name both too often to crop, so they are described, not shown.
 *
 * Copy lives in one `Copy` object per locale; the sections builder is a pure template over it, so
 * a missing string or a wrong tuple length is a type error. Shared fields (codes, media, layout,
 * treatment) live in the builder and are identical in every locale.
 */
export const YAR_SLUG = 'yaravan'
export const YAR_ASSETS = 'Docs/Experience/Projects/yaravan/assets'
export const YAR_LOCALES = LOCALES

const ARCHIVE = archiveIdentity(YAR_SLUG)

const MEDIA_FILES = {
  // The archive row's cover: a crop of the activation blueprint.
  cover: { file: 'crops/service-cover.png', name: ARCHIVE.row.cover.name },
  map: { file: 'crops/l0-map.png', name: 'yaravan--l0-macro-map.png' },
  library: { file: 'crops/component-library.png', name: 'yaravan--component-library.png' },
  l1: { file: 'crops/pr024-l1.png', name: 'yaravan--activation-l1.png' },
  blueprint: { file: 'crops/pr024-blueprint.png', name: 'yaravan--activation-blueprint.png' },
  swimlane: { file: 'crops/pr024-swimlane.png', name: 'yaravan--activation-swimlane.png' },
  sop: { file: 'crops/sop-006.png', name: 'yaravan--activation-code-procedure.png' },
  wi: { file: 'crops/wi-007.png', name: 'yaravan--activation-work-instruction.png' },
  notice: { file: 'crops/wi-notice.png', name: 'yaravan--work-instruction-notice.png' },
  role: { file: 'crops/role-004.png', name: 'yaravan--open-role-card.png' },
  raci: { file: 'crops/raci.png', name: 'yaravan--raci-matrix.png' },
  promise: { file: 'crops/economics-promise.png', name: 'yaravan--economics-promise.png' },
  controls: { file: 'crops/economics-controls.png', name: 'yaravan--economics-controls.png' },
} as const

export type YarMediaKey = keyof typeof MEDIA_FILES
type YarMediaIds = Partial<Record<YarMediaKey, string>>
type Sections = NonNullable<Project['sections']>

type Two<T = string> = [T, T]
type Three<T = string> = [T, T, T]
type Four<T = string> = [T, T, T, T]
type Five<T = string> = [T, T, T, T, T]
type Six<T = string> = [T, T, T, T, T, T]

export interface YarCopy {
  statement: string
  industry: string
  team: string
  heroCaption: string
  snapshot: { problem: string; role: string; result: string }
  alt: Record<YarMediaKey, string>
  context: { heading: string; body: Two }
  problem: { heading: string; body: Three }
  audit: { text: string; attribution: string; method: string }
  ownership: {
    heading: string
    intro: string
    own: Five
    coOwn: [string]
    collaborate: Two
    note: string
  }
  approach: {
    heading: string
    body: Two
    insight: string
    processHeading: string
    steps: Six<{ label: string; note: string }>
  }
  research: { heading: string; body: Three; libraryCaption: string }
  levels: {
    label: string
    heading: string
    body: Three
    insight: string
    l1Caption: string
    blueprintCaption: string
    swimlaneCaption: string
    procedureCaption: string
  }
  findings: { label: string; heading: string; body: Three; noticeCaption: string }
  roles: { label: string; heading: string; body: Two; roleCaption: string; raciCaption: string }
  decisions: {
    heading: string
    lede: string
    items: Six<{ title: string; why: string; alternatives: string; tradeoff: string }>
  }
  economics: {
    label: string
    heading: string
    body: Three
    insight: string
    promiseCaption: string
    controlsCaption: string
  }
  outcomes: {
    heading: string
    intro: string
    delivered: Four<{ label: string; context: string }>
    shipped: Six
  }
  lessons: { heading: string; items: Four<{ title: string; body: string }> }
}

const EN: YarCopy = {
  statement:
    'An after-sales operation nobody had written down, drawn from macro map to work instruction — only as far as the evidence allowed.',
  industry: 'Retail · after-sales and warranty',
  team: 'Lead service designer and process architect, with the client’s business and after-sales leads and its engineering team',
  heroCaption:
    'The macro process map: eighteen processes in five lanes, each card with an owner, an output and a status badge.',
  snapshot: {
    problem:
      'The after-sales operation behind the brand had never been written down, and the documents cited for it existed nowhere.',
    role: 'Lead service designer and process architect: the readiness audit, a 145-board process architecture, the role model and the warranty economics.',
    result:
      'The first drawn account of the operation, with every gap marked and owned rather than filled. No business metrics yet.',
  },
  alt: {
    cover:
      'Yaravan — the service blueprint for warranty activation in Persian: customer actions, touchpoints and the lines of interaction and visibility',
    map: 'Yaravan — the macro process map in Persian: eighteen process cards in five lanes, each with a status badge, and a notice that closes the count',
    library:
      'Yaravan — the diagram component library: seven flow shapes, a four-state status badge, lane headers, breadcrumbs and process cards',
    l1: 'Yaravan — the end-to-end card for customer warranty activation in Persian: trigger, owner, phases, decision gates, inputs and outputs, controls, and a KPI and SLA marked as needing determination',
    blueprint:
      'Yaravan — the service blueprint for customer warranty activation in Persian: four steps across layers from customer actions to evidence, divided by the lines of interaction, visibility and internal interaction',
    swimlane:
      'Yaravan — the swimlane for customer warranty activation in Persian: customer, system and SMS lanes, one decision and two end states',
    sop: 'Yaravan — the identity card of the activation-code procedure in Persian: version 0.3 draft, approver and review date needing determination, and the status “not approved”',
    wi: 'Yaravan — the work instruction for activating a warranty code in Persian: identity, preconditions, the panel path and seven numbered steps',
    notice:
      'Yaravan — a notice board in Persian naming the work instructions that cannot yet be written, and the reason for each',
    role: 'Yaravan — the role card for warranty operations in Persian: a red banner saying the role exists in the code but in no business document, and every field marked as needing determination',
    raci: 'Yaravan — the RACI matrix in Persian, with a red banner marking the Accountable column as open and red cells for deliberate exclusions',
    promise:
      'Yaravan warranty economics — a slide in Persian: a warranty is a promise, with three unknowns at the moment of issue — whether, when and how much',
    controls:
      'Yaravan warranty economics — five control levers in Persian, ordered from cheapest to costliest, each with its status today',
  },
  context: {
    heading: 'A dormant identity, an undocumented operation',
    body: [
      'Yaravan is the warranty and after-sales brand of an Iranian mobile-phone retailer. An outside agency wrote its brand identity in 2024, and then nothing was built on it. From July 2026 the job was to turn it into a working service: a public website, a customer panel and a staff panel — and, underneath them, the operation that would have to keep the brand’s promises.',
      'The existing support system keeps the ticket queue and the repair operation. For the processes Yaravan owns, the relationship runs the other way: Yaravan is the operations reference, and the support system records the process rather than running it. This case study is about that operation; the product built on top of it is a case study of its own.',
    ],
  },
  problem: {
    heading: 'A design of the desired state, not a record of the current one',
    body: [
      'The operation had never been written down. The requirements and the functional specification both cited two source documents — an after-sales requirements document and a CRM process report — as the origin of the real ticketing, repair and warranty processes. Neither existed in any repository.',
      'So every process map would have to be a design of the desired state, not a record of the existing one, and the process set carries that warning on its front page. Meanwhile the brand’s public promises had already outrun the operation: the requirements work found that the old site’s headline claims were not operational truth, and that no real warranty database existed.',
      'That set the design question for the operation: how do you draw a process nobody can yet confirm, without inventing it?',
    ],
  },
  audit: {
    text: '“NOT_READY is not to be replaced by any positive percentage or optimistic narrative.”',
    attribution: 'The input-readiness audit, round one',
    method: 'A rule written into the audit before it ran',
  },
  ownership: {
    heading: 'Leading the work, with the client’s team',
    intro:
      'I led the service design — the readiness audit, the process architecture, the role model and the warranty economics. Business ownership stayed with the client: its business lead owned the commercial decisions, and its after-sales lead owned the support operation and reviewed the maps.',
    own: [
      'Requirements and scope',
      'The input-readiness audit',
      'Process architecture, macro map to work instruction',
      'Roles, responsibilities and the RACI',
      'Warranty economics',
    ],
    coOwn: ['The platform build the maps were read from, with the client’s engineering team'],
    collaborate: [
      'Commercial decisions (the business lead)',
      'The support operation and its review notes (the after-sales lead)',
    ],
    note: 'The file was built with AI assistance: review fixes were applied by an agent working through the Figma integration and logged thread by thread. The drawing rules and the evidence tiers it had to obey were written first.',
  },
  approach: {
    heading: 'Gates, not deliverables',
    body: [
      'Each stage ended in a gate rather than a document. The requirements came from fifty direct multiple-choice questions to the business lead, a review of the brand and source documents, and a benchmark of nine competitors, against one success test: engineering can start without re-asking any fundamental question.',
      'Then a readiness audit ran — and failed. Across 59 sources and 31 processes it returned NOT_READY, with 12 blockers, 4 unresolved conflicts and roles in three inconsistent taxonomies. The second round did not argue with the verdict; it cut the scope to the 13 processes the brand actually owns, and a later amendment widened it to 22, adding intake, diagnosis, repair, return delivery and parts.',
    ],
    insight:
      'Cutting scope raised structural readiness from 49% to 78% and evidence confidence from 58% to 92% — because the processes left in scope could be read off executable code and passing tests.',
    processHeading: 'Six gates, in order',
    steps: [
      {
        label: 'Requirements',
        note: 'Fifty questions to the business lead; nine competitors benchmarked',
      },
      {
        label: 'Readiness audit',
        note: 'NOT_READY: 12 blockers, 4 conflicts, roles in three taxonomies',
      },
      {
        label: 'Scope cut',
        note: 'Only the processes the brand owns; the audit re-run on that scope',
      },
      {
        label: 'Drawing rules',
        note: 'A component library, six house rules and five evidence tiers',
      },
      {
        label: 'Architecture',
        note: '22 processes, from macro map to work instruction',
      },
      {
        label: 'Economics',
        note: 'What the warranty promise costs, and who could pay for it',
      },
    ],
  },
  research: {
    heading: 'Draw the rules before the diagrams',
    body: [
      'The Figma file holds no screens: the interface was specified in writing, and the design effort went into the part nobody could describe — the operation. Its first page is not a cover but a rules page: a fourteen-part component library and six house rules. Flow runs right to left, as the language does. Blanks are marked “needs determination”, never filled with a guessed name or number. Conflicts are recorded, not resolved. Colour never carries meaning alone; it always travels with a shape and an icon.',
      'One rule decides the shape of the whole file: what may be drawn depends on the evidence behind it, claim by claim. Five evidence tiers run from executable code, which licenses a full swimlane, down to no source at all, for which drawing is forbidden and only a notice may appear. The lower the tier, the less you may draw.',
      'So the file is honest about its absences. Where a level stops short, a notice board names what is missing and why, and the service-map and swimlane notices close their own arithmetic back to 22. A diagram of an undocumented sequence would be the same invention the rules forbid — only more convincing.',
    ],
    libraryCaption:
      'Page 00: the library every diagram is built from — seven flow shapes, a four-state status badge and the furniture that makes a map navigable.',
  },
  levels: {
    label: 'Six levels',
    heading: 'One process, followed all the way down',
    body: [
      'The architecture has six levels, and each answers a different question. Customer warranty activation is one of the few processes drawn at every one of them, so it shows the whole stack. On the macro map it is one card with an owner, an output and a status. At level 1 it becomes an end-to-end card: trigger, owner, start and end events, four phases, the decision gates, what it takes in and hands on, the controls the code enforces — and a KPI and SLA marked “needs determination”, because no approved formula or time exists in any source.',
      'Level 2 is a service blueprint: the customer’s actions, the touchpoints, and what staff and systems do on each side of the lines of interaction, visibility and internal interaction, down to the records and controls each step leaves behind. Here it shows that the printed label the customer starts from is a touchpoint the system does not control — printing happens outside it. Level 3 turns the same sequence into a swimlane with a lane for each actor.',
      'Levels 4 and 5 are for the people who run it. The procedure covers four processes at once — procedures and processes are not one-to-one — and is stamped “not approved”, with its approver and review date left as “needs determination”. The work instruction is the customer’s own seven steps, with a checklist written for them: the code alphabet has no zero, O, one, I or L, so nothing on the printed label can be misread.',
    ],
    insight:
      'Each level is allowed to stop. Only fourteen of the 22 processes have a swimlane and only six have a blueprint; the rest have a notice saying why, and the notices close their own count back to 22.',
    l1Caption:
      'Level 1 — customer warranty activation end to end: trigger and owner, four phases flowing right to left, the decision gates, and a KPI and SLA that no source defines yet.',
    blueprintCaption:
      'Level 2 — the service blueprint: four steps from reading the label to an active warranty, across the lines of interaction, visibility and internal interaction.',
    swimlaneCaption:
      'Level 3 — the swimlane: the customer, the system and the SMS gateway in three lanes, with the one decision that sends a used code to rejection.',
    procedureCaption:
      'Levels 4 and 5 — the procedure for activation codes, stamped “not approved”, beside the work instruction written for the customer.',
  },
  findings: {
    label: 'What the maps found',
    heading: 'A map that may come back incomplete is a research instrument',
    body: [
      'Drawing the operation produced findings no document had. Of the fourteen processes drawn as swimlanes, only two send an SMS at all — the login code and the warranty activation — so the draft message copy went into exactly those two maps. Four processes on the macro map have no card, because the sources cited for them do not exist.',
      'Where a level cannot be drawn honestly, a notice takes its place. Six work instructions cannot be written yet, each for a named reason: no reset mechanism, no ownership-dispute path, no invoice-number format, an open conflict, no photo standard, no policy for unclaimed goods. The repair-quality procedure got no work-instruction number at all — reserving one for a procedure whose performer is still open would itself be a claim.',
      'The file also audits itself. A coverage matrix sets each of the 22 processes against its source, the levels that exist and what is missing: six complete, six incomplete, one in conflict, nine needing determination. It reopens three gaps that had been marked closed — closed is not the same as resolved by the organisation — and it withdraws its own citations where a source turned out not to say what it had been cited for.',
    ],
    noticeCaption:
      'An absence, drawn: six work instructions that cannot be written yet, each with the missing mechanism or policy that blocks it.',
  },
  roles: {
    label: 'Roles',
    heading: 'Accountability is an organisational fact, not a technical one',
    body: [
      'Eight role cards set out each role’s purpose, duties, exclusive rights, deliberate exclusions and gaps, with the KPI and SLA marked “needs determination” on every card. Some cards are mostly questions. One role exists in the code and has access, but no business document, organisation chart or procedure defines it, so its lane is drawn dashed until the business decides whether it is real or another name for an existing role.',
      'The responsibility matrix could only be three-quarters derived. Responsible, consulted and informed came out of the code; accountable could not, because the code says who can execute an action, not who answers for its result. The matrix ships with that column open and a banner saying so, and it marks deliberate exclusions — segregation of duties — in red so they cannot be mistaken for gaps: the role that sets the void ceiling cannot approve voids, because it could raise its own ceiling.',
    ],
    roleCaption:
      'A role that exists only in the code: every field of its card reads “needs determination”, and the banner puts the question to the business.',
    raciCaption:
      'The first eleven rows of the 22-process matrix. The main column ships empty, and says why. The banner states the gap and who holds the decision; the name is hidden here.',
  },
  decisions: {
    heading: 'Six rules for drawing what nobody could confirm',
    lede: 'Most of the method is about what the file refuses to draw.',
    items: [
      {
        title: 'Draw only as far as the evidence goes',
        why: 'Five evidence tiers, set per claim rather than per document, decide what may be drawn: executable code licenses a full swimlane, and no source at all licenses only a notice. A diagram claims to know the sequence, conditions, error paths and lane boundaries — drawing one without evidence is invention that merely looks more convincing.',
        alternatives: 'Draw every process to the same depth from interviews and intent',
        tradeoff: 'The file looks uneven: some processes stop at a card.',
      },
      {
        title: 'Mark blanks, never guess them',
        why: 'No business information was invented. Where a name, a number or a time was missing, the field reads “needs determination” — on every KPI, every SLA and most approvers — so the gaps can be counted and assigned.',
        alternatives: 'Plausible placeholder values',
        tradeoff: 'Stakeholders see a great deal of orange.',
      },
      {
        title: 'Record conflicts, don’t resolve them',
        why: 'Where two sources disagreed, the file records the conflict and where it lives instead of picking a winner. A silent resolution would have been a decision taken on the business’s behalf.',
        alternatives: 'Choose the likelier source and move on',
        tradeoff: 'Open conflicts stay visible until someone with authority closes them.',
      },
      {
        title: 'Leave the Accountable column open',
        why: 'Responsible, consulted and informed could be read off the code; accountable could not. Filling it from permissions would have confused who can act with who answers for the result.',
        alternatives: 'Infer accountability from system permissions',
        tradeoff: 'The matrix’s most important column ships empty.',
      },
      {
        title: 'CRM as a verdict per process, not a feature',
        why: 'Each swimlane carries its own CRM verdict with a reason: one “add, high priority” — a customer can only cancel a request by phoning — four conditional, and nine not needed.',
        alternatives: 'A CRM integration everywhere',
        tradeoff: 'The integration roadmap is a list of exceptions, not a platform promise.',
      },
      {
        title: 'Persian on the canvas, Latin in the frame name',
        why: 'Flow runs right to left and every visible label is Persian, so the maps read natively to the people who run the operation; the Latin IDs live in the frame names, so every board stays traceable to the code and the documents.',
        alternatives: 'One ID system for both audiences',
        tradeoff: 'Two ID layers to keep in step.',
      },
    ],
  },
  economics: {
    label: 'Economics',
    heading: 'A warranty is a liability, not a service',
    body: [
      'The operation also had to answer what its central promise costs. A warranty delivers no service on the day it is issued — only a promise that, if the device fails within a period, someone pays. Whether a claim comes, when, and how much it costs are all unknown on that day, so money has to be set aside for it now, or the promise has nothing behind it.',
      'The deck follows the obligation from issue to closure and sets out who could fund it — and each answer says what the brand is: if the retailer absorbs the cost, a cost centre; if sellers buy the codes, an independent business; if the importer pays, a partner running the network. The recommendation is labelled “a proposal, not a decision”.',
      'It ends in controls ranked by cost — the cheapest is a single field — and ten decisions with owners and options, eight of which can be taken today without any number at all.',
    ],
    insight:
      'The only numbers allowed in the deck are ones extracted from the code, a hypothetical labelled as one, or an external benchmark with its source, population, date and confidence — and every slide carries a badge saying which.',
    promiseCaption:
      'The deck opens on the concept: on the day it is issued, a warranty is three unknowns — whether a claim comes, when, and at what cost.',
    controlsCaption:
      'Five control levers, ordered from cheapest to costliest, each tied to the factor of the cost equation it moves.',
  },
  outcomes: {
    heading: 'A drawn operation, with its gaps owned',
    intro:
      'There are no business metrics, and there should not be: the product is on staging and the agreed measures have no approved formula or data source yet. What the work changed is what the organisation knows about itself. In July there was no written account of the after-sales operation; now there is a drawn one, with every gap marked, counted and assigned — and the three items blocking integration are named as decisions, not engineering.',
    delivered: [
      {
        label: '22 processes at six levels',
        context:
          'Macro map, end-to-end cards, service blueprints, swimlanes, procedures and work instructions — 145 boards on 13 pages.',
      },
      {
        label: 'A role model and a RACI',
        context:
          'Eight role cards and a 22-process matrix, with deliberate exclusions marked and the open column admitted.',
      },
      {
        label: 'A coverage matrix that audits itself',
        context:
          'Every process against its source, its levels and what is missing; closed gaps reopened and citations corrected.',
      },
      {
        label: 'A warranty-economics model',
        context: 'Liability, funding and controls, set out without a single invented number.',
      },
    ],
    shipped: [
      'Readiness audit',
      'Macro process map',
      'Service blueprints',
      'Swimlanes and procedures',
      'Roles and RACI',
      'Warranty-economics deck',
    ],
  },
  lessons: {
    heading: 'One discipline, every board',
    items: [
      {
        title: 'Publishing the gap beats papering over it',
        body: 'The same instinct runs through every artefact: NOT_READY instead of a percentage, “needs determination” on the process cards, an empty Accountable column with a banner saying so, and an evidence badge on every slide.',
      },
      {
        title: 'A map that may come back incomplete is a research instrument',
        body: 'Drawing what nobody could describe produced findings no document had: which processes really message the customer, which roles exist only in the code, which column cannot be filled from permissions. A map that must look finished is decoration.',
      },
      {
        title: 'A readiness score means nothing until the scope is honest',
        body: 'The first audit failed because it measured an operation this product does not own. Restricting it to the processes the brand owns did not lower the standard — it raised evidence confidence to 92%.',
      },
      {
        title: 'Turn each review comment into a rule',
        body: 'Answering a comment fixes one node; naming the rule behind it fixes every future one. One note on Persian spelling became a named rule and a single pass over 1,088 text nodes on all thirteen pages.',
      },
    ],
  },
}

const FA: YarCopy = {
  statement:
    'عملیات پس از فروشی که هیچ‌کس مکتوبش نکرده بود، از نقشهٔ کلان تا دستورالعمل کاری ترسیم شد — فقط تا جایی که شواهد اجازه می‌داد.',
  industry: 'خرده‌فروشی · خدمات پس از فروش و گارانتی',
  team: 'طراح ارشد خدمت و معمار فرایند، همراه با مسئولان کسب‌وکار و خدمات پس از فروش کارفرما و تیم مهندسی آن',
  heroCaption:
    'نقشهٔ کلان فرایندها: هجده فرایند در پنج مسیر، هر کارت با یک مالک، یک خروجی و یک نشان وضعیت.',
  snapshot: {
    problem:
      'عملیات پس از فروشی که برند بر آن تکیه داشت هرگز مکتوب نشده بود، و اسنادی که برای آن به آن‌ها استناد می‌شد در هیچ‌جا وجود نداشتند.',
    role: 'طراح ارشد خدمت و معمار فرایند: ممیزی آمادگی، معماری فرایندی در ۱۴۵ بورد، مدل نقش‌ها و اقتصاد گارانتی.',
    result:
      'نخستین روایت ترسیم‌شده از عملیات، که در آن هر شکاف علامت خورده و صاحب‌دار شده است، نه پر شده. هنوز شاخص کسب‌وکاری در کار نیست.',
  },
  alt: {
    cover:
      'یاراوان — بلوپرینت خدمت برای فعال‌سازی گارانتی به فارسی: اقدام‌های مشتری، نقاط تماس و خطوط تعامل و دیدپذیری',
    map: 'یاراوان — نقشهٔ کلان فرایندها به فارسی: هجده کارت فرایند در پنج مسیر، هر یک با نشان وضعیت، و اطلاعیه‌ای که شمارش را کامل می‌کند',
    library:
      'یاراوان — کتابخانهٔ اجزای نمودار: هفت شکل جریان، نشان وضعیت چهارحالته، سرعنوان مسیرها، بردکرامب‌ها و کارت‌های فرایند',
    l1: 'یاراوان — کارت سرتاسری فعال‌سازی گارانتی توسط مشتری به فارسی: رویداد آغازگر، مالک، فازها، دروازه‌های تصمیم، ورودی‌ها و خروجی‌ها، کنترل‌ها، و یک KPI و SLA که «نیازمند تعیین» علامت خورده‌اند',
    blueprint:
      'یاراوان — بلوپرینت خدمت فعال‌سازی گارانتی توسط مشتری به فارسی: چهار گام در لایه‌هایی از اقدام‌های مشتری تا شواهد، که خطوط تعامل، دیدپذیری و تعامل داخلی از هم جدایشان می‌کنند',
    swimlane:
      'یاراوان — نمودار سوئیم‌لین فعال‌سازی گارانتی توسط مشتری به فارسی: مسیرهای مشتری، سامانه و پیامک، یک تصمیم و دو وضعیت پایانی',
    sop: 'یاراوان — شناسنامهٔ رویهٔ کدهای فعال‌سازی به فارسی: پیش‌نویس نسخهٔ ۰٫۳، تأییدکننده و تاریخ بازبینی «نیازمند تعیین»، و وضعیت «تأییدنشده»',
    wi: 'یاراوان — دستورالعمل کاری فعال‌سازی کد گارانتی به فارسی: شناسه، پیش‌شرط‌ها، مسیر در پنل و هفت گام شماره‌دار',
    notice:
      'یاراوان — تابلوی اطلاعیه‌ای به فارسی که دستورالعمل‌های کاری‌ای را نام می‌برد که هنوز نوشتنی نیستند، همراه با دلیل هر یک',
    role: 'یاراوان — کارت نقش عملیات گارانتی به فارسی: نواری قرمز که می‌گوید این نقش در کد وجود دارد اما در هیچ سند کسب‌وکاری نه، و همهٔ فیلدها با علامت «نیازمند تعیین»',
    raci: 'یاراوان — ماتریس RACI به فارسی، با نواری قرمز که ستون «پاسخ‌گو» را باز اعلام می‌کند و خانه‌هایی قرمز برای استثناهای عامدانه',
    promise:
      'اقتصاد گارانتی یاراوان — اسلایدی به فارسی: گارانتی یک وعده است، با سه مجهول در لحظهٔ صدور — وقوع، زمان و میزان',
    controls:
      'اقتصاد گارانتی یاراوان — پنج اهرم کنترلی به فارسی، مرتب از کم‌هزینه‌ترین تا پرهزینه‌ترین، هر یک با وضعیت امروزش',
  },
  context: {
    heading: 'هویتی خفته، عملیاتی مستندنشده',
    body: [
      'یاراوان برند گارانتی و خدمات پس از فروش یک خرده‌فروش ایرانی تلفن همراه است. یک آژانس بیرونی در سال ۲۰۲۴ هویت برند آن را نوشت، و پس از آن هیچ چیز بر پایه‌اش ساخته نشد. از ژوئیهٔ ۲۰۲۶ کار این بود که آن هویت به خدمتی کارا تبدیل شود: یک وب‌سایت عمومی، یک پنل مشتری و یک پنل کارکنان — و در زیر آن‌ها، عملیاتی که باید وعده‌های برند را محقق می‌کرد.',
      'سامانهٔ پشتیبانی موجود صف تیکت‌ها و عملیات تعمیر را در دست دارد. برای فرایندهایی که مالکشان یاراوان است، رابطه برعکس است: یاراوان مرجع عملیات است، و سامانهٔ پشتیبانی فرایند را ثبت می‌کند، نه اجرا. این مطالعهٔ موردی دربارهٔ همان عملیات است؛ محصولی که بر پایهٔ آن ساخته شد، مطالعهٔ موردی جداگانهٔ خودش را دارد.',
    ],
  },
  problem: {
    heading: 'طراحی وضعیت مطلوب، نه ثبت وضعیت فعلی',
    body: [
      'عملیات هرگز مکتوب نشده بود. هم سند نیازمندی‌ها و هم مشخصات کارکردی به دو سند مرجع — سند نیازمندی‌های خدمات پس از فروش و گزارش فرایندهای CRM — به‌عنوان خاستگاه فرایندهای واقعی تیکتینگ، تعمیر و گارانتی استناد می‌کردند. هیچ‌یک در هیچ مخزنی وجود نداشت.',
      'پس هر نقشهٔ فرایند باید طراحی وضعیت مطلوب می‌بود، نه ثبت وضعیت موجود، و مجموعهٔ فرایندها همین هشدار را در صفحهٔ نخستش دارد. در همین حال، وعده‌های عمومی برند پیشاپیش از توان عملیات جلو زده بود: کار نیازمندی‌ها نشان داد که ادعاهای اصلی سایت قدیمی حقیقت عملیاتی نبودند، و هیچ پایگاه دادهٔ واقعی‌ای برای گارانتی وجود نداشت.',
      'این، پرسش طراحی عملیات را رقم زد: چگونه فرایندی را که هنوز هیچ‌کس نمی‌تواند تأییدش کند ترسیم می‌کنید، بی‌آنکه آن را جعل کنید؟',
    ],
  },
  audit: {
    text: '«NOT_READY نباید با هیچ درصد مثبت یا روایت خوش‌بینانه‌ای جایگزین شود.»',
    attribution: 'ممیزی آمادگی ورودی‌ها، دور نخست',
    method: 'قاعده‌ای که پیش از اجرای ممیزی در آن نوشته شد',
  },
  ownership: {
    heading: 'رهبری کار، همراه با تیم کارفرما',
    intro:
      'طراحی خدمت را رهبری کردم — ممیزی آمادگی، معماری فرایند، مدل نقش‌ها و اقتصاد گارانتی. مالکیت کسب‌وکار نزد کارفرما ماند: مسئول کسب‌وکار آن مالک تصمیم‌های تجاری بود، و مسئول خدمات پس از فروش آن مالک عملیات پشتیبانی بود و نقشه‌ها را بازبینی می‌کرد.',
    own: [
      'نیازمندی‌ها و دامنهٔ کار',
      'ممیزی آمادگی ورودی‌ها',
      'معماری فرایند، از نقشهٔ کلان تا دستورالعمل کاری',
      'نقش‌ها، مسئولیت‌ها و ماتریس RACI',
      'اقتصاد گارانتی',
    ],
    coOwn: ['ساخت پلتفرمی که نقشه‌ها از روی آن خوانده شدند، همراه با تیم مهندسی کارفرما'],
    collaborate: [
      'تصمیم‌های تجاری (مسئول کسب‌وکار)',
      'عملیات پشتیبانی و یادداشت‌های بازبینی آن (مسئول خدمات پس از فروش)',
    ],
    note: 'فایل با کمک هوش مصنوعی ساخته شد: اصلاحات بازبینی را ایجنتی اعمال کرد که از طریق یکپارچه‌سازی Figma کار می‌کرد، و این اصلاحات رشته‌به‌رشته ثبت شدند. قواعد ترسیم و رده‌های شواهدی که ایجنت ملزم به رعایتشان بود، پیش از همه نوشته شده بودند.',
  },
  approach: {
    heading: 'دروازه‌ها، نه تحویل‌دادنی‌ها',
    body: [
      'هر مرحله به یک دروازه ختم می‌شد، نه به یک سند. نیازمندی‌ها از پنجاه پرسش چندگزینه‌ای مستقیم از مسئول کسب‌وکار، بازبینی اسناد برند و اسناد مرجع، و بنچمارک نُه رقیب به دست آمد، با یک محک موفقیت: تیم مهندسی بتواند کار را آغاز کند بی‌آنکه هیچ پرسش بنیادینی را دوباره بپرسد.',
      'سپس یک ممیزی آمادگی اجرا شد — و رد شد. در ۵۹ منبع و ۳۱ فرایند، نتیجه NOT_READY بود، با ۱۲ مانع، ۴ تعارض حل‌نشده و نقش‌هایی در سه طبقه‌بندی ناسازگار. دور دوم با این حکم بحث نکرد؛ دامنه را به ۱۳ فرایندی که برند واقعاً مالک آن‌هاست محدود کرد، و اصلاحیه‌ای بعدی آن را به ۲۲ گسترش داد و پذیرش، عیب‌یابی، تعمیر، ارسال بازگشتی و قطعات را افزود.',
    ],
    insight:
      'محدود کردن دامنه، آمادگی ساختاری را از ۴۹٪ به ۷۸٪ و اطمینان شواهد را از ۵۸٪ به ۹۲٪ رساند — چون فرایندهای باقی‌مانده در دامنه را می‌شد از روی کد اجرایی و تست‌های موفق خواند.',
    processHeading: 'شش دروازه، به ترتیب',
    steps: [
      {
        label: 'نیازمندی‌ها',
        note: 'پنجاه پرسش از مسئول کسب‌وکار؛ بنچمارک نُه رقیب',
      },
      {
        label: 'ممیزی آمادگی',
        note: 'NOT_READY: ۱۲ مانع، ۴ تعارض، نقش‌ها در سه طبقه‌بندی',
      },
      {
        label: 'محدودسازی دامنه',
        note: 'فقط فرایندهایی که برند مالک آن‌هاست؛ ممیزی روی همین دامنه دوباره اجرا شد',
      },
      {
        label: 'قواعد ترسیم',
        note: 'یک کتابخانهٔ اجزا، شش قاعدهٔ داخلی و پنج ردهٔ شواهد',
      },
      {
        label: 'معماری',
        note: '۲۲ فرایند، از نقشهٔ کلان تا دستورالعمل کاری',
      },
      {
        label: 'اقتصاد',
        note: 'وعدهٔ گارانتی چه هزینه‌ای دارد، و چه کسی می‌تواند آن را بپردازد',
      },
    ],
  },
  research: {
    heading: 'پیش از نمودارها، قواعد را ترسیم کن',
    body: [
      'فایل Figma هیچ صفحهٔ رابط کاربری‌ای ندارد: رابط به‌صورت مکتوب مشخص شد، و تلاش طراحی صرف بخشی شد که هیچ‌کس نمی‌توانست توصیفش کند — عملیات. صفحهٔ نخست آن جلد نیست، صفحهٔ قواعد است: یک کتابخانهٔ اجزای چهارده‌بخشی و شش قاعدهٔ داخلی. جریان از راست به چپ پیش می‌رود، همان‌گونه که زبان. جاهای خالی با «نیازمند تعیین» علامت می‌خورند و هرگز با نام یا عددی حدسی پر نمی‌شوند. تعارض‌ها ثبت می‌شوند، نه حل. رنگ هرگز به‌تنهایی معنا را حمل نمی‌کند؛ همیشه با یک شکل و یک آیکون همراه است.',
      'یک قاعده شکل کل فایل را تعیین می‌کند: آنچه مجاز به ترسیم است به شواهد پشت آن بستگی دارد، ادعا به ادعا. پنج ردهٔ شواهد از کد اجرایی، که مجوز یک سوئیم‌لین کامل را می‌دهد، تا نبود هیچ منبعی امتداد دارند؛ در این ردهٔ آخر ترسیم ممنوع است و فقط یک اطلاعیه می‌تواند بیاید. هرچه رده پایین‌تر، مجال ترسیم کمتر.',
      'پس فایل دربارهٔ غیاب‌هایش صادق است. هر جا سطحی ناتمام می‌ماند، یک تابلوی اطلاعیه نام می‌برد که چه چیزی کم است و چرا، و اطلاعیه‌های نقشهٔ خدمات و سوئیم‌لین حساب خود را تا ۲۲ می‌بندند. نمودار یک توالی مستندنشده همان جعلی است که قواعد منع می‌کنند — فقط باورپذیرتر.',
    ],
    libraryCaption:
      'صفحهٔ ۰۰: کتابخانه‌ای که هر نمودار از آن ساخته می‌شود — هفت شکل جریان، نشان وضعیت چهارحالته، و اجزایی که یک نقشه را پیمایش‌پذیر می‌کنند.',
  },
  levels: {
    label: 'شش سطح',
    heading: 'یک فرایند، دنبال‌شده تا پایین‌ترین سطح',
    body: [
      'این معماری شش سطح دارد، و هر سطح به پرسشی متفاوت پاسخ می‌دهد. فعال‌سازی گارانتی توسط مشتری یکی از معدود فرایندهایی است که در همهٔ این سطوح ترسیم شده، پس کل این ساختار لایه‌لایه را نشان می‌دهد. در نقشهٔ کلان، یک کارت است با یک مالک، یک خروجی و یک وضعیت. در سطح ۱ به کارتی سرتاسری بدل می‌شود: رویداد آغازگر، مالک، رویدادهای شروع و پایان، چهار فاز، دروازه‌های تصمیم، آنچه دریافت می‌کند و آنچه تحویل می‌دهد، کنترل‌هایی که کد اعمال می‌کند — و یک KPI و SLA با علامت «نیازمند تعیین»، چون در هیچ منبعی فرمول یا زمان تأییدشده‌ای وجود ندارد.',
      'سطح ۲ یک بلوپرینت خدمت است: اقدام‌های مشتری، نقاط تماس، و آنچه کارکنان و سامانه‌ها در هر سوی خطوط تعامل، دیدپذیری و تعامل داخلی انجام می‌دهند، تا سوابق و کنترل‌هایی که هر گام برجا می‌گذارد. در این‌جا نشان می‌دهد که برچسب چاپی‌ای که مشتری کارش را از آن آغاز می‌کند، نقطهٔ تماسی است که سامانه کنترلی بر آن ندارد — چاپ بیرون از آن انجام می‌شود. سطح ۳ همین توالی را به یک سوئیم‌لین تبدیل می‌کند، با یک مسیر برای هر کنشگر.',
      'سطوح ۴ و ۵ برای کسانی است که آن را اجرا می‌کنند. رویه چهار فرایند را هم‌زمان پوشش می‌دهد — رویه‌ها و فرایندها تناظر یک به یک ندارند — و مهر «تأییدنشده» خورده است، و تأییدکننده و تاریخ بازبینی‌اش «نیازمند تعیین» مانده‌اند. دستورالعمل کاری همان هفت گام خود مشتری است، با چک‌لیستی که برای او نوشته شده: الفبای کد صفر، حرف O، یک، حرف I و حرف L را ندارد، تا هیچ چیزی روی برچسب چاپی اشتباه خوانده نشود.',
    ],
    insight:
      'هر سطح اجازه دارد متوقف شود. از ۲۲ فرایند، فقط چهارده فرایند سوئیم‌لین دارند و فقط شش فرایند بلوپرینت؛ بقیه اطلاعیه‌ای دارند که می‌گوید چرا، و اطلاعیه‌ها شمارش خود را تا ۲۲ می‌بندند.',
    l1Caption:
      'سطح ۱ — فعال‌سازی گارانتی توسط مشتری به‌صورت سرتاسری: رویداد آغازگر و مالک، چهار فاز که از راست به چپ جریان دارند، دروازه‌های تصمیم، و یک KPI و SLA که هنوز هیچ منبعی تعریفشان نکرده است.',
    blueprintCaption:
      'سطح ۲ — بلوپرینت خدمت: چهار گام از خواندن برچسب تا گارانتی فعال، در امتداد خطوط تعامل، دیدپذیری و تعامل داخلی.',
    swimlaneCaption:
      'سطح ۳ — سوئیم‌لین: مشتری، سامانه و درگاه پیامک در سه مسیر، با تنها تصمیمی که کد استفاده‌شده را به رد شدن می‌فرستد.',
    procedureCaption:
      'سطوح ۴ و ۵ — رویهٔ کدهای فعال‌سازی، با مهر «تأییدنشده»، در کنار دستورالعمل کاری‌ای که برای مشتری نوشته شده است.',
  },
  findings: {
    label: 'آنچه نقشه‌ها یافتند',
    heading: 'نقشه‌ای که اجازه دارد ناقص بازگردد، ابزار پژوهش است',
    body: [
      'ترسیم عملیات به یافته‌هایی رسید که در هیچ سندی نبود. از چهارده فرایندی که به‌صورت سوئیم‌لین ترسیم شدند، فقط دو فرایند اصلاً پیامک می‌فرستند — کد ورود و فعال‌سازی گارانتی — پس پیش‌نویس متن پیامک‌ها دقیقاً به همین دو نقشه رفت. چهار فرایند در نقشهٔ کلان کارت ندارند، چون منابعی که برایشان ذکر شده وجود ندارند.',
      'هر جا سطحی را نتوان صادقانه ترسیم کرد، اطلاعیه‌ای جای آن را می‌گیرد. شش دستورالعمل کاری هنوز نوشتنی نیستند، هر یک به دلیلی مشخص: نبود سازوکار بازنشانی، نبود مسیری برای اختلاف بر سر مالکیت، نبود قالب شمارهٔ فاکتور، یک تعارض باز، نبود استاندارد عکس، و نبود سیاستی برای کالاهای مطالبه‌نشده. رویهٔ کیفیت تعمیر اصلاً شمارهٔ دستورالعمل کاری نگرفت — رزرو کردن شماره برای رویه‌ای که مجری‌اش هنوز تعیین نشده، خودش یک ادعا می‌بود.',
      'فایل خودش را هم ممیزی می‌کند. یک ماتریس پوشش، هر یک از ۲۲ فرایند را در برابر منبعش، سطوح موجود و آنچه کم است قرار می‌دهد: شش کامل، شش ناقص، یکی در تعارض، نُه نیازمند تعیین. سه شکافی را که بسته علامت خورده بودند دوباره باز می‌کند — بسته شدن با حل شدن از سوی سازمان یکی نیست — و هر جا معلوم شد منبعی آنچه را که به استناد آن ذکر شده بود نمی‌گوید، استنادهای خودش را پس می‌گیرد.',
    ],
    noticeCaption:
      'غیابی ترسیم‌شده: شش دستورالعمل کاری که هنوز نوشتنی نیستند، هر یک با سازوکار یا سیاست ناموجودی که مانعش است.',
  },
  roles: {
    label: 'نقش‌ها',
    heading: 'پاسخ‌گویی واقعیتی سازمانی است، نه فنی',
    body: [
      'هشت کارت نقش، هدف، وظایف، اختیارات انحصاری، استثناهای عامدانه و شکاف‌های هر نقش را بیان می‌کنند، و KPI و SLA روی همهٔ کارت‌ها «نیازمند تعیین» علامت خورده‌اند. برخی کارت‌ها بیشتر پرسش‌اند. یک نقش در کد وجود دارد و دسترسی دارد، اما هیچ سند کسب‌وکاری، نمودار سازمانی یا رویه‌ای آن را تعریف نمی‌کند؛ پس مسیرش خط‌چین ترسیم شده است تا کسب‌وکار تصمیم بگیرد که این نقش واقعی است یا نام دیگری برای نقشی موجود.',
      'ماتریس مسئولیت را فقط تا سه‌چهارم می‌شد استخراج کرد. مسئول اجرا، مشورت‌شونده و مطلع‌شونده از کد به دست آمدند؛ پاسخ‌گو نه، چون کد می‌گوید چه کسی می‌تواند اقدامی را اجرا کند، نه اینکه چه کسی پاسخ‌گوی نتیجهٔ آن است. ماتریس با همین ستونِ باز و نواری که این را اعلام می‌کند منتشر می‌شود، و استثناهای عامدانه — تفکیک وظایف — را قرمز علامت می‌زند تا با جای خالی اشتباه گرفته نشوند: نقشی که سقف ابطال را تعیین می‌کند نمی‌تواند ابطال‌ها را تأیید کند، چون می‌توانست سقف خودش را بالا ببرد.',
    ],
    roleCaption:
      'نقشی که فقط در کد وجود دارد: همهٔ فیلدهای کارتش «نیازمند تعیین» است، و نوار پرسش را پیش روی کسب‌وکار می‌گذارد.',
    raciCaption:
      'یازده ردیف نخست ماتریس ۲۲ فرایند. ستون اصلی خالی منتشر می‌شود، و می‌گوید چرا. نوار، شکاف و دارندهٔ تصمیم را اعلام می‌کند؛ نام در این‌جا پنهان شده است.',
  },
  decisions: {
    heading: 'شش قاعده برای ترسیم آنچه هیچ‌کس نمی‌توانست تأیید کند',
    lede: 'بیشتر این روش دربارهٔ چیزهایی است که فایل از ترسیمشان سر باز می‌زند.',
    items: [
      {
        title: 'فقط تا جایی ترسیم کن که شواهد می‌رسد',
        why: 'پنج ردهٔ شواهد، که برای هر ادعا تعیین می‌شوند نه برای هر سند، مشخص می‌کنند چه چیزی را می‌توان ترسیم کرد: کد اجرایی مجوز یک سوئیم‌لین کامل را می‌دهد، و نبود هر گونه منبع فقط مجوز یک اطلاعیه را. نمودار مدعی است که توالی، شرط‌ها، مسیرهای خطا و مرزهای مسیرها را می‌داند — ترسیم آن بدون شواهد جعلی است که فقط باورپذیرتر به نظر می‌رسد.',
        alternatives: 'ترسیم همهٔ فرایندها با عمقی یکسان، بر پایهٔ مصاحبه‌ها و نیت‌ها',
        tradeoff: 'فایل ناهموار به نظر می‌رسد: برخی فرایندها در حد یک کارت متوقف می‌شوند.',
      },
      {
        title: 'جای خالی را علامت بزن، هرگز حدسش نزن',
        why: 'هیچ اطلاعات کسب‌وکاری ساخته نشد. هر جا نام، عدد یا زمانی کم بود، در فیلد «نیازمند تعیین» آمده است — روی همهٔ KPIها، همهٔ SLAها و بیشتر تأییدکننده‌ها — تا بتوان شکاف‌ها را شمرد و به کسی سپرد.',
        alternatives: 'مقادیر جای‌نگهدار باورپذیر',
        tradeoff: 'ذی‌نفعان مقدار زیادی نارنجی می‌بینند.',
      },
      {
        title: 'تعارض‌ها را ثبت کن، حلشان نکن',
        why: 'هر جا دو منبع با هم اختلاف داشتند، فایل به‌جای انتخاب برنده، تعارض و جای آن را ثبت می‌کند. حل بی‌صدای آن، تصمیمی می‌بود که از جانب کسب‌وکار گرفته شده است.',
        alternatives: 'انتخاب منبع محتمل‌تر و ادامهٔ کار',
        tradeoff: 'تعارض‌های باز تا زمانی که کسی با اختیار لازم آن‌ها را ببندد، در دید می‌مانند.',
      },
      {
        title: 'ستون «پاسخ‌گو» را باز بگذار',
        why: 'مسئول اجرا، مشورت‌شونده و مطلع‌شونده را می‌شد از روی کد خواند؛ پاسخ‌گو را نه. پر کردن آن از روی مجوزها، کسی را که می‌تواند اقدام کند با کسی که پاسخ‌گوی نتیجه است یکی می‌گرفت.',
        alternatives: 'استنتاج پاسخ‌گویی از مجوزهای سامانه',
        tradeoff: 'مهم‌ترین ستون ماتریس خالی منتشر می‌شود.',
      },
      {
        title: 'حکم CRM برای هر فرایند، نه یک قابلیت',
        why: 'هر سوئیم‌لین حکم CRM خودش را همراه با دلیل دارد: یکی «افزوده شود، اولویت بالا» — مشتری فقط با تماس تلفنی می‌تواند درخواستی را لغو کند — چهار مشروط، و نُه بی‌نیاز.',
        alternatives: 'یکپارچه‌سازی CRM در همه‌جا',
        tradeoff: 'نقشهٔ راه یکپارچه‌سازی فهرستی از استثناهاست، نه وعدهٔ یک پلتفرم.',
      },
      {
        title: 'فارسی روی بوم، لاتین در نام فریم',
        why: 'جریان از راست به چپ است و هر برچسب دیدنی فارسی است، پس نقشه‌ها برای کسانی که عملیات را اداره می‌کنند به زبان خودشان خوانده می‌شوند؛ شناسه‌های لاتین در نام فریم‌ها جای دارند، تا هر بورد تا کد و اسناد ردیابی‌پذیر بماند.',
        alternatives: 'یک نظام شناسه برای هر دو مخاطب',
        tradeoff: 'دو لایهٔ شناسه که باید هم‌گام نگه داشته شوند.',
      },
    ],
  },
  economics: {
    label: 'اقتصاد',
    heading: 'گارانتی یک بدهی است، نه یک خدمت',
    body: [
      'عملیات باید به این پرسش هم پاسخ می‌داد که وعدهٔ اصلی‌اش چه هزینه‌ای دارد. گارانتی در روز صدورش هیچ خدمتی ارائه نمی‌دهد — فقط وعده‌ای است که اگر دستگاه در دوره‌ای معین از کار بیفتد، کسی هزینه را می‌پردازد. اینکه آیا مطالبه‌ای می‌رسد، کی، و چه هزینه‌ای دارد، همه در آن روز نامعلوم‌اند؛ پس باید از همین حالا برایش پول کنار گذاشت، وگرنه این وعده هیچ پشتوانه‌ای ندارد.',
      'ارائه این تعهد را از صدور تا بسته شدن دنبال می‌کند و نشان می‌دهد چه کسی می‌تواند آن را تأمین مالی کند — و هر پاسخ می‌گوید برند چیست: اگر خرده‌فروش هزینه را جذب کند، یک مرکز هزینه؛ اگر فروشندگان کدها را بخرند، یک کسب‌وکار مستقل؛ اگر واردکننده بپردازد، شریکی که شبکه را اداره می‌کند. توصیهٔ آن با برچسب «یک پیشنهاد، نه یک تصمیم» آمده است.',
      'ارائه با کنترل‌هایی مرتب‌شده بر اساس هزینه به پایان می‌رسد — ارزان‌ترینشان تنها یک فیلد است — و ده تصمیم با مالکان و گزینه‌هایشان، که هشت تای آن‌ها را می‌توان همین امروز و بدون هیچ عددی گرفت.',
    ],
    insight:
      'تنها اعدادی که در این ارائه مجازند، اعدادی‌اند که از کد استخراج شده‌اند، فرضی‌ای که برچسب فرضی خورده، یا بنچمارکی بیرونی همراه با منبع، جامعهٔ آماری، تاریخ و میزان اطمینانش — و هر اسلاید نشانی دارد که می‌گوید کدام.',
    promiseCaption:
      'ارائه با خود مفهوم آغاز می‌شود: گارانتی در روز صدورش سه مجهول است — اینکه آیا مطالبه‌ای می‌رسد، کی، و با چه هزینه‌ای.',
    controlsCaption:
      'پنج اهرم کنترلی، مرتب از کم‌هزینه‌ترین تا پرهزینه‌ترین، هر یک پیوسته به عاملی از معادلهٔ هزینه که آن را جابه‌جا می‌کند.',
  },
  outcomes: {
    heading: 'عملیاتی ترسیم‌شده، با شکاف‌هایی صاحب‌دار',
    intro:
      'هیچ شاخص کسب‌وکاری در کار نیست، و نباید هم باشد: محصول روی محیط آزمایشی است و شاخص‌های توافق‌شده هنوز فرمول یا منبع دادهٔ تأییدشده‌ای ندارند. آنچه این کار تغییر داد، شناخت سازمان از خودش است. در ژوئیه هیچ روایت مکتوبی از عملیات خدمات پس از فروش وجود نداشت؛ اکنون روایتی ترسیم‌شده هست که در آن هر شکاف علامت خورده، شمرده شده و به کسی سپرده شده است — و سه موردی که یکپارچه‌سازی را متوقف کرده‌اند، به‌عنوان تصمیم نام برده شده‌اند، نه کار مهندسی.',
    delivered: [
      {
        label: '۲۲ فرایند در شش سطح',
        context:
          'نقشهٔ کلان، کارت‌های سرتاسری، بلوپرینت‌های خدمت، سوئیم‌لین‌ها، رویه‌ها و دستورالعمل‌های کاری — ۱۴۵ بورد در ۱۳ صفحه.',
      },
      {
        label: 'مدل نقش‌ها و ماتریس RACI',
        context:
          'هشت کارت نقش و ماتریسی برای ۲۲ فرایند، که استثناهای عامدانه در آن علامت خورده‌اند و به باز بودن یک ستون اذعان می‌کند.',
      },
      {
        label: 'ماتریس پوششی که خودش را ممیزی می‌کند',
        context:
          'هر فرایند در برابر منبعش، سطوحش و آنچه کم دارد؛ شکاف‌های بسته دوباره باز شدند و استنادها اصلاح شدند.',
      },
      {
        label: 'مدل اقتصاد گارانتی',
        context: 'بدهی، تأمین مالی و کنترل‌ها، بی‌آنکه حتی یک عدد ساختگی در آن باشد.',
      },
    ],
    shipped: [
      'ممیزی آمادگی',
      'نقشهٔ کلان فرایندها',
      'بلوپرینت‌های خدمت',
      'سوئیم‌لین‌ها و رویه‌ها',
      'نقش‌ها و ماتریس RACI',
      'ارائهٔ اقتصاد گارانتی',
    ],
  },
  lessons: {
    heading: 'یک انضباط، در هر بورد',
    items: [
      {
        title: 'انتشار شکاف بهتر از پوشاندن آن است',
        body: 'همین غریزه در همهٔ خروجی‌ها جریان دارد: NOT_READY به‌جای یک درصد، «نیازمند تعیین» روی کارت‌های فرایند، ستون خالی «پاسخ‌گو» با نواری که همین را می‌گوید، و نشان شواهد روی هر اسلاید.',
      },
      {
        title: 'نقشه‌ای که اجازه دارد ناقص بازگردد، ابزار پژوهش است',
        body: 'ترسیم آنچه هیچ‌کس نمی‌توانست توصیف کند به یافته‌هایی رسید که در هیچ سندی نبود: کدام فرایندها واقعاً به مشتری پیام می‌دهند، کدام نقش‌ها فقط در کد وجود دارند، کدام ستون را نمی‌توان از روی مجوزها پر کرد. نقشه‌ای که باید تمام‌شده به نظر برسد، تزئین است.',
      },
      {
        title: 'امتیاز آمادگی تا دامنه صادقانه نباشد معنایی ندارد',
        body: 'ممیزی نخست رد شد چون عملیاتی را می‌سنجید که این محصول مالکش نیست. محدود کردن آن به فرایندهایی که برند مالکشان است، استاندارد را پایین نیاورد — اطمینان شواهد را به ۹۲٪ رساند.',
      },
      {
        title: 'هر نظر بازبینی را به یک قاعده تبدیل کن',
        body: 'پاسخ دادن به یک نظر، یک نود را اصلاح می‌کند؛ نام‌گذاری قاعدهٔ پشت آن، همهٔ نودهای آینده را. یک یادداشت دربارهٔ املای فارسی به قاعده‌ای نام‌دار تبدیل شد و به یک دور اصلاح یکجا روی ۱٬۰۸۸ نود متنی در هر سیزده صفحه انجامید.',
      },
    ],
  },
}

const AR: YarCopy = {
  statement:
    'تشغيلٌ لخدمات ما بعد البيع لم يدوّنه أحد، رُسم من الخريطة الكلية إلى تعليمات العمل — لا أبعد مما سمحت به الأدلة.',
  industry: 'التجزئة · خدمات ما بعد البيع والضمان',
  team: 'مصمم الخدمات الرئيسي ومهندس العمليات، مع مسؤولَي الأعمال وخدمات ما بعد البيع لدى العميل وفريق الهندسة لديه',
  heroCaption:
    'خريطة العمليات الكلية: ثماني عشرة عملية في خمسة مسارات، لكل بطاقة مالك ومُخرَج وشارة حالة.',
  snapshot: {
    problem:
      'لم يُدوَّن قط تشغيل خدمات ما بعد البيع الذي تقوم عليه العلامة، والوثائق المستشهد بها له لم تكن موجودة في أي مكان.',
    role: 'مصمم الخدمات الرئيسي ومهندس العمليات: تدقيق الجاهزية، وهندسة عمليات من 145 لوحة، ونموذج الأدوار، واقتصاديات الضمان.',
    result:
      'أول توصيف مرسوم للتشغيل، وكل فجوة فيه موسومة ولها مالك بدلًا من أن تُملأ. لا مؤشرات أعمال بعد.',
  },
  alt: {
    cover:
      'ياراوان — مخطط الخدمة التفصيلي لتفعيل الضمان بالفارسية: إجراءات العميل، ونقاط الاتصال، وخطّا التفاعل والرؤية',
    map: 'ياراوان — خريطة العمليات الكلية بالفارسية: ثماني عشرة بطاقة عملية في خمسة مسارات، لكلٍّ منها شارة حالة، وإشعار يُكمل الحصيلة',
    library:
      'ياراوان — مكتبة مكوّنات المخططات: سبعة أشكال للتدفق، وشارة حالة بأربع حالات، وترويسات المسارات، وشرائط التنقل التسلسلي، وبطاقات العمليات',
    l1: 'ياراوان — بطاقة تفعيل ضمان العميل من البداية إلى النهاية بالفارسية: المُحفِّز، والمالك، والمراحل، وبوابات القرار، والمدخلات والمخرجات، والضوابط، ومؤشر KPI ومستوى خدمة SLA موسومان بأنهما يحتاجان إلى تحديد',
    blueprint:
      'ياراوان — مخطط الخدمة التفصيلي لتفعيل ضمان العميل بالفارسية: أربع خطوات عبر طبقات تمتد من إجراءات العميل إلى الأدلة، تفصل بينها خطوط التفاعل والرؤية والتفاعل الداخلي',
    swimlane:
      'ياراوان — مخطط المسارات لتفعيل ضمان العميل بالفارسية: مسارات العميل والنظام والرسائل النصية، وقرار واحد وحالتان للنهاية',
    sop: 'ياراوان — بطاقة تعريف إجراء رموز التفعيل بالفارسية: مسودة الإصدار 0.3، والمعتمِد وتاريخ المراجعة بحاجة إلى تحديد، والحالة «غير معتمد»',
    wi: 'ياراوان — تعليمات العمل لتفعيل رمز الضمان بالفارسية: التعريف، والشروط المسبقة، والمسار داخل اللوحة، وسبع خطوات مرقّمة',
    notice:
      'ياراوان — لوحة إشعارات بالفارسية تسمّي تعليمات العمل التي لا يمكن كتابتها بعد، وسبب كلٍّ منها',
    role: 'ياراوان — بطاقة دور عمليات الضمان بالفارسية: شريط أحمر يقول إن الدور موجود في الشيفرة لكنه غير موجود في أي وثيقة أعمال، وكل حقل موسوم بأنه يحتاج إلى تحديد',
    raci: 'ياراوان — مصفوفة RACI بالفارسية، مع شريط أحمر يشير إلى أن عمود المساءلة لا يزال مفتوحًا، وخلايا حمراء للاستثناءات المتعمَّدة',
    promise:
      'ياراوان — اقتصاديات الضمان، شريحة بالفارسية: الضمان وعدٌ ينطوي لحظة إصداره على ثلاثة مجاهيل — هل يُستحق، ومتى، وبكم',
    controls:
      'ياراوان — اقتصاديات الضمان: خمس روافع للتحكم بالفارسية، مرتّبة من الأرخص إلى الأعلى كلفة، مع حالة كلٍّ منها اليوم',
  },
  context: {
    heading: 'هوية خاملة، وتشغيل غير موثَّق',
    body: [
      'ياراوان هي علامة الضمان وخدمات ما بعد البيع التابعة لشركة إيرانية لبيع الهواتف المحمولة بالتجزئة. كتبت وكالة خارجية هويتها التجارية في عام 2024، ثم لم يُبنَ عليها شيء. ومنذ يوليو 2026 كانت المهمة تحويلها إلى خدمة تعمل: موقع عام، ولوحة للعملاء، ولوحة للموظفين — وتحتها التشغيل الذي سيتعيّن عليه الوفاء بوعود العلامة.',
      'يحتفظ نظام الدعم القائم بطابور التذاكر وعمليات الإصلاح. أما في العمليات التي تملكها ياراوان، فالعلاقة معكوسة: ياراوان هي المرجع التشغيلي، ونظام الدعم يسجّل العملية ولا يديرها. تتناول دراسة الحالة هذه ذلك التشغيل؛ أما المنتج المبني فوقه فله دراسة حالة مستقلة.',
    ],
  },
  problem: {
    heading: 'تصميمٌ للحالة المنشودة، لا سجلٌّ للحالة الراهنة',
    body: [
      'لم يُدوَّن التشغيل قط. فقد استشهدت وثيقة المتطلبات والمواصفات الوظيفية كلتاهما بوثيقتين مصدريتين — وثيقة متطلبات لخدمات ما بعد البيع وتقرير عن عمليات CRM — بوصفهما أصل العمليات الفعلية للتذاكر والإصلاح والضمان. ولم تكن أيٌّ منهما موجودة في أي مستودع.',
      'ولذلك كان على كل خريطة عمليات أن تكون تصميمًا للحالة المنشودة، لا سجلًا للحالة القائمة، وتحمل مجموعة العمليات هذا التحذير على صفحتها الأولى. وفي الأثناء كانت وعود العلامة المعلنة قد تجاوزت التشغيل بالفعل: فقد وجد عمل المتطلبات أن الادعاءات الرئيسية للموقع القديم لم تكن حقيقة تشغيلية، وأنه لم تكن هناك قاعدة بيانات حقيقية للضمانات.',
      'وهذا ما حدّد سؤال التصميم للتشغيل: كيف ترسم عمليةً لا يستطيع أحد بعدُ تأكيدها، دون أن تختلقها؟',
    ],
  },
  audit: {
    text: '«لا يُستبدَل NOT_READY بأي نسبة مئوية إيجابية أو سرد متفائل.»',
    attribution: 'تدقيق جاهزية المدخلات، الجولة الأولى',
    method: 'قاعدة كُتبت في التدقيق قبل تشغيله',
  },
  ownership: {
    heading: 'قيادة العمل، مع فريق العميل',
    intro:
      'قُدتُ تصميم الخدمة — تدقيق الجاهزية، وهندسة العمليات، ونموذج الأدوار، واقتصاديات الضمان. وبقيت ملكية الأعمال لدى العميل: فمسؤول الأعمال لديه امتلك القرارات التجارية، ومسؤول خدمات ما بعد البيع امتلك عمليات الدعم وراجع الخرائط.',
    own: [
      'المتطلبات والنطاق',
      'تدقيق جاهزية المدخلات',
      'هندسة العمليات، من الخريطة الكلية إلى تعليمات العمل',
      'الأدوار والمسؤوليات ومصفوفة RACI',
      'اقتصاديات الضمان',
    ],
    coOwn: ['بناء المنصة الذي قُرئت منه الخرائط، مع فريق الهندسة لدى العميل'],
    collaborate: [
      'القرارات التجارية (مسؤول الأعمال)',
      'عمليات الدعم وملاحظات المراجعة عليها (مسؤول خدمات ما بعد البيع)',
    ],
    note: 'بُني الملف بمساعدة الذكاء الاصطناعي: فقد طبّق إصلاحاتِ المراجعة وكيلٌ يعمل عبر تكامل Figma، وسُجِّلت سلسلةَ تعليقاتٍ تلو أخرى. وكُتبت أولًا قواعد الرسم ودرجات الأدلة التي كان عليه الالتزام بها.',
  },
  approach: {
    heading: 'بوابات لا مُخرَجات',
    body: [
      'انتهت كل مرحلة ببوابة لا بوثيقة. جاءت المتطلبات من خمسين سؤالًا مباشرًا متعدد الخيارات وُجِّهت إلى مسؤول الأعمال، ومن مراجعة لوثائق العلامة والوثائق المصدرية، ومن مقارنة مرجعية مع تسعة منافسين، في مواجهة معيار نجاح واحد: أن يستطيع فريق الهندسة البدء دون أن يعيد طرح أي سؤال أساسي.',
      'ثم أُجري تدقيق للجاهزية — وأخفق. فعبر 59 مصدرًا و31 عملية أعاد النتيجة NOT_READY، مع 12 عائقًا، و4 تعارضات غير محسومة، وأدوار موزعة على ثلاثة تصنيفات غير متّسقة. ولم تجادل الجولة الثانية في الحكم؛ بل قلّصت النطاق إلى العمليات الـ13 التي تملكها العلامة فعلًا، ثم وسّعه تعديل لاحق إلى 22، بإضافة الاستلام والتشخيص والإصلاح وإعادة التسليم وقطع الغيار.',
    ],
    insight:
      'رفع تقليص النطاق الجاهزية البنيوية من 49% إلى 78%، والثقة بالأدلة من 58% إلى 92% — لأن العمليات التي بقيت ضمن النطاق أمكن قراءتها من شيفرة قابلة للتنفيذ واختبارات ناجحة.',
    processHeading: 'ست بوابات، بالترتيب',
    steps: [
      {
        label: 'المتطلبات',
        note: 'خمسون سؤالًا لمسؤول الأعمال؛ ومقارنة مرجعية مع تسعة منافسين',
      },
      {
        label: 'تدقيق الجاهزية',
        note: 'NOT_READY: 12 عائقًا، و4 تعارضات، وأدوار في ثلاثة تصنيفات',
      },
      {
        label: 'تقليص النطاق',
        note: 'العمليات التي تملكها العلامة فقط؛ وأُعيد التدقيق على هذا النطاق',
      },
      {
        label: 'قواعد الرسم',
        note: 'مكتبة مكوّنات، وست قواعد داخلية، وخمس درجات للأدلة',
      },
      {
        label: 'هندسة العمليات',
        note: '22 عملية، من الخريطة الكلية إلى تعليمات العمل',
      },
      {
        label: 'الاقتصاديات',
        note: 'كلفة وعد الضمان، ومن يمكن أن يدفعها',
      },
    ],
  },
  research: {
    heading: 'ارسم القواعد قبل المخططات',
    body: [
      'لا يحتوي ملف Figma على أي شاشات: فقد حُدِّدت الواجهة كتابةً، وذهب الجهد التصميمي إلى الجزء الذي لم يستطع أحد وصفه — التشغيل. وصفحته الأولى ليست غلافًا بل صفحة قواعد: مكتبة مكوّنات من أربعة عشر جزءًا وست قواعد داخلية. يسير التدفق من اليمين إلى اليسار، كما تسير اللغة. وتُوسَم الفراغات بعبارة «يحتاج إلى تحديد»، ولا تُملأ أبدًا باسم أو رقم مُخمَّن. وتُسجَّل التعارضات ولا تُحسَم. ولا يحمل اللون معنى وحده أبدًا؛ بل يرافقه دائمًا شكل وأيقونة.',
      'قاعدة واحدة تحدّد شكل الملف كله: ما يجوز رسمه يتوقف على الأدلة التي تسنده، ادعاءً بادعاء. تمتد خمس درجات للأدلة من الشيفرة القابلة للتنفيذ، التي تُجيز مخطط مسارات كاملًا، نزولًا إلى انعدام أي مصدر، حيث يُحظر الرسم ولا يجوز أن يظهر إلا إشعار. وكلما انخفضت الدرجة، قلّ ما يجوز رسمه.',
      'وهكذا يكون الملف صادقًا بشأن ما يغيب عنه. فحيث يتوقف مستوى قبل اكتماله، تسمّي لوحة إشعارات ما هو مفقود ولماذا، وتُكمل إشعارات خريطة الخدمة ومخططات المسارات حسابها ليعود المجموع إلى 22. فمخطط لتسلسل غير موثَّق سيكون الاختلاق نفسه الذي تحظره القواعد — لكنه أكثر إقناعًا.',
    ],
    libraryCaption:
      'الصفحة 00: المكتبة التي يُبنى منها كل مخطط — سبعة أشكال للتدفق، وشارة حالة بأربع حالات، والعناصر التي تجعل الخريطة قابلة للتنقل.',
  },
  levels: {
    label: 'ستة مستويات',
    heading: 'عملية واحدة، متتبَّعة حتى أعمق مستوى',
    body: [
      'تتألف هندسة العمليات من ستة مستويات، يجيب كلٌّ منها عن سؤال مختلف. وتفعيل ضمان العميل من العمليات القليلة المرسومة على كل مستوى منها، ولذلك يُظهر الطبقات كلها. فعلى الخريطة الكلية هو بطاقة واحدة لها مالك ومُخرَج وحالة. وفي المستوى 1 يصبح بطاقة من البداية إلى النهاية: المُحفِّز، والمالك، وحدثا البدء والانتهاء، وأربع مراحل، وبوابات القرار، وما تتلقاه العملية وما تسلّمه، والضوابط التي تفرضها الشيفرة — ومؤشر KPI ومستوى خدمة SLA موسومان بعبارة «يحتاج إلى تحديد»، لأنه لا توجد في أي مصدر معادلة معتمدة أو مدة زمنية معتمدة.',
      'المستوى 2 مخطط خدمة تفصيلي: إجراءات العميل، ونقاط الاتصال، وما يفعله الموظفون والأنظمة على جانبي خطوط التفاعل والرؤية والتفاعل الداخلي، وصولًا إلى السجلات والضوابط التي تخلّفها كل خطوة. وهنا يُظهر المخطط أن الملصق المطبوع الذي يبدأ منه العميل نقطة اتصال لا يتحكم فيها النظام — فالطباعة تجري خارجه. ويحوّل المستوى 3 التسلسل نفسه إلى مخطط مسارات، لكل فاعل فيه مسار.',
      'أما المستويان 4 و5 فهما لمن يديرون العملية. يغطي الإجراء أربع عمليات دفعة واحدة — فالإجراءات والعمليات ليست متقابلة واحدًا لواحد — ويحمل ختم «غير معتمد»، مع ترك المعتمِد وتاريخ المراجعة على «يحتاج إلى تحديد». وتعليمات العمل هي خطوات العميل السبع نفسه، مع قائمة تحقق مكتوبة له: لا تحتوي أبجدية الرمز على الصفر ولا الحرف O ولا الواحد ولا الحرفين I وL، فلا يمكن أن يُقرأ أي شيء على الملصق المطبوع خطأً.',
    ],
    insight:
      'يُسمح لكل مستوى بأن يتوقف. فأربع عشرة فقط من العمليات الـ22 لها مخطط مسارات، وست فقط لها مخطط خدمة تفصيلي؛ أما البقية فلها إشعار يقول السبب، وتُكمل الإشعارات حسابها ليعود المجموع إلى 22.',
    l1Caption:
      'المستوى 1 — تفعيل ضمان العميل من البداية إلى النهاية: المُحفِّز والمالك، وأربع مراحل تتدفق من اليمين إلى اليسار، وبوابات القرار، ومؤشر KPI ومستوى خدمة SLA لم يحدّدهما أي مصدر بعد.',
    blueprintCaption:
      'المستوى 2 — مخطط الخدمة التفصيلي: أربع خطوات من قراءة الملصق إلى ضمان مفعَّل، عبر خطوط التفاعل والرؤية والتفاعل الداخلي.',
    swimlaneCaption:
      'المستوى 3 — مخطط المسارات: العميل والنظام وبوابة الرسائل النصية في ثلاثة مسارات، مع القرار الوحيد الذي يحيل رمزًا مستخدَمًا إلى الرفض.',
    procedureCaption:
      'المستويان 4 و5 — إجراء رموز التفعيل، بختم «غير معتمد»، إلى جانب تعليمات العمل المكتوبة للعميل.',
  },
  findings: {
    label: 'ما وجدته الخرائط',
    heading: 'الخريطة التي قد تعود ناقصة أداةُ بحث',
    body: [
      'أنتج رسم التشغيل نتائج لم تتضمنها أي وثيقة. فمن بين العمليات الأربع عشرة المرسومة مخططاتِ مسارات، لا ترسل رسالة نصية سوى اثنتين — رمز تسجيل الدخول وتفعيل الضمان — ولذلك دخلت مسودة نصوص الرسائل في هاتين الخريطتين تحديدًا. وأربع عمليات على الخريطة الكلية ليست لها بطاقة، لأن المصادر المستشهد بها لها غير موجودة.',
      'وحيث لا يمكن رسم مستوى بصدق، يحلّ محلّه إشعار. فست تعليمات عمل لا يمكن كتابتها بعد، ولكلٍّ منها سبب مسمّى: لا آلية لإعادة الضبط، ولا مسار لنزاعات الملكية، ولا صيغة لأرقام الفواتير، وتعارض مفتوح، ولا معيار للصور، ولا سياسة للبضائع التي لم يُطالَب بها. ولم يحصل إجراء جودة الإصلاح على رقم لتعليمات العمل أصلًا — فحجز رقم لإجراء لا يزال منفِّذه مفتوحًا سيكون هو نفسه ادعاءً.',
      'ويدقّق الملف نفسه أيضًا. فمصفوفة تغطية تضع كل عملية من العمليات الـ22 في مقابل مصدرها، والمستويات الموجودة، وما هو مفقود: ست مكتملة، وست غير مكتملة، وواحدة في تعارض، وتسع تحتاج إلى تحديد. وهي تعيد فتح ثلاث فجوات كانت موسومة بأنها مغلقة — فالإغلاق ليس هو الحسم من قِبل المؤسسة — وتسحب استشهاداتها هي حيث تبيّن أن مصدرًا لا يقول ما استُشهد به من أجله.',
    ],
    noticeCaption:
      'غيابٌ مرسوم: ست تعليمات عمل لا يمكن كتابتها بعد، ومع كلٍّ منها الآلية أو السياسة المفقودة التي تعوقها.',
  },
  roles: {
    label: 'الأدوار',
    heading: 'المساءلة حقيقة تنظيمية، لا تقنية',
    body: [
      'تعرض ثماني بطاقات أدوار غاية كل دور، ومهامه، وصلاحياته الحصرية، واستثناءاته المتعمَّدة، وفجواته، مع وسم مؤشر KPI ومستوى الخدمة SLA بعبارة «يحتاج إلى تحديد» على كل بطاقة. وبعض البطاقات أسئلة في معظمها. فأحد الأدوار موجود في الشيفرة وله صلاحيات وصول، لكن لا وثيقة أعمال ولا هيكل تنظيمي ولا إجراء يعرّفه، ولذلك يُرسم مساره بخط متقطع إلى أن يقرر الجانب التجاري هل هو دور حقيقي أم اسم آخر لدور قائم.',
      'لم يكن ممكنًا استخلاص مصفوفة المسؤوليات إلا بمقدار ثلاثة أرباعها. فقد خرجت أدوار المنفِّذ والمستشار والمُطَّلِع من الشيفرة؛ أما المساءلة فلم تخرج، لأن الشيفرة تقول من يستطيع تنفيذ إجراء، لا من يُسأل عن نتيجته. وتُعرض المصفوفة بهذا العمود مفتوحًا مع شريط يقول ذلك، وتُعلِّم الاستثناءات المتعمَّدة — الفصل بين المهام — باللون الأحمر كي لا تُحسَب فجوات: فالدور الذي يحدّد سقف الإلغاء لا يستطيع الموافقة على الإلغاءات، لأنه قد يرفع سقفه بنفسه.',
    ],
    roleCaption:
      'دورٌ لا وجود له إلا في الشيفرة: كل حقل في بطاقته يقول «يحتاج إلى تحديد»، والشريط يطرح السؤال على الجانب التجاري.',
    raciCaption:
      'الصفوف الأحد عشر الأولى من مصفوفة العمليات الـ22. يُنشر العمود الرئيسي فارغًا، ويقول السبب. يذكر الشريط الفجوة ومن يملك القرار؛ والاسم مخفيّ هنا.',
  },
  decisions: {
    heading: 'ست قواعد لرسم ما لم يستطع أحد تأكيده',
    lede: 'يدور معظم المنهج حول ما يرفض الملف رسمه.',
    items: [
      {
        title: 'لا ترسم أبعد مما تبلغه الأدلة',
        why: 'تحدّد خمس درجات للأدلة، تُضبط لكل ادعاء لا لكل وثيقة، ما يجوز رسمه: الشيفرة القابلة للتنفيذ تُجيز مخطط مسارات كاملًا، وانعدام أي مصدر لا يُجيز إلا إشعارًا. فالمخطط يدّعي معرفة التسلسل والشروط ومسارات الخطأ وحدود المسارات — ورسمه دون أدلة اختلاقٌ كل ما في الأمر أنه يبدو أكثر إقناعًا.',
        alternatives: 'رسم كل عملية بالعمق نفسه استنادًا إلى المقابلات والنوايا',
        tradeoff: 'يبدو الملف غير متوازن: بعض العمليات تتوقف عند بطاقة.',
      },
      {
        title: 'علِّم الفراغات، ولا تخمّنها أبدًا',
        why: 'لم تُختلَق أي معلومة من معلومات الأعمال. فحيث غاب اسم أو رقم أو مدة، يقول الحقل «يحتاج إلى تحديد» — في كل مؤشر KPI، وكل SLA، ومعظم المعتمِدين — كي يمكن عدّ الفجوات وإسنادها.',
        alternatives: 'قيم نائبة معقولة',
        tradeoff: 'يرى أصحاب المصلحة قدرًا كبيرًا من اللون البرتقالي.',
      },
      {
        title: 'سجِّل التعارضات، ولا تحسمها',
        why: 'حيث اختلف مصدران، يسجّل الملف التعارض وموضعه بدلًا من ترجيح أحدهما. فالحسم الصامت كان سيصبح قرارًا يُتَّخذ نيابةً عن الجانب التجاري.',
        alternatives: 'اختيار المصدر الأرجح والمضي قدمًا',
        tradeoff: 'تبقى التعارضات المفتوحة ظاهرة إلى أن يغلقها صاحب صلاحية.',
      },
      {
        title: 'اترك عمود المساءلة مفتوحًا',
        why: 'أمكن قراءة أدوار المنفِّذ والمستشار والمُطَّلِع من الشيفرة؛ أما المساءلة فلا. وملء هذا العمود من الصلاحيات كان سيخلط بين من يستطيع التصرف ومن يُسأل عن النتيجة.',
        alternatives: 'استنتاج المساءلة من صلاحيات النظام',
        tradeoff: 'يُنشر أهم عمود في المصفوفة فارغًا.',
      },
      {
        title: 'نظام CRM حكمٌ لكل عملية على حدة، لا ميزة',
        why: 'يحمل كل مخطط مسارات حكمه الخاص بشأن CRM مع سببه: واحد «يُضاف، أولوية عالية» — فالعميل لا يستطيع إلغاء طلب إلا بالاتصال هاتفيًا — وأربعة مشروطة، وتسعة غير لازمة.',
        alternatives: 'تكامل CRM في كل مكان',
        tradeoff: 'خارطة طريق التكامل قائمة استثناءات، لا وعدٌ على مستوى المنصة.',
      },
      {
        title: 'الفارسية على مساحة الرسم، واللاتينية في اسم الإطار',
        why: 'يسير التدفق من اليمين إلى اليسار وكل تسمية ظاهرة بالفارسية، فتُقرأ الخرائط بلغتهم الأم لدى من يديرون التشغيل؛ أما المعرّفات اللاتينية فتقيم في أسماء الإطارات، فتبقى كل لوحة قابلة للتتبّع إلى الشيفرة والوثائق.',
        alternatives: 'نظام معرّفات واحد للجمهورين',
        tradeoff: 'طبقتان من المعرّفات يجب إبقاؤهما متوافقتين.',
      },
    ],
  },
  economics: {
    label: 'الاقتصاديات',
    heading: 'الضمان التزامٌ مالي، لا خدمة',
    body: [
      'وكان على التشغيل أيضًا أن يجيب عن كلفة وعده المركزي. فالضمان لا يقدّم أي خدمة يوم إصداره — بل مجرد وعد بأنه إذا تعطّل الجهاز خلال مدة معيّنة، فسيدفع أحدٌ ما. وهل ستأتي مطالبة، ومتى، وكم ستكلّف، كلها مجهولة في ذلك اليوم، ولذلك يجب أن يُجنَّب له مال الآن، وإلا فلا شيء يسند الوعد.',
      'وتتتبّع وثيقة العرض الالتزامَ من الإصدار إلى الإغلاق، وتعرض من يمكن أن يموّله — وكل إجابة تقول ما هي العلامة: إذا تحمّل تاجر التجزئة الكلفة، فهي مركز تكلفة؛ وإذا اشترى البائعون الرموز، فهي نشاط تجاري مستقل؛ وإذا دفع المستورد، فهي شريك يدير الشبكة. والتوصية موسومة بعبارة «مقترح، لا قرار».',
      'وتنتهي بضوابط مرتّبة بحسب الكلفة — أرخصها حقل واحد — وعشرة قرارات لها مالكون وخيارات، ثمانية منها يمكن اتخاذها اليوم دون أي رقم على الإطلاق.',
    ],
    insight:
      'الأرقام الوحيدة المسموح بها في الوثيقة هي تلك المستخرجة من الشيفرة، أو فرضية موسومة بأنها فرضية، أو معيار مرجعي خارجي مع مصدره ومجتمعه وتاريخه ودرجة الثقة به — وتحمل كل شريحة شارة تقول أيّها.',
    promiseCaption:
      'تفتتح وثيقة العرض بالمفهوم: الضمان يوم إصداره ثلاثة مجاهيل — هل تأتي مطالبة، ومتى، وبأي كلفة.',
    controlsCaption:
      'خمس روافع للتحكم، مرتّبة من الأرخص إلى الأعلى كلفة، كلٌّ منها مرتبط بعامل معادلة الكلفة الذي يحرّكه.',
  },
  outcomes: {
    heading: 'تشغيلٌ مرسوم، ولكل فجوة فيه مالك',
    intro:
      'لا توجد مؤشرات أعمال، ولا ينبغي أن توجد: فالمنتج في بيئة ما قبل الإنتاج، والمقاييس المتفق عليها ليس لها بعد معادلة معتمدة أو مصدر بيانات. ما غيّره العمل هو ما تعرفه المؤسسة عن نفسها. ففي يوليو لم يكن هناك توصيف مكتوب لتشغيل خدمات ما بعد البيع؛ أما الآن فهناك توصيف مرسوم، وكل فجوة فيه موسومة ومعدودة ومُسندة — والعناصر الثلاثة التي تعوق التكامل مسمّاة بوصفها قرارات، لا أعمالًا هندسية.',
    delivered: [
      {
        label: '22 عملية على ستة مستويات',
        context:
          'خريطة كلية، وبطاقات من البداية إلى النهاية، ومخططات خدمة تفصيلية، ومخططات مسارات، وإجراءات، وتعليمات عمل — 145 لوحة في 13 صفحة.',
      },
      {
        label: 'نموذج أدوار ومصفوفة RACI',
        context:
          'ثماني بطاقات أدوار ومصفوفة للعمليات الـ22، مع وسم الاستثناءات المتعمَّدة والإقرار بالعمود المفتوح.',
      },
      {
        label: 'مصفوفة تغطية تدقّق نفسها',
        context:
          'كل عملية في مقابل مصدرها ومستوياتها وما ينقصها؛ مع إعادة فتح فجوات مغلقة وتصحيح الاستشهادات.',
      },
      {
        label: 'نموذج لاقتصاديات الضمان',
        context: 'الالتزام والتمويل والضوابط، معروضة دون رقم مختلَق واحد.',
      },
    ],
    shipped: [
      'تدقيق الجاهزية',
      'خريطة العمليات الكلية',
      'مخططات الخدمة التفصيلية',
      'مخططات المسارات والإجراءات',
      'الأدوار ومصفوفة RACI',
      'وثيقة اقتصاديات الضمان',
    ],
  },
  lessons: {
    heading: 'انضباط واحد في كل لوحة',
    items: [
      {
        title: 'إعلان الفجوة خير من التستّر عليها',
        body: 'الغريزة نفسها تسري في كل ناتج: NOT_READY بدلًا من نسبة مئوية، و«يحتاج إلى تحديد» على بطاقات العمليات، وعمود مساءلة فارغ مع شريط يقول ذلك، وشارة أدلة على كل شريحة.',
      },
      {
        title: 'الخريطة التي قد تعود ناقصة أداةُ بحث',
        body: 'رسمُ ما لم يستطع أحد وصفه أنتج نتائج لم تتضمنها أي وثيقة: أي العمليات تراسل العميل فعلًا، وأي الأدوار لا وجود لها إلا في الشيفرة، وأي عمود لا يمكن ملؤه من الصلاحيات. أما الخريطة التي يجب أن تبدو مكتملة فزينة.',
      },
      {
        title: 'لا معنى لدرجة الجاهزية ما لم يكن النطاق صادقًا',
        body: 'أخفق التدقيق الأول لأنه قاس تشغيلًا لا يملكه هذا المنتج. وحصره في العمليات التي تملكها العلامة لم يخفض المعيار — بل رفع الثقة بالأدلة إلى 92%.',
      },
      {
        title: 'حوِّل كل تعليق مراجعة إلى قاعدة',
        body: 'الرد على تعليق يصلح عقدة واحدة؛ وتسمية القاعدة الكامنة وراءه تصلح كل عقدة مقبلة. فقد تحوّلت ملاحظة واحدة عن الإملاء الفارسي إلى قاعدة مسمّاة وإلى مرور واحد على 1,088 عقدة نصية في الصفحات الثلاث عشرة كلها.',
      },
    ],
  },
}

const ES: YarCopy = {
  statement:
    'Una operación de posventa que nadie había puesto por escrito, dibujada del mapa macro a la instrucción de trabajo — solo hasta donde lo permitía la evidencia.',
  industry: 'Retail · posventa y garantías',
  team: 'Diseñador principal de servicios y arquitecto de procesos, con los responsables de negocio y de posventa del cliente y su equipo de ingeniería',
  heroCaption:
    'El mapa macro de procesos: dieciocho procesos en cinco carriles, cada tarjeta con un responsable, un resultado y una insignia de estado.',
  snapshot: {
    problem:
      'La operación de posventa detrás de la marca nunca se había puesto por escrito, y los documentos citados para ella no existían en ninguna parte.',
    role: 'Diseñador principal de servicios y arquitecto de procesos: la auditoría de preparación, una arquitectura de procesos de 145 tableros, el modelo de roles y la economía de la garantía.',
    result:
      'La primera descripción dibujada de la operación, con cada hueco marcado y con responsable en lugar de rellenado. Aún no hay métricas de negocio.',
  },
  alt: {
    cover:
      'Yaravan — el blueprint de servicio de la activación de la garantía, en persa: acciones del cliente, puntos de contacto y las líneas de interacción y de visibilidad',
    map: 'Yaravan — el mapa macro de procesos en persa: dieciocho tarjetas de proceso en cinco carriles, cada una con una insignia de estado, y un aviso que cierra el recuento',
    library:
      'Yaravan — la biblioteca de componentes de diagramas: siete formas de flujo, una insignia de estado de cuatro estados, cabeceras de carril, migas de pan y tarjetas de proceso',
    l1: 'Yaravan — la tarjeta de extremo a extremo de la activación de la garantía por el cliente, en persa: disparador, responsable, fases, puertas de decisión, entradas y salidas, controles, y un KPI y un SLA marcados como por determinar',
    blueprint:
      'Yaravan — el blueprint de servicio de la activación de la garantía por el cliente, en persa: cuatro pasos a través de capas que van de las acciones del cliente a la evidencia, divididas por las líneas de interacción, de visibilidad y de interacción interna',
    swimlane:
      'Yaravan — el diagrama de carriles de la activación de la garantía por el cliente, en persa: carriles de cliente, sistema y SMS, una decisión y dos estados finales',
    sop: 'Yaravan — la ficha de identidad del procedimiento de códigos de activación, en persa: borrador de la versión 0.3, aprobador y fecha de revisión por determinar, y el estado «no aprobado»',
    wi: 'Yaravan — la instrucción de trabajo para activar un código de garantía, en persa: identificación, condiciones previas, la ruta en el panel y siete pasos numerados',
    notice:
      'Yaravan — un tablón de avisos en persa que nombra las instrucciones de trabajo que aún no pueden redactarse, y el motivo de cada una',
    role: 'Yaravan — la tarjeta de rol de operaciones de garantía, en persa: un banner rojo que indica que el rol existe en el código pero en ningún documento de negocio, y todos los campos marcados como por determinar',
    raci: 'Yaravan — la matriz RACI en persa, con un banner rojo que marca como abierta la columna de Aprobador y celdas rojas para las exclusiones deliberadas',
    promise:
      'Yaravan, economía de la garantía — una diapositiva en persa: una garantía es una promesa, con tres incógnitas en el momento de su emisión — si, cuándo y cuánto',
    controls:
      'Yaravan, economía de la garantía — cinco palancas de control en persa, ordenadas de la más barata a la más costosa, cada una con su estado actual',
  },
  context: {
    heading: 'Una identidad dormida, una operación sin documentar',
    body: [
      'Yaravan es la marca de garantías y posventa de un minorista iraní de teléfonos móviles. Una agencia externa redactó su identidad de marca en 2024, y después no se construyó nada sobre ella. Desde julio de 2026, el encargo fue convertirla en un servicio en funcionamiento: un sitio web público, un panel de clientes y un panel del personal — y, por debajo de ellos, la operación que tendría que cumplir las promesas de la marca.',
      'El sistema de soporte existente conserva la cola de tickets y la operación de reparación. En los procesos que son de Yaravan, la relación es la inversa: Yaravan es la referencia operativa, y el sistema de soporte registra el proceso en lugar de ejecutarlo. Este caso de estudio trata de esa operación; el producto construido sobre ella tiene su propio caso de estudio.',
    ],
  },
  problem: {
    heading: 'Un diseño del estado deseado, no un registro del actual',
    body: [
      'La operación nunca se había puesto por escrito. Tanto los requisitos como la especificación funcional citaban dos documentos de origen — un documento de requisitos de posventa y un informe de procesos de CRM — como fuente de los procesos reales de tickets, reparación y garantía. Ninguno de los dos existía en ningún repositorio.',
      'Así que cada mapa de procesos tendría que ser un diseño del estado deseado, no un registro del existente, y el conjunto de procesos lleva esa advertencia en su portada. Mientras tanto, las promesas públicas de la marca ya iban por delante de la operación: el trabajo de requisitos descubrió que las afirmaciones principales del sitio anterior no reflejaban la realidad operativa y que no existía una base de datos real de garantías.',
      'Eso planteó la pregunta de diseño para la operación: ¿cómo se dibuja un proceso que nadie puede confirmar todavía, sin inventarlo?',
    ],
  },
  audit: {
    text: '«NOT_READY no debe sustituirse por ningún porcentaje positivo ni por un relato optimista.»',
    attribution: 'La auditoría de preparación de insumos, primera ronda',
    method: 'Una regla escrita en la auditoría antes de ejecutarla',
  },
  ownership: {
    heading: 'Liderar el trabajo, con el equipo del cliente',
    intro:
      'Dirigí el diseño de servicios — la auditoría de preparación, la arquitectura de procesos, el modelo de roles y la economía de la garantía. La responsabilidad de negocio siguió en manos del cliente: su responsable de negocio asumía las decisiones comerciales, y su responsable de posventa asumía la operación de soporte y revisaba los mapas.',
    own: [
      'Requisitos y alcance',
      'La auditoría de preparación de insumos',
      'Arquitectura de procesos, del mapa macro a la instrucción de trabajo',
      'Roles, responsabilidades y la matriz RACI',
      'Economía de la garantía',
    ],
    coOwn: [
      'El desarrollo de la plataforma del que se leyeron los mapas, con el equipo de ingeniería del cliente',
    ],
    collaborate: [
      'Decisiones comerciales (el responsable de negocio)',
      'La operación de soporte y sus notas de revisión (el responsable de posventa)',
    ],
    note: 'El archivo se construyó con asistencia de IA: las correcciones de la revisión las aplicó un agente que trabajaba a través de la integración con Figma, y quedaron registradas hilo por hilo. Las reglas de dibujo y los niveles de evidencia que debía obedecer se escribieron primero.',
  },
  approach: {
    heading: 'Puertas, no entregables',
    body: [
      'Cada etapa terminaba en una puerta de control y no en un documento. Los requisitos salieron de cincuenta preguntas directas de opción múltiple al responsable de negocio, una revisión de la marca y de los documentos de origen, y un análisis comparativo de nueve competidores, con una única prueba de éxito: ingeniería puede empezar sin volver a preguntar nada fundamental.',
      'Después se ejecutó una auditoría de preparación — y no la superó. Sobre 59 fuentes y 31 procesos, el veredicto fue NOT_READY, con 12 bloqueos, 4 conflictos sin resolver y roles en tres taxonomías incoherentes. La segunda ronda no discutió el veredicto: redujo el alcance a los 13 procesos que la marca realmente posee, y una enmienda posterior lo amplió a 22, sumando recepción, diagnóstico, reparación, entrega de vuelta y piezas.',
    ],
    insight:
      'Reducir el alcance elevó la preparación estructural del 49% al 78% y la confianza en la evidencia del 58% al 92% — porque los procesos que quedaron dentro podían leerse en código ejecutable y en pruebas superadas.',
    processHeading: 'Seis puertas, en orden',
    steps: [
      {
        label: 'Requisitos',
        note: 'Cincuenta preguntas al responsable de negocio; nueve competidores analizados',
      },
      {
        label: 'Auditoría de preparación',
        note: 'NOT_READY: 12 bloqueos, 4 conflictos, roles en tres taxonomías',
      },
      {
        label: 'Recorte de alcance',
        note: 'Solo los procesos que son de la marca; la auditoría, repetida sobre ese alcance',
      },
      {
        label: 'Reglas de dibujo',
        note: 'Una biblioteca de componentes, seis reglas de la casa y cinco niveles de evidencia',
      },
      {
        label: 'Arquitectura',
        note: '22 procesos, del mapa macro a la instrucción de trabajo',
      },
      {
        label: 'Economía',
        note: 'Lo que cuesta la promesa de la garantía, y quién podría pagarla',
      },
    ],
  },
  research: {
    heading: 'Dibujar las reglas antes que los diagramas',
    body: [
      'El archivo de Figma no contiene pantallas: la interfaz se especificó por escrito, y el esfuerzo de diseño se dedicó a la parte que nadie sabía describir — la operación. Su primera página no es una portada, sino una página de reglas: una biblioteca de componentes de catorce piezas y seis reglas de la casa. El flujo va de derecha a izquierda, como el idioma. Los vacíos se marcan «por determinar», nunca se rellenan con un nombre o un número supuestos. Los conflictos se registran, no se resuelven. El color nunca transmite significado por sí solo; siempre va acompañado de una forma y un icono.',
      'Una regla decide la forma de todo el archivo: lo que puede dibujarse depende de la evidencia que lo respalda, afirmación por afirmación. Cinco niveles de evidencia van desde el código ejecutable, que autoriza un diagrama de carriles completo, hasta la ausencia total de fuente, para la que dibujar está prohibido y solo puede aparecer un aviso. Cuanto más bajo el nivel, menos se puede dibujar.',
      'Así, el archivo es honesto sobre sus ausencias. Donde un nivel se queda corto, un tablón de avisos nombra lo que falta y por qué, y los avisos del mapa de servicios y de los diagramas de carriles cuadran su propia aritmética hasta 22. Un diagrama de una secuencia sin documentar sería la misma invención que prohíben las reglas — solo que más convincente.',
    ],
    libraryCaption:
      'Página 00: la biblioteca con la que se construye cada diagrama — siete formas de flujo, una insignia de estado de cuatro estados y los elementos que hacen navegable un mapa.',
  },
  levels: {
    label: 'Seis niveles',
    heading: 'Un proceso, seguido hasta el fondo',
    body: [
      'La arquitectura tiene seis niveles, y cada uno responde a una pregunta distinta. La activación de la garantía por el cliente es uno de los pocos procesos dibujados en todos ellos, así que muestra la pila completa. En el mapa macro es una tarjeta con un responsable, un resultado y un estado. En el nivel 1 se convierte en una tarjeta de extremo a extremo: disparador, responsable, eventos de inicio y fin, cuatro fases, las puertas de decisión, lo que recibe y lo que entrega, los controles que impone el código — y un KPI y un SLA marcados «por determinar», porque no existe en ninguna fuente una fórmula ni un plazo aprobados.',
      'El nivel 2 es un blueprint de servicio: las acciones del cliente, los puntos de contacto y lo que hacen el personal y los sistemas a cada lado de las líneas de interacción, de visibilidad y de interacción interna, hasta los registros y controles que deja cada paso. Aquí muestra que la etiqueta impresa de la que parte el cliente es un punto de contacto que el sistema no controla — la impresión ocurre fuera de él. El nivel 3 convierte la misma secuencia en un diagrama de carriles con un carril para cada actor.',
      'Los niveles 4 y 5 son para quienes lo ejecutan. El procedimiento cubre cuatro procesos a la vez — procedimientos y procesos no se corresponden uno a uno — y lleva el sello «no aprobado», con su aprobador y su fecha de revisión en «por determinar». La instrucción de trabajo son los siete pasos del propio cliente, con una lista de comprobación escrita para él: el alfabeto del código no tiene cero, O, uno, I ni L, así que nada en la etiqueta impresa puede leerse mal.',
    ],
    insight:
      'Cada nivel tiene permitido detenerse. Solo catorce de los 22 procesos tienen diagrama de carriles y solo seis tienen blueprint; el resto tiene un aviso que explica por qué, y los avisos cuadran su propio recuento hasta 22.',
    l1Caption:
      'Nivel 1 — la activación de la garantía por el cliente de extremo a extremo: disparador y responsable, cuatro fases que fluyen de derecha a izquierda, las puertas de decisión, y un KPI y un SLA que ninguna fuente define todavía.',
    blueprintCaption:
      'Nivel 2 — el blueprint de servicio: cuatro pasos desde la lectura de la etiqueta hasta una garantía activa, a través de las líneas de interacción, de visibilidad y de interacción interna.',
    swimlaneCaption:
      'Nivel 3 — el diagrama de carriles: el cliente, el sistema y la pasarela de SMS en tres carriles, con la única decisión que envía un código ya usado al rechazo.',
    procedureCaption:
      'Niveles 4 y 5 — el procedimiento de los códigos de activación, con el sello «no aprobado», junto a la instrucción de trabajo escrita para el cliente.',
  },
  findings: {
    label: 'Lo que encontraron los mapas',
    heading: 'Un mapa que puede quedar incompleto es un instrumento de investigación',
    body: [
      'Dibujar la operación produjo hallazgos que ningún documento recogía. De los catorce procesos dibujados como diagramas de carriles, solo dos envían algún SMS — el código de acceso y la activación de la garantía —, así que el borrador de los mensajes fue exactamente a esos dos mapas. Cuatro procesos del mapa macro no tienen tarjeta, porque las fuentes citadas para ellos no existen.',
      'Donde un nivel no puede dibujarse con honestidad, un aviso ocupa su lugar. Seis instrucciones de trabajo aún no pueden redactarse, cada una por un motivo explícito: no hay mecanismo de restablecimiento, no hay vía para disputas de titularidad, no hay formato de número de factura, hay un conflicto abierto, no hay estándar de fotografías, no hay política para bienes no reclamados. El procedimiento de calidad de la reparación no recibió ningún número de instrucción de trabajo — reservar uno para un procedimiento cuyo ejecutor sigue sin definir sería ya en sí una afirmación.',
      'El archivo también se audita a sí mismo. Una matriz de cobertura contrasta cada uno de los 22 procesos con su fuente, los niveles que existen y lo que falta: seis completos, seis incompletos, uno en conflicto y nueve por determinar. Reabre tres huecos que se habían marcado como cerrados — cerrado no es lo mismo que resuelto por la organización — y retira sus propias citas donde una fuente resultó no decir aquello para lo que se había citado.',
    ],
    noticeCaption:
      'Una ausencia, dibujada: seis instrucciones de trabajo que aún no pueden redactarse, cada una con el mecanismo o la política que falta y que la bloquea.',
  },
  roles: {
    label: 'Roles',
    heading: 'La rendición de cuentas es un hecho organizativo, no técnico',
    body: [
      'Ocho tarjetas de rol recogen el propósito, las funciones, los derechos exclusivos, las exclusiones deliberadas y los huecos de cada rol, con el KPI y el SLA marcados «por determinar» en todas las tarjetas. Algunas tarjetas son sobre todo preguntas. Un rol existe en el código y tiene acceso, pero ningún documento de negocio, organigrama ni procedimiento lo define, así que su carril se dibuja con línea discontinua hasta que el negocio decida si es real o es otro nombre de un rol existente.',
      'La matriz de responsabilidades solo pudo derivarse en tres cuartas partes. Responsable, consultado e informado salieron del código; el aprobador no, porque el código dice quién puede ejecutar una acción, no quién responde de su resultado. La matriz se entrega con esa columna abierta y un banner que lo indica, y marca en rojo las exclusiones deliberadas — segregación de funciones — para que no se confundan con huecos: el rol que fija el límite de anulación no puede aprobar anulaciones, porque podría elevar su propio límite.',
    ],
    roleCaption:
      'Un rol que solo existe en el código: todos los campos de su tarjeta dicen «por determinar», y el banner traslada la pregunta al negocio.',
    raciCaption:
      'Las once primeras filas de la matriz de 22 procesos. La columna principal se entrega vacía y dice por qué. El banner declara el hueco y quién tiene la decisión; aquí el nombre está oculto.',
  },
  decisions: {
    heading: 'Seis reglas para dibujar lo que nadie podía confirmar',
    lede: 'La mayor parte del método trata de lo que el archivo se niega a dibujar.',
    items: [
      {
        title: 'Dibujar solo hasta donde llega la evidencia',
        why: 'Cinco niveles de evidencia, fijados por afirmación y no por documento, deciden lo que puede dibujarse: el código ejecutable autoriza un diagrama de carriles completo, y la ausencia total de fuente solo autoriza un aviso. Un diagrama afirma conocer la secuencia, las condiciones, las rutas de error y los límites entre carriles — dibujar uno sin evidencia es una invención que simplemente parece más convincente.',
        alternatives:
          'Dibujar todos los procesos con la misma profundidad a partir de entrevistas e intenciones',
        tradeoff: 'El archivo parece desigual: algunos procesos se quedan en una tarjeta.',
      },
      {
        title: 'Marcar los vacíos, nunca suponerlos',
        why: 'No se inventó ninguna información de negocio. Donde faltaba un nombre, un número o un plazo, el campo dice «por determinar» — en cada KPI, en cada SLA y en la mayoría de los aprobadores —, para que los huecos puedan contarse y asignarse.',
        alternatives: 'Valores provisionales verosímiles',
        tradeoff: 'Las partes interesadas ven mucho naranja.',
      },
      {
        title: 'Registrar los conflictos, no resolverlos',
        why: 'Donde dos fuentes discrepaban, el archivo registra el conflicto y dónde se encuentra, en lugar de elegir un ganador. Una resolución silenciosa habría sido una decisión tomada en nombre del negocio.',
        alternatives: 'Elegir la fuente más probable y seguir adelante',
        tradeoff:
          'Los conflictos abiertos siguen visibles hasta que alguien con autoridad los cierra.',
      },
      {
        title: 'Dejar abierta la columna de Aprobador',
        why: 'Responsable, consultado e informado podían leerse en el código; el aprobador no. Rellenar esa columna a partir de los permisos habría confundido quién puede actuar con quién responde del resultado.',
        alternatives: 'Inferir la rendición de cuentas a partir de los permisos del sistema',
        tradeoff: 'La columna más importante de la matriz se entrega vacía.',
      },
      {
        title: 'El CRM como veredicto por proceso, no como funcionalidad',
        why: 'Cada diagrama de carriles lleva su propio veredicto de CRM con un motivo: uno «añadir, prioridad alta» — un cliente solo puede cancelar una solicitud llamando por teléfono —, cuatro condicionales y nueve innecesarios.',
        alternatives: 'Una integración con el CRM en todas partes',
        tradeoff:
          'La hoja de ruta de integración es una lista de excepciones, no una promesa de plataforma.',
      },
      {
        title: 'Persa en el lienzo, caracteres latinos en el nombre del marco',
        why: 'El flujo va de derecha a izquierda y cada etiqueta visible está en persa, así que los mapas se leen con naturalidad para quienes gestionan la operación; los identificadores en caracteres latinos viven en los nombres de los marcos, así que cada tablero sigue siendo rastreable hasta el código y los documentos.',
        alternatives: 'Un único sistema de identificadores para ambos públicos',
        tradeoff: 'Dos capas de identificadores que mantener sincronizadas.',
      },
    ],
  },
  economics: {
    label: 'Economía',
    heading: 'Una garantía es un pasivo, no un servicio',
    body: [
      'La operación también tenía que responder cuánto cuesta su promesa central. Una garantía no presta ningún servicio el día en que se emite — solo una promesa de que, si el dispositivo falla dentro de un plazo, alguien paga. Ese día se desconoce si llegará una reclamación, cuándo y cuánto costará, así que hay que reservar dinero para ella ahora, o la promesa no tiene nada que la respalde.',
      'El documento sigue la obligación desde la emisión hasta el cierre y expone quién podría financiarla — y cada respuesta dice qué es la marca: si el minorista absorbe el coste, un centro de costes; si los vendedores compran los códigos, un negocio independiente; si paga el importador, un socio que gestiona la red. La recomendación está etiquetada como «una propuesta, no una decisión».',
      'Termina con controles ordenados por coste — el más barato es un solo campo — y diez decisiones con responsables y opciones, ocho de las cuales pueden tomarse hoy sin ningún número.',
    ],
    insight:
      'Los únicos números permitidos en el documento son los extraídos del código, una hipótesis etiquetada como tal o una referencia externa con su fuente, población, fecha y nivel de confianza — y cada diapositiva lleva una insignia que indica cuál.',
    promiseCaption:
      'El documento se abre con el concepto: el día en que se emite, una garantía son tres incógnitas — si llegará una reclamación, cuándo y a qué coste.',
    controlsCaption:
      'Cinco palancas de control, ordenadas de la más barata a la más costosa, cada una ligada al factor de la ecuación de costes que modifica.',
  },
  outcomes: {
    heading: 'Una operación dibujada, con responsables para sus huecos',
    intro:
      'No hay métricas de negocio, y no debería haberlas: el producto está en un entorno de preproducción y las medidas acordadas aún no tienen fórmula aprobada ni fuente de datos. Lo que cambió el trabajo es lo que la organización sabe de sí misma. En julio no existía ninguna descripción escrita de la operación de posventa; ahora existe una dibujada, con cada hueco marcado, contado y asignado — y los tres elementos que bloquean la integración están identificados como decisiones, no como ingeniería.',
    delivered: [
      {
        label: '22 procesos en seis niveles',
        context:
          'Mapa macro, tarjetas de extremo a extremo, blueprints de servicio, diagramas de carriles, procedimientos e instrucciones de trabajo — 145 tableros en 13 páginas.',
      },
      {
        label: 'Un modelo de roles y una matriz RACI',
        context:
          'Ocho tarjetas de rol y una matriz de 22 procesos, con las exclusiones deliberadas marcadas y la columna abierta reconocida.',
      },
      {
        label: 'Una matriz de cobertura que se audita a sí misma',
        context:
          'Cada proceso frente a su fuente, sus niveles y lo que falta; huecos cerrados reabiertos y citas corregidas.',
      },
      {
        label: 'Un modelo de economía de la garantía',
        context: 'Pasivo, financiación y controles, expuestos sin un solo número inventado.',
      },
    ],
    shipped: [
      'Auditoría de preparación',
      'Mapa macro de procesos',
      'Blueprints de servicio',
      'Diagramas de carriles y procedimientos',
      'Roles y RACI',
      'Documento de economía de la garantía',
    ],
  },
  lessons: {
    heading: 'Una sola disciplina, en cada tablero',
    items: [
      {
        title: 'Publicar el hueco es mejor que disimularlo',
        body: 'El mismo instinto recorre cada entregable: NOT_READY en lugar de un porcentaje, «por determinar» en las tarjetas de proceso, una columna de Aprobador vacía con un banner que lo indica y una insignia de evidencia en cada diapositiva.',
      },
      {
        title: 'Un mapa que puede quedar incompleto es un instrumento de investigación',
        body: 'Dibujar lo que nadie sabía describir produjo hallazgos que ningún documento recogía: qué procesos envían realmente mensajes al cliente, qué roles solo existen en el código, qué columna no puede rellenarse a partir de los permisos. Un mapa que tiene que parecer terminado es decoración.',
      },
      {
        title: 'Una puntuación de preparación no significa nada hasta que el alcance es honesto',
        body: 'La primera auditoría no se superó porque medía una operación que este producto no posee. Restringirla a los procesos que son de la marca no rebajó el listón — elevó la confianza en la evidencia al 92%.',
      },
      {
        title: 'Convertir cada comentario de revisión en una regla',
        body: 'Responder a un comentario corrige un nodo; nombrar la regla que hay detrás corrige todos los futuros. Una sola observación sobre la ortografía persa se convirtió en una regla con nombre y en una única pasada sobre 1088 nodos de texto en las trece páginas.',
      },
    ],
  },
}

const DE: YarCopy = {
  statement:
    'Ein Kundendienstbetrieb, den niemand aufgeschrieben hatte, von der Makro-Landkarte bis zur Arbeitsanweisung gezeichnet — nur so weit, wie Nachweise es zuließen.',
  industry: 'Einzelhandel · Kundendienst und Garantie',
  team: 'Lead Service-Designer und Prozessarchitekt, mit den Verantwortlichen des Kunden für Geschäft und Kundendienst und seinem Engineering-Team',
  heroCaption:
    'Die Makro-Prozesslandkarte: achtzehn Prozesse in fünf Bahnen, jede Karte mit Verantwortlichem, Ergebnis und Status-Badge.',
  snapshot: {
    problem:
      'Der Kundendienstbetrieb hinter der Marke war nie aufgeschrieben worden, und die dafür angeführten Dokumente existierten nirgends.',
    role: 'Lead Service-Designer und Prozessarchitekt: das Reife-Audit, eine Prozessarchitektur aus 145 Boards, das Rollenmodell und die Garantieökonomie.',
    result:
      'Die erste gezeichnete Darstellung des Betriebs, in der jede Lücke markiert ist und einen Verantwortlichen hat, statt gefüllt zu werden. Noch keine Geschäftskennzahlen.',
  },
  alt: {
    cover:
      'Yaravan — der Service-Blueprint der Garantieaktivierung auf Persisch: Aktionen des Kunden, Touchpoints sowie die Interaktions- und die Sichtbarkeitslinie',
    map: 'Yaravan — die Makro-Prozesslandkarte auf Persisch: achtzehn Prozesskarten in fünf Bahnen, jede mit Status-Badge, und ein Hinweis, der die Zählung abschließt',
    library:
      'Yaravan — die Komponentenbibliothek der Diagramme: sieben Ablaufformen, ein Status-Badge mit vier Zuständen, Bahnköpfe, Breadcrumbs und Prozesskarten',
    l1: 'Yaravan — die End-to-End-Karte der Garantieaktivierung durch den Kunden, auf Persisch: Auslöser, Verantwortlicher, Phasen, Entscheidungspunkte, Inputs und Outputs, Kontrollen sowie ein KPI und ein SLA, die als „noch festzulegen“ markiert sind',
    blueprint:
      'Yaravan — der Service-Blueprint der Garantieaktivierung durch den Kunden, auf Persisch: vier Schritte über die Ebenen von den Aktionen des Kunden bis zu den Nachweisen, getrennt durch die Interaktionslinie, die Sichtbarkeitslinie und die Linie der internen Interaktion',
    swimlane:
      'Yaravan — das Swimlane-Diagramm der Garantieaktivierung durch den Kunden, auf Persisch: Bahnen für Kunde, System und SMS, eine Entscheidung und zwei Endzustände',
    sop: 'Yaravan — der Steckbrief der Verfahrensanweisung für Aktivierungscodes, auf Persisch: Entwurf in Version 0.3, freigebende Person und Überprüfungsdatum noch festzulegen, und der Status „nicht freigegeben“',
    wi: 'Yaravan — die Arbeitsanweisung zum Aktivieren eines Garantiecodes, auf Persisch: Kenndaten, Voraussetzungen, der Pfad im Panel und sieben nummerierte Schritte',
    notice:
      'Yaravan — eine Hinweistafel auf Persisch, die die Arbeitsanweisungen nennt, die sich noch nicht schreiben lassen, jeweils mit Begründung',
    role: 'Yaravan — die Rollenkarte für den Garantiebetrieb, auf Persisch: ein rotes Banner, das sagt, dass die Rolle im Code existiert, aber in keinem Geschäftsdokument, und jedes Feld als „noch festzulegen“ markiert',
    raci: 'Yaravan — die RACI-Matrix auf Persisch, mit einem roten Banner, das die Spalte „Accountable“ als offen markiert, und roten Zellen für bewusste Ausschlüsse',
    promise:
      'Yaravan-Garantieökonomie — eine Folie auf Persisch: Eine Garantie ist ein Versprechen mit drei Unbekannten im Moment der Ausstellung — ob, wann und wie viel',
    controls:
      'Yaravan-Garantieökonomie — fünf Steuerungshebel auf Persisch, vom günstigsten zum teuersten geordnet, jeder mit seinem heutigen Status',
  },
  context: {
    heading: 'Eine ruhende Identität, ein undokumentierter Betrieb',
    body: [
      'Yaravan ist die Garantie- und Kundendienstmarke eines iranischen Mobiltelefonhändlers. Eine externe Agentur schrieb 2024 ihre Markenidentität, und dann wurde nichts darauf aufgebaut. Ab Juli 2026 bestand die Aufgabe darin, daraus einen funktionierenden Service zu machen: eine öffentliche Website, einen Kundenbereich und einen Mitarbeiterbereich — und darunter den Betrieb, der die Versprechen der Marke würde halten müssen.',
      'Das bestehende Supportsystem behält die Ticket-Warteschlange und den Reparaturbetrieb. Für die Prozesse, die Yaravan verantwortet, verläuft die Beziehung umgekehrt: Yaravan ist die Referenz für den Betrieb, und das Supportsystem dokumentiert den Prozess, statt ihn zu steuern. Diese Fallstudie handelt von diesem Betrieb; das darauf aufgebaute Produkt ist eine eigene Fallstudie.',
    ],
  },
  problem: {
    heading: 'Ein Entwurf des Soll-Zustands, keine Aufzeichnung des Ist-Zustands',
    body: [
      'Der Betrieb war nie aufgeschrieben worden. Die Anforderungen und die funktionale Spezifikation beriefen sich beide auf zwei Quelldokumente — ein Anforderungsdokument für den Kundendienst und einen CRM-Prozessbericht — als Ursprung der realen Ticket-, Reparatur- und Garantieprozesse. Keines von beiden existierte in irgendeinem Repository.',
      'Also musste jede Prozesslandkarte ein Entwurf des Soll-Zustands sein, keine Aufzeichnung des Ist-Zustands, und die Prozesssammlung trägt diese Warnung auf ihrer ersten Seite. Unterdessen gingen die öffentlichen Versprechen der Marke bereits über den Betrieb hinaus: Die Anforderungsarbeit ergab, dass die zentralen Aussagen der alten Website nicht der betrieblichen Wirklichkeit entsprachen und dass es keine echte Garantiedatenbank gab.',
      'Damit stand die Designfrage für den Betrieb fest: Wie zeichnet man einen Prozess, den noch niemand bestätigen kann, ohne ihn zu erfinden?',
    ],
  },
  audit: {
    text: '„NOT_READY darf durch keinen positiven Prozentsatz und keine optimistische Erzählung ersetzt werden.“',
    attribution: 'Das Audit der Input-Reife, erste Runde',
    method: 'Eine Regel, die vor dem Durchlauf in das Audit geschrieben wurde',
  },
  ownership: {
    heading: 'Die Arbeit leiten, mit dem Team des Kunden',
    intro:
      'Ich leitete das Service-Design — das Reife-Audit, die Prozessarchitektur, das Rollenmodell und die Garantieökonomie. Die geschäftliche Verantwortung blieb beim Kunden: Sein Verantwortlicher für das Geschäft traf die kaufmännischen Entscheidungen, und sein Verantwortlicher für den Kundendienst trug den Supportbetrieb und prüfte die Landkarten.',
    own: [
      'Anforderungen und Umfang',
      'Das Audit der Input-Reife',
      'Prozessarchitektur, von der Makro-Landkarte bis zur Arbeitsanweisung',
      'Rollen, Verantwortlichkeiten und die RACI-Matrix',
      'Garantieökonomie',
    ],
    coOwn: [
      'Die Umsetzung der Plattform, aus der die Landkarten abgelesen wurden, mit dem Engineering-Team des Kunden',
    ],
    collaborate: [
      'Kaufmännische Entscheidungen (der Verantwortliche für das Geschäft)',
      'Der Supportbetrieb und seine Review-Anmerkungen (der Verantwortliche für den Kundendienst)',
    ],
    note: 'Die Datei entstand KI-gestützt: Korrekturen aus dem Review setzte ein Agent über die Figma-Integration um, und sie wurden Thread für Thread protokolliert. Die Zeichenregeln und die Nachweisstufen, an die er sich halten musste, wurden zuerst geschrieben.',
  },
  approach: {
    heading: 'Prüftore statt Liefergegenstände',
    body: [
      'Jede Phase endete an einem Prüftor statt mit einem Dokument. Die Anforderungen stammten aus fünfzig direkten Multiple-Choice-Fragen an den Verantwortlichen für das Geschäft, einer Durchsicht der Marken- und Quelldokumente und einem Benchmark von neun Wettbewerbern, gemessen an einem einzigen Erfolgstest: Das Engineering kann beginnen, ohne eine grundlegende Frage erneut stellen zu müssen.',
      'Dann lief ein Reife-Audit — und scheiterte. Über 59 Quellen und 31 Prozesse hinweg lautete das Ergebnis NOT_READY, mit 12 Blockern, 4 ungelösten Konflikten und Rollen in drei uneinheitlichen Taxonomien. Die zweite Runde stritt nicht mit dem Urteil; sie beschränkte den Umfang auf die 13 Prozesse, die die Marke tatsächlich verantwortet, und eine spätere Ergänzung erweiterte ihn auf 22, mit Annahme, Diagnose, Reparatur, Rücklieferung und Ersatzteilen.',
    ],
    insight:
      'Der kleinere Umfang hob die strukturelle Reife von 49 % auf 78 % und die Belastbarkeit der Nachweise von 58 % auf 92 % — weil sich die verbliebenen Prozesse aus ausführbarem Code und bestandenen Tests ablesen ließen.',
    processHeading: 'Sechs Prüftore, in dieser Reihenfolge',
    steps: [
      {
        label: 'Anforderungen',
        note: 'Fünfzig Fragen an den Verantwortlichen für das Geschäft; neun Wettbewerber im Benchmark',
      },
      {
        label: 'Reife-Audit',
        note: 'NOT_READY: 12 Blocker, 4 Konflikte, Rollen in drei Taxonomien',
      },
      {
        label: 'Umfang gekürzt',
        note: 'Nur die Prozesse, die die Marke verantwortet; das Audit auf diesem Umfang wiederholt',
      },
      {
        label: 'Zeichenregeln',
        note: 'Eine Komponentenbibliothek, sechs Hausregeln und fünf Nachweisstufen',
      },
      {
        label: 'Architektur',
        note: '22 Prozesse, von der Makro-Landkarte bis zur Arbeitsanweisung',
      },
      {
        label: 'Ökonomie',
        note: 'Was das Garantieversprechen kostet und wer dafür zahlen könnte',
      },
    ],
  },
  research: {
    heading: 'Erst die Regeln zeichnen, dann die Diagramme',
    body: [
      'Die Figma-Datei enthält keine Screens: Das Interface wurde schriftlich spezifiziert, und der Designaufwand floss in den Teil, den niemand beschreiben konnte — den Betrieb. Ihre erste Seite ist kein Deckblatt, sondern eine Regelseite: eine Komponentenbibliothek aus vierzehn Teilen und sechs Hausregeln. Abläufe laufen von rechts nach links, wie die Sprache. Leerstellen werden als „noch festzulegen“ markiert, nie mit einem geratenen Namen oder einer geratenen Zahl gefüllt. Konflikte werden festgehalten, nicht aufgelöst. Farbe trägt nie allein eine Bedeutung; sie tritt immer zusammen mit einer Form und einem Icon auf.',
      'Eine Regel bestimmt die Gestalt der ganzen Datei: Was gezeichnet werden darf, hängt von den Nachweisen dahinter ab, Aussage für Aussage. Fünf Nachweisstufen reichen von ausführbarem Code, der ein vollständiges Swimlane-Diagramm erlaubt, bis zu gar keiner Quelle, bei der Zeichnen verboten ist und nur ein Hinweis erscheinen darf. Je niedriger die Stufe, desto weniger darf gezeichnet werden.',
      'So ist die Datei ehrlich über ihre Leerstellen. Wo eine Ebene vorzeitig endet, nennt eine Hinweistafel, was fehlt und warum, und die Hinweise zur Service-Landkarte und zu den Swimlanes rechnen ihre eigene Zählung auf 22 zurück. Ein Diagramm einer undokumentierten Abfolge wäre dieselbe Erfindung, die die Regeln verbieten — nur überzeugender.',
    ],
    libraryCaption:
      'Seite 00: die Bibliothek, aus der jedes Diagramm gebaut ist — sieben Ablaufformen, ein Status-Badge mit vier Zuständen und das Mobiliar, das eine Landkarte navigierbar macht.',
  },
  levels: {
    label: 'Sechs Ebenen',
    heading: 'Ein Prozess, bis ganz nach unten verfolgt',
    body: [
      'Die Architektur hat sechs Ebenen, und jede beantwortet eine andere Frage. Die Garantieaktivierung durch den Kunden ist einer der wenigen Prozesse, die auf jeder davon gezeichnet sind, und zeigt deshalb den gesamten Aufbau. Auf der Makro-Landkarte ist sie eine Karte mit Verantwortlichem, Ergebnis und Status. Auf Ebene 1 wird sie zur End-to-End-Karte: Auslöser, Verantwortlicher, Start- und Endereignisse, vier Phasen, die Entscheidungspunkte, was sie aufnimmt und weitergibt, die Kontrollen, die der Code durchsetzt — und ein KPI und ein SLA, markiert als „noch festzulegen“, weil in keiner Quelle eine freigegebene Formel oder Zeit existiert.',
      'Ebene 2 ist ein Service-Blueprint: die Aktionen des Kunden, die Touchpoints und was Mitarbeitende und Systeme auf beiden Seiten der Interaktionslinie, der Sichtbarkeitslinie und der Linie der internen Interaktion tun, bis hin zu den Aufzeichnungen und Kontrollen, die jeder Schritt hinterlässt. Hier zeigt er, dass das gedruckte Etikett, von dem der Kunde ausgeht, ein Touchpoint ist, den das System nicht kontrolliert — der Druck erfolgt außerhalb des Systems. Ebene 3 macht aus derselben Abfolge ein Swimlane-Diagramm mit einer Bahn für jeden Akteur.',
      'Die Ebenen 4 und 5 sind für die Menschen, die ihn ausführen. Die Verfahrensanweisung deckt vier Prozesse zugleich ab — Verfahren und Prozesse entsprechen einander nicht eins zu eins — und trägt den Stempel „nicht freigegeben“; freigebende Person und Überprüfungsdatum stehen auf „noch festzulegen“. Die Arbeitsanweisung besteht aus den sieben Schritten des Kunden selbst, mit einer eigens für ihn geschriebenen Checkliste: Das Code-Alphabet enthält keine Null, kein O, keine Eins, kein I und kein L, sodass nichts auf dem gedruckten Etikett falsch gelesen werden kann.',
    ],
    insight:
      'Jede Ebene darf aufhören. Nur vierzehn der 22 Prozesse haben ein Swimlane-Diagramm und nur sechs einen Blueprint; die übrigen haben einen Hinweis, der sagt, warum, und die Hinweise rechnen ihre eigene Zählung auf 22 zurück.',
    l1Caption:
      'Ebene 1 — die Garantieaktivierung durch den Kunden von Anfang bis Ende: Auslöser und Verantwortlicher, vier Phasen, die von rechts nach links verlaufen, die Entscheidungspunkte sowie ein KPI und ein SLA, die noch keine Quelle definiert.',
    blueprintCaption:
      'Ebene 2 — der Service-Blueprint: vier Schritte vom Lesen des Etiketts bis zur aktiven Garantie, über die Interaktionslinie, die Sichtbarkeitslinie und die Linie der internen Interaktion hinweg.',
    swimlaneCaption:
      'Ebene 3 — das Swimlane-Diagramm: Kunde, System und SMS-Gateway in drei Bahnen, mit der einen Entscheidung, die einen bereits verwendeten Code zur Ablehnung schickt.',
    procedureCaption:
      'Ebenen 4 und 5 — die Verfahrensanweisung für Aktivierungscodes mit dem Stempel „nicht freigegeben“, neben der Arbeitsanweisung, die für den Kunden geschrieben wurde.',
  },
  findings: {
    label: 'Was die Landkarten fanden',
    heading: 'Eine Landkarte, die unvollständig zurückkommen darf, ist ein Forschungsinstrument',
    body: [
      'Das Zeichnen des Betriebs brachte Befunde hervor, die kein Dokument enthielt. Von den vierzehn als Swimlanes gezeichneten Prozessen versenden nur zwei überhaupt eine SMS — der Anmeldecode und die Garantieaktivierung —, also kamen die Entwürfe der Nachrichtentexte in genau diese beiden Landkarten. Vier Prozesse auf der Makro-Landkarte haben keine Karte, weil die für sie angeführten Quellen nicht existieren.',
      'Wo sich eine Ebene nicht ehrlich zeichnen lässt, tritt ein Hinweis an ihre Stelle. Sechs Arbeitsanweisungen lassen sich noch nicht schreiben, jede aus einem benannten Grund: kein Mechanismus zum Zurücksetzen, kein Weg für Eigentumsstreitigkeiten, kein Format für Rechnungsnummern, ein offener Konflikt, kein Fotostandard, keine Richtlinie für nicht abgeholte Ware. Die Verfahrensanweisung zur Reparaturqualität erhielt überhaupt keine Arbeitsanweisungsnummer — eine für ein Verfahren zu reservieren, dessen Ausführender noch offen ist, wäre selbst schon eine Aussage.',
      'Die Datei prüft sich auch selbst. Eine Abdeckungsmatrix stellt jeden der 22 Prozesse seiner Quelle, den vorhandenen Ebenen und dem Fehlenden gegenüber: sechs vollständig, sechs unvollständig, einer im Konflikt, neun noch festzulegen. Sie öffnet drei Lücken wieder, die als geschlossen markiert waren — geschlossen ist nicht dasselbe wie von der Organisation gelöst —, und sie zieht ihre eigenen Quellenverweise zurück, wo sich herausstellte, dass eine Quelle nicht sagt, wofür sie angeführt worden war.',
    ],
    noticeCaption:
      'Eine Leerstelle, gezeichnet: sechs Arbeitsanweisungen, die sich noch nicht schreiben lassen, jede mit dem fehlenden Mechanismus oder der fehlenden Richtlinie, die sie blockiert.',
  },
  roles: {
    label: 'Rollen',
    heading: 'Rechenschaftspflicht ist eine organisatorische Tatsache, keine technische',
    body: [
      'Acht Rollenkarten legen für jede Rolle Zweck, Aufgaben, exklusive Rechte, bewusste Ausschlüsse und Lücken dar, mit KPI und SLA auf jeder Karte als „noch festzulegen“ markiert. Manche Karten bestehen überwiegend aus Fragen. Eine Rolle existiert im Code und hat Zugriff, aber kein Geschäftsdokument, kein Organigramm und keine Verfahrensanweisung definiert sie, also ist ihre Bahn gestrichelt gezeichnet, bis das Geschäft entscheidet, ob sie real ist oder ein anderer Name für eine bestehende Rolle.',
      'Die Verantwortungsmatrix ließ sich nur zu drei Vierteln ableiten. Responsible, Consulted und Informed ergaben sich aus dem Code; Accountable nicht, denn der Code sagt, wer eine Aktion ausführen kann, nicht, wer für ihr Ergebnis einsteht. Die Matrix wird mit dieser Spalte offen und einem Banner ausgeliefert, das genau das sagt, und sie markiert bewusste Ausschlüsse — Funktionstrennung — in Rot, damit sie nicht mit Lücken verwechselt werden: Die Rolle, die die Stornogrenze festlegt, kann keine Stornierungen genehmigen, weil sie sonst ihre eigene Grenze anheben könnte.',
    ],
    roleCaption:
      'Eine Rolle, die nur im Code existiert: Jedes Feld ihrer Karte lautet „noch festzulegen“, und das Banner richtet die Frage an das Geschäft.',
    raciCaption:
      'Die ersten elf Zeilen der Matrix über 22 Prozesse. Die Hauptspalte wird leer ausgeliefert und sagt, warum. Das Banner benennt die Lücke und wer die Entscheidung trägt; der Name ist hier ausgeblendet.',
  },
  decisions: {
    heading: 'Sechs Regeln, um zu zeichnen, was niemand bestätigen konnte',
    lede: 'Der größte Teil der Methode betrifft das, was die Datei bewusst nicht zeichnet.',
    items: [
      {
        title: 'Nur so weit zeichnen, wie die Nachweise reichen',
        why: 'Fünf Nachweisstufen, festgelegt pro Aussage statt pro Dokument, entscheiden, was gezeichnet werden darf: Ausführbarer Code erlaubt ein vollständiges Swimlane-Diagramm, gar keine Quelle erlaubt nur einen Hinweis. Ein Diagramm behauptet, die Abfolge, die Bedingungen, die Fehlerpfade und die Bahngrenzen zu kennen — eines ohne Nachweise zu zeichnen, ist Erfindung, die bloß überzeugender aussieht.',
        alternatives: 'Jeden Prozess aus Interviews und Absichten in derselben Tiefe zeichnen',
        tradeoff: 'Die Datei wirkt ungleichmäßig: Manche Prozesse enden bei einer Karte.',
      },
      {
        title: 'Leerstellen markieren, nie erraten',
        why: 'Keine geschäftliche Information wurde erfunden. Wo ein Name, eine Zahl oder eine Zeit fehlte, lautet das Feld „noch festzulegen“ — bei jedem KPI, jedem SLA und den meisten freigebenden Personen —, damit sich die Lücken zählen und zuweisen lassen.',
        alternatives: 'Plausible Platzhalterwerte',
        tradeoff: 'Stakeholder sehen sehr viel Orange.',
      },
      {
        title: 'Konflikte festhalten, nicht auflösen',
        why: 'Wo zwei Quellen einander widersprachen, hält die Datei den Konflikt und seinen Ort fest, statt einen Gewinner zu wählen. Eine stillschweigende Auflösung wäre eine Entscheidung im Namen des Geschäfts gewesen.',
        alternatives: 'Die wahrscheinlichere Quelle wählen und weitermachen',
        tradeoff:
          'Offene Konflikte bleiben sichtbar, bis jemand mit Entscheidungsbefugnis sie schließt.',
      },
      {
        title: 'Die Spalte „Accountable“ offen lassen',
        why: 'Responsible, Consulted und Informed ließen sich aus dem Code ablesen; Accountable nicht. Die Spalte aus Berechtigungen zu füllen, hätte verwechselt, wer handeln kann und wer für das Ergebnis einsteht.',
        alternatives: 'Die Rechenschaftspflicht aus Systemberechtigungen ableiten',
        tradeoff: 'Die wichtigste Spalte der Matrix wird leer ausgeliefert.',
      },
      {
        title: 'CRM als Urteil pro Prozess, nicht als Feature',
        why: 'Jedes Swimlane-Diagramm trägt ein eigenes CRM-Urteil mit Begründung: eines „hinzufügen, hohe Priorität“ — ein Kunde kann eine Anfrage nur telefonisch stornieren —, vier bedingt und neun nicht nötig.',
        alternatives: 'Eine CRM-Integration überall',
        tradeoff:
          'Die Integrations-Roadmap ist eine Liste von Ausnahmen, kein Plattformversprechen.',
      },
      {
        title: 'Persisch auf der Arbeitsfläche, lateinisch im Frame-Namen',
        why: 'Abläufe laufen von rechts nach links, und jede sichtbare Beschriftung ist persisch, sodass sich die Landkarten für die Menschen, die den Betrieb führen, ganz selbstverständlich lesen; die lateinischen IDs stehen in den Frame-Namen, sodass jedes Board auf den Code und die Dokumente rückführbar bleibt.',
        alternatives: 'Ein ID-System für beide Zielgruppen',
        tradeoff: 'Zwei ID-Ebenen, die synchron gehalten werden müssen.',
      },
    ],
  },
  economics: {
    label: 'Ökonomie',
    heading: 'Eine Garantie ist eine Verbindlichkeit, keine Dienstleistung',
    body: [
      'Der Betrieb musste auch beantworten, was sein zentrales Versprechen kostet. Eine Garantie erbringt am Tag ihrer Ausstellung keine Dienstleistung — nur ein Versprechen, dass jemand zahlt, wenn das Gerät innerhalb eines bestimmten Zeitraums ausfällt. Ob ein Garantiefall eintritt, wann und wie viel er kostet, ist an diesem Tag völlig unbekannt, also muss jetzt Geld dafür zurückgelegt werden, sonst steht hinter dem Versprechen nichts.',
      'Das Deck verfolgt die Verpflichtung von der Ausstellung bis zum Abschluss und legt dar, wer sie finanzieren könnte — und jede Antwort sagt, was die Marke ist: Trägt der Händler die Kosten, ist sie ein Kostenzentrum; kaufen Verkäufer die Codes, ist sie ein eigenständiges Geschäft; zahlt der Importeur, ist sie ein Partner, der das Netzwerk betreibt. Die Empfehlung ist als „ein Vorschlag, keine Entscheidung“ gekennzeichnet.',
      'Es endet mit Steuerungshebeln, nach Kosten geordnet — der günstigste ist ein einzelnes Feld —, und zehn Entscheidungen mit Verantwortlichen und Optionen, von denen acht heute getroffen werden können, ganz ohne Zahl.',
    ],
    insight:
      'Die einzigen Zahlen, die im Deck erlaubt sind, stammen aus dem Code, sind ausdrücklich als hypothetisch gekennzeichnet oder sind ein externer Benchmark mit Quelle, Grundgesamtheit, Datum und Belastbarkeit — und jede Folie trägt ein Badge, das sagt, welche davon.',
    promiseCaption:
      'Das Deck beginnt mit dem Konzept: Am Tag ihrer Ausstellung ist eine Garantie drei Unbekannte — ob ein Garantiefall eintritt, wann und zu welchen Kosten.',
    controlsCaption:
      'Fünf Steuerungshebel, vom günstigsten zum teuersten geordnet, jeder an den Faktor der Kostengleichung gebunden, den er bewegt.',
  },
  outcomes: {
    heading: 'Ein gezeichneter Betrieb, dessen Lücken Verantwortliche haben',
    intro:
      'Es gibt keine Geschäftskennzahlen, und es sollte auch keine geben: Das Produkt läuft auf Staging, und die vereinbarten Kennzahlen haben noch keine freigegebene Formel und keine Datenquelle. Was die Arbeit verändert hat, ist das, was die Organisation über sich selbst weiß. Im Juli gab es keine schriftliche Darstellung des Kundendienstbetriebs; jetzt gibt es eine gezeichnete, in der jede Lücke markiert, gezählt und zugewiesen ist — und die drei Punkte, die die Integration blockieren, sind als Entscheidungen benannt, nicht als Engineering.',
    delivered: [
      {
        label: '22 Prozesse auf sechs Ebenen',
        context:
          'Makro-Landkarte, End-to-End-Karten, Service-Blueprints, Swimlanes, Verfahrensanweisungen und Arbeitsanweisungen — 145 Boards auf 13 Seiten.',
      },
      {
        label: 'Ein Rollenmodell und eine RACI-Matrix',
        context:
          'Acht Rollenkarten und eine Matrix über 22 Prozesse, bewusste Ausschlüsse markiert und die offene Spalte eingestanden.',
      },
      {
        label: 'Eine Abdeckungsmatrix, die sich selbst prüft',
        context:
          'Jeder Prozess im Abgleich mit seiner Quelle, seinen Ebenen und dem, was fehlt; geschlossene Lücken wieder geöffnet und Quellenverweise korrigiert.',
      },
      {
        label: 'Ein Modell der Garantieökonomie',
        context:
          'Verbindlichkeit, Finanzierung und Steuerung, dargelegt ohne eine einzige erfundene Zahl.',
      },
    ],
    shipped: [
      'Reife-Audit',
      'Makro-Prozesslandkarte',
      'Service-Blueprints',
      'Swimlanes und Verfahrensanweisungen',
      'Rollen und RACI',
      'Deck zur Garantieökonomie',
    ],
  },
  lessons: {
    heading: 'Eine Disziplin, auf jedem Board',
    items: [
      {
        title: 'Die Lücke zu veröffentlichen ist besser, als sie zu übertünchen',
        body: 'Derselbe Instinkt zieht sich durch jedes Artefakt: NOT_READY statt eines Prozentsatzes, „noch festzulegen“ auf den Prozesskarten, eine leere Spalte „Accountable“ mit einem Banner, das das sagt, und ein Nachweis-Badge auf jeder Folie.',
      },
      {
        title: 'Eine Landkarte, die unvollständig zurückkommen darf, ist ein Forschungsinstrument',
        body: 'Zu zeichnen, was niemand beschreiben konnte, brachte Befunde hervor, die kein Dokument enthielt: welche Prozesse dem Kunden wirklich Nachrichten senden, welche Rollen nur im Code existieren, welche Spalte sich nicht aus Berechtigungen füllen lässt. Eine Landkarte, die fertig aussehen muss, ist Dekoration.',
      },
      {
        title: 'Ein Reifewert bedeutet nichts, solange der Umfang nicht ehrlich ist',
        body: 'Das erste Audit scheiterte, weil es einen Betrieb maß, den dieses Produkt nicht verantwortet. Die Beschränkung auf die Prozesse, die die Marke verantwortet, senkte den Maßstab nicht — sie hob die Belastbarkeit der Nachweise auf 92 %.',
      },
      {
        title: 'Jeden Review-Kommentar in eine Regel verwandeln',
        body: 'Einen Kommentar zu beantworten, korrigiert einen Knoten; die Regel dahinter zu benennen, korrigiert jeden künftigen. Ein Hinweis zur persischen Rechtschreibung wurde zu einer benannten Regel und einem einzigen Durchgang über 1.088 Textknoten auf allen dreizehn Seiten.',
      },
    ],
  },
}

const FR: YarCopy = {
  statement:
    'Une opération d’après-vente que personne n’avait décrite, dessinée de la carte macro à l’instruction de travail — sans dépasser ce que les preuves permettaient.',
  industry: 'Commerce de détail · après-vente et garantie',
  team: 'Designer de services principal et architecte des processus, avec les responsables métier et après-vente du client et son équipe d’ingénierie',
  heroCaption:
    'La carte macro des processus : dix-huit processus en cinq couloirs, chaque carte avec un responsable, un livrable et une pastille de statut.',
  snapshot: {
    problem:
      'L’opération d’après-vente derrière la marque n’avait jamais été consignée par écrit, et les documents cités à son sujet n’existaient nulle part.',
    role: 'Designer de services principal et architecte des processus : l’audit de préparation, une architecture des processus de 145 planches, le modèle des rôles et l’économie de la garantie.',
    result:
      'La première description dessinée de l’opération, où chaque lacune est signalée et dotée d’un responsable plutôt que comblée. Pas encore d’indicateurs métier.',
  },
  alt: {
    cover:
      'Yaravan — le blueprint de service de l’activation de la garantie, en persan : actions du client, points de contact et lignes d’interaction et de visibilité',
    map: 'Yaravan — la carte macro des processus en persan : dix-huit cartes de processus en cinq couloirs, chacune avec une pastille de statut, et un avis qui boucle le décompte',
    library:
      'Yaravan — la bibliothèque de composants des diagrammes : sept formes de flux, une pastille de statut à quatre états, des en-têtes de couloir, un fil d’Ariane et des cartes de processus',
    l1: 'Yaravan — la carte de bout en bout de l’activation de la garantie par le client, en persan : déclencheur, responsable, phases, points de décision, entrées et sorties, contrôles, et un KPI et un SLA marqués « à déterminer »',
    blueprint:
      'Yaravan — le blueprint de service de l’activation de la garantie par le client, en persan : quatre étapes à travers les couches, des actions du client jusqu’aux preuves, séparées par les lignes d’interaction, de visibilité et d’interaction interne',
    swimlane:
      'Yaravan — le diagramme en couloirs de l’activation de la garantie par le client, en persan : couloirs client, système et SMS, une décision et deux états finaux',
    sop: 'Yaravan — la fiche d’identité de la procédure des codes d’activation, en persan : version 0.3 en brouillon, approbateur et date de revue à déterminer, et le statut « non approuvé »',
    wi: 'Yaravan — l’instruction de travail pour activer un code de garantie, en persan : identité, prérequis, le chemin dans l’espace client et sept étapes numérotées',
    notice:
      'Yaravan — un panneau d’avis en persan qui nomme les instructions de travail impossibles à rédiger pour l’instant, et la raison de chacune',
    role: 'Yaravan — la fiche de rôle des opérations de garantie, en persan : un bandeau rouge indiquant que le rôle existe dans le code mais dans aucun document métier, et chaque champ marqué « à déterminer »',
    raci: 'Yaravan — la matrice RACI en persan, avec un bandeau rouge signalant que la colonne A (approbateur) reste ouverte, et des cellules rouges pour les exclusions délibérées',
    promise:
      'Économie de la garantie Yaravan — une diapositive en persan : une garantie est une promesse, avec trois inconnues au moment de son émission — si elle jouera, quand et pour combien',
    controls:
      'Économie de la garantie Yaravan — cinq leviers de contrôle en persan, classés du moins cher au plus coûteux, chacun avec son statut actuel',
  },
  context: {
    heading: 'Une identité en sommeil, une opération non documentée',
    body: [
      'Yaravan est la marque de garantie et d’après-vente d’un distributeur iranien de téléphones mobiles. Une agence extérieure a rédigé son identité de marque en 2024, puis rien n’a été construit dessus. À partir de juillet 2026, il s’agissait d’en faire un service qui fonctionne : un site public, un espace client et un espace collaborateurs — et, en dessous, l’opération qui devrait tenir les promesses de la marque.',
      'Le système de support existant conserve la file de tickets et l’opération de réparation. Pour les processus que possède Yaravan, la relation s’inverse : Yaravan fait référence pour l’opération, et le système de support enregistre le processus au lieu de le piloter. Cette étude de cas porte sur cette opération ; le produit bâti dessus fait l’objet d’une étude de cas à part entière.',
    ],
  },
  problem: {
    heading: 'Le design de l’état souhaité, pas le relevé de l’état actuel',
    body: [
      'L’opération n’avait jamais été consignée par écrit. Les exigences comme la spécification fonctionnelle citaient deux documents sources — un document d’exigences d’après-vente et un rapport sur les processus CRM — comme origine des vrais processus de ticketing, de réparation et de garantie. Aucun des deux n’existait dans le moindre dépôt.',
      'Chaque carte de processus devait donc être le design de l’état souhaité, et non le relevé de l’état existant, et l’ensemble des processus porte cet avertissement en première page. Entre-temps, les promesses publiques de la marque avaient déjà dépassé l’opération : le travail sur les exigences a montré que les promesses phares de l’ancien site ne correspondaient pas à la réalité opérationnelle, et qu’aucune véritable base de données de garanties n’existait.',
      'D’où la question de design posée à l’opération : comment dessiner un processus que personne ne peut encore confirmer, sans l’inventer ?',
    ],
  },
  audit: {
    text: '« NOT_READY ne doit être remplacé par aucun pourcentage positif ni par aucun récit optimiste. »',
    attribution: 'L’audit de préparation des intrants, premier tour',
    method: 'Une règle inscrite dans l’audit avant son exécution',
  },
  ownership: {
    heading: 'Mener le travail, avec l’équipe du client',
    intro:
      'J’ai mené le design de services — l’audit de préparation, l’architecture des processus, le modèle des rôles et l’économie de la garantie. La responsabilité métier est restée au client : son responsable métier portait les décisions commerciales, et son responsable après-vente portait l’opération de support et relisait les cartes.',
    own: [
      'Exigences et périmètre',
      'L’audit de préparation des intrants',
      'Architecture des processus, de la carte macro à l’instruction de travail',
      'Rôles, responsabilités et matrice RACI',
      'Économie de la garantie',
    ],
    coOwn: [
      'Le développement de la plateforme dont les cartes sont tirées, avec l’équipe d’ingénierie du client',
    ],
    collaborate: [
      'Les décisions commerciales (le responsable métier)',
      'L’opération de support et ses notes de revue (le responsable après-vente)',
    ],
    note: 'Le fichier a été construit avec l’aide de l’IA : les corrections issues des revues ont été appliquées par un agent passant par l’intégration Figma, et consignées fil par fil. Les règles de dessin et les niveaux de preuve auxquels il devait obéir avaient été rédigés en premier.',
  },
  approach: {
    heading: 'Des jalons, pas des livrables',
    body: [
      'Chaque étape se terminait par un jalon plutôt que par un document. Les exigences sont issues de cinquante questions directes à choix multiples posées au responsable métier, d’un examen de la marque et des documents sources, et d’un benchmark de neuf concurrents, avec un seul critère de réussite : l’ingénierie peut démarrer sans avoir à reposer la moindre question fondamentale.',
      'Puis un audit de préparation a été mené — et a échoué. Sur 59 sources et 31 processus, il a rendu NOT_READY, avec 12 points bloquants, 4 conflits non résolus et des rôles répartis dans trois taxonomies incohérentes. Le second tour n’a pas contesté le verdict : il a réduit le périmètre aux 13 processus que la marque possède réellement, et un amendement ultérieur l’a élargi à 22, en ajoutant la réception, le diagnostic, la réparation, la livraison de retour et les pièces.',
    ],
    insight:
      'Réduire le périmètre a fait passer la préparation structurelle de 49 % à 78 % et la confiance dans les preuves de 58 % à 92 % — parce que les processus restés dans le périmètre pouvaient être lus dans du code exécutable et des tests qui passent.',
    processHeading: 'Six jalons, dans l’ordre',
    steps: [
      {
        label: 'Exigences',
        note: 'Cinquante questions au responsable métier ; neuf concurrents comparés',
      },
      {
        label: 'Audit de préparation',
        note: 'NOT_READY : 12 points bloquants, 4 conflits, des rôles répartis dans trois taxonomies',
      },
      {
        label: 'Réduction du périmètre',
        note: 'Uniquement les processus que possède la marque ; l’audit relancé sur ce périmètre',
      },
      {
        label: 'Règles de dessin',
        note: 'Une bibliothèque de composants, six règles maison et cinq niveaux de preuve',
      },
      {
        label: 'Architecture',
        note: '22 processus, de la carte macro à l’instruction de travail',
      },
      {
        label: 'Économie',
        note: 'Ce que coûte la promesse de garantie, et qui pourrait la payer',
      },
    ],
  },
  research: {
    heading: 'Dessiner les règles avant les diagrammes',
    body: [
      'Le fichier Figma ne contient aucun écran : l’interface a été spécifiée par écrit, et l’effort de design s’est porté sur la partie que personne ne savait décrire — l’opération. Sa première page n’est pas une couverture mais une page de règles : une bibliothèque de composants en quatorze parties et six règles maison. Le flux se lit de droite à gauche, comme la langue. Les blancs sont marqués « à déterminer », jamais remplis par un nom ou un chiffre deviné. Les conflits sont consignés, pas résolus. La couleur ne porte jamais seule un sens ; elle va toujours avec une forme et une icône.',
      'Une règle détermine la forme de tout le fichier : ce qui peut être dessiné dépend des preuves qui l’étayent, affirmation par affirmation. Cinq niveaux de preuve vont du code exécutable, qui autorise un diagramme en couloirs complet, à l’absence totale de source, pour laquelle le dessin est interdit et seul un avis peut apparaître. Plus le niveau est bas, moins on peut dessiner.',
      'Le fichier est donc honnête sur ses absences. Là où un niveau s’arrête court, un panneau d’avis nomme ce qui manque et pourquoi, et les avis de la carte des services et des diagrammes en couloirs bouclent leur propre calcul pour retomber sur 22. Un diagramme d’une séquence non documentée serait la même invention que les règles interdisent — seulement plus convaincante.',
    ],
    libraryCaption:
      'Page 00 : la bibliothèque à partir de laquelle chaque diagramme est construit — sept formes de flux, une pastille de statut à quatre états et le mobilier qui rend une carte navigable.',
  },
  levels: {
    label: 'Six niveaux',
    heading: 'Un processus, suivi jusqu’au dernier niveau',
    body: [
      'L’architecture compte six niveaux, et chacun répond à une question différente. L’activation de la garantie par le client fait partie des rares processus dessinés à chacun d’eux ; elle montre donc toute la pile. Sur la carte macro, c’est une carte avec un responsable, un livrable et un statut. Au niveau 1, elle devient une carte de bout en bout : déclencheur, responsable, événements de début et de fin, quatre phases, les points de décision, ce qu’elle reçoit et ce qu’elle transmet, les contrôles que le code applique — et un KPI et un SLA marqués « à déterminer », parce qu’aucune source ne contient de formule ni de délai approuvés.',
      'Le niveau 2 est un blueprint de service : les actions du client, les points de contact, et ce que font le personnel et les systèmes de part et d’autre des lignes d’interaction, de visibilité et d’interaction interne, jusqu’aux enregistrements et aux contrôles que laisse chaque étape. Ici, il montre que l’étiquette imprimée dont part le client est un point de contact que le système ne contrôle pas — l’impression se fait en dehors de lui. Le niveau 3 transforme la même séquence en diagramme en couloirs, avec un couloir par acteur.',
      'Les niveaux 4 et 5 s’adressent aux personnes qui l’exécutent. La procédure couvre quatre processus à la fois — procédures et processus ne se correspondent pas un à un — et porte le tampon « non approuvé », avec son approbateur et sa date de revue laissés « à déterminer ». L’instruction de travail, ce sont les sept étapes du client lui-même, avec une liste de contrôle rédigée pour lui : l’alphabet des codes ne contient ni zéro, ni O, ni un, ni I, ni L, si bien que rien sur l’étiquette imprimée ne peut être mal lu.',
    ],
    insight:
      'Chaque niveau a le droit de s’arrêter. Seuls quatorze des 22 processus ont un diagramme en couloirs, et seuls six ont un blueprint ; les autres ont un avis qui dit pourquoi, et les avis bouclent leur propre décompte pour retomber sur 22.',
    l1Caption:
      'Niveau 1 — l’activation de la garantie par le client de bout en bout : déclencheur et responsable, quatre phases qui s’enchaînent de droite à gauche, les points de décision, et un KPI et un SLA qu’aucune source ne définit encore.',
    blueprintCaption:
      'Niveau 2 — le blueprint de service : quatre étapes, de la lecture de l’étiquette à une garantie active, à travers les lignes d’interaction, de visibilité et d’interaction interne.',
    swimlaneCaption:
      'Niveau 3 — le diagramme en couloirs : le client, le système et la passerelle SMS sur trois couloirs, avec l’unique décision qui envoie un code déjà utilisé vers le rejet.',
    procedureCaption:
      'Niveaux 4 et 5 — la procédure des codes d’activation, qui porte le tampon « non approuvé », à côté de l’instruction de travail rédigée pour le client.',
  },
  findings: {
    label: 'Ce que les cartes ont révélé',
    heading: 'Une carte autorisée à revenir incomplète est un instrument de recherche',
    body: [
      'Dessiner l’opération a produit des constats qu’aucun document ne contenait. Sur les quatorze processus dessinés en couloirs, deux seulement envoient un SMS — le code de connexion et l’activation de la garantie —, si bien que les brouillons des textes de messages sont allés exactement dans ces deux cartes. Quatre processus de la carte macro n’ont pas de carte, parce que les sources citées pour eux n’existent pas.',
      'Là où un niveau ne peut pas être dessiné honnêtement, un avis prend sa place. Six instructions de travail ne peuvent pas encore être rédigées, chacune pour une raison nommée : pas de mécanisme de réinitialisation, pas de procédure pour les litiges de propriété, pas de format de numéro de facture, un conflit ouvert, pas de norme pour les photos, pas de politique pour les biens non réclamés. La procédure de qualité des réparations n’a reçu aucun numéro d’instruction de travail — en réserver un pour une procédure dont l’exécutant n’est pas encore déterminé serait déjà une affirmation.',
      'Le fichier s’audite aussi lui-même. Une matrice de couverture met chacun des 22 processus en regard de sa source, des niveaux existants et de ce qui manque : six complets, six incomplets, un en conflit, neuf à déterminer. Elle rouvre trois lacunes qui avaient été marquées comme closes — clos ne veut pas dire résolu par l’organisation — et retire ses propres citations là où une source s’est révélée ne pas dire ce pour quoi elle avait été citée.',
    ],
    noticeCaption:
      'Une absence, dessinée : six instructions de travail qui ne peuvent pas encore être rédigées, chacune avec le mécanisme ou la politique manquante qui la bloque.',
  },
  roles: {
    label: 'Rôles',
    heading: 'La redevabilité est un fait organisationnel, pas technique',
    body: [
      'Huit fiches de rôle exposent, pour chaque rôle, sa finalité, ses tâches, ses droits exclusifs, ses exclusions délibérées et ses lacunes, avec le KPI et le SLA marqués « à déterminer » sur chaque fiche. Certaines fiches sont surtout des questions. Un rôle existe dans le code et dispose d’accès, mais aucun document métier, organigramme ou procédure ne le définit ; son couloir est donc dessiné en pointillés jusqu’à ce que l’entreprise décide s’il est réel ou s’il n’est qu’un autre nom d’un rôle existant.',
      'La matrice des responsabilités ne pouvait être dérivée qu’aux trois quarts. Réalisation, consultation et information sont sorties du code ; l’approbation (le A de RACI) ne le pouvait pas, car le code dit qui peut exécuter une action, pas qui répond de son résultat. La matrice est livrée avec cette colonne ouverte et un bandeau qui le signale, et elle marque en rouge les exclusions délibérées — la séparation des tâches — pour qu’on ne puisse pas les prendre pour des lacunes : le rôle qui fixe le plafond d’annulation ne peut pas approuver d’annulations, car il pourrait relever son propre plafond.',
    ],
    roleCaption:
      'Un rôle qui n’existe que dans le code : chaque champ de sa fiche indique « à déterminer », et le bandeau pose la question à l’entreprise.',
    raciCaption:
      'Les onze premières lignes de la matrice des 22 processus. La colonne principale est livrée vide, et dit pourquoi. Le bandeau énonce la lacune et qui détient la décision ; le nom est masqué ici.',
  },
  decisions: {
    heading: 'Six règles pour dessiner ce que personne ne pouvait confirmer',
    lede: 'L’essentiel de la méthode porte sur ce que le fichier refuse de dessiner.',
    items: [
      {
        title: 'Ne dessiner que jusqu’où vont les preuves',
        why: 'Cinq niveaux de preuve, fixés par affirmation plutôt que par document, décident de ce qui peut être dessiné : le code exécutable autorise un diagramme en couloirs complet, et l’absence totale de source n’autorise qu’un avis. Un diagramme prétend connaître la séquence, les conditions, les chemins d’erreur et les frontières entre couloirs — en dessiner un sans preuves, c’est une invention qui a seulement l’air plus convaincante.',
        alternatives:
          'Dessiner chaque processus à la même profondeur, à partir d’entretiens et d’intentions',
        tradeoff: 'Le fichier paraît inégal : certains processus s’arrêtent à une carte.',
      },
      {
        title: 'Signaler les blancs, ne jamais les deviner',
        why: 'Aucune information métier n’a été inventée. Là où manquait un nom, un chiffre ou un délai, le champ indique « à déterminer » — sur chaque KPI, chaque SLA et la plupart des approbateurs —, afin que les lacunes puissent être comptées et attribuées.',
        alternatives: 'Des valeurs provisoires plausibles',
        tradeoff: 'Les parties prenantes voient beaucoup d’orange.',
      },
      {
        title: 'Consigner les conflits, ne pas les résoudre',
        why: 'Là où deux sources divergeaient, le fichier consigne le conflit et l’endroit où il se trouve au lieu de désigner un gagnant. Une résolution silencieuse aurait été une décision prise au nom de l’entreprise.',
        alternatives: 'Choisir la source la plus probable et passer à la suite',
        tradeoff:
          'Les conflits ouverts restent visibles jusqu’à ce qu’une personne habilitée les clôture.',
      },
      {
        title: 'Laisser la colonne A (approbateur) ouverte',
        why: 'Réalisation, consultation et information pouvaient être lues dans le code ; l’approbation, non. La remplir à partir des permissions aurait confondu qui peut agir et qui répond du résultat.',
        alternatives: 'Déduire l’approbation des permissions du système',
        tradeoff: 'La colonne la plus importante de la matrice est livrée vide.',
      },
      {
        title: 'Le CRM comme verdict par processus, pas comme fonctionnalité',
        why: 'Chaque diagramme en couloirs porte son propre verdict CRM, motivé : un « à ajouter, priorité haute » — un client ne peut annuler une demande que par téléphone —, quatre conditionnels et neuf non nécessaires.',
        alternatives: 'Une intégration CRM partout',
        tradeoff:
          'La feuille de route d’intégration est une liste d’exceptions, pas une promesse de plateforme.',
      },
      {
        title: 'Le persan sur le canevas, l’alphabet latin dans le nom du cadre',
        why: 'Le flux se lit de droite à gauche et chaque libellé visible est en persan, si bien que les cartes se lisent naturellement pour les personnes qui font tourner l’opération ; les identifiants en alphabet latin se trouvent dans les noms des cadres, si bien que chaque planche reste traçable jusqu’au code et aux documents.',
        alternatives: 'Un seul système d’identifiants pour les deux publics',
        tradeoff: 'Deux couches d’identifiants à maintenir en phase.',
      },
    ],
  },
  economics: {
    label: 'Économie',
    heading: 'Une garantie est un passif, pas un service',
    body: [
      'L’opération devait aussi dire ce que coûte sa promesse centrale. Une garantie ne fournit aucun service le jour de son émission — seulement la promesse que, si l’appareil tombe en panne pendant une certaine période, quelqu’un paiera. Si une réclamation viendra, quand, et combien elle coûtera : tout cela est inconnu ce jour-là ; il faut donc mettre de l’argent de côté dès maintenant, sinon la promesse ne repose sur rien.',
      'Le document suit l’engagement de son émission à sa clôture et expose qui pourrait le financer — et chaque réponse dit ce qu’est la marque : si le distributeur absorbe le coût, un centre de coûts ; si les vendeurs achètent les codes, une activité indépendante ; si l’importateur paie, un partenaire qui gère le réseau. La recommandation porte la mention « une proposition, pas une décision ».',
      'Il se termine par des leviers de contrôle classés par coût — le moins cher est un simple champ — et par dix décisions avec leurs responsables et leurs options, dont huit peuvent être prises dès aujourd’hui sans le moindre chiffre.',
    ],
    insight:
      'Les seuls chiffres admis dans le document sont ceux extraits du code, une hypothèse présentée comme telle, ou un benchmark externe avec sa source, sa population, sa date et son niveau de confiance — et chaque diapositive porte une pastille qui indique lequel.',
    promiseCaption:
      'Le document s’ouvre sur le concept : le jour de son émission, une garantie, ce sont trois inconnues — si une réclamation viendra, quand, et à quel coût.',
    controlsCaption:
      'Cinq leviers de contrôle, classés du moins cher au plus coûteux, chacun rattaché au facteur de l’équation de coût sur lequel il agit.',
  },
  outcomes: {
    heading: 'Une opération dessinée, chaque lacune avec son responsable',
    intro:
      'Il n’y a pas d’indicateurs métier, et il ne devrait pas y en avoir : le produit est en préproduction, et les mesures convenues n’ont encore ni formule validée ni source de données. Ce que le travail a changé, c’est ce que l’organisation sait d’elle-même. En juillet, il n’existait aucune description écrite de l’opération d’après-vente ; il en existe désormais une description dessinée, où chaque lacune est signalée, comptée et attribuée — et les trois points qui bloquent l’intégration sont nommés comme des décisions, pas comme de l’ingénierie.',
    delivered: [
      {
        label: '22 processus sur six niveaux',
        context:
          'Carte macro, cartes de bout en bout, blueprints de service, diagrammes en couloirs, procédures et instructions de travail — 145 planches sur 13 pages.',
      },
      {
        label: 'Un modèle des rôles et une matrice RACI',
        context:
          'Huit fiches de rôle et une matrice de 22 processus, avec les exclusions délibérées signalées et la colonne ouverte reconnue comme telle.',
      },
      {
        label: 'Une matrice de couverture qui s’audite elle-même',
        context:
          'Chaque processus mis en regard de sa source, de ses niveaux et de ce qui manque ; des lacunes closes rouvertes et des citations corrigées.',
      },
      {
        label: 'Un modèle d’économie de la garantie',
        context:
          'Passif, financement et leviers de contrôle, exposés sans un seul chiffre inventé.',
      },
    ],
    shipped: [
      'Audit de préparation',
      'Carte macro des processus',
      'Blueprints de service',
      'Diagrammes en couloirs et procédures',
      'Rôles et matrice RACI',
      'Document sur l’économie de la garantie',
    ],
  },
  lessons: {
    heading: 'Une seule discipline, sur chaque planche',
    items: [
      {
        title: 'Publier la lacune vaut mieux que la masquer',
        body: 'Le même réflexe traverse chaque livrable : NOT_READY au lieu d’un pourcentage, « à déterminer » sur les cartes de processus, une colonne A (approbateur) vide avec un bandeau qui le signale, et une pastille de preuve sur chaque diapositive.',
      },
      {
        title: 'Une carte autorisée à revenir incomplète est un instrument de recherche',
        body: 'Dessiner ce que personne ne savait décrire a produit des constats qu’aucun document ne contenait : quels processus envoient réellement des messages au client, quels rôles n’existent que dans le code, quelle colonne ne peut pas être remplie à partir des permissions. Une carte qui doit paraître finie est une décoration.',
      },
      {
        title: 'Un score de préparation ne veut rien dire tant que le périmètre n’est pas honnête',
        body: 'Le premier audit a échoué parce qu’il mesurait une opération que ce produit ne possède pas. Le restreindre aux processus que possède la marque n’a pas abaissé l’exigence — cela a porté la confiance dans les preuves à 92 %.',
      },
      {
        title: 'Transformer chaque commentaire de revue en règle',
        body: 'Répondre à un commentaire corrige un nœud ; nommer la règle qui le sous-tend corrige tous les suivants. Une remarque sur l’orthographe persane est devenue une règle nommée et une passe unique sur 1 088 nœuds de texte, sur les treize pages.',
      },
    ],
  },
}

const JA: YarCopy = {
  statement:
    '誰も書き留めてこなかったアフターサービス業務を、マクロマップから作業手順書まで、証拠が許す範囲でだけ図にした。',
  industry: '小売 · アフターサービスと保証',
  team: 'リードサービスデザイナー兼プロセスアーキテクト。クライアントの事業部門とアフターサービス部門の責任者、そしてエンジニアリングチームとともに',
  heroCaption:
    'マクロプロセスマップ。5つのレーンに18のプロセスが並び、各カードに担当者、アウトプット、ステータスバッジが付く。',
  snapshot: {
    problem:
      'ブランドを支えるアフターサービス業務は一度も文書化されておらず、その根拠として挙げられた資料はどこにも存在しなかった。',
    role: 'リードサービスデザイナー兼プロセスアーキテクト：準備度の監査、145ボードのプロセスアーキテクチャ、役割モデル、そして保証の経済性。',
    result:
      '業務を初めて図として描いた記録。空白は埋めずに、すべて明示して担当者を割り当てた。事業指標はまだない。',
  },
  alt: {
    cover:
      'Yaravan — ペルシア語の、保証有効化のサービスブループリント。顧客の行動、タッチポイント、そして相互作用線と可視線',
    map: 'Yaravan — ペルシア語のマクロプロセスマップ。5つのレーンに18のプロセスカードが並び、それぞれにステータスバッジが付く。数の内訳を締めくくる注記も添えている',
    library:
      'Yaravan — 図のコンポーネントライブラリ。7つのフロー図形、4状態のステータスバッジ、レーンの見出し、パンくずリスト、プロセスカード',
    l1: 'Yaravan — ペルシア語の、顧客による保証有効化のエンドツーエンドカード。トリガー、担当者、フェーズ、判断ゲート、インプットとアウトプット、統制、そして「要確定」と記されたKPIとSLA',
    blueprint:
      'Yaravan — ペルシア語の、顧客による保証有効化のサービスブループリント。顧客の行動から証跡までの層にまたがる4つのステップを、相互作用線、可視線、内部相互作用線が区切る',
    swimlane:
      'Yaravan — ペルシア語の、顧客による保証有効化のスイムレーン。顧客、システム、SMSの3つのレーンに、1つの分岐と2つの終了状態',
    sop: 'Yaravan — ペルシア語の、有効化コードに関する業務手順書の識別カード。バージョン0.3の草案、「要確定」の承認者とレビュー日、そして「未承認」のステータス',
    wi: 'Yaravan — ペルシア語の、保証コードを有効化するための作業手順書。識別情報、前提条件、パネル上の経路、番号付きの7つのステップ',
    notice:
      'Yaravan — ペルシア語の注記ボード。まだ書けない作業手順書と、それぞれの理由を挙げている',
    role: 'Yaravan — ペルシア語の、保証業務の役割カード。この役割はコードには存在するが、どの業務文書にも存在しないと告げる赤いバナーと、すべて「要確定」と記された項目',
    raci: 'Yaravan — ペルシア語のRACIマトリクス。赤いバナーがAccountable（説明責任者）の列を未決と示し、意図的な除外は赤いセルで示す',
    promise:
      'Yaravan保証の経済性 — ペルシア語のスライド。保証とは約束であり、発行の時点で3つの不明点がある — 発生するか、いつか、いくらか',
    controls:
      'Yaravan保証の経済性 — ペルシア語で示した5つの管理レバー。最も安いものから最も高いものへ並び、それぞれに現在の状況が付く',
  },
  context: {
    heading: '眠っていたアイデンティティと、文書化されていない業務',
    body: [
      'Yaravanは、イランの携帯電話小売企業の保証・アフターサービスブランドである。2024年に外部のエージェンシーがブランドアイデンティティを作ったが、その上には何も築かれなかった。2026年7月からの仕事は、それを動くサービスに変えることだった。公開ウェブサイト、カスタマーパネル、スタッフパネル — そしてその根底で、ブランドの約束を守らなければならない業務である。',
      '既存のサポートシステムは、チケットの処理待ち列と修理業務を引き続き担う。Yaravanが所有するプロセスについては、関係が逆になる。Yaravanが業務の基準となり、サポートシステムはプロセスを実行するのではなく記録する。このケーススタディが扱うのはその業務であり、その上に築いた製品は別のケーススタディで紹介している。',
    ],
  },
  problem: {
    heading: '現状の記録ではなく、望ましい状態の設計',
    body: [
      '業務はこれまで一度も文書化されていなかった。要件定義と機能仕様書はどちらも、実際のチケット処理、修理、保証のプロセスの出典として2つの資料 — アフターサービスの要件定義書とCRMのプロセス報告書 — を挙げていた。そのどちらも、どのリポジトリにも存在しなかった。',
      'そのため、どのプロセスマップも現状の記録ではなく、望ましい状態の設計にならざるをえず、プロセス一式はその警告を冒頭のページに掲げている。一方で、ブランドが公に掲げる約束はすでに業務の実態を追い越していた。要件定義の作業で、旧サイトの主要な主張が業務上の事実ではないこと、そして実際の保証データベースが存在しないことがわかった。',
      'そこから、業務に向けたデザインの問いが定まった。まだ誰も確認できないプロセスを、創作せずにどう描くのか。',
    ],
  },
  audit: {
    text: '「NOT_READYを、いかなる肯定的な割合や楽観的な説明で置き換えてはならない。」',
    attribution: '入力準備度の監査、第1ラウンド',
    method: '監査の実施前に、監査そのものに書き込まれたルール',
  },
  ownership: {
    heading: 'クライアントのチームとともに、仕事を率いる',
    intro:
      '私はサービスデザイン — 準備度の監査、プロセスアーキテクチャ、役割モデル、保証の経済性 — を率いた。事業上の責任はクライアント側に残った。事業部門の責任者が商業上の判断を担い、アフターサービス部門の責任者がサポート業務を担って、マップをレビューした。',
    own: [
      '要件と範囲',
      '入力準備度の監査',
      'マクロマップから作業手順書までのプロセスアーキテクチャ',
      '役割、責任、RACI',
      '保証の経済性',
    ],
    coOwn: [
      'マップの読み取り元となったプラットフォームの実装（クライアントのエンジニアリングチームと共同）',
    ],
    collaborate: [
      '商業上の判断（事業部門の責任者）',
      'サポート業務とそのレビューノート（アフターサービス部門の責任者）',
    ],
    note: 'ファイルはAIの支援を受けて作成した。レビューによる修正は、Figmaとの連携を通じて作業するエージェントが適用し、スレッドごとに記録した。エージェントが従うべき作図ルールと証拠の段階は、それより先に書かれていた。',
  },
  approach: {
    heading: '成果物ではなく、関門',
    body: [
      '各工程は文書ではなく関門で終わった。要件は、事業部門の責任者に向けた50の直接的な選択式の質問、ブランドと元資料のレビュー、そして競合9社のベンチマークから得たもので、成功の基準は一つ。エンジニアリングが根本的な問いを一つも聞き直さずに着手できることである。',
      'そこで準備度の監査を実施し、結果は不合格だった。59の情報源と31のプロセスを対象に、判定はNOT_READY。阻害要因は12、未解決の矛盾は4つ、役割は互いに食い違う3つの分類体系に分かれていた。第2ラウンドは判定に反論しなかった。範囲をブランドが実際に所有する13のプロセスに絞り、その後の修正で受付、診断、修理、返送、部品を加えて22まで広げた。',
    ],
    insight:
      '範囲を絞ったことで、構造面の準備度は49%から78%に、証拠の信頼度は58%から92%に上がった。範囲に残ったプロセスは、実行可能なコードと合格したテストから読み取れたからである。',
    processHeading: '6つの関門を、順に',
    steps: [
      {
        label: '要件定義',
        note: '事業部門の責任者への50の質問。競合9社をベンチマーク',
      },
      {
        label: '準備度の監査',
        note: 'NOT_READY：阻害要因12、矛盾4、役割は3つの分類体系に分散',
      },
      {
        label: '範囲の絞り込み',
        note: 'ブランドが所有するプロセスだけに絞り、その範囲で監査を再実施',
      },
      {
        label: '作図ルール',
        note: 'コンポーネントライブラリ、6つのハウスルール、5段階の証拠',
      },
      {
        label: 'アーキテクチャ',
        note: 'マクロマップから作業手順書まで、22のプロセスを図示',
      },
      {
        label: '経済性',
        note: '保証という約束にいくらかかり、誰が負担しうるか',
      },
    ],
  },
  research: {
    heading: '図を描く前に、ルールを描く',
    body: [
      'Figmaファイルには画面が一つもない。インターフェースは文章で仕様化し、デザインの労力は誰も説明できなかった部分、つまり業務に注いだ。最初のページは表紙ではなくルールのページで、14の部品からなるコンポーネントライブラリと6つのハウスルールが置かれている。フローは言語と同じく右から左へ流れる。空白には「要確定」と記し、推測した名前や数字で埋めることはない。矛盾は解消せずに記録する。色だけで意味を伝えることはなく、必ず形とアイコンを伴わせる。',
      'ファイル全体の形を決めるルールが一つある。何を描いてよいかは、主張ごとに、その裏付けとなる証拠で決まる。証拠は5段階に分かれ、最上位の実行可能なコードならスイムレーンを完全に描けるが、最下位の根拠がまったくないものは描くことが禁じられ、注記だけが許される。段階が低いほど、描いてよいものは少なくなる。',
      'だからファイルは、欠けているものについて正直である。ある階層が途中で止まる箇所では、注記ボードが何が欠けていて、なぜなのかを示す。サービスマップとスイムレーンの注記は、自らの数の内訳を22に合わせて締めくくる。文書化されていない手順を図にすれば、ルールが禁じる創作と同じものになる。ただ、より説得力があるだけだ。',
    ],
    libraryCaption:
      'ページ00：すべての図の元になるライブラリ。7つのフロー図形、4状態のステータスバッジ、そしてマップを見て回れるようにする備品。',
  },
  levels: {
    label: '6つの階層',
    heading: '一つのプロセスを、最下層までたどる',
    body: [
      'アーキテクチャには6つの階層があり、それぞれが異なる問いに答える。顧客による保証の有効化は、そのすべての階層で描かれた数少ないプロセスの一つであり、全体の積み重なりを示してくれる。マクロマップ上では、担当者、アウトプット、ステータスを持つ1枚のカードである。レベル1ではエンドツーエンドのカードになる。トリガー、担当者、開始と終了のイベント、4つのフェーズ、判断ゲート、受け取るものと引き渡すもの、コードが強制する統制 — そして「要確定」と記されたKPIとSLAである。承認された計算式も時間も、どの情報源にも存在しないからだ。',
      'レベル2はサービスブループリントである。顧客の行動、タッチポイント、そして相互作用線、可視線、内部相互作用線のそれぞれの側でスタッフとシステムが行うことを、各ステップが残す記録と統制まで描く。ここでは、顧客が出発点とする印刷ラベルが、システムの管理外にあるタッチポイントであることがわかる。印刷はシステムの外で行われるからだ。レベル3は、同じ手順をアクターごとのレーンを持つスイムレーンに変える。',
      'レベル4と5は、それを運用する人のためのものだ。業務手順書は4つのプロセスを一度に扱い — 業務手順書とプロセスは一対一ではない — 「未承認」の印が押され、承認者とレビュー日は「要確定」のまま残されている。作業手順書は顧客自身が行う7つのステップで、顧客のために書かれたチェックリストが付く。コードに使う文字には0、O、1、I、Lが含まれないため、印刷ラベル上の文字を読み違えることはない。',
    ],
    insight:
      'どの階層も、途中で止まることが許されている。22のプロセスのうちスイムレーンがあるのは14だけ、ブループリントがあるのは6つだけで、残りにはその理由を述べる注記がある。そして注記は、自らの数の内訳を22に合わせて締めくくる。',
    l1Caption:
      'レベル1 — 顧客による保証の有効化をエンドツーエンドで。トリガーと担当者、右から左へ流れる4つのフェーズ、判断ゲート、そしてまだどの情報源も定義していないKPIとSLA。',
    blueprintCaption:
      'レベル2 — サービスブループリント。ラベルを読むところから保証が有効になるまでの4つのステップが、相互作用線、可視線、内部相互作用線をまたいで並ぶ。',
    swimlaneCaption:
      'レベル3 — スイムレーン。顧客、システム、SMSゲートウェイの3つのレーンと、使用済みのコードを却下へ送る唯一の分岐。',
    procedureCaption:
      'レベル4と5 — 「未承認」の印が押された有効化コードの業務手順書と、その隣に並ぶ、顧客のために書かれた作業手順書。',
  },
  findings: {
    label: 'マップが見つけたこと',
    heading: '不完全なまま戻ってきてよいマップは、調査の道具になる',
    body: [
      '業務を図にしたことで、どの文書にもなかった発見が生まれた。スイムレーンとして描いた14のプロセスのうち、そもそもSMSを送るのは2つだけ — ログインコードと保証の有効化 — だった。そのため、メッセージ文面の草案はちょうどその2つのマップに入れた。マクロマップ上の4つのプロセスにはカードがない。根拠として挙げられた資料が存在しないからである。',
      'ある階層を正直に描けない箇所では、注記がその代わりを務める。6つの作業手順書はまだ書けず、それぞれに名指しされた理由がある。リセットの仕組みがない、所有権をめぐる争いの経路がない、請求書番号の書式がない、未解決の矛盾がある、写真の基準がない、引き取られない品物についての方針がない。修理品質の業務手順書には、作業手順書の番号をまったく割り当てなかった。実施者がまだ決まっていない手順のために番号を確保すること自体が、一つの主張になってしまうからだ。',
      'ファイルは自らを監査してもいる。カバレッジマトリクスは22のプロセスそれぞれを、その情報源、存在する階層、欠けているものと照らし合わせる。完了が6、不完全が6、矛盾が1、要確定が9。クローズ済みとされていた3つの空白を再び開いている — クローズ済みであることは、組織によって解決されたことと同じではない。そして、情報源が引用された内容を実際には述べていなかった箇所では、自らの引用を取り下げている。',
    ],
    noticeCaption:
      '描かれた欠落。まだ書けない6つの作業手順書と、それぞれを阻んでいる欠けた仕組みや方針。',
  },
  roles: {
    label: '役割',
    heading: '説明責任は、技術上の事実ではなく組織上の事実である',
    body: [
      '8枚の役割カードが、各役割の目的、職務、固有の権限、意図的な除外、空白を示し、どのカードでもKPIとSLAは「要確定」と記されている。問いがほとんどを占めるカードもある。ある役割はコードに存在し、アクセス権も持っているが、どの業務文書、組織図、業務手順書もそれを定義していない。そのため、それが実在する役割なのか、既存の役割の別名なのかを事業側が決めるまで、そのレーンは破線で描かれている。',
      '責任分担マトリクスは、4分の3までしか導けなかった。Responsible（実行責任者）、Consulted（相談先）、Informed（報告先）はコードから導けたが、Accountable（説明責任者）は導けなかった。コードが語るのは誰が操作を実行できるかであって、誰がその結果に責任を負うかではないからだ。マトリクスはその列を空けたまま、そう明記したバナーを付けて公開され、意図的な除外 — 職務の分離 — を赤で示して、空白と取り違えられないようにしている。取り消しの上限額を設定する役割は、取り消しを承認できない。自分の上限を自分で引き上げられてしまうからである。',
    ],
    roleCaption:
      'コードの中にだけ存在する役割。カードのすべての項目が「要確定」となっており、バナーがその問いを事業側に投げかけている。',
    raciCaption:
      '22プロセスのマトリクスの最初の11行。主要な列は空のまま公開され、その理由を述べている。バナーは空白と、その判断を握る人を示す。名前はここでは伏せている。',
  },
  decisions: {
    heading: '誰も確認できなかったものを描くための6つのルール',
    lede: '手法の大半は、ファイルが描くことを拒むものに関わる。',
    items: [
      {
        title: '証拠が届く範囲までしか描かない',
        why: '文書ごとではなく主張ごとに定めた5段階の証拠が、何を描いてよいかを決める。実行可能なコードならスイムレーンを完全に描けるが、根拠がまったくなければ注記しか許されない。図は、手順、条件、エラー時の経路、レーンの境界を知っていると主張するものであり、証拠なしにそれを描くのは、より説得力があるように見えるだけの創作である。',
        alternatives: 'インタビューと意図をもとに、すべてのプロセスを同じ深さまで描く',
        tradeoff: 'ファイルは不揃いに見える。カードの段階で止まるプロセスもある。',
      },
      {
        title: '空白は明示し、決して推測で埋めない',
        why: '事業上の情報は何一つ創作していない。名前、数字、時間が欠けている箇所では、その項目は「要確定」となる — すべてのKPI、すべてのSLA、そして大半の承認者について。そうすることで、空白を数え、担当者を割り当てられる。',
        alternatives: 'もっともらしい仮の値',
        tradeoff: 'ステークホルダーは大量のオレンジを目にする。',
      },
      {
        title: '矛盾は解消せず、記録する',
        why: '2つの情報源が食い違う箇所では、ファイルはどちらかを勝たせるのではなく、矛盾とその所在を記録する。黙って解消すれば、事業側に代わって判断を下すことになっていた。',
        alternatives: 'より確からしい情報源を選んで先へ進む',
        tradeoff: '権限を持つ誰かが閉じるまで、未解決の矛盾は見えたまま残る。',
      },
      {
        title: 'Accountableの列を空けておく',
        why: 'Responsible、Consulted、Informedはコードから読み取れたが、Accountableは読み取れなかった。権限をもとにそれを埋めれば、誰が操作できるかと、誰が結果に責任を負うかを混同することになっていた。',
        alternatives: 'システムの権限から説明責任を推定する',
        tradeoff: 'マトリクスで最も重要な列が、空のまま公開される。',
      },
      {
        title: 'CRMは機能ではなく、プロセスごとの判定として',
        why: '各スイムレーンには、理由を添えたそれぞれのCRM判定が付いている。「追加・高優先度」が1つ（顧客がリクエストを取り消すには電話するしかないため）、条件付きが4つ、不要が9つである。',
        alternatives: 'あらゆる箇所でのCRM連携',
        tradeoff:
          '連携のロードマップは、プラットフォームとしての約束ではなく、例外のリストになる。',
      },
      {
        title: 'キャンバスにはペルシア語、フレーム名にはラテン文字',
        why: 'フローは右から左へ流れ、目に見えるラベルはすべてペルシア語なので、業務を運用する人にとってマップは母語で自然に読める。ラテン文字のIDはフレーム名に置いてあるので、どのボードもコードと文書までたどれる。',
        alternatives: '両方の読み手に向けた一つのID体系',
        tradeoff: '足並みをそろえ続けるべきIDの層が2つになる。',
      },
    ],
  },
  economics: {
    label: '経済性',
    heading: '保証はサービスではなく、負債である',
    body: [
      '業務は、その中心にある約束にいくらかかるのかにも答えなければならなかった。保証は、発行された日には何のサービスも提供しない。あるのは、一定期間内に端末が故障すれば誰かが支払うという約束だけだ。請求が来るのか、いつ来るのか、いくらかかるのかは、その日にはすべて不明である。だから今のうちに資金を取り置かなければ、約束の裏付けは何もなくなる。',
      '資料は、その債務を発行から終結までたどり、誰がそれを賄いうるかを示す。そして、それぞれの答えがブランドの正体を語る。小売企業がコストを吸収するならコストセンター、販売者がコードを買うなら独立した事業、輸入業者が支払うならネットワークを運営するパートナーである。推奨には「決定ではなく提案」と明記している。',
      '資料の結びは、コスト順に並べた管理策 — 最も安いものはフィールド一つ — と、担当者と選択肢を付けた10の判断で、そのうち8つは数字が一つもなくても今日下せる。',
    ],
    insight:
      '資料で使ってよい数字は、コードから抽出したもの、仮定であると明示した仮定、あるいは出典、母集団、日付、信頼度を添えた外部のベンチマークに限られる。そして、どのスライドにもそのどれかを示すバッジが付いている。',
    promiseCaption:
      '資料は概念から始まる。発行された日の保証は、3つの不明点そのものである — 請求が来るのか、いつ来るのか、いくらかかるのか。',
    controlsCaption:
      '最も安いものから最も高いものへ並べた5つの管理レバー。それぞれが、コスト方程式のどの要素を動かすかに結びついている。',
  },
  outcomes: {
    heading: '図として描かれた業務と、担当者の決まった空白',
    intro:
      '事業指標はないし、あるべきでもない。製品はステージング環境にあり、合意した指標にはまだ承認された計算式もデータソースもない。この仕事が変えたのは、組織が自らについて知っていることだ。7月の時点では、アフターサービス業務を記した文書は存在しなかった。今は図として描かれた記録があり、すべての空白が明示され、数えられ、担当者が割り当てられている。そして連携を阻んでいる3つの項目は、エンジニアリングではなく判断の問題として名指しされている。',
    delivered: [
      {
        label: '6つの階層にわたる22のプロセス',
        context:
          'マクロマップ、エンドツーエンドカード、サービスブループリント、スイムレーン、業務手順書、作業手順書。13ページに145のボード。',
      },
      {
        label: '役割モデルとRACI',
        context:
          '8枚の役割カードと22プロセスのマトリクス。意図的な除外を明示し、未決の列があることも認めている。',
      },
      {
        label: '自らを監査するカバレッジマトリクス',
        context:
          'すべてのプロセスを、その情報源、階層、欠けているものと照合。クローズ済みの空白を再び開き、引用を訂正した。',
      },
      {
        label: '保証の経済性モデル',
        context: '負債、資金、管理策を、創作した数字を一つも使わずに示した。',
      },
    ],
    shipped: [
      '準備度の監査',
      'マクロプロセスマップ',
      'サービスブループリント',
      'スイムレーンと業務手順書',
      '役割とRACI',
      '保証の経済性の資料',
    ],
  },
  lessons: {
    heading: 'ひとつの規律を、すべてのボードに',
    items: [
      {
        title: '空白は、取り繕うより公開するほうがいい',
        body: '同じ姿勢はすべての成果物に通じている。割合の代わりのNOT_READY、プロセスカードの「要確定」、そう明記したバナー付きの空のAccountable列、そしてすべてのスライドに付いた証拠のバッジ。',
      },
      {
        title: '不完全なまま戻ってきてよいマップは、調査の道具になる',
        body: '誰も説明できなかったものを図にしたことが、どの文書にもなかった発見を生んだ。実際に顧客へメッセージを送るのはどのプロセスか、コードの中にだけ存在する役割はどれか、権限からは埋められない列はどれか。完成して見えなければならないマップは、飾りにすぎない。',
      },
      {
        title: '準備度のスコアは、範囲が正直になるまで何の意味もない',
        body: '最初の監査が不合格だったのは、この製品が所有していない業務を測っていたからである。ブランドが所有するプロセスに対象を絞っても、基準は下がらなかった。むしろ証拠の信頼度は92%まで上がった。',
      },
      {
        title: 'レビューのコメントを、一つずつルールに変える',
        body: 'コメントに答えれば一つのノードが直る。その背後にあるルールに名前を付ければ、この先のすべてのノードが直る。ペルシア語の綴りについての一つの指摘が、名前の付いたルールになり、13ページすべての1,088のテキストノードを一度で見直すことにつながった。',
      },
    ],
  },
}

const COPY: Record<Locale, YarCopy> = { en: EN, fa: FA, ar: AR, es: ES, de: DE, fr: FR, ja: JA }

export const YAR_MEDIA = Object.fromEntries(
  (Object.keys(MEDIA_FILES) as YarMediaKey[]).map((key) => [
    key,
    {
      ...MEDIA_FILES[key],
      alt: Object.fromEntries(LOCALES.map((locale) => [locale, COPY[locale].alt[key]])),
    },
  ]),
) as Record<YarMediaKey, MediaSpec>

const PROCESS_CODES: Six = ['REQ', 'AUD', 'SCOP', 'RULE', 'MAP', 'ECON']

/**
 * The block rows. Until 2026-09-26 this project held a different 21-row layout, and a localized
 * leaf inside a block array is kept by row position, so every optional localized leaf is written
 * explicitly (an empty `insight`, `caption` or `annotations`) rather than left out.
 */
export function yarSections(locale: Locale, media: YarMediaIds): Sections {
  const c = COPY[locale]
  const dir = dirFor(locale)
  const items = (...rows: [YarMediaKey, string][]) =>
    rows.flatMap(([key, id]) => (media[key] ? [{ id, media: media[key]!, caption: '' }] : []))
  const pad = (n: number) => String(n).padStart(2, '0')
  const body = (paragraphs: readonly string[]) =>
    prose(dir, ...paragraphs.map((value) => paragraph(value, dir)))

  return [
    {
      id: 'yar-s01',
      blockType: 'csNarrative',
      label: 'context',
      heading: c.context.heading,
      body: body(c.context.body),
      insight: '',
    },
    {
      id: 'yar-s02',
      blockType: 'csNarrative',
      label: 'problem',
      heading: c.problem.heading,
      body: body(c.problem.body),
      insight: '',
    },
    {
      id: 'yar-s03',
      blockType: 'csOwnership',
      heading: c.ownership.heading,
      intro: c.ownership.intro,
      own: c.ownership.own,
      coOwn: c.ownership.coOwn,
      collaborate: c.ownership.collaborate,
      note: c.ownership.note,
    },
    {
      id: 'yar-s04',
      blockType: 'csNarrative',
      label: 'approach',
      heading: c.approach.heading,
      body: body(c.approach.body),
      insight: c.approach.insight,
    },
    {
      id: 'yar-s05',
      blockType: 'csFinding',
      kind: 'quote',
      text: c.audit.text,
      attribution: c.audit.attribution,
      method: c.audit.method,
    },
    {
      id: 'yar-s06',
      blockType: 'csProcess',
      kind: 'process',
      heading: c.approach.processHeading,
      steps: c.approach.steps.map((step, index) => ({
        id: `yar-p${pad(index + 1)}`,
        code: PROCESS_CODES[index],
        label: step.label,
        note: step.note,
      })),
    },
    {
      id: 'yar-s07',
      blockType: 'csNarrative',
      label: 'research',
      heading: c.research.heading,
      body: body(c.research.body),
      insight: '',
    },
    {
      id: 'yar-s08',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'diagram',
      items: items(['library', 'yar-f08-1']),
      annotations: [],
      caption: c.research.libraryCaption,
    },
    {
      id: 'yar-s09',
      blockType: 'csNarrative',
      label: 'custom',
      customLabel: c.levels.label,
      heading: c.levels.heading,
      body: body(c.levels.body),
      insight: c.levels.insight,
    },
    {
      id: 'yar-s10',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'diagram',
      items: items(['l1', 'yar-f10-1']),
      annotations: [],
      caption: c.levels.l1Caption,
    },
    {
      id: 'yar-s11',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'diagram',
      items: items(['blueprint', 'yar-f11-1']),
      annotations: [],
      caption: c.levels.blueprintCaption,
    },
    {
      id: 'yar-s12',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'diagram',
      items: items(['swimlane', 'yar-f12-1']),
      annotations: [],
      caption: c.levels.swimlaneCaption,
    },
    {
      id: 'yar-s13',
      blockType: 'csFigure',
      layout: 'split',
      treatment: 'diagram',
      items: items(['sop', 'yar-f13-1'], ['wi', 'yar-f13-2']),
      annotations: [],
      caption: c.levels.procedureCaption,
    },
    {
      id: 'yar-s14',
      blockType: 'csNarrative',
      label: 'custom',
      customLabel: c.findings.label,
      heading: c.findings.heading,
      body: body(c.findings.body),
      insight: '',
    },
    {
      id: 'yar-s15',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'diagram',
      items: items(['notice', 'yar-f15-1']),
      annotations: [],
      caption: c.findings.noticeCaption,
    },
    {
      id: 'yar-s16',
      blockType: 'csNarrative',
      label: 'custom',
      customLabel: c.roles.label,
      heading: c.roles.heading,
      body: body(c.roles.body),
      insight: '',
    },
    {
      id: 'yar-s17',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'diagram',
      items: items(['role', 'yar-f17-1']),
      annotations: [],
      caption: c.roles.roleCaption,
    },
    {
      id: 'yar-s18',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'diagram',
      items: items(['raci', 'yar-f18-1']),
      annotations: [],
      caption: c.roles.raciCaption,
    },
    {
      id: 'yar-s19',
      blockType: 'csDecisions',
      heading: c.decisions.heading,
      lede: c.decisions.lede,
      items: c.decisions.items.map((decision, index) => ({
        id: `yar-d${pad(index + 1)}`,
        title: decision.title,
        why: decision.why,
        alternatives: decision.alternatives,
        tradeoff: decision.tradeoff,
        evidence: '',
      })),
    },
    {
      id: 'yar-s20',
      blockType: 'csNarrative',
      label: 'custom',
      customLabel: c.economics.label,
      heading: c.economics.heading,
      body: body(c.economics.body),
      insight: c.economics.insight,
    },
    {
      id: 'yar-s21',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'plain',
      items: items(['promise', 'yar-f21-1']),
      annotations: [],
      caption: c.economics.promiseCaption,
    },
    {
      id: 'yar-s22',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'plain',
      items: items(['controls', 'yar-f22-1']),
      annotations: [],
      caption: c.economics.controlsCaption,
    },
    {
      id: 'yar-s23',
      blockType: 'csOutcomes',
      heading: c.outcomes.heading,
      intro: c.outcomes.intro,
      items: c.outcomes.delivered.map((outcome, index) => ({
        id: `yar-o${pad(index + 1)}`,
        kind: 'delivered' as const,
        label: outcome.label,
        context: outcome.context,
      })),
      shipped: c.outcomes.shipped,
    },
    {
      id: 'yar-s24',
      blockType: 'csLessons',
      heading: c.lessons.heading,
      items: c.lessons.items.map((lesson, index) => ({
        id: `yar-l${pad(index + 1)}`,
        title: lesson.title,
        body: lesson.body,
      })),
    },
  ]
}

export function yarLocalizedFields(locale: Locale, media: YarMediaIds) {
  const c = COPY[locale]
  const identity = ARCHIVE.text(locale)
  return {
    ...identity,
    statement: c.statement,
    industry: c.industry,
    team: c.team,
    hero: {
      items: media.map ? [{ id: 'yar-h01', media: media.map }] : [],
      caption: c.heroCaption,
    },
    snapshot: c.snapshot,
    sections: yarSections(locale, media),
    meta: {
      title: identity.title,
      description: identity.summary,
      ...(media.cover ? { image: media.cover } : {}),
    },
  }
}

export const YAR_SHARED_FIELDS: Pick<Project, 'projectStatus' | 'tools' | 'period'> = {
  projectStatus: 'pre-launch',
  tools: ['Figma', 'Obsidian'],
  period: { start: '2026-07-01T00:00:00.000Z' },
}
