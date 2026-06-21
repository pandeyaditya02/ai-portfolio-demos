"use client";

import { useRef, useState } from "react";
import {
  faqs,
  journey,
  marqueeWords,
  services,
  stats,
  testimonial,
  transformationImage,
} from "./data";
import { BrightBooking } from "./BrightBooking";

/* -------------------------------------------------------------------------- */
/*  Nav                                                                       */
/* -------------------------------------------------------------------------- */

export function BsdNav({ onBack }: { onBack: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-[70]">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 sm:px-10">
        <button type="button" onClick={onBack} data-magnetic className="text-sm font-semibold tracking-tight text-[var(--bsd-ink)]">
          &larr; Lumen Studio
        </button>
        <div className="bsd-display text-lg tracking-tight text-[var(--bsd-ink)]">Bright Smile</div>
        <a href="#book" data-magnetic className="hidden text-sm font-semibold text-[var(--bsd-ink)] sm:block">
          Book now
        </a>
      </nav>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

export function BsdHero() {
  return (
    <section data-bsd-hero className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 sm:px-10">
      <div className="bsd-blob" data-bsd-parallax data-speed="0.4" style={{ width: 600, height: 600, top: "-14%", right: "-8%", background: "#bcd3ff" }} />
      <div className="bsd-blob" data-bsd-parallax data-speed="0.25" style={{ width: 520, height: 520, bottom: "-16%", left: "-10%", background: "#bff4f0" }} />
      <div className="bsd-blob" style={{ width: 360, height: 360, top: "20%", left: "30%", background: "#ffe6b8", opacity: 0.4 }} />

      <div className="relative mx-auto w-full max-w-[1500px]">
        <p className="bsd-hero-sub mb-6 text-sm uppercase tracking-[0.28em] text-[var(--bsd-muted)]">
          Chicago &middot; Modern family dentistry
        </p>
        <h1 className="bsd-display bsd-h-mega text-[var(--bsd-ink)]">
          <span className="bsd-line-mask">
            <span className="bsd-line">Smile,</span>
          </span>
          <span className="bsd-line-mask">
            <span className="bsd-line bsd-serif italic text-[var(--bsd-blue)]">brighter.</span>
          </span>
        </h1>

        {/* hand-drawn smile underline */}
        <svg className="bsd-hero-sub mt-2 h-10 w-[min(420px,70vw)]" viewBox="0 0 420 40" fill="none" aria-hidden>
          <path className="bsd-arc" d="M6 12 C 110 46, 310 46, 414 12" />
        </svg>

        <div className="mt-8 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <p className="bsd-hero-sub max-w-md text-lg leading-relaxed text-[var(--bsd-muted)]">
            Gentle, modern care with online booking, automated reminders, and a front
            desk that runs itself, so you spend less time waiting and more time grinning.
          </p>
          <a href="#book" data-magnetic className="bsd-btn bsd-hero-sub">
            Book in 30 seconds
            <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </div>

      <div className="bsd-glass bsd-hero-sub absolute right-[6%] top-[24%] hidden w-60 rounded-2xl p-4 lg:block">
        <div className="text-[10px] uppercase tracking-widest text-[var(--bsd-blue)]">Next opening</div>
        <div className="mt-1 text-sm font-semibold text-[var(--bsd-ink)]">Today, 3:40 PM &middot; Hygiene</div>
        <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-[var(--bsd-muted)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--bsd-mint)]" /> Confirmed by SMS in 2s
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-[var(--bsd-muted)]">
        Scroll
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Marquee                                                                   */
/* -------------------------------------------------------------------------- */

export function BsdMarquee() {
  const row = [...marqueeWords, ...marqueeWords];
  return (
    <section className="border-y border-black/5 py-6" aria-hidden>
      <div className="bsd-marquee">
        {row.map((w, i) => (
          <span key={i} className="bsd-display flex items-center text-4xl text-[var(--bsd-ink)]/80 sm:text-6xl">
            <span className="px-8">{w}</span>
            <span className="text-[var(--bsd-blue)]">&middot;</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Story                                                                     */
/* -------------------------------------------------------------------------- */

export function BsdStory() {
  return (
    <section className="px-6 py-32 sm:px-10 sm:py-44">
      <div className="mx-auto max-w-5xl" data-bsd-lines>
        <h2 className="bsd-display text-balance text-4xl text-[var(--bsd-ink)] sm:text-6xl md:text-7xl">
          <span className="bsd-line-mask"><span className="bsd-line">Dentistry should feel</span></span>
          <span className="bsd-line-mask"><span className="bsd-line bsd-serif italic text-[var(--bsd-blue)]">calm, not clinical.</span></span>
          <span className="bsd-line-mask"><span className="bsd-line">So we rebuilt every minute of it.</span></span>
        </h2>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Services (editorial list)                                                 */
/* -------------------------------------------------------------------------- */

export function BsdServices() {
  return (
    <section id="services" className="px-6 py-24 sm:px-10">
      <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--bsd-blue)]">Treatments</p>
          <h2 className="bsd-display bsd-h-xl mt-4 text-[var(--bsd-ink)]">
            Care that<br />
            <span className="bsd-serif italic text-[var(--bsd-blue)]">fits your life.</span>
          </h2>
          <p className="mt-6 max-w-sm text-[var(--bsd-muted)]">
            Transparent pricing, quoted upfront, and an itemized receipt the moment you leave.
          </p>
        </div>
        <div className="border-t border-black/10">
          {services.map((s) => (
            <article
              key={s.no}
              data-bsd-reveal
              className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-5 border-b border-black/10 py-8 transition-colors hover:bg-black/[0.02] sm:gap-8 sm:py-10"
            >
              <span className="bsd-display text-xl text-[var(--bsd-ink)]/25">{s.no}</span>
              <div>
                <h3 className="bsd-display text-3xl text-[var(--bsd-ink)] sm:text-5xl">{s.name}</h3>
                <p className="mt-3 max-w-md text-sm text-[var(--bsd-muted)]">{s.desc}</p>
              </div>
              <span className="bsd-serif text-2xl text-[var(--bsd-blue)] sm:text-4xl">{s.price}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Before / after transformation slider                                      */
/* -------------------------------------------------------------------------- */

export function BsdTransformation() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  const layerBg = {
    backgroundImage: `url(${transformationImage}), linear-gradient(135deg, #cfe0ff, #c6f3ee)`,
  };

  return (
    <section className="px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4" data-bsd-reveal>
          <h2 className="bsd-display bsd-h-xl text-[var(--bsd-ink)]">
            The <span className="bsd-serif italic text-[var(--bsd-blue)]">glow-up.</span>
          </h2>
          <p className="max-w-sm text-[var(--bsd-muted)]">Drag to reveal a real whitening result. No filters, just enamel.</p>
        </div>

        <div
          ref={ref}
          className="bsd-ba aspect-[16/9] w-full"
          data-bsd-reveal
          onPointerDown={(e) => {
            dragging.current = true;
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            setFromClientX(e.clientX);
          }}
          onPointerMove={(e) => {
            if (dragging.current) setFromClientX(e.clientX);
          }}
          onPointerUp={(e) => {
            dragging.current = false;
            (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
          }}
        >
          <div className="bsd-ba__layer bsd-ba__before" style={layerBg} />
          <div className="bsd-ba__layer bsd-ba__after" style={{ ...layerBg, clipPath: `inset(0 0 0 ${pos}%)` }} />

          <span className="bsd-ba__tag left-4 bg-black/40 text-white">Before</span>
          <span className="bsd-ba__tag right-4 bg-white/70 text-[var(--bsd-ink)]">After</span>

          <div className="bsd-ba__handle" style={{ left: `${pos}%` }}>
            <div className="bsd-ba__grip">&#8596;</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Journey (pinned horizontal chapters)                                      */
/* -------------------------------------------------------------------------- */

export function BsdJourney() {
  return (
    <section className="bsd-journey relative flex h-[100svh] flex-col overflow-hidden bg-[var(--bsd-ink)] text-white">
      <div className="flex items-center justify-between px-6 pt-24 sm:px-10">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--bsd-mint)]">The visit</p>
          <h2 className="bsd-display bsd-h-xl mt-2">Your four minutes of calm</h2>
        </div>
      </div>
      <div className="mx-6 mt-6 h-px bg-white/15 sm:mx-10">
        <span className="bsd-progress block h-px bg-[var(--bsd-mint)]" />
      </div>
      <div className="flex flex-1 items-center">
        <div className="bsd-journey-track items-center gap-6 px-6 sm:gap-10 sm:px-10">
          {journey.map((c) => (
            <article
              key={c.no}
              className="flex h-[58vh] w-[82vw] flex-none flex-col justify-between rounded-[28px] border border-white/10 bg-white/[0.04] p-8 sm:w-[52vw] sm:p-12 lg:w-[40vw]"
            >
              <span className="bsd-display text-[clamp(4rem,9vw,9rem)] leading-none text-white/15">{c.no}</span>
              <div>
                <h3 className="bsd-display text-3xl sm:text-5xl">{c.title}</h3>
                <p className="mt-4 max-w-md text-white/60">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stats                                                                     */
/* -------------------------------------------------------------------------- */

export function BsdStats() {
  return (
    <section className="border-b border-black/5 px-6 py-24 sm:px-10">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-y-12 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} data-bsd-reveal className="text-center">
            <div
              className="bsd-display bsd-counter text-5xl text-[var(--bsd-ink)] sm:text-7xl"
              data-value={s.value}
              data-prefix={s.prefix ?? ""}
              data-suffix={s.suffix}
              data-decimals={s.decimals ?? 0}
            >
              {s.prefix ?? ""}0{s.suffix}
            </div>
            <div className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--bsd-muted)]">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Automation                                                                */
/* -------------------------------------------------------------------------- */

export function BsdAutomation() {
  return (
    <section id="book" className="relative px-6 py-28 sm:px-10">
      <div className="bsd-blob" style={{ width: 520, height: 520, top: "8%", right: "6%", background: "#cfe0ff", opacity: 0.4 }} />
      <div className="relative mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-2xl text-center" data-bsd-reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--bsd-blue)]">AI automation, built in</p>
          <h2 className="bsd-display bsd-h-xl mt-4 text-[var(--bsd-ink)]">The front desk that never sleeps</h2>
          <p className="mt-5 text-[var(--bsd-muted)]">
            A working demo. Request a time to fire an instant SMS confirmation, or open the
            patient CRM to see how every lead is captured and followed up.
          </p>
        </div>
        <div className="mt-14" data-bsd-reveal>
          <BrightBooking />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                       */
/* -------------------------------------------------------------------------- */

export function BsdFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-6 py-28 sm:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <h2 className="bsd-display bsd-h-xl text-[var(--bsd-ink)]" data-bsd-reveal>
          Good<br />
          <span className="bsd-serif italic text-[var(--bsd-blue)]">questions.</span>
        </h2>
        <div className="border-t border-black/10">
          {faqs.map((f, i) => (
            <div key={f.q} className="bsd-faq border-b border-black/10" data-open={open === i} data-bsd-reveal>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="bsd-display text-xl text-[var(--bsd-ink)] sm:text-2xl">{f.q}</span>
                <span className="bsd-faq__icon bsd-display text-2xl text-[var(--bsd-blue)]">+</span>
              </button>
              <div className="bsd-faq__a">
                <div className="bsd-faq__inner">
                  <p className="max-w-2xl pb-7 text-[var(--bsd-muted)]">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Testimonial                                                               */
/* -------------------------------------------------------------------------- */

export function BsdTestimonial() {
  return (
    <section className="px-6 py-32 sm:px-10 sm:py-44">
      <figure className="mx-auto max-w-5xl text-center" data-bsd-lines>
        <div className="text-2xl text-[var(--bsd-amber)]">{"\u2605\u2605\u2605\u2605\u2605"}</div>
        <blockquote className="bsd-display mt-8 text-balance text-3xl leading-tight text-[var(--bsd-ink)] sm:text-5xl md:text-6xl">
          <span className="bsd-line-mask"><span className="bsd-line">&ldquo;{testimonial.quote}&rdquo;</span></span>
        </blockquote>
        <figcaption className="mt-10 text-sm uppercase tracking-[0.2em] text-[var(--bsd-muted)]">
          {testimonial.author} &mdash; {testimonial.role}
        </figcaption>
      </figure>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  CTA + footer                                                              */
/* -------------------------------------------------------------------------- */

export function BsdCta({ onBack }: { onBack: () => void }) {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-24 sm:px-10">
      <div className="mx-auto max-w-[1600px]">
        <h2 className="bsd-display text-center text-[clamp(2.6rem,11vw,11rem)] leading-[0.9] text-[var(--bsd-ink)]">
          Your best smile,<br />
          <span className="bsd-serif italic text-[var(--bsd-blue)]">booked today.</span>
        </h2>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a href="#book" data-magnetic className="bsd-btn text-base">
            Book in 30 seconds <span aria-hidden>&rarr;</span>
          </a>
          <button type="button" onClick={onBack} data-magnetic className="bsd-btn bsd-btn--ghost text-base">
            Back to portfolio
          </button>
        </div>
      </div>
      <footer className="mx-auto mt-24 flex max-w-[1600px] flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 text-xs text-[var(--bsd-muted)] sm:flex-row">
        <span>Bright Smile Dental &middot; 1100 Lake Shore Dr, Chicago</span>
        <span>Demo experience designed &amp; built by Lumen Studio</span>
        <span>&copy; {new Date().getFullYear()}</span>
      </footer>
    </section>
  );
}
