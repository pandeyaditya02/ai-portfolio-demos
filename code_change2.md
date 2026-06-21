# Code Changes 2 — Premium "Pawsome" Experience

This documents **only the changes made after the `code_change.md` snapshot**. It covers the bespoke, Awwwards-grade redesign of the Pawsome Grooming Co. demo (`/demo/pet-care`) and the switch from a CDN motion stack to bundled npm dependencies (GSAP + ScrollTrigger + Lenis).

Nothing already present in `code_change.md` is repeated here.

## Summary of changes

| File | Type | What changed |
|---|---|---|
| `package.json` | modified | Added `gsap` and `lenis` dependencies |
| `app/layout.tsx` | modified | Added the **Bricolage Grotesque** display font |
| `app/demo/[slug]/page.tsx` | modified | Route `pet-care` to the bespoke `PawsomeExperience` |
| `app/globals.css` | modified | Added Lenis smooth-scroll CSS + the scoped `.pawsome` design system |
| `components/pawsome/motion.ts` | new | Typed, SSR-safe dynamic-import loader for GSAP + ScrollTrigger + Lenis |
| `components/pawsome/data.ts` | new | Gallery, services, story, stats, marquee content |
| `components/pawsome/PawsomeBooking.tsx` | new | Dark/glass interactive WhatsApp booking demo |
| `components/pawsome/Sections.tsx` | new | All premium sections + SVG distortion filter |
| `components/pawsome/PawsomeExperience.tsx` | new | Orchestrator: preloader, cursor, Lenis + GSAP, transitions |

> Note: an interim `components/pawsome/scriptLoader.ts` (CDN loader) was created during this work and then **replaced** by `components/pawsome/motion.ts` (npm imports). The final state contains only `motion.ts`, so the CDN loader is not documented here.

---

## A. Modified files

### `package.json` — add motion dependencies

```diff
   "dependencies": {
+    "gsap": "^3.12.5",
+    "lenis": "^1.1.14",
     "next": "14.2.5",
     "react": "^18.3.1",
     "react-dom": "^18.3.1"
   },
```

### `app/layout.tsx` — add the Bricolage Grotesque display font

```diff
   "Nunito:wght@400;500;600;700;800",
+  "Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800",
   "Playfair+Display:wght@400;500;600;700;800",
   "Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700",
```

### `app/demo/[slug]/page.tsx` — route `pet-care` to the bespoke experience

```diff
 import { DemoHero } from "@/components/demo/DemoHero";
 import { AutomationShowcase } from "@/components/demo/AutomationShowcase";
+import { PawsomeExperience } from "@/components/pawsome/PawsomeExperience";
 import {
   AutomationList,
   DemoBanner,
   ...
 } from "@/components/demo/DemoSections";
```

```diff
 export default function DemoPage({ params }: { params: { slug: string } }) {
   const business = getBusiness(params.slug);
   if (!business) notFound();

+  // Pawsome Grooming ships a bespoke, Awwwards-grade experience.
+  if (business.slug === "pet-care") {
+    return <PawsomeExperience />;
+  }
+
   return (
     <div style={themeToStyle(business.theme)} className="bg-white font-sans text-gray-900">
```

### `app/globals.css` — added blocks (appended; nothing removed)

**1) Lenis smooth-scroll CSS (inserted right after the `html { ... }` rule):**

```css
/* Lenis smooth-scroll (only active on pages that initialize it) */
html.lenis,
html.lenis body {
  height: auto;
}
.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}
.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}
.lenis.lenis-stopped {
  overflow: hidden;
}
.lenis.lenis-smooth iframe {
  pointer-events: none;
}
```

**2) The scoped `.pawsome` design system (appended at end of file):**

