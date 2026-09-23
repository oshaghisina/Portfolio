import type { Locale } from '@/utilities/locale'

/**
 * The nature of the work, not the tools (D-021). Small on purpose: it labels archive rows and
 * drives the single-select filter on `/work`, so every value must describe several projects.
 * `ai` is deliberately absent until a real AI project exists in the Inventory.
 */
export const PROJECT_KINDS = ['product', 'growth', 'data', 'research', 'systems', 'concept'] as const
export type ProjectKind = (typeof PROJECT_KINDS)[number]

/** Keyed by kind, then locale — the same table feeds the admin select labels and the frontend. */
export const PROJECT_KIND_LABELS: Record<ProjectKind, Record<Locale, string>> = {
  product: { en: 'Product', fa: 'محصول', ar: 'منتج', es: 'Producto', de: 'Produkt', fr: 'Produit', ja: 'プロダクト' },
  growth: { en: 'Growth', fa: 'رشد', ar: 'نمو', es: 'Crecimiento', de: 'Wachstum', fr: 'Croissance', ja: 'グロース' },
  data: { en: 'Data', fa: 'داده', ar: 'بيانات', es: 'Datos', de: 'Daten', fr: 'Données', ja: 'データ' },
  research: { en: 'Research', fa: 'پژوهش', ar: 'بحث', es: 'Investigación', de: 'Research', fr: 'Recherche', ja: 'リサーチ' },
  systems: { en: 'Systems', fa: 'سیستم‌ها', ar: 'أنظمة', es: 'Sistemas', de: 'Systeme', fr: 'Systèmes', ja: 'システム' },
  concept: { en: 'Concept', fa: 'طرح مفهومی', ar: 'مفهوم', es: 'Concepto', de: 'Konzept', fr: 'Concept', ja: 'コンセプト' },
}

export const isProjectKind = (v: unknown): v is ProjectKind =>
  typeof v === 'string' && (PROJECT_KINDS as readonly string[]).includes(v)

export const kindLabel = (kind: ProjectKind, locale: Locale): string => PROJECT_KIND_LABELS[kind][locale]

/** Labels for a project's `kind` array in a locale, unknown values dropped, order preserved. */
export const kindLabels = (kinds: readonly unknown[] | null | undefined, locale: Locale): string[] =>
  (kinds ?? []).filter(isProjectKind).map((kind) => kindLabel(kind, locale))
