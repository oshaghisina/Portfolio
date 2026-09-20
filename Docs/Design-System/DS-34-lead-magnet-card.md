---
id: "DS-34"                    # DS-NN — equals this file's prefix
title: "Lead-magnet card"                 # Pattern name, e.g. "Single-accent rule"
slug: "lead-magnet-card"                  # kebab-case; the file is <id>-<slug>.md
category: "component"              # foundation | type-device | layout | component | motion | signature
take: "adapt"                  # borrow | adapt | avoid
priority: 3               # 1 = first sprint · 2 = next · 3 = later
adoption: "candidate"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: content
    section: "Content model"
target:                   # where it lands in the codebase (no code yet)
  kind: "block"
  path: "src/blocks/CallToAction/config.ts"
  name: "lead-magnet variant"
rtl: "mirrors"                   # mirrors | neutral | needs-redesign
localization: "copy"          # none | labels | copy | typeface — what needs a fa twin
tokens: []                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-34-1-desktop-ebook.png", "pleurat-com/DS-34.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 1         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "draft"             # draft | review | ready
---

# DS-34 — Lead-magnet card

> A rendered book cover, four bullets and one CTA (“Get the e-book · PDF · READ IT ANYWHERE”) — the profile page's only conversion device.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-34.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **ebook** | `div.sv-ebook-grid` | 1278.4×553.2px · font General Sans · size 17px · gap 86.4px · display grid · grid 548.312px 643.688px | — |
| ↳ plate | `div` .sv-ebook-plate | 548.3×483.7px · font General Sans · size 17px · display flex — “PDF · E-BOOK The Product Designer’s Mind” | — |
| ↳ book | `div` .book | 340×464.7px · font General Sans · size 17px — “PDF · E-BOOK The Product Designer’s Mind” | — |
| ↳ points | `ul` .sv-ebook-points | 643.7×233px · font General Sans · size 17px · gap 2px · display flex — “The product design workflow, end to end ” | — |
| ↳ cta | `a` .sv-ebook-cta .sv-btn | 177.8×49.3px · font General Sans · size 15px · bg #F3B44A · padding 13px 22px · gap 12px · display flex — “Get the e-book” | `color.brand`, `font.size.button` |
| ↳ note | `span` .sv-ebook-cta .note | 156×16.3px · font General Sans · size 10.5px · border 0px none — “PDF · READ IT ANYWHERE” | `font.size.eyebrow` |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Adapt — the pattern is right, the content or metaphor is Pleurat's; see the open question(s) below.
- **RTL:** Mirrors with `dir="rtl"` if built with logical properties (`margin-inline-start`, `text-align: start`); verify anything absolutely positioned.
- **Persian:** Body copy needs `_fa` twins; keep the English at Pleurat's length (2–4 sentences) so the Persian stays in parity.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| block | `src/blocks/CallToAction/config.ts` | lead-magnet variant | New Payload block: `config.ts` + `Component.tsx` in `src/blocks/`, registered in `RenderBlocks.tsx`; fields per Content-Model §10. |

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-34-1-desktop-ebook.png` — ebook · crop @2x · desktop
- `DS-34.json` — bounding boxes, computed styles and parts for every target above

## Open questions
> ❓ **Q1 — Choose:** What is Sina's lead magnet — the resume PDF, a short playbook, or nothing for v1?

## Review checklist
- [ ] Q1 — What is Sina's lead magnet — the resume PDF, a short playbook, or nothing for v1?
- [x] Measured table filled from `assets/pleurat-com/DS-34.json`
- [ ] For Sina written (take · RTL · Persian)
- [ ] Target mapping agreed
