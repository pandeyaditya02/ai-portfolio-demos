# Code Change 5 — Bright Smile Dental bespoke experience (delta after code_change4.md)

A world-class, light/clinical-luxury experience for the Bright Smile Dental demo at `/demo/dentist` (tonal opposite of the dark Pawsome build). Only changes **after `code_change4.md`** are shown here. Reuses the shared `components/pawsome/motion.ts` loader for GSAP + ScrollTrigger + Lenis.

## Summary

| File | Type | Change |
|---|---|---|
| `app/layout.tsx` | modified | Added the Instrument Serif accent font |
| `app/demo/[slug]/page.tsx` | modified | Route `dentist` to `BrightSmileExperience` |
| `app/globals.css` | modified | Appended the scoped `.bsd` design system |
| `components/brightsmile/data.ts` | new | Journey, services, stats, faqs, testimonial, content |
| `components/brightsmile/BrightBooking.tsx` | new | Booking+SMS / Patient CRM interactive demo |
| `components/brightsmile/Sections.tsx` | new | All bespoke sections (incl. before/after slider, pinned journey, FAQ) |
| `components/brightsmile/BrightSmileExperience.tsx` | new | Orchestrator: preloader, cursor, Lenis+GSAP, smile line-draw, transitions |

---

## A. Modified files

### `app/layout.tsx` — add Instrument Serif

```diff
   "Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800",
+  "Instrument+Serif:ital@0;1",
   "Playfair+Display:wght@400;500;600;700;800",
```

### `app/demo/[slug]/page.tsx` — route the dentist demo

```diff
 import { PawsomeExperience } from "@/components/pawsome/PawsomeExperience";
+import { BrightSmileExperience } from "@/components/brightsmile/BrightSmileExperience";
```

```diff
   // Pawsome Grooming ships a bespoke, Awwwards-grade experience.
   if (business.slug === "pet-care") {
     return <PawsomeExperience />;
   }

+  // Bright Smile Dental ships its own bespoke, light-themed experience.
+  if (business.slug === "dentist") {
+    return <BrightSmileExperience />;
+  }
+
   return (
```

### `app/globals.css` — appended scoped `.bsd` design system

