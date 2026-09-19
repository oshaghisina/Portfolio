---
title: Timeline
doc_type: timeline
status: draft
updated: 2026-09-19
span_start: ""            # earliest start (computed by docs:index once dates exist)
span_end: ""              # latest end or today
years_calendar: 0         # calendar span in years (computed)
years_summed: 15.9           # sum of individual role durations (computed)
open_questions: 4
---

# Timeline

Real start and end dates for every role. This is the **only** place durations come from —
the resume's "2.5 yr"-style durations are kept here for traceability but are not shown on the
site. Once filled in, `pnpm docs:index` computes durations and overlaps and the dates are
propagated into each company `README.md` (see *Propagation rules*).

## How to fill this in

- Dates as `YYYY-MM`. Use `present` for an ongoing role.
- If a date is approximate, put `~` in the **Approx?** column (e.g. `~`). The site will then
  show it as "c. 2019".
- Leave a cell empty if you genuinely don't know — better than a guess.
- Or just reply in chat like `Digikala: 2023-03 → present` and I'll transcribe.

## Roles

Rows are in resume order. **Start / End / Approx?** are yours; **Computed duration** and
**Overlaps with** are regenerated.

<!-- index:start -->
| # | Company (folder) | Role | Employment | Start | End | Approx? | Resume duration | Computed duration | Overlaps with | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Digikala (`Digikala`) | Designer / Marketer / B developer — Digital Gold | full-time | — | — | — | 2.5 yr | — | — | ❓ Q1 |
| 2 | Carsparency & Khodro45 (`Carsparency-Khodro45`) | Product designer | full-time | — | — | — | 2.5 yr | — | — | — |
| 3 | Hadish Mall (`Hadish-Mall`) | Marketing | part-time | — | — | — | 1 yr | — | — | — |
| 4 | Fibona (`Fibona`) | Product Manager | part-time | — | — | — | 2 yr | — | — | — |
| 5 | OTeacher (`OTeacher`) | Product Manager & designer | part-time | — | — | — | 1 yr | — | — | — |
| 6 | Arvan Cloud (`Arvan-Cloud`) | Product designer | full-time | — | — | — | 2 yr | — | — | — |
| 7 | Biomaze (`Biomaze`) | Product Manager & designer | part-time | — | — | — | 3 yr | — | — | — |
| 8 | Didestan (`Didestan`) | UI/UX designer | full-time | — | — | — | 8 mos | — | — | — |
| 9 | A1Paradise (`A1Paradise`) | UI/UX designer | full-time | — | — | — | 1.2 yr | — | — | ❓ Q4 |
<!-- index:end -->

## Reconciling the "10 yr" header

The resume header says **Professional Experiences (10 yr)**, but the nine durations above sum
to **~15.9 years**. That is not an error — several part-time roles ran alongside full-time ones —
but the site should never show a number a visitor can't reconcile. So:

- **Calendar span** (earliest start → latest end / today) is what the site shows, e.g.
  "10 years in product, since 2016".
- **Summed durations** is reported here only, as a sanity check on the dates.
- Both numbers are written into this file's frontmatter (`years_calendar`, `years_summed`) by
  `docs:index`, so nothing is hand-maintained.

> ❓ **Q1 — Confirm:** Is the Digikala role ongoing (End = `present`)? It is listed first and the
> duties are written in past tense, so it could be either.

> ❓ **Q2 — Confirm:** Should the site headline the *calendar span* ("since 2016", "10 years") rather
> than the summed durations? That is the default in this plan.

> ❓ **Q3 — Confirm:** Which part-time roles ran concurrently with which full-time ones? (Fibona,
> Biomaze, OTeacher and Hadish Mall are the likely overlaps.) Dates will answer this, but a note
> helps when dates are approximate.

> ❓ **Q4 — Confirm:** Is the resume order roughly reverse-chronological (A1Paradise and Didestan
> the earliest, around 2016–2017 when you were 17–18)? This decides the default sort until dates exist.

## Propagation rules

Once a row has Start and End:

1. The company `README.md` frontmatter changes from the resume string to structured dates:
   ```yaml
   period:
     start: "2021-03"
     end: "2023-09"        # or "present"
     approx: false
   ```
   The resume duration string moves out of the frontmatter and lives only in this table.
2. Project files under that company must fall inside these bounds; `docs:validate` warns
   otherwise.
3. `Experience/README.md` sorts by `period.start` descending and renders the Period column as
   `2021-03 → 2023-09 · 2.5 yr`. Until dates exist it sorts by `resume_order`.
4. The prose header line in each company README (`**Role** · 2.5 yr · full-time`) is rewritten
   once by hand to match.

## Review checklist

- [ ] Q1 — Digikala ongoing?
- [ ] Q2 — Site shows calendar span, not summed years?
- [ ] Q3 — Which roles overlapped?
- [ ] Q4 — Resume order is reverse-chronological?
- [ ] Fill Start / End / Approx? for all nine rows (or send them in chat)
