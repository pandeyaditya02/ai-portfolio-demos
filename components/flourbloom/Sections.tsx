"use client";

import { useState } from "react";
import {
  contact,
  freshCards,
  layers,
  marqueeWords,
  signatureBakes,
  stats,
  storyLines,
  testimonial,
  type Bake,
} from "./data";
import { FlourBloomOrder } from "./FlourBloomOrder";

/* -------------------------------------------------------------------------- */
/*  Shared helpers                                                            */
/* -------------------------------------------------------------------------- */

function BakeImage({ item }: { item: Bake }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[26px]">
      <div
        className="fb-img-fallback"
        style={{ background: "linear-gradient(150deg, var(--fb-crust), var(--fb-bg))" }}
      >
        <span>{item.emoji}</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.opacity = "0";
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
    </div>
  );
}

function KineticWord({ word }: { word: string }) {
  return (
    <>
      {word.split("").map((c, i) => (
        <span key={i} className="fb-letter inline-block">
          {c}
        </span>
      ))}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Nav                                                                       */
/* -------------------------------------------------------------------------- */

export function FbNav({ onBack }: { onBack: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-[70]">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 sm:px-10">
        <button type="button" onClick={onBack} data-magnetic className="text-sm font-semibold tracking-tight text-[var(--fb-cream)]">
          &larr; Lumen Studio
        </button>
        <div className="fb-display text-lg tracking-tight text-[var(--fb-cream)]">Flour &amp; Bloom</div>
        <a href="#order" data-magnetic className="hidden text-sm font-semibold text-[var(--fb-cream)] sm:block">
          Order
        </a>
      </nav>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero (Rise) — bold, duplicated kinetic headline                          */
/* -------------------------------------------------------------------------- */

export function FbHero() {
  return (
    <section data-fb-hero className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-28 sm:px-10">
      <div className="fb-blob" style={{ width: 540, height: 540, top: "-8%", left: "-6%", background: "var(--fb-amber)" }} />
      <div className="fb-blob" style={{ width: 460, height: 460, bottom: "-10%", right: "-4%", background: "var(--fb-pink)" }} />

      <div className="relative mx-auto w-full max-w-[1600px]">
        <p className="fb-hero-sub mb-6 text-xs uppercase tracking-[0.35em] text-[var(--fb-cream)]/55">
          Austin, TX &middot; Artisan bakery est. 2014
        </p>

        <h1 className="fb-display fb-h-mega select-none text-[var(--fb-cream)]" aria-label="Flour & Bloom">
          <span className="block">
            <KineticWord word="FLOUR" />{" "}
            <span className="fb-serif italic text-[var(--fb-pink)]"><KineticWord word="&" /></span>
          </span>
          <span className="block">
            <KineticWord word="BLOOM" />
          </span>
        </h1>

        {/* duplicated / echoed sub-headline, CRAV-style */}
        <div className="fb-echo mt-2" aria-hidden>
          <span className="fb-echo__line">FRESH BAKED</span>
          <span className="fb-echo__line fb-echo__line--ghost">MADE TO ORDER</span>
        </div>

        <div className="mt-9 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <p className="fb-hero-sub max-w-md text-lg leading-relaxed text-[var(--fb-cream)]/70">
            Sourdough, pastries, and made-to-order cakes. Ordered in seconds,
            confirmed before the oven even beeps.
          </p>
          <a href="#order" data-magnetic className="fb-btn fb-hero-sub">
            Order something warm <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </div>

      {/* floating glass receipt card */}
      <div className="fb-glass fb-hero-sub absolute right-[6%] top-[24%] hidden w-56 rounded-2xl p-4 lg:block">
        <div className="text-[10px] uppercase tracking-widest text-[var(--fb-pink)]">New order</div>
        <div className="mt-1 text-sm font-semibold text-[var(--fb-cream)]">
          Celebration Cake &mdash; Sat pickup
        </div>
        <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-[var(--fb-cream)]/60">
          <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" /> Confirmed on WhatsApp
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-[var(--fb-cream)]/40">
        Scroll &mdash; the ovens are on
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Marquee                                                                   */
/* -------------------------------------------------------------------------- */

export function FbMarquee() {
  const row = [...marqueeWords, ...marqueeWords];
  return (
    <section className="border-y border-white/10 py-6" aria-hidden>
      <div className="fb-marquee">
        {row.map((w, i) => (
          <span key={i} className="fb-display flex items-center text-4xl text-[var(--fb-cream)]/80 sm:text-6xl">
            <span className="px-8">{w}</span>
            <span className="text-[var(--fb-pink)]">&#10046;</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Craft (story, masked-line reveal + wheat draw)                           */
/* -------------------------------------------------------------------------- */

export function FbCraft() {
  return (
    <section className="relative px-6 py-32 sm:px-10 sm:py-44">
      <div className="mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-[1.3fr_0.7fr]">
        <div data-fb-lines>
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[var(--fb-pink)]">02 &mdash; Craft</p>
          <h2 className="fb-display text-balance text-4xl text-[var(--fb-cream)] sm:text-6xl md:text-7xl">
            {storyLines.map((line, i) => (
              <span key={i} className="fb-line-mask">
                <span className="fb-line">{line}</span>
              </span>
            ))}
          </h2>
        </div>

        {/* Animated wheat stalk */}
        <svg viewBox="0 0 200 320" className="mx-auto w-32 sm:w-44" fill="none" aria-hidden>
          <path className="fb-draw" d="M100 312 C 100 240, 100 170, 100 70 C 100 44, 100 24, 100 6" stroke="var(--fb-amber)" strokeWidth="3" strokeLinecap="round" />
          {[
            { y: 230, r: -38 },
            { y: 230, r: 38 },
            { y: 185, r: -42 },
            { y: 185, r: 42 },
            { y: 140, r: -38 },
            { y: 140, r: 38 },
            { y: 96, r: -44 },
            { y: 96, r: 44 },
            { y: 56, r: -34 },
            { y: 56, r: 34 },
          ].map((grain, i) => (
            <g key={i} className="fb-leaf" style={{ transformOrigin: `100px ${grain.y}px` }} transform={`rotate(${grain.r} 100 ${grain.y})`}>
              <ellipse cx={100} cy={grain.y - 20} rx="7" ry="18" fill="var(--fb-amber)" opacity="0.9" />
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Bakes (pinned horizontal pass)                                           */
/* -------------------------------------------------------------------------- */

export function FbBakes() {
  return (
    <section className="fb-pass relative flex h-[100svh] flex-col overflow-hidden">
      <div className="px-6 pt-24 sm:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--fb-pink)]">03 &mdash; Bakes</p>
        <h2 className="fb-display fb-h-xl mt-2 text-[var(--fb-cream)]">Out of the oven</h2>
      </div>
      <div className="flex flex-1 items-center">
        <div className="fb-pass-track items-center gap-6 px-6 sm:gap-10 sm:px-10">
          {signatureBakes.map((c) => (
            <article
              key={c.no}
              className="relative h-[60vh] w-[80vw] flex-none overflow-hidden rounded-[26px] sm:w-[48vw] lg:w-[34vw]"
            >
              <BakeImage item={c} />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--fb-amber)]">{c.no}</div>
                    <h3 className="fb-display mt-1 text-3xl text-white sm:text-4xl">{c.name}</h3>
                    <p className="mt-2 max-w-xs text-sm text-white/70">{c.note}</p>
                  </div>
                  <span className="fb-serif text-3xl text-[var(--fb-amber)]">{c.price}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Layers (ingredient stack build)                                          */
/* -------------------------------------------------------------------------- */

export function FbLayers() {
  return (
    <section className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-14 max-w-2xl" data-fb-reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--fb-pink)]">04 &mdash; Layers</p>
          <h2 className="fb-display fb-h-xl mt-3 text-[var(--fb-cream)]">
            A story in <span className="fb-serif italic text-[var(--fb-pink)]">every layer.</span>
          </h2>
          <p className="mt-5 max-w-md text-[var(--fb-cream)]/60">
            Nothing is rushed and nothing is wasted. Built up, one honest layer at a time.
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Stacked layer chips */}
          <div className="flex flex-col-reverse gap-3">
            {layers.map((l, i) => (
              <div
                key={l.name}
                data-fb-reveal
                className="fb-layer flex items-center gap-5 rounded-2xl border border-white/10 p-5"
                style={{ marginLeft: `${i * 6}%` }}
              >
                <span
                  className="flex h-12 w-12 flex-none items-center justify-center rounded-xl text-2xl"
                  style={{ background: l.tone, color: "#23130a" }}
                >
                  {l.emoji}
                </span>
                <div>
                  <h3 className="fb-display text-xl text-[var(--fb-cream)] sm:text-2xl">{l.name}</h3>
                  <p className="mt-1 text-sm text-[var(--fb-cream)]/55">{l.note}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Connecting path */}
          <div className="hidden justify-center lg:flex" data-fb-reveal>
            <svg viewBox="0 0 240 360" className="w-56" fill="none" aria-hidden>
              <path
                className="fb-draw"
                d="M40 20 C 200 60, 40 120, 200 160 C 40 200, 200 240, 40 280 C 120 320, 160 330, 200 344"
                stroke="var(--fb-pink)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {[20, 90, 160, 230, 300].map((y, i) => (
                <circle key={i} cx={i % 2 === 0 ? 40 : 200} cy={y + 24} r="6" fill="var(--fb-amber)" />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Fresh (daily schedule cards)                                             */
/* -------------------------------------------------------------------------- */

export function FbFresh() {
  return (
    <section className="relative px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4" data-fb-reveal>
          <h2 className="fb-display fb-h-xl text-[var(--fb-cream)]">
            05 &mdash; Baked <span className="fb-serif italic text-[var(--fb-pink)]">fresh daily.</span>
          </h2>
          <p className="max-w-sm text-[var(--fb-cream)]/60">
            From the first scored loaf to a warm box at your door, every hour has its bake.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {freshCards.map((f) => (
            <div key={f.title} data-fb-reveal className="fb-glass rounded-[26px] p-7">
              <div className="text-3xl">{f.emoji}</div>
              <div className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--fb-amber)]">{f.time}</div>
              <h3 className="fb-display mt-2 text-2xl text-[var(--fb-cream)]">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--fb-cream)]/60">{f.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stats                                                                     */
/* -------------------------------------------------------------------------- */

export function FbStats() {
  return (
    <section className="border-y border-white/10 px-6 py-24 sm:px-10">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-y-12 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} data-fb-reveal className="text-center">
            <div
              className="fb-display fb-counter text-5xl text-[var(--fb-cream)] sm:text-7xl"
              data-value={s.value}
              data-prefix={s.prefix ?? ""}
              data-suffix={s.suffix}
              data-decimals={0}
            >
              {s.prefix ?? ""}0{s.suffix}
            </div>
            <div className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--fb-cream)]/50">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Order (interactive automation demo)                                      */
/* -------------------------------------------------------------------------- */

export function FbOrder() {
  return (
    <section id="order" className="relative px-6 py-28 sm:px-10">
      <div className="relative mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-2xl text-center" data-fb-reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--fb-pink)]">Try it live</p>
          <h2 className="fb-display fb-h-xl mt-3 text-[var(--fb-cream)]">Order it. We&rsquo;ll text you.</h2>
          <p className="mt-5 text-[var(--fb-cream)]/60">
            A working demo. Place a custom-cake order for an instant WhatsApp confirmation,
            or build a basket to watch an itemized receipt generate itself.
          </p>
        </div>
        <div className="mt-14" data-fb-reveal>
          <FlourBloomOrder />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Crumbs (testimonial + CTA + footer)                                      */
/* -------------------------------------------------------------------------- */

export function FbCrumbs({ onBack }: { onBack: () => void }) {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-32 sm:px-10">
      <figure className="mx-auto max-w-5xl text-center" data-fb-lines>
        <div className="text-2xl text-[var(--fb-amber)]">{"\u2605\u2605\u2605\u2605\u2605"}</div>
        <blockquote className="fb-display mt-8 text-balance text-3xl leading-tight text-[var(--fb-cream)] sm:text-5xl md:text-6xl">
          <span className="fb-line-mask"><span className="fb-line">&ldquo;{testimonial.quote}&rdquo;</span></span>
        </blockquote>
        <figcaption className="mt-10 text-sm uppercase tracking-[0.2em] text-[var(--fb-cream)]/50">
          {testimonial.author} &mdash; {testimonial.role}
        </figcaption>
      </figure>

      <div className="mx-auto mt-28 max-w-[1600px] text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[var(--fb-pink)]">06 &mdash; Crumbs</p>
        <h2 className="fb-display text-[clamp(2.6rem,11vw,11rem)] leading-[0.9] text-[var(--fb-cream)]">
          Come get it<br />
          <span className="fb-serif italic text-[var(--fb-pink)]">while it&rsquo;s warm.</span>
        </h2>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a href="#order" data-magnetic className="fb-btn text-base">
            Order something warm <span aria-hidden>&rarr;</span>
          </a>
          <button type="button" onClick={onBack} data-magnetic className="fb-btn fb-btn--ghost text-base">
            Back to portfolio
          </button>
        </div>
      </div>

      <footer className="mx-auto mt-24 flex max-w-[1600px] flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[var(--fb-cream)]/45 sm:flex-row">
        <span>Flour &amp; Bloom &middot; {contact.phone}</span>
        <span>{contact.address} &middot; {contact.hours}</span>
        <span>Built by Lumen Studio &middot; &copy; {new Date().getFullYear()}</span>
      </footer>
    </section>
  );
}