```css
/* ============================================================
   BRIGHT SMILE DENTAL — clinical-luxury light experience (scoped)
   ============================================================ */
.bsd {
  --bsd-bg: #eef3fb;
  --bsd-surface: #ffffff;
  --bsd-ink: #0a1830;
  --bsd-muted: #5b6b86;
  --bsd-blue: #2f6bff;
  --bsd-blue-deep: #1b3aa0;
  --bsd-mint: #15c5c5;
  --bsd-amber: #ffb020;
  --bsd-display: "Sora", ui-sans-serif, system-ui, sans-serif;
  --bsd-serif: "Instrument Serif", Georgia, serif;
  --bsd-sans: "Inter", ui-sans-serif, system-ui, sans-serif;

  position: relative;
  background: var(--bsd-bg);
  color: var(--bsd-ink);
  font-family: var(--bsd-sans);
  overflow-x: hidden;
}

@media (hover: hover) and (pointer: fine) {
  .bsd,
  .bsd a,
  .bsd button {
    cursor: none;
  }
}

/* Custom cursor (white + difference blend so it stays visible on light
   sections and the dark journey alike) */
.bsd-cursor,
.bsd-cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;
  border-radius: 9999px;
  will-change: transform;
  mix-blend-mode: difference;
}
.bsd-cursor {
  width: 36px;
  height: 36px;
  margin: -18px 0 0 -18px;
  border: 1.5px solid #fff;
  transition: width 0.28s ease, height 0.28s ease, margin 0.28s ease,
    background 0.28s ease, border-color 0.28s ease;
}
.bsd-cursor[data-variant="hover"] {
  width: 76px;
  height: 76px;
  margin: -38px 0 0 -38px;
  background: #fff;
}
.bsd-cursor[data-variant="drag"] {
  width: 108px;
  height: 108px;
  margin: -54px 0 0 -54px;
  background: #fff;
}
.bsd-cursor-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0a1830;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.bsd-cursor[data-variant="hover"] .bsd-cursor-label,
.bsd-cursor[data-variant="drag"] .bsd-cursor-label {
  opacity: 1;
}
.bsd-cursor-dot {
  width: 5px;
  height: 5px;
  margin: -2.5px 0 0 -2.5px;
  background: #fff;
}
@media (hover: none) {
  .bsd-cursor,
  .bsd-cursor-dot {
    display: none;
  }
}

/* Soft mesh-gradient blobs */
.bsd-blob {
  position: absolute;
  border-radius: 9999px;
  filter: blur(90px);
  opacity: 0.55;
  pointer-events: none;
  will-change: transform;
}

/* Glass (light) */
.bsd-glass {
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 24px 60px -28px rgba(10, 24, 48, 0.28);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

/* Buttons */
.bsd-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  border-radius: 9999px;
  background: var(--bsd-ink);
  color: #fff;
  padding: 0.95rem 1.7rem;
  font-size: 0.92rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  will-change: transform;
  transition: background 0.3s ease, color 0.3s ease;
}
.bsd-btn:hover { background: var(--bsd-blue); }
.bsd-btn--ghost {
  background: transparent;
  color: var(--bsd-ink);
  border: 1px solid rgba(10, 24, 48, 0.2);
}
.bsd-btn--ghost:hover { background: rgba(10, 24, 48, 0.05); color: var(--bsd-ink); }

/* Inputs */
.bsd-input {
  width: 100%;
  border-radius: 14px;
  border: 1px solid rgba(10, 24, 48, 0.14);
  background: rgba(255, 255, 255, 0.9);
  padding: 0.72rem 0.95rem;
  font-size: 0.9rem;
  color: var(--bsd-ink);
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.bsd-input::placeholder { color: rgba(91, 107, 134, 0.7); }
.bsd-input:focus {
  border-color: var(--bsd-blue);
  box-shadow: 0 0 0 4px rgba(47, 107, 255, 0.16);
}

/* Typography */
.bsd-display {
  font-family: var(--bsd-display);
  font-weight: 700;
  line-height: 0.94;
  letter-spacing: -0.035em;
}
.bsd-serif { font-family: var(--bsd-serif); font-weight: 400; }
.bsd-h-mega { font-size: clamp(3rem, 12vw, 11rem); }
.bsd-h-xl { font-size: clamp(2.2rem, 6.5vw, 5.5rem); }

/* Reveal + masked-line primitives */
.bsd-reveal { opacity: 0; transform: translateY(42px); }
.is-ready .bsd-reveal { opacity: 1; transform: none; }
.bsd-line-mask { overflow: hidden; display: block; }
.bsd-line { display: block; transform: translateY(115%); }
.is-ready .bsd-line { transform: none; }

/* SVG smile line-draw */
.bsd-arc {
  fill: none;
  stroke: var(--bsd-blue);
  stroke-width: 4;
  stroke-linecap: round;
}

/* Marquee (reuses pw-marquee keyframes) */
.bsd-marquee {
  display: flex;
  width: max-content;
  will-change: transform;
  animation: pw-marquee 32s linear infinite;
}

/* Journey (pinned horizontal chapters) */
.bsd-journey-track {
  display: flex;
  height: 100%;
  will-change: transform;
}
.bsd-progress {
  transform-origin: left center;
  transform: scaleX(0);
}

/* Before / after smile slider */
.bsd-ba {
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  user-select: none;
  touch-action: none;
}
.bsd-ba__layer {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}
.bsd-ba__before { filter: grayscale(0.85) brightness(0.82) contrast(0.95); }
.bsd-ba__after {
  filter: saturate(1.12) brightness(1.05);
  clip-path: inset(0 0 0 50%);
}
.bsd-ba__handle {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background: #fff;
  box-shadow: 0 0 0 1px rgba(10, 24, 48, 0.15);
  transform: translateX(-1px);
}
.bsd-ba__grip {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 54px;
  height: 54px;
  transform: translate(-50%, -50%);
  border-radius: 9999px;
  background: #fff;
  box-shadow: 0 10px 30px -8px rgba(10, 24, 48, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: var(--bsd-ink);
}
.bsd-ba__tag {
  position: absolute;
  bottom: 16px;
  padding: 6px 12px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  backdrop-filter: blur(6px);
}

/* FAQ accordion */
.bsd-faq__a {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}
.bsd-faq[data-open="true"] .bsd-faq__a { grid-template-rows: 1fr; }
.bsd-faq__inner { overflow: hidden; }
.bsd-faq__icon { transition: transform 0.4s ease; }
.bsd-faq[data-open="true"] .bsd-faq__icon { transform: rotate(45deg); }

/* Preloader */
.bsd-preloader {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  background: var(--bsd-bg);
  color: var(--bsd-ink);
}
.bsd-preloader__bar {
  width: min(240px, 60vw);
  height: 2px;
  background: rgba(10, 24, 48, 0.12);
  overflow: hidden;
  border-radius: 9999px;
}
.bsd-preloader__fill {
  display: block;
  height: 100%;
  width: 0%;
  background: var(--bsd-blue);
}

/* Page transition wipe */
.bsd-wipe {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: var(--bsd-ink);
  transform: scaleY(0);
  transform-origin: bottom;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .bsd-marquee { animation: none; }
  .bsd-reveal { opacity: 1; transform: none; }
  .bsd-line { transform: none; }
}
```

