---
title: "Maria João Abrantes — mariajoaoabrantes.work"                 # Site / project name
url: "https://www.mariajoaoabrantes.work/"
slug: "mariajoaoabrantes-work"                  # domain in kebab-case; equals this file's name
type: "content"
owner: "Maria João Abrantes"                 # Person or studio behind it
owner_role: "Product Strategist & Designer — Product Partner / Design Advisory"            # e.g. Product Designer, PM, Design Engineer
site_kind: "personal-portfolio"             # personal-portfolio | studio | agency | product | other
lang: "en"                  # html lang, e.g. en
generator: "Next.js (Turbopack build), CSS Modules; JSON-LD Person/WebSite/ProfilePage"             # tech hint from meta generator / obvious stack, if any
date_added: "2026-09-19"
relevance: 5              # 1–5 relevance to Sina's site — see ../Rubric.md
scores:                   # 0 = not scored yet (draft only); 1–5 per ../Rubric.md
  ia: 4
  depth: 4
  proof: 5
  personality: 5
summary: "Four routes, two colour-coded service offers and three deeply-documented case studies (each a Problem → Research → named Key Decisions → Delivered → Result log) back a first-person, evidence-dense personal brand — the clearest model in this set for how proof and personality can carry a consultant-positioned site without a resume page"               # one-line takeaway; shown in the index
tags: [case-studies, decision-log, testimonials, faq, calendar-booking, single-offer-pair, consultant-portfolio]                  # e.g. [case-studies, writing, long-form, minimal]
screenshots:
  - desktop.png
  - desktop-fold.png
  - mobile.png
  - mobile-menu.png
  - about-desktop.png
  - about-mobile.png
  - services-desktop.png
  - services-mobile.png
  - work-desktop.png
  - work-mobile.png
  - contact-desktop.png
  - contact-mobile.png
  - case-constructer-ai-desktop.png
  - case-constructer-ai-mobile.png
  - case-reach-users-desktop.png
  - case-reach-users-mobile.png
  - case-outsystems-ui-kit-desktop.png
  - btn-contact-default.png
  - btn-contact-hover.png
status: draft
---

# Maria João Abrantes — mariajoaoabrantes.work

> Product Partner. From uncertainty to a product ready to ship — strategy, UX and research in one
> ongoing partnership. Benchmarked because a four-route site backs two service offers with three
> fully-documented case studies and an unusually personal About page, with almost no wasted content.

