import { useEffect, useRef } from 'react'

// ============================================================================
// <ScrollProgress /> — a 2px brass hairline along the top edge that fills as
// the page is read. State, not decoration: it reflects scroll position, so it
// stays useful under prefers-reduced-motion. rAF-throttled, transform-only.
// SSR-safe: renders scaleX(0) in the prerendered HTML.
// ============================================================================

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      el.style.transform = `scaleX(${p})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left scale-x-0 bg-brass"
    />
  )
}