```css
/* ============================================================
   PAWSOME — Awwwards-grade premium experience (scoped)
   ============================================================ */
.pawsome {
  --pw-ink: #07110f;
  --pw-bg: #050a09;
  --pw-cream: #f4efe6;
  --pw-teal: #0ea5a4;
  --pw-teal-deep: #0a6f6e;
  --pw-amber: #f5a524;
  --pw-pink: #ff7a9c;
  --pw-display: "Bricolage Grotesque", "Fraunces", Georgia, serif;
  --pw-serif: "Fraunces", Georgia, serif;
  --pw-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;

  background: var(--pw-bg);
  color: var(--pw-cream);
  font-family: var(--pw-sans);
  overflow-x: hidden;
}

/* Hide native cursor on fine-pointer devices; custom cursor takes over */
@media (hover: hover) and (pointer: fine) {
  .pawsome,
  .pawsome a,
  .pawsome button {
    cursor: none;
  }
}

/* Custom cursor */
.pw-cursor,
.pw-cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;
  border-radius: 9999px;
  will-change: transform;
  mix-blend-mode: difference;
}
.pw-cursor {
  width: 40px;
  height: 40px;
  margin: -20px 0 0 -20px;
  border: 1.5px solid #fff;
  transition: width 0.28s ease, height 0.28s ease, margin 0.28s ease, background 0.28s ease;
}
.pw-cursor[data-variant="hover"] {
  width: 84px;
  height: 84px;
  margin: -42px 0 0 -42px;
  background: #fff;
}
.pw-cursor[data-variant="drag"] {
  width: 110px;
  height: 110px;
  margin: -55px 0 0 -55px;
  background: #fff;
}
.pw-cursor-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #07110f;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.pw-cursor[data-variant="drag"] .pw-cursor-label,
.pw-cursor[data-variant="hover"] .pw-cursor-label {
  opacity: 1;
}
.pw-cursor-dot {
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -3px;
  background: #fff;
}
@media (hover: none) {
  .pw-cursor,
  .pw-cursor-dot {
    display: none;
  }
}

/* Film grain overlay */
.pw-grain {
  position: fixed;
  inset: -50%;
  z-index: 60;
  pointer-events: none;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation: pw-grain 0.6s steps(2) infinite;
}
@keyframes pw-grain {
  0% { transform: translate(0, 0); }
  50% { transform: translate(-4%, 3%); }
  100% { transform: translate(3%, -2%); }
}

/* Soft mesh-gradient blobs */
.pw-blob {
  position: absolute;
  border-radius: 9999px;
  filter: blur(80px);
  opacity: 0.5;
  pointer-events: none;
  will-change: transform;
}

/* Glass card */
.pw-glass {
  background: rgba(244, 239, 230, 0.06);
  border: 1px solid rgba(244, 239, 230, 0.12);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* Form input (dark) */
.pw-input {
  width: 100%;
  border-radius: 14px;
  border: 1px solid rgba(244, 239, 230, 0.16);
  background: rgba(7, 17, 15, 0.5);
  padding: 0.7rem 0.9rem;
  font-size: 0.9rem;
  color: var(--pw-cream);
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.pw-input::placeholder { color: rgba(244, 239, 230, 0.35); }
.pw-input:focus {
  border-color: var(--pw-teal);
  box-shadow: 0 0 0 4px rgba(14, 165, 164, 0.18);
}
.pw-input[type="date"],
.pw-input[type="time"] { color-scheme: dark; }

/* Primary CTA pill */
.pw-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  border-radius: 9999px;
  background: var(--pw-cream);
  color: var(--pw-ink);
  padding: 1rem 1.8rem;
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  will-change: transform;
  transition: background 0.3s ease, color 0.3s ease;
}
.pw-cta:hover { background: var(--pw-amber); }
.pw-cta--ghost {
  background: transparent;
  color: var(--pw-cream);
  border: 1px solid rgba(244, 239, 230, 0.25);
}
.pw-cta--ghost:hover { background: rgba(244, 239, 230, 0.08); color: var(--pw-cream); }

/* Massive display type */
.pw-display {
  font-family: var(--pw-display);
  font-weight: 700;
  line-height: 0.92;
  letter-spacing: -0.03em;
}
.pw-serif {
  font-family: var(--pw-serif);
}
.pw-h-mega {
  font-size: clamp(3.2rem, 15vw, 14rem);
}
.pw-h-xl {
  font-size: clamp(2.4rem, 7vw, 6rem);
}

/* Reveal primitives (GSAP toggles these; CSS provides graceful base) */
.pw-reveal { opacity: 0; transform: translateY(40px); }
.pw-line-mask { overflow: hidden; display: block; }
.pw-line { display: block; transform: translateY(110%); }
.is-ready .pw-reveal { opacity: 1; transform: none; }
/* Fallback: if GSAP/CDN is unavailable, ensure masked lines are still visible */
.is-ready .pw-line { transform: none; }

/* Marquee */
.pw-marquee {
  display: flex;
  width: max-content;
  will-change: transform;
  animation: pw-marquee 28s linear infinite;
}
.pw-marquee--rev { animation-direction: reverse; }
@keyframes pw-marquee {
  to { transform: translateX(-50%); }
}

/* Horizontal gallery track */
.pw-h-track {
  display: flex;
  gap: 2vw;
  padding: 0 8vw;
  will-change: transform;
}

/* Image distortion wrapper */
.pw-distort img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: url(#pw-displace);
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.pw-distort:hover img { transform: scale(1.06); }
.pw-img-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
}

/* Page transition wipe */
.pw-wipe {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: var(--pw-teal-deep);
  transform: scaleY(0);
  transform-origin: bottom;
  pointer-events: none;
}

/* Preloader */
.pw-preloader {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 8vw;
  background: var(--pw-bg);
  color: var(--pw-cream);
}

@media (prefers-reduced-motion: reduce) {
  .pw-marquee,
  .pw-grain { animation: none; }
  .pw-reveal { opacity: 1; transform: none; }
  .pw-line { transform: none; }
}
```