## Overview
Maria João Abrantes positions herself as a **Product Partner** for funded startups and a **Design
Advisory** for existing product teams — two named, distinctly-scoped service tracks rather than a
single generic "available for hire." The first impression is evidence before biography: the homepage
leads with three case-study results (quantified, one line each) ahead of any process or About
content, and the voice throughout — home, services, case studies, contact — is first person and
direct ("I help founders shape their product, not just build it," "I'll tell you what I think the
right move is. You make the final call"). Nine-plus years, a named enterprise client (OutSystems) and
testimonials from named people at named companies, plus a genuinely personal About page (a VR short
film, an NGO project, teaching, mentoring), round out a site that reads as one senior individual
consultant rather than a junior portfolio.

## Content model

| Entity | Fields observed | Notes |
|---|---|---|
| Project / case study | title, one-liner, client, role, duration, tags[], overview, business context, research & discovery (method, findings, quote), key decisions[] (title + rationale), what was delivered (modules[]), outcome metrics, next-case link | Three instances (`/work/constructer-ai`, `/work/reach-users`, `/work/outsystems-ui-kit`); ~2,500–3,000 words each |
| Service offer | name, one-line audience ("for founders building without a designer"), description, "this is for you if" checklist[], accent colour, CTA to `/services#anchor` | Exactly two: Product Partner (violet), Design Advisory for Product Teams (yellow) |
| Engagement product | name, scope description, format (session length / week range), price (one instance only), CTA | Diagnostic Session (1 hr, €450 ex. VAT, written assessment) and Product Audit (2–4 weeks, WCAG AA + design-system + flow review) |
| About / bio | skill tags[] (13), bio paragraphs, milestones (teaching since 2021, thesis film + award, NGO project, current builds), languages[], personal notes, testimonials[] | Testimonials live on About, not on a dedicated page or on case studies |
| Testimonial | quote, name, title, company | Three: Mastercard, PandaDoc, OutSystems |
| FAQ | question, answer (collapsed by default) | Same four-question set reused on `/services` and `/contact` |
| Contact | headline, two contact paths (calendar / email), response-time note | No form; a self-styled calendar widget + `mailto` |

> ❓ **Q1 — Confirm:** no CMS admin surface is visible from the outside; the one signal either way is
> an asset path (`/media/About/bio text/maria_profile.jpg`) with a human-readable, spaced folder name
> — read here as "hand-organized files in the repo," not a headless CMS. Worth confirming rather than
> assuming before this feeds `Content-Model.md`.

## Information architecture
Four top-level nav items — **Work, About, Services, Contact** — plus a persistent "Contact" pill
button kept separate from the nav link, so booking a call is one click from anywhere. `/work` lists
the same three case studies shown on the homepage's "Selected work" — no projects are hidden behind
the list page; three is the entire portfolio. Case-study cross-linking isn't uniform: Reach Users'
closing section links forward to *both* other case studies in a two-up grid, while Constructer AI and
OutSystems UI Kit each link to only one next project (confirmed by screenshot for Reach Users;
inferred from fetched text for the other two, so the exact pattern per case study isn't fully
verified). `/services` and `/contact` share the identical FAQ block, so an
objection raised while browsing offers gets answered again at the point of booking. There is no blog,
no résumé/CV page, and no dedicated testimonials page — proof lives inside `/about` and inside each
case study's pull-quote instead of being centralised anywhere. `/privacy` exists solely to support
the cookie-consent banner. The sitemap and the nav agree exactly; nothing found in either is orphaned
or unreachable from the other.

## How work is showcased
- **Case-study format:** an identical five-part skeleton across all three: Overview (the number,
  stated immediately) → Business Context (the problem in the client's own terms) → Research &
  Discovery (named method + named client/firm + a direct quote) → Key Decisions (three to five, each
  numbered and titled — e.g. "Two user types, one product," "Slots over variants" — with the
  trade-off spelled out) → What Was Delivered (named modules/components) → outcome metrics →
  next-project link. Process and outcome are close to evenly weighted; the "Key Decisions" section is
  the distinctive move — most case studies narrate chronologically, this one itemises the decisions
  the way a design review would minute them.
- **Media:** screenshots matched to what each project actually is — browser-chrome-framed dashboard
  shots for the two SaaS case studies, three iPhone mockups for the mobile-facing UI kit, a single
  lifestyle photo (laptop on a table) standing in for Reach Users, which otherwise shows no product UI
  in its hero at all. Reach Users' mid-article screenshots sit inside a soft amber glow (a visual "look
  closer" cue not used elsewhere), and one OutSystems mockup swaps its frame for a marble-textured
  backdrop — small but deliberate departures from the plain framing used everywhere else. The ratio of
  visuals to text is moderate: screenshots mark section breaks rather than carrying the argument alone
  — the writing does most of the persuading.
- **Proof & metrics:** every case study closes on a quantified result stated in plain language, not a
  KPI dashboard — "5 hours of manual work to one click," "cutting participant sourcing effort by
  84%," "40% reduction in development time," "33% improvement in UX scores," "70% reduction in
  component detachments." Named, checkable clients (OutSystems by name; a described-but-unnamed
  90-year-old São Paulo engineering firm as the research partner) and named-role quotes (a "Legal
  Manager" inside a case study, three full testimonials with name + title + company on `/about`) back
  the numbers up. Nothing is gated behind "results available on request."
- **Personality:** carried almost entirely in first person and almost entirely on two screens — the
  homepage's four-item "How I Work" list (a stance, not a process diagram: "I bring a point of view,
  not just execution… you won't be making it alone") and `/about`, which is unusually candid for a
  B2B-consultant site: a Master's-thesis VR film about sexual harassment (shortlisted, Berlin
  Lift-Off Film Festival 2022), a self-funded clean-water project in Nyambori, Tanzania (€3,000
  raised, 500+ students), teaching UX since 2021, mentoring on MentorCruise, two of her own products
  in progress, and a closing note on Queen and caldo verde. None of this leaks into the case studies,
  which stay in a more clinical, evidenced register — the split reads deliberate, not inconsistent.

## Bilingual / RTL notes
English only. `lang="en"`, JSON-LD `inLanguage: "en-US"`, no `hreflang` alternates, no visible
language switcher on any page captured. The JSON-LD `Person` node records
`knowsLanguage: ["English", "Portuguese"]` as a fact about Maria, not as a site capability — Portuguese
readers get the same English content. Nothing to borrow directly for D-009; the useful takeaway is
structural rather than linguistic: the FAQ-reused-on-two-pages pattern and the single decision-log
case-study template would translate cleanly once Persian copy exists, since neither depends on
English-specific wordplay.

## Takeaways for Sina
- **Borrow:**
  - **The five-part case-study skeleton, especially "Key Decisions" as its own named section** —
    numbered, titled, each with a stated trade-off. Easier to write consistently than a chronological
    narrative, and more honest about process than a pure outcomes list.
  - **State the number before the story.** Every case study and the homepage's work cards lead with
    the quantified result; process and context follow. Reorders the usual portfolio convention (hero
    → process → eventually a result) around what a busy visitor actually scans for first.
  - **Two named, colour-coded offers with a "this is for you if…" checklist** — lets a visitor
    self-select in seconds instead of reading one generic services paragraph.
  - **Reuse one FAQ block on both the offer page and the contact page** — answers the objection at
    both the browsing moment and the commitment moment.
  - **A cheap, low-commitment paid entry point** (the €450 Diagnostic Session) next to the open-ended
    retainer offers.
  - **Put personality on exactly one or two screens** (About + a short "how I work" list) and keep
    case studies evidenced and clinical — the personal material lands harder for not being diluted
    everywhere.
- **Adapt:**
  - **Three case studies is a viable "entire portfolio."** Depth over breadth — worth deciding early
    how many of Sina's projects get the full five-part treatment versus a shorter card.
  - **No dedicated testimonials page** — hers live inside `/about` only; Sina's mixed-audience
    personas (recruiters, clients, collaborators) may need proof reachable from more than one place,
    e.g. also surfaced near the relevant case study rather than centralised on one page.
  - **A calendar-first contact page** assumes the visitor is already ready to book; Sina's mixed
    audience (D-007) may need a contact page that branches by visitor type before offering a slot.
- **Avoid:**
  - **No blog/writing and no résumé/CV page** — fine for a consultant selling ongoing engagements,
    but Sina's brand brief (mixed audience, recruiters included) likely needs a CV-adjacent artefact
    this model skips entirely; don't drop that entity just because this reference site does.
  - **Testimonials only three deep and only on one page** — thin if a recruiter-type visitor never
    scrolls `/about`.

## Payload implications
Feeds `../../Content-Model.md`:
- A **CaseStudy** collection matching the five-part skeleton as ordered blocks (`Overview`,
  `BusinessContext`, `ResearchDiscovery`, `KeyDecisions[repeatable: title + body]`,
  `Delivered[repeatable]`, `OutcomeMetrics[repeatable: stat + label]`) rather than one long rich-text
  field — makes "state the number first" enforceable at the field level instead of relying on writing
  discipline.
- A **ServiceOffer** collection or global with a small fixed set of entries (name, audience line,
  description, checklist[], accent-token reference, CTA) — the accent-token reference is what would
  drive a Sina version of colour-coding if he adopts it.
- **Testimonial** as its own collection (quote, name, title, company, relatedCaseStudy relationship)
  so it can be queried onto both `/about` and individual case studies, unlike this site's
  about-only placement.
- A shared **FAQ** block/global (question/answer pairs) reusable across Services and Contact,
  matching the reuse pattern observed here.
- `_fa` twins needed on every visitor-facing string field per D-009; nothing about this site's
  structure blocks that — none of the entities above are English-specific.

## Scores
Justification for each `scores.*` value and `relevance` — see [Rubric](../Rubric.md).

- **ia: 4** — four flat top-level routes, no dead ends or duplicate paths found, a persistent
  Contact CTA separate from the nav, and two clearly self-selectable offers; not a full 5 because IA
  wasn't live click-tested end-to-end (read via fetched content, not an interactive browser session)
  and there's no path for a non-hiring visitor (e.g. a fellow designer) beyond the same
  book-a-call funnel.
- **depth: 4** — a consistent Problem → Research → **named, numbered Key Decisions** → Delivered →
  Result skeleton across all three case studies, each substantial (~2,500–3,000 words) with real
  method and trade-off detail; short of 5 because "what didn't work" isn't explicit — deferred scope
  and trade-offs are named, but no case study admits an approach that was tried and abandoned.
- **proof: 5** — quantified outcomes with context on every case study (84% / 40% / 33% / 70%), a
  named enterprise client (OutSystems) and a described research partner, a role-attributed quote
  inside a case study, and three fully-attributed testimonials (name, title, company) — the fullest
  proof stack in this set.
- **personality: 5** — a consistent first-person voice from the homepage's "How I Work" list through
  the FAQ answers through `/about`'s genuinely idiosyncratic material (a VR thesis film on sexual
  harassment, a self-funded NGO water project, Queen and caldo verde); memorable, and deliberately
  confined to specific screens rather than diluted everywhere.
- **relevance: 5** — Avg 4.5. The clearest model in this set for backing a consultant-style personal
  brand with a small number of deep, structurally-consistent case studies, and for centring proof and
  personality without a résumé page — directly applicable to Sina's own mixed-audience,
  personal-brand-first site (D-007). The one gap (no CV/writing entity) reads as a deliberate omission
  worth naming rather than a craft flaw, which is why it doesn't pull relevance down.

## Screenshots
Local-only, in `assets/mariajoaoabrantes-work/`: `desktop.png` (1440) · `mobile.png` (390) ·
`desktop-fold.png` (1440×900, first viewport).

Additional captures: `mobile-menu.png` · `about-{desktop,mobile}.png` ·
`services-{desktop,mobile}.png` · `work-{desktop,mobile}.png` · `contact-{desktop,mobile}.png` ·
`case-constructer-ai-{desktop,mobile}.png` · `case-reach-users-{desktop,mobile}.png` ·
`case-outsystems-ui-kit-desktop.png` · `btn-contact-{default,hover}.png`.

## Review checklist
- [ ] **Q1** — Confirm whether content is hand-maintained in the Next.js repo or served from a
  headless CMS; the `/media/About/bio text/…` asset path is the only signal either way.
