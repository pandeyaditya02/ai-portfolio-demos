import type { Business } from "@/data/types";

function HeroStats({ business }: { business: Business }) {
  return (
    <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
      {business.stats.map((s) => (
        <div key={s.label}>
          <div className="font-display text-3xl font-bold text-brand-ink">{s.value}</div>
          <div className="text-sm text-gray-500">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function HeroButtons({ business }: { business: Business }) {
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <a href="#automations" className="btn-primary">
        {business.bookingCtaLabel}
      </a>
      <a href="#services" className="btn-ghost">
        View services
      </a>
    </div>
  );
}

/** Decorative themed panel used in split/editorial layouts. */
function HeroPanel({ business }: { business: Business }) {
  return (
    <div className="relative">
      <div
        className="aspect-[4/5] w-full rounded-4xl shadow-2xl"
        style={{
          background: `linear-gradient(140deg, ${business.theme.brand}, ${business.theme.accent})`,
        }}
      >
        <div className="bg-grid absolute inset-0 rounded-4xl opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center text-[120px] opacity-90 drop-shadow-lg">
          {business.logoEmoji}
        </div>
      </div>
      {/* floating cards */}
      <div className="absolute -bottom-6 -left-6 w-48 rounded-2xl bg-white p-4 shadow-xl">
        <div className="text-xs font-semibold uppercase tracking-wide text-brand">
          Automated
        </div>
        <div className="mt-1 text-sm font-semibold text-gray-900">
          {business.contact.hours}
        </div>
      </div>
      <div className="absolute -right-4 top-8 rounded-2xl bg-white px-4 py-3 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="text-lg">{"\u2B50".repeat(5)}</span>
        </div>
        <div className="mt-0.5 text-xs text-gray-500">Loved by locals</div>
      </div>
    </div>
  );
}

export function DemoHero({ business }: { business: Business }) {
  const layout = business.demoLayout;

  if (layout === "centered") {
    return (
      <section className="relative overflow-hidden bg-white">
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: business.theme.brand }}
          aria-hidden
        />
        <div className="container-page relative py-20 text-center md:py-28">
          <span className="eyebrow animate-fade-up">{business.niche}</span>
          <h1 className="mx-auto mt-5 max-w-3xl animate-fade-up font-display text-4xl font-bold leading-tight text-brand-ink sm:text-5xl lg:text-6xl">
            {business.tagline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-gray-600 [animation-delay:80ms]">
            {business.heroSubtitle}
          </p>
          <div className="flex flex-col items-center">
            <HeroButtons business={business} />
            <div className="flex justify-center">
              <HeroStats business={business} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (layout === "editorial") {
    return (
      <section className="relative overflow-hidden bg-white">
        <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:items-center md:py-24">
          <div className="md:col-span-7">
            <span className="eyebrow animate-fade-up">{business.niche}</span>
            <h1 className="mt-5 animate-fade-up font-display text-5xl font-bold leading-[1.05] text-brand-ink sm:text-6xl lg:text-7xl">
              {business.tagline}
            </h1>
            <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-gray-600 [animation-delay:80ms]">
              {business.heroSubtitle}
            </p>
            <HeroButtons business={business} />
            <HeroStats business={business} />
          </div>
          <div className="animate-fade-up md:col-span-5 [animation-delay:120ms]">
            <HeroPanel business={business} />
          </div>
        </div>
      </section>
    );
  }

  // split (default)
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <span className="eyebrow animate-fade-up">{business.niche}</span>
          <h1 className="mt-5 animate-fade-up font-display text-4xl font-bold leading-tight text-brand-ink sm:text-5xl lg:text-6xl">
            {business.tagline}
          </h1>
          <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-gray-600 [animation-delay:80ms]">
            {business.heroSubtitle}
          </p>
          <HeroButtons business={business} />
          <HeroStats business={business} />
        </div>
        <div className="animate-fade-up [animation-delay:120ms]">
          <HeroPanel business={business} />
        </div>
      </div>
    </section>
  );
}
