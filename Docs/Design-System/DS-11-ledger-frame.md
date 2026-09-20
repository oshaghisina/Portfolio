---
id: "DS-11"                    # DS-NN — equals this file's prefix
title: "Ledger frame"                 # Pattern name, e.g. "Single-accent rule"
slug: "ledger-frame"                  # kebab-case; the file is <id>-<slug>.md
category: "layout"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 2               # 1 = first sprint · 2 = next · 3 = later
adoption: "candidate"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Visual language"
target:                   # where it lands in the codebase (no code yet)
  kind: "layout"
  path: "src/app/(frontend)/layout.tsx"
  name: "ledger frame"
rtl: "neutral"                   # mirrors | neutral | needs-redesign
localization: "none"          # none | labels | copy | typeface — what needs a fa twin
tokens: ["color.line", "size.container"]                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-11-1-desktop-wrap-viewport.png", "pleurat-com/DS-11-2-desktop-ruled-viewport.png", "pleurat-com/DS-11-3-desktop-site-root-viewport.png", "pleurat-com/DS-11.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "draft"             # draft | review | ready
---

# DS-11 — Ledger frame

> Two full-height hairline rules frame the content column and hairline separators divide sections — the page reads as one ruled sheet.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-11.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **wrap** | `div.sv-wrap` | 1382.4×375.8px · paddingLeft 52px · width 1382.39px · maxWidth 1382.4px | — |
| **ruled** | `div.sv-chart-pin.sv-ruled` | 1440×783px · borderTop 1px solid #16140E @8% · width 1440px | — |
| **site-root** | `div.site-root` | 1440×8035.1px · width 1440px | — |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Borrow the structure as measured; only the values (colour, type) change with Sina's own tokens.
- **RTL:** Direction-neutral — nothing to mirror.
- **Persian:** Nothing to localize.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| layout | `src/app/(frontend)/layout.tsx` | ledger frame | Part of the frontend layout / page template, not CMS-editable. |

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-11-1-desktop-wrap-viewport.png` — wrap · viewport shot · desktop
- `DS-11-2-desktop-ruled-viewport.png` — ruled · viewport shot · desktop
- `DS-11-3-desktop-site-root-viewport.png` — site root · viewport shot · desktop
- `DS-11.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-11.json`
- [ ] For Sina written (take · RTL · Persian)
- [ ] Target mapping agreed
