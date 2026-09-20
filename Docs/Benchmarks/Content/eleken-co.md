---
title: "Eleken — eleken.co"
url: "https://www.eleken.co/"
slug: eleken-co
type: content
owner: "Eleken"
owner_role: "UI/UX design agency (Founder & CEO: Ilya Dmitruk)"
site_kind: agency
lang: en-US
generator: "Webflow (webflow-icons font present); Regolapro (custom display face) + Inter Variable body; Merriweather/Oswald also loaded but not observed in use"
date_added: 2026-09-19
relevance: 4
scores:
  ia: 4
  depth: 4
  proof: 4
  personality: 2
summary: "A 70-case public library where every case study's headline IS the funding/metric outcome, labelled before/after screenshots and per-case testimonials with 'Verified by Clutch' badges — the strongest proof machine benchmarked yet, built around an anonymous team rather than a person"
tags: [case-studies, funding-proof, testimonials, subscription-pricing, industry-filters, agency, b2b-saas, before-after]
screenshots:
  - about-desktop.png
  - case-datawisp-desktop.png
  - cases-desktop.png
  - desktop-fold.png
  - desktop.png
  - mobile.png
status: draft
---

# Eleken — eleken.co

> A subscription UI/UX design agency for SaaS startups, benchmarked for its public library of 70+
> metrics-driven case studies — each headlined by its own funding or growth outcome — because that
> proof density and case-study template is directly portable to Sina's own project write-ups, even
> though the surrounding site sells a company, not a person.

## Overview
Eleken is a Kyiv-founded (2015) design agency with a 100+-person distributed team, "100% SaaS focus,"
and a public library of 70+ named case studies. The homepage is a single very long page (~21,200px at
1440) that runs: hero → client-logo wall → three pain-point/CTA pairs → a funding-timeline graphic →
four case-study highlights → industry list → a "free 3-day trial" offer → three trial testimonials →
a full contact form → company positioning → four differentiator pairs → a "4.9 is our Clutch average"
wall of 12 testimonials → a three-step "how we source designers" section → a four-step onboarding
flow → a six-phase process breakdown → design principles → "who we're not for" → blog previews → a
12-question FAQ → footer. First impression: **relentlessly proof-forward** — almost every section
exists to justify itself with another case study, stat, or quote — in copy that is short, declarative
and a little combative ("Freelancers bail. Agencies overprice."). This is a B2B lead-generation site
for a *company*, not a personal narrative: useful to Sina specifically for its case-study template and
proof density, not for its overall shape or voice.

`sitemap.xml` lists 691 URLs — every case study, industry page, service page and the 5 `/books/*`
ebooks — all in the same `https://www.eleken.co/...` form the homepage's own canonical tag uses, and
`robots.txt` is a clean two-line policy pointing straight at that sitemap. Unlike Pleurat (`/ai` missing
from its sitemap), no missing top-level route turned up here; for a site built on hundreds of SEO entry
pages, sitemap/canonical hygiene is exemplary.

## Content model
What kinds of content exist and how each is structured (visible "fields").

| Entity | Fields observed | Notes |
|---|---|---|
| Case study (`/cases/{slug}`) | breadcrumb (Home / Cases / Client) · client eyebrow · **H1 = the outcome itself** (e.g. "How our redesign helped a no-code data analysis platform to raise a $3.6M seed round") · problem bullets · numbered process (5 steps: going into details → UX audit → wireframing → visual design → design system) · before/after screenshot pairs, each **explicitly captioned** ("Before", "Three versions of the screen, designed during a free trial") · client testimonial (quote + headshot + name + role + company + "Verified by Clutch" + star rating) · "What's next?" · closing "Let's talk" CTA | 70+ published; each tagged with 1–2 of 14 industries (Data, AI, Legal, Sales, Finance, Event/People/Process Management, Geoservice, Marketing, Real Estate, Healthcare, Education) |
| Case-study index (`/cases`) | hero copy · 14 industry filter pills (incl. "All Cases") · card: industry tag, client name, one-line quantified result, "Read case study" CTA, framed product screenshot | First card (Datawisp) shown large/featured above the rest of the grid |
| Service page (`/engagement/*`, `/ux-audit-service`, `/design-system-service`, `/consulting`) | 6 distinct pages: Product redesign, MVP design (from scratch), Team extension, UX audit, Design system, Consulting | Grouped under a "Services" nav dropdown |
| Industry page (`/industries/*`, 10 pages) | Sales, Fintech, Healthcare, Marketing, Data, Geoservice, DevTools, AI, Legal tech, Real estate | Same case-study library re-sliced per vertical — an SEO/entry-point pattern, not new content |
| Pricing (`/pricing`) | 3 tiers (Part-time designer $4,599/mo · Full-time $6,599/mo · 2 full-time $11,999/mo), identical inclusion list per tier, "Eleken vs Toptal / vs In-house / vs Traditional agency" comparison tables, pricing-specific FAQ | Public pricing; month-to-month, 2-month minimum, gated behind a 3-day free trial |
| About (`/about-us`) | breadcrumb · origin story (radial pain-point diagram + illustrated character) · "Eleken today" stat block (2015 · 100+ team · 150+ clients · 100% SaaS) · ~80-photo unlabelled team grid · tabbed "Talent / Transparency / Tempo" section (body copy + illustration + one testimonial per tab) · founder closing quote (Ilya Dmitruk) | Team is deliberately anonymous — no names or roles on any of the ~80 headshots |
| Testimonial | quote · headshot or client logo · name · role · company · "Verified by Clutch" badge · star rating | Reused on home (12+), about (3), and inside every case study (1) |
| Trial testimonial | name · role · company (no photo) | 3 on home, specific to the "free 3-day trial" offer |
| Blog post (`/blog/main`) | title card | 5 previews surfaced on home; individual posts not opened in this pass |
| FAQ | question · answer (accordion) | 12 Q&As on home; more, pricing-specific, on `/pricing` |
| Comparison page | positioning copy vs. a named alternative | "vs Toptal," "vs In-house designer," "vs Traditional agency" — not case studies |

