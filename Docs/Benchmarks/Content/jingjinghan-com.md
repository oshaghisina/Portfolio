---
title: "Jingjing Han — jingjinghan.com"
url: "https://www.jingjinghan.com/"
slug: jingjinghan-com
type: content
owner: "Jingjing Han"
owner_role: "Product Designer & Creative Technologist"
site_kind: personal-portfolio
lang: en
generator: "Next.js (Vercel-hosted, ISR-prerendered, Turbopack build chunks) + Tailwind CSS; full OG/Twitter card meta, no JSON-LD, no meta generator tag"
date_added: 2026-09-19
relevance: 4
scores:
  ia: 4
  depth: 4
  proof: 2
  personality: 5
summary: "A persona-switcher intro names exactly who the site is for, numbered case-study sections close on one bolded insight each, and a whole top-level practice (live performance, with real photographic proof) sits alongside product work — strong IA and personality, no metrics or testimonials anywhere"
tags: [persona-switcher, numbered-case-study, pull-quote-insights, multidisciplinary, no-proof, filterable-index]
screenshots:
  - desktop.png
  - desktop-fold.png
  - mobile.png
  - design-desktop.png
  - about-desktop.png
  - case-first-movers-desktop.png
  - performance-desktop.png
  - playground-nook-desktop.png
status: draft
---

# Jingjing Han — jingjinghan.com

> A product designer who is also a trained stage performer, structured around a rare content device —
> a homepage "Intro" that lets a visitor pick who they are (recruiter, PM, engineer, or "anyone") — and
> case studies that close every section on one distilled insight rather than a wall of narration.
> Benchmarked for information architecture and personality; a clear counter-example on proof.

## Overview
Jingjing Han is a New York–based product designer/creative technologist whose second, equally
foregrounded practice is live/embodied performance (devised theater, movement, site-specific work). The
content is organized around that duality from the first screen: the homepage doesn't just describe her,
it asks the visitor who *they* are, then narrates product work, self-directed experiments, outbound web
projects and stage work in that order — closing on performance rather than treating it as a footnote.

## Content model
| Entity | Fields observed | Notes |
|---|---|---|
| Product case study | title, one-line subtitle naming the client/product, numbered sections (eyebrow `01`…, short heading, body paragraph), one bolded pull-quote insight per section, a working-prototype/flow screenshot, no explicit "results" section | e.g. First Movers → "Designing an AI-Powered Learning Experience" |
| Playground project | title, one-line subtitle, longer intro paragraph, small type/link meta row, browser-chrome mockup, numbered `01–06` sections (`Why I Built It / Problem / Product Concept / Key Features / Design Direction / Reflection`), 4-image detail strip, 2-item related-project footer | e.g. Nook |
| Web-design project | title, one-liner, external `↗` link | Sourcing, IIDRR, Nuro AI, BE Financial ED — thumbnail-only inside the `/design` grid; no in-site detail page, no role/process/outcome stated |
| Performance | title, year, pipe-separated role tags (e.g. "Creative Technologist · Motion Capture · Moving Image"), one-line description, hero photo | 6 credited works (Simulacra, Cave, BodyScape, Mask Soliloquy, Machine Patoral, The Nephilim) + a separate "Other Performances" carousel with director/performer credit line |
| About | role badges orbiting an avatar graphic, 6-stop vertical "journey" timeline (era heading + ~80–100-word paragraph), 3-card design-process summary (Discover/Design/Deliver) | no résumé/CV table, no employer list, no dates beyond the timeline's implicit ordering |
| Home "Intro" | 5 persona buttons (`For anyone / Recruiters / Product Designers / Product Managers / Engineers`) beside one swappable summary paragraph | ❓ a quick automated click did not visibly swap the paragraph — confirm by hand before treating this as live personalization rather than a styled but inert tab list |

