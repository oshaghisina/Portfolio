---
title: "Armory AI Agency"                 # Site / project name
url: "https://armory.framer.ai/"
slug: "armory-framer-ai"                  # domain in kebab-case; equals this file's name
type: "content"
owner: "Delani (sirdelani), Framer template author"                 # Person or studio behind it
owner_role: "Framer template designer/developer"            # e.g. Product Designer, PM, Design Engineer
site_kind: "product"             # personal-portfolio | studio | agency | product | other
lang: "en"                  # html lang, e.g. en
generator: "Framer 40f5bc6"             # tech hint from meta generator / obvious stack, if any
date_added: "2026-09-19"
relevance: 2              # 1–5 relevance to Sina's site — see ../Rubric.md
scores:                   # 0 = not scored yet (draft only); 1–5 per ../Rubric.md
  ia: 3
  depth: 2
  proof: 1
  personality: 1
summary: "A fictional Framer \"AI agency\" template whose case-study skeleton (meta sidebar, stat strip, testimonial, tiered pricing table) is structurally reusable, but every proof point is fabricated and self-contradictory (headline stats disagree with their own captions, all 5 articles share one publish date, and the contact page's phone country code, address and embedded map all point to different countries) — a counter-example on proof and personality, not a model to follow"               # one-line takeaway; shown in the index
tags: [case-studies, pricing-tiers, meta-sidebar, fabricated-proof, stock-team-photos, agency-content, repeated-blocks, saas-template]                  # e.g. [case-studies, writing, long-form, minimal]
screenshots:
  - desktop.png
  - desktop-fold.png
  - mobile.png
  - pricing-desktop.png
  - pricing-mobile.png
  - about-desktop.png
  - about-mobile.png
  - project-desktop.png
  - project-mobile.png
  - case-cigna-desktop.png
  - case-cigna-mobile.png
  - articles-desktop.png
  - articles-mobile.png
  - contact-desktop.png
  - contact-mobile.png
  - frames/
status: draft
---

# Armory AI Agency

> A fictional Framer template for an "AI systems studio" — benchmarked not as a personal-brand
> model but as a counter-example: a full 6-page content system (home, pricing, about, projects,
> articles, contact) where every content pattern is competently structured and every actual proof
> point is fabricated, generic or self-contradictory.

## Overview
Armory AI is not a real business — it is a $129 Framer template (author: Delani, `sirdelani` on
Contra) demonstrating what an "AI agency" site could contain. Site is a single Framer project with
six top-level routes plus per-case-study detail pages. First impression of the content: **confident
and quantified in form, empty in substance** — nearly every section leads with a number or a named
client (Cigna, Aetna, Anthem, CVS Pharmacy, United Healthcare all appear as fabricated clients), but
none of it is sourced, consistent, or attached to a real person. It reads as a content **skeleton**
worth studying for its shape, not its execution.

Routes: `/` · `/pricing` · `/about` · `/project` · `/project/{slug}` ×5 (only
`cigna-smart-health-systems` was opened directly; Aetna, Anthem, CVS and United Healthcare exist as
list entries on `/project` linking to their own detail pages, not individually verified here) ·
`/articles` · `/contact` · `/policies/terms-conditions` · `/policies/privacy-policy`.

## Content model
What kinds of content exist and how each is structured (visible "fields").

