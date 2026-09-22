---
id: "DS-14"                    # DS-NN — equals this file's prefix
title: "Sticky margin section index"                 # Pattern name, e.g. "Single-accent rule"
slug: "sticky-margin-section-index"                  # kebab-case; the file is <id>-<slug>.md
category: "layout"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 2               # 1 = first sprint · 2 = next · 3 = later
adoption: "adopted"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Key screens"
target:                   # where it lands in the codebase (no code yet)
  kind: "component"
  path: "src/components/CaseStudy/SectionIndex.tsx"
  name: "SectionIndex"
rtl: "mirrors"                   # mirrors | neutral | needs-redesign
localization: "labels"          # none | labels | copy | typeface — what needs a fa twin
tokens: []                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-14-1-desktop-chapter-rail.png", "pleurat-com/DS-14-2-desktop-sheet.png", "pleurat-com/DS-14-f01-chapter-rail.png", "pleurat-com/DS-14-f01-sheet.png", "pleurat-com/DS-14-f02-chapter-rail.png", "pleurat-com/DS-14-f02-sheet.png", "pleurat-com/DS-14-f03-chapter-rail.png", "pleurat-com/DS-14-f03-sheet.png", "pleurat-com/DS-14-f04-chapter-rail.png", "pleurat-com/DS-14-f04-sheet.png", "pleurat-com/DS-14-f05-chapter-rail.png", "pleurat-com/DS-14-f05-sheet.png", "pleurat-com/DS-14-f06-chapter-rail.png", "pleurat-com/DS-14-f06-sheet.png", "pleurat-com/DS-14.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-22"
status: "draft"             # draft | review | ready
---

# DS-14 — Sticky margin section index

> A sticky column of section numbers (01…10) runs down the case-study margin — a table of contents that costs 30px of width.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-14.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **chapter-rail** | `nav.sv-ch-rail` | 56×248px · font General Sans · size 17px · color #16140E · gap 4px · display flex · width 56px · position fixed · top 450px · left 28.8px | `color.ink` |
| ↳ item | `a` a, li, span | 56×27.5px · font General Sans · size 10px · tracking 1.4px · color #5B50C7 · gap 10px · display flex · width 56px — “01 OVERVIEW” | — |
| **sheet** | `div.sv-case-sheet` | 1278.4×18123.3px · font General Sans · size 17px · color #16140E · width 1278.39px · position relative | `color.ink` |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Borrow the structure as measured; only the values (colour, type) change with Sina's own tokens.
- **RTL:** Mirrors with `dir="rtl"` if built with logical properties (`margin-inline-start`, `text-align: start`); verify anything absolutely positioned.
- **Persian:** Short labels need `_fa` twins; decide once whether mono/uppercase labels stay Latin or get a Persian equivalent (uppercase does not exist in Persian — use tracking + size instead).

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| component | `src/components/CaseStudy/SectionIndex.tsx` | SectionIndex | Page chrome of `/work/[slug]`, not CMS-editable; fed by `buildChapters()` from the controlled `csNarrative` labels (D-022). |

**Implemented (2026-09-22):** chapter numbers + labels as plain anchors in a sticky inline-start rail, `xl` and up only (phones and tablets get no index — content first); active chapter from geometry on IntersectionObserver callbacks, announced with `aria-current`; smooth in-page scrolling only under `prefers-reduced-motion: no-preference`; rendered only when a case study has 4+ chapters. Labels come from `src/components/CaseStudy/copy.ts` in all seven locales.

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-14-f01…f06-sheet.png` — 6 viewport frames, sheet, taken every few hundred ms while scrolling through
- `DS-14-f01…f06-chapter-rail.png` — 6 viewport frames, chapter rail, taken every few hundred ms while scrolling through
- `DS-14-1-desktop-chapter-rail.png` — chapter rail · crop @2x · desktop
- `DS-14-2-desktop-sheet.png` — sheet · crop @2x · desktop
- `DS-14.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-14.json`
- [ ] For Sina written (take · RTL · Persian)
- [ ] Target mapping agreed
