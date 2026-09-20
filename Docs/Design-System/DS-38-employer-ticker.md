---
id: "DS-38"                    # DS-NN — equals this file's prefix
title: "Employer ticker"                 # Pattern name, e.g. "Single-accent rule"
slug: "employer-ticker"                  # kebab-case; the file is <id>-<slug>.md
category: "motion"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 2               # 1 = first sprint · 2 = next · 3 = later
adoption: "candidate"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Brand storytelling"
target:                   # where it lands in the codebase (no code yet)
  kind: "block"
  path: "src/blocks/ExperienceTicker/config.ts"
  name: "experienceTicker"
rtl: "needs-redesign"                   # mirrors | neutral | needs-redesign
localization: "copy"          # none | labels | copy | typeface — what needs a fa twin
tokens: []                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-38-1-desktop-street.png", "pleurat-com/DS-38-f01-street.png", "pleurat-com/DS-38-f02-street.png", "pleurat-com/DS-38-f03-street.png", "pleurat-com/DS-38-f04-street.png", "pleurat-com/DS-38-f05-street.png", "pleurat-com/DS-38-f06-street.png", "pleurat-com/DS-38-f07-street.png", "pleurat-com/DS-38-f08-street.png", "pleurat-com/DS-38-street.webm", "pleurat-com/DS-38.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "draft"             # draft | review | ready
---

# DS-38 — Employer ticker

> `06 ThemeForest · Frontend Developer & UX/UI` rotates through employers above an illustrated skyline while a figure walks — a career as a passing train.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-38.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **street** | `div.sv-rv.is-in` | 1278.4×129.8px · font General Sans · size 17px · weight 400 · color #16140E · height 129.781px · transition opacity 0.8s, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) | `color.ink` |
| ↳ index | `span` .ix | 15.4×16.3px · font General Sans · size 10.5px · weight 400 · tracking 1.68px · color #C77E0A · height 16.2656px — “04” | `font.size.eyebrow` |
| ↳ employer | `span` strong, b, .name | 67.1×34.6px · font General Sans · size 22.32px · weight 500 · tracking -0.4464px · color #16140E · height 34.5781px — “Toyota” | `color.ink` |
| ↳ role | `span` span:not(.ix), .role | 197.5×34.6px · font General Sans · size 17px · weight 400 · color #16140E · gap 14px · display flex · height 34.5781px · animation 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both sv-street-say — “Toyota Brand & Interface” | `color.ink` |
| ↳ skyline | `svg` svg | 1278.4×83.2px · font General Sans · size 17px · weight 400 · color #16140E · height 83.2031px | `color.ink` |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Borrow the structure as measured; only the values (colour, type) change with Sina's own tokens.
- **RTL:** Needs an RTL redesign — the direction of motion or reading order is part of the pattern.
- **Persian:** Body copy needs `_fa` twins; keep the English at Pleurat's length (2–4 sentences) so the Persian stays in parity.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| block | `src/blocks/ExperienceTicker/config.ts` | experienceTicker | New Payload block: `config.ts` + `Component.tsx` in `src/blocks/`, registered in `RenderBlocks.tsx`; fields per Content-Model §10. |

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-38-f01…f08-street.png` — 8 viewport frames, street, taken every few hundred ms while scrolling through
- `DS-38-1-desktop-street.png` — street · crop @2x · desktop
- `DS-38-street.webm` — short video, scrolls the section into and through view
- `DS-38.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-38.json`
- [ ] For Sina written (take · RTL · Persian)
- [ ] Target mapping agreed