## Information architecture
Top nav is identical everywhere: `Design`, `Performances`, `About`, `Resources ↗` (outbound, a separate
personal tool-directory project) plus LinkedIn and email icons. The home page functions as both a
landing page and a preview of every section: hero → persona intro → Featured Work teaser (4 cards,
deep-linking into `/design`) → Playground teaser (3 cards) → Web Design teaser (4 outbound links) →
Performances teaser (3 cards + "View All") → contact CTA ("Let's Collaborate!" + email). A visitor can
land, get the pitch, see proof from both practices, and reach the contact block **without leaving the
home page** — a fast path for someone who just wants the gist.

Anyone who wants to browse deeper moves into one of two dedicated index pages: `/design` (a filterable
masonry grid — `All / Product Design / Web Design / Playground`) or `/performance` (a plain 2-up grid).
Both switch the page canvas from black to cream — a **visual mode switch that doubles as IA**: black
always means "who she is" (Home, About), cream always means "what she's made" (every project/listing
page). The one soft spot: nothing on `/design` explains what separates "Product Design" from
"Playground" from "Web Design" — a first-time visitor has to infer the taxonomy from the tiles
themselves, and "Web Design" items leave the site entirely with no warning.

## How work is showcased
- **Case-study format:** process-forward and numbered, not gallery-forward. The First Movers case study
  runs eight numbered sections, each pairing a short body paragraph with one **bolded, visually inset
  insight sentence** — "Users do not think in categories. They think in outcomes.", "A longer assessment
  does not automatically create a better experience.", "Ask Kiko should help think, not just search." —
  so the whole narrative arc is readable from the bolded lines alone, even skimming. It ends on a working
  prototype/flow screenshot, not a "what shipped" or results slide. The shorter Playground format
  (Nook: `01 Why I Built It` → `06 Reflection`) reuses the identical numbered-insight skeleton at a
  smaller scale, which makes the whole site's case-study voice consistent even across very different
  project sizes.
- **Media:** two strictly separate registers. Product work is flat UI screenshots and device mockups,
  one consistent style throughout. Performance work is real stage/site photography — no stock imagery,
  no illustration. Notably **no video or motion-capture footage** is embedded anywhere, despite "motion
  capture" and "movement" being named credits on three performance pieces — a real gap given the medium.
- **Proof & metrics:** effectively absent. No adoption numbers, before/after comparisons, named
  client/stakeholder quotes, or company logos appear on any page reviewed. The performance section's
  venue/festival credits (ShenZhen Biennial Theater Festival, Beijing Times Art Museum) are the closest
  thing to third-party validation on the whole site.
- **Personality:** consistently present and specific, not confined to the About page. It shows up in
  word choice ("a little vibe-coding into every build"), in the repeated numbered-reflection structure
  used for self-directed work, and most of all in the structural choice to give an entire discipline
  outside product design (performance) equal real estate with real photographic proof — that does more
  to make the person memorable than any amount of "About me" copy could.

## Bilingual / RTL notes
None. `lang="en"` only, no locale switcher, no evidence of a second-language content plan anywhere in
the IA or footer.

