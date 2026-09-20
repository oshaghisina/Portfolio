---
id: "DS-12"                    # DS-NN — equals this file's prefix
title: "Section opener"                 # Pattern name, e.g. "Single-accent rule"
slug: "section-opener"                  # kebab-case; the file is <id>-<slug>.md
category: "layout"              # foundation | type-device | layout | component | motion | signature
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
  path: "src/components/SectionHeader/index.tsx"
  name: "SectionHeader"
rtl: "mirrors"                   # mirrors | neutral | needs-redesign
localization: "labels"          # none | labels | copy | typeface — what needs a fa twin
tokens: ["color.brand", "color.line-2", "font.size.eyebrow", "font.tracking.eyebrow"]                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-12-1-desktop-opener-tracks.png", "pleurat-com/DS-12-2-desktop-opener-numbers.png", "pleurat-com/DS-12-3-desktop-opener-teams.png", "pleurat-com/DS-12-4-desktop-head-block.png", "pleurat-com/DS-12-5-mobile-opener-tracks.png", "pleurat-com/DS-12-6-mobile-opener-numbers.png", "pleurat-com/DS-12-7-mobile-opener-teams.png", "pleurat-com/DS-12-8-mobile-head-block.png", "pleurat-com/DS-12.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "ready"             # draft | review | ready
---

# DS-12 — Section opener

> Every section opens with an accent tag pinned to the hairline rule and a corner bracket opposite — a drawing-sheet title block that doubles as wayfinding.

## What it is
Each section opens with a *title block*: the section's `::before` draws an amber tag (10.5px uppercase, tracking 1.68px, ink on `#F3B44A`, padding 9/13/8px, 27.5px tall) pinned to the top-left of the hairline rule — 56.8px in from the edge on desktop, 13px on mobile — and the `::after` draws a 20px-tall corner bracket across the wrap's top edge. The tag text comes from the section (“Tracks”, “By the numbers”, “Teams”, “AI tools”), so the opener is the same component everywhere and only the word changes. Below it, `.sv-head` holds the two-tone h2 and a short lede.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-12.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **opener-tracks** (desktop) | `section#focus.sv-inst-sec` | 1440×645.6px · font General Sans · size 17px · weight 400 · color #16140E · borderTop 1px solid #16140E @16% · height 645.562px · width 1440px · position relative | `color.ink` |
| ↳ tag (desktop) | `::before` | content "Tracks" · font General Sans · size 10.5px · weight 500 · tracking 1.68px · case uppercase · color #16140E · bg #F3B44A · padding 9px 13px 8px · height 27.5px · width 77.8906px · position absolute · left 56.7969px — "Tracks" | `color.brand`, `color.ink`, `font.size.eyebrow` |
| ↳ bracket (desktop) | `::after` | font General Sans · size 17px · weight 400 · color #16140E · height 20px · width 1326.41px · position absolute · left 56.7969px — "" | `color.ink` |
| **opener-numbers** (desktop) | `i.sv-pin-mark` | 1440×20px · font General Sans · size 17px · weight 400 · color #16140E · height 20px · width 1440px · position absolute | `color.ink` |
| ↳ tag (desktop) | `::before` | content "By the numbers" · font General Sans · size 10.5px · weight 500 · tracking 1.68px · case uppercase · color #16140E · bg #F3B44A · padding 9px 13px 8px · height 27.5px · width 138.688px · position absolute · left 56.7969px — "By the numbers" | `color.brand`, `color.ink`, `font.size.eyebrow` |
| ↳ bracket (desktop) | `::after` | font General Sans · size 17px · weight 400 · color #16140E · height 20px · width 1326.41px · position absolute · left 56.7969px — "" | `color.ink` |
| **opener-teams** (desktop) | `section#profile.sv-wrap.sv-pad` | 1382.4×899.1px · font General Sans · size 17px · weight 400 · color #16140E · padding 108px 52px · height 899.141px · width 1382.39px · position relative | `color.ink` |
| ↳ tag (desktop) | `::before` | content "Teams" · font General Sans · size 10.5px · weight 500 · tracking 1.68px · case uppercase · color #16140E · bg #F3B44A · padding 9px 13px 8px · height 27.5px · width 70.8281px · position absolute · left 28px — "Teams" | `color.brand`, `color.ink`, `font.size.eyebrow` |
| ↳ bracket (desktop) | `::after` | font General Sans · size 17px · weight 400 · color #16140E · height 20px · width 1326.39px · position absolute · left 28px — "" | `color.ink` |
| ↳ heading (desktop) | `h2` .sv-head h2 | 629.3×55.3px · font General Sans · size 43.92px · weight 500 · tracking -1.3176px · color #16140E · height 55.3281px · width 629.281px — “Where I've worked” | `color.ink`, `font.size.h2` |
| **head-block** (desktop) | `div.sv-head` | 1278.4×169.1px · font General Sans · size 17px · weight 400 · color #16140E · height 169.125px · width 1278.39px | `color.ink` |
| **opener-tracks** (mobile) | `section#focus.sv-inst-sec` | 390×787.8px · font General Sans · size 16.5px · weight 400 · color #16140E · borderTop 1px solid #16140E @16% · height 787.75px · width 390px · position relative | `color.ink` |
| ↳ tag (mobile) | `::before` | content "Tracks" · font General Sans · size 10.5px · weight 500 · tracking 1.68px · case uppercase · color #16140E · bg #F3B44A · padding 9px 13px 8px · height 27.5px · width 77.8906px · position absolute · left 13px — "Tracks" | `color.brand`, `color.ink`, `font.size.eyebrow` |
| ↳ bracket (mobile) | `::after` | font General Sans · size 16.5px · weight 400 · color #16140E · height 20px · width 364px · position absolute · left 13px — "" | `color.ink` |
| **opener-numbers** (mobile) | `i.sv-pin-mark` | 390×20px · font General Sans · size 16.5px · weight 400 · color #16140E · height 20px · width 390px · position absolute | `color.ink` |
| ↳ tag (mobile) | `::before` | content "By the numbers" · font General Sans · size 10.5px · weight 500 · tracking 1.68px · case uppercase · color #16140E · bg #F3B44A · padding 9px 13px 8px · height 27.5px · width 138.688px · position absolute · left 13px — "By the numbers" | `color.brand`, `color.ink`, `font.size.eyebrow` |
| ↳ bracket (mobile) | `::after` | font General Sans · size 16.5px · weight 400 · color #16140E · height 20px · width 364px · position absolute · left 13px — "" | `color.ink` |
| **opener-teams** (mobile) | `section#profile.sv-wrap.sv-pad` | 390×2241.5px · font General Sans · size 16.5px · weight 400 · color #16140E · padding 67.52px 25px · height 2241.52px · width 390px · position relative | `color.ink` |
| ↳ tag (mobile) | `::before` | content "Teams" · font General Sans · size 10.5px · weight 500 · tracking 1.68px · case uppercase · color #16140E · bg #F3B44A · padding 9px 13px 8px · height 27.5px · width 70.8281px · position absolute · left 13px — "Teams" | `color.brand`, `color.ink`, `font.size.eyebrow` |
| ↳ bracket (mobile) | `::after` | font General Sans · size 16.5px · weight 400 · color #16140E · height 20px · width 364px · position absolute · left 13px — "" | `color.ink` |
| ↳ heading (mobile) | `h2` .sv-head h2 | 340×45.8px · font General Sans · size 33.93px · weight 500 · tracking -1.0179px · color #16140E · height 45.7969px · width 340px — “Where I've worked” | `color.ink` |
| **head-block** (mobile) | `div.sv-head` | 340×220.7px · font General Sans · size 16.5px · weight 400 · color #16140E · height 220.703px · width 340px | `color.ink` |