---

## B. New files

### `components/brightsmile/data.ts`

```ts
export const journey = [
  {
    no: "01",
    title: "Book in 30 seconds",
    desc: "Pick a time online. No phone tag, no hold music. A confirmation lands on your phone instantly.",
  },
  {
    no: "02",
    title: "Walk in calm",
    desc: "Smart intake means we already know your story. Warm towels, noise-cancelling headphones, zero clipboard.",
  },
  {
    no: "03",
    title: "Painless, precise care",
    desc: "Digital scans, gentle hands, and a plan you actually understand. Most visits end early.",
  },
  {
    no: "04",
    title: "Leave glowing",
    desc: "An itemized summary and your next reminder are already scheduled before you reach the car.",
  },
];

export const services = [
  {
    no: "01",
    name: "New Patient Exam",
    price: "$129",
    desc: "Comprehensive exam, low-radiation digital X-rays, and a plain-language treatment plan.",
  },
  {
    no: "02",
    name: "Hygiene & Cleaning",
    price: "$110",
    desc: "Scale, polish, and fluoride with a hygienist who never rushes.",
  },
  {
    no: "03",
    name: "Teeth Whitening",
    price: "$320",
    desc: "In-office whitening, up to eight shades brighter in a single visit.",
  },
  {
    no: "04",
    name: "Invisalign",
    price: "Free consult",
    desc: "3D scan and a custom clear-aligner roadmap to a straighter smile.",
  },
  {
    no: "05",
    name: "Emergency Visit",
    price: "$95",
    desc: "Same-day relief for pain, chips, and lost fillings. We keep slots open daily.",
  },
];

export const stats = [
  { value: 3, prefix: "<", suffix: "%", label: "No-show rate" },
  { value: 38, prefix: "+", suffix: "%", label: "New patients" },
  { value: 12, suffix: "k", label: "Smiles cared for" },
  { value: 4.9, suffix: "\u2605", label: "Average rating", decimals: 1 },
];

export const faqs = [
  {
    q: "Do you take my insurance?",
    a: "We work with most major PPO plans and file claims for you. Our team confirms your benefits before the visit, so there are no surprises.",
  },
  {
    q: "I'm anxious about the dentist. Can you help?",
    a: "Absolutely. Tell us during booking and we tailor the visit: numbing gel, headphones, sedation options, and a slower pace. Most nervous patients leave relaxed.",
  },
  {
    q: "How fast can I be seen?",
    a: "Routine visits are usually within the week, and we hold same-day slots for emergencies every single day.",
  },
  {
    q: "What does the first visit cost?",
    a: "A new-patient exam with digital X-rays is $129, and we'll quote any further care upfront before anything begins.",
  },
];

export const marqueeWords = [
  "Gentle",
  "Modern",
  "On-time",
  "Painless",
  "Precise",
  "Honest",
  "Calm",
];

/** Smile image for the before/after slider (graceful gradient fallback). */
export const transformationImage =
  "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1600&q=80";

export const testimonial = {
  quote: "The reminders and the calm made me actually look forward to the dentist. My no-show days are over.",
  author: "Marcus Reed",
  role: "Patient since 2023",
};
```

