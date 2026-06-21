# Code Change 6 — Olive & Ember "Tend the Fire" (delta after code_change5.md)

An illustration-driven, fire-as-metaphor experience for the Olive & Ember restaurant demo at `/demo/restaurant`. Only changes **after `code_change5.md`** are shown here. Reuses the shared `components/pawsome/motion.ts` loader (GSAP + ScrollTrigger + Lenis); no new dependencies or fonts.

## Summary

| File | Type | Change |
|---|---|---|
| `app/demo/[slug]/page.tsx` | modified | Route `restaurant` to `EmberExperience` |
| `app/globals.css` | modified | Appended the scoped `.ember` design system |
| `components/ember/data.ts` | new | Menu, stages, story, stats, reservation + receipt config |
| `components/ember/EmberCanvas.tsx` | new | Canvas ember/spark particle system |
| `components/ember/EmberReservation.tsx` | new | Reserve+WhatsApp / digital receipt demo |
| `components/ember/Sections.tsx` | new | All sections + animated SVG illustrations + heat-haze filter |
| `components/ember/EmberExperience.tsx` | new | Orchestrator: preloader, torch cursor, stoke, Lenis+GSAP, scroll-warmth |

---

## A. Modified files

### `app/demo/[slug]/page.tsx` — route the restaurant demo

```diff
 import { BrightSmileExperience } from "@/components/brightsmile/BrightSmileExperience";
+import { EmberExperience } from "@/components/ember/EmberExperience";
```

```diff
   // Bright Smile Dental ships its own bespoke, light-themed experience.
   if (business.slug === "dentist") {
     return <BrightSmileExperience />;
   }

+  // Olive & Ember ships the "Tend the Fire" experience.
+  if (business.slug === "restaurant") {
+    return <EmberExperience />;
+  }
+
   return (
```

### `app/globals.css` — appended scoped `.ember` design system

