import { MARKER_END, MARKER_START } from './schema'

export function hasMarkers(content: string): boolean {
  return content.includes(MARKER_START) && content.includes(MARKER_END)
}

export function countMarkers(content: string): { start: number; end: number } {
  return {
    start: content.split(MARKER_START).length - 1,
    end: content.split(MARKER_END).length - 1,
  }
}

/** Text between the markers, without the marker lines. */
export function extractBetween(content: string): string | null {
  const s = content.indexOf(MARKER_START)
  const e = content.indexOf(MARKER_END)
  if (s === -1 || e === -1 || e < s) return null
  return content.slice(s + MARKER_START.length, e).replace(/^\n/, '').replace(/\n$/, '')
}

/** Replace the text between the markers; throws if a marker is missing or duplicated. */
export function replaceBetween(content: string, block: string, label = 'document'): string {
  const { start, end } = countMarkers(content)
  if (start !== 1 || end !== 1) {
    throw new Error(
      `${label}: expected exactly one ${MARKER_START} / ${MARKER_END} pair, found ${start}/${end}`,
    )
  }
  const s = content.indexOf(MARKER_START) + MARKER_START.length
  const e = content.indexOf(MARKER_END)
  return `${content.slice(0, s)}\n${block}\n${content.slice(e)}`
}
