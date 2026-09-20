---
id: "DS-22"                    # DS-NN — equals this file's prefix
title: "Tag chips"                 # Pattern name, e.g. "Single-accent rule"
slug: "tag-chips"                  # kebab-case; the file is <id>-<slug>.md
category: "component"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 2               # 1 = first sprint · 2 = next · 3 = later
adoption: "adopted"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Visual language"
target:                   # where it lands in the codebase
  kind: "component"
  path: "src/components/Tag/index.tsx"
  name: "Tag"
rtl: "mirrors"                   # mirrors | neutral | needs-redesign
localization: "labels"          # none | labels | copy | typeface — what needs a fa twin
tokens: ["radius.chip", "color.line", "font.size.eyebrow"]                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-22-1-desktop-chip-row.png", "pleurat-com/DS-22-2-desktop-chip.png", "pleurat-com/DS-22.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "review"             # draft | review | ready
---

# DS-22 — Tag chips

> Small outlined chips after the problem statement (“Design System · Three mobile apps · Seamless handoff”) and as skill chips on the profile.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-22.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **chip-row** | `ul.chips` | 649.8×74.5px · font General Sans · size 17px · weight 400 · leading 26.35px · color #16140E · gap 10px · display flex · height 74.5312px | `color.ink` |
| ↳ chip | `li` li | 105.4×32.3px · font General Sans · size 10.5px · weight 400 · tracking 0.63px · leading 16.275px · color #57534A · padding 7px 12px · display list-item · border 1px solid #16140E @16% · height 32.2656px — “Design System” | `color.ink-2`, `font.size.eyebrow` |
| **chip** | `li` | 105.4×32.3px · font General Sans · size 10.5px · weight 400 · tracking 0.63px · leading 16.275px · color #57534A · padding 7px 12px · display list-item · border 1px solid #16140E @16% · height 32.2656px | `color.ink-2`, `font.size.eyebrow` |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Borrow the structure as measured; only the values (colour, type) change with Sina's own tokens.
- **RTL:** Mirrors with `dir="rtl"` if built with logical properties (`margin-inline-start`, `text-align: start`); verify anything absolutely positioned.
- **Persian:** Short labels need `_fa` twins; decide once whether mono/uppercase labels stay Latin or get a Persian equivalent (uppercase does not exist in Persian — use tracking + size instead).

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| component | `src/components/Tag/index.tsx` | Tag | New React component; cva for interactive variants, plain `cn()` compound for layout (see `src/components/ui/button.tsx` vs `card.tsx`). |

**Implemented (2026-09-19):** `Tag` (`neutral | brand | soft`) and `TagList`; eyebrow type in a `--radius-chip` box. Shown on `/design`.

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-22-1-desktop-chip-row.png` — chip row · crop @2x · desktop
- `DS-22-2-desktop-chip.png` — chip · crop @2x · desktop
- `DS-22.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-22.json`
- [ ] For Sina written (take · RTL · Persian)
- [x] Target mapping agreed
