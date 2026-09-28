import { useLenis } from 'lenis/react'
import type React from 'react'
import { useCallback, useEffect, useState } from 'react'

import type { Chapter } from '@/blocks/CaseStudy/chapters'

/**
 * The chapter being read: the last one whose top has passed the reading line (30% down the
 * viewport); above the first chapter, none. Recomputed from geometry on every observer callback,
 * so a fast scroll in either direction never leaves a stale entry. Shared by the wide-screen
 * rail (`SectionIndex`) and the phone contents (`ContentsMenu`).
 */
export function useActiveChapter(chapters: Chapter[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const targets = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((el): el is HTMLElement => el instanceof HTMLElement)
    if (!targets.length) return

    const update = () => {
      const line = window.innerHeight * 0.3
      let current: string | null = null
      for (const el of targets) {
        if (el.getBoundingClientRect().top <= line) current = el.id
        else break
      }
      setActive(current)
    }
    const observer = new IntersectionObserver(update, {
      rootMargin: '-30% 0px -60% 0px',
      threshold: [0, 1],
    })
    targets.forEach((el) => observer.observe(el))
    update()
    return () => observer.disconnect()
  }, [chapters])

  return active
}

/**
 * Hands keyboard and screen-reader focus to the chapter without scrolling — the scroll is the
 * link's job. A chapter is not focusable on its own, so it takes `tabindex="-1"` for as long as
 * it holds focus; the next Tab then continues inside it, as after a native anchor jump.
 */
function focusChapter(target: HTMLElement) {
  if (!target.hasAttribute('tabindex')) {
    target.setAttribute('tabindex', '-1')
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true })
  }
  target.focus({ preventScroll: true })
}

/**
 * The click of a chapter link (`href="#s03-research"`). With Lenis running, it glides there —
 * Lenis reads the chapter's `scroll-margin-top`, so the chapter lands below the sticky header,
 * and the page's anchors stay off in Lenis (see `SmoothScrollProvider`). Without Lenis (reduced
 * motion, or before it starts) the native href jumps, instantly under reduced motion. Either way
 * focus moves to the chapter. A modified click (new tab, new window) is left to the browser.
 */
export function useChapterJump() {
  const lenis = useLenis()
  return useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }
      const target = document.getElementById(id)
      if (!target) return
      if (lenis) {
        event.preventDefault()
        lenis.scrollTo(target)
      }
      focusChapter(target)
    },
    [lenis],
  )
}