## Why it works
It turns the page into a numbered drawing sheet: the eye can skim tags down the left edge to find a section, the bracket says “new sheet starts here” without a heavy divider, and using pseudo-elements keeps the markup to one attribute. Consistency is the whole point — the opener is the one thing every section shares.

## For Sina
- **Take:** Borrow as a `SectionHeader` component: `tag` (short label), `lead`/`tail` (two-tone heading), `lede`. Render the tag as a real element (not `::before`) so it can be localized and read by screen readers.
- **RTL:** Mirrors: tag and bracket move to the top-*right* of the rule in RTL — trivial with `inset-inline-start`. Nothing else changes.
- **Persian:** Labels — every tag needs an `_fa` twin; see DS-09 for the Persian eyebrow recipe.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| component | `src/components/SectionHeader/index.tsx` | SectionHeader | Component wrapping the block heading; in Payload, a `sectionHeader` group (tag, lead, tail, lede — all localized) reused by every block that starts a section. |

**Implemented (2026-09-19):** `tag · lead · tail · lede · index`; the tag is a real `<span>` on the rule positioned with `start-0`, so it mirrors and is read aloud. Payload side: `src/fields/sectionHeader.ts` group (`SectionHeaderField`), first used by the `metricsStrip` block; `localized: true` is the one-word change when D-009 lands. Shown on `/design`.

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-12-1-desktop-opener-tracks.png` — opener tracks · crop @2x · desktop
- `DS-12-2-desktop-opener-numbers.png` — opener numbers · crop @2x · desktop
- `DS-12-3-desktop-opener-teams.png` — opener teams · crop @2x · desktop
- `DS-12-4-desktop-head-block.png` — head block · crop @2x · desktop
- `DS-12-5-mobile-opener-tracks.png` — opener tracks · crop @2x · mobile
- `DS-12-6-mobile-opener-numbers.png` — opener numbers · crop @2x · mobile
- `DS-12-7-mobile-opener-teams.png` — opener teams · crop @2x · mobile
- `DS-12-8-mobile-head-block.png` — head block · crop @2x · mobile
- `DS-12.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-12.json`
- [x] For Sina written (take · RTL · Persian)
- [x] Target mapping agreed