### `components/brightsmile/BrightBooking.tsx`

```tsx
"use client";

import { useState } from "react";

type Tab = "booking" | "crm";
type Status = "idle" | "typing" | "sent";

const TREATMENTS = ["New Patient Exam", "Hygiene & Cleaning", "Teeth Whitening", "Invisalign Consult", "Emergency Visit"];

type Lead = { id: number; name: string; detail: string; stage: number; fresh?: boolean };
const STAGES = ["New lead", "Contacted", "Booked", "Treated"];
const SEED: Lead[] = [
  { id: 1, name: "Marcus Reed", detail: "New Patient Exam", stage: 0 },
  { id: 2, name: "Priya Nair", detail: "Invisalign Consult", stage: 1 },
  { id: 3, name: "Tom Becker", detail: "Emergency Visit", stage: 2 },
];
const POOL = ["Alex Monroe", "Riley Chen", "Jamie Brooks", "Casey Flynn", "Dana Wells"];

export function BrightBooking() {
  const [tab, setTab] = useState<Tab>("booking");

  return (
    <div>
      <div className="mx-auto mb-10 flex max-w-sm rounded-full bg-white p-1.5 shadow-sm">
        <TabBtn active={tab === "booking"} onClick={() => setTab("booking")}>
          Booking + SMS
        </TabBtn>
        <TabBtn active={tab === "crm"} onClick={() => setTab("crm")}>
          Patient CRM
        </TabBtn>
      </div>
      {tab === "booking" ? <BookingPanel /> : <CrmPanel />}
    </div>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-magnetic
      className={`flex-1 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
        active ? "bg-[var(--bsd-ink)] text-white" : "text-[var(--bsd-muted)] hover:text-[var(--bsd-ink)]"
      }`}
    >
      {children}
    </button>
  );
}

/* -------------------------------- Booking -------------------------------- */

function BookingPanel() {
  const [name, setName] = useState("");
  const [treatment, setTreatment] = useState(TREATMENTS[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const canSubmit = name.trim() && date && time && status === "idle";
  const first = name.trim().split(" ")[0] || "there";
  const prettyDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
    : "";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("typing");
    window.setTimeout(() => setStatus("sent"), 1400);
  }

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <form onSubmit={submit} className="bsd-glass rounded-[28px] p-7 sm:p-9">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--bsd-blue)]">Live demo</div>
        <h3 className="bsd-serif mt-3 text-4xl text-[var(--bsd-ink)]">Request an appointment</h3>

        <div className="mt-7 space-y-4">
          <Field label="Full name">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jordan Smith" className="bsd-input" />
          </Field>
          <Field label="Treatment">
            <select value={treatment} onChange={(e) => setTreatment(e.target.value)} className="bsd-input">
              {TREATMENTS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Date">
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bsd-input" />
            </Field>
            <Field label="Time">
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="bsd-input" />
            </Field>
          </div>
          <button type="submit" disabled={!canSubmit} data-magnetic className="bsd-btn mt-2 w-full justify-center disabled:opacity-40">
            {status === "idle" ? "Request appointment" : "Appointment requested"}
          </button>
          {status === "sent" && (
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setName("");
                setDate("");
                setTime("");
              }}
              className="w-full text-center text-sm text-[var(--bsd-muted)] hover:text-[var(--bsd-ink)]"
            >
              Run it again
            </button>
          )}
        </div>
      </form>

      {/* phone */}
      <div className="flex justify-center">
        <div className="w-full max-w-[320px] rounded-[2.6rem] border border-black/5 bg-white p-3 shadow-2xl">
          <div className="overflow-hidden rounded-[2rem] bg-[#f4f6fb]">
            <div className="flex items-center justify-center border-b border-black/5 py-3 text-sm font-semibold text-[var(--bsd-ink)]">
              Messages
            </div>
            <div className="flex min-h-[300px] flex-col gap-2 p-4">
              {status === "idle" && (
                <p className="m-auto max-w-[80%] text-center text-xs text-[var(--bsd-muted)]">
                  Request a time and an automated SMS confirmation arrives instantly.
                </p>
              )}
              {status !== "idle" && (
                <div className="self-center rounded-full bg-black/5 px-3 py-1 text-[10px] text-[var(--bsd-muted)]">
                  {prettyDate} &middot; {time}
                </div>
              )}
              {status === "typing" && (
                <div className="flex w-14 items-center gap-1 self-start rounded-2xl rounded-bl-sm bg-white px-3 py-3 shadow-sm">
                  <Dot /> <Dot /> <Dot />
                </div>
              )}
              {status === "sent" && (
                <>
                  <SmsBubble>
                    <b>Bright Smile Dental</b>
                    <br />
                    Hi {first}, your {treatment} is confirmed for {prettyDate} at {time}. Reply C to reschedule.
                  </SmsBubble>
                  <SmsBubble delay>We&rsquo;ll text a reminder 48h before. See you soon! {"\u{1F9B7}"}</SmsBubble>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SmsBubble({ children, delay }: { children: React.ReactNode; delay?: boolean }) {
  return (
    <div
      className={`max-w-[85%] animate-fade-up self-start rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5 text-[12px] leading-snug text-[var(--bsd-ink)] shadow-sm ${
        delay ? "[animation-delay:220ms]" : ""
      }`}
    >
      {children}
    </div>
  );
}

/* ---------------------------------- CRM ---------------------------------- */

function CrmPanel() {
  const [leads, setLeads] = useState<Lead[]>(SEED);
  const [nextId, setNextId] = useState(SEED.length + 1);
  const [pool, setPool] = useState(0);

  function addLead() {
    const id = nextId;
    setLeads((l) => [...l, { id, name: POOL[pool % POOL.length], detail: "New inquiry", stage: 0, fresh: true }]);
    setNextId((n) => n + 1);
    setPool((p) => p + 1);
    window.setTimeout(() => setLeads((l) => l.map((x) => (x.id === id ? { ...x, fresh: false } : x))), 1000);
  }

  function advance(id: number) {
    setLeads((l) => l.map((x) => (x.id === id ? { ...x, stage: Math.min(x.stage + 1, STAGES.length - 1) } : x)));
  }

  return (
    <div className="bsd-glass rounded-[28px] p-5 sm:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="bsd-serif text-3xl text-[var(--bsd-ink)]">Patient pipeline</h3>
          <p className="text-sm text-[var(--bsd-muted)]">Every inquiry is captured and followed up automatically.</p>
        </div>
        <button type="button" onClick={addLead} data-magnetic className="bsd-btn !px-5 !py-2.5">
          + New lead
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {STAGES.map((stage, sIdx) => {
          const here = leads.filter((l) => l.stage === sIdx);
          return (
            <div key={stage} className="rounded-2xl bg-white/60 p-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wide text-[var(--bsd-muted)]">{stage}</span>
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--bsd-blue)] px-1.5 text-[11px] font-bold text-white">
                  {here.length}
                </span>
              </div>
              <div className="space-y-2">
                {here.map((card) => (
                  <div
                    key={card.id}
                    className={`rounded-xl border bg-white p-3 shadow-sm ${card.fresh ? "animate-fade-up ring-2 ring-[var(--bsd-blue)]" : "border-black/5"}`}
                  >
                    <div className="text-sm font-semibold text-[var(--bsd-ink)]">{card.name}</div>
                    <div className="mt-0.5 text-xs text-[var(--bsd-muted)]">{card.detail}</div>
                    {sIdx < STAGES.length - 1 && (
                      <button
                        type="button"
                        onClick={() => advance(card.id)}
                        className="mt-2 w-full rounded-lg border border-black/10 py-1 text-[11px] font-semibold text-[var(--bsd-muted)] transition hover:border-[var(--bsd-blue)] hover:text-[var(--bsd-blue)]"
                      >
                        Move to {STAGES[sIdx + 1]} &rarr;
                      </button>
                    )}
                  </div>
                ))}
                {here.length === 0 && <p className="py-4 text-center text-[11px] text-black/20">Empty</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------- helpers -------------------------------- */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--bsd-muted)]">{label}</span>
      {children}
    </label>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--bsd-muted)]" />;
}
```