| Entity | Fields observed | Notes |
|---|---|---|
| Case study | client name + logo · year (`//2026`) · one-line result summary · full-bleed hero photo with a per-client gradient tint (teal for Cigna) · **4-stat proof strip** (icon + big number + one-line caption) · testimonial (quote + name + role) · challenge paragraph · **meta sidebar** (Industry, Timeline, Platform, "Live Website" URL) · two-column narrative body · black-and-white architectural photo gallery · related-projects links | 5 studies, all healthcare/insurance clients. **Headline stat digits don't match their own captions** — Cigna's strip reads `$45M` / `700%` / `41x` / `84`, but the captions underneath say "over **50M**", "increased ... by **40%**" and "a **12x** return." |
| Pricing tier | name (Starter / Growth / Enterprise) · one-line audience blurb · price ("/month", monthly-year toggle present) · feature rows grouped under 3 labeled categories (Features, Capabilities, Support & Delivery) · check/dash per tier · CTA | Growth (middle) tier is visually emphasized with an inverted dark column — the classic "recommended plan" device. |
| Team member | name · role · portrait | 4 fictional people (Sofia Mercer — Head of AI Research, Lena Brandt — ML Systems Architect, Daniel Owusu — Lead AI Engineer, Carla Voss — AI Strategy Director), each a stock photo on a flat brand-colour background (teal/orange/blue/pink); no bios, no links, no socials. |
| Testimonial | quote · name · company (as a small rotated sidebar label) · 5-star rating | Exactly 4 testimonials (Vertex Labs, FlowState AI, Neural Sync, Sentinel Ops), reused **verbatim** on both `/` and `/about`. |
| Article | title · publish date · read-time estimate · one-line dek · thumbnail (generated noise/gradient graphic) | 5 articles. **All 5 share the identical publish date** (Apr 29, 2026) — no author, no category, no featured slot. |
| Stat / metric | value · caption | The same value+caption shape is reused for the home "PRODUCT STATISTICS" dashboard, the About page's "8yrs / 3x ROI / 12 Core AI Frameworks" block, and every case study's 4-stat strip. |
| Trust badge | compliance mark (IRAP, ISO 27001, ISO 42001, SOC2 Type 3) | About page only; icon + label, no verification link — a proof device pleurat-com's benchmark did not have. |
| FAQ | question · answer (accordion) · category tab (Overview / Security / Protocols / Licensing) | Identical FAQ block appears on both `/` and `/pricing`. |
| Contact | name · email · location (select) · budget (select) · message (**mislabeled "Email"** — a second field literally duplicates the label) · phone(s) · email · social icons · postal address · embedded map | Phone numbers use Nigeria's `+234` country code; the address given is Austin, TX; the embedded Leaflet/OSM map is centered on **Covent Garden, London** and shows "API KEY REQUIRED" tiled across it (no valid map-tile key) — three mutually contradictory locations on one page. |
| Global footer | giant outline wordmark ("armory" set at page width) · Quick Links / Company / Policies columns · social icons · copyright | Present on every page; never appears in the homepage's own screenshot because the page is taller than the capture tool's 15,000px cap — only visible on the shorter subpages. |

## Information architecture
```
/                Home — hero → capability list → case-study teaser (3) → workflow-canvas demo
                 → 4-feature grid → live-stats dashboard → "Built for the long term"
                 → tabbed feature demo → integrations wall → testimonials → client-logo marquee
                 → articles teaser → FAQ → newsletter → footer
/pricing         Pricing — 3-tier comparison table → FAQ → newsletter → footer
/about           About — mission → 4-stat dial row → mission statement → proof numbers
                 → compliance badges → team grid → testimonials → client-logo marquee
                 → articles teaser → footer
/project         Projects — 5-item case-study list → newsletter → footer
/project/{slug}  Case study — hero → 4-stat strip → testimonial → challenge + meta sidebar
                 → two-column narrative → photo gallery → related projects
/articles        Articles — 5-item article grid → newsletter → footer
/contact         Contact — form → phone/email/social/address + map → newsletter → footer
/policies/*      Terms & Privacy (not captured)
```
**Landing → proof → contact:** nav is 5 items (Home, Pricing, About, Projects, Articles) plus
Contact, with a persistent "Book A Call" (Cal.com) and a sticky "Buy Armory AI Template" badge that
follows every page — the template's own upsell, layered on top of the fictional Armory brand. The
same closing stack — **testimonials → client-logo marquee → articles teaser → newsletter → footer**
— ends literally every page in the site, home included; there is effectively one authored "closing"
block, stamped everywhere rather than varied per page. `/project/{slug}` is the one page with a
different shape (it proves one thing in depth instead of summarizing everything).

