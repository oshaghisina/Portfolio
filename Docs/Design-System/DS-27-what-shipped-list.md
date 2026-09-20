---
id: "DS-27"                    # DS-NN — equals this file's prefix
title: "“What shipped” list"                 # Pattern name, e.g. "Single-accent rule"
slug: "what-shipped-list"                  # kebab-case; the file is <id>-<slug>.md
category: "component"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 1               # 1 = first sprint · 2 = next · 3 = later
adoption: "adopted"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: content
    section: "Content model"
target:                   # where it lands in the codebase
  kind: "component"
  path: "src/components/ShippedList/index.tsx"
  name: "ShippedList"
rtl: "mirrors"                   # mirrors | neutral | needs-redesign
localization: "copy"          # none | labels | copy | typeface — what needs a fa twin
tokens: []                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-27-1-desktop-results.png", "pleurat-com/DS-27-2-desktop-bullet.png", "pleurat-com/DS-27.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "ready"             # draft | review | ready
---

# DS-27 — “What shipped” list

> Every case study closes with a mono label WHAT SHIPPED and three or four ↳ bullets — outcomes forced into every story.

## What it is
Every case study ends with `.sv-results`: an h3 label “WHAT SHIPPED” in the eyebrow treatment and a `ul` of three or four short bullets, each prefixed by a `↳` drawn with `li::before` and separated by hairlines — “Three mobile apps for three users. / Marketing site with e-commerce. / POS-grade kiosk for every device.” It is the last content block before the next-case card.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-27.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **results** | `div.sv-rv.is-in` | 1180.5×228px · font General Sans · size 17px · weight 400 · leading 26.35px · color #16140E · borderTop 1px solid #16140E @16% | `color.ink` |
| ↳ label | `h3` h3 | 1180.5×16.3px · font General Sans · size 10.5px · weight 400 · tracking 1.89px · leading 16.275px · case uppercase · color #8B8577 · borderTop 0px none — “WHAT SHIPPED” | `color.ink-3`, `font.size.eyebrow` |
| ↳ list | `ul` ul | 1180.5×168.8px · font General Sans · size 17px · weight 400 · leading 26.35px · color #16140E — “Three mobile apps for three users. Marke” | `color.ink` |
| ↳ bullet | `li` li | 1180.5×56.3px · font General Sans · size 15px · weight 400 · leading 23.25px · color #16140E · gap 16px · display flex — “Three mobile apps for three users.” | `color.ink`, `font.size.button` |
| **bullet** | `li` | 1180.5×56.3px · font General Sans · size 15px · weight 400 · leading 23.25px · color #16140E · gap 16px · display flex | `color.ink`, `font.size.button` |
| ↳ arrow | `::before` | content "↳" · font General Sans · size 15px · weight 400 · leading 23.25px · color #5B50C7 · borderTop 0px none — "↳" | `font.size.button` |

## Why it works
It forces an outcome statement into every study in a shape that takes ten seconds to read, and the arrow glyph says “this came out of the above” better than a bullet dot would. Because it is always last, the visitor learns to jump to it.

## For Sina
- **Take:** Borrow as a required `outcomes[]` field on `projects` (3–4 short strings) rendered by `ShippedList`; make the label configurable (“What shipped” / “What changed” / “What we learned”) since Sina's marketing work ships campaigns, not apps.
- **RTL:** Mirrors: the `↳` becomes `↲` (mirror the glyph) and the list aligns start.
- **Persian:** Copy — each bullet gets an `_fa` twin; keep them to one line.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| component | `src/components/ShippedList/index.tsx` | ShippedList | Component `src/components/ShippedList/index.tsx`; `projects.outcomes` array (localized text), label from a select. |

**Implemented (2026-09-19):** `items[]` + `label` preset (`shipped | changed | learned`, EN/FA) or free text; the ↳ glyph mirrors in RTL. Shown on `/design`.

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-27-1-desktop-results.png` — results · crop @2x · desktop
- `DS-27-2-desktop-bullet.png` — bullet · crop @2x · desktop
- `DS-27.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-27.json`
- [x] For Sina written (take · RTL · Persian)
- [x] Target mapping agreed
