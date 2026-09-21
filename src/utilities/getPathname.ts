import { headers } from 'next/headers'

import { PATHNAME_HEADER } from './locale'

/** Server-only: the original (possibly locale-prefixed) request path `src/proxy.ts` saw. */
export async function getPathname(): Promise<string> {
  return (await headers()).get(PATHNAME_HEADER) ?? '/'
}