---

## B. New files

### `components/pawsome/motion.ts`

```ts
/**
 * Motion stack for the Pawsome experience.
 *
 * GSAP + ScrollTrigger + Lenis are bundled via npm (see package.json) and
 * pulled in with client-side dynamic imports so they never run during SSR and
 * are code-split out of the initial bundle. Fully typed, no CDN dependency.
 */
import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

export type MotionLibs = {
  gsap: typeof GsapType;
  ScrollTrigger: typeof ScrollTriggerType;
  Lenis: typeof Lenis;
};

let cached: Promise<MotionLibs | null> | null = null;

/** Load GSAP + ScrollTrigger + Lenis on the client and register the plugin. */
export function loadMotionLibs(): Promise<MotionLibs | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (cached) return cached;

  cached = (async () => {
    try {
      const [gsapMod, scrollTriggerMod, lenisMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      const gsap = gsapMod.gsap ?? gsapMod.default;
      const ScrollTrigger = scrollTriggerMod.ScrollTrigger ?? scrollTriggerMod.default;
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger, Lenis: lenisMod.default };
    } catch {
      return null;
    }
  })();

  return cached;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
```

### `components/pawsome/data.ts`

```ts
export type GalleryItem = {
  title: string;
  tag: string;
  emoji: string;
  image: string;
};

/** Unsplash imagery with graceful gradient+emoji fallback if a photo 404s. */
export const gallery: GalleryItem[] = [
  {
    title: "The Full Groom",
    tag: "Signature",
    emoji: "\u{1F436}",
    image:
      "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Spa & Bath",
    tag: "Relax",
    emoji: "\u{1F6C1}",
    image:
      "https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Puppy's First Cut",
    tag: "Gentle",
    emoji: "\u{1F415}",
    image:
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Daycare Play",
    tag: "Social",
    emoji: "\u{1F9B4}",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Overnight Suite",
    tag: "Boarding",
    emoji: "\u{1F31B}",
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Style & Finish",
    tag: "Glow up",
    emoji: "\u2728",
    image:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1100&q=80",
  },
];

export const storyLines: string[] = [
  "We treat every pup",
  "like the main character.",
  "Booked in seconds, pampered for hours,",
  "and home looking unreasonably good.",
];

export const services = [
  {
    no: "01",
    name: "Full Groom & Style",
    price: "$75",
    desc: "Bath, breed-specific cut, nail trim, ear clean, and a blow-dry finish.",
  },
  {
    no: "02",
    name: "Spa Bath & Tidy",
    price: "$45",
    desc: "Deep shampoo, brush-out, nail trim, and a signature cologne spritz.",
  },
  {
    no: "03",
    name: "Doggy Daycare",
    price: "$38",
    desc: "Supervised play, nap time, and real-time photo updates to your phone.",
  },
  {
    no: "04",
    name: "Overnight Boarding",
    price: "$65",
    desc: "Private cozy suite, two walks a day, and bedtime treats. Sleep easy.",
  },
];

export const stats = [
  { value: 12000, suffix: "+", label: "Happy tails groomed" },
  { value: 62, suffix: "%", label: "Fewer no-shows" },
  { value: 4.9, suffix: "\u2605", label: "Average rating", decimals: 1 },
  { value: 30, suffix: "s", label: "To book online" },
];

export const marqueeWords = [
  "Grooming",
  "Daycare",
  "Boarding",
  "Spa",
  "Styling",
  "Nails",
  "Bath",
  "Cuddles",
];
```

### `components/pawsome/PawsomeBooking.tsx`

