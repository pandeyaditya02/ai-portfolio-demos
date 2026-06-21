"use client";

import { gallery, marqueeWords, services, stats, storyLines } from "./data";
import { PawsomeBooking } from "./PawsomeBooking";

/* -------------------------------------------------------------------------- */
/*  Shared helpers                                                            */
/* -------------------------------------------------------------------------- */

/** SVG displacement filter used by the gallery image-distortion effect. */
export function PwSvgDefs() {
  return (
    <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <filter id="pw-displace">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.014"
            numOctaves={2}
            seed={7}
            result="noise"
          />
          <feDisplacementMap
            id="pw-displace-map"
            in="SourceGraphic"
            in2="noise"
            scale={0}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

function DistortImage({ item }: { item: (typeof gallery)[number] }) {
  return (
    <div className="pw-distort group relative h-full w-full overflow-hidden rounded-[28px]">
      <div
        className="pw-img-fallback"
        style={{
          background: `linear-gradient(140deg, var(--pw-teal-deep), var(--pw-ink))`,
        }}
      >
        <span>{item.emoji}</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.opacity = "0";
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

export function PwNav({ onBack }: { onBack: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-[70] mix-blend-difference">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 sm:px-10">
        <button
          type="button"
          onClick={onBack}
          data-magnetic
          className="text-sm font-semibold tracking-tight text-white"
        >
          &larr; Lumen Studio
        </button>
        <div className="pw-display text-lg tracking-tight text-white">PAWSOME&deg;</div>
        <a href="#book" data-magnetic className="hidden text-sm font-semibold text-white sm:block">
          Book now
        </a>
      </nav>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

export function PwHero() {
  const letters = "PAWSOME".split("");
  return (
    <section className="pw-hero relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 sm:px-10">
      <div
        className="pw-blob"
        data-parallax
        data-speed="0.4"
        style={{ width: 560, height: 560, top: "-10%", left: "-8%", background: "var(--pw-teal)" }}
      />
      <div
        className="pw-blob"
        data-parallax
        data-speed="0.25"
        style={{ width: 480, height: 480, bottom: "-12%", right: "-6%", background: "var(--pw-pink)" }}
      />
      <div
        className="pw-blob"
        style={{ width: 360, height: 360, top: "30%", right: "20%", background: "var(--pw-amber)", opacity: 0.3 }}
      />

      <div className="relative mx-auto w-full max-w-[1600px]">
        <p className="pw-hero-sub mb-6 max-w-md text-sm uppercase tracking-[0.25em] text-[var(--pw-cream)]/60">
          San Francisco &middot; Pet grooming &amp; spa
        </p>
        <h1 className="pw-display pw-h-mega text-[var(--pw-cream)]" aria-label="Pawsome">
          {letters.map((l, i) => (
            <span key={i} className="pw-hero-letter inline-block">
              {l}
            </span>
          ))}
        </h1>
        <div className="mt-8 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <p className="pw-hero-sub max-w-md text-lg leading-relaxed text-[var(--pw-cream)]/70">
            A grooming studio that books in seconds, pampers for hours, and texts
            you the moment your best friend is ready.
          </p>
          <a href="#book" data-magnetic className="pw-cta pw-hero-sub">
            Book a session
            <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </div>

      {/* floating glass cards */}
      <div className="pw-glass pw-hero-sub absolute right-[6%] top-[22%] hidden w-56 rounded-2xl p-4 lg:block">
        <div className="text-[10px] uppercase tracking-widest text-[var(--pw-amber)]">New booking</div>
        <div className="mt-1 text-sm font-semibold text-[var(--pw-cream)]">
          Bailey &mdash; Full Groom, Sat 2:00 PM
        </div>
        <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-[var(--pw-cream)]/60">
          <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" /> Confirmed on WhatsApp
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-[var(--pw-cream)]/40">
        Scroll
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Marquee                                                                   */
/* -------------------------------------------------------------------------- */

export function PwMarquee() {
  const row = [...marqueeWords, ...marqueeWords];
  return (
    <section className="border-y border-white/10 py-7" aria-hidden>
      <div className="pw-marquee">
        {row.map((w, i) => (
          <span key={i} className="pw-display flex items-center text-5xl text-[var(--pw-cream)]/85 sm:text-7xl">
            <span className="px-8">{w}</span>
            <span className="text-[var(--pw-amber)]">&bull;</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Story (masked line reveal)                                                */
/* -------------------------------------------------------------------------- */

export function PwStory() {
  return (
    <section className="px-6 py-32 sm:px-10 sm:py-44">
      <div className="mx-auto max-w-5xl" data-lines>
        <h2 className="pw-display text-balance text-4xl text-[var(--pw-cream)] sm:text-6xl md:text-7xl">
          {storyLines.map((line, i) => (
            <span key={i} className="pw-line-mask">
              <span className="pw-line">{line}</span>
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Services (sticky index + reveal list)                                     */
/* -------------------------------------------------------------------------- */

export function PwServices() {
  return (
    <section id="services" className="px-6 py-24 sm:px-10">
      <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--pw-amber)]">What we do</p>
          <h2 className="pw-display pw-h-xl mt-4 text-[var(--pw-cream)]">
            The menu of
            <br />
            <span className="pw-serif italic text-[var(--pw-teal)]">good boys.</span>
          </h2>
          <p className="mt-6 max-w-sm text-[var(--pw-cream)]/60">
            Every service ends the same way: a happy pup and an instant, itemized
            receipt in your inbox.
          </p>
        </div>

        <div className="divide-y divide-white/10 border-t border-white/10">
          {services.map((s) => (
            <article
              key={s.no}
              data-reveal
              className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-5 py-8 transition-colors hover:bg-white/[0.03] sm:gap-8 sm:py-10"
            >
              <span className="pw-display text-xl text-[var(--pw-cream)]/30">{s.no}</span>
              <div>
                <h3 className="pw-display text-3xl text-[var(--pw-cream)] sm:text-5xl">{s.name}</h3>
                <p className="mt-3 max-w-md text-sm text-[var(--pw-cream)]/60">{s.desc}</p>
              </div>
              <span className="pw-serif text-2xl text-[var(--pw-amber)] sm:text-4xl">{s.price}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Horizontal gallery (pinned)                                               */
/* -------------------------------------------------------------------------- */

export function PwGallery() {
  return (
    <section id="gallery" className="pw-gallery relative flex h-[100svh] flex-col overflow-hidden">
      <div className="px-6 pb-4 pt-24 sm:px-10">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--pw-amber)]">The gallery</p>
        <h2 className="pw-display pw-h-xl mt-2 text-[var(--pw-cream)]">Glow ups</h2>
      </div>
      <div className="flex flex-1 items-center pb-10">
        <div className="pw-h-track h-[56vh]">
          {gallery.map((item, i) => (
            <figure
              key={item.title}
              className="relative h-full w-[78vw] flex-none sm:w-[46vw] lg:w-[34vw]"
              data-distort-card
            >
              <DistortImage item={item} />
              <figcaption className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--pw-amber)]">
                    {item.tag}
                  </div>
                  <div className="pw-display text-2xl text-white sm:text-3xl">{item.title}</div>
                </div>
                <span className="pw-serif text-white/40">0{i + 1}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stats (counters)                                                          */
/* -------------------------------------------------------------------------- */

export function PwStats() {
  return (
    <section className="border-y border-white/10 px-6 py-24 sm:px-10">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-y-12 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} data-reveal className="text-center">
            <div
              className="pw-display pw-counter text-5xl text-[var(--pw-cream)] sm:text-7xl"
              data-value={s.value}
              data-decimals={s.decimals ?? 0}
              data-suffix={s.suffix}
            >
              0{s.suffix}
            </div>
            <div className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--pw-cream)]/50">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const pwAutomationIdeas = [
  {
    icon: "\u{1F415}",
    title: "Breed-aware grooming recommender",
    desc: "Suggests the right service and price from breed, coat, and a quick photo at booking time.",
  },
  {
    icon: "\u{1F4F7}",
    title: "Coat & skin pre-screening",
    desc: "AI reviews uploaded photos to flag mats, hot spots, or skin issues before the appointment.",
  },
  {
    icon: "\u{1F501}",
    title: "Smart rebooking cadence",
    desc: "Predicts each pet's ideal next-groom date and sends a one-tap rebook invite at just the right time.",
  },
];

export function PwAutomationIdeas() {
  return (
    <section className="px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mx-auto max-w-2xl text-center" data-reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--pw-amber)]">More AI on the way</p>
          <h2 className="pw-display pw-h-xl mt-4 text-[var(--pw-cream)]">
            Automations we can
            <br />
            <span className="pw-serif italic text-[var(--pw-teal)]">wire in next.</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {pwAutomationIdeas.map((a) => (
            <div
              key={a.title}
              data-reveal
              className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7 transition-colors hover:bg-white/[0.06]"
            >
              <div className="text-3xl">{a.icon}</div>
              <h3 className="pw-display mt-5 text-2xl text-[var(--pw-cream)]">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--pw-cream)]/60">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Automation (interactive AI demo)                                          */
/* -------------------------------------------------------------------------- */

export function PwAutomation() {
  return (
    <section id="book" className="relative px-6 py-28 sm:px-10">
      <div
        className="pw-blob"
        style={{ width: 500, height: 500, top: "10%", left: "10%", background: "var(--pw-teal)", opacity: 0.25 }}
      />
      <div className="relative mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-2xl text-center" data-reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--pw-amber)]">AI automation, built in</p>
          <h2 className="pw-display pw-h-xl mt-4 text-[var(--pw-cream)]">
            Book it. We&rsquo;ll text you.
          </h2>
          <p className="mt-5 text-[var(--pw-cream)]/60">
            This is a working demo. Confirm a booking and watch the automated
            WhatsApp confirmation fire in real time, exactly what your customers feel.
          </p>
        </div>
        <div className="mt-14" data-reveal>
          <PawsomeBooking />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Testimonial                                                               */
/* -------------------------------------------------------------------------- */

export function PwTestimonial() {
  return (
    <section className="px-6 py-32 sm:px-10 sm:py-44">
      <figure className="mx-auto max-w-5xl text-center" data-lines>
        <div className="text-3xl text-[var(--pw-amber)]">{"\u2605\u2605\u2605\u2605\u2605"}</div>
        <blockquote className="pw-display mt-8 text-balance text-3xl leading-tight text-[var(--pw-cream)] sm:text-5xl md:text-6xl">
          <span className="pw-line-mask">
            <span className="pw-line">&ldquo;Bookings doubled and we stopped</span>
          </span>
          <span className="pw-line-mask">
            <span className="pw-line">chasing people on the phone.&rdquo;</span>
          </span>
        </blockquote>
        <figcaption className="mt-10 text-sm uppercase tracking-[0.2em] text-[var(--pw-cream)]/50">
          Dana Wells &mdash; Owner, Pawsome Grooming Co.
        </figcaption>
      </figure>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  CTA + Footer                                                              */
/* -------------------------------------------------------------------------- */

export function PwCta({ onBack }: { onBack: () => void }) {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-24 sm:px-10">
      <div className="mx-auto max-w-[1600px]">
        <h2 className="pw-display text-center text-[clamp(2.6rem,11vw,11rem)] leading-[0.9] text-[var(--pw-cream)]">
          Let&rsquo;s get
          <br />
          <span className="pw-serif italic text-[var(--pw-teal)]">pampering.</span>
        </h2>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a href="#book" data-magnetic className="pw-cta text-base">
            Book a session <span aria-hidden>&rarr;</span>
          </a>
          <button type="button" onClick={onBack} data-magnetic className="pw-cta pw-cta--ghost text-base">
            Back to portfolio
          </button>
        </div>
      </div>

      <footer className="mx-auto mt-24 flex max-w-[1600px] flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[var(--pw-cream)]/45 sm:flex-row">
        <span>Pawsome Grooming Co. &middot; (415) 555-0142</span>
        <span>Demo experience designed &amp; built by Lumen Studio</span>
        <span>&copy; {new Date().getFullYear()}</span>
      </footer>
    </section>
  );
}
