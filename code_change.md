# Code Change — AI Portfolio + Demo Sites

A Next.js 14 + TypeScript + Tailwind CSS portfolio (`Lumen Studio`) with a hub page that links to 15 individually-themed demo websites, each with interactive (simulated) AI automations: booking → WhatsApp/SMS confirmation, auto-generated receipts, and a CRM pipeline.

## How to run

```bash
npm install
npm run dev      # http://localhost:3000
```

Demos live at `/demo/<slug>`, e.g. `/demo/pet-care`, `/demo/dentist`, `/demo/bakery`.

## Directory structure

```
design-template/
├── .eslintrc.json
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx                     # Portfolio hub
│   └── demo/
│       └── [slug]/
│           └── page.tsx             # Dynamic demo site (1 route → 15 demos)
├── components/
│   ├── automations/
│   │   ├── BookingForm.tsx          # Booking → WhatsApp/SMS confirmation mock
│   │   ├── CRMInbox.tsx             # CRM pipeline mock
│   │   └── ReceiptGenerator.tsx     # Auto receipt/invoice mock
│   ├── demo/
│   │   ├── AutomationShowcase.tsx   # Tabbed wrapper for the mocks
│   │   ├── DemoHero.tsx             # 3 themeable hero layout variants
│   │   └── DemoSections.tsx         # Nav, services, features, automations, proof, footer
│   └── portfolio/
│       └── NicheCard.tsx            # Hub grid card
├── data/
│   ├── businesses.ts                # All 15 niches (single source of truth)
│   └── types.ts                     # Shared types
└── lib/
    └── theme.ts                     # Per-business theming via CSS variables
```

---

## `package.json`

```json
{
  "name": "ai-portfolio-demos",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/node": "^20.14.12",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.5",
    "postcss": "^8.4.40",
    "tailwindcss": "^3.4.7",
    "typescript": "^5.5.4"
  }
}
```

## `tsconfig.json`

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## `next.config.mjs`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
    ],
  },
};

export default nextConfig;
```

## `postcss.config.mjs`

```js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

## `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Driven per-business via CSS variables (see lib/theme.ts).
        brand: {
          DEFAULT: "rgb(var(--brand) / <alpha-value>)",
          fg: "rgb(var(--brand-fg) / <alpha-value>)",
          soft: "rgb(var(--brand-soft) / <alpha-value>)",
          accent: "rgb(var(--brand-accent) / <alpha-value>)",
          ink: "rgb(var(--brand-ink) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
```

## `.eslintrc.json`

```json
{
  "extends": "next/core-web-vitals"
}
```

## `.gitignore`

```
# dependencies
/node_modules
/.pnp
.pnp.js

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# typescript
*.tsbuildinfo
next-env.d.ts
```

## `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Default (portfolio) brand palette. Demo pages override these. */
  --brand: 99 102 241; /* indigo-500 */
  --brand-fg: 255 255 255;
  --brand-soft: 238 242 255;
  --brand-accent: 16 185 129; /* emerald-500 */
  --brand-ink: 17 24 39; /* gray-900 */

  --font-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Fraunces", ui-serif, Georgia, serif;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-white text-gray-900 antialiased;
  font-family: var(--font-sans);
}

@layer components {
  .container-page {
    @apply mx-auto w-full max-w-7xl px-5 sm:px-8;
  }

  .btn-primary {
    @apply inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-fg shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/30 focus:outline-none focus:ring-4 focus:ring-brand/30;
  }

  .btn-ghost {
    @apply inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-brand hover:text-brand;
  }

  .eyebrow {
    @apply inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand;
  }

  .card {
    @apply rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition;
  }

  .input {
    @apply w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-brand focus:ring-4 focus:ring-brand/15;
  }
}

/* Subtle dotted/grid background helper */
.bg-grid {
  background-image: radial-gradient(rgb(0 0 0 / 0.06) 1px, transparent 1px);
  background-size: 22px 22px;
}

.text-balance {
  text-wrap: balance;
}

/* Custom scrollbar for mock chat windows */
.scroll-thin::-webkit-scrollbar {
  width: 6px;
}
.scroll-thin::-webkit-scrollbar-thumb {
  background: rgb(0 0 0 / 0.15);
  border-radius: 9999px;
}
```

## `app/layout.tsx`

```tsx
import type { Metadata } from "next";
import "./globals.css";

const GOOGLE_FONTS = [
  "Inter:wght@400;500;600;700;800",
  "Manrope:wght@400;500;600;700;800",
  "Plus+Jakarta+Sans:wght@400;500;600;700;800",
  "Sora:wght@400;500;600;700;800",
  "Poppins:wght@400;500;600;700;800",
  "Outfit:wght@400;500;600;700;800",
  "Space+Grotesk:wght@400;500;600;700",
  "Archivo:wght@400;500;600;700;800",
  "Nunito:wght@400;500;600;700;800",
  "Playfair+Display:wght@400;500;600;700;800",
  "Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700",
  "DM+Serif+Display",
  "Cormorant+Garamond:wght@400;500;600;700",
  "Lora:wght@400;500;600;700",
];

const fontsHref = `https://fonts.googleapis.com/css2?${GOOGLE_FONTS.map(
  (f) => `family=${f}`,
).join("&")}&display=swap`;

export const metadata: Metadata = {
  title: {
    default: "Lumen Studio — Websites + AI Automation for Local Business",
    template: "%s — Lumen Studio",
  },
  description:
    "I build premium websites and practical AI automations for local businesses: online booking, automated WhatsApp confirmations, instant receipts, and CRM pipelines that run themselves.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={fontsHref} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## `app/page.tsx` (Portfolio hub)

```tsx
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
```

## `app/not-found.tsx`

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <div className="text-6xl">{"\u{1F50D}"}</div>
      <h1 className="mt-6 font-display text-4xl font-bold text-gray-900">Page not found</h1>
      <p className="mt-3 max-w-md text-gray-600">
        The demo you&rsquo;re looking for doesn&rsquo;t exist. Head back to the portfolio to explore
        all the live demos.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to portfolio
      </Link>
    </main>
  );
}
```

## `app/demo/[slug]/page.tsx` (Dynamic demo site)

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { businesses, getBusiness } from "@/data/businesses";
import { themeToStyle } from "@/lib/theme";
import { DemoHero } from "@/components/demo/DemoHero";
import { AutomationShowcase } from "@/components/demo/AutomationShowcase";
import {
  AutomationList,
  DemoBanner,
  DemoContactCta,
  DemoFooter,
  DemoNav,
  FeatureList,
  Proof,
  Services,
} from "@/components/demo/DemoSections";

export function generateStaticParams() {
  return businesses.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const business = getBusiness(params.slug);
  if (!business) return { title: "Demo not found" };
  return {
    title: `${business.name} — ${business.niche} demo`,
    description: business.heroSubtitle,
  };
}

export default function DemoPage({ params }: { params: { slug: string } }) {
  const business = getBusiness(params.slug);
  if (!business) notFound();

  return (
    <div style={themeToStyle(business.theme)} className="bg-white font-sans text-gray-900">
      <DemoBanner business={business} />
      <DemoNav business={business} />
      <main>
        <DemoHero business={business} />
        <Services business={business} />
        <FeatureList business={business} />
        <AutomationList business={business} />
        <AutomationShowcase business={business} />
        <Proof business={business} />
        <DemoContactCta business={business} />
      </main>
      <DemoFooter business={business} />
    </div>
  );
}
```

## `lib/theme.ts`

```ts
import type { CSSProperties } from "react";

export type BusinessTheme = {
  /** Primary brand color (hex). */
  brand: string;
  /** Foreground color used on top of the brand color (hex). */
  brandFg: string;
  /** Very light tint of the brand, for soft backgrounds (hex). */
  soft: string;
  /** Secondary accent color (hex). */
  accent: string;
  /** Deep ink color for headings (hex). */
  ink: string;
  /** Google Font family name for display/headings. */
  displayFont?: string;
  /** Google Font family name for body copy. */
  sansFont?: string;
};

function hexToRgbTriplet(hex: string): string {
  const clean = hex.replace("#", "").trim();
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const num = parseInt(full, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `${r} ${g} ${b}`;
}

/**
 * Build an inline style object that sets the CSS variables consumed by
 * Tailwind (see tailwind.config.ts + globals.css). Apply it to a wrapper
 * element so an entire demo subtree is themed for a specific business.
 */
export function themeToStyle(theme: BusinessTheme): CSSProperties {
  const vars: Record<string, string> = {
    "--brand": hexToRgbTriplet(theme.brand),
    "--brand-fg": hexToRgbTriplet(theme.brandFg),
    "--brand-soft": hexToRgbTriplet(theme.soft),
    "--brand-accent": hexToRgbTriplet(theme.accent),
    "--brand-ink": hexToRgbTriplet(theme.ink),
  };
  if (theme.sansFont) vars["--font-sans"] = `"${theme.sansFont}", ui-sans-serif, system-ui, sans-serif`;
  if (theme.displayFont) vars["--font-display"] = `"${theme.displayFont}", ui-serif, Georgia, serif`;
  return vars as CSSProperties;
}
```

## `data/types.ts`

```ts
import type { BusinessTheme } from "@/lib/theme";

/** Which interactive mock automation to render inside a demo site. */
export type AutomationKind = "booking" | "receipt" | "crm";

/** A described AI automation capability shown in the "what I can build" list. */
export type AutomationInfo = {
  title: string;
  /** What the automation actually does. */
  description: string;
  /** The concrete business benefit. */
  benefit: string;
  icon: string;
};

export type ServiceItem = {
  name: string;
  description: string;
  /** Price in whole dollars (used for receipt mock + service cards). */
  price?: number;
};

export type DemoLayout = "split" | "centered" | "editorial";

export type CrmLead = {
  name: string;
  detail: string;
  value: string;
  channel: "WhatsApp" | "SMS" | "Email" | "Web form" | "Phone";
};

export type Business = {
  slug: string;
  /** Fictional demo business name, e.g. "Pawsome Grooming Co." */
  name: string;
  /** Human niche label, e.g. "Pet Care & Grooming". */
  niche: string;
  /** Short emoji used as a logo mark. */
  logoEmoji: string;
  /** One-line value proposition shown in the hero. */
  tagline: string;
  /** Supporting hero paragraph. */
  heroSubtitle: string;
  /** Short marketing blurb used on the portfolio grid card. */
  cardSummary: string;
  theme: BusinessTheme;
  demoLayout: DemoLayout;
  services: ServiceItem[];
  /** Website features delivered to the business. */
  features: string[];
  /** AI automations applicable to this niche. */
  automations: AutomationInfo[];
  /** Which interactive mock automations to render (in order). */
  demoAutomations: AutomationKind[];
  /** Label for the booking service select in the booking mock. */
  bookingChannel: "WhatsApp" | "SMS";
  bookingCtaLabel: string;
  /** CRM pipeline configuration for the CRM mock. */
  crmStages: string[];
  crmLeads: CrmLead[];
  /** Currency symbol for receipts. */
  currency: string;
  testimonial: { quote: string; author: string; role: string };
  stats: { label: string; value: string }[];
  contact: { phone: string; address: string; hours: string };
};
```

