# Project showcase and case study roadmap

**Last reconciled with the local site:** 25 September 2026 (`http://localhost:3000/fa`)  
**Scope:** 37 independent project records in the public work archive. Digikala activities DGK-02–07 are chapters of Digital Gold, not six additional project records.

This is the starting point for anyone working on project coverage. The [inventory](Experience/Inventory.md) records candidate history, each linked project README records source material and open questions, `src/endpoints/seed/projects.ts` supplies archive data, and `src/endpoints/seed/case-studies/index.ts` lists case studies that the seed process actually publishes. Reconcile this file after content or publication changes.

## Publish-first policy

**Show the work wherever a truthful public version is possible.** A missing date, metric, final screenshot, cover, analytics decision, or last checklist item does **not** by itself block an archive entry or a case study. A source README marked `draft` does not automatically mean its site content must stay unpublished; several current case studies are already public while their source README is still `draft`.

An unresolved question gates only the specific claim or asset it affects. Omit an unverified metric; say “designed” rather than “launched” when launch is unknown; describe a concept as a concept; crop or replace a sensitive image; anonymize a client when naming is not cleared. Publish the remaining supported story, then keep the missing detail on this roadmap.

A **hard publication gate** applies only where we cannot yet state a truthful, safe public account of the person's role and work, or cannot safely show the proposed name, claim, or asset. Resolve the issue by confirming, narrowing, anonymizing, or removing the affected material. Do not hold unrelated, supportable content hostage to it. Do not run seeds against production without following the deployment runbook.

## Current coverage

| Measure | Current state |
|---|---:|
| Public Persian archive records | 37 |
| Public case study pages | 8 |
| Archive records without a public case study | 29 |
| Project-level source READMEs | 26: 24 `draft`, 1 `review`, 1 `ready` |
| Project records without a project-level README | 11 |
| Source READMEs without a public case study | 18 |
| Authored case study seed not registered for publication | 1: Marqevon |

All eight public Persian case study URLs returned HTTP 200 and included a title, content sections, and images in server-rendered HTML. **Visual quality is not yet signed off.** Mobile and desktop layout, real image loading and cropping, content accuracy, and editorial quality still need review. In the live Persian API, `translationReviewed` was `false` for all eight; this is an editorial follow-up, not a reason to remove supported work from the site.

**Status key:** `draft` / `review` / `ready` is the source README's frontmatter status, not the CMS publication status. `Public (N)` means a public case study with N CMS sections and a successful Persian HTTP response. `Seed authored` means a case study implementation exists but is not registered in `CASE_STUDIES` or public in the current CMS. Every row below already appears in the public Persian archive; “cover” reports the current CMS cover field. `No source` means no independent project README, although the inventory/company README may still contain a factual summary.

## Project-by-project status and draft reasons

### Digikala

| ID | Project / source | CMS slug | Source | Current display | Why the source is not final; publishable scope |
|---|---|---|---|---|---|
| DGK-01 | [Digital Gold](Experience/Digikala/digital-gold/README.md) | `digital-gold` | draft | Cover; Public (18) | BI/automation tools and team split remain unconfirmed. Dates were explicitly waived for publication. Keep unsupported tools or ownership detail out; retain the supported product, campaign, and reporting story. |
| DGK-08 | BNPL for gold | `bnpl-concept` | No source | No cover; archive only | Clarify how this concept differs from the installment campaign that actually ran inside Digital Gold. Until then, label it as a concept and avoid implying it shipped. |
| DGK-09 | Gold-backed credit | `gold-backed-credit-concept` | No source | No cover; archive only | Keep the concept label; gather independent evidence before a deeper case study. |
| DGK-10 | PR and brand awareness | `pr-brand-awareness` | No source | No cover; archive only | Archive summary can remain; collect publishable examples and outcomes before making deeper claims. |

### Khodro45 and Carsparency

