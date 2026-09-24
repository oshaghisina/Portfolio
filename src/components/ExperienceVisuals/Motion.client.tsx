'use client'

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import type { Locale } from '@/utilities/locale'
import { experienceVisualCopy } from './copy'

const MotionContext = createContext({ paused: false, reduced: false, toggle: () => {} })

/** One page scope; SVG and HTML stay server-rendered. Observation never drives a render loop. */
export function ExperienceMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const element = root.current
    if (!element || typeof window.matchMedia !== 'function') return
    const scenes = Array.from(element.querySelectorAll<HTMLElement>('[data-experience-scene]'))
    const visible = new Set<Element>()
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let observer: IntersectionObserver | undefined
    const sync = () => {
      scenes.forEach((scene) => {
        scene.dataset.expVisible = String(visible.has(scene) && !document.hidden)
      })
    }
    const configure = () => {
      observer?.disconnect()
      visible.clear()
      setReduced(preference.matches)
      element.dataset.expMotion = String(!preference.matches)
      if (!preference.matches && typeof IntersectionObserver !== 'undefined') {
        observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) visible.add(entry.target)
            else visible.delete(entry.target)
          })
          sync()
        }, { threshold: 0, rootMargin: '0px' })
        scenes.forEach((scene) => observer?.observe(scene))
      }
      sync()
    }
    configure()
    preference.addEventListener('change', configure)
    document.addEventListener('visibilitychange', sync)
    return () => {
      observer?.disconnect()
      preference.removeEventListener('change', configure)
      document.removeEventListener('visibilitychange', sync)
      delete element.dataset.expMotion
      scenes.forEach((scene) => delete scene.dataset.expVisible)
    }
  }, [children])

  return (
    <MotionContext.Provider value={{ paused, reduced, toggle: () => setPaused((value) => !value) }}>
      <div className="experience-visual-scope" data-exp-paused={paused} ref={root}>
        {children}
      </div>
    </MotionContext.Provider>
  )
}

export function ExperienceMotionControl({ locale }: { locale: Locale }) {
  const { paused, reduced, toggle } = useContext(MotionContext)
  const copy = experienceVisualCopy[locale]
  return (
    <button
      aria-pressed={paused}
      className="experience-motion-control"
      disabled={reduced}
      onClick={toggle}
      type="button"
    >
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
        {paused ? <path d="M4 2.5 11 7 4 11.5Z" /> : <path d="M3 2.5h2.5v9H3Zm5.5 0H11v9H8.5Z" />}
      </svg>
      {reduced ? copy.reduced : paused ? copy.resume : copy.pause}
    </button>
  )
}