## `components/portfolio/NicheCard.tsx`

```tsx
import Link from "next/link";
import type { Business } from "@/data/types";

const KIND_LABEL: Record<string, string> = {
  booking: "Booking + WhatsApp",
  receipt: "Auto receipts",
  crm: "CRM pipeline",
};

export function NicheCard({ business }: { business: Business }) {
  const { theme } = business;
  return (
    <Link
      href={`/demo/${business.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
        style={{ background: theme.brand }}
      />
      <div className="mb-5 flex items-center justify-between">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl shadow-inner"
          style={{ background: theme.soft }}
        >
          {business.logoEmoji}
        </span>
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{ background: theme.soft, color: theme.brand }}
        >
          {business.niche}
        </span>
      </div>

      <h3 className="text-xl font-bold text-gray-900">{business.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
        {business.cardSummary}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {business.demoAutomations.map((kind) => (
          <span
            key={kind}
            className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold"
            style={{ borderColor: `${theme.brand}33`, color: theme.ink }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: theme.accent }}
            />
            {KIND_LABEL[kind] ?? kind}
          </span>
        ))}
      </div>

      <div
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
        style={{ color: theme.brand }}
      >
        View live demo
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          &rarr;
        </span>
      </div>
    </Link>
  );
}
```

## `components/automations/BookingForm.tsx`

```tsx
"use client";

import { useState } from "react";
import type { Business } from "@/data/types";

type Status = "idle" | "sending" | "typing" | "sent";

