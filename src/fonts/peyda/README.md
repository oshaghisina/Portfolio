# Peyda — the Persian/Arabic face (DS-04, D-025)

`PeydaWebVF.woff2` — Peyda 4 Pro, variable web font, one `wght` axis 100–1000, 94 KB.

Copied verbatim from `Peyda 4 (Pro).zip` → `02 Web Font/Variable Webfont/PeydaWebVF.woff2`
(version 4.000, designer Naser Khadem, <https://fontiran.com>). The package also ships ten static
weights, a Farsi-numerals cut and a Latin-less cut; none is needed — the site renders 400, 500 and
600, the variable axis covers all three from one file, and Persian numerals are a `"ss02"` feature
setting on this same face rather than a separate download.

## Licence

**Commercial, licensed personally to Sina Oshaghi. Not redistributable.** The package's terms
require that the files are not published or shared; serving them from this site is the intended use
of the "Web Font" folder, and this repository is private. If it is ever made public, this file has
to come out of git first.

## How it is loaded

`src/app/(frontend)/layout.tsx` declares it with `next/font/local` as `--font-peyda`, restricted by
`unicode-range` to the Arabic script so Latin words and digits inside a Persian page keep rendering
in Geist Sans. The tokens then point `--font-sans-fa` at it, and `:lang(fa)` / `:lang(ar)` swap
`--font-sans` over. Nothing references this file by path except the loader.
