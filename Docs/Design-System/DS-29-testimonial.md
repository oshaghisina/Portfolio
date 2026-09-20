---
id: "DS-29"                    # DS-NN — equals this file's prefix
title: "Testimonial"                 # Pattern name, e.g. "Single-accent rule"
slug: "testimonial"                  # kebab-case; the file is <id>-<slug>.md
category: "component"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 2               # 1 = first sprint · 2 = next · 3 = later
adoption: "candidate"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: content
    section: "How work is showcased"
target:                   # where it lands in the codebase (no code yet)
  kind: "block"
  path: "src/blocks/Testimonial/config.ts"
  name: "testimonial"
rtl: "mirrors"                   # mirrors | neutral | needs-redesign
localization: "copy"          # none | labels | copy | typeface — what needs a fa twin
tokens: []                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-29-1-desktop-quote.png", "pleurat-com/DS-29.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "draft"             # draft | review | ready
---

# DS-29 — Testimonial

> A single quote in body type with a mono attribution (“MINDPATH, FOUNDING TEAM”) placed after the outcome stats.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-29.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **quote** | `blockquote.sv-rv.is-in` | 1180.5×524.4px · font General Sans · size 17px · weight 400 · leading 26.35px · color #16140E · padding 72px 0px · textAlign start | `color.ink` |
| ↳ text | `p` p | 928.5×342.1px · font General Sans · size 51.84px · weight 500 · tracking -1.0368px · leading 68.4288px · color #16140E · maxWidth 928.454px · textAlign start — ““We expected it to take weeks or even mo” | `color.ink` |
| ↳ cite | `cite` cite | 1180.5×16.3px · font General Sans · size 10.5px · weight 400 · tracking 1.47px · leading 16.275px · case uppercase · color #8B8577 · borderLeft 0px none · textAlign start — “MINDPATH, FOUNDING TEAM” | `color.ink-3`, `font.size.eyebrow` |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Borrow the structure as measured; only the values (colour, type) change with Sina's own tokens.
- **RTL:** Mirrors with `dir="rtl"` if built with logical properties (`margin-inline-start`, `text-align: start`); verify anything absolutely positioned.
- **Persian:** Body copy needs `_fa` twins; keep the English at Pleurat's length (2–4 sentences) so the Persian stays in parity.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| block | `src/blocks/Testimonial/config.ts` | testimonial | New Payload block: `config.ts` + `Component.tsx` in `src/blocks/`, registered in `RenderBlocks.tsx`; fields per Content-Model §10. |

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-29-1-desktop-quote.png` — quote · crop @2x · desktop
- `DS-29.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-29.json`
- [ ] For Sina written (take · RTL · Persian)
- [ ] Target mapping agreed