## Takeaways for Sina
- **Borrow:**
  - The **persona-switcher Intro** as an IA device for a mixed audience (D-007) — one hero section
    naming the different kinds of visitor a personal-brand site actually gets, instead of writing one
    generic paragraph and hoping it lands for everyone. ❓ Verify the copy genuinely swaps per button
    before copying the pattern, not just the visual tab-list.
  - **One bolded insight per case-study section** — a cheap content rule ("every section ends on one
    sentence you'd want someone to screenshot") that makes long case studies skimmable and forces
    process writing to actually conclude something.
  - **Closing the home page on the "other" practice**, not burying it in a footer line — directly
    applicable to Sina's design/marketing/product mix: whichever practice reads as "least expected" for
    a product designer deserves the same real-estate treatment Jingjing gives performance.
  - **A filterable, taxonomy-labeled project index** once there are 10+ pieces spanning different kinds
    of work — maps cleanly onto Sina's own three practices as filter labels.
- **Adapt:**
  - The **specific taxonomy** (Product Design / Web Design / Playground; Recruiters / PMs / Engineers)
    is Jingjing's own — Sina needs his own practice and audience labels, and should explain what each
    filter actually contains somewhere, which this site never does.
  - **Video is a visible gap here** that Sina should not repeat if any of his own work has a natural
    motion/interaction component — a moving artifact (a dashboard interaction, a campaign motion asset)
    is stronger proof than a static screenshot of the same thing.
- **Avoid:**
  - **No proof, anywhere.** Not one metric, testimonial, or named stakeholder across product case
    studies or the performance section. For a mixed audience that includes people evaluating Sina for
    hire, personality and process alone (however well done) leave a real gap — pair every case study
    with at least one concrete outcome or quote, even an informal one.
  - **Outbound work with zero in-site context.** The four Web Design projects are thumbnail + one link
    (`↗`) to another site, with no role, process, or outcome stated first — a visitor who doesn't click
    immediately gets nothing, and the rest of that visit happens on a page Sina wouldn't control. If a
    project lives elsewhere, give it at least a one-paragraph in-site summary before sending people out.
  - **An unexplained taxonomy.** Filter labels with no legend force a visitor to reverse-engineer the
    structure from examples; a one-line description per category (even just a tooltip) would close this
    for free.

## Payload implications
- A **persona/audience block** on the Hero (repeatable `{label, blurb}` pairs) — the direct CMS shape
  for Jingjing's Intro pattern, editable without a redeploy.
- A **`discipline` / `kind` taxonomy field** on the Project collection (e.g. design / marketing /
  product for Sina) used both for the work-index filter and to choose the **media register** at render
  time — a `media_style: mockup | photography | data` field could drive how the hero image is framed,
  the same way this site keeps UI screenshots and stage photography visually distinct.
- A **case-study body as a repeatable block** — `{eyebrow, heading, body, insight?}` — matching the
  numbered-section + optional pull-quote pattern; `insight` stays optional so it's not forced where a
  section doesn't earn one.
- **Explicit `proof` fields** (metric, quote, quote_attribution, client_logo) on the case-study schema,
  made visually prominent enough in the admin UI that skipping them is a deliberate choice, not an
  oversight — this benchmark is the cautionary example for exactly why that matters.
- A lightweight **`related` field** (2 hand-picked or auto-selected next projects) for a cross-link
  footer, as seen on the Playground detail page.

## Scores
Justification for each `scores.*` value and `relevance` — see [Rubric](../Rubric.md).

- **ia: 4** — a persona-switcher that names the actual audiences by role, a filterable work index, and a
  home page that previews every section and ends on contact all add up to a fast, low-friction path for
  a mixed audience; docked from 5 because the Product Design / Web Design / Playground taxonomy is never
  explained, and outbound "Web Design" links leave with no warning.
- **depth: 4** — the First Movers case study genuinely shows problem → several distinct reframes/decision
  points → a working prototype, with each section closing on a stated insight rather than narration
  alone; docked from 5 because no case study states an outcome or result, so "depth" is real on process
  and absent on resolution.
- **proof: 2** — no metrics, no testimonials, no named clients or logos anywhere reviewed; the closest
  thing to third-party validation is festival/venue credits in the performance section, which speaks to
  legitimacy but not to whether the work *worked*.
- **personality: 5** — voice is specific and consistent everywhere (hero copy, the repeated
  numbered-reflection format, the design-process card labels), and the structural choice to give an
  entire second discipline equal, photographically-proven real estate makes the person genuinely
  memorable rather than merely described.
- **relevance: 4** — Avg 3.75, relevance 4: the persona-switcher IA and the one-insight-per-section
  case-study format are strong, directly exportable patterns for Sina's own mixed-audience,
  multi-practice site; not a 5 because the site's biggest weakness — proof — is exactly the thing Sina's
  content model should not copy.

## Screenshots
Local-only, in `assets/jingjinghan-com/`: `desktop.png` (1440) · `mobile.png` (390) ·
`desktop-fold.png` (1440×900, first viewport).

Additional captures: `design-desktop.png` (`/design`) · `about-desktop.png` (`/about`) ·
`case-first-movers-desktop.png` (`/work/first-movers`, clipped at 15,000px — the page is taller) ·
`performance-desktop.png` (`/performance`) · `playground-nook-desktop.png` (`/playground/nook`).
