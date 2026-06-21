import Link from "next/link";
import type { Business } from "@/data/types";

export function DemoNav({ business }: { business: Business }) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/85 backdrop-blur-md">
      <nav className="container-page flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-brand-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-soft text-xl">
            {business.logoEmoji}
          </span>
          <span className="text-lg">{business.name}</span>
        </div>
        <div className="hidden items-center gap-7 text-sm font-medium text-gray-600 md:flex">
          <a href="#services" className="transition hover:text-brand">Services</a>
          <a href="#features" className="transition hover:text-brand">Features</a>
          <a href="#automations" className="transition hover:text-brand">AI Automation</a>
          <a href="#contact" className="transition hover:text-brand">Contact</a>
        </div>
        <a href="#automations" className="btn-primary !px-5 !py-2.5">
          {business.bookingCtaLabel}
        </a>
      </nav>
    </header>
  );
}

export function DemoBanner({ business }: { business: Business }) {
  return (
    <div className="bg-brand-ink text-center text-xs text-white/90">
      <div className="container-page flex flex-col items-center justify-center gap-1 py-2 sm:flex-row sm:gap-3">
        <span>
          Demo site for <b>{business.niche}</b> by Lumen Studio &mdash; all content is illustrative.
        </span>
        <Link
          href="/"
          className="font-semibold text-white underline-offset-2 hover:underline"
        >
          &larr; Back to portfolio
        </Link>
      </div>
    </div>
  );
}

export function Services({ business }: { business: Business }) {
  return (
    <section id="services" className="container-page py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Services</span>
        <h2 className="mt-4 font-display text-3xl font-bold text-brand-ink sm:text-4xl">
          What we offer
        </h2>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {business.services.map((s) => (
          <div
            key={s.name}
            className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold text-gray-900">{s.name}</h3>
              {typeof s.price === "number" && (
                <span
                  className="flex-none rounded-full px-3 py-1 text-sm font-bold text-brand-fg"
                  style={{ background: business.theme.brand }}
                >
                  {s.price === 0 ? "Free" : `${business.currency}${s.price}`}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FeatureList({ business }: { business: Business }) {
  return (
    <section id="features" className="border-y border-gray-100 bg-gray-50 py-20">
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="eyebrow">Included</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-brand-ink sm:text-4xl">
            Everything your site comes with
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A premium, custom-grade website engineered to win trust and convert visitors into
            customers, fully managed for you.
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {business.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4"
            >
              <span
                className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full text-xs text-brand-fg"
                style={{ background: business.theme.brand }}
              >
                &#10003;
              </span>
              <span className="text-sm font-medium text-gray-700">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AutomationList({ business }: { business: Business }) {
  return (
    <section className="container-page py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">AI Automation</span>
        <h2 className="mt-4 font-display text-3xl font-bold text-brand-ink sm:text-4xl">
          AI workflows tailored to {business.niche.toLowerCase()}
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Practical automations that save time, reduce no-shows, and make your business look
          remarkably professional.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {business.automations.map((a) => (
          <div
            key={a.title}
            className="flex gap-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-xl"
          >
            <div
              className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl text-2xl"
              style={{ background: business.theme.soft }}
            >
              {a.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{a.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{a.description}</p>
              <p
                className="mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: business.theme.soft, color: business.theme.brand }}
              >
                {"\u2192"} {a.benefit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Proof({ business }: { business: Business }) {
  return (
    <section className="container-page py-20">
      <div
        className="relative overflow-hidden rounded-4xl px-8 py-14 text-center sm:px-16"
        style={{ background: business.theme.soft }}
      >
        <div className="mx-auto max-w-3xl">
          <div className="text-2xl">{"\u2B50".repeat(5)}</div>
          <blockquote className="mt-5 font-display text-2xl font-medium leading-relaxed text-brand-ink sm:text-3xl">
            &ldquo;{business.testimonial.quote}&rdquo;
          </blockquote>
          <div className="mt-6 text-sm font-semibold text-gray-700">
            {business.testimonial.author}
          </div>
          <div className="text-sm text-gray-500">{business.testimonial.role}</div>
        </div>
      </div>
    </section>
  );
}

export function DemoContactCta({ business }: { business: Business }) {
  return (
    <section id="contact" className="container-page pb-24">
      <div className="relative overflow-hidden rounded-4xl bg-brand-ink px-8 py-16 text-white sm:px-16">
        <div
          className="absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-40 blur-3xl"
          style={{ background: business.theme.brand }}
          aria-hidden
        />
        <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Ready when you are
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Book online in seconds, or reach out and we&rsquo;ll get right back to you, often
              automatically.
            </p>
            <div className="mt-8">
              <a
                href="#automations"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-ink transition hover:-translate-y-0.5"
              >
                {business.bookingCtaLabel}
              </a>
            </div>
          </div>
          <div className="space-y-3 rounded-3xl bg-white/10 p-6 backdrop-blur">
            <ContactRow label="Call" value={business.contact.phone} />
            <ContactRow label="Visit" value={business.contact.address} />
            <ContactRow label="Hours" value={business.contact.hours} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0">
      <span className="text-xs font-semibold uppercase tracking-wide text-white/60">{label}</span>
      <span className="text-right text-sm font-medium text-white">{value}</span>
    </div>
  );
}

export function DemoFooter({ business }: { business: Business }) {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="container-page flex flex-col items-center justify-between gap-4 py-8 text-sm text-gray-500 sm:flex-row">
        <div className="flex items-center gap-2 font-semibold text-brand-ink">
          <span className="text-xl">{business.logoEmoji}</span>
          {business.name}
        </div>
        <p>
          {business.contact.phone} &middot; {business.contact.address}
        </p>
        <Link href="/" className="font-semibold text-brand hover:underline">
          Built by Lumen Studio
        </Link>
      </div>
    </footer>
  );
}
