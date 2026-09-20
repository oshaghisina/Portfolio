---
id: "DS-30"                    # DS-NN — equals this file's prefix
title: "Figure treatment and layouts"                 # Pattern name, e.g. "Single-accent rule"
slug: "figure-treatment-and-layouts"                  # kebab-case; the file is <id>-<slug>.md
category: "component"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 2               # 1 = first sprint · 2 = next · 3 = later
adoption: "candidate"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Key screens"
target:                   # where it lands in the codebase (no code yet)
  kind: "block"
  path: "src/blocks/MediaBlock/config.ts"
  name: "layouts: full · two · three"
rtl: "neutral"                   # mirrors | neutral | needs-redesign
localization: "labels"          # none | labels | copy | typeface — what needs a fa twin
tokens: []                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-30-1-desktop-figure.png", "pleurat-com/DS-30-2-desktop-figure-grid.png", "pleurat-com/DS-30.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "draft"             # draft | review | ready
---

# DS-30 — Figure treatment and layouts

> App screens sit inset in a grey frame; figures come full-bleed, in two columns or three — three layouts cover every case-study image.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-30.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **figure** | `figure.sv-fig.sv-rv` | 1180.5×579.8px · width 1180.48px | — |
| ↳ frame | `div` .frame | 1180.5×579.8px · bg #EFE9D2 · border 1px solid #16140E @16% · width 1180.48px | — |
| ↳ img | `img` img | 1178.5×577.8px · width 1178.48px | — |
| **figure-grid** | `div.sv-duo.cols-2` | 1180.5×358px · gap 23.04px · display grid · grid 578.719px 578.734px · width 1180.48px | — |
| ↳ cell | `figure` figure | 578.7×358px · width 578.719px | — |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Borrow the structure as measured; only the values (colour, type) change with Sina's own tokens.
- **RTL:** Direction-neutral — nothing to mirror.
- **Persian:** Short labels need `_fa` twins; decide once whether mono/uppercase labels stay Latin or get a Persian equivalent (uppercase does not exist in Persian — use tracking + size instead).

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| block | `src/blocks/MediaBlock/config.ts` | layouts: full · two · three | New Payload block: `config.ts` + `Component.tsx` in `src/blocks/`, registered in `RenderBlocks.tsx`; fields per Content-Model §10. |

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-30-1-desktop-figure.png` — figure · crop @2x · desktop
- `DS-30-2-desktop-figure-grid.png` — figure grid · crop @2x · desktop
- `DS-30.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-30.json`
- [ ] For Sina written (take · RTL · Persian)
- [ ] Target mapping agreed