export function BookingForm({ business }: { business: Business }) {
  const isWhatsApp = business.bookingChannel === "WhatsApp";
  const [name, setName] = useState("");
  const [service, setService] = useState(business.services[0]?.name ?? "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const canSubmit = name.trim() && service && date && time && status === "idle";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("sending");
    setTimeout(() => setStatus("typing"), 700);
    setTimeout(() => setStatus("sent"), 2000);
  }

  function reset() {
    setStatus("idle");
    setName("");
    setDate("");
    setTime("");
    setService(business.services[0]?.name ?? "");
  }

  const firstName = name.trim().split(" ")[0] || "there";
  const prettyDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* The form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        <h4 className="text-lg font-bold text-gray-900">{business.bookingCtaLabel}</h4>
        <p className="mt-1 text-sm text-gray-500">
          Fill this in and watch the automated confirmation fire.
        </p>

        <div className="mt-5 space-y-4">
          <Field label="Your name">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jordan Smith"
              className="input"
            />
          </Field>

          <Field label="Service">
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="input"
            >
              {business.services.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Date">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Time">
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="input"
              />
            </Field>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "idle" ? business.bookingCtaLabel : "Booking confirmed"}
          </button>
          {status !== "idle" && (
            <button
              type="button"
              onClick={reset}
              className="w-full text-center text-sm font-medium text-gray-500 hover:text-brand"
            >
              Try again
            </button>
          )}
        </div>
      </form>

      {/* The simulated phone */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-[300px] rounded-[2.2rem] border-[10px] border-gray-900 bg-gray-900 shadow-2xl">
          <div className="overflow-hidden rounded-[1.5rem] bg-[#e5ddd5]">
            {/* phone header */}
            <div
              className="flex items-center gap-3 px-4 py-3 text-white"
              style={{ background: isWhatsApp ? "#075E54" : "#1f2937" }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-lg">
                {business.logoEmoji}
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold">{business.name}</div>
                <div className="text-[11px] text-white/70">
                  {isWhatsApp ? "WhatsApp Business" : "SMS"}
                </div>
              </div>
            </div>

            {/* messages */}
            <div className="scroll-thin flex h-[320px] flex-col gap-2 overflow-y-auto p-3">
              {status === "idle" && (
                <p className="m-auto px-6 text-center text-xs text-gray-500">
                  Your automated confirmation will appear here the instant a booking is made.
                </p>
              )}

              {(status === "sending" || status === "typing" || status === "sent") && (
                <div className="self-center rounded-full bg-white/70 px-3 py-1 text-[10px] text-gray-600">
                  {prettyDate} &middot; {time}
                </div>
              )}

              {status === "typing" && (
                <TypingBubble color={isWhatsApp ? "#dcf8c6" : "#ffffff"} />
              )}

              {status === "sent" && (
                <>
                  <Bubble color={isWhatsApp ? "#dcf8c6" : "#ffffff"}>
                    <p className="font-semibold">Hi {firstName}! &#x2705;</p>
                    <p className="mt-1">
                      Your booking for <b>{service}</b> is confirmed for{" "}
                      <b>
                        {prettyDate} at {time}
                      </b>
                      .
                    </p>
                    <p className="mt-1">{business.name}</p>
                    <p className="mt-1">{business.contact.address}</p>
                    <span className="mt-1 block text-[10px] text-gray-500">
                      Reply <b>C</b> to cancel or reschedule.
                    </span>
                    <Meta isWhatsApp={isWhatsApp} />
                  </Bubble>
                  <Bubble color={isWhatsApp ? "#dcf8c6" : "#ffffff"} delay>
                    <p>We&rsquo;ll send a reminder 24 hours before. See you soon! {business.logoEmoji}</p>
                    <Meta isWhatsApp={isWhatsApp} />
                  </Bubble>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 bg-[#f0f0f0] px-3 py-2">
              <div className="flex-1 rounded-full bg-white px-3 py-1.5 text-xs text-gray-400">
                Message
              </div>
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-white"
                style={{ background: isWhatsApp ? "#25D366" : "#3b82f6" }}
              >
                &#10148;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </span>
      {children}
    </label>
  );
}

function Bubble({
  children,
  color,
  delay,
}: {
  children: React.ReactNode;
  color: string;
  delay?: boolean;
}) {
  return (
    <div
      className={`max-w-[85%] animate-fade-up self-end rounded-xl rounded-br-sm px-3 py-2 text-[12px] leading-snug text-gray-800 shadow ${delay ? "[animation-delay:250ms]" : ""}`}
      style={{ background: color }}
    >
      {children}
    </div>
  );
}

function TypingBubble({ color }: { color: string }) {
  return (
    <div
      className="flex max-w-[60px] animate-fade-up items-center gap-1 self-end rounded-xl rounded-br-sm px-3 py-2.5 shadow"
      style={{ background: color }}
    >
      <Dot /> <Dot /> <Dot />
    </div>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-400" />;
}

function Meta({ isWhatsApp }: { isWhatsApp: boolean }) {
  return (
    <span className="mt-1 block text-right text-[9px] text-gray-400">
      sent automatically &middot; {isWhatsApp ? "WhatsApp" : "SMS"} {isWhatsApp ? "\u2713\u2713" : ""}
    </span>
  );
}
```

## `components/automations/ReceiptGenerator.tsx`

```tsx
"use client";

import { useMemo, useState } from "react";
import type { Business } from "@/data/types";

const TAX_RATE = 0.085;

export function ReceiptGenerator({ business }: { business: Business }) {
  const priced = useMemo(
    () => business.services.filter((s) => (s.price ?? 0) > 0),
    [business.services],
  );
  const [qty, setQty] = useState<Record<string, number>>({});
  const [sent, setSent] = useState(false);

  const lineItems = priced
    .map((s) => ({ ...s, count: qty[s.name] ?? 0 }))
    .filter((s) => s.count > 0);

  const subtotal = lineItems.reduce((sum, s) => sum + (s.price ?? 0) * s.count, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  function setCount(name: string, next: number) {
    setSent(false);
    setQty((q) => ({ ...q, [name]: Math.max(0, next) }));
  }

  const receiptNo = useMemo(
    () => `#${Math.floor(1000 + Math.random() * 9000)}`,
    [],
  );
  const fmt = (n: number) => `${business.currency}${n.toFixed(2)}`;
  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Item picker */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h4 className="text-lg font-bold text-gray-900">Build the order</h4>
        <p className="mt-1 text-sm text-gray-500">
          Add items and the receipt generates itself, instantly and itemized.
        </p>
        <div className="mt-5 space-y-3">
          {priced.map((s) => {
            const count = qty[s.name] ?? 0;
            return (
              <div
                key={s.name}
                className="flex items-center justify-between gap-3 rounded-2xl border border-gray-100 p-3"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-gray-900">{s.name}</div>
                  <div className="text-xs text-gray-500">{fmt(s.price ?? 0)}</div>
                </div>
                <div className="flex flex-none items-center gap-2">
                  <Stepper
                    onClick={() => setCount(s.name, count - 1)}
                    disabled={count === 0}
                  >
                    &minus;
                  </Stepper>
                  <span className="w-6 text-center text-sm font-semibold">{count}</span>
                  <Stepper onClick={() => setCount(s.name, count + 1)}>+</Stepper>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Receipt preview */}
      <div className="flex flex-col">
        <div className="relative flex-1 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-gray-100">
          <div
            className="absolute inset-x-0 top-0 h-2 rounded-t-3xl"
            style={{ background: business.theme.brand }}
          />
          <div className="flex items-start justify-between border-b border-dashed border-gray-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{business.logoEmoji}</span>
                <span className="font-bold text-gray-900">{business.name}</span>
              </div>
              <div className="mt-1 text-xs text-gray-500">{business.contact.address}</div>
            </div>
            <div className="text-right text-xs text-gray-500">
              <div className="font-semibold text-gray-700">Receipt {receiptNo}</div>
              <div>{today}</div>
            </div>
          </div>

          <div className="min-h-[140px] py-4">
            {lineItems.length === 0 ? (
              <p className="py-10 text-center text-sm text-gray-400">
                Add items on the left to generate a receipt.
              </p>
            ) : (
              <table className="w-full text-sm">
                <tbody>
                  {lineItems.map((s) => (
                    <tr key={s.name} className="animate-fade-up">
                      <td className="py-1.5 text-gray-700">
                        {s.name}
                        <span className="text-gray-400"> &times;{s.count}</span>
                      </td>
                      <td className="py-1.5 text-right font-medium text-gray-900">
                        {fmt((s.price ?? 0) * s.count)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="space-y-1.5 border-t border-dashed border-gray-200 pt-4 text-sm">
            <Row label="Subtotal" value={fmt(subtotal)} />
            <Row label={`Tax (${(TAX_RATE * 100).toFixed(1)}%)`} value={fmt(tax)} />
            <div className="flex justify-between pt-1 text-base font-bold text-gray-900">
              <span>Total</span>
              <span style={{ color: business.theme.brand }}>{fmt(total)}</span>
            </div>
          </div>

          <p className="mt-4 text-center text-[11px] text-gray-400">
            Auto-generated by AI &middot; emailed &amp; texted to the customer
          </p>
        </div>

        <button
          type="button"
          disabled={lineItems.length === 0}
          onClick={() => setSent(true)}
          className="btn-primary mt-4 w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sent ? "Receipt sent \u2713" : "Generate & send receipt"}
        </button>
        {sent && (
          <p className="mt-2 animate-fade-up text-center text-sm font-medium text-green-600">
            Receipt {receiptNo} sent to the customer automatically.
          </p>
        )}
      </div>
    </div>
  );
}

function Stepper({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-lg font-semibold text-gray-700 transition hover:border-brand hover:text-brand disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-gray-600">
      <span>{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}
```

## `components/automations/CRMInbox.tsx`

```tsx
"use client";

import { useState } from "react";
import type { Business, CrmLead } from "@/data/types";

type Card = CrmLead & { id: number; stage: number; fresh?: boolean };

const CHANNEL_STYLE: Record<CrmLead["channel"], string> = {
  WhatsApp: "bg-green-100 text-green-700",
  SMS: "bg-blue-100 text-blue-700",
  Email: "bg-purple-100 text-purple-700",
  "Web form": "bg-amber-100 text-amber-700",
  Phone: "bg-gray-100 text-gray-700",
};

const NEW_LEAD_POOL: CrmLead[] = [
  { name: "Alex Morgan", detail: "New inquiry", value: "Hot lead", channel: "Web form" },
  { name: "Riley Chen", detail: "New inquiry", value: "Hot lead", channel: "WhatsApp" },
  { name: "Jamie Brooks", detail: "New inquiry", value: "Hot lead", channel: "SMS" },
  { name: "Taylor Reed", detail: "New inquiry", value: "Hot lead", channel: "Email" },
  { name: "Casey Flynn", detail: "New inquiry", value: "Hot lead", channel: "Phone" },
];

export function CRMInbox({ business }: { business: Business }) {
  const stages = business.crmStages;
  const [cards, setCards] = useState<Card[]>(() =>
    business.crmLeads.map((lead, i) => ({
      ...lead,
      id: i,
      // spread initial leads across the first stages
      stage: Math.min(i, stages.length - 2),
    })),
  );
  const [nextId, setNextId] = useState(business.crmLeads.length);
  const [poolIdx, setPoolIdx] = useState(0);

  function addLead() {
    const template = NEW_LEAD_POOL[poolIdx % NEW_LEAD_POOL.length];
    setCards((c) => [...c, { ...template, id: nextId, stage: 0, fresh: true }]);
    setNextId((n) => n + 1);
    setPoolIdx((p) => p + 1);
    setTimeout(() => {
      setCards((c) => c.map((card) => (card.id === nextId ? { ...card, fresh: false } : card)));
    }, 1200);
  }

  function advance(id: number) {
    setCards((c) =>
      c.map((card) =>
        card.id === id ? { ...card, stage: Math.min(card.stage + 1, stages.length - 1) } : card,
      ),
    );
  }

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-lg font-bold text-gray-900">Live CRM pipeline</h4>
          <p className="text-sm text-gray-500">
            Every lead lands here automatically. Move a card to see the flow.
          </p>
        </div>
        <button type="button" onClick={addLead} className="btn-primary !px-5 !py-2.5">
          + Simulate new lead
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stages.map((stage, sIdx) => {
          const stageCards = cards.filter((c) => c.stage === sIdx);
          return (
            <div key={stage} className="rounded-2xl bg-gray-50 p-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wide text-gray-600">
                  {stage}
                </span>
                <span
                  className="flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold text-white"
                  style={{ background: business.theme.brand }}
                >
                  {stageCards.length}
                </span>
              </div>
              <div className="space-y-2">
                {stageCards.map((card) => (
                  <div
                    key={card.id}
                    className={`rounded-xl border bg-white p-3 shadow-sm transition ${card.fresh ? "animate-fade-up ring-2" : "border-gray-100"}`}
                    style={card.fresh ? { borderColor: business.theme.brand } : undefined}
                  >
                    <div className="text-sm font-semibold leading-tight text-gray-900">
                      {card.name}
                    </div>
                    <div className="mt-0.5 text-xs text-gray-500">{card.detail}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${CHANNEL_STYLE[card.channel]}`}
                      >
                        {card.channel}
                      </span>
                      <span className="text-[11px] font-bold text-gray-700">{card.value}</span>
                    </div>
                    {sIdx < stages.length - 1 && (
                      <button
                        type="button"
                        onClick={() => advance(card.id)}
                        className="mt-2 w-full rounded-lg border border-gray-200 py-1 text-[11px] font-semibold text-gray-600 transition hover:border-brand hover:text-brand"
                      >
                        Move to {stages[sIdx + 1]} &rarr;
                      </button>
                    )}
                  </div>
                ))}
                {stageCards.length === 0 && (
                  <p className="py-4 text-center text-[11px] text-gray-300">Empty</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-center text-[11px] text-gray-400">
        Demo data &middot; in production this syncs with your real bookings, forms, and messages.
      </p>
    </div>
  );
}
```

## `components/demo/AutomationShowcase.tsx`

```tsx
"use client";

import { useState } from "react";
import type { AutomationKind, Business } from "@/data/types";
import { BookingForm } from "@/components/automations/BookingForm";
import { ReceiptGenerator } from "@/components/automations/ReceiptGenerator";
import { CRMInbox } from "@/components/automations/CRMInbox";

const TAB_META: Record<AutomationKind, { label: string; icon: string; blurb: string }> = {
  booking: {
    label: "Booking + Confirmation",
    icon: "\u{1F4F2}",
    blurb: "Book an appointment and watch the automated confirmation send instantly.",
  },
  receipt: {
    label: "Auto Receipt",
    icon: "\u{1F9FE}",
    blurb: "Build an order and a branded, itemized receipt generates itself.",
  },
  crm: {
    label: "CRM Pipeline",
    icon: "\u{1F5C2}\uFE0F",
    blurb: "See how every lead is captured and moved through your pipeline.",
  },
};

export function AutomationShowcase({ business }: { business: Business }) {
  const kinds = business.demoAutomations;
  const [active, setActive] = useState<AutomationKind>(kinds[0]);

  return (
    <section id="automations" className="bg-brand-soft/60 py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Try it live</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-brand-ink sm:text-4xl">
            AI automation, built right in
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            These are working demos. Interact with them to feel exactly what your customers and
            your team would experience.
          </p>
        </div>

        {kinds.length > 1 && (
          <div className="mx-auto mt-8 flex max-w-md flex-wrap justify-center gap-2 rounded-full bg-white p-1.5 shadow-sm">
            {kinds.map((kind) => (
              <button
                key={kind}
                type="button"
                onClick={() => setActive(kind)}
                className={`flex-1 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active === kind ? "bg-brand text-brand-fg shadow" : "text-gray-600 hover:text-brand"
                }`}
              >
                <span className="mr-1">{TAB_META[kind].icon}</span>
                {TAB_META[kind].label}
              </button>
            ))}
          </div>
        )}

        <p className="mx-auto mt-6 max-w-xl text-center text-sm text-gray-500">
          {TAB_META[active].blurb}
        </p>

        <div className="mx-auto mt-8 max-w-4xl">
          {active === "booking" && <BookingForm business={business} />}
          {active === "receipt" && <ReceiptGenerator business={business} />}
          {active === "crm" && <CRMInbox business={business} />}
        </div>
      </div>
    </section>
  );
}
```

## `components/demo/DemoHero.tsx`

```tsx
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
```

## `components/demo/DemoSections.tsx`

```tsx
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
```

## `data/businesses.ts` (all 15 niches)

```ts
import type { Business } from "@/data/types";

export const businesses: Business[] = [
  {
    slug: "pet-care",
    name: "Pawsome Grooming Co.",
    niche: "Pet Care & Grooming",
    logoEmoji: "\u{1F436}",
    tagline: "Happy pets, effortless bookings.",
    heroSubtitle:
      "Premium grooming, daycare, and boarding with online booking that texts owners the moment a spot is reserved.",
    cardSummary:
      "Grooming salon site with online booking that fires an instant WhatsApp confirmation and auto-generated receipts.",
    theme: {
      brand: "#0ea5a4",
      brandFg: "#ffffff",
      soft: "#e7fffb",
      accent: "#f59e0b",
      ink: "#0f2e2c",
      displayFont: "Fraunces",
      sansFont: "Plus Jakarta Sans",
    },
    demoLayout: "split",
    services: [
      { name: "Full Groom & Style", description: "Bath, haircut, nail trim, ear clean, and blow-dry.", price: 75 },
      { name: "Bath & Tidy", description: "Shampoo, brush-out, nail trim, and a spritz of cologne.", price: 45 },
      { name: "Doggy Daycare (Day Pass)", description: "Supervised play, nap time, and photo updates.", price: 38 },
      { name: "Overnight Boarding", description: "Cozy suite, two walks a day, and bedtime treats.", price: 65 },
      { name: "Puppy First Groom", description: "Gentle intro grooming for pups under 6 months.", price: 40 },
    ],
    features: [
      "Mobile-first booking with real-time availability",
      "Pet profiles storing breed, allergies, and grooming notes",
      "Automated WhatsApp/SMS confirmations and reminders",
      "Online deposits and saved cards via Stripe",
      "Photo gallery + before/after showcase",
      "Google Reviews wall and local SEO setup",
    ],
    automations: [
      {
        icon: "\u{1F4F2}",
        title: "Instant booking confirmation",
        description:
          "The moment a customer books, an AI flow sends a branded WhatsApp message with date, time, service, and a map link.",
        benefit: "Cuts no-shows and makes you look as polished as a national franchise.",
      },
      {
        icon: "\u{1F489}",
        title: "Vaccination & appointment reminders",
        description:
          "Automatically nudges owners 24 hours before, and flags pets whose vaccination records are expiring.",
        benefit: "Fewer missed appointments and a safer, compliant facility.",
      },
      {
        icon: "\u2B50",
        title: "Auto review requests",
        description:
          "Two hours after pickup, an AI message asks happy clients for a Google review with a one-tap link.",
        benefit: "A steady stream of 5-star reviews that win you new local customers.",
      },
      {
        icon: "\u{1F9FE}",
        title: "Receipts on autopilot",
        description: "Every visit generates a clean, itemized receipt emailed and texted instantly.",
        benefit: "No more handwritten slips. Looks professional and saves admin time.",
      },
    ],
    demoAutomations: ["booking", "receipt"],
    bookingChannel: "WhatsApp",
    bookingCtaLabel: "Book grooming",
    crmStages: ["New", "Confirmed", "In salon", "Ready"],
    crmLeads: [
      { name: "Bailey (Golden Retriever)", detail: "Full Groom & Style", value: "$75", channel: "WhatsApp" },
      { name: "Mochi (Shiba Inu)", detail: "Bath & Tidy", value: "$45", channel: "Web form" },
    ],
    currency: "$",
    testimonial: {
      quote:
        "Bookings doubled and we stopped chasing people on the phone. Clients love the instant text confirmation.",
      author: "Dana Wells",
      role: "Owner, Pawsome Grooming Co.",
    },
    stats: [
      { label: "Fewer no-shows", value: "62%" },
      { label: "Online bookings", value: "1.4k/mo" },
      { label: "Avg. rating", value: "4.9\u2605" },
    ],
    contact: {
      phone: "(415) 555-0142",
      address: "284 Marina Blvd, San Francisco, CA",
      hours: "Mon-Sat 8am-6pm",
    },
  },
  {
    slug: "dentist",
    name: "Bright Smile Dental",
    niche: "Dental Practice",
    logoEmoji: "\u{1F9B7}",
    tagline: "Modern dentistry, zero phone tag.",
    heroSubtitle:
      "Gentle, modern dental care with online scheduling, automated reminders, and a patient CRM that runs the front desk for you.",
    cardSummary:
      "Dental practice site with a patient CRM pipeline and automated appointment confirmations and reminders.",
    theme: {
      brand: "#2563eb",
      brandFg: "#ffffff",
      soft: "#eaf1ff",
      accent: "#06b6d4",
      ink: "#0b1f44",
      displayFont: "Sora",
      sansFont: "Inter",
    },
    demoLayout: "centered",
    services: [
      { name: "New Patient Exam & X-Rays", description: "Comprehensive exam, digital X-rays, and treatment plan.", price: 129 },
      { name: "Professional Cleaning", description: "Scale, polish, and fluoride with a hygienist.", price: 110 },
      { name: "Teeth Whitening", description: "In-office whitening up to 8 shades brighter.", price: 320 },
      { name: "Invisalign Consult", description: "3D scan and custom clear-aligner plan.", price: 0 },
      { name: "Emergency Visit", description: "Same-day relief for pain, chips, or lost fillings.", price: 95 },
    ],
    features: [
      "Online scheduling synced to provider calendars",
      "Secure new-patient intake forms",
      "Automated reminders that cut no-shows",
      "Patient CRM with treatment-plan tracking",
      "Insurance and financing info pages",
      "HIPAA-conscious contact and messaging flows",
    ],
    automations: [
      {
        icon: "\u{1F4C5}",
        title: "Smart appointment reminders",
        description:
          "Sends confirmation on booking, a reminder 48 hours out, and a final nudge the morning of the visit.",
        benefit: "Practices typically recover thousands per month in lost chair time.",
      },
      {
        icon: "\u{1F5C2}\uFE0F",
        title: "Patient CRM pipeline",
        description:
          "New leads flow into stages (New, Contacted, Booked, Treated) so no patient slips through the cracks.",
        benefit: "Front desk stays organized and follow-ups happen automatically.",
      },
      {
        icon: "\u{1F4DD}",
        title: "Digital intake & insurance capture",
        description: "Patients complete forms on their phone before arrival; data lands in their chart.",
        benefit: "Shorter waits, cleaner records, and a premium first impression.",
      },
      {
        icon: "\u{1F501}",
        title: "Recare reactivation",
        description: "AI spots patients overdue for a cleaning and invites them back with one tap.",
        benefit: "Fills the schedule from the patients you already have.",
      },
    ],
    demoAutomations: ["booking", "crm"],
    bookingChannel: "SMS",
    bookingCtaLabel: "Request appointment",
    crmStages: ["New lead", "Contacted", "Booked", "Treated"],
    crmLeads: [
      { name: "Marcus Reed", detail: "New Patient Exam", value: "$129", channel: "Web form" },
      { name: "Priya Nair", detail: "Invisalign Consult", value: "Consult", channel: "SMS" },
      { name: "Tom Becker", detail: "Emergency Visit", value: "$95", channel: "Phone" },
    ],
    currency: "$",
    testimonial: {
      quote:
        "The reminder and CRM automations paid for the whole website in the first month. Our no-show rate is almost zero.",
      author: "Dr. Helen Park",
      role: "Bright Smile Dental",
    },
    stats: [
      { label: "No-show rate", value: "<3%" },
      { label: "New patients", value: "+38%" },
      { label: "Front-desk hours saved", value: "12/wk" },
    ],
    contact: {
      phone: "(312) 555-0188",
      address: "1100 Lake Shore Dr, Chicago, IL",
      hours: "Mon-Fri 8am-5pm",
    },
  },
  {
    slug: "doctor",
    name: "Riverside Family Medicine",
    niche: "Medical Clinic",
    logoEmoji: "\u{1FA7A}",
    tagline: "Care that respects your time.",
    heroSubtitle:
      "A modern family practice with online booking, digital intake, and automated follow-ups so patients spend less time waiting and more time getting better.",
    cardSummary:
      "Family clinic site with online appointment requests, smart triage intake, and a patient follow-up CRM.",
    theme: {
      brand: "#0d9488",
      brandFg: "#ffffff",
      soft: "#e6fbf6",
      accent: "#3b82f6",
      ink: "#0a2723",
      displayFont: "Outfit",
      sansFont: "Inter",
    },
    demoLayout: "split",
    services: [
      { name: "Annual Physical", description: "Comprehensive head-to-toe wellness check.", price: 0 },
      { name: "Sick Visit", description: "Same-day care for colds, flu, and infections.", price: 89 },
      { name: "Telehealth Consult", description: "Video visit from the comfort of home.", price: 65 },
      { name: "Chronic Care Check-in", description: "Diabetes, blood pressure, and medication review.", price: 75 },
      { name: "Travel Vaccination", description: "Pre-trip immunizations and advice.", price: 120 },
    ],
    features: [
      "Online appointment requests with provider selection",
      "Symptom-aware digital intake forms",
      "Automated visit reminders and follow-ups",
      "Patient follow-up CRM and recall lists",
      "Telehealth booking and instructions",
      "Accessible, multilingual-ready design",
    ],
    automations: [
      {
        icon: "\u{1FA7A}",
        title: "Smart intake & triage",
        description:
          "An AI form asks the right follow-up questions based on symptoms and routes urgent cases for faster review.",
        benefit: "Providers walk in prepared and patients feel heard from the first click.",
      },
      {
        icon: "\u{1F4DE}",
        title: "Appointment reminders & recalls",
        description: "Confirms bookings and automatically recalls patients due for annual physicals or screenings.",
        benefit: "Keeps the schedule full and improves preventive-care numbers.",
      },
      {
        icon: "\u{1F5C2}\uFE0F",
        title: "Follow-up CRM",
        description: "Tracks each patient through New, Triaged, Seen, and Follow-up stages.",
        benefit: "No lab result or callback is ever forgotten.",
      },
      {
        icon: "\u{1F4AC}",
        title: "After-visit summaries",
        description: "Generates a plain-language summary and next steps, sent automatically after each visit.",
        benefit: "Better adherence and fewer confused callbacks.",
      },
    ],
    demoAutomations: ["booking", "crm"],
    bookingChannel: "SMS",
    bookingCtaLabel: "Request visit",
    crmStages: ["New", "Triaged", "Seen", "Follow-up"],
    crmLeads: [
      { name: "Elena Cruz", detail: "Annual Physical", value: "Covered", channel: "Web form" },
      { name: "Sam O'Neil", detail: "Telehealth Consult", value: "$65", channel: "SMS" },
      { name: "Grace Liu", detail: "Sick Visit", value: "$89", channel: "Phone" },
    ],
    currency: "$",
    testimonial: {
      quote:
        "Patients constantly tell us how easy it is to book and check in now. The intake automation saves our nurses hours every day.",
      author: "Dr. Aaron Mills",
      role: "Riverside Family Medicine",
    },
    stats: [
      { label: "Check-in time", value: "-70%" },
      { label: "Recall response", value: "+44%" },
      { label: "Patient NPS", value: "82" },
    ],
    contact: {
      phone: "(503) 555-0164",
      address: "920 River Rd, Portland, OR",
      hours: "Mon-Fri 7:30am-6pm",
    },
  },
  {
    slug: "bakery",
    name: "Flour & Bloom Bakery",
    niche: "Bakery",
    logoEmoji: "\u{1F950}",
    tagline: "Fresh-baked, made to order.",
    heroSubtitle:
      "Artisan breads, custom cakes, and pastries with online ordering and instant, beautifully itemized receipts.",
    cardSummary:
      "Artisan bakery site with online custom-cake orders and an auto-generated, itemized receipt builder.",
    theme: {
      brand: "#b45309",
      brandFg: "#ffffff",
      soft: "#fdf3e7",
      accent: "#db2777",
      ink: "#3b2410",
      displayFont: "Playfair Display",
      sansFont: "Nunito",
    },
    demoLayout: "editorial",
    services: [
      { name: "Custom Celebration Cake", description: "Made-to-order cake for any occasion (6-inch).", price: 48 },
      { name: "Sourdough Loaf", description: "Naturally leavened, 24-hour ferment.", price: 9 },
      { name: "Croissant (each)", description: "Butter-laminated, baked fresh each morning.", price: 4 },
      { name: "Box of 6 Cupcakes", description: "Assorted seasonal flavors with buttercream.", price: 24 },
      { name: "Cinnamon Roll", description: "Warm, gooey, cream-cheese glaze.", price: 5 },
    ],
    features: [
      "Online ordering and custom-cake request forms",
      "Auto-generated itemized receipts and invoices",
      "Pickup scheduling with reminders",
      "Seasonal menu and gallery management",
      "Loyalty and reorder prompts",
      "Local delivery and catering pages",
    ],
    automations: [
      {
        icon: "\u{1F9FE}",
        title: "Automated receipt & invoice generation",
        description:
          "Each order instantly produces a branded, itemized receipt with tax, emailed and texted to the customer.",
        benefit: "Looks professional, removes manual bookkeeping, and speeds up the counter.",
      },
      {
        icon: "\u{1F382}",
        title: "Custom-cake intake assistant",
        description: "An AI form captures flavor, size, date, and inspiration photos, then quotes an estimate.",
        benefit: "Fewer back-and-forth messages and zero double-booked cake dates.",
      },
      {
        icon: "\u{1F501}",
        title: "Reorder & loyalty reminders",
        description: "Nudges regulars to reorder favorites and rewards repeat purchases automatically.",
        benefit: "More repeat sales without lifting a finger.",
      },
      {
        icon: "\u{1F4E6}",
        title: "Pickup-ready alerts",
        description: "Texts customers the moment their order is boxed and ready.",
        benefit: "Smoother pickups and happier customers.",
      },
    ],
    demoAutomations: ["receipt", "booking"],
    bookingChannel: "WhatsApp",
    bookingCtaLabel: "Order custom cake",
    crmStages: ["New order", "Baking", "Ready", "Picked up"],
    crmLeads: [
      { name: "Olivia Grant", detail: "Custom Celebration Cake", value: "$48", channel: "Web form" },
      { name: "Noah Kim", detail: "Box of 6 Cupcakes", value: "$24", channel: "WhatsApp" },
    ],
    currency: "$",
    testimonial: {
      quote:
        "Custom cake orders used to be a mess of DMs. Now everything is organized and customers get a proper receipt instantly.",
      author: "Maria Flores",
      role: "Owner, Flour & Bloom Bakery",
    },
    stats: [
      { label: "Custom orders", value: "+120%" },
      { label: "Counter time saved", value: "9 hrs/wk" },
      { label: "Repeat customers", value: "48%" },
    ],
    contact: {
      phone: "(737) 555-0119",
      address: "55 Cedar St, Austin, TX",
      hours: "Tue-Sun 7am-4pm",
    },
  },
  {
    slug: "restaurant",
    name: "Olive & Ember",
    niche: "Restaurant & Cafe",
    logoEmoji: "\u{1F37D}\uFE0F",
    tagline: "Wood-fired flavor, reserved in seconds.",
    heroSubtitle:
      "A neighborhood bistro with online reservations, instant confirmations, and digital receipts that keep guests coming back.",
    cardSummary:
      "Bistro site with table reservations that text instant confirmations and a digital bill/receipt generator.",
    theme: {
      brand: "#9f1239",
      brandFg: "#ffffff",
      soft: "#fdeef2",
      accent: "#ca8a04",
      ink: "#3a0a1a",
      displayFont: "Cormorant Garamond",
      sansFont: "Manrope",
    },
    demoLayout: "editorial",
    services: [
      { name: "Wood-Fired Margherita", description: "San Marzano, fior di latte, basil.", price: 17 },
      { name: "Ember Steak Frites", description: "Grilled flat iron, herb butter, hand-cut fries.", price: 29 },
      { name: "Charred Veg Bowl", description: "Seasonal vegetables, farro, tahini.", price: 19 },
      { name: "Burrata & Peach", description: "Creamy burrata, grilled peach, balsamic.", price: 15 },
      { name: "Tiramisu", description: "Espresso-soaked, mascarpone cream.", price: 11 },
    ],
    features: [
      "Online table reservations with party size",
      "Instant WhatsApp/SMS booking confirmations",
      "Digital bill and itemized receipt generation",
      "Menu, gallery, and events pages",
      "Waitlist and special-occasion notes",
      "Google Maps, hours, and reviews integration",
    ],
    automations: [
      {
        icon: "\u{1F4F2}",
        title: "Reservation confirmations",
        description: "Guests get an instant text with their table time, party size, and a one-tap modify link.",
        benefit: "Fewer no-shows and a smoother front-of-house.",
      },
      {
        icon: "\u{1F9FE}",
        title: "Digital receipts & invoices",
        description: "Generates a clean itemized bill with tax and tip, sent digitally on request.",
        benefit: "Faster table turns and effortless expense receipts for guests.",
      },
      {
        icon: "\u{1F389}",
        title: "Special-occasion follow-ups",
        description: "Remembers birthdays and anniversaries and invites guests back with an offer.",
        benefit: "Turns one-time diners into regulars.",
      },
      {
        icon: "\u2B50",
        title: "Post-meal review nudge",
        description: "Sends a friendly review request shortly after the visit.",
        benefit: "Builds a 5-star reputation that drives foot traffic.",
      },
    ],
    demoAutomations: ["receipt", "booking"],
    bookingChannel: "WhatsApp",
    bookingCtaLabel: "Reserve a table",
    crmStages: ["Requested", "Confirmed", "Seated", "Followed up"],
    crmLeads: [
      { name: "The Dawsons (4)", detail: "Anniversary dinner", value: "Table 12", channel: "WhatsApp" },
      { name: "Jordan Pratt (2)", detail: "Window seat", value: "Table 6", channel: "Web form" },
    ],
    currency: "$",
    testimonial: {
      quote:
        "Reservations and confirmations are fully automated now. Our hosts focus on guests instead of the phone.",
      author: "Luca Bianchi",
      role: "Owner, Olive & Ember",
    },
    stats: [
      { label: "No-show drop", value: "55%" },
      { label: "Weekend covers", value: "+31%" },
      { label: "Avg. rating", value: "4.8\u2605" },
    ],
    contact: {
      phone: "(206) 555-0173",
      address: "1408 Pike Pl, Seattle, WA",
      hours: "Wed-Sun 5pm-11pm",
    },
  },
  {
    slug: "salon-spa",
    name: "Luxe & Co. Salon Spa",
    niche: "Salon & Spa",
    logoEmoji: "\u{1F485}",
    tagline: "Book your glow in 30 seconds.",
    heroSubtitle:
      "Hair, nails, and skin treatments with real-time online booking, instant confirmations, and effortless digital receipts.",
    cardSummary:
      "Salon and spa site with stylist-level booking, instant WhatsApp confirmations, and itemized receipts.",
    theme: {
      brand: "#9333ea",
      brandFg: "#ffffff",
      soft: "#f6ecff",
      accent: "#ec4899",
      ink: "#2a0e44",
      displayFont: "Fraunces",
      sansFont: "Plus Jakarta Sans",
    },
    demoLayout: "split",
    services: [
      { name: "Cut & Blow-Dry", description: "Consultation, shampoo, precision cut, and style.", price: 65 },
      { name: "Full Color", description: "Single-process color with gloss finish.", price: 120 },
      { name: "Balayage", description: "Hand-painted, sun-kissed dimension.", price: 185 },
      { name: "Signature Facial", description: "Deep-cleanse, exfoliate, mask, and massage.", price: 95 },
      { name: "Gel Manicure", description: "Long-lasting gel polish and nail care.", price: 45 },
    ],
    features: [
      "Per-stylist real-time booking",
      "Instant confirmations and reminders",
      "Deposits and saved cards",
      "Itemized digital receipts",
      "Lookbook gallery and service menu",
      "Membership and package promotions",
    ],
    automations: [
      {
        icon: "\u{1F4F2}",
        title: "Booking confirmations",
        description: "Sends a stylish confirmation with stylist name, service, and time the instant a slot is booked.",
        benefit: "Looks high-end and dramatically reduces no-shows.",
      },
      {
        icon: "\u23F0",
        title: "Reminders & rebooking",
        description: "Reminds clients before appointments and invites them to rebook at the perfect interval.",
        benefit: "Keeps chairs full and clients on a routine.",
      },
      {
        icon: "\u{1F9FE}",
        title: "Instant receipts",
        description: "Generates an itemized receipt with add-ons and tips automatically.",
        benefit: "Professional checkout with zero paperwork.",
      },
      {
        icon: "\u2B50",
        title: "Review & referral requests",
        description: "Asks delighted clients for reviews and rewards referrals.",
        benefit: "Steady word-of-mouth growth.",
      },
    ],
    demoAutomations: ["booking", "receipt"],
    bookingChannel: "WhatsApp",
    bookingCtaLabel: "Book appointment",
    crmStages: ["New", "Confirmed", "In chair", "Checked out"],
    crmLeads: [
      { name: "Aaliyah Brooks", detail: "Balayage w/ Mia", value: "$185", channel: "WhatsApp" },
      { name: "Sofia Ramos", detail: "Gel Manicure", value: "$45", channel: "Web form" },
    ],
    currency: "$",
    testimonial: {
      quote:
        "Our online booking and confirmations feel like a luxury brand now. Clients notice, and our calendar stays packed.",
      author: "Bianca Stone",
      role: "Founder, Luxe & Co.",
    },
    stats: [
      { label: "Rebooking rate", value: "71%" },
      { label: "No-shows", value: "-58%" },
      { label: "Avg. ticket", value: "+22%" },
    ],
    contact: {
      phone: "(305) 555-0156",
      address: "77 Collins Ave, Miami, FL",
      hours: "Tue-Sat 9am-7pm",
    },
  },
  {
    slug: "gym",
    name: "IronPulse Fitness",
    niche: "Gym & Fitness Studio",
    logoEmoji: "\u{1F4AA}",
    tagline: "Stronger starts with one tap.",
    heroSubtitle:
      "Group classes and personal training with online class booking, automated reminders, and a lead pipeline that converts trials into members.",
    cardSummary:
      "Fitness studio site with class booking, automated reminders, and a membership lead-conversion CRM.",
    theme: {
      brand: "#16a34a",
      brandFg: "#ffffff",
      soft: "#e8fbef",
      accent: "#f97316",
      ink: "#06281a",
      displayFont: "Space Grotesk",
      sansFont: "Archivo",
    },
    demoLayout: "centered",
    services: [
      { name: "HIIT Class", description: "45-minute high-intensity interval session.", price: 22 },
      { name: "Strength Foundations", description: "Coached barbell and dumbbell training.", price: 25 },
      { name: "Personal Training (1hr)", description: "One-on-one session with a certified coach.", price: 75 },
      { name: "Yoga Flow", description: "Vinyasa flow for mobility and recovery.", price: 18 },
      { name: "7-Day Trial Pass", description: "Unlimited classes for a week.", price: 0 },
    ],
    features: [
      "Class schedule with live spot counts",
      "Trial and membership sign-up flows",
      "Automated class reminders and waitlists",
      "Lead-to-member conversion CRM",
      "Coach bios and program pages",
      "Payments, packages, and recurring billing",
    ],
    automations: [
      {
        icon: "\u{1F4C5}",
        title: "Class booking & reminders",
        description: "Members reserve spots online and get reminders plus waitlist auto-promotions.",
        benefit: "Higher class attendance and fuller studios.",
      },
      {
        icon: "\u{1F5C2}\uFE0F",
        title: "Trial-to-member CRM",
        description: "New trial sign-ups flow through stages so coaches follow up at the perfect moment.",
        benefit: "More trials convert into paying members.",
      },
      {
        icon: "\u{1F3AF}",
        title: "Win-back & milestone messages",
        description: "Re-engages lapsed members and celebrates streaks and PRs automatically.",
        benefit: "Better retention and a motivated community.",
      },
      {
        icon: "\u{1F4B3}",
        title: "Automated billing reminders",
        description: "Handles renewals and failed-payment nudges without awkward conversations.",
        benefit: "Steadier recurring revenue.",
      },
    ],
    demoAutomations: ["booking", "crm"],
    bookingChannel: "SMS",
    bookingCtaLabel: "Reserve a class",
    crmStages: ["Trial lead", "Toured", "Trial active", "Member"],
    crmLeads: [
      { name: "Derek Cole", detail: "7-Day Trial Pass", value: "Trial", channel: "Web form" },
      { name: "Hannah Lee", detail: "Personal Training", value: "$75", channel: "SMS" },
      { name: "Ben Ortiz", detail: "HIIT Class", value: "$22", channel: "Phone" },
    ],
    currency: "$",
    testimonial: {
      quote:
        "The trial CRM is a game changer. We finally follow up with every lead and our conversion rate jumped.",
      author: "Coach Tasha Green",
      role: "IronPulse Fitness",
    },
    stats: [
      { label: "Trial conversion", value: "+47%" },
      { label: "Class fill rate", value: "92%" },
      { label: "Member churn", value: "-19%" },
    ],
    contact: {
      phone: "(720) 555-0131",
      address: "3300 Blake St, Denver, CO",
      hours: "Mon-Sun 5am-10pm",
    },
  },
  {
    slug: "real-estate",
    name: "Beacon Realty Group",
    niche: "Real Estate Agent",
    logoEmoji: "\u{1F3E1}",
    tagline: "Every lead, captured and nurtured.",
    heroSubtitle:
      "A polished agent site with instant lead capture, automated tour scheduling, and a CRM that nurtures buyers and sellers on autopilot.",
    cardSummary:
      "Real estate agent site with a lead-capture CRM pipeline and automated property-tour scheduling.",
    theme: {
      brand: "#1e3a8a",
      brandFg: "#ffffff",
      soft: "#e9eefb",
      accent: "#0891b2",
      ink: "#0a1733",
      displayFont: "Sora",
      sansFont: "Inter",
    },
    demoLayout: "split",
    services: [
      { name: "Buyer Consultation", description: "Define your search, budget, and must-haves.", price: 0 },
      { name: "Listing Appointment", description: "Pricing strategy and home-prep walkthrough.", price: 0 },
      { name: "Private Showing", description: "Schedule a tour of any active listing.", price: 0 },
      { name: "Home Valuation", description: "Data-backed estimate of your home's value.", price: 0 },
      { name: "Investor Strategy Call", description: "Cash-flow and ROI analysis session.", price: 0 },
    ],
    features: [
      "IDX-ready listing showcase",
      "Instant lead capture from every form",
      "Automated tour scheduling and reminders",
      "Buyer/seller nurture CRM",
      "Neighborhood guides and valuation tools",
      "Testimonials and closed-deal highlights",
    ],
    automations: [
      {
        icon: "\u{1F5C2}\uFE0F",
        title: "Lead-capture CRM",
        description: "Every inquiry becomes a tracked lead moving through New, Nurturing, Touring, and Offer stages.",
        benefit: "No hot lead ever falls through the cracks.",
      },
      {
        icon: "\u{1F4C5}",
        title: "Automated tour scheduling",
        description: "Buyers self-schedule showings and get instant confirmations and directions.",
        benefit: "More tours booked while you focus on closing.",
      },
      {
        icon: "\u{1F4E9}",
        title: "Drip nurture sequences",
        description: "Sends tailored listings and market updates until leads are ready to move.",
        benefit: "Stay top-of-mind and convert long-cycle buyers.",
      },
      {
        icon: "\u{1F4C8}",
        title: "Instant home valuations",
        description: "Auto-generates a valuation report from an address and captures the seller lead.",
        benefit: "A powerful magnet for listing leads.",
      },
    ],
    demoAutomations: ["crm", "booking"],
    bookingChannel: "SMS",
    bookingCtaLabel: "Schedule a tour",
    crmStages: ["New lead", "Nurturing", "Touring", "Offer"],
    crmLeads: [
      { name: "The Whitfields", detail: "Buyer - 4BR, Eastside", value: "$850k", channel: "Web form" },
      { name: "Carla Mendez", detail: "Seller - valuation", value: "$610k", channel: "SMS" },
      { name: "Devon Pierce", detail: "Investor call", value: "Multi-unit", channel: "Email" },
    ],
    currency: "$",
    testimonial: {
      quote:
        "I used to lose leads in my inbox. Now every inquiry is captured and nurtured automatically. It's like having an assistant.",
      author: "Renee Carter",
      role: "Broker, Beacon Realty Group",
    },
    stats: [
      { label: "Lead response", value: "<2 min" },
      { label: "Tours booked", value: "+63%" },
      { label: "Deals closed", value: "+28%" },
    ],
    contact: {
      phone: "(602) 555-0148",
      address: "1450 Camelback Rd, Phoenix, AZ",
      hours: "Mon-Sun 8am-8pm",
    },
  },
  {
    slug: "auto-repair",
    name: "Apex Auto Works",
    niche: "Auto Repair Shop",
    logoEmoji: "\u{1F527}",
    tagline: "Transparent service, instant estimates.",
    heroSubtitle:
      "A trustworthy auto shop with online service booking, itemized digital invoices, and a repair-status CRM customers can actually follow.",
    cardSummary:
      "Auto repair site with online service booking, itemized digital invoices, and a repair-status CRM.",
    theme: {
      brand: "#dc2626",
      brandFg: "#ffffff",
      soft: "#fdeaea",
      accent: "#1f2937",
      ink: "#3a0d0d",
      displayFont: "Archivo",
      sansFont: "Inter",
    },
    demoLayout: "centered",
    services: [
      { name: "Oil & Filter Change", description: "Full synthetic oil and new filter.", price: 69 },
      { name: "Brake Pad Replacement", description: "Front or rear pads with inspection.", price: 189 },
      { name: "Diagnostic Scan", description: "Computerized check-engine diagnosis.", price: 89 },
      { name: "Tire Rotation & Balance", description: "Rotate, balance, and pressure check.", price: 49 },
      { name: "AC Recharge", description: "Refrigerant top-up and leak check.", price: 129 },
    ],
    features: [
      "Online service booking with vehicle details",
      "Itemized digital estimates and invoices",
      "Repair-status tracking customers can follow",
      "Service reminders for mileage/time intervals",
      "Photo-documented inspections",
      "Reviews and warranty info pages",
    ],
    automations: [
      {
        icon: "\u{1F9FE}",
        title: "Itemized invoice generation",
        description: "Builds a clear estimate and final invoice with parts, labor, and tax automatically.",
        benefit: "Builds trust and removes billing disputes.",
      },
      {
        icon: "\u{1F5C2}\uFE0F",
        title: "Repair-status CRM",
        description: "Customers see their car move through Checked in, Diagnosing, Repairing, and Ready.",
        benefit: "Fewer 'is it done yet?' calls and happier customers.",
      },
      {
        icon: "\u{1F501}",
        title: "Service interval reminders",
        description: "Reminds drivers when they're due for an oil change or inspection.",
        benefit: "Predictable repeat business.",
      },
      {
        icon: "\u{1F4F8}",
        title: "Photo approval requests",
        description: "Texts photos of needed repairs and captures one-tap approval.",
        benefit: "Faster approvals and transparent upsells.",
      },
    ],
    demoAutomations: ["receipt", "crm"],
    bookingChannel: "SMS",
    bookingCtaLabel: "Book a service",
    crmStages: ["Checked in", "Diagnosing", "Repairing", "Ready"],
    crmLeads: [
      { name: "Honda Civic - K. Ruiz", detail: "Brake Pad Replacement", value: "$189", channel: "Web form" },
      { name: "Ford F-150 - J. Stahl", detail: "Diagnostic Scan", value: "$89", channel: "Phone" },
    ],
    currency: "$",
    testimonial: {
      quote:
        "The digital invoices and status updates made us look like a dealership. Customers trust us more and come back.",
      author: "Mike Avila",
      role: "Owner, Apex Auto Works",
    },
    stats: [
      { label: "Status-call volume", value: "-65%" },
      { label: "Repeat customers", value: "+40%" },
      { label: "Avg. review", value: "4.9\u2605" },
    ],
    contact: {
      phone: "(216) 555-0177",
      address: "8800 Euclid Ave, Cleveland, OH",
      hours: "Mon-Sat 7am-6pm",
    },
  },
  {
    slug: "law-firm",
    name: "Sterling & Hale Law",
    niche: "Law Firm",
    logoEmoji: "\u2696\uFE0F",
    tagline: "Intake handled. Cases organized.",
    heroSubtitle:
      "A distinguished law-firm site with confidential intake, automated consultation scheduling, and a matter-tracking CRM.",
    cardSummary:
      "Law firm site with confidential client intake, a case-pipeline CRM, and automated consultation scheduling.",
    theme: {
      brand: "#1f2937",
      brandFg: "#ffffff",
      soft: "#eef0f3",
      accent: "#b45309",
      ink: "#0b1220",
      displayFont: "Playfair Display",
      sansFont: "Lora",
    },
    demoLayout: "editorial",
    services: [
      { name: "Free Case Evaluation", description: "Confidential review of your situation.", price: 0 },
      { name: "Estate Planning", description: "Wills, trusts, and powers of attorney.", price: 0 },
      { name: "Business Formation", description: "LLC, incorporation, and contracts.", price: 0 },
      { name: "Personal Injury Consult", description: "No-fee unless we win your case.", price: 0 },
      { name: "Family Law Consult", description: "Divorce, custody, and mediation.", price: 0 },
    ],
    features: [
      "Confidential, structured client intake",
      "Automated consultation scheduling",
      "Matter/case-pipeline CRM",
      "Practice-area and attorney profile pages",
      "Document-request and e-sign prompts",
      "Trust-building testimonials and results",
    ],
    automations: [
      {
        icon: "\u{1F5C2}\uFE0F",
        title: "Case-intake CRM",
        description: "Every inquiry becomes a matter tracked through Intake, Reviewing, Retained, and Active.",
        benefit: "Nothing slips, and conflicts checks happen up front.",
      },
      {
        icon: "\u{1F4C5}",
        title: "Consultation scheduling",
        description: "Qualified leads self-book consults that sync to attorney calendars with reminders.",
        benefit: "More booked consults with less paralegal time.",
      },
      {
        icon: "\u{1F510}",
        title: "Confidential smart intake",
        description: "Captures case details securely and routes by practice area.",
        benefit: "Faster, organized onboarding and a professional first impression.",
      },
      {
        icon: "\u{1F4C4}",
        title: "Document & e-sign requests",
        description: "Automatically requests needed documents and signatures.",
        benefit: "Cases move forward without manual chasing.",
      },
    ],
    demoAutomations: ["crm", "booking"],
    bookingChannel: "SMS",
    bookingCtaLabel: "Book a consultation",
    crmStages: ["Intake", "Reviewing", "Retained", "Active"],
    crmLeads: [
      { name: "M. Donovan", detail: "Estate Planning", value: "Retainer", channel: "Web form" },
      { name: "T. Alvarez", detail: "Personal Injury", value: "Contingency", channel: "Phone" },
      { name: "Brightline LLC", detail: "Business Formation", value: "Flat fee", channel: "Email" },
    ],
    currency: "$",
    testimonial: {
      quote:
        "Our intake is finally organized and confidential. We book more consultations and never lose a lead.",
      author: "Jonathan Hale, Esq.",
      role: "Partner, Sterling & Hale",
    },
    stats: [
      { label: "Consults booked", value: "+52%" },
      { label: "Intake time", value: "-60%" },
      { label: "Lead follow-up", value: "100%" },
    ],
    contact: {
      phone: "(617) 555-0125",
      address: "200 State St, Boston, MA",
      hours: "Mon-Fri 9am-6pm",
    },
  },
  {
    slug: "landscaping",
    name: "GreenScape Pros",
    niche: "Landscaping",
    logoEmoji: "\u{1F33F}",
    tagline: "Quotes that sell themselves.",
    heroSubtitle:
      "Lawn care and landscape design with online quote requests, automated estimates, and a job pipeline that keeps crews booked.",
    cardSummary:
      "Landscaping site with online quote requests, a job-pipeline CRM, and instant itemized estimates.",
    theme: {
      brand: "#15803d",
      brandFg: "#ffffff",
      soft: "#e7f8ec",
      accent: "#ca8a04",
      ink: "#0a2615",
      displayFont: "Outfit",
      sansFont: "Manrope",
    },
    demoLayout: "split",
    services: [
      { name: "Weekly Lawn Care", description: "Mow, edge, trim, and blow.", price: 55 },
      { name: "Landscape Design", description: "Custom plan and 3D concept.", price: 350 },
      { name: "Mulch & Bed Refresh", description: "Premium mulch and bed cleanup (per yard).", price: 90 },
      { name: "Irrigation Tune-Up", description: "Inspect, adjust, and repair sprinklers.", price: 140 },
      { name: "Seasonal Cleanup", description: "Leaf removal and full property reset.", price: 220 },
    ],
    features: [
      "Online quote and estimate requests",
      "Instant itemized estimates",
      "Job-pipeline CRM and scheduling",
      "Before/after project gallery",
      "Recurring service plans and reminders",
      "Service-area maps and reviews",
    ],
    automations: [
      {
        icon: "\u{1F5C2}\uFE0F",
        title: "Job-pipeline CRM",
        description: "Leads move through Quote, Scheduled, In progress, and Complete with crew assignments.",
        benefit: "Crews stay booked and nothing gets double-scheduled.",
      },
      {
        icon: "\u{1F9FE}",
        title: "Instant estimates",
        description: "Generates itemized estimates from selected services and property size.",
        benefit: "Win jobs faster with same-day quotes.",
      },
      {
        icon: "\u{1F326}\uFE0F",
        title: "Weather-aware scheduling",
        description: "Auto-notifies customers when rain forces a reschedule.",
        benefit: "Fewer wasted trips and frustrated clients.",
      },
      {
        icon: "\u{1F501}",
        title: "Recurring service reminders",
        description: "Keeps weekly and seasonal clients on a hands-off schedule.",
        benefit: "Predictable recurring revenue.",
      },
    ],
    demoAutomations: ["crm", "receipt"],
    bookingChannel: "SMS",
    bookingCtaLabel: "Get a free quote",
    crmStages: ["Quote", "Scheduled", "In progress", "Complete"],
    crmLeads: [
      { name: "42 Oakridge Ln", detail: "Landscape Design", value: "$350", channel: "Web form" },
      { name: "9 Birchwood Ct", detail: "Weekly Lawn Care", value: "$55/wk", channel: "Phone" },
    ],
    currency: "$",
    testimonial: {
      quote:
        "Same-day estimates and an organized job board doubled our close rate. We finally look as professional as we work.",
      author: "Carlos Mendoza",
      role: "Owner, GreenScape Pros",
    },
    stats: [
      { label: "Quote close rate", value: "+58%" },
      { label: "Crew utilization", value: "94%" },
      { label: "Recurring clients", value: "210+" },
    ],
    contact: {
      phone: "(919) 555-0193",
      address: "300 Glenwood Ave, Raleigh, NC",
      hours: "Mon-Sat 7am-5pm",
    },
  },
  {
    slug: "cleaning",
    name: "Sparkle & Co. Cleaning",
    niche: "Cleaning Service",
    logoEmoji: "\u{1F9F9}",
    tagline: "Book a spotless home in seconds.",
    heroSubtitle:
      "Residential and office cleaning with instant online booking, automated reminders, and a job CRM that keeps every appointment on track.",
    cardSummary:
      "Cleaning service site with instant online booking, automated reminders, and a job-tracking CRM.",
    theme: {
      brand: "#0891b2",
      brandFg: "#ffffff",
      soft: "#e3fafe",
      accent: "#22c55e",
      ink: "#062a33",
      displayFont: "Sora",
      sansFont: "Plus Jakarta Sans",
    },
    demoLayout: "centered",
    services: [
      { name: "Standard Home Clean", description: "Dusting, floors, kitchen, and baths.", price: 120 },
      { name: "Deep Clean", description: "Top-to-bottom detailed cleaning.", price: 240 },
      { name: "Move-In/Out Clean", description: "Full empty-home turnover clean.", price: 290 },
      { name: "Office Cleaning", description: "After-hours commercial cleaning.", price: 180 },
      { name: "Recurring Weekly", description: "Discounted weekly maintenance clean.", price: 100 },
    ],
    features: [
      "Instant online booking with home size",
      "Automated confirmations and reminders",
      "Job-tracking CRM for crews",
      "Recurring plans with auto-scheduling",
      "Secure online payment and tips",
      "Checklists and satisfaction follow-ups",
    ],
    automations: [
      {
        icon: "\u{1F4F2}",
        title: "Booking confirmations",
        description: "Confirms the appointment and crew arrival window instantly via text.",
        benefit: "Customers feel taken care of from the first tap.",
      },
      {
        icon: "\u{1F5C2}\uFE0F",
        title: "Job-tracking CRM",
        description: "Jobs flow through Booked, En route, Cleaning, and Done with crew notes.",
        benefit: "Dispatch runs smoothly and nothing is missed.",
      },
      {
        icon: "\u{1F501}",
        title: "Recurring auto-scheduling",
        description: "Automatically books weekly/biweekly cleans and reminders.",
        benefit: "Locks in dependable recurring revenue.",
      },
      {
        icon: "\u2B50",
        title: "Satisfaction follow-ups",
        description: "Checks in after each clean and requests a review if all went well.",
        benefit: "Builds reputation and catches issues early.",
      },
    ],
    demoAutomations: ["booking", "crm"],
    bookingChannel: "WhatsApp",
    bookingCtaLabel: "Book a cleaning",
    crmStages: ["Booked", "En route", "Cleaning", "Done"],
    crmLeads: [
      { name: "Apt 5B - Reyes", detail: "Deep Clean", value: "$240", channel: "WhatsApp" },
      { name: "Maple Office Suite", detail: "Office Cleaning", value: "$180", channel: "Web form" },
    ],
    currency: "$",
    testimonial: {
      quote:
        "Booking and dispatch used to eat my whole morning. Now it's automatic and our crews always know where to go.",
      author: "Nadia Petrova",
      role: "Owner, Sparkle & Co.",
    },
    stats: [
      { label: "Booking time", value: "30 sec" },
      { label: "Recurring clients", value: "+74%" },
      { label: "On-time arrivals", value: "98%" },
    ],
    contact: {
      phone: "(404) 555-0167",
      address: "1212 Peachtree St, Atlanta, GA",
      hours: "Mon-Sat 8am-6pm",
    },
  },
  {
    slug: "photographer",
    name: "Aperture & Co.",
    niche: "Photographer",
    logoEmoji: "\u{1F4F8}",
    tagline: "Booked sessions, captured moments.",
    heroSubtitle:
      "Weddings, portraits, and brand shoots with online session booking, automated reminders, and a client CRM from inquiry to gallery delivery.",
    cardSummary:
      "Photography studio site with session booking, an inquiry-to-delivery CRM, and automated reminders.",
    theme: {
      brand: "#111827",
      brandFg: "#ffffff",
      soft: "#f1f1f3",
      accent: "#d97706",
      ink: "#000000",
      displayFont: "Cormorant Garamond",
      sansFont: "Manrope",
    },
    demoLayout: "editorial",
    services: [
      { name: "Portrait Session", description: "1-hour session, 20 edited images.", price: 350 },
      { name: "Wedding Collection", description: "Full-day coverage and online gallery.", price: 2800 },
      { name: "Family Mini Session", description: "30-minute outdoor mini, 10 images.", price: 195 },
      { name: "Brand & Product Shoot", description: "Half-day commercial session.", price: 900 },
      { name: "Engagement Session", description: "Romantic on-location shoot.", price: 450 },
    ],
    features: [
      "Online session booking and deposits",
      "Inquiry-to-delivery client CRM",
      "Automated reminders and prep guides",
      "Portfolio galleries by category",
      "Contracts and e-sign prompts",
      "Gallery delivery and reorder prompts",
    ],
    automations: [
      {
        icon: "\u{1F4C5}",
        title: "Session booking & deposits",
        description: "Clients book a date, pay a deposit, and receive a confirmation and prep guide automatically.",
        benefit: "Locks in dates and reduces last-minute cancellations.",
      },
      {
        icon: "\u{1F5C2}\uFE0F",
        title: "Inquiry-to-delivery CRM",
        description: "Tracks clients through Inquiry, Booked, Shot, and Delivered with automated nudges.",
        benefit: "A smooth, premium experience from first message to final gallery.",
      },
      {
        icon: "\u{1F4DD}",
        title: "Contracts & prep automation",
        description: "Sends contracts, questionnaires, and shot-list prompts at the right time.",
        benefit: "Less admin, more shooting.",
      },
      {
        icon: "\u{1F5BC}\uFE0F",
        title: "Gallery delivery & reorders",
        description: "Notifies clients when galleries are ready and prompts print reorders.",
        benefit: "Extra revenue with zero manual follow-up.",
      },
    ],
    demoAutomations: ["booking", "crm"],
    bookingChannel: "SMS",
    bookingCtaLabel: "Book a session",
    crmStages: ["Inquiry", "Booked", "Shot", "Delivered"],
    crmLeads: [
      { name: "Emma & Liam", detail: "Wedding Collection", value: "$2,800", channel: "Web form" },
      { name: "The Patels", detail: "Family Mini Session", value: "$195", channel: "SMS" },
    ],
    currency: "$",
    testimonial: {
      quote:
        "From inquiry to gallery delivery, everything runs itself. Clients say booking me felt effortless and luxurious.",
      author: "Jasmine Wu",
      role: "Lead Photographer, Aperture & Co.",
    },
    stats: [
      { label: "Inquiry-to-booked", value: "+49%" },
      { label: "Admin time", value: "-15 hrs/mo" },
      { label: "Print reorders", value: "+33%" },
    ],
    contact: {
      phone: "(615) 555-0182",
      address: "78 Music Sq, Nashville, TN",
      hours: "By appointment",
    },
  },
  {
    slug: "daycare",
    name: "Little Sprouts Daycare",
    niche: "Childcare & Daycare",
    logoEmoji: "\u{1F9F8}",
    tagline: "Enrollment made wonderfully simple.",
    heroSubtitle:
      "A warm, licensed daycare with online tour booking, automated enrollment follow-ups, and a family CRM parents trust.",
    cardSummary:
      "Daycare site with online tour booking, an enrollment-pipeline CRM, and automated parent reminders.",
    theme: {
      brand: "#f59e0b",
      brandFg: "#3b2410",
      soft: "#fff5e0",
      accent: "#22c55e",
      ink: "#4a2e0a",
      displayFont: "Fraunces",
      sansFont: "Nunito",
    },
    demoLayout: "split",
    services: [
      { name: "Infant Care", description: "Nurturing care for 6 weeks-12 months.", price: 0 },
      { name: "Toddler Program", description: "Play-based learning for ages 1-3.", price: 0 },
      { name: "Preschool (Pre-K)", description: "Kindergarten-readiness curriculum.", price: 0 },
      { name: "Schedule a Tour", description: "Visit our space and meet our teachers.", price: 0 },
      { name: "Summer Camp", description: "Themed weekly summer adventures.", price: 0 },
    ],
    features: [
      "Online tour booking and waitlist",
      "Enrollment-pipeline CRM",
      "Automated parent reminders and updates",
      "Program pages and daily-schedule info",
      "Secure enrollment forms",
      "Photo updates and newsletter sign-up",
    ],
    automations: [
      {
        icon: "\u{1F4C5}",
        title: "Tour scheduling",
        description: "Parents book a tour online and get instant confirmation plus a friendly reminder.",
        benefit: "More tours booked and fewer missed visits.",
      },
      {
        icon: "\u{1F5C2}\uFE0F",
        title: "Enrollment CRM",
        description: "Families move through Inquiry, Toured, Waitlist, and Enrolled with automated follow-ups.",
        benefit: "Fills spots faster and keeps the waitlist warm.",
      },
      {
        icon: "\u{1F4F8}",
        title: "Daily parent updates",
        description: "Automated photo and activity recaps reassure parents during the day.",
        benefit: "Builds trust and standout word-of-mouth.",
      },
      {
        icon: "\u{1F4B3}",
        title: "Tuition & form reminders",
        description: "Gently reminds families about payments and required forms.",
        benefit: "Less awkward chasing and cleaner records.",
      },
    ],
    demoAutomations: ["booking", "crm"],
    bookingChannel: "SMS",
    bookingCtaLabel: "Schedule a tour",
    crmStages: ["Inquiry", "Toured", "Waitlist", "Enrolled"],
    crmLeads: [
      { name: "Baby Theo R.", detail: "Infant Care", value: "Fall start", channel: "Web form" },
      { name: "Mia S. (age 3)", detail: "Preschool tour", value: "Pre-K", channel: "SMS" },
    ],
    currency: "$",
    testimonial: {
      quote:
        "The tour booking and follow-ups filled our waitlist. Parents love the daily photo updates too.",
      author: "Karen Doyle",
      role: "Director, Little Sprouts",
    },
    stats: [
      { label: "Tours booked", value: "+66%" },
      { label: "Waitlist", value: "Full" },
      { label: "Parent rating", value: "4.9\u2605" },
    ],
    contact: {
      phone: "(651) 555-0139",
      address: "240 Grand Ave, St. Paul, MN",
      hours: "Mon-Fri 6:30am-6pm",
    },
  },
  {
    slug: "plumber-electrician",
    name: "BlueLine Plumbing & Electric",
    niche: "Plumber & Electrician",
    logoEmoji: "\u{1F6E0}\uFE0F",
    tagline: "Help dispatched, estimates instant.",
    heroSubtitle:
      "Licensed plumbing and electrical with online service requests, upfront digital estimates, and same-day dispatch confirmations.",
    cardSummary:
      "Home-services site with online service requests, instant flat-rate estimates, and dispatch confirmations.",
    theme: {
      brand: "#1d4ed8",
      brandFg: "#ffffff",
      soft: "#e6edff",
      accent: "#f59e0b",
      ink: "#0a1633",
      displayFont: "Archivo",
      sansFont: "Inter",
    },
    demoLayout: "centered",
    services: [
      { name: "Drain Cleaning", description: "Clear clogs and slow drains.", price: 149 },
      { name: "Water Heater Repair", description: "Diagnose and fix or replace.", price: 220 },
      { name: "Panel/Outlet Service", description: "Electrical panel and outlet work.", price: 185 },
      { name: "Leak Detection", description: "Locate and assess hidden leaks.", price: 129 },
      { name: "Emergency Call-Out", description: "24/7 urgent dispatch.", price: 95 },
    ],
    features: [
      "Online service requests with photos",
      "Instant flat-rate estimates",
      "Same-day dispatch confirmations",
      "Technician arrival-window texts",
      "Itemized digital invoices",
      "Reviews, licensing, and warranty info",
    ],
    automations: [
      {
        icon: "\u{1F4F2}",
        title: "Dispatch confirmations",
        description: "Confirms the job and texts a technician name and arrival window instantly.",
        benefit: "Customers feel safe and informed before the truck arrives.",
      },
      {
        icon: "\u{1F9FE}",
        title: "Instant flat-rate estimates",
        description: "Generates upfront pricing from the selected service so there are no surprises.",
        benefit: "Wins trust and books more jobs on the spot.",
      },
      {
        icon: "\u{1F6A8}",
        title: "Emergency triage routing",
        description: "Flags urgent requests and routes them to the on-call tech immediately.",
        benefit: "Captures high-value emergency calls 24/7.",
      },
      {
        icon: "\u{1F501}",
        title: "Maintenance reminders",
        description: "Reminds customers about water-heater flushes and safety inspections.",
        benefit: "Turns one-off jobs into ongoing relationships.",
      },
    ],
    demoAutomations: ["booking", "receipt"],
    bookingChannel: "SMS",
    bookingCtaLabel: "Request service",
    crmStages: ["Request", "Dispatched", "On site", "Complete"],
    crmLeads: [
      { name: "Gantz residence", detail: "Water Heater Repair", value: "$220", channel: "Web form" },
      { name: "Oak St Cafe", detail: "Panel/Outlet Service", value: "$185", channel: "Phone" },
    ],
    currency: "$",
    testimonial: {
      quote:
        "Upfront estimates and dispatch texts set us apart. Customers book us over the big franchises now.",
      author: "Ray Donnelly",
      role: "Owner, BlueLine Plumbing & Electric",
    },
    stats: [
      { label: "Booked-on-quote", value: "+57%" },
      { label: "Emergency capture", value: "24/7" },
      { label: "Avg. rating", value: "4.9\u2605" },
    ],
    contact: {
      phone: "(702) 555-0110",
      address: "560 Fremont St, Las Vegas, NV",
      hours: "24/7 emergency service",
    },
  },
];

export function getBusiness(slug: string): Business | undefined {
  return businesses.find((b) => b.slug === slug);
}

export function getAllSlugs(): string[] {
  return businesses.map((b) => b.slug);
}
```

---

*End of `code_change.md` — all 21 project files included.*

