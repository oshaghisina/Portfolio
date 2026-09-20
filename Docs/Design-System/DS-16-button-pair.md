---
id: "DS-16"                    # DS-NN — equals this file's prefix
title: "Button pair"                 # Pattern name, e.g. "Single-accent rule"
slug: "button-pair"                  # kebab-case; the file is <id>-<slug>.md
category: "component"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 1               # 1 = first sprint · 2 = next · 3 = later
adoption: "adopted"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Visual language"
target:                   # where it lands in the codebase
  kind: "component"
  path: "src/components/ui/button.tsx"
  name: "default / outline · arrow"
rtl: "mirrors"                   # mirrors | neutral | needs-redesign
localization: "labels"          # none | labels | copy | typeface — what needs a fa twin
tokens: ["color.brand", "color.on-brand", "radius.button", "size.control.height", "size.control.pad-x", "size.control.pad-y", "font.size.button", "motion.duration.button", "motion.ease.button", "motion.lift"]                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-16-1-desktop-filled.png", "pleurat-com/DS-16-10-desktop-text-link.png", "pleurat-com/DS-16-11-desktop-text-link-hover.png", "pleurat-com/DS-16-12-desktop-text-link-focus.png", "pleurat-com/DS-16-2-desktop-filled-hover.png", "pleurat-com/DS-16-3-desktop-filled-focus.png", "pleurat-com/DS-16-4-desktop-ghost.png", "pleurat-com/DS-16-5-desktop-ghost-hover.png", "pleurat-com/DS-16-6-desktop-ghost-focus.png", "pleurat-com/DS-16-7-desktop-pair.png", "pleurat-com/DS-16-8-desktop-pair-hover.png", "pleurat-com/DS-16-9-desktop-pair-focus.png", "pleurat-com/DS-16.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "ready"             # draft | review | ready
---

# DS-16 — Button pair

> A filled accent primary with a ↗ arrow and an outlined secondary, always shown as a pair — the only two button styles on the site.

## What it is
Two button styles and no third: the filled amber primary (`.sv-btn--amber`: 15px / 500 General Sans, ink text on `#F3B44A`, padding 13px 22px, ~49px tall, **0 radius**, always with a ↗ arrow SVG) and the outlined ghost (`.sv-btn--ghost`: same metrics, 1px ink border, transparent). They appear as a pair in the hero and on /work, and singly as the nav's smaller Contact (`.sv-nav-cta`, 16px, 6×13px padding, 37px tall). Hover lightens the amber (see `filled-hover`); focus shows a thick lime ring — the last living use of the stylesheet's lime palette.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-16.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **filled** | `a.sv-btn.sv-btn--amber` | 207.1×49.3px · font General Sans · size 15px · weight 500 · color #16140E · bg #F3B44A · padding 13px 22px · gap 12px · display flex · height 49.25px | `color.brand`, `color.ink`, `font.size.button`, `size.control.height` |
| ↳ arrow | `svg` svg | 17×17px · font General Sans · size 15px · weight 500 · color #16140E · height 17px | `color.ink`, `font.size.button` |
| **ghost** | `a.sv-btn.sv-btn--ghost` | 141.5×49.3px · font General Sans · size 15px · weight 500 · color #16140E · padding 13px 22px · gap 12px · display flex · height 49.25px · boxShadow rgba(22, 20, 14, 0.16) 0px 0px 0px 1px inset | `color.ink`, `font.size.button`, `size.control.height` |
| ↳ arrow | `svg` svg | 17×17px · font General Sans · size 15px · weight 500 · color #16140E · height 17px | `color.ink`, `font.size.button` |
| **pair** | `div.sv-hero-cta` | 360.6×49.3px · font General Sans · size 17px · weight 400 · color #16140E · gap 12px · display flex · height 49.25px | `color.ink`, `size.control.height` |
| **text-link** | `a.sv-tlink` | 158.9×28.3px · font General Sans · size 15px · weight 500 · color #16140E · padding 0px 0px 4px · gap 9px · display flex · height 28.25px | `color.ink`, `font.size.button` |

## Why it works
Square corners on a cream page make the buttons read as printed plates rather than web buttons, which fits the drafting-sheet metaphor; the always-present arrow says “this leaves the page/section” and gives the pair a shared silhouette. Two styles are enough because the accent rule (DS-01) already tells you which one matters.

## For Sina
- **Take:** Borrow the pair and the metrics; map onto the template's cva `Button` as `variant: default` (filled brand) and `variant: outline`, with an `icon` slot for the arrow. Decide radius as a token (DS-07) rather than inheriting Pleurat's 0px by accident. Fix the focus ring to a deliberate colour.
- **RTL:** Mirrors: the ↗ arrow must become ↖ (flip on the x-axis) in RTL; padding is symmetric so nothing else moves.
- **Persian:** Labels — button copy gets `_fa` twins; Persian labels run ~20% longer, so keep `min-width` off and let padding define the width.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| component | `src/components/ui/button.tsx` | default / outline + icon | `src/components/ui/button.tsx`: keep cva; set `default` to brand + ink foreground, `outline` to 1px `--border` on transparent; add `size: cta` (h-12 px-[22px]) and an `arrow` prop; ring colour from `--ring`. |

**Implemented (2026-09-19):** `default` (brand) and `outline` (hairline) carry the design; sizes come from the control tokens — `default` *is* the CTA height, so there is no separate `cta` size; `arrow` prop (works with `asChild` through Radix `Slottable`) renders ↗ with `rtl:-scale-x-100`; focus ring is `--ring`. `CMSLink` passes `arrow` through. Shown on `/design`.

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-16-1-desktop-filled.png` — filled · crop @2x · desktop
- `DS-16-2-desktop-filled-hover.png` — filled · hover state · desktop
- `DS-16-3-desktop-filled-focus.png` — filled · focus state · desktop
- `DS-16-4-desktop-ghost.png` — ghost · crop @2x · desktop
- `DS-16-5-desktop-ghost-hover.png` — ghost · hover state · desktop
- `DS-16-6-desktop-ghost-focus.png` — ghost · focus state · desktop
- `DS-16-7-desktop-pair.png` — pair · crop @2x · desktop
- `DS-16-8-desktop-pair-hover.png` — pair · hover state · desktop
- `DS-16-9-desktop-pair-focus.png` — pair · focus state · desktop
- `DS-16-10-desktop-text-link.png` — text link · crop @2x · desktop
- `DS-16-11-desktop-text-link-hover.png` — text link · hover state · desktop
- `DS-16-12-desktop-text-link-focus.png` — text link · focus state · desktop
- `DS-16.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-16.json`
- [x] For Sina written (take · RTL · Persian)
- [x] Target mapping agreed