| ID | Project / source | CMS slug | Source | Current display | Why the source is not final; publishable scope |
|---|---|---|---|---|---|
| CAR-01 | [Khodro45 Dealer App](Experience/Carsparency-Khodro45/khodro45-dealer-app/README.md) | `khodro45-dealer-app` | draft | Cover; Public (14) | Team/individual decision scope, transaction numbers, and whether the loyalty ladder replaced subscription tiers are unresolved. Publish the documented design and flows; omit unverified impact and replacement claims. |
| CAR-02 | [Carsparency Pro](Experience/Carsparency-Khodro45/carsparency-pro/README.md) | `carsparency-pro` | draft | Cover; archive only | Target market, Sina's scope, other design pages, and launch status are unresolved. The known auction designs can be shown now as design work; avoid a geography or launch claim until verified. |
| CAR-03 | [Carsparency Back Office](Experience/Carsparency-Khodro45/carsparency-back-office/README.md) | `carsparency-back-office` | draft | Cover; archive only | Operator audience, before/after KPI values, and one component's origin need confirmation. Show the console and named metrics as interface scope; do not assert improvement without readings. |
| CAR-04 | [Carsparency Inspection](Experience/Carsparency-Khodro45/carsparency-inspection/README.md) | `carsparency-inspection` | draft | Cover; archive only | Inspector audience and evidence of field use are missing. Show the designed inspection flow without saying it was deployed or used. |
| CAR-05 | [Carsparency Web](Experience/Carsparency-Khodro45/carsparency-web/README.md) | `carsparency-web` | draft | Cover; archive only | Copy authorship, launch status, and whether dealer/Trustpilot figures are real remain open. Show the responsive seller journey; omit or crop those figures. |
| CAR-06 | [Carsparency Design System](Experience/Carsparency-Khodro45/carsparency-design-system/README.md) | `carsparency-design-system` | draft | Cover; archive only | Authorship and whether engineers consumed the tokens are unconfirmed. Show the evidenced boards and components; avoid sole-author or adoption claims. |

### OTeacher

| ID | Project / source | CMS slug | Source | Current display | Why the source is not final; publishable scope |
|---|---|---|---|---|---|
| OTE-01 | [Matchmaking research](Experience/OTeacher/matchmaking-redesign/README.md) | `oteacher-matchmaking-redesign` | draft | No cover; archive only | Research ownership, individual scope, existence of a dedicated matchmaking flow, and engagement results are unconfirmed. Publish the persona/research evidence as research; do not call it a shipped redesign. |
| OTE-02 | [Product strategy and roadmap](Experience/OTeacher/product-roadmap-and-strategy/README.md) | `oteacher-product-roadmap` | draft | No cover; archive only | Company history must be separated from personal tenure; authorship, questionnaire artifacts, implementation, and outcomes remain open. Present the confirmed roadmap artifacts without personalizing company-wide results. |
| OTE-03 | [Panel redesign](Experience/OTeacher/panel-redesign/README.md) | `oteacher-panel-redesign` | draft | No cover; archive only | The problem statement, individual scope, reason for the second iteration, some stray frames, and impact are unconfirmed. Show the two evidenced design passes; omit outcome claims. |
| OTE-04 | [Website redesign](Experience/OTeacher/website-redesign/README.md) | `oteacher-website-redesign` | draft | No cover; archive only | Only a section-header slide has been identified; a design source and specific scope are missing. Keep the factual archive entry, and add a detailed page only when a real artifact or account of the work is found. |
| OTE-05 | [Education unit program](Experience/OTeacher/education-unit-program/README.md) | `oteacher-education-unit-program` | draft | No cover; archive only | The underlying problem, Sina's individual scope, and outcome evidence are unresolved. Archive the documented program; do not attribute organization-level results to Sina without confirmation. |

### Other employment projects

| ID | Project / source | CMS slug | Source | Current display | Why the source is not final; publishable scope |
|---|---|---|---|---|---|
| TAH-01 | [Taha Gasht platform](Experience/Taha-Gasht/platform-redesign/README.md) | `taha-gasht-platform` | draft | No cover; archive only | Three design files, team/decision scope, shipping status, metrics, and tenure dates are missing. The factual role-level archive entry can stay; a detailed page needs at least a concrete artifact or first-hand account. |
| HDM-01 | Hadish Mall campaigns | `mall-traffic-campaigns` | No source | No cover; archive only | Gather campaign examples and supported results before a detailed story; keep the archive summary factual. |
| HDM-02 | Mall management app concept | `mall-management-app-concept` | No source | No cover; archive only | Keep the concept label and avoid implying a launched product. |
| FIB-01 | Fibona brand positioning | `fibona-brand-positioning` | No source | No cover; archive only | Gather process and deliverables before a detailed story. |
| FIB-02 | Fibona website | `fibona-website` | No source | No cover; archive only | Gather design evidence and precise role before a detailed story. |
| ARV-01 | Arvan Cloud platform redesign | `arvan-cloud-platform-redesign` | No source | No cover; archive only | High-potential portfolio story; gather source, screens, role, and permission for any NPS claim. Keep the current factual archive entry visible. |
| ARV-02 | Server-metrics research | `arvan-server-metrics-research` | No source | No cover; archive only | Gather research artifact or consider a chapter within ARV-01. |
| BIO-01 | [Biomaze website and education panel](Experience/Biomaze/website-education-panel/README.md) | `biomaze-website-education-panel` | ready | Cover; Public (16) | The source still asks about team/dates and which frames shipped, despite its `ready` label. Review that status; keep the public case study within evidenced Figma scope and avoid invented business results. |
| BIO-02 | [Biomaze design system](Experience/Biomaze/design-system/README.md) | `biomaze-design-system` | review | Cover; archive only | Whether tokens became Figma variables or remained static boards is unconfirmed. Show the boards; do not claim variable adoption yet. |
| DID-01 | Didestan video platform | `didestan-video-platform` | No source | No cover; archive only | Gather project source and work samples before a detailed story. |
| A1P-02 | A1Paradise / WiFon calling apps | `a1paradise-call-apps` | No source | No cover; archive only | Gather project source and work samples before a detailed story. |

