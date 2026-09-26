/**
 * Employer brand marks for the Home "Where I've worked" catalogue: stable `companyKey` →
 * canonical name → one or two local PNG marks. The `companyKey` select options in `config.ts`
 * and the `<img src>` in `CompanyLogo.tsx` both read this one file, so the schema and the
 * renderer cannot drift apart.
 *
 * Deliberately dependency-free — no React, no node built-ins and above all no `@/payload-types`.
 * `config.ts` imports this module, and that config is evaluated by the server, by the admin
 * client bundle and by `payload generate:types`, where importing the file being generated is a
 * circular dependency that surfaces as an opaque loader error.
 *
 * Marks are committed under `public/company-logos/`, trimmed and downscaled (long edge ≤ 256)
 * from Docs/Experience assets. Docs/ is gitignored, so nothing here hotlinks or imports from
 * there at runtime. Provenance (source URL + confidence) is recorded per mark below.
 *
 * Colour strategy lives in `CompanyLogo.tsx`: greyscale at rest; native brand colour on cell
 * hover / focus-within in both themes. `onLight` / `onDark` here only flip lightness for marks
 * that vanish on their paper (cleared again when colour reveals).
 */

export type CompanyMarkFit = 'lockup' | 'tile' | 'wordmark'
export type CompanyMarkTreatment = 'invert' | 'none'

export type CompanyMark = {
  /** Intrinsic pixel size of the committed file (post-trim). */
  height: number
  /** How the mark should sit in the shared logo frame. */
  fit: CompanyMarkFit
  /** Lightness flip on dark paper at rest; cleared on hover/focus-within so brand hue returns. */
  onDark: CompanyMarkTreatment
  /**
   * Lightness flip on light paper. Allowed only on marks with no hue (Hadish white, Fibona
   * platinum) so the light-mode colour reveal stays true.
   */
  onLight: CompanyMarkTreatment
  /** Path under `public/`. */
  src: string
  width: number
}

export type CompanyLogoEntry = {
  /** One or more marks (almost always one; dual marks only if a cell truly shares brands). */
  marks: CompanyMark[]
  /** Canonical, human-visible employer name. Never localized — a brand name is a brand name. */
  name: string
}

/** Render order comes from the CMS rows, not from this map. */
export const COMPANY_LOGOS = {
  // https://www.tahagasht.com/uploads/config/tahagasht-vertical.svg — official · navy vanishes on dark
  tahaGasht: {
    name: 'Taha Gasht',
    marks: [
      {
        src: '/company-logos/taha-gasht.png',
        width: 245,
        height: 256,
        fit: 'lockup',
        onLight: 'none',
        onDark: 'invert',
      },
    ],
  },
  // https://www.digikala.com/brand/full-horizontal.svg — official · Persian wordmark; A2 is Digital Gold
  digikala: {
    name: 'Digikala',
    marks: [
      {
        src: '/company-logos/digikala.png',
        width: 256,
        height: 39,
        fit: 'wordmark',
        onLight: 'none',
        onDark: 'none',
      },
    ],
  },
  // LinkedIn company logo (carsparency.com parked) — linkedin · low-quality 200² tile
  carsparency: {
    name: 'Carsparency',
    marks: [
      {
        src: '/company-logos/carsparency.png',
        width: 200,
        height: 113,
        fit: 'tile',
        onLight: 'none',
        onDark: 'none',
      },
    ],
  },
  // https://khodro45.com/build/images/khodro45-dark.svg — official · dark wordmark
  khodro45: {
    name: 'Khodro45',
    marks: [
      {
        src: '/company-logos/khodro45.png',
        width: 256,
        height: 36,
        fit: 'wordmark',
        onLight: 'none',
        onDark: 'invert',
      },
    ],
  },
  // https://hadishmall.ir/wp-content/uploads/2023/12/hadish_2.png — official · white mark, invisible on paper
  hadishMall: {
    name: 'Hadish Mall',
    marks: [
      {
        src: '/company-logos/hadish-mall.png',
        width: 256,
        height: 249,
        fit: 'lockup',
        onLight: 'invert',
        onDark: 'none',
      },
    ],
  },
  // https://fibona.org/brand/fibona-logo-platinum.png — official · platinum, too faint on paper
  fibona: {
    name: 'Fibona',
    marks: [
      {
        src: '/company-logos/fibona.png',
        width: 256,
        height: 206,
        fit: 'lockup',
        onLight: 'invert',
        onDark: 'none',
      },
    ],
  },
  // https://oteacher.org/storage/logos/logo.webp — official · navy wordmark
  oteacher: {
    name: 'OTeacher',
    marks: [
      {
        src: '/company-logos/oteacher.png',
        width: 256,
        height: 115,
        fit: 'lockup',
        onLight: 'none',
        onDark: 'invert',
      },
    ],
  },
  // LinkedIn company logo `arvancloud` — linkedin · opaque teal tile
  arvanCloud: {
    name: 'Arvan Cloud',
    marks: [
      {
        src: '/company-logos/arvan-cloud.png',
        width: 114,
        height: 114,
        fit: 'tile',
        onLight: 'none',
        onDark: 'none',
      },
    ],
  },
  // https://biomaze.ir/favicon.svg — official · Maz educational-group mark (visible name disambiguates)
  biomaze: {
    name: 'Biomaze',
    marks: [
      {
        src: '/company-logos/biomaze.png',
        width: 256,
        height: 256,
        fit: 'tile',
        onLight: 'none',
        onDark: 'none',
      },
    ],
  },
  // LinkedIn company logo `didestan` — linkedin · opaque yellow tile
  didestan: {
    name: 'Didestan',
    marks: [
      {
        src: '/company-logos/didestan.png',
        width: 82,
        height: 114,
        fit: 'tile',
        onLight: 'none',
        onDark: 'none',
      },
    ],
  },
  // LinkedIn company logo `a1paradise` — linkedin · soft-keyed bg leaves a grey halo on dark; invert hides it
  a1paradise: {
    name: 'A1Paradise',
    marks: [
      {
        src: '/company-logos/a1paradise.png',
        width: 192,
        height: 200,
        fit: 'tile',
        onLight: 'none',
        onDark: 'invert',
      },
    ],
  },
} as const satisfies Record<string, CompanyLogoEntry>

export type CompanyKey = keyof typeof COMPANY_LOGOS

export const COMPANY_KEYS = Object.keys(COMPANY_LOGOS) as CompanyKey[]

/** Payload select options, derived so `config.ts` can never list a key the renderer can't draw. */
export const COMPANY_OPTIONS = COMPANY_KEYS.map((value) => ({
  label: COMPANY_LOGOS[value].name,
  value,
}))

export const isCompanyKey = (value: unknown): value is CompanyKey =>
  typeof value === 'string' && Object.prototype.hasOwnProperty.call(COMPANY_LOGOS, value)

export const resolveCompany = (value: unknown): CompanyLogoEntry | undefined =>
  isCompanyKey(value) ? COMPANY_LOGOS[value] : undefined