**The pricing page is the differentiator page**, in the sense pleurat-com's `/ai` was: it is the one
place the site explains what you actually get, tier by tier, rather than restating the same
capability/proof loop. For an agency template that's the right instinct — Sina's equivalent
differentiator content (D-007) still belongs on its own page, just not a pricing table.

## How work is showcased
- **Case-study format:** all 5 studies use the identical skeleton (hero → 4 stats → testimonial →
  challenge/meta sidebar → two-column narrative → gallery) and all land at roughly the same length —
  depth is uniform *because it's templated*, not because each project earned the same depth the way
  pleurat's uneven 5–10-section studies do. Narrative copy is two generic paragraphs per study,
  built from interchangeable phrases ("custom neural network," "HIPAA compliance," "ethical AI
  standards") that could be swapped between any of the 5 clients without changing meaning.
- **Media:** a strict split between generated noise/gradient graphics (used everywhere in the
  marketing sections) and moody black-and-white **architectural stock photography** (used in every
  case-study gallery). Notably, a template about showcasing AI systems shows **zero actual product
  screenshots** in its case studies — only buildings. Team "photos" are stock portraits on flat
  colour backgrounds, not real people.
- **Proof & metrics:** numbers are everywhere — home stats, About's "8yrs/3x/12 frameworks," and a
  4-stat strip per case study — but they fail the Rubric's `proof` test twice over: they're
  fabricated (fictional clients, fictional testimonial companies), and in Cigna's case study three
  of four headline numbers **contradict the number stated in their own caption**. Compliance badges
  (SOC2, ISO 27001/42001, IRAP) are the one genuinely useful proof *device* here, even though the
  certifications themselves are unverified.
- **Personality:** none. About, case studies and articles all read in the same uniform corporate
  "we" voice; the "team" is stock photography with invented names; there is no first-person voice,
  no idiosyncrasy, and nothing equivalent to pleurat's dry humour or Arturo's first-name sign-off.

## Bilingual / RTL notes
None — `lang="en"` only, no language switch, no RTL. Two things still worth recording for the EN +
FA site (D-009): (1) the **case-study meta sidebar and pricing-table row labels** are short,
left-aligned label/value pairs that mirror cleanly under `dir="rtl"` if built with logical
properties — the cheapest part of this system to localize; (2) the **giant outline wordmark** in the
footer is a custom, display-scale lettering treatment of the Latin word "armory" — it is not a font
that can be swapped, it would need a bespoke redraw for a Persian brand word, which is a much bigger
lift than it looks (the same class of problem as pleurat's illustration-language budget, applied to
a single oversized logotype instead of a whole illustration set).

## Takeaways for Sina
- **Borrow:**
  - The **case-study meta sidebar** (Industry, Timeline, Platform, Live URL) as a compact,
    scannable fact box — cheaper to build than Pleurat's meta strip and just as useful.
  - A **compliance/trust-badge row** as a lightweight authority signal, if Sina ever lists real
    certifications, tool proficiencies or platform partnerships.
  - The **tiered comparison table** pattern (categories → rows → per-tier check/dash), *if* Sina
    ever adds a services/consulting page with real engagement tiers — not for case studies.
- **Adapt:**
  - The **4-stat proof strip** per case study is a good shape — one icon, one number, one caption —
    but every number must be real and the caption must be written *from* the number, not
    independently, so they can never disagree the way Armory's do.
  - Pleurat's differentiator-page idea (`/ai`) still applies (D-007): Armory shows the wrong content
    for that slot (a price list) but the right *instinct* — one page that explains the thing that
    makes you different, linked from top-level nav.
- **Avoid:**
  - **Stamping the identical testimonial/logo/CTA/newsletter block on every page.** Pleurat-com
    already showed the risk of repeating an employer grid twice; Armory repeats its *entire closing
    section* on all six pages. Each page should prove something different, not restate the same
    block.
  - **Fabricated, internally-inconsistent proof.** A headline stat that contradicts its own caption
    is worse than no stat at all — it signals the content was never proofread against itself. Every
    number on Sina's site needs a source (D-007/Rubric `proof`), and headline + caption should be
    authored together or generated from one value.
  - **Unreviewed placeholder contact details.** Nigerian phone numbers, a Texas address and a map
    pin over London, all on one page, is the cautionary extreme — a portfolio's contact section is
    exactly the part a visitor will double-check, so it must be the most consistent part of the site.
  - **Interchangeable case-study voice.** If any two projects' write-ups could swap clients without
    a copy edit, the write-up isn't doing its job — the whole point of a personal portfolio is that
    each project sounds like it happened to a specific person.

## Payload implications
Which collections / fields / blocks this suggests for the CMS (feeds `../../Content-Model.md`).

- **`projects.stats[]`** — require `value` and `caption` to be authored as one unit (or derive the
  caption from the value at render time) so an Armory-style mismatch between a headline number and
  its own supporting sentence becomes structurally impossible.
- **`about` global — add `trustBadges[]`** (`icon`, `label`, optional `verifyUrl`) for
  certifications/compliance marks — a proof device this benchmark surfaces that pleurat-com's did
  not.
- **`site` global — single `location` source of truth.** One field (address + lat/lng) should drive
  the displayed postal address, the map embed pin *and* the phone country code shown, precisely so
  they cannot silently disagree the way Armory's contact page does.
- **A reusable "closing" block** (testimonials + logos + CTA) is worth having as an actual Payload
  global/block — Armory shows the pattern works mechanically — but keep it **overridable per page**
  so it doesn't read as stamped everywhere the way it does here.
- **`caseStudy.meta`** group (`industry`, `timeline`, `platform`, `liveUrl`) — a cheap addition to
  the existing `projects` mapping (see `pleurat-com`'s Content benchmark) alongside its `meta` group.
- All `caption`, `blurb`, `quote` and `dek` fields are **localized** (EN default, FA twin) per D-009.

## Scores
Justification for each `scores.*` value and `relevance` — see [Rubric](../Rubric.md).

- **ia: 3** — a five-item nav and consistent cross-page CTAs ("More Projects," "View Articles") get
  every visitor to work, pricing or contact in one click; held to a 3, not higher, because the
  identical testimonials/logo/CTA/newsletter block closes every single page — more redundancy than
  pleurat-com's already-flagged employer-grid repeat.
- **depth: 2** — every case study runs the same structured skeleton, but the narrative is two
  generic, interchangeable paragraphs per study; depth is uniform because it's templated, not
  because each project earned it, and nothing says what didn't work.
- **proof: 1** — numbers and testimonials appear constantly, but they are fabricated, reuse real
  companies' names/logos for invented work, and in the Cigna case study directly **contradict their
  own captions** — worse than "claims only" because it models a broken practice, not just a thin one.
- **personality: 1** — a single uniform corporate voice across About, case studies and articles; the
  "team" is stock photography with invented names; nothing here is attributable to a real person.
- **relevance: 2** — Avg 1.75, within the rubric's 1.5 band. One structural idea worth keeping (the
  case-study meta sidebar, the trust-badge row) and a genuinely useful cautionary lesson on proof
  consistency; otherwise a different kind of site (agency/SaaS, not personal-portfolio) and, on
  content, a counter-example more than a model.

## Screenshots
Local-only, in `assets/armory-framer-ai/` (gitignored): `desktop.png` (1440) · `mobile.png` (390) ·
`desktop-fold.png` (1440×900, first viewport).

Additional captures: `pricing-{desktop,mobile}.png` · `about-{desktop,mobile}.png` ·
`project-{desktop,mobile}.png` (the `/project` listing) · `case-cigna-{desktop,mobile}.png`
(`/project/cigna-smart-health-systems`) · `articles-{desktop,mobile}.png` ·
`contact-{desktop,mobile}.png`.

`frames/` — settled (not full-page-stitched) 1440×900 viewport captures at named scroll positions
on `/`, used to verify motion behaviour live rather than trust a single full-page screenshot; see
the Design benchmark's Notes for what each one shows.
