/**
 * Where to pin `object-cover` crops for phone-height archive/source stills.
 * Shared by archive cards and WorkCover detail panels so the same screen reads the same way.
 */
export const COVER_FOCUS: Record<string, string> = {
  'vin-app': 'object-[center_30%]',
  'rp1-arena': 'object-[center_72%]',
  'digital-gold': 'object-[center_36%]',
  'khodro45-dealer-app': 'object-[center_12%]',
  faymen: 'object-[center_30%]',
  'nim-dang': 'object-[center_40%]',
  'carsparency-pro': 'object-[center_12%]',
  'carsparency-inspection': 'object-[center_20%]',
  'carsparency-design-system': 'object-[center_15%]',
  'biomaze-design-system': 'object-[center_15%]',
  'arash-rezvani': 'object-[center_28%]',
  cproperty: 'object-[center_22%]',
  'mall-management-app-concept': 'object-center',
}

/** `object-cover` plus a slug focus, or top-bias for very tall phone dumps. */
export function coverObjectClass(slug: string, veryTall: boolean): string {
  const focus = COVER_FOCUS[slug]
  if (focus) return `object-cover ${focus}`
  return veryTall ? 'object-cover object-top' : 'object-cover object-center'
}