### Independent projects

| ID | Project / source | CMS slug | Source | Current display | Why the source is not final; publishable scope |
|---|---|---|---|---|---|
| PRJ-01 | [RP1 Arena](Experience/Projects/rp1-arena/README.md) | `rp1-arena` | draft | Cover; Public (18) | Current project status and authorship of an interactive Octalysis tool are open. The documented arena design can remain public; avoid unsupported shipping or tool-authorship claims. |
| PRJ-02 | [Arash Rezvani](Experience/Projects/arash-rezvani/README.md) | `arash-rezvani` | draft | Cover; Public (14) | Contributor split and the optional analytics decision are open. Analytics is not a publication gate. Keep the existing image/privacy restrictions; describe authorship only as confirmed. |
| PRJ-03 | [Marqevon](Experience/Projects/marqevon/README.md) | `marqevon` | draft | Cover; **Seed authored; not public** | Contributor split and status after mid-September (domain, launch, feedback branch) are open. Publish the evidenced site design as not launched, without real identity/registration or market-price claims. Review the existing crops, then register the authored seed and check the live page. |
| PRJ-04 | [Fayman](Experience/Projects/faymen/README.md) | `faymen` | draft | Cover; Public (13) | How to describe multi-agent authorship, publishable commercial numbers, and current payment gateways remain open. Keep the live storefront and design work public; omit unsupported numbers and gateway claims. |
| PRJ-05 | [Renova+](Experience/Projects/renova-plus/README.md) | `renova-plus` | draft | No cover; archive only | One story vs two, PRD authorship, and later engagement status are unresolved. Show the evidenced design phase and prototype with clear stage labels; select safe visuals for a deeper page. |
| PRJ-06 | [VIN](Experience/Projects/vin-app/README.md) | `vin-app` | draft | Cover; Public (22) | Team/decision split, launch and feature status, and the current north-star metric are open. Keep the designed concept and confirmed screens public; do not imply unconfirmed features launched. |
| PRJ-07 | [Razhmana](Experience/Projects/razhmana/README.md) | `razhmana` | draft | No cover; archive only | Later engagement status and permission to name the client are unresolved. Anonymize if naming is not cleared; show the process architecture without implying implementation. |
| PRJ-08 | [GreenRest](Experience/Projects/greenrest/README.md) | `greenrest` | draft | No cover; archive only | Whether the proposal was accepted or implemented, and whether to feature an undelivered proposal, remain open. A clearly labeled independent UX audit can be shown without a delivery claim. |
| PRJ-09 | [Yaravan](Experience/Projects/yaravan/README.md) | `yaravan` | draft | Cover; Public (21) — seeded 2026-09-26 | Published product-name-only (Sina, 2026-09-26): retailer, people, competitors, legal entity and the support system's name stay out; role is **lead within a team**; the economics deck is current (extension is out of scope, not a revenue line); the charter and access matrices stay out. Every crop was redacted and checked; gates are in the seeds spec. Still open: Figma in-file errors (README Q8), current status (Q3), importer-vs-guarantor, and visual/translation sign-off. |
| PRJ-10 | [Nim Dang](Experience/Projects/nim-dang/README.md) | `nim-dang` | draft | Cover; Public (19) | Client/team, inferred dates, design lineage, dark-mode scope, launch status, and possible later files are unresolved. Keep the evidenced designs public as design work; avoid shipping, chronology, or sole-authorship claims that depend on answers. |
| PRJ-11 | [Narian Summer Passport](Experience/Projects/narian-summer-passport/README.md) | `narian-summer-passport` | draft | No cover; archive only | Featured priority, dates, possible Figma handoff, and authorship need confirmation. The campaign did not launch; a concept/campaign-design showcase is publishable if explicitly labeled as such. |
| PRJ-12 | [CProperty](Experience/Projects/cproperty/README.md) | `cproperty` | draft | Cover (crop); **Seeded on the local site 2026-09-26** — 23 sections, 7 locales, 15 uploads, gates green; the earlier version's imagery was removed the same day (D-042). Rendered review not run yet (auto mode blocked the local requests) | Client and role dates (Q1/Q2) are open; Q4 answered: v1 is not Sina's work (D-042). Published on the D-040 defaults: product name only, "the work in the file", no lineage, no launch/date/link. Next: the rendered review (`.verify-cproperty.mts`). |