```tsx
"use client";

import { useState } from "react";

type Status = "idle" | "typing" | "sent";

const SERVICES = [
  "Full Groom & Style",
  "Spa Bath & Tidy",
  "Doggy Daycare",
  "Overnight Boarding",
];

export function PawsomeBooking() {
  const [pet, setPet] = useState("");
  const [service, setService] = useState(SERVICES[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const canSubmit = pet.trim() && date && time && status === "idle";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("typing");
    window.setTimeout(() => setStatus("sent"), 1500);
  }

  function reset() {
    setStatus("idle");
    setPet("");
    setDate("");
    setTime("");
  }

  const prettyDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      {/* Form */}
      <form onSubmit={submit} className="pw-glass rounded-[28px] p-7 sm:p-9">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--pw-amber)]">
          Live booking demo
        </div>
        <h3 className="pw-serif mt-3 text-3xl font-semibold text-[var(--pw-cream)]">
          Reserve a pamper session
        </h3>

        <div className="mt-7 space-y-4">
          <PwField label="Pet's name">
            <input
              value={pet}
              onChange={(e) => setPet(e.target.value)}
              placeholder="Bailey"
              className="pw-input"
            />
          </PwField>

          <PwField label="Service">
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="pw-input"
            >
              {SERVICES.map((s) => (
                <option key={s} className="text-black">
                  {s}
                </option>
              ))}
            </select>
          </PwField>

          <div className="grid grid-cols-2 gap-4">
            <PwField label="Date">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pw-input"
              />
            </PwField>
            <PwField label="Time">
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="pw-input"
              />
            </PwField>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            data-magnetic
            className="pw-cta mt-2 w-full justify-center disabled:opacity-40"
          >
            {status === "idle" ? "Confirm booking" : "Booking confirmed"}
          </button>
          {status === "sent" && (
            <button
              type="button"
              onClick={reset}
              className="w-full text-center text-sm text-[var(--pw-cream)]/50 hover:text-[var(--pw-cream)]"
            >
              Run it again
            </button>
          )}
        </div>
      </form>

      {/* Phone */}
      <div className="flex justify-center">
        <div className="w-full max-w-[320px] rounded-[2.6rem] border border-white/10 bg-black/60 p-3 shadow-2xl backdrop-blur">
          <div className="overflow-hidden rounded-[2rem] bg-[#0b1413]">
            <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-lg">
                {"\u{1F436}"}
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-white">Pawsome Grooming</div>
                <div className="text-[11px] text-white/60">WhatsApp Business</div>
              </div>
            </div>

            <div className="flex min-h-[300px] flex-col gap-2 p-4">
              {status === "idle" && (
                <p className="m-auto max-w-[80%] text-center text-xs text-white/40">
                  Confirm a booking and the AI flow sends an instant WhatsApp message.
                </p>
              )}
              {status !== "idle" && (
                <div className="self-center rounded-full bg-white/10 px-3 py-1 text-[10px] text-white/50">
                  {prettyDate} &middot; {time}
                </div>
              )}
              {status === "typing" && (
                <div className="flex w-14 items-center gap-1 self-end rounded-2xl rounded-br-sm bg-[#dcf8c6] px-3 py-3">
                  <Dot /> <Dot /> <Dot />
                </div>
              )}
              {status === "sent" && (
                <>
                  <Bubble>
                    <p className="font-semibold">Hi! {"\u{1F436}"} You&rsquo;re all set.</p>
                    <p className="mt-1">
                      <b>{pet || "Your pup"}</b> is booked for <b>{service}</b> on{" "}
                      <b>
                        {prettyDate}, {time}
                      </b>
                      .
                    </p>
                    <p className="mt-1">284 Marina Blvd, San Francisco</p>
                    <Meta />
                  </Bubble>
                  <Bubble delay>
                    <p>We&rsquo;ll send a reminder 24h before. Treats are on us {"\u{1F9B4}"}</p>
                    <Meta />
                  </Bubble>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PwField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--pw-cream)]/45">
        {label}
      </span>
      {children}
    </label>
  );
}

function Bubble({ children, delay }: { children: React.ReactNode; delay?: boolean }) {
  return (
    <div
      className={`max-w-[85%] animate-fade-up self-end rounded-2xl rounded-br-sm bg-[#dcf8c6] px-3 py-2 text-[12px] leading-snug text-gray-800 ${delay ? "[animation-delay:250ms]" : ""}`}
    >
      {children}
    </div>
  );
}

