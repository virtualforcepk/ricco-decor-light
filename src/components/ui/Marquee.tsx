import { services } from '../../data/content'

// ============================================================================
// <Marquee /> — a slow editorial ribbon of the service names drifting between
// sections. Decorative: the moving track is aria-hidden and duplicated for a
// seamless loop; an sr-only line carries the content once for assistive tech.
// prefers-reduced-motion freezes the track at its start (global CSS rule).
// ============================================================================

const items = services.map((s) => s.title)

function Row() {
  return (
    <span aria-hidden className="flex shrink-0 items-center">
      {items.map((title) => (
        <span key={title} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-2xl font-light italic tracking-wide text-brass/80 sm:px-8 sm:text-3xl">
            {title}
          </span>
          <span className="text-[0.55rem] text-brass/50">✦</span>
        </span>
      ))}
    </span>
  )
}

export function Marquee() {
  return (
    <div className="relative z-10 overflow-hidden border-y border-brass/10 py-5">
      <p className="sr-only">{items.join(' · ')}</p>
      <div className="marquee-track flex w-max">
        <Row />
        <Row />
      </div>
    </div>
  )
}