## Delivery sequence

### Potential omission to confirm

The [A1Paradise role summary](Experience/A1Paradise/README.md) and [resume](About-Me/Resume.md) both name **gamified microgames** as work Sina designed. The only A1Paradise archive record, `a1paradise-call-apps`, covers the desktop calling app and WiFon; its current title and summary do not include the microgames. This is a **candidate gap**, not a verified new standalone project: ask whether the games were separate deliverables and whether a screen, description, or other evidence survives. If separate, add an A1P-01 inventory row and a truthful archive entry (a case study can follow later). If they belonged inside the calling products, expand the existing A1Paradise entry instead. Do not count this candidate among the 37 until that decision is made.

The eleven documented independent engagements in the resume all have matching archive records. Other deliberate groupings include DGK-02–07 inside Digital Gold, two calling apps in A1P-02, and Renova+'s two surfaces in one entry; these are not omissions by themselves.

### 1. Finish the eight public pages before expanding the deep-case set

Review each in Persian and English at mobile and desktop widths: story order, chapter navigation, legibility, actual media loading and crop, meaningful alt text, supported role and outcome claims, next-project link, and metadata. Record concrete defects and close them. Editorially review Persian copy before changing `translationReviewed` to `true`. Other languages should get a separate translation pass; their current existence is not proof of quality.

| Public case study | FA mobile | FA desktop | EN mobile | EN desktop | Claims/media | Sign-off |
|---|---|---|---|---|---|---|
| Digital Gold | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Khodro45 Dealer App | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| RP1 Arena | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| VIN | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Fayman | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Nim Dang | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Arash Rezvani | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Biomaze | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |

### 2. Turn authored-but-unpublished work into a real showcase

**Marqevon first:** `src/endpoints/seed/case-studies/marqevon.ts` already contains seven-locale copy and a media manifest, but `CASE_STUDIES` does not register it. Narrow the open claims as described above, inspect the crops, register the seed, publish to the local CMS, and review the resulting pages. Do not wait for a domain, final launch, analytics, or a final checklist tick if the evidenced design story can stand without them.

For the remaining **17 source READMEs without a public case study**, record one explicit editorial outcome per project: **independent case study**, **chapter in another case study**, or **accurate archive entry**. Prioritize review of Yaravan, Carsparency, OTeacher, Renova+, Razhmana, and GreenRest for portfolio range and available artifacts; this is a review queue, not automatic approval to claim outcomes. Add a cover when a safe, useful image is available; no cover is not a publication blocker.

### 3. Keep the 11 archive-only projects accurate

The 11 records without project-level sources are already visible. Verify the name, role, stage, summary, and whether a cover would help. Request evidence only for claims or a deeper story that needs it. Do not remove truthful archive entries because a full case study is not yet possible.

## Definition of covered

A project is **covered** when its public archive entry is accurate and legible, its deep-case decision is recorded, and any public case study has source-backed copy, safe media, and a completed visual/editorial review. A project may be covered as an archive entry; “covered” does not require 37 deep case studies. The earlier editorial target of **6–8 featured deep cases** is recorded in [decision D-010](Decisions.md). The site already has eight public deep cases, although only six occupy the featured archive positions. Expanding or changing that set is an editorial decision, and should not obscure the existing work.

## How to maintain this file

1. Check the current CMS record and linked source README before starting; this snapshot can age.
2. After an edit or publication, update the project's row, section count, cover state, review result, and reconciliation date.
3. Keep source-document status, archive visibility, case-study visibility, and visual sign-off separate. Record the exact open claim or asset rather than calling the whole project “blocked.”
4. Do not recreate DGK-02–07 as independent CMS projects. Check their coverage inside Digital Gold.

**Evidence for this snapshot:** public local `GET /api/projects?limit=100&locale=fa&depth=0&draft=false`; HTTP responses for all eight `/fa/work/<slug>` pages; 26 project-level source READMEs; [Inventory](Experience/Inventory.md); and the `CASE_STUDIES` registry. No new publication or browser-based visual sign-off was performed during this audit.