function Meta() {
  return (
    <span className="mt-1 block text-right text-[9px] text-gray-500">
      sent automatically &middot; WhatsApp {"\u2713\u2713"}
    </span>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-500" />;
}
```

### `components/pawsome/Sections.tsx`

```tsx
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
    <section id="gallery" className="pw-gallery relative h-[100svh] overflow-hidden">
      <div className="absolute left-6 top-24 z-10 sm:left-10">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--pw-amber)]">The gallery</p>
        <h2 className="pw-display pw-h-xl mt-2 text-[var(--pw-cream)]">Glow ups</h2>
      </div>
      <div className="flex h-full items-center">
        <div className="pw-h-track h-[62vh]">
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
```

### `components/pawsome/PawsomeExperience.tsx`

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { loadMotionLibs, prefersReducedMotion } from "./motion";
import {
  PwAutomation,
  PwCta,
  PwGallery,
  PwHero,
  PwMarquee,
  PwNav,
  PwServices,
  PwStats,
  PwStory,
  PwSvgDefs,
  PwTestimonial,
} from "./Sections";

export function PawsomeExperience() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<any>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  /* ----- Custom cursor + magnetic + page intro + scroll animations ----- */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = prefersReducedMotion();
    const cleanups: Array<() => void> = [];
    let rafId = 0;
    let counterTimer = 0;
    let cancelled = false;

    /* --- Custom cursor (lerp follow, independent of GSAP) --- */
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
        if (t.closest(".pw-distort")) setVariant("drag", "View");
        else if (t.closest("a, button, [data-magnetic]")) setVariant("hover", "");
        else setVariant("", "");
      };
      document.addEventListener("mouseover", onOver);
      cleanups.push(() => {
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseover", onOver);
      });
    }

    /* --- Preloader counter --- */
    if (counterRef.current && !reduced) {
      let n = 0;
      counterTimer = window.setInterval(() => {
        n = Math.min(100, n + Math.ceil(Math.random() * 9));
        if (counterRef.current) counterRef.current.textContent = String(n);
        if (n >= 100) window.clearInterval(counterTimer);
      }, 90);
    }

    let lenis: any = null;

    const init = async () => {
      const libs = reduced ? null : await loadMotionLibs();
      if (cancelled) return;
      const gsap = libs?.gsap;
      const ScrollTrigger = libs?.ScrollTrigger;
      gsapRef.current = gsap ?? null;

      /* Magnetic buttons (uses GSAP when available) */
      const magnets = Array.from(root.querySelectorAll<HTMLElement>("[data-magnetic]"));
      magnets.forEach((el) => {
        const strength = 0.4;
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width / 2)) * strength;
          const y = (e.clientY - (r.top + r.height / 2)) * strength;
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

      /* Image distortion hover (shared SVG filter) */
      const dispMap = document.getElementById("pw-displace-map");
      if (gsap && dispMap) {
        root.querySelectorAll<HTMLElement>(".pw-distort").forEach((card) => {
          const enter = () => gsap.to(dispMap, { attr: { scale: 26 }, duration: 0.5, ease: "power2.out" });
          const leave = () => gsap.to(dispMap, { attr: { scale: 0 }, duration: 0.7, ease: "power2.out" });
          card.addEventListener("mouseenter", enter);
          card.addEventListener("mouseleave", leave);
          cleanups.push(() => {
            card.removeEventListener("mouseenter", enter);
            card.removeEventListener("mouseleave", leave);
          });
        });
      }

      /* Lift preloader, then run hero intro */
      const liftPreloader = () => {
        const pl = preloaderRef.current;
        if (!pl) return;
        if (gsap) {
          gsap.to(pl, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
            onComplete: () => (pl.style.display = "none"),
          });
        } else {
          pl.style.display = "none";
        }
      };

      // ensure the counter has reached 100 before lifting
      const minDelay = reduced ? 0 : 700;
      await new Promise((r) => window.setTimeout(r, minDelay));
      if (cancelled) return;
      liftPreloader();
      root.classList.add("is-ready");

      if (!gsap || !ScrollTrigger) return; // CSS fallbacks already show content

      /* Smooth scroll (Lenis) */
      if (libs?.Lenis) {
        lenis = new libs.Lenis({ lerp: 0.1, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);
        const rafCb = (t: number) => lenis.raf(t * 1000);
        gsap.ticker.add(rafCb);
        gsap.ticker.lagSmoothing(0);
        cleanups.push(() => gsap.ticker.remove(rafCb));
      }

      const ctx = gsap.context(() => {
        /* Hero intro */
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .from(".pw-hero-letter", { yPercent: 120, opacity: 0, duration: 1, stagger: 0.06 })
          .from(".pw-hero-sub", { y: 30, opacity: 0, duration: 0.9, stagger: 0.12 }, "-=0.6");

        /* Masked line reveals */
        gsap.utils.toArray<HTMLElement>("[data-lines]").forEach((group) => {
          gsap.from(group.querySelectorAll(".pw-line"), {
            yPercent: 110,
            duration: 1,
            ease: "power4.out",
            stagger: 0.12,
            scrollTrigger: { trigger: group, start: "top 78%" },
          });
        });

        /* Generic reveal */
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 48,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });

        /* Parallax blobs / cards */
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = parseFloat(el.dataset.speed || "0.3");
          gsap.to(el, {
            yPercent: speed * 60,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });

        /* Counters */
        gsap.utils.toArray<HTMLElement>(".pw-counter").forEach((el) => {
          const value = parseFloat(el.dataset.value || "0");
          const decimals = parseInt(el.dataset.decimals || "0", 10);
          const suffix = el.dataset.suffix || "";
          const obj = { v: 0 };
          gsap.to(obj, {
            v: value,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            onUpdate: () => {
              const n = decimals > 0 ? obj.v.toFixed(decimals) : Math.round(obj.v).toLocaleString();
              el.textContent = `${n}${suffix}`;
            },
          });
        });

        /* Horizontal pinned gallery */
        const track = root.querySelector<HTMLElement>(".pw-h-track");
        const galleryEl = root.querySelector<HTMLElement>(".pw-gallery");
        if (track && galleryEl) {
          const getScroll = () => track.scrollWidth - window.innerWidth + window.innerWidth * 0.08;
          gsap.to(track, {
            x: () => -getScroll(),
            ease: "none",
            scrollTrigger: {
              trigger: galleryEl,
              start: "top top",
              end: () => `+=${getScroll()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      }, root);

      cleanups.push(() => ctx.revert());

      // Refresh once images settle
      window.setTimeout(() => ScrollTrigger.refresh(), 400);
      window.addEventListener("load", () => ScrollTrigger.refresh());
    };

    init();

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (counterTimer) window.clearInterval(counterTimer);
      cleanups.forEach((fn) => fn());
      if (lenis) lenis.destroy();
    };
  }, []);

  /* ----- Page transition wipe on navigation ----- */
  const navigateWithWipe = (href: string) => {
    const wipe = wipeRef.current;
    const gsap = gsapRef.current;
    if (wipe && gsap && !prefersReducedMotion()) {
      gsap.set(wipe, { transformOrigin: "bottom", scaleY: 0 });
      gsap.to(wipe, {
        scaleY: 1,
        duration: 0.6,
        ease: "power4.inOut",
        onComplete: () => router.push(href),
      });
    } else {
      router.push(href);
    }
  };

  return (
    <div ref={rootRef} className="pawsome relative">
      {/* Preloader */}
      <div ref={preloaderRef} className="pw-preloader pw-display">
        <span className="text-2xl text-[var(--pw-cream)]/70">Pawsome&deg;</span>
        <span className="text-[18vw] leading-none text-[var(--pw-cream)] sm:text-[10vw]">
          <span ref={counterRef}>0</span>
          <span className="text-[var(--pw-amber)]">%</span>
        </span>
      </div>

      {/* Custom cursor */}
      {hydrated && (
        <>
          <div ref={cursorRef} className="pw-cursor" data-variant="">
            <span ref={labelRef} className="pw-cursor-label" />
          </div>
          <div ref={dotRef} className="pw-cursor-dot" />
        </>
      )}

      {/* Page transition + grain + SVG defs */}
      <div ref={wipeRef} className="pw-wipe" />
      <div className="pw-grain" />
      <PwSvgDefs />

      {/* Content */}
      <PwNav onBack={() => navigateWithWipe("/")} />
      <main>
        <PwHero />
        <PwMarquee />
        <PwStory />
        <PwServices />
        <PwGallery />
        <PwStats />
        <PwAutomation />
        <PwTestimonial />
        <PwCta onBack={() => navigateWithWipe("/")} />
      </main>
    </div>
  );
}
```

---

*End of `code_changes2.md` — delta after `code_change.md`: 4 modified files, 5 new files.*
