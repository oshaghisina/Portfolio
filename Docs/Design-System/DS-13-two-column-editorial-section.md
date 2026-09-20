---
id: "DS-13"                    # DS-NN — equals this file's prefix
title: "Two-column editorial section"                 # Pattern name, e.g. "Single-accent rule"
slug: "two-column-editorial-section"                  # kebab-case; the file is <id>-<slug>.md
category: "layout"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 1               # 1 = first sprint · 2 = next · 3 = later
adoption: "adopted"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Visual language"
target:                   # where it lands in the codebase
  kind: "block"
  path: "src/blocks/Content/config.ts"
  name: "layout: columns | editorial"
rtl: "mirrors"                   # mirrors | neutral | needs-redesign
localization: "copy"          # none | labels | copy | typeface — what needs a fa twin
tokens: []                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-13-1-desktop-head-ai.png", "pleurat-com/DS-13-2-desktop-head-teams.png", "pleurat-com/DS-13.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "ready"             # draft | review | ready
---

# DS-13 — Two-column editorial section

> Eyebrow + short verdict heading on the left, 2–4 sentences on the right — the default body pattern for sections and case-study chapters.

## What it is
The default body pattern is a two-column editorial block: `.sv-head` is a grid with the two-tone h2 on the left and a 2–4-sentence lede on the right (see the measured `gridTemplateColumns` and gap), followed by the section's content grid (`.sv-tools`, `.sv-board`). Case-study chapters use the same idea — numbered eyebrow + short verdict heading on the left, body on the right — with a sticky chapter rail (DS-14). Centred layout is reserved for the few statement headings.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-13.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **head-ai** | `div.sv-head` | 1278.4×169.1px · width 1278.39px | — |
| ↳ heading | `h2` h2 | 629.3×101px · width 629.281px · maxWidth 629.286px — “AI is part of how I design & build, ever” | — |
| ↳ body | `p` p | 565.7×55.8px · borderBottom 0px none · width 565.703px · maxWidth 565.704px — “Not a novelty — a daily practice. These ” | — |
| **head-teams** | `div.sv-head` | 1278.4×123.5px · width 1278.39px | — |
| ↳ heading | `h2` h2 | 629.3×55.3px · width 629.281px · maxWidth 629.286px — “Where I've worked” | — |
| ↳ body | `p` p | 565.7×55.8px · borderBottom 0px none · width 565.703px · maxWidth 565.704px — “From global banks to independent apps — ” | — |

## Why it works
Heading-left / body-right lets the visitor read only the left column and still get the story, while the right column is there for whoever wants the detail; it also gives long pages a steady rhythm without full-width paragraphs (which at 1280px would be 120+ characters per line).

## For Sina
- **Take:** Borrow as the two-column variant of the existing `Content` block (`columns` already exist in the template — add a `layout: editorial` option that fixes heading-left / body-right and constrains the body measure).
- **RTL:** Mirrors cleanly with `dir="rtl"` — heading right, body left — as long as the grid uses `grid-template-columns` with logical alignment, not `float`/absolute positioning.
- **Persian:** Copy — headings and body get `_fa` twins; Persian body will run longer, so the right column needs a slightly wider measure or the grid ratio adjusted per locale.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| block | `src/blocks/Content/config.ts` | two-col variant | Extend `src/blocks/Content/config.ts` with a `layout` select (`editorial | columns`) and render the editorial variant as a 5/7 (or 4/8) grid at `lg`. |

**Implemented (2026-09-19):** `layout` select on the Content block (`columns` default, so existing rows validate); `EditorialGrid` (`src/blocks/Content/EditorialGrid.tsx`) renders 5/12 + 7/12 at `lg` with the body column capped at `max-w-measure`. Shown on `/design`.

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-13-1-desktop-head-ai.png` — head ai · crop @2x · desktop
- `DS-13-2-desktop-head-teams.png` — head teams · crop @2x · desktop
- `DS-13.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-13.json`
- [x] For Sina written (take · RTL · Persian)
- [x] Target mapping agreed