## Information architecture
```
/                Home — hero → logos → 3× pain-point/CTA → funding timeline → 4 case highlights
                 → industries → free-trial offer → trial testimonials → contact form → positioning
                 → differentiators → Clutch wall (12 testimonials) → sourcing → onboarding → process
                 → principles → "not for" → blog previews → FAQ
/cases           Case-study index — 14 industry filter pills → featured card → grid (70+)
/cases/{slug}    Case study (70+)
/engagement/*    6 service pages · /ux-audit-service · /design-system-service · /consulting
/industries/*    10 industry pages
/pricing         3 tiers, comparison tables, pricing FAQ
/about-us        Origin story → stats → team grid → Talent/Transparency/Tempo → founder quote
/blog/main       Blog index
/contact-us      "Get started" destination
```
Nav: logo · Case studies · Services▾ (6) · Industries▾ (10) · Pricing · About · Blog · **Get started**
(CTA, pinned) · Log in. The footer repeats every section plus 5 downloadable ebooks, the 3 comparison
pages, editorial/advertising-policy links, and two office addresses (Kyiv + Newark, DE).

**Landing → proof → contact:** from the hero, "Book a call" and "Check portfolio →" both work in one
click, and because "Get started" is pinned in the nav on every route, contact is one click away
regardless of how far a visitor has scrolled — the fix for the page's extreme length. The 70-case
library is tamed by 14 industry filter pills rather than pagination alone, and the same 70 cases are
reachable from at least three places (`/cases`, the relevant `/industries/*` page, and presumably the
relevant `/engagement/*` page) — deliberate redundancy for SEO entry points, not a single narrative
path. Unlike a personal portfolio, case studies do **not** chain to a "next case study" — each one ends
on a generic "Let's talk" CTA, so the library is browsed from the index, not page-to-page.

## How work is showcased
- **Case-study format:** one consistent skeleton across all 70+ studies (Datawisp inspected in full):
  breadcrumb → client eyebrow → **H1 stating the funding/metric outcome, not the project name** →
  problem bullets → "It took Eleken less than a week…" → numbered process (Step 1 going into details,
  Step 2 UX audit against Nielsen's ten heuristics, Step 3 wireframing, Step 4 visual design [with
  Cards/Charts sub-sections], Step 5 design system) → before/after screenshots explicitly labelled
  "Before" and "Three versions of the screen, designed during a free trial" → results paragraph →
  attributed client testimonial → "What's next?" → "Let's talk" CTA. ~1,800–2,000 words, image-heavy
  (roughly 1 image per 80–100 words). Depth is *consistent* precisely because it's templated rather
  than bespoke per project — the opposite of a benchmark like Pleurat, where depth varied 5–10 sections
  by hand per study.
- **Media:** real product screenshots only (client apps, light or dark UI chrome), framed in a flat
  grey panel or literal browser/app chrome; no photography of people inside case studies (photography
  is reserved for testimonials, team and about); no video or embedded prototypes observed.
