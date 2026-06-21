import Link from "next/link";
import { businesses } from "@/data/businesses";
import { NicheCard } from "@/components/portfolio/NicheCard";

const capabilities = [
  {
    icon: "\u{1F4F2}",
    title: "Booking \u2192 WhatsApp / SMS",
    body: "Customers book online and instantly receive a branded confirmation on WhatsApp or SMS, complete with date, time, and a map link.",
  },
  {
    icon: "\u{1F9FE}",
    title: "Automated receipts & invoices",
    body: "Every order or visit generates a clean, itemized receipt or invoice, emailed and texted automatically. No more paperwork.",
  },
  {
    icon: "\u{1F5C2}\uFE0F",
    title: "AI CRM pipelines",
    body: "Leads and appointments flow into a visual pipeline so nothing slips. Follow-ups, reminders, and recalls happen on autopilot.",
  },
  {
    icon: "\u23F0",
    title: "Smart reminders",
    body: "Cut no-shows with automatic reminders before every appointment, plus recalls that bring past customers back.",
  },
  {
    icon: "\u2B50",
    title: "Review & referral engines",
    body: "Happy customers get a perfectly-timed, one-tap request for a 5-star review, building your reputation while you sleep.",
  },
  {
    icon: "\u{1F4B3}",
    title: "Payments & deposits",
    body: "Collect deposits and payments online to lock in bookings and reduce cancellations, all tied into your site.",
  },
];

const steps = [
  {
    n: "01",
    title: "Discovery",
    body: "We map your services, customers, and the busywork eating your day.",
  },
  {
    n: "02",
    title: "Design & build",
    body: "I craft a premium, custom website that looks like a $2,000+ build.",
  },
  {
    n: "03",
    title: "Automate",
    body: "I wire in the AI workflows: bookings, receipts, CRM, and reminders.",
  },
  {
    n: "04",
    title: "Launch & grow",
    body: "Go live with analytics, SEO, and automations that keep working 24/7.",
  },
];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <nav className="container-page flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-gray-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-fg">
              L
            </span>
            <span className="text-lg">Lumen Studio</span>
          </Link>
          <div className="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
            <a href="#work" className="transition hover:text-brand">Work</a>
            <a href="#capabilities" className="transition hover:text-brand">What I build</a>
            <a href="#process" className="transition hover:text-brand">Process</a>
            <a href="#contact" className="transition hover:text-brand">Contact</a>
          </div>
          <a href="#contact" className="btn-primary !px-5 !py-2.5">
            Book a call
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
        <div
          className="absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-brand/20 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -left-24 top-40 h-[360px] w-[360px] rounded-full bg-brand-accent/20 blur-3xl"
          aria-hidden
        />
        <div className="container-page relative grid gap-12 py-20 md:grid-cols-2 md:py-28 lg:items-center">
          <div className="animate-fade-up">
            <span className="eyebrow">Websites + AI automation for local business</span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Get your business online and let{" "}
              <span className="text-brand">AI run the busywork.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
              I design premium websites for local businesses and wire in practical AI
              automations: online booking with instant WhatsApp confirmations, auto-generated
              receipts, and CRM pipelines that follow up for you.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#work" className="btn-primary">
                Explore live demos
              </a>
              <a href="#contact" className="btn-ghost">
                Book a free call
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              {[
                { v: `${businesses.length}`, l: "Industry demos" },
                { v: "$2k+", l: "Webflow-grade builds" },
                { v: "24/7", l: "Automations running" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl font-bold text-gray-900">{s.v}</div>
                  <div className="text-sm text-gray-500">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero preview card */}
          <div className="relative animate-fade-up [animation-delay:120ms]">
            <div className="rounded-4xl border border-gray-100 bg-white p-5 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs text-gray-400">yourbusiness.com</span>
              </div>
              <div className="space-y-4 py-5">
                <div className="rounded-2xl bg-brand-soft p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-brand">
                    New booking
                  </div>
                  <div className="mt-1 font-semibold text-gray-900">
                    Sarah booked &ldquo;Full Groom&rdquo; for Sat 2:00 PM
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-[#25D366] px-4 py-2.5 text-sm text-white shadow">
                    Hi Sarah! Your appointment is confirmed for Sat 2:00 PM. Reply C to cancel.
                    <div className="mt-1 text-[10px] text-white/80">via WhatsApp &middot; sent automatically</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {["Booked", "Confirmed", "Reminded"].map((t, i) => (
                    <div
                      key={t}
                      className={`rounded-xl border p-2 ${i < 2 ? "border-brand/30 bg-brand-soft text-brand" : "border-gray-200 text-gray-400"}`}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / value prop */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-gray-900">
              Most owners don&rsquo;t know what AI can do for them.
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              That&rsquo;s the gap I close. Each demo below shows a real, custom-grade website with
              working automations built in, so you can <em>experience</em> exactly how AI makes
              your business look more professional and run itself.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              "Stop losing customers to phone tag",
              "Look as polished as a national brand",
              "Cut no-shows with automatic reminders",
              "Never lose a lead in your inbox again",
            ].map((t) => (
              <li key={t} className="card flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand text-xs text-brand-fg">
                  &#10003;
                </span>
                <span className="text-sm font-medium text-gray-700">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Work / niche grid */}
      <section id="work" className="container-page py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">The portfolio</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
            {businesses.length} industries. {businesses.length} live demos.
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Click any card to open a fully-built demo site with interactive AI automations you can
            try right now.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map((b) => (
            <NicheCard key={b.slug} business={b} />
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="border-y border-gray-100 bg-gray-50 py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">What I build</span>
            <h2 className="mt-4 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              AI automations that work while you don&rsquo;t
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.title} className="card hover:-translate-y-1 hover:shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-2xl">
                  {c.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="container-page py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How it works</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
            From idea to automated in 4 steps
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-3xl border border-gray-100 bg-white p-6">
              <div className="text-4xl font-black text-brand/20">{s.n}</div>
              <h3 className="mt-2 text-lg font-bold text-gray-900">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="container-page pb-24">
        <div className="relative overflow-hidden rounded-4xl bg-brand-ink px-8 py-16 text-center text-white sm:px-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand/40 blur-3xl" aria-hidden />
          <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-brand-accent/40 blur-3xl" aria-hidden />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Ready to put your business online and on autopilot?
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Book a free 20-minute call. I&rsquo;ll show you exactly which automations will move the
              needle for your business and what your custom site could look like.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:hello@lumenstudio.example?subject=Website%20%2B%20AI%20automation"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-ink transition hover:-translate-y-0.5"
              >
                Book a free call
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Browse the demos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-8 text-sm text-gray-500 sm:flex-row">
          <div className="flex items-center gap-2 font-semibold text-gray-700">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-brand-fg">
              L
            </span>
            Lumen Studio
          </div>
          <p>Premium websites + AI automation for local business.</p>
          <p>&copy; {new Date().getFullYear()} Lumen Studio. Demo content.</p>
        </div>
      </footer>
    </main>
  );
}
