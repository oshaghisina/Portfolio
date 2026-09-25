/**
 * `BreadcrumbList` JSON-LD for case studies — Work → project. No visual breadcrumb chrome;
 * structured data only for crawlers and internal relationship signals.
 */
export function buildBreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[]
}): Record<string, unknown> | null {
  if (items.length < 2) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