- **Proof & metrics:** the densest proof system in this benchmark set. Every one of 70+ case studies
  leads with a quantified outcome in the **H1 itself** ("$3.6M seed round," "doubled activation," "90%
  candidate drop-off fixed," "$18M raised"); nearly every page carries a named, titled, photographed or
  logo'd testimonial, many stamped "Verified by Clutch" with a star rating; an aggregate "4.9 is our
  Clutch average" / "100+ reviews on Clutch.co" claim repeats at least twice site-wide. One inconsistency
  found directly in the screenshots: Datawisp's own case-study page captions its testimonial "Moritz
  Uehling, **CTO at Line306**," while the same person is referenced elsewhere (case-study meta, home)
  as CTO of Datawisp — a small but real proof-integrity slip worth avoiding once Sina's case studies
  carry named attributions.
- **Personality:** the weak criterion, by design. Copy voice is confident and a little combative at the
  *company* level ("Freelancers bail. Agencies overprice.", "Most SaaS products don't fail on features.
  They fail on UX.") — but it's a brand voice, not a person's. The ~80-person team is shown as an
  anonymous photo wall (no names, no roles), explicitly trading individual identity for "collective
  strength," and the one named human (Ilya Dmitruk, Founder & CEO) appears exactly once, in a single
  closing quote on `/about-us`. Every case study is narrated in the same third-person "we," with a
  near-identical structure — reads as a well-run production line, not any one person's point of view.

## Bilingual / RTL notes
English-only (`lang="en-US"`), no visible language switcher, no RTL. Nothing to borrow directly for
D-009, but two things are worth recording: (1) case-study body copy is short and bulleted (2–4-sentence
problem statements, single-sentence process steps) — the same "cheap to translate" shape Pleurat had;
(2) the **H1-as-outcome** pattern ("How our redesign helped X raise $3.6M") bakes a full English
sentence into the headline itself, rather than a templated `{metric} + {client}` — a Persian version
would need its own sentence construction, not a word-for-word swap, since clause order differs.

## Takeaways for Sina
- **Borrow:**
  - The **H1-as-outcome** move for any case study with a real, sourced number: state the result in the
    headline, not the project name.
  - **Explicit captions directly under proof screenshots** ("Before," "designed during a free trial") —
    removes any doubt about what's being compared, cheaper than a hover-slider.
  - **Industry/category filter pills** on a work index once there are more than a handful of projects —
    a visible, clickable IA element rather than tags that only exist as metadata.
  - A **persistent one-click contact CTA pinned in the nav** on every page — solves "the page is long"
    without needing to shorten the page.
  - **"Verified by [X]" + a star rating** stamped directly on a testimonial card — a cheap, concrete
    trust signal Sina could replicate with LinkedIn recommendations or an equivalent public rating.
- **Adapt:**
  - The **anonymous team wall works against Sina's brief** (D-007, personal-brand-first) — invert it:
    Eleken hides the individual to sell a scalable service; borrow the *stat-card* component (founding
    year / clients / projects / focus) but keep the person named and visible everywhere Eleken doesn't.
  - The **templated 5-step process narration** is a good skeleton for a "how I work" page, but needs
    Pleurat-style specificity (named tools, real decisions, what didn't work) to avoid Eleken's own
    weakness — its steps read generically because they must scale to 70 studies; Sina only needs 6–8
    (D-010), so specificity is affordable and should be spent.
  - The **funding/metric-in-headline** pattern only works when a number is sourced and attributable
    (the Rubric's honesty bar) — several resume achievements currently lack a sourced number (see the
    open ❓s in Timeline.md); don't headline a metric that can't survive a client fact-check.
- **Avoid:**
  - **Attribution drift** between a testimonial's own caption and its pull-quote card (Moritz Uehling:
    "CTO/Datawisp" vs. "CTO at Line306") — freeze `name/role/company` as one linked field group reused
    everywhere a quote appears, never retyped per placement.
  - **A homepage this long** (~21,200px, ~40 sections) for a personal-brand-first site — Eleken can
    justify it because every section targets a different buyer intent (SEO + sales funnel); Sina's
    single audience doesn't need 40 sections to reach one CTA.
  - **Case studies that don't loop to a next case study** — makes a large library index-dependent to
    browse; with only 6–8 projects (D-010), a next/prev chain costs nothing and keeps a visitor inside
    the portfolio instead of bouncing back to an index.

## Payload implications
Which collections / fields / blocks this suggests for the CMS (feeds `../../Content-Model.md`).

- **`projects`** — add `outcomeHeadline` (short, factual, sourced-number field, distinct from `title`;
  populate only when a number is verified, per the Rubric's honesty note — leave empty otherwise),
  `industryTags[]` or `focusTags[]` (mirrors the filter-pill pattern for a future work index),
  `beforeAfter[]` blocks with an explicit `caption` field (not just image `alt`) so proof screenshots
  read "Before" / "After" the way Eleken's do, `process[]` (numbered step blocks: `label`, `body`), and
  a per-project `ogImage` override distinct from the site-wide default (Eleken's own case studies get
  one, its homepage doesn't — worth not repeating that inversion).
- **`testimonials`** — enforce `person { name, role, company }` as one linked group reused everywhere
  a quote is shown, specifically to prevent the Eleken-style drift between a case study's own caption
  and its testimonial card; optional `verifiedBy { source, url, rating }` group for a Clutch-equivalent
  trust badge if Sina ever has one.
- **`caseStudyIndex`** — an `industryTags`/`focusTags` filter component feeding off `projects.tags`,
  reusable if Sina's own work index ever needs more than a handful of filters; a `nextProject` relation
  (or computed from `order`) so case studies loop rather than dead-ending, the opposite of Eleken's
  index-dependent browsing.
- **`leadMagnets`** (or `about.leadMagnets[]`) — `title`, `blurb`, `file`, `cta`; Eleken runs 5 of these
  as `/books/*` pages (a distinct indexed route each) rather than a single About-page block — a heavier
  pattern than Pleurat's single e-book, useful only if Sina plans more than one.
- **`faq`** — `question`, `answer` (richText), `context` (select: home / pricing / project — scopes
  which page(s) render it); mark the block with FAQPage-equivalent structured data at render time,
  something Eleken does on its homepage FAQ but not on any of its case studies.
- **`site` global** — a single, always-visible `primaryCta { label, href }` rendered in the nav on every
  route, independent of page length, so a long page never blocks a one-click path to contact; an
  `organization` JSON-LD block (`name`, `logo`, `foundingDate`, `sameAs[]`) generated once and reused
  site-wide, the way Eleken's own `Organization` schema is.
- All `label`, `heading`, `body`, `caption`, `blurb` and `outcomeHeadline` fields are **localized** (EN
  default, FA twin) per D-009; media `alt` too — and per the Accessibility note in the Design-bucket
  analysis, `alt` should stay a required field on any image that isn't marked purely decorative, rather
  than defaulting to empty the way roughly three-quarters of Eleken's do.

## Scores
Justification for each `scores.*` value and `relevance` — see [Rubric](../Rubric.md).

- **ia: 4** — a five-item primary nav (two are dropdowns) reaches work, pricing, proof or contact in
  one click, and a persistent nav CTA means the page's extreme length never blocks contact; not a 5
  because two dense dropdown menus (6 + 10 items) and a 70-item case index ask more upfront navigation
  effort than a flat, five-link nav would.
- **depth: 4** — every inspected case study runs problem → numbered process → labelled before/after →
  quantified result → attributed testimonial, consistently across 70+ studies because it's templated;
  not a 5 because the process narration is generic enough to scale to 70 (no study says what *didn't*
  work), and one testimonial's own role attribution contradicts itself between two places on the same
  site.
- **proof: 4** — the densest proof system benchmarked so far: a quantified outcome in literally every
  case-study headline, testimonials on nearly every page (many "Verified by Clutch" with a star
  rating), an aggregate 4.9/100+ reviews claim repeated site-wide; held to 4, not 5, by the
  directly-observed Moritz Uehling attribution mismatch — the kind of detail that undercuts an
  otherwise airtight proof system.
- **personality: 2** — voice is confident and consistent, but it's a company's brand voice, not a
  person's: the ~80-person team is deliberately anonymous, the one founder quote appears exactly once
  at the very bottom of `/about-us`, and every case study is narrated in identical third-person "we" —
  the clearest counter-example in this benchmark set to a personal-brand-first site.
- **relevance: 4** — Avg 3.5, within the rubric's 1.5 band. Not a 5 because Eleken is a company selling
  a subscription service, not a personal or studio portfolio — but per the Rubric's own tier-4 example,
  it's a strong, specific reference for **the case-study format**: the H1-as-outcome headline, the
  labelled before/after, and the attributed testimonial-per-case are all directly portable to Sina's
  6–8 case studies.

## Screenshots
Local-only, in `assets/eleken-co/` (gitignored, D-008): `desktop.png` (1440, clipped at 15,000px — real
page is ~21,218px) · `mobile.png` (390 CSS / 780 physical, clipped at 15,000px CSS — real page is
~22,691px) · `desktop-fold.png` (1440×900, first viewport).

Additional captures: `cases-desktop.png` (`/cases` index, first viewport) · `case-datawisp-desktop.png`
(`/cases/datawisp`, clipped at 9,000px) · `about-desktop.png` (`/about-us`, clipped at 7,000px).
