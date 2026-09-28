/**
 * Per-project cover art. `tint` is the product's own brand colour; the plate mixes 22% of it into
 * paper, so a mid-lightness value reads as a soft ground in both themes. `leadFocus` and
 * `companionFocus` pin a phone crop lower than the top when a tall capture's strongest part sits
 * further down — literal Tailwind classes, so the build sees them.
 */
export interface ProjectArtStyle {
  tint: string
  leadFocus?: string
  companionFocus?: string
}

export const DEFAULT_ART_TINT = '#647c82'

// One tint per brand: sibling studies of one company share it and sit in one band on /work.
const CARSPARENCY = '#3a9a6c'
const YARAVAN = '#465daa'
const BIOMAZE = '#3560d0'

export const PROJECT_ART: Record<string, ProjectArtStyle> = {
  'vin-app': { tint: '#467d79' },
  'rp1-arena': { tint: '#8063ac' },
  'digital-gold': { tint: '#bd9449' },
  'khodro45-dealer-app': { tint: '#be6947' },
  faymen: { tint: '#847967' },
  // The sell sheet's pricing gauge and buttons sit at the foot of the capture.
  'nim-dang': { tint: '#3b6269', leadFocus: 'object-bottom' },
  'carsparency-pro': { tint: CARSPARENCY },
  'carsparency-back-office': { tint: CARSPARENCY },
  'carsparency-inspection': { tint: CARSPARENCY },
  'carsparency-web': { tint: CARSPARENCY },
  'carsparency-design-system': { tint: CARSPARENCY },
  'mall-management-app-concept': { tint: '#b24f86' },
  'oteacher-product-roadmap': { tint: '#3f96d2' },
  'biomaze-website-education-panel': { tint: BIOMAZE },
  'biomaze-design-system': { tint: BIOMAZE },
  'arash-rezvani': { tint: '#3f75ab' },
  // The products page opens on its EN 590 specification sheet, not the page title.
  marqevon: { tint: '#b0822e', companionFocus: 'object-[center_23.8%]' },
  cproperty: { tint: '#a17954' },
  yaravan: { tint: YARAVAN },
  // Skips the headline to the technician photo and the four-step request band.
  'yaravan-platform': { tint: YARAVAN, leadFocus: 'object-[center_5.2%]' },
  'merikh-baft': { tint: '#2d5580' },
  'taha-gasht-platform': { tint: '#343c7b' },
  // The console's own teal, from the Dribbble shots' palette.
  'arvan-cloud-platform-redesign': { tint: '#1b9797' },
}

export const projectArt = (slug: string): ProjectArtStyle =>
  PROJECT_ART[slug] ?? { tint: DEFAULT_ART_TINT }
