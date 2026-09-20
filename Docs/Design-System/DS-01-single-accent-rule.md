---
id: "DS-01"                    # DS-NN — equals this file's prefix
title: "Single-accent rule"                 # Pattern name, e.g. "Single-accent rule"
slug: "single-accent-rule"                  # kebab-case; the file is <id>-<slug>.md
category: "foundation"              # foundation | type-device | layout | component | motion | signature
take: "adapt"                  # borrow | adapt | avoid
priority: 1               # 1 = first sprint · 2 = next · 3 = later
adoption: "adopted"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Visual language"
target:                   # where it lands in the codebase
  kind: "token"
  path: "Docs/Design-System/tokens/sina.tokens.json"
  name: "color.*.brand → --brand"
rtl: "neutral"                   # mirrors | neutral | needs-redesign
localization: "none"          # none | labels | copy | typeface — what needs a fa twin
tokens: ["color.brand", "color.on-brand", "color.tag", "color.theme.accent", "color.theme.focus-ring"]                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-01-1-desktop-cta.png", "pleurat-com/DS-01-2-desktop-nav-contact.png", "pleurat-com/DS-01-3-desktop-bench-titlebar.png", "pleurat-com/DS-01-4-desktop-section-tag.png", "pleurat-com/DS-01.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 1         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "review"             # draft | review | ready
---

# DS-01 — Single-accent rule

> One accent colour with exactly three jobs — primary CTA, section tag, the “live” state of charts — and nowhere else; the restraint is what makes it read as brand.

## What it is
Pleurat uses one accent — amber `#F3B44A` — and gives it exactly three jobs: the primary button (hero CTA and the nav's Contact), the section tag that opens every section (`::before` on the section, uppercase, amber plate) and the “live” parts of data (filled bars, the bench's title bar). Everything else on the page is paper and ink. The stylesheet still ships a second accent (lime `#C0EB3A` in `--color-accent`/`--lime`) that only survives as the **focus ring** — see the `filled-focus` crop.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-01.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Property | Value | Where measured | Token |
|---|---|---|---|
| brand | `#F3B44A` | computed · `/ .sv-btn--amber` | `color.brand` |
| on-brand | `#16140E` | computed · `/ .sv-btn--amber` | `color.on-brand` |
| tag | `#F3B44A` | computed · `/ .sv-cn-bar` | `color.tag` |
| theme.accent | `#C0EB3A` | stylesheet · `--color-accent` | `color.theme.accent` |
| theme.focus-ring | `#C0EB3A` | stylesheet · `--focus-ring` | `color.theme.focus-ring` |

Representative elements:

| Part | Role | Measured | Token |
|---|---|---|---|
| **cta** | `a.sv-btn.sv-btn--amber` | 207.1×49.3px · font General Sans · size 15px · weight 500 · leading 23.25px · color #16140E · bg #F3B44A · padding 13px 22px · gap 12px · display flex · height 49.25px · width 207.078px | `color.brand`, `color.ink`, `font.size.button`, `size.control.height` |
| **nav-contact** | `a.sv-btn.sv-btn--amber` | 87.4×36.8px · font General Sans · size 16px · weight 500 · leading 24.8px · color #16140E · bg #F3B44A · padding 6px 13px · gap 8px · display flex · height 36.7969px · width 87.375px | `color.brand`, `color.ink`, `size.control.height-sm` |
| **bench-titlebar** | `div.sv-cn-bar` | 1276.4×40px · font General Sans · size 17px · weight 400 · leading 26.35px · color #16140E · bg #F3B44A · padding 0px 14px · gap 16px · display flex · height 40px · width 1276.39px | `color.brand`, `color.ink` |
| **section-tag** | `section#focus.sv-inst-sec` | 1440×645.6px · font General Sans · size 17px · weight 400 · leading 26.35px · color #16140E · height 645.562px · width 1440px | `color.ink` |
| ↳ tag | `::before` | content "Tracks" · font General Sans · size 10.5px · weight 500 · tracking 1.68px · leading 10.5px · case uppercase · color #16140E · bg #F3B44A · padding 9px 13px 8px · height 27.5px · width 77.8906px — "Tracks" | `color.brand`, `color.ink`, `font.size.eyebrow` |

## Why it works
Scarcity is what makes the colour read as brand rather than decoration: because amber only ever means “act here” or “this is the live bit”, the eye learns the rule in one screen and every CTA is found without hunting. Keeping the accent off text also keeps contrast problems away (amber on cream is ~1.6:1 — fine for a plate, useless for type).

## For Sina
- **Take:** Adapt — keep the *rule* (one accent, three jobs: primary action · section tag · live data), replace the *value*. Pleurat's amber is the reference for weight and contrast (ink on accent 13.5:1), not the colour. Q1 below is the decision.
- **RTL:** Direction-neutral; the accent rule has no side.
- **Persian:** Nothing to localize. If the accent is used on a Persian section tag, check it against the Persian face's heavier strokes.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| token | `src/app/(frontend)/globals.css` | --color-brand | Becomes `--color-brand` (+ `--color-brand-foreground` = ink) in `@theme`; the template's `--primary` maps onto it. Add the focus-ring colour as a separate token so it is a decision, not an accident like Pleurat's lime. |

**Implemented (2026-09-19):** `color.light.brand` / `color.dark.brand` (+ `brand-foreground`, `ring`) in `sina.tokens.json`, emitted as `--brand`, `--brand-foreground`, `--ring` (`bg-brand`, `text-brand` …); shadcn `--primary` / `--ring` alias them. The value is a placeholder cobalt (D-017) — the rule is adopted, Q1 stays open. Shown on `/design`.

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-01-1-desktop-cta.png` — cta · crop @2x · desktop
- `DS-01-2-desktop-nav-contact.png` — nav contact · crop @2x · desktop
- `DS-01-3-desktop-bench-titlebar.png` — bench titlebar · crop @2x · desktop
- `DS-01-4-desktop-section-tag.png` — section tag · crop @2x · desktop
- `DS-01.json` — bounding boxes, computed styles and parts for every target above

## Open questions
> ❓ **Q1 — Choose:** Which accent colour is Sina's? (pleurat's amber #F3B44A is the reference for weight and contrast, not the value)

## Review checklist
- [ ] Q1 — Which accent colour is Sina's? (pleurat's amber #F3B44A is the reference for weight and contrast, not the value)
- [x] Measured table filled from `assets/pleurat-com/DS-01.json`
- [x] For Sina written (take · RTL · Persian)
- [x] Target mapping agreed