```css
/* ============================================================
   OLIVE & EMBER — "Tend the Fire" (scoped)
   ============================================================ */
.ember {
  --em-heat: 0; /* 0 = cold night, 1 = full blaze (driven by scroll) */
  --em-bg: #0c0806;
  --em-cream: #f3e7d6;
  --em-ember: #ff5722;
  --em-ember-bright: #ff7a18;
  --em-coal: #b3261e;
  --em-gold: #f5b301;
  --em-olive: #9caa5a;
  --em-ash: #8a7f76;
  --em-display: "Cormorant Garamond", Georgia, serif;
  --em-sans: "Manrope", ui-sans-serif, system-ui, sans-serif;

  position: relative;
  /* room warms as you tend the fire */
  background:
    radial-gradient(120% 80% at 50% 120%, rgba(255, 87, 34, calc(0.18 + var(--em-heat) * 0.4)), transparent 60%),
    #0c0806;
  color: var(--em-cream);
  font-family: var(--em-sans);
  overflow-x: hidden;
}

@media (hover: hover) and (pointer: fine) {
  .ember,
  .ember a,
  .ember button {
    cursor: none;
  }
}

/* Ambient particle canvas + soft vignette */
.em-canvas {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}
.em-vignette {
  position: fixed;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: radial-gradient(120% 120% at 50% 50%, transparent 55%, rgba(0, 0, 0, 0.6) 100%);
}

/* Torch cursor (warm radial light) */
.em-torch {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 460px;
  height: 460px;
  margin: -230px 0 0 -230px;
  border-radius: 9999px;
  pointer-events: none;
  mix-blend-mode: screen;
  background: radial-gradient(closest-side, rgba(255, 138, 24, 0.28), rgba(255, 87, 34, 0.12) 40%, transparent 72%);
  will-change: transform;
  transition: opacity 0.4s ease, width 0.4s ease, height 0.4s ease;
}
.em-torch[data-stoke="true"] {
  width: 620px;
  height: 620px;
  margin: -310px 0 0 -310px;
}
.em-cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 8px;
  height: 8px;
  margin: -4px 0 0 -4px;
  border-radius: 9999px;
  pointer-events: none;
  background: var(--em-gold);
  box-shadow: 0 0 12px 2px rgba(245, 179, 1, 0.8);
  will-change: transform;
}
@media (hover: none) {
  .em-torch,
  .em-cursor-dot {
    display: none;
  }
}

/* Content sits above canvas/vignette */
.ember main,
.ember header,
.ember .em-above {
  position: relative;
  z-index: 10;
}

/* Glass (warm) */
.em-glass {
  background: rgba(243, 231, 214, 0.05);
  border: 1px solid rgba(243, 231, 214, 0.12);
  box-shadow: 0 30px 80px -40px rgba(255, 87, 34, 0.35);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* Buttons */
.em-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  border-radius: 9999px;
  background: linear-gradient(120deg, var(--em-ember), var(--em-gold));
  color: #1a0d07;
  padding: 0.95rem 1.8rem;
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  will-change: transform;
  box-shadow: 0 12px 40px -12px rgba(255, 122, 24, 0.6);
  transition: filter 0.3s ease;
}
.em-btn:hover { filter: brightness(1.08); }
.em-btn--ghost {
  background: transparent;
  color: var(--em-cream);
  border: 1px solid rgba(243, 231, 214, 0.25);
  box-shadow: none;
}
.em-btn--ghost:hover { background: rgba(243, 231, 214, 0.06); }

/* Inputs */
.em-input {
  width: 100%;
  border-radius: 14px;
  border: 1px solid rgba(243, 231, 214, 0.18);
  background: rgba(12, 8, 6, 0.55);
  padding: 0.72rem 0.95rem;
  font-size: 0.9rem;
  color: var(--em-cream);
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.em-input::placeholder { color: rgba(243, 231, 214, 0.4); }
.em-input:focus {
  border-color: var(--em-ember);
  box-shadow: 0 0 0 4px rgba(255, 87, 34, 0.18);
}
.em-input[type="date"],
.em-input[type="time"] { color-scheme: dark; }

/* Typography */
.em-display {
  font-family: var(--em-display);
  font-weight: 600;
  line-height: 0.92;
  letter-spacing: -0.02em;
}
.em-serif { font-family: var(--em-display); }
.em-h-mega { font-size: clamp(3.4rem, 15vw, 15rem); }
.em-h-xl { font-size: clamp(2.4rem, 7vw, 6.5rem); }

/* Kinetic headline letters (heat flicker) */
.em-letter {
  display: inline-block;
  will-change: transform, opacity;
}
.em-heat-text {
  text-shadow:
    0 0 calc(8px + var(--em-heat) * 24px) rgba(255, 122, 24, calc(0.25 + var(--em-heat) * 0.5)),
    0 0 2px rgba(245, 179, 1, 0.4);
}

/* Heat-haze filter target */
.em-haze { filter: url(#em-haze); }

/* Reveal primitives (illustration/clip based, not plain fade) */
.em-reveal { opacity: 0; transform: translateY(40px) scale(0.98); }
.is-ready .em-reveal { opacity: 1; transform: none; }
.em-line-mask { overflow: hidden; display: block; }
.em-line { display: block; transform: translateY(115%); }
.is-ready .em-line { transform: none; }

/* Olive branch + smoke draw */
.em-draw { stroke-dasharray: 1; stroke-dashoffset: 1; }
/* Fallback: if GSAP is unavailable, draw the stroke solid */
.is-ready .em-draw { stroke-dasharray: none; stroke-dashoffset: 0; }

/* Marquee */
.em-marquee {
  display: flex;
  width: max-content;
  will-change: transform;
  animation: pw-marquee 40s linear infinite;
}

/* Pinned menu "pass" */
.em-pass-track {
  display: flex;
  height: 100%;
  will-change: transform;
}

/* Steam wisp */
.em-steam {
  stroke: rgba(243, 231, 214, 0.5);
  fill: none;
  stroke-linecap: round;
}

/* Ember scroll gauge */
.em-gauge {
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 40;
  width: 46px;
  height: 46px;
  border-radius: 9999px;
  pointer-events: none;
  background: radial-gradient(closest-side, rgba(255, 122, 24, calc(0.3 + var(--em-heat) * 0.7)), transparent 72%);
  box-shadow: 0 0 calc(8px + var(--em-heat) * 30px) rgba(255, 87, 34, calc(0.3 + var(--em-heat) * 0.6));
}

/* Preloader (strike a match) */
.em-preloader {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
  background: #0c0806;
  color: var(--em-cream);
}
.em-preloader__bar {
  width: min(220px, 60vw);
  height: 2px;
  background: rgba(243, 231, 214, 0.14);
  overflow: hidden;
  border-radius: 9999px;
}
.em-preloader__fill {
  display: block;
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--em-coal), var(--em-gold));
}

/* Page wipe */
.em-wipe {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: linear-gradient(180deg, var(--em-coal), #1a0d07);
  transform: scaleY(0);
  transform-origin: bottom;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .em-marquee { animation: none; }
  .em-reveal { opacity: 1; transform: none; }
  .em-line { transform: none; }
  .em-canvas { display: none; }
}
```

---

## B. New files

### `components/ember/data.ts`

