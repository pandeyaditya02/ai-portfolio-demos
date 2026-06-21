"use client";

import { useState } from "react";
import { businesses } from "@/data/businesses";
import type { Business } from "@/data/types";
import { automationCapabilities, featuredSlugs, marqueeWords, microcopy, process, services, statement } from "./data";

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
          <a href="#automations" data-magnetic className="transition hover:opacity-60">Automations</a>
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

export function StAutomations() {
  return (
    <section id="automations" className="border-t-2 border-[var(--st-ink)] px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="st-display st-h-xl text-[var(--st-ink)]">
            AI automations<span className="text-[var(--st-yellow)]">.</span>
          </h2>
          <p className="max-w-sm text-[var(--st-ink)]/60">
            Workflows that work for every kind of business, running 24/7 so you don&rsquo;t have to.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {automationCapabilities.map((a) => (
            <div
              key={a.title}
              data-reveal
              className="rounded-3xl border-2 border-[var(--st-ink)] p-7 transition duration-300 hover:bg-[var(--st-yellow)]"
            >
              <div className="text-3xl">{a.icon}</div>
              <h3 className="st-display mt-4 text-2xl text-[var(--st-ink)]">{a.title}</h3>
              <p className="mt-3 text-sm text-[var(--st-ink)]/70">{a.desc}</p>
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
    { value: featuredSlugs.length, suffix: "", label: "Awwwards-grade builds" },
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
            <a href="#automations" data-magnetic className="hover:text-[var(--st-cream)]">Automations</a>
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
