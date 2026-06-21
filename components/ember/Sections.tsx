"use client";

import {
  contact,
  marqueeWords,
  menu,
  stages,
  stats,
  storyLines,
  testimonial,
} from "./data";
import { EmberReservation } from "./EmberReservation";

/* -------------------------------------------------------------------------- */
/*  SVG defs (heat-haze)                                                      */
/* -------------------------------------------------------------------------- */

export function EmSvgDefs() {
  return (
    <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <filter id="em-haze">
          <feTurbulence type="fractalNoise" baseFrequency="0.018 0.04" numOctaves={2} result="n">
            <animate attributeName="baseFrequency" dur="7s" values="0.018 0.04;0.022 0.05;0.018 0.04" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap id="em-haze-map" in="SourceGraphic" in2="n" scale={6} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Nav                                                                       */
/* -------------------------------------------------------------------------- */

export function EmNav({ onBack }: { onBack: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-[70]">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 sm:px-10">
        <button type="button" onClick={onBack} data-magnetic className="text-sm font-semibold tracking-tight text-[var(--em-cream)]">
          &larr; Lumen Studio
        </button>
        <div className="em-display text-lg tracking-tight text-[var(--em-cream)]">Olive &amp; Ember</div>
        <a href="#reserve" data-magnetic className="hidden text-sm font-semibold text-[var(--em-cream)] sm:block">
          Reserve
        </a>
      </nav>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Spark (hero)                                                              */
/* -------------------------------------------------------------------------- */

function KineticWord({ word }: { word: string }) {
  return (
    <>
      {word.split("").map((c, i) => (
        <span key={i} className="em-letter">
          {c}
        </span>
      ))}
    </>
  );
}

export function EmHero() {
  return (
    <section data-em-hero className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center sm:px-10">
      <p className="em-hero-sub mb-8 text-xs uppercase tracking-[0.35em] text-[var(--em-cream)]/55">
        Seattle &middot; Wood-fired bistro
      </p>

      <h1
        data-stoke
        className="em-display em-heat-text em-haze em-h-mega select-none text-[var(--em-cream)]"
        aria-label="Olive & Ember"
      >
        <span className="block"><KineticWord word="OLIVE" /></span>
        <span className="block">
          <span className="em-serif italic text-[var(--em-ember-bright)]"><KineticWord word="&" /></span>{" "}
          <KineticWord word="EMBER" />
        </span>
      </h1>

      <p className="em-hero-sub mt-8 max-w-md text-base leading-relaxed text-[var(--em-cream)]/65">
        Cooked over live flame. Reserved in seconds, confirmed before you put your phone down.
      </p>

      <div className="em-hero-sub mt-9 flex flex-wrap items-center justify-center gap-4">
        <a href="#reserve" data-magnetic className="em-btn">
          Reserve a table <span aria-hidden>&rarr;</span>
        </a>
        <span className="text-xs uppercase tracking-[0.25em] text-[var(--em-cream)]/40">Press &amp; hold the name to stoke</span>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-[var(--em-cream)]/40">
        Scroll to feed the fire
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Marquee                                                                   */
/* -------------------------------------------------------------------------- */

export function EmMarquee() {
  const row = [...marqueeWords, ...marqueeWords];
  return (
    <section className="border-y border-white/10 py-6" aria-hidden>
      <div className="em-marquee">
        {row.map((w, i) => (
          <span key={i} className="em-display flex items-center text-4xl text-[var(--em-cream)]/75 sm:text-6xl">
            <span className="px-8">{w}</span>
            <span className="text-[var(--em-ember)]">&bull;</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Kindle (story + olive branch)                                             */
/* -------------------------------------------------------------------------- */

export function EmKindle() {
  return (
    <section className="relative px-6 py-32 sm:px-10 sm:py-44">
      <div className="mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-[1.3fr_0.7fr]">
        <div data-em-lines>
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[var(--em-ember)]">02 &mdash; Kindle</p>
          <h2 className="em-display text-balance text-4xl text-[var(--em-cream)] sm:text-6xl md:text-7xl">
            {storyLines.map((line, i) => (
              <span key={i} className="em-line-mask">
                <span className="em-line">{line}</span>
              </span>
            ))}
          </h2>
        </div>

        {/* Animated olive branch */}
        <svg viewBox="0 0 200 320" className="mx-auto w-40 sm:w-52" fill="none" aria-hidden>
          <path className="em-draw" d="M100 312 C 96 230, 104 170, 100 96 C 98 60, 104 30, 100 8" stroke="var(--em-olive)" strokeWidth="3" strokeLinecap="round" />
          {[
            { x: 100, y: 250, r: -35 },
            { x: 100, y: 250, r: 35 },
            { x: 100, y: 195, r: -40 },
            { x: 100, y: 195, r: 40 },
            { x: 100, y: 140, r: -35 },
            { x: 100, y: 140, r: 35 },
            { x: 100, y: 90, r: -42 },
            { x: 100, y: 90, r: 42 },
          ].map((leaf, i) => (
            <g key={i} className="em-leaf" style={{ transformOrigin: `${leaf.x}px ${leaf.y}px` }} transform={`rotate(${leaf.r} ${leaf.x} ${leaf.y})`}>
              <ellipse cx={leaf.x} cy={leaf.y - 22} rx="9" ry="22" fill="var(--em-olive)" opacity="0.85" />
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Blaze (pinned menu pass)                                                  */
/* -------------------------------------------------------------------------- */

function Steam() {
  return (
    <svg className="em-steam-wisp absolute -top-10 left-8 h-12 w-16 opacity-0" viewBox="0 0 60 50" fill="none" aria-hidden>
      <path className="em-steam" d="M16 48 C 8 34, 24 28, 16 14 C 12 8, 18 4, 16 0" strokeWidth="2.5" />
      <path className="em-steam" d="M40 48 C 32 32, 48 26, 40 12 C 36 6, 42 2, 40 -2" strokeWidth="2.5" opacity="0.7" />
    </svg>
  );
}

export function EmBlaze() {
  return (
    <section className="em-pass relative flex h-[100svh] flex-col overflow-hidden">
      <div className="px-6 pt-24 sm:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--em-ember)]">03 &mdash; Blaze</p>
        <h2 className="em-display em-h-xl mt-2 text-[var(--em-cream)]">From the fire</h2>
      </div>
      <div className="flex flex-1 items-center">
        <div className="em-pass-track items-center gap-6 px-6 sm:gap-10 sm:px-10">
          {menu.map((c) => (
            <article
              key={c.no}
              className="em-glass relative flex h-[58vh] w-[80vw] flex-none flex-col justify-between rounded-[28px] p-8 sm:w-[48vw] sm:p-12 lg:w-[36vw]"
            >
              <Steam />
              <div className="flex items-start justify-between">
                <span className="em-serif text-2xl italic text-[var(--em-gold)]">{c.no}</span>
                <span className="em-serif text-3xl text-[var(--em-ember-bright)]">{c.price}</span>
              </div>
              <div>
                <h3 className="em-display em-haze text-4xl text-[var(--em-cream)] sm:text-6xl">{c.name}</h3>
                <p className="mt-4 max-w-sm text-[var(--em-cream)]/55">{c.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Glow (reservation)                                                        */
/* -------------------------------------------------------------------------- */

export function EmGlow() {
  return (
    <section id="reserve" className="relative px-6 py-28 sm:px-10">
      <div className="relative mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-2xl text-center" data-em-reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--em-ember)]">04 &mdash; Glow</p>
          <h2 className="em-display em-h-xl mt-3 text-[var(--em-cream)]">Reserve. We&rsquo;ll text you.</h2>
          <p className="mt-5 text-[var(--em-cream)]/60">
            A working demo. Book a table for an instant WhatsApp confirmation, or build the
            bill to watch an itemized digital receipt generate itself.
          </p>
        </div>
        <div className="mt-14" data-em-reveal>
          <EmberReservation />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stats                                                                     */
/* -------------------------------------------------------------------------- */

export function EmStats() {
  return (
    <section className="border-y border-white/10 px-6 py-24 sm:px-10">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-y-12 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} data-em-reveal className="text-center">
            <div
              className="em-display em-counter text-5xl text-[var(--em-cream)] sm:text-7xl"
              data-value={s.value}
              data-prefix={s.prefix ?? ""}
              data-suffix={s.suffix}
              data-decimals={s.decimals ?? 0}
            >
              {s.prefix ?? ""}0{s.suffix}
            </div>
            <div className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--em-cream)]/50">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Embers (testimonial + CTA + footer)                                       */
/* -------------------------------------------------------------------------- */

export function EmEmbers({ onBack }: { onBack: () => void }) {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-32 sm:px-10">
      <figure className="mx-auto max-w-5xl text-center" data-em-lines>
        <div className="text-2xl text-[var(--em-gold)]">{"\u2605\u2605\u2605\u2605\u2605"}</div>
        <blockquote className="em-display mt-8 text-balance text-3xl leading-tight text-[var(--em-cream)] sm:text-5xl md:text-6xl">
          <span className="em-line-mask"><span className="em-line">&ldquo;{testimonial.quote}&rdquo;</span></span>
        </blockquote>
        <figcaption className="mt-10 text-sm uppercase tracking-[0.2em] text-[var(--em-cream)]/50">
          {testimonial.author} &mdash; {testimonial.role}
        </figcaption>
      </figure>

      <div className="mx-auto mt-28 max-w-[1600px] text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[var(--em-ember)]">05 &mdash; Embers</p>
        <h2 className="em-display text-[clamp(2.6rem,11vw,11rem)] leading-[0.9] text-[var(--em-cream)]">
          Come sit<br />
          <span className="em-serif italic text-[var(--em-ember-bright)]">by the fire.</span>
        </h2>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a href="#reserve" data-magnetic className="em-btn text-base">
            Reserve a table <span aria-hidden>&rarr;</span>
          </a>
          <button type="button" onClick={onBack} data-magnetic className="em-btn em-btn--ghost text-base">
            Back to portfolio
          </button>
        </div>
      </div>

      <footer className="mx-auto mt-24 flex max-w-[1600px] flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[var(--em-cream)]/45 sm:flex-row">
        <span>Olive &amp; Ember &middot; {contact.phone}</span>
        <span>{contact.address} &middot; {contact.hours}</span>
        <span>Built by Lumen Studio &middot; &copy; {new Date().getFullYear()}</span>
      </footer>
    </section>
  );
}

/* Re-export stage labels for any future progress UI. */
export { stages };

const emAutomationIdeas = [
  {
    icon: "\u{1F37D}\uFE0F",
    title: "Waitlist & table-turn optimizer",
    desc: "Predicts table availability in real time and offers freed-up tables to the waitlist automatically.",
  },
  {
    icon: "\u{1F377}",
    title: "Personalized menu & upsell",
    desc: "Recommends dishes and wine pairings to each guest based on their past orders and the night's specials.",
  },
  {
    icon: "\u{1F389}",
    title: "Large-party inquiry handler",
    desc: "An AI assistant captures event size, date, and budget, then returns an instant private-dining quote.",
  },
];

export function EmAutomations() {
  return (
    <section className="relative px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="mx-auto max-w-2xl text-center" data-em-reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--em-ember)]">More on the pass</p>
          <h2 className="em-display em-h-xl mt-3 text-[var(--em-cream)]">
            AI we can <span className="em-serif italic text-[var(--em-ember-bright)]">fire up next.</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {emAutomationIdeas.map((a) => (
            <div key={a.title} data-em-reveal className="em-glass rounded-[28px] p-8">
              <div className="text-3xl">{a.icon}</div>
              <h3 className="em-display mt-5 text-2xl text-[var(--em-cream)] sm:text-3xl">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--em-cream)]/60">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
