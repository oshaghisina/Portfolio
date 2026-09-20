---
id: "DS-07"                    # DS-NN — equals this file's prefix
title: "Control tokens"                 # Pattern name, e.g. "Single-accent rule"
slug: "control-tokens"                  # kebab-case; the file is <id>-<slug>.md
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
  name: "size.control.* → --size-control-* · radius.* → --radius-*"
rtl: "neutral"                   # mirrors | neutral | needs-redesign
localization: "none"          # none | labels | copy | typeface — what needs a fa twin
tokens: ["radius.button", "radius.chip", "radius.media", "radius.panel", "size.control.height", "size.control.height-sm", "size.control.pad-x", "size.control.pad-y", "radius.theme.card", "radius.theme.pill"]                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-07-1-desktop-cta.png", "pleurat-com/DS-07-2-desktop-ghost.png", "pleurat-com/DS-07-3-desktop-nav-cta.png", "pleurat-com/DS-07-4-desktop-chip.png", "pleurat-com/DS-07-5-desktop-console-button.png", "pleurat-com/DS-07-6-desktop-panel.png", "pleurat-com/DS-07.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "review"             # draft | review | ready
---

# DS-07 — Control tokens

> Control heights (46/34px) with matching padding pairs and three radii (card, pill, media) — the sizes every button, chip and tag share.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-07.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Property | Value | Where measured | Token |
|---|---|---|---|
| button | `0px` | computed · `/ .sv-btn` | `radius.button` |
| chip | `0px` | computed · `/work/otee ul.chips li` | `radius.chip` |
| media | `0px` | computed · `/work/otee figure.sv-fig .frame` | `radius.media` |
| panel | `0px` | computed · `/ .sv-console` | `radius.panel` |
| control.height | `49.25px` | computed · `/ .sv-hero-cta .sv-btn` | `size.control.height` |
| control.height-sm | `36.8px` | computed · `/ .sv-nav-cta` | `size.control.height-sm` |
| control.pad-x | `22px` | computed · `/ .sv-hero-cta .sv-btn` | `size.control.pad-x` |
| control.pad-y | `13px` | computed · `/ .sv-hero-cta .sv-btn` | `size.control.pad-y` |
| theme.card | `18px` | stylesheet · `--hx-radius` | `radius.theme.card` |
| theme.pill | `100px` | stylesheet · `--radius-pill` | `radius.theme.pill` |

Representative elements:

| Part | Role | Measured | Token |
|---|---|---|---|
| **cta** | `a.sv-btn.sv-btn--amber` | 207.1×49.3px · size 15px · weight 500 · padding 13px 22px · gap 12px · height 49.25px | `font.size.button`, `size.control.height` |
| **ghost** | `a.sv-btn.sv-btn--ghost` | 141.5×49.3px · size 15px · weight 500 · padding 13px 22px · gap 12px · height 49.25px | `font.size.button`, `size.control.height` |
| **nav-cta** | `a.sv-btn.sv-btn--amber` | 87.4×36.8px · size 16px · weight 500 · padding 6px 13px · gap 8px · height 36.7969px | `size.control.height-sm` |
| **chip** | `span.tag` | 61.8×28.3px · size 10.5px · weight 400 · tracking 1.365px · padding 5px 10px · border 1px solid #16140E @8% · height 28.2656px | `font.size.eyebrow` |
| **console-button** | `button` | 53.7×30.3px · size 10.5px · weight 400 · tracking 1.26px · padding 6px 10px · border 1px solid #FBF7E6 @18% · height 30.2656px | `font.size.eyebrow` |
| **panel** | `div.sv-console` | 1278.4×827.8px · size 17px · weight 400 · border 1px solid #16140E @16% · height 827.797px | — |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Borrow the structure as measured; only the values (colour, type) change with Sina's own tokens.
- **RTL:** Direction-neutral — nothing to mirror.
- **Persian:** Nothing to localize.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| token | `src/components/ui/button.tsx` | size variants · --radius | Emitted into `@theme` by the future `scripts/tokens` step from `tokens/sina.tokens.json`; never hand-edited in CSS. |

**Implemented (2026-09-19):** Button sizes read `--size-control-height` / `-height-sm` / `-pad-x`; radii `sm md lg xl control chip media panel` are explicit tokens (4px controls — a decision, not pleurat's 0px by accident) and replace the template's `calc(var(--radius) ± n)` derivations. Shown on `/design`.

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-07-1-desktop-cta.png` — cta · crop @2x · desktop
- `DS-07-2-desktop-ghost.png` — ghost · crop @2x · desktop
- `DS-07-3-desktop-nav-cta.png` — nav cta · crop @2x · desktop
- `DS-07-4-desktop-chip.png` — chip · crop @2x · desktop
- `DS-07-5-desktop-console-button.png` — console button · crop @2x · desktop
- `DS-07-6-desktop-panel.png` — panel · crop @2x · desktop
- `DS-07.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-07.json`
- [ ] For Sina written (take · RTL · Persian)
- [x] Target mapping agreed