### `components/brightsmile/Sections.tsx`

```tsx
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
```

### `components/brightsmile/BrightSmileExperience.tsx`

```tsx
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { loadMotionLibs, prefersReducedMotion } from "@/components/pawsome/motion";
import {
  BsdAutomation,
  BsdCta,
  BsdFaq,
  BsdHero,
  BsdJourney,
  BsdMarquee,
  BsdNav,
  BsdServices,
  BsdStats,
  BsdStory,
  BsdTestimonial,
  BsdTransformation,
} from "./Sections";

export function BrightSmileExperience() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<any>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = prefersReducedMotion();
    const cleanups: Array<() => void> = [];
    let rafId = 0;
    let fillTimer = 0;
    let cancelled = false;
    let lenis: any = null;

    /* Custom cursor (lerp follow) */
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
      const textSel =
        "h1, h2, h3, h4, h5, h6, p, span, li, blockquote, figcaption, em, b, strong, .bsd-display, .bsd-counter";
      const onOver = (e: MouseEvent) => {
        const t = e.target as HTMLElement;
        if (t.closest(".bsd-ba")) setVariant("drag", "Drag");
        else if (t.closest("a, button, [data-magnetic]")) setVariant("hover", "");
        else if (t.closest(textSel)) setVariant("hover", "");
        else setVariant("", "");
      };
      document.addEventListener("mouseover", onOver);
      cleanups.push(() => {
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseover", onOver);
      });
    }

    /* Preloader fill bar */
    if (fillRef.current && !reduced) {
      let n = 0;
      fillTimer = window.setInterval(() => {
        n = Math.min(100, n + Math.ceil(Math.random() * 8));
        if (fillRef.current) fillRef.current.style.width = `${n}%`;
        if (n >= 100) window.clearInterval(fillTimer);
      }, 80);
    }

    const init = async () => {
      const libs = reduced ? null : await loadMotionLibs();
      if (cancelled) return;
      const gsap = libs?.gsap;
      const ScrollTrigger = libs?.ScrollTrigger;
      gsapRef.current = gsap ?? null;

      /* Magnetic buttons */
      root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width / 2)) * 0.4;
          const y = (e.clientY - (r.top + r.height / 2)) * 0.4;
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
        if (gsap) gsap.to(pl, { autoAlpha: 0, duration: 0.8, ease: "power3.inOut", onComplete: () => (pl.style.display = "none") });
        else pl.style.display = "none";
      };

      await new Promise((r) => window.setTimeout(r, reduced ? 0 : 750));
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
        /* Hero intro + smile line-draw */
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from("[data-bsd-hero] .bsd-line", { yPercent: 115, duration: 1.1, stagger: 0.12 });
        tl.from(".bsd-hero-sub", { y: 30, opacity: 0, duration: 0.9, stagger: 0.1 }, "-=0.7");
        const arc = root.querySelector(".bsd-arc") as SVGPathElement | null;
        if (arc) {
          const len = arc.getTotalLength();
          gsap.set(arc, { strokeDasharray: len, strokeDashoffset: len });
          tl.to(arc, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, "-=0.8");
        }

        /* Masked line groups */
        gsap.utils.toArray<HTMLElement>("[data-bsd-lines]").forEach((group) => {
          gsap.from(group.querySelectorAll(".bsd-line"), {
            yPercent: 115,
            duration: 1,
            ease: "power4.out",
            stagger: 0.12,
            scrollTrigger: { trigger: group, start: "top 80%" },
          });
        });

        /* Generic reveals */
        gsap.utils.toArray<HTMLElement>("[data-bsd-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          });
        });

        /* Parallax blobs */
        gsap.utils.toArray<HTMLElement>("[data-bsd-parallax]").forEach((el) => {
          const speed = parseFloat(el.dataset.speed || "0.3");
          gsap.to(el, {
            yPercent: speed * 60,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });

        /* Counters (supports prefix) */
        gsap.utils.toArray<HTMLElement>(".bsd-counter").forEach((el) => {
          const value = parseFloat(el.dataset.value || "0");
          const decimals = parseInt(el.dataset.decimals || "0", 10);
          const prefix = el.dataset.prefix || "";
          const suffix = el.dataset.suffix || "";
          const obj = { v: 0 };
          gsap.to(obj, {
            v: value,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            onUpdate: () => {
              const n = decimals > 0 ? obj.v.toFixed(decimals) : Math.round(obj.v).toLocaleString();
              el.textContent = `${prefix}${n}${suffix}`;
            },
          });
        });

        /* Pinned horizontal journey + progress bar */
        const track = root.querySelector<HTMLElement>(".bsd-journey-track");
        const journeyEl = root.querySelector<HTMLElement>(".bsd-journey");
        const progress = root.querySelector<HTMLElement>(".bsd-progress");
        if (track && journeyEl) {
          const getScroll = () => track.scrollWidth - window.innerWidth + window.innerWidth * 0.06;
          gsap.to(track, {
            x: () => -getScroll(),
            ease: "none",
            scrollTrigger: {
              trigger: journeyEl,
              start: "top top",
              end: () => `+=${getScroll()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (self: any) => {
                if (progress) gsap.set(progress, { scaleX: self.progress });
              },
            },
          });
        }
      }, root);

      cleanups.push(() => ctx.revert());
      window.setTimeout(() => ScrollTrigger.refresh(), 400);
      window.addEventListener("load", () => ScrollTrigger.refresh());
    };

    init();

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (fillTimer) window.clearInterval(fillTimer);
      cleanups.forEach((fn) => fn());
      if (lenis) lenis.destroy();
    };
  }, []);

  const navigateWithWipe = (href: string) => {
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
    <div ref={rootRef} className="bsd">
      {/* Preloader */}
      <div ref={preloaderRef} className="bsd-preloader">
        <span className="bsd-serif text-3xl italic text-[var(--bsd-ink)]">Breathe.</span>
        <div className="bsd-preloader__bar">
          <span ref={fillRef} className="bsd-preloader__fill" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--bsd-muted)]">Bright Smile Dental</span>
      </div>

      {/* Custom cursor */}
      <div ref={cursorRef} className="bsd-cursor" data-variant="">
        <span ref={labelRef} className="bsd-cursor-label" />
      </div>
      <div ref={dotRef} className="bsd-cursor-dot" />

      <div ref={wipeRef} className="bsd-wipe" />

      <BsdNav onBack={() => navigateWithWipe("/")} />
      <main>
        <BsdHero />
        <BsdMarquee />
        <BsdStory />
        <BsdServices />
        <BsdTransformation />
        <BsdJourney />
        <BsdStats />
        <BsdAutomation />
        <BsdFaq />
        <BsdTestimonial />
        <BsdCta onBack={() => navigateWithWipe("/")} />
      </main>
    </div>
  );
}
```

---

*End of `code_change5.md` — delta after `code_change4.md`: 3 modified files, 4 new files.*
