---
title: Benchmark Rubric
doc_type: rubric
status: ready
updated: 2026-09-19
content_criteria: [ia, depth, proof, personality]
design_criteria: [distinctiveness, typography, motion, brand, mobile]
---

# Benchmark Rubric

How benchmark files are scored. Two independent things are measured:

1. **`relevance`** (1–5, manual) — how useful this site is *as a reference for Sina's portfolio*.
   It is **not** a quality score. A gorgeous agency site that has nothing to do with a personal
   brand can score 5 on craft and 2 on relevance.
2. **`scores.*`** (0–5 each) — craft, per criterion. `0` means *not scored yet* and is only allowed
   while `status: draft`. The index shows the mean of non-zero scores as **Avg**.

`docs:validate` warns when `|relevance − Avg| > 1.5` — not because it's wrong, but because it's
worth a sentence in the analysis explaining why.

## `relevance`

| Score | Meaning |
|---|---|
| 1 | Counter-example only — kept to remember what *not* to do |
| 2 | One idea worth noting; otherwise a different kind of site |
| 3 | A few borrowable patterns; same category (personal / studio portfolio) |
| 4 | Strong reference for a specific part of the site (e.g. the case-study format, the about page) |
| 5 | Model site — close to what Sina's site should be, in content or in feel |

## Content criteria (`Benchmarks/Content/*`)

| Key | Criterion | 1 | 3 | 5 |
|---|---|---|---|---|
| `ia` | **Information architecture** — can a visitor get from landing to proof to contact without thinking? | Navigation is a guess; work buried or duplicated | Clear top-level sections; some dead ends or redundant paths | Every visitor type finds their path in one click; hierarchy mirrors what matters |
| `depth` | **Case-study depth** — process *and* outcome, with the decisions in between | Image dumps or one-paragraph summaries | Structured sections, but outcomes thin or process generic | Problem → decisions → result, with what didn't work; length matched to the project |
| `proof` | **Proof** — evidence that the work worked | Claims only | Some metrics or testimonials, unevenly | Numbers with context, named clients/roles, quotes; honest about confidentiality |
| `personality` | **Personality in the content** — does a person come through, not a CV? | Generic "passionate designer" copy | Voice appears on the About page only | Consistent voice everywhere; point of view; the person is memorable |

## Design criteria (`Benchmarks/Design/*`)

| Key | Criterion | 1 | 3 | 5 |
|---|---|---|---|---|
| `distinctiveness` | **Distinctiveness** — would you recognise it without the logo? | Template look; interchangeable | A clear style within a familiar genre | Unmistakable; the design itself is a statement about the person |
| `typography` | **Typographic craft** — hierarchy, rhythm, pairing, reading comfort | Default sizes; weak hierarchy; poor measure | Solid hierarchy; one or two rough spots | Type carries the design; scale, spacing and pairing are deliberate and consistent |
| `motion` | **Motion & interaction restraint** — motion that explains or delights vs. motion that costs | Gratuitous, slow, or blocks reading | Pleasant but decorative | Purposeful: reveals structure, rewards attention, never in the way; respects reduced-motion |
| `brand` | **Brand expression** — does the visual system express who this person is and what they've done? | Visuals unrelated to the work or story | Consistent look; story told by text alone | Color, imagery, layout and tone all say the same thing; experience is *visualised*, not listed |
| `mobile` | **Mobile quality** — is the phone experience designed or merely responsive? | Broken or cramped; desktop shrunk | Works; some awkward stacking or tiny tap targets | Considered: hierarchy re-thought, media re-cropped, gestures natural |

## Bilingual / RTL note (not scored)

Sina's site is English + Persian (D-009). Every benchmark records, in its *Bilingual / RTL notes*
section, whether the site handles multiple languages or right-to-left layouts and how — because
few portfolio benchmarks will, and the ones that do are disproportionately useful.

## Using the rubric

- Score after writing the analysis, not before; the analysis should justify each number.
- Don't average your way to a 3. If a criterion genuinely doesn't apply, leave it `0` and say
  why in the notes.
- Update this file rather than inventing new keys; `scripts/docs/lib/schema.ts` mirrors the
  criteria lists above and validation will reject unknown keys.
