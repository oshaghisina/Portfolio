import { describe, expect, it } from 'vitest'

import {
  fullTextFromTones,
  segmentText,
  unitsFromTones,
} from '@/components/WrittenHeadline/segment'
import { WRITE_MAX_MS, WRITE_MIN_MS, writeDurationMs } from '@/components/WrittenHeadline/timing'

describe('WrittenHeadline segment', () => {
  it('segments Latin as graphemes without naive split', () => {
    const units = segmentText('Hi', 'en')
    expect(units).toEqual(['H', 'i'])
  })

  it('keeps Persian ZWNJ inside a word token', () => {
    const units = segmentText('تصمیم‌گیری سریع', 'fa')
    expect(units).toEqual(['تصمیم‌گیری', ' ', 'سریع'])
    expect(units[0]).toContain('\u200c')
  })

  it('does not character-split Arabic', () => {
    const units = segmentText('مرحبا بالعالم', 'ar')
    expect(units.length).toBeLessThan('مرحبا بالعالم'.length)
    expect(units.filter((u) => u.trim()).length).toBe(2)
  })

  it('runs continuously across two-tone segments with a joining space', () => {
    const units = unitsFromTones(
      [{ text: 'Work across' }, { text: 'systems.', className: 'text-ink-3' }],
      'en',
    )
    expect(fullTextFromTones([{ text: 'Work across' }, { text: 'systems.' }])).toBe(
      'Work across systems.',
    )
    expect(units.some((u) => u.className === 'text-ink-3' && u.text === 's')).toBe(true)
  })
})

describe('WrittenHeadline timing', () => {
  it('clamps short and long headings into 700–1600ms', () => {
    expect(writeDurationMs(1)).toBe(WRITE_MIN_MS)
    expect(writeDurationMs(8)).toBeGreaterThanOrEqual(WRITE_MIN_MS)
    expect(writeDurationMs(8)).toBeLessThan(WRITE_MAX_MS)
    expect(writeDurationMs(80)).toBe(WRITE_MAX_MS)
  })
})