```ts
export const stages = [
  { no: "01", name: "Spark" },
  { no: "02", name: "Kindle" },
  { no: "03", name: "Blaze" },
  { no: "04", name: "Glow" },
  { no: "05", name: "Embers" },
];

export const storyLines = [
  "Everything here begins",
  "with a single ember.",
  "We cook over live fire,",
  "and let the flame do the talking.",
];

export type Course = {
  no: string;
  name: string;
  note: string;
  price: string;
};

export const menu: Course[] = [
  { no: "I", name: "Wood-Fired Margherita", note: "San Marzano, fior di latte, basil, charred crust.", price: "$17" },
  { no: "II", name: "Ember Steak Frites", note: "Grilled flat iron, smoked herb butter, hand-cut fries.", price: "$29" },
  { no: "III", name: "Charred Veg Bowl", note: "Fire-blistered seasonal vegetables, farro, tahini.", price: "$19" },
  { no: "IV", name: "Burrata & Peach", note: "Creamy burrata, grilled peach, aged balsamic.", price: "$15" },
  { no: "V", name: "Smoked Tiramisu", note: "Espresso-soaked, mascarpone, a whisper of smoke.", price: "$11" },
];

export const reservationServices = [
  "Dinner for two",
  "Chef's table (4)",
  "Group / event",
  "Bar seating",
];

/** Items used to build the digital receipt mock. */
export const receiptItems: { name: string; price: number }[] = [
  { name: "Wood-Fired Margherita", price: 17 },
  { name: "Ember Steak Frites", price: 29 },
  { name: "Charred Veg Bowl", price: 19 },
  { name: "Burrata & Peach", price: 15 },
  { name: "Smoked Tiramisu", price: 11 },
];

export const stats = [
  { value: 31, prefix: "+", suffix: "%", label: "Weekend covers" },
  { value: 55, suffix: "%", label: "Fewer no-shows" },
  { value: 4.8, suffix: "\u2605", label: "Guest rating", decimals: 1 },
  { value: 600, suffix: "\u00b0", label: "The oven, always" },
];

export const marqueeWords = [
  "Wood-fired",
  "Live flame",
  "Seasonal",
  "Slow",
  "Smoke",
  "Charred",
  "Shared",
];

export const testimonial = {
  quote: "Reservations and confirmations run themselves now. Our hosts tend the room, not the phone.",
  author: "Luca Bianchi",
  role: "Owner, Olive & Ember",
};

export const contact = {
  phone: "(206) 555-0173",
  address: "1408 Pike Pl, Seattle, WA",
  hours: "Wed-Sun, 5pm til late",
};
```

### `components/ember/EmberCanvas.tsx`

