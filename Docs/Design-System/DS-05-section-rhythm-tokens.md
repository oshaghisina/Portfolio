---
id: "DS-05"                    # DS-NN — equals this file's prefix
title: "Section rhythm tokens"                 # Pattern name, e.g. "Single-accent rule"
slug: "section-rhythm-tokens"                  # kebab-case; the file is <id>-<slug>.md
category: "foundation"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 2               # 1 = first sprint · 2 = next · 3 = later
adoption: "adopted"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Visual language"
target:                   # where it lands in the codebase
  kind: "token"
  path: "Docs/Design-System/tokens/sina.tokens.json"
  name: "space.* → --spacing-section --spacing-section-sm --spacing-gutter --spacing-block"
rtl: "neutral"                   # mirrors | neutral | needs-redesign
localization: "none"          # none | labels | copy | typeface — what needs a fa twin
tokens: ["space.section", "space.section-bottom", "space.theme.section", "space.theme.section-sm"]                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-05.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "review"             # draft | review | ready
---

# DS-05 — Section rhythm tokens

> Vertical section padding as two clamp() tokens (≈96–200px and ≈70–150px) so the page rhythm is one decision, not per-section guesses.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-05.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Property | Value | Where measured | Token |
|---|---|---|---|
| section | `108px` | computed · `/ section.sv-pad` | `space.section` |
| section-bottom | `108px` | computed · `/ section.sv-pad` | `space.section-bottom` |
| theme.section | `clamp(96px, 15vh, 200px)` | stylesheet · `--sec-pad` | `space.theme.section` |
| theme.section-sm | `clamp(70px, 11vh, 150px)` | stylesheet · `--sec-pad-sm` | `space.theme.section-sm` |

Representative elements:

| Part | Role | Measured | Token |
|---|---|---|---|
| **section-ai-tools** | `section#tools.sv-wrap.sv-pad` | 1382.4×585.6px · paddingTop 108px · paddingBottom 108px · height 585.578px | `space.section` |
| **section-teams** | `section#profile.sv-wrap.sv-pad` | 1382.4×899.1px · paddingTop 108px · paddingBottom 108px · height 899.141px | `space.section` |
| **head-block** | `div.sv-head` | 1278.4×169.1px · height 169.125px | — |
| **chart-pin** | `div.sv-chart-pin.sv-ruled` | 1440×783px · paddingTop 45px · paddingBottom 45px · height 783px | — |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Borrow the structure as measured; only the values (colour, type) change with Sina's own tokens.
- **RTL:** Direction-neutral — nothing to mirror.
- **Persian:** Nothing to localize.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| token | `src/app/(frontend)/globals.css` | --spacing-section / --spacing-section-sm | Emitted into `@theme` by the future `scripts/tokens` step from `tokens/sina.tokens.json`; never hand-edited in CSS. |

**Implemented (2026-09-19):** fluid `section` / `section-sm` / `gutter` and fixed `block`; `RenderBlocks` uses `my-block`, `.container` reads `--spacing-gutter` and `--container-page`. Shown on `/design`.

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-05.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-05.json`
- [ ] For Sina written (take · RTL · Persian)
- [x] Target mapping agreed
