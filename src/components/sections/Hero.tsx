import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { brand, nav } from '../../data/content'
import { Eyebrow } from '../ui/Eyebrow'
import { Logo } from '../ui/Logo'

export function Hero() {
  const scope = useRef<HTMLElement>(null)

  // Cinematic entrance — eyebrow → logo → rule → tagline → CTA → cue.
  // `from` tweens: the prerendered HTML ships fully visible (SEO/no-JS safe);
  // the browser animates it in. Reduced-motion skips the timeline entirely.
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power2.out', duration: 1 } })
        .from('[data-hero-eyebrow]', { opacity: 0, y: 14 }, 0.15)
        .from('[data-hero-logo]', { opacity: 0, y: 26, scale: 0.985 }, 0.3)
        .from(
          '[data-hero-rule]',
          { scaleX: 0, transformOrigin: '50% 50%', duration: 0.9 },
          0.85,
        )
        .from('[data-hero-tagline]', { opacity: 0, y: 18 }, 1.0)
        .from('[data-hero-cta]', { opacity: 0, y: 14 }, 1.2)
        .from('[data-hero-cue]', { opacity: 0, duration: 0.8 }, 1.5)
    }, scope)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      ref={scope}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Warm light spill behind the wordmark — reads as a glow, not a hard
          vignette. */}
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 40%, rgba(151,119,46,0.10), rgba(151,119,46,0.04) 45%, rgba(250,247,241,0) 72%)',
        }}
      />
      {/* Floor glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/3"
        style={{
          background:
            'linear-gradient(to top, rgba(151,119,46,0.05), rgba(250,247,241,0))',
        }}
      />

      <div className="relative">
        <div data-hero-eyebrow>
          <Eyebrow className="justify-center" withTick={false}>
            {brand.region} · Luxury Event Design
          </Eyebrow>
        </div>

        {/* Real Ricco Decor filigree logo, recolored brass over the 3D mandap.
            The sr-only text keeps a real <h1> for SEO. */}
        <h1 data-hero-logo className="mt-8">
          <span className="sr-only">
            Ricco Decor — Luxury Event Design in Toronto &amp; the GTA
          </span>
          <Logo
            decorative
            tone="ink"
            className="mx-auto aspect-[3/2] w-[84vw] max-w-[540px] drop-shadow-[0_6px_20px_rgba(27,20,16,0.10)]"
          />
        </h1>

        <div data-hero-rule className="mx-auto mt-6 h-px w-20 bg-brass/60" />

        <p
          data-hero-tagline
          className="mx-auto mt-8 max-w-2xl font-display text-2xl font-light italic leading-snug text-ink/80 sm:text-3xl"
        >
          {brand.tagline}
        </p>

        <div data-hero-cta className="mt-12">
          <Link
            to={nav.cta.href}
            className="group inline-flex items-center gap-3 border border-brass/60 px-9 py-3.5 font-body text-sm tracking-[0.2em] text-brass-bright uppercase transition-colors hover:bg-brass hover:text-ink"
          >
            Inquire
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        data-hero-cue
        href="#positioning"
        aria-label="Scroll to explore"
        className="group absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="eyebrow !text-[0.6rem] text-muted transition-colors group-hover:text-brass">
          Scroll
        </span>
        <span className="relative block h-12 w-px overflow-hidden bg-brass/20">
          <span className="scroll-cue absolute left-0 top-0 block h-4 w-px bg-brass" />
        </span>
      </a>
    </section>
  )
}