```tsx
"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  phase: number;
};

/**
 * Ambient ember/spark field. Drifts upward, reacts to the cursor, and surges
 * while the fire is being "stoked" (listens for the window `ember:stoke` event).
 * Pure canvas + rAF so it works even without GSAP; disabled under reduced motion.
 */
export function EmberCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const mobile = window.innerWidth < 768;
    const MAX = mobile ? 70 : 170;
    const particles: Particle[] = [];
    const mouse = { x: w / 2, y: h * 0.85, has: false };
    let stoke = false;

    const spawn = (x: number, y: number, burst: boolean) => {
      if (particles.length >= MAX) return;
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.6;
      const speed = (burst ? 1.4 : 0.6) + Math.random() * 1.3;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed * (burst ? 1.8 : 1.2),
        life: 0,
        max: 60 + Math.random() * (burst ? 60 : 90),
        size: 1 + Math.random() * (burst ? 3 : 2.4),
        phase: Math.random() * Math.PI * 2,
      });
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.has = true;
    };
    const onStoke = (e: Event) => {
      stoke = (e as CustomEvent).detail === true;
    };
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("ember:stoke", onStoke as EventListener);

    let raf = 0;
    let last = performance.now();
    let acc = 0;

    const frame = (t: number) => {
      const dt = Math.min(34, t - last);
      last = t;
      acc += dt;

      while (acc >= 16) {
        acc -= 16;
        const baseRate = stoke ? 7 : 2;
        for (let i = 0; i < baseRate; i++) {
          const spread = stoke ? 170 : w * 0.55;
          spawn(w * 0.5 + (Math.random() - 0.5) * spread, h * 0.97, stoke);
        }
        if (mouse.has) {
          const near = stoke ? 4 : 2;
          for (let i = 0; i < near; i++) {
            spawn(mouse.x + (Math.random() - 0.5) * 34, mouse.y + (Math.random() - 0.5) * 22, stoke);
          }
        }
      }

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vy -= 0.012; // buoyancy: embers rise
        p.phase += 0.1;
        p.x += p.vx + Math.sin(p.phase) * 0.3;
        p.y += p.vy;
        p.vx *= 0.99;
        p.life++;
        const r = p.life / p.max;
        if (r >= 1 || p.y < -24) {
          particles.splice(i, 1);
          continue;
        }
        const alpha = (1 - r) * (0.6 + Math.random() * 0.4);
        const g = Math.round(80 + 140 * (1 - r));
        const b = Math.round(30 * (1 - r));
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, ${g}, ${b}, ${alpha})`;
        ctx.arc(p.x, p.y, p.size * (1 - r * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("ember:stoke", onStoke as EventListener);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="em-canvas" aria-hidden />;
}
```

### `components/ember/EmberReservation.tsx`

```tsx
"use client";

import { useMemo, useState } from "react";
import { receiptItems, reservationServices } from "./data";

type Tab = "reserve" | "receipt";
type Status = "idle" | "typing" | "sent";

export function EmberReservation() {
  const [tab, setTab] = useState<Tab>("reserve");
  return (
    <div>
      <div className="mx-auto mb-10 flex max-w-sm rounded-full border border-white/10 bg-black/30 p-1.5">
        <TabBtn active={tab === "reserve"} onClick={() => setTab("reserve")}>
          Reserve + WhatsApp
        </TabBtn>
        <TabBtn active={tab === "receipt"} onClick={() => setTab("receipt")}>
          The bill
        </TabBtn>
      </div>
      {tab === "reserve" ? <ReservePanel /> : <ReceiptPanel />}
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
        active ? "bg-[var(--em-ember)] text-[#1a0d07]" : "text-[var(--em-cream)]/60 hover:text-[var(--em-cream)]"
      }`}
    >
      {children}
    </button>
  );
}

/* ------------------------------- Reserve --------------------------------- */

function ReservePanel() {
  const [name, setName] = useState("");
  const [table, setTable] = useState(reservationServices[0]);
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
      <form onSubmit={submit} className="em-glass rounded-[28px] p-7 sm:p-9">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--em-gold)]">Live demo</div>
        <h3 className="em-serif mt-3 text-4xl text-[var(--em-cream)]">Pull up a chair</h3>
        <div className="mt-7 space-y-4">
          <Field label="Name">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jordan Smith" className="em-input" />
          </Field>
          <Field label="Table">
            <select value={table} onChange={(e) => setTable(e.target.value)} className="em-input">
              {reservationServices.map((s) => (
                <option key={s} className="text-black">
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Date">
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="em-input" />
            </Field>
            <Field label="Time">
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="em-input" />
            </Field>
          </div>
          <button type="submit" disabled={!canSubmit} data-magnetic className="em-btn mt-2 w-full justify-center disabled:opacity-40">
            {status === "idle" ? "Reserve a table" : "Table reserved"}
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
              className="w-full text-center text-sm text-[var(--em-cream)]/50 hover:text-[var(--em-cream)]"
            >
              Run it again
            </button>
          )}
        </div>
      </form>

      <div className="flex justify-center">
        <div className="w-full max-w-[320px] rounded-[2.6rem] border border-white/10 bg-black/60 p-3 shadow-2xl">
          <div className="overflow-hidden rounded-[2rem] bg-[#0b1413]">
            <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-lg">{"\u{1F525}"}</span>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-white">Olive &amp; Ember</div>
                <div className="text-[11px] text-white/60">WhatsApp Business</div>
              </div>
            </div>
            <div className="flex min-h-[300px] flex-col gap-2 p-4">
              {status === "idle" && (
                <p className="m-auto max-w-[80%] text-center text-xs text-white/40">
                  Reserve a table and an instant WhatsApp confirmation arrives.
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
                    <p className="font-semibold">Table&rsquo;s set, {first}. {"\u{1F525}"}</p>
                    <p className="mt-1">
                      <b>{table}</b> on{" "}
                      <b>
                        {prettyDate} at {time}
                      </b>
                      . 1408 Pike Pl, Seattle.
                    </p>
                    <Meta />
                  </Bubble>
                  <Bubble delay>
                    <p>We&rsquo;ll hold it 15 minutes. Reply C to change anything.</p>
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

/* ------------------------------- Receipt --------------------------------- */

const TAX = 0.101;

function ReceiptPanel() {
  const [qty, setQty] = useState<Record<string, number>>({ "Wood-Fired Margherita": 1, "Ember Steak Frites": 1 });
  const [sent, setSent] = useState(false);

  const lines = receiptItems.map((it) => ({ ...it, count: qty[it.name] ?? 0 })).filter((it) => it.count > 0);
  const subtotal = lines.reduce((s, it) => s + it.price * it.count, 0);
  const tax = subtotal * TAX;
  const total = subtotal + tax;
  const receiptNo = useMemo(() => `#${Math.floor(1000 + Math.random() * 9000)}`, []);
  const fmt = (n: number) => `$${n.toFixed(2)}`;

  const setCount = (name: string, next: number) => {
    setSent(false);
    setQty((q) => ({ ...q, [name]: Math.max(0, next) }));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="em-glass rounded-[28px] p-6 sm:p-8">
        <h3 className="em-serif text-3xl text-[var(--em-cream)]">Build the table&rsquo;s order</h3>
        <p className="mt-1 text-sm text-[var(--em-cream)]/50">An itemized receipt generates and sends itself.</p>
        <div className="mt-6 space-y-3">
          {receiptItems.map((it) => {
            const count = qty[it.name] ?? 0;
            return (
              <div key={it.name} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 p-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-[var(--em-cream)]">{it.name}</div>
                  <div className="text-xs text-[var(--em-cream)]/50">{fmt(it.price)}</div>
                </div>
                <div className="flex flex-none items-center gap-2">
                  <Step onClick={() => setCount(it.name, count - 1)} disabled={count === 0}>
                    &minus;
                  </Step>
                  <span className="w-6 text-center text-sm font-semibold">{count}</span>
                  <Step onClick={() => setCount(it.name, count + 1)}>+</Step>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="relative flex-1 overflow-hidden rounded-[28px] bg-[#15100c] p-6 ring-1 ring-white/10">
          <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: "linear-gradient(90deg, var(--em-coal), var(--em-gold))" }} />
          <div className="flex items-start justify-between border-b border-dashed border-white/15 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{"\u{1F525}"}</span>
              <span className="em-serif text-xl text-[var(--em-cream)]">Olive &amp; Ember</span>
            </div>
            <div className="text-right text-xs text-[var(--em-cream)]/50">
              <div className="font-semibold text-[var(--em-cream)]/80">Receipt {receiptNo}</div>
              <div>Table 12</div>
            </div>
          </div>
          <div className="min-h-[150px] py-4">
            {lines.length === 0 ? (
              <p className="py-12 text-center text-sm text-[var(--em-cream)]/40">Add a dish to start the bill.</p>
            ) : (
              <table className="w-full text-sm">
                <tbody>
                  {lines.map((it) => (
                    <tr key={it.name} className="animate-fade-up">
                      <td className="py-1.5 text-[var(--em-cream)]/80">
                        {it.name}
                        <span className="text-[var(--em-cream)]/40"> &times;{it.count}</span>
                      </td>
                      <td className="py-1.5 text-right font-medium text-[var(--em-cream)]">{fmt(it.price * it.count)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="space-y-1.5 border-t border-dashed border-white/15 pt-4 text-sm">
            <Row label="Subtotal" value={fmt(subtotal)} />
            <Row label={`Tax (${(TAX * 100).toFixed(1)}%)`} value={fmt(tax)} />
            <div className="flex justify-between pt-1 text-base font-bold text-[var(--em-cream)]">
              <span>Total</span>
              <span style={{ color: "var(--em-gold)" }}>{fmt(total)}</span>
            </div>
          </div>
          <p className="mt-4 text-center text-[11px] text-[var(--em-cream)]/40">Auto-generated &middot; emailed &amp; texted to the table</p>
        </div>
        <button
          type="button"
          disabled={lines.length === 0}
          onClick={() => setSent(true)}
          data-magnetic
          className="em-btn mt-4 w-full justify-center disabled:opacity-40"
        >
          {sent ? "Receipt sent \u2713" : "Send digital receipt"}
        </button>
        {sent && <p className="mt-2 animate-fade-up text-center text-sm font-medium text-[var(--em-gold)]">Receipt {receiptNo} sent automatically.</p>}
      </div>
    </div>
  );
}

/* ------------------------------- helpers --------------------------------- */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--em-cream)]/45">{label}</span>
      {children}
    </label>
  );
}

function Bubble({ children, delay }: { children: React.ReactNode; delay?: boolean }) {
  return (
    <div
      className={`max-w-[85%] animate-fade-up self-end rounded-2xl rounded-br-sm bg-[#dcf8c6] px-3 py-2 text-[12px] leading-snug text-gray-800 ${
        delay ? "[animation-delay:250ms]" : ""
      }`}
    >
      {children}
    </div>
  );
}

function Meta() {
  return <span className="mt-1 block text-right text-[9px] text-gray-500">sent automatically &middot; WhatsApp {"\u2713\u2713"}</span>;
}

function Dot() {
  return <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-500" />;
}

function Step({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-lg font-semibold text-[var(--em-cream)] transition hover:border-[var(--em-ember)] hover:text-[var(--em-ember)] disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[var(--em-cream)]/60">
      <span>{label}</span>
      <span className="font-medium text-[var(--em-cream)]/85">{value}</span>
    </div>
  );
}
```

### `components/ember/Sections.tsx`

```tsx
"use client";

import {
  contact,
  marqueeWords,
  menu,
  stages,
  stats,
  storyLines,
  testimonial,
} from "./data";
import { EmberReservation } from "./EmberReservation";

/* -------------------------------------------------------------------------- */
/*  SVG defs (heat-haze)                                                      */
/* -------------------------------------------------------------------------- */

export function EmSvgDefs() {
  return (
    <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <filter id="em-haze">
          <feTurbulence type="fractalNoise" baseFrequency="0.018 0.04" numOctaves={2} result="n">
            <animate attributeName="baseFrequency" dur="7s" values="0.018 0.04;0.022 0.05;0.018 0.04" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap id="em-haze-map" in="SourceGraphic" in2="n" scale={6} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Nav                                                                       */
/* -------------------------------------------------------------------------- */

export function EmNav({ onBack }: { onBack: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-[70]">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 sm:px-10">
        <button type="button" onClick={onBack} data-magnetic className="text-sm font-semibold tracking-tight text-[var(--em-cream)]">
          &larr; Lumen Studio
        </button>
        <div className="em-display text-lg tracking-tight text-[var(--em-cream)]">Olive &amp; Ember</div>
        <a href="#reserve" data-magnetic className="hidden text-sm font-semibold text-[var(--em-cream)] sm:block">
          Reserve
        </a>
      </nav>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Spark (hero)                                                              */
/* -------------------------------------------------------------------------- */

function KineticWord({ word }: { word: string }) {
  return (
    <>
      {word.split("").map((c, i) => (
        <span key={i} className="em-letter">
          {c}
        </span>
      ))}
    </>
  );
}

export function EmHero() {
  return (
    <section data-em-hero className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center sm:px-10">
      <p className="em-hero-sub mb-8 text-xs uppercase tracking-[0.35em] text-[var(--em-cream)]/55">
        Seattle &middot; Wood-fired bistro
      </p>

      <h1
        data-stoke
        className="em-display em-heat-text em-haze em-h-mega select-none text-[var(--em-cream)]"
        aria-label="Olive & Ember"
      >
        <span className="block"><KineticWord word="OLIVE" /></span>
        <span className="block">
          <span className="em-serif italic text-[var(--em-ember-bright)]"><KineticWord word="&" /></span>{" "}
          <KineticWord word="EMBER" />
        </span>
      </h1>

      <p className="em-hero-sub mt-8 max-w-md text-base leading-relaxed text-[var(--em-cream)]/65">
        Cooked over live flame. Reserved in seconds, confirmed before you put your phone down.
      </p>

      <div className="em-hero-sub mt-9 flex flex-wrap items-center justify-center gap-4">
        <a href="#reserve" data-magnetic className="em-btn">
          Reserve a table <span aria-hidden>&rarr;</span>
        </a>
        <span className="text-xs uppercase tracking-[0.25em] text-[var(--em-cream)]/40">Press &amp; hold the name to stoke</span>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-[var(--em-cream)]/40">
        Scroll to feed the fire
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Marquee                                                                   */
/* -------------------------------------------------------------------------- */

export function EmMarquee() {
  const row = [...marqueeWords, ...marqueeWords];
  return (
    <section className="border-y border-white/10 py-6" aria-hidden>
      <div className="em-marquee">
        {row.map((w, i) => (
          <span key={i} className="em-display flex items-center text-4xl text-[var(--em-cream)]/75 sm:text-6xl">
            <span className="px-8">{w}</span>
            <span className="text-[var(--em-ember)]">&bull;</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Kindle (story + olive branch)                                             */
/* -------------------------------------------------------------------------- */

export function EmKindle() {
  return (
    <section className="relative px-6 py-32 sm:px-10 sm:py-44">
      <div className="mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-[1.3fr_0.7fr]">
        <div data-em-lines>
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[var(--em-ember)]">02 &mdash; Kindle</p>
          <h2 className="em-display text-balance text-4xl text-[var(--em-cream)] sm:text-6xl md:text-7xl">
            {storyLines.map((line, i) => (
              <span key={i} className="em-line-mask">
                <span className="em-line">{line}</span>
              </span>
            ))}
          </h2>
        </div>

        {/* Animated olive branch */}
        <svg viewBox="0 0 200 320" className="mx-auto w-40 sm:w-52" fill="none" aria-hidden>
          <path className="em-draw" d="M100 312 C 96 230, 104 170, 100 96 C 98 60, 104 30, 100 8" stroke="var(--em-olive)" strokeWidth="3" strokeLinecap="round" />
          {[
            { x: 100, y: 250, r: -35 },
            { x: 100, y: 250, r: 35 },
            { x: 100, y: 195, r: -40 },
            { x: 100, y: 195, r: 40 },
            { x: 100, y: 140, r: -35 },
            { x: 100, y: 140, r: 35 },
            { x: 100, y: 90, r: -42 },
            { x: 100, y: 90, r: 42 },
          ].map((leaf, i) => (
            <g key={i} className="em-leaf" style={{ transformOrigin: `${leaf.x}px ${leaf.y}px` }} transform={`rotate(${leaf.r} ${leaf.x} ${leaf.y})`}>
              <ellipse cx={leaf.x} cy={leaf.y - 22} rx="9" ry="22" fill="var(--em-olive)" opacity="0.85" />
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Blaze (pinned menu pass)                                                  */
/* -------------------------------------------------------------------------- */

function Steam() {
  return (
    <svg className="em-steam-wisp absolute -top-10 left-8 h-12 w-16 opacity-0" viewBox="0 0 60 50" fill="none" aria-hidden>
      <path className="em-steam" d="M16 48 C 8 34, 24 28, 16 14 C 12 8, 18 4, 16 0" strokeWidth="2.5" />
      <path className="em-steam" d="M40 48 C 32 32, 48 26, 40 12 C 36 6, 42 2, 40 -2" strokeWidth="2.5" opacity="0.7" />
    </svg>
  );
}

export function EmBlaze() {
  return (
    <section className="em-pass relative flex h-[100svh] flex-col overflow-hidden">
      <div className="px-6 pt-24 sm:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--em-ember)]">03 &mdash; Blaze</p>
        <h2 className="em-display em-h-xl mt-2 text-[var(--em-cream)]">From the fire</h2>
      </div>
      <div className="flex flex-1 items-center">
        <div className="em-pass-track items-center gap-6 px-6 sm:gap-10 sm:px-10">
          {menu.map((c) => (
            <article
              key={c.no}
              className="em-glass relative flex h-[58vh] w-[80vw] flex-none flex-col justify-between rounded-[28px] p-8 sm:w-[48vw] sm:p-12 lg:w-[36vw]"
            >
              <Steam />
              <div className="flex items-start justify-between">
                <span className="em-serif text-2xl italic text-[var(--em-gold)]">{c.no}</span>
                <span className="em-serif text-3xl text-[var(--em-ember-bright)]">{c.price}</span>
              </div>
              <div>
                <h3 className="em-display em-haze text-4xl text-[var(--em-cream)] sm:text-6xl">{c.name}</h3>
                <p className="mt-4 max-w-sm text-[var(--em-cream)]/55">{c.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Glow (reservation)                                                        */
/* -------------------------------------------------------------------------- */

export function EmGlow() {
  return (
    <section id="reserve" className="relative px-6 py-28 sm:px-10">
      <div className="relative mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-2xl text-center" data-em-reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--em-ember)]">04 &mdash; Glow</p>
          <h2 className="em-display em-h-xl mt-3 text-[var(--em-cream)]">Reserve. We&rsquo;ll text you.</h2>
          <p className="mt-5 text-[var(--em-cream)]/60">
            A working demo. Book a table for an instant WhatsApp confirmation, or build the
            bill to watch an itemized digital receipt generate itself.
          </p>
        </div>
        <div className="mt-14" data-em-reveal>
          <EmberReservation />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stats                                                                     */
/* -------------------------------------------------------------------------- */

export function EmStats() {
  return (
    <section className="border-y border-white/10 px-6 py-24 sm:px-10">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-y-12 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} data-em-reveal className="text-center">
            <div
              className="em-display em-counter text-5xl text-[var(--em-cream)] sm:text-7xl"
              data-value={s.value}
              data-prefix={s.prefix ?? ""}
              data-suffix={s.suffix}
              data-decimals={s.decimals ?? 0}
            >
              {s.prefix ?? ""}0{s.suffix}
            </div>
            <div className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--em-cream)]/50">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Embers (testimonial + CTA + footer)                                       */
/* -------------------------------------------------------------------------- */

export function EmEmbers({ onBack }: { onBack: () => void }) {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-32 sm:px-10">
      <figure className="mx-auto max-w-5xl text-center" data-em-lines>
        <div className="text-2xl text-[var(--em-gold)]">{"\u2605\u2605\u2605\u2605\u2605"}</div>
        <blockquote className="em-display mt-8 text-balance text-3xl leading-tight text-[var(--em-cream)] sm:text-5xl md:text-6xl">
          <span className="em-line-mask"><span className="em-line">&ldquo;{testimonial.quote}&rdquo;</span></span>
        </blockquote>
        <figcaption className="mt-10 text-sm uppercase tracking-[0.2em] text-[var(--em-cream)]/50">
          {testimonial.author} &mdash; {testimonial.role}
        </figcaption>
      </figure>

      <div className="mx-auto mt-28 max-w-[1600px] text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[var(--em-ember)]">05 &mdash; Embers</p>
        <h2 className="em-display text-[clamp(2.6rem,11vw,11rem)] leading-[0.9] text-[var(--em-cream)]">
          Come sit<br />
          <span className="em-serif italic text-[var(--em-ember-bright)]">by the fire.</span>
        </h2>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a href="#reserve" data-magnetic className="em-btn text-base">
            Reserve a table <span aria-hidden>&rarr;</span>
          </a>
          <button type="button" onClick={onBack} data-magnetic className="em-btn em-btn--ghost text-base">
            Back to portfolio
          </button>
        </div>
      </div>

      <footer className="mx-auto mt-24 flex max-w-[1600px] flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[var(--em-cream)]/45 sm:flex-row">
        <span>Olive &amp; Ember &middot; {contact.phone}</span>
        <span>{contact.address} &middot; {contact.hours}</span>
        <span>Built by Lumen Studio &middot; &copy; {new Date().getFullYear()}</span>
      </footer>
    </section>
  );
}

/* Re-export stage labels for any future progress UI. */
export { stages };
```

### `components/ember/EmberExperience.tsx`

```tsx
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { loadMotionLibs, prefersReducedMotion } from "@/components/pawsome/motion";
import { EmberCanvas } from "./EmberCanvas";
import {
  EmBlaze,
  EmEmbers,
  EmGlow,
  EmHero,
  EmKindle,
  EmMarquee,
  EmNav,
  EmStats,
  EmSvgDefs,
} from "./Sections";

export function EmberExperience() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const torchRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
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

    /* Torch cursor (lerp follow) + sparking dot */
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (fine && torchRef.current && dotRef.current) {
      const torch = torchRef.current;
      const dot = dotRef.current;
      const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const target = { ...pos };
      const onMove = (e: MouseEvent) => {
        target.x = e.clientX;
        target.y = e.clientY;
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      };
      const tick = () => {
        pos.x += (target.x - pos.x) * 0.14;
        pos.y += (target.y - pos.y) * 0.14;
        torch.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        rafId = requestAnimationFrame(tick);
      };
      window.addEventListener("mousemove", onMove);
      rafId = requestAnimationFrame(tick);
      cleanups.push(() => window.removeEventListener("mousemove", onMove));
    }

    /* Stoke interaction (press & hold the name) */
    const stokeTarget = root.querySelector<HTMLElement>("[data-stoke]");
    if (stokeTarget) {
      const setStoke = (active: boolean) => {
        window.dispatchEvent(new CustomEvent("ember:stoke", { detail: active }));
        if (torchRef.current) torchRef.current.dataset.stoke = String(active);
        root.style.setProperty("--em-heat", active ? "1" : "");
      };
      const down = () => setStoke(true);
      const up = () => setStoke(false);
      stokeTarget.addEventListener("pointerdown", down);
      window.addEventListener("pointerup", up);
      stokeTarget.addEventListener("pointerleave", up);
      cleanups.push(() => {
        stokeTarget.removeEventListener("pointerdown", down);
        window.removeEventListener("pointerup", up);
        stokeTarget.removeEventListener("pointerleave", up);
      });
    }

    /* Preloader "strike a match" */
    if (fillRef.current && !reduced) {
      let n = 0;
      fillTimer = window.setInterval(() => {
        n = Math.min(100, n + Math.ceil(Math.random() * 9));
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

      /* Heat-haze intensifies on hover over headings */
      const hazeMap = document.getElementById("em-haze-map");
      if (gsap && hazeMap) {
        root.querySelectorAll<HTMLElement>(".em-haze").forEach((el) => {
          const enter = () => gsap.to(hazeMap, { attr: { scale: 16 }, duration: 0.5, ease: "power2.out" });
          const leave = () => gsap.to(hazeMap, { attr: { scale: 6 }, duration: 0.7, ease: "power2.out" });
          el.addEventListener("mouseenter", enter);
          el.addEventListener("mouseleave", leave);
          cleanups.push(() => {
            el.removeEventListener("mouseenter", enter);
            el.removeEventListener("mouseleave", leave);
          });
        });
      }

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
        /* Scroll-warmth: feed the fire as you descend */
        ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self: any) => root.style.setProperty("--em-heat", self.progress.toFixed(3)),
        });

        /* Hero intro: kinetic letters + subs */
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from("[data-em-hero] .em-letter", {
          opacity: 0,
          yPercent: 60,
          duration: 0.8,
          stagger: { each: 0.04, from: "random" },
        });
        tl.from(".em-hero-sub", { opacity: 0, y: 24, duration: 0.8, stagger: 0.12 }, "-=0.4");

        /* Masked line groups */
        gsap.utils.toArray<HTMLElement>("[data-em-lines]").forEach((group) => {
          gsap.from(group.querySelectorAll(".em-line"), {
            yPercent: 115,
            duration: 1,
            ease: "power4.out",
            stagger: 0.12,
            scrollTrigger: { trigger: group, start: "top 80%" },
          });
        });

        /* Generic reveals */
        gsap.utils.toArray<HTMLElement>("[data-em-reveal]").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 50,
            scale: 0.98,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          });
        });

        /* Counters */
        gsap.utils.toArray<HTMLElement>(".em-counter").forEach((el) => {
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

        /* Olive branch + smoke draw */
        gsap.utils.toArray<SVGPathElement>(".em-draw").forEach((path) => {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: "power2.inOut",
            scrollTrigger: { trigger: path, start: "top 85%" },
          });
        });

        /* Olive leaves sway */
        gsap.to(".em-leaf", {
          rotation: "+=5",
          transformOrigin: "center",
          duration: 2.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: { each: 0.16, from: "center" },
        });

        /* Steam wisps rise */
        gsap.utils.toArray<HTMLElement>(".em-steam-wisp").forEach((el, i) => {
          gsap.to(el, {
            keyframes: [
              { opacity: 0.55, y: -8, duration: 1.4 },
              { opacity: 0, y: -26, duration: 1.4 },
            ],
            repeat: -1,
            delay: i * 0.5,
            ease: "power1.out",
          });
        });

        /* Pinned menu "pass" */
        const track = root.querySelector<HTMLElement>(".em-pass-track");
        const passEl = root.querySelector<HTMLElement>(".em-pass");
        if (track && passEl) {
          const getScroll = () => track.scrollWidth - window.innerWidth + window.innerWidth * 0.06;
          gsap.to(track, {
            x: () => -getScroll(),
            ease: "none",
            scrollTrigger: {
              trigger: passEl,
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
    <div ref={rootRef} className="ember">
      <EmberCanvas />
      <div className="em-vignette" aria-hidden />
      <div ref={torchRef} className="em-torch" data-stoke="false" aria-hidden />
      <div ref={dotRef} className="em-cursor-dot" aria-hidden />
      <div className="em-gauge" aria-hidden />

      {/* Preloader */}
      <div ref={preloaderRef} className="em-preloader">
        <span className="em-serif text-4xl italic text-[var(--em-cream)]">Strike a match.</span>
        <div className="em-preloader__bar">
          <span ref={fillRef} className="em-preloader__fill" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--em-cream)]/50">Olive &amp; Ember</span>
      </div>

      <div ref={wipeRef} className="em-wipe" />
      <EmSvgDefs />

      <EmNav onBack={() => navigateWithWipe("/")} />
      <main>
        <EmHero />
        <EmMarquee />
        <EmKindle />
        <EmBlaze />
        <EmGlow />
        <EmStats />
        <EmEmbers onBack={() => navigateWithWipe("/")} />
      </main>
    </div>
  );
}
```

---

*End of `code_change6.md` — delta after `code_change5.md`: 2 modified files, 5 new files.*
