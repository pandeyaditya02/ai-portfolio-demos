# Code Change 7 — Lumen Studio hub redesign (delta after code_change6.md)

Redesigned the portfolio hub at `/` into a bold, motion-driven creative-agency experience inspired by [digitalists.at](https://digitalists.at/): electric-yellow accent on near-black/off-white, custom cursor + magnetic, GSAP kinetic word-by-word headline, numbered services, animated counters, a "Cases" grid for the demos, a contact form, and playful microcopy. Only changes **after `code_change6.md`** are shown. The 15 demo sites are untouched; everything is scoped under `.studio`. Reuses the shared `components/pawsome/motion.ts` loader (GSAP + ScrollTrigger + Lenis); no new deps/fonts.

## Summary

| File | Type | Change |
|---|---|---|
| `app/page.tsx` | modified | Replaced the entire previous hub with a thin render of `<StudioExperience />` |
| `app/globals.css` | modified | Appended the scoped `.studio` design system |
| `components/studio/data.ts` | new | Statement words, services, process, marquee, microcopy |
| `components/studio/Sections.tsx` | new | Nav, kinetic hero, marquee, services, counters, Cases grid, process, contact, footer |
| `components/studio/StudioExperience.tsx` | new | Orchestrator: preloader, custom cursor + magnetic, Lenis + GSAP |

> The previous `components/portfolio/NicheCard.tsx` is now unused (the hub no longer imports it) but is left in place.

---

## A. Modified files

### `app/page.tsx` — replaced the previous hub entirely

The old ~309-line server-rendered hub (nav, hero, problem, work grid via `NicheCard`, capabilities, process, CTA, footer) is fully replaced by:

```tsx
import { StudioExperience } from "@/components/studio/StudioExperience";

export default function HomePage() {
  return <StudioExperience />;
}
```

### `app/globals.css` — appended scoped `.studio` design system

```css
/* ============================================================
   LUMEN STUDIO — agency hub (digitalists.at-inspired, scoped)
   ============================================================ */
.studio {
  --st-ink: #0e0e0e;
  --st-cream: #f4f4f0;
  --st-yellow: #f1e500;
  --st-gray: #8a8a82;
  --st-display: "Bricolage Grotesque", "Archivo", sans-serif;
  --st-sans: "Manrope", ui-sans-serif, system-ui, sans-serif;

  position: relative;
  background: var(--st-cream);
  color: var(--st-ink);
  font-family: var(--st-sans);
  overflow-x: hidden;
}

@media (hover: hover) and (pointer: fine) {
  .studio,
  .studio a,
  .studio button {
    cursor: none;
  }
}

/* Custom cursor (difference blend) */
.st-cursor,
.st-cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;
  border-radius: 9999px;
  will-change: transform;
  mix-blend-mode: difference;
}
.st-cursor {
  width: 34px;
  height: 34px;
  margin: -17px 0 0 -17px;
  border: 1.5px solid #fff;
  transition: width 0.28s ease, height 0.28s ease, margin 0.28s ease, background 0.28s ease;
}
.st-cursor[data-variant="hover"] {
  width: 92px;
  height: 92px;
  margin: -46px 0 0 -46px;
  background: var(--st-yellow);
  border-color: var(--st-yellow);
  mix-blend-mode: normal;
}
.st-cursor-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #0e0e0e;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.st-cursor[data-variant="hover"] .st-cursor-label { opacity: 1; }
.st-cursor-dot {
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -3px;
  background: #fff;
}
@media (hover: none) {
  .st-cursor,
  .st-cursor-dot {
    display: none;
  }
}

/* Typography */
.st-display {
  font-family: var(--st-display);
  font-weight: 800;
  line-height: 0.92;
  letter-spacing: -0.035em;
  text-transform: uppercase;
}
.st-h-mega { font-size: clamp(2.6rem, 9vw, 9.5rem); }
.st-h-xl { font-size: clamp(2.2rem, 6vw, 6rem); }

/* Buttons */
.st-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  border-radius: 9999px;
  background: var(--st-yellow);
  color: var(--st-ink);
  padding: 0.95rem 1.7rem;
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  will-change: transform;
  transition: filter 0.25s ease;
}
.st-btn:hover { filter: brightness(0.94); }
.st-btn--dark {
  background: var(--st-ink);
  color: var(--st-cream);
}
.st-btn--ghost {
  background: transparent;
  color: var(--st-ink);
  border: 1.5px solid rgba(14, 14, 14, 0.25);
}
.st-btn--ghost:hover { background: rgba(14, 14, 14, 0.05); filter: none; }

/* Inputs */
.st-input {
  width: 100%;
  border: none;
  border-bottom: 2px solid rgba(14, 14, 14, 0.2);
  background: transparent;
  padding: 0.7rem 0;
  font-size: 1.05rem;
  color: var(--st-ink);
  outline: none;
  transition: border-color 0.2s ease;
}
.st-input::placeholder { color: rgba(14, 14, 14, 0.4); }
.st-input:focus { border-color: var(--st-ink); }

/* Eyebrow tag */
.st-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--st-gray);
}
.st-tag::before {
  content: "";
  width: 9px;
  height: 9px;
  border-radius: 9999px;
  background: var(--st-yellow);
}

/* Kinetic headline words */
.st-word-mask { display: inline-flex; overflow: hidden; vertical-align: top; }
.st-word { display: inline-block; transform: translateY(110%); }
.is-ready .st-word { transform: none; }
.st-hl { color: var(--st-ink); background: var(--st-yellow); padding: 0 0.12em; }

/* Reveal primitives */
.st-reveal { opacity: 0; transform: translateY(42px); }
.is-ready .st-reveal { opacity: 1; transform: none; }
.st-line-mask { overflow: hidden; display: block; }
.st-line { display: block; transform: translateY(115%); }
.is-ready .st-line { transform: none; }

/* Marquee (reuses pw-marquee keyframes) */
.st-marquee {
  display: flex;
  width: max-content;
  will-change: transform;
  animation: pw-marquee 30s linear infinite;
}

/* Service row */
.st-service {
  position: relative;
  border-top: 1.5px solid rgba(14, 14, 14, 0.14);
  transition: color 0.3s ease;
}
.st-service:last-child { border-bottom: 1.5px solid rgba(14, 14, 14, 0.14); }
.st-service__fill {
  position: absolute;
  inset: 0;
  background: var(--st-yellow);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 0;
}
.st-service:hover .st-service__fill { transform: scaleY(1); }
.st-service > * { position: relative; z-index: 1; }

/* Case card */
.st-case {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 340px;
  overflow: hidden;
  border-radius: 22px;
  background: var(--st-ink);
  color: var(--st-cream);
  padding: 1.6rem;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.st-case__glow {
  position: absolute;
  inset: 0;
  opacity: 0.22;
  transition: opacity 0.5s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transform: scale(1.02);
}
.st-case:hover .st-case__glow { opacity: 0.5; transform: scale(1.12); }
.st-case:hover { transform: translateY(-6px); }

/* Counters */
.st-counter { font-variant-numeric: tabular-nums; }

/* Preloader */
.st-preloader {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 7vw;
  background: var(--st-ink);
  color: var(--st-cream);
}

/* Page wipe */
.st-wipe {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: var(--st-yellow);
  transform: scaleY(0);
  transform-origin: bottom;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .st-marquee { animation: none; }
  .st-reveal { opacity: 1; transform: none; }
  .st-word,
  .st-line { transform: none; }
}
```

---

## B. New files

### `components/studio/data.ts`

```ts
/** Hero statement, split into words; `hl: true` words get the yellow highlight. */
export const statement: { text: string; hl?: boolean }[] = [
  { text: "We" },
  { text: "make" },
  { text: "local" },
  { text: "businesses" },
  { text: "unforgettable,", hl: true },
  { text: "bookable,", hl: true },
  { text: "and" },
  { text: "impossible" },
  { text: "to" },
  { text: "ignore" },
  { text: "online.", hl: true },
];

export const services = [
  {
    no: "01",
    name: "Websites & E-Commerce",
    desc: "Premium, custom-grade sites that look like a $2,000+ build and convert visitors into customers.",
  },
  {
    no: "02",
    name: "AI Automation",
    desc: "Booking confirmations, receipts, reminders, and follow-ups that run themselves, 24/7.",
  },
  {
    no: "03",
    name: "Booking & CRM",
    desc: "Online scheduling and lead pipelines wired straight into WhatsApp, SMS, and your inbox.",
  },
  {
    no: "04",
    name: "SEO & Growth",
    desc: "Local visibility, review engines, and analytics so the right customers actually find you.",
  },
  {
    no: "05",
    name: "Brand & Identity",
    desc: "A look and voice that makes a one-location shop feel like a national brand.",
  },
];

export const process = [
  { n: "01", title: "Discovery", body: "We map your services, customers, and the busywork eating your day." },
  { n: "02", title: "Design & build", body: "A premium, custom website crafted around your brand." },
  { n: "03", title: "Automate", body: "We wire in the AI workflows: bookings, receipts, CRM, reminders." },
  { n: "04", title: "Launch & grow", body: "Go live with analytics, SEO, and automations working around the clock." },
];

export const marqueeWords = [
  "Websites",
  "AI Automation",
  "Booking",
  "CRM",
  "Receipts",
  "Reminders",
  "SEO",
  "Branding",
];

/** Demo slugs that get bespoke, Awwwards-grade builds (flagged as featured). */
export const featuredSlugs = ["pet-care", "dentist", "restaurant"];

export const microcopy = {
  loader: "Warming up the studio",
  scrollNote: "keep scrolling, it gets better",
  footerNote: "the scroll goes on... not.done.yet",
};
```

### `components/studio/Sections.tsx`

```tsx
"use client";

import { useState } from "react";
import { businesses } from "@/data/businesses";
import type { Business } from "@/data/types";
import { featuredSlugs, marqueeWords, microcopy, process, services, statement } from "./data";

/* -------------------------------------------------------------------------- */
/*  Nav                                                                       */
/* -------------------------------------------------------------------------- */

export function StNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-[70] mix-blend-difference">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 sm:px-10">
        <a href="#top" data-magnetic className="st-display text-xl tracking-tight text-white">
          Lumen<span className="text-[var(--st-yellow)]">.</span>
        </a>
        <div className="hidden items-center gap-8 text-sm font-semibold text-white md:flex">
          <a href="#work" data-magnetic className="transition hover:opacity-60">Work</a>
          <a href="#services" data-magnetic className="transition hover:opacity-60">Services</a>
          <a href="#process" data-magnetic className="transition hover:opacity-60">Process</a>
        </div>
        <a
          href="#contact"
          data-magnetic
          className="rounded-full border-2 border-white px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-white hover:text-[var(--st-ink)]"
        >
          Let&rsquo;s talk
        </a>
      </nav>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

export function StHero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-center px-6 pt-28 sm:px-10">
      <p className="st-reveal st-tag mb-8">premium.sites.automation</p>
      <h1 className="st-display st-h-mega max-w-[16ch] text-[var(--st-ink)]">
        {statement.map((w, i) => (
          <span key={i} className="st-word-mask">
            <span className={`st-word ${w.hl ? "st-hl" : ""}`}>{w.text}</span>
            {i < statement.length - 1 ? <span>&nbsp;</span> : null}
          </span>
        ))}
      </h1>
      <div className="mt-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <p className="st-reveal max-w-md text-lg leading-relaxed text-[var(--st-ink)]/70">
          A studio for local businesses: premium websites wired with AI automation that
          books, confirms, invoices, and follows up, so you don&rsquo;t have to.
        </p>
        <div className="st-reveal flex flex-wrap gap-3">
          <a href="#work" data-magnetic className="st-btn">
            See the work <span aria-hidden>&rarr;</span>
          </a>
          <a href="#contact" data-magnetic className="st-btn st-btn--ghost">
            Start a project
          </a>
        </div>
      </div>
      <div className="mt-16 text-xs uppercase tracking-[0.3em] text-[var(--st-gray)]">{microcopy.scrollNote}</div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Marquee                                                                   */
/* -------------------------------------------------------------------------- */

export function StMarquee() {
  const row = [...marqueeWords, ...marqueeWords];
  return (
    <section className="border-y-2 border-[var(--st-ink)] bg-[var(--st-ink)] py-5" aria-hidden>
      <div className="st-marquee">
        {row.map((w, i) => (
          <span key={i} className="st-display flex items-center text-3xl text-[var(--st-cream)] sm:text-5xl">
            <span className="px-6">{w}</span>
            <span className="text-[var(--st-yellow)]">&#9670;</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Services                                                                  */
/* -------------------------------------------------------------------------- */

export function StServices() {
  return (
    <section id="services" className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="st-display st-h-xl text-[var(--st-ink)]">What we do</h2>
          <p className="max-w-sm text-[var(--st-ink)]/60">What we do is what we love. Five ways we put your business online and on autopilot.</p>
        </div>
        <div>
          {services.map((s) => (
            <div key={s.no} data-reveal className="st-service group">
              <div className="grid grid-cols-[auto_1fr] items-center gap-5 px-2 py-7 sm:grid-cols-[auto_1fr_1.2fr] sm:gap-10 sm:py-9">
                <span className="st-display text-xl text-[var(--st-ink)]/30">{s.no}</span>
                <h3 className="st-display text-3xl text-[var(--st-ink)] sm:text-6xl">{s.name}</h3>
                <p className="hidden text-sm text-[var(--st-ink)]/70 sm:block">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Counter band                                                              */
/* -------------------------------------------------------------------------- */

export function StCounters() {
  const items = [
    { value: businesses.length, suffix: "", label: "Industries covered" },
    { value: businesses.length, suffix: "", label: "Live demos to explore" },
    { value: 3, suffix: "", label: "Awwwards-grade builds" },
  ];
  return (
    <section className="border-y-2 border-[var(--st-ink)] bg-[var(--st-yellow)] px-6 py-16 sm:px-10">
      <div className="mx-auto grid max-w-[1600px] gap-y-10 sm:grid-cols-3">
        {items.map((it) => (
          <div key={it.label} data-reveal className="text-center">
            <div className="st-display st-counter text-6xl text-[var(--st-ink)] sm:text-8xl" data-value={it.value} data-suffix={it.suffix}>
              0{it.suffix}
            </div>
            <div className="mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--st-ink)]/70">{it.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Cases                                                                     */
/* -------------------------------------------------------------------------- */

const KIND_LABEL: Record<string, string> = {
  booking: "Booking",
  receipt: "Receipts",
  crm: "CRM",
};

function CaseCard({ business, index, onOpen }: { business: Business; index: number; onOpen: (slug: string) => void }) {
  const featured = featuredSlugs.includes(business.slug);
  return (
    <button
      type="button"
      data-magnetic
      data-case
      onClick={() => onOpen(business.slug)}
      className="st-case group text-left"
    >
      <div
        className="st-case__glow"
        style={{ background: `radial-gradient(120% 120% at 30% 20%, ${business.theme.brand}, transparent 70%)` }}
      />
      <div className="relative z-[1] mb-auto flex w-full items-start justify-between">
        <span className="st-display text-sm text-[var(--st-cream)]/60">CS {String(index + 1).padStart(2, "0")}</span>
        {featured && (
          <span className="rounded-full bg-[var(--st-yellow)] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[var(--st-ink)]">
            Featured
          </span>
        )}
      </div>
      <div className="relative z-[1]">
        <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[var(--st-cream)]/60">{business.niche}</div>
        <h3 className="st-display text-3xl leading-none text-[var(--st-cream)] sm:text-4xl">{business.name}</h3>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {business.demoAutomations.map((k) => (
            <span key={k} className="rounded-full border border-white/20 px-2.5 py-1 text-[11px] font-semibold text-[var(--st-cream)]/80">
              {KIND_LABEL[k] ?? k}
            </span>
          ))}
          <span className="ml-auto text-xl text-[var(--st-yellow)]">&rarr;</span>
        </div>
      </div>
    </button>
  );
}

export function StCases({ onOpen }: { onOpen: (slug: string) => void }) {
  return (
    <section id="work" className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="st-display st-h-xl text-[var(--st-ink)]">
            Cases<span className="text-[var(--st-yellow)]">.</span>
          </h2>
          <p className="max-w-sm text-[var(--st-ink)]/60">
            {businesses.length} live demos, one per industry. Click any case to open the real,
            interactive build.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map((b, i) => (
            <div key={b.slug} data-reveal>
              <CaseCard business={b} index={i} onOpen={onOpen} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Process                                                                   */
/* -------------------------------------------------------------------------- */

export function StProcess() {
  return (
    <section id="process" className="border-t-2 border-[var(--st-ink)] px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-[1600px]">
        <h2 className="st-display st-h-xl mb-12 text-[var(--st-ink)]">How it works</h2>
        <div className="grid gap-8 md:grid-cols-4">
          {process.map((s) => (
            <div key={s.n} data-reveal>
              <div className="st-display text-5xl text-[var(--st-yellow)]" style={{ WebkitTextStroke: "1.5px #0e0e0e" }}>
                {s.n}
              </div>
              <h3 className="st-display mt-4 text-2xl text-[var(--st-ink)]">{s.title}</h3>
              <p className="mt-3 text-sm text-[var(--st-ink)]/65">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Contact                                                                   */
/* -------------------------------------------------------------------------- */

function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div className="animate-fade-up rounded-3xl bg-[var(--st-yellow)] p-10 text-center">
        <div className="st-display text-3xl text-[var(--st-ink)]">Thanks! {"\u{1F44B}"}</div>
        <p className="mt-3 text-[var(--st-ink)]/70">Your message landed. I&rsquo;ll be in touch within one business day.</p>
      </div>
    );
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="grid gap-7"
    >
      <div className="grid gap-7 sm:grid-cols-2">
        <input required placeholder="Name*" className="st-input" />
        <input placeholder="Company" className="st-input" />
      </div>
      <input required type="email" placeholder="Email*" className="st-input" />
      <input required placeholder="Tell me about your project*" className="st-input" />
      <button type="submit" data-magnetic className="st-btn st-btn--dark w-fit">
        Send it <span aria-hidden>&rarr;</span>
      </button>
    </form>
  );
}

export function StContact() {
  return (
    <section id="contact" className="bg-[var(--st-ink)] px-6 py-24 text-[var(--st-cream)] sm:px-10 sm:py-32">
      <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div data-reveal>
          <p className="st-tag mb-6">Let&rsquo;s work together</p>
          <h2 className="st-display text-[clamp(2.6rem,9vw,8rem)] leading-[0.9] text-[var(--st-cream)]">
            Got a business
            <br />
            to put <span className="st-hl">online?</span>
          </h2>
          <p className="mt-8 max-w-md text-[var(--st-cream)]/60">
            Tell me what you run and what eats your time. I&rsquo;ll show you the site and the
            automations that will move the needle.
          </p>
        </div>
        <div data-reveal className="lg:pt-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

export function StFooter() {
  return (
    <footer className="bg-[var(--st-ink)] px-6 pb-10 text-[var(--st-cream)] sm:px-10">
      <div className="mx-auto max-w-[1600px] border-t border-white/15 pt-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="st-display text-2xl">Lumen<span className="text-[var(--st-yellow)]">.</span> Studio</div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--st-cream)]/60">
            <a href="#work" data-magnetic className="hover:text-[var(--st-cream)]">Work</a>
            <a href="#services" data-magnetic className="hover:text-[var(--st-cream)]">Services</a>
            <a href="#process" data-magnetic className="hover:text-[var(--st-cream)]">Process</a>
            <a href="#contact" data-magnetic className="hover:text-[var(--st-cream)]">Contact</a>
          </div>
          <p className="text-xs text-[var(--st-cream)]/40">&copy; {new Date().getFullYear()} Lumen Studio</p>
        </div>
        <div className="mt-10 text-center text-[10px] uppercase tracking-[0.4em] text-[var(--st-cream)]/25">
          {microcopy.footerNote}
        </div>
      </div>
    </footer>
  );
}
```

### `components/studio/StudioExperience.tsx`

```tsx
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { loadMotionLibs, prefersReducedMotion } from "@/components/pawsome/motion";
import { microcopy } from "./data";
import {
  StCases,
  StContact,
  StCounters,
  StFooter,
  StHero,
  StMarquee,
  StNav,
  StProcess,
  StServices,
} from "./Sections";

export function StudioExperience() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<any>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = prefersReducedMotion();
    const cleanups: Array<() => void> = [];
    let rafId = 0;
    let cancelled = false;
    let lenis: any = null;

    /* Custom cursor */
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (fine && cursorRef.current && dotRef.current) {
      const ring = cursorRef.current;
      const dot = dotRef.current;
      const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const target = { ...pos };
      const onMove = (e: MouseEvent) => {
        target.x = e.clientX;
        target.y = e.clientY;
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      };
      const tick = () => {
        pos.x += (target.x - pos.x) * 0.18;
        pos.y += (target.y - pos.y) * 0.18;
        ring.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        rafId = requestAnimationFrame(tick);
      };
      window.addEventListener("mousemove", onMove);
      rafId = requestAnimationFrame(tick);

      const setVariant = (v: string, label = "") => {
        ring.dataset.variant = v;
        if (labelRef.current) labelRef.current.textContent = label;
      };
      const onOver = (e: MouseEvent) => {
        const t = e.target as HTMLElement;
        if (t.closest("[data-case]")) setVariant("hover", "View");
        else if (t.closest("a, button, [data-magnetic]")) setVariant("hover", "");
        else setVariant("", "");
      };
      document.addEventListener("mouseover", onOver);
      cleanups.push(() => {
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseover", onOver);
      });
    }

    const init = async () => {
      const libs = reduced ? null : await loadMotionLibs();
      if (cancelled) return;
      const gsap = libs?.gsap;
      const ScrollTrigger = libs?.ScrollTrigger;
      gsapRef.current = gsap ?? null;

      /* Magnetic */
      root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width / 2)) * 0.35;
          const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
          if (gsap) gsap.to(el, { x, y, duration: 0.4, ease: "power3.out" });
          else el.style.transform = `translate(${x}px, ${y}px)`;
        };
        const leave = () => {
          if (gsap) gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
          else el.style.transform = "";
        };
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          el.removeEventListener("mousemove", move);
          el.removeEventListener("mouseleave", leave);
        });
      });

      const liftPreloader = () => {
        const pl = preloaderRef.current;
        if (!pl) return;
        if (gsap) gsap.to(pl, { yPercent: -100, duration: 0.9, ease: "power4.inOut", onComplete: () => (pl.style.display = "none") });
        else pl.style.display = "none";
      };

      await new Promise((r) => window.setTimeout(r, reduced ? 0 : 650));
      if (cancelled) return;
      liftPreloader();
      root.classList.add("is-ready");

      if (!gsap || !ScrollTrigger) return;

      if (libs?.Lenis) {
        lenis = new libs.Lenis({ lerp: 0.1, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);
        const rafCb = (t: number) => lenis.raf(t * 1000);
        gsap.ticker.add(rafCb);
        gsap.ticker.lagSmoothing(0);
        cleanups.push(() => gsap.ticker.remove(rafCb));
      }

      const ctx = gsap.context(() => {
        /* Hero intro: kinetic words + reveals */
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .from(".st-word", { yPercent: 110, duration: 1, stagger: 0.06 })
          .from(".st-reveal", { y: 28, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.5");

        /* Section reveals */
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });

        /* Counters */
        gsap.utils.toArray<HTMLElement>(".st-counter").forEach((el) => {
          const value = parseFloat(el.dataset.value || "0");
          const suffix = el.dataset.suffix || "";
          const obj = { v: 0 };
          gsap.to(obj, {
            v: value,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => {
              el.textContent = `${Math.round(obj.v)}${suffix}`;
            },
          });
        });
      }, root);

      cleanups.push(() => ctx.revert());
      window.setTimeout(() => ScrollTrigger.refresh(), 400);
      window.addEventListener("load", () => ScrollTrigger.refresh());
    };

    init();

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      cleanups.forEach((fn) => fn());
      if (lenis) lenis.destroy();
    };
  }, []);

  const openDemo = (slug: string) => {
    const href = `/demo/${slug}`;
    const wipe = wipeRef.current;
    const gsap = gsapRef.current;
    if (wipe && gsap && !prefersReducedMotion()) {
      gsap.set(wipe, { transformOrigin: "bottom", scaleY: 0 });
      gsap.to(wipe, { scaleY: 1, duration: 0.6, ease: "power4.inOut", onComplete: () => router.push(href) });
    } else {
      router.push(href);
    }
  };

  return (
    <div ref={rootRef} className="studio">
      {/* Preloader */}
      <div ref={preloaderRef} className="st-preloader st-display">
        <span className="text-2xl text-[var(--st-cream)]">Lumen<span className="text-[var(--st-yellow)]">.</span></span>
        <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--st-cream)]/50">{microcopy.loader}</span>
      </div>

      {/* Custom cursor */}
      <div ref={cursorRef} className="st-cursor" data-variant="">
        <span ref={labelRef} className="st-cursor-label" />
      </div>
      <div ref={dotRef} className="st-cursor-dot" />

      <div ref={wipeRef} className="st-wipe" />

      <StNav />
      <main>
        <StHero />
        <StMarquee />
        <StServices />
        <StCounters />
        <StCases onOpen={openDemo} />
        <StProcess />
        <StContact />
      </main>
      <StFooter />
    </div>
  );
}
```

---

*End of `code_change7.md` — delta after `code_change6.md`: 2 modified files, 3 new files.*
