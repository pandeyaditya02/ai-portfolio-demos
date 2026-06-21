# Code Change 9 — AI automations everywhere + Flour & Bloom bespoke redesign (delta after code_change8.md)

This delta covers three pieces of work from the session, with full code for every change:

- **A.** A new "AI automations" capability section on the portfolio (Lumen Studio) site.
- **B.** Top-3 new AI automation ideas added to every business demo (data-driven for the 12 generic demos, bespoke sections for Pawsome / Bright Smile / Olive & Ember).
- **C.** A bespoke, CRAV-inspired "Bakehouse" redesign of the Flour & Bloom Bakery demo, breaking it out of the shared generic template.

## Summary

| File | Type | Change |
|---|---|---|
| `components/studio/data.ts` | modified | Added `automationCapabilities` (9 cross-cutting automations); added `"bakery"` to `featuredSlugs` |
| `components/studio/Sections.tsx` | modified | New `StAutomations` section; nav + footer "Automations" links; counter derives from `featuredSlugs.length` |
| `components/studio/StudioExperience.tsx` | modified | Import + render `<StAutomations />` after `<StServices />` |
| `data/businesses.ts` | modified | Appended 3 new `AutomationInfo` items to each of the 12 generic businesses |
| `components/pawsome/Sections.tsx` | modified | New `PwAutomationIdeas` capability grid |
| `components/pawsome/PawsomeExperience.tsx` | modified | Import + render `<PwAutomationIdeas />` |
| `components/brightsmile/Sections.tsx` | modified | New `BsdAutomationIdeas` capability grid |
| `components/brightsmile/BrightSmileExperience.tsx` | modified | Import + render `<BsdAutomationIdeas />` |
| `components/ember/Sections.tsx` | modified | New `EmAutomations` capability grid |
| `components/ember/EmberExperience.tsx` | modified | Import + render `<EmAutomations />` |
| `components/flourbloom/data.ts` | added | Bakery content for the bespoke experience |
| `components/flourbloom/FlourBloomOrder.tsx` | added | Interactive order + receipt automation demo |
| `components/flourbloom/Sections.tsx` | added | CRAV-inspired section lineup |
| `components/flourbloom/FlourBloomExperience.tsx` | added | Client wrapper (cursor, preloader, GSAP/Lenis, page wipe) |
| `app/globals.css` | modified | Appended scoped `.flourbloom` / `fb-` style block |
| `app/demo/[slug]/page.tsx` | modified | Added `bakery` -> `FlourBloomExperience` routing branch |

---

# Part A — Portfolio "AI automations" section

## A1. `components/studio/data.ts` — capability data

Inserted before the existing `process` array:

```ts
/** Cross-cutting AI automations offered to every kind of business. */
export const automationCapabilities = [
  {
    icon: "\u{1F4AC}",
    title: "24/7 AI receptionist & chatbot",
    desc: "Answers FAQs, books appointments, and captures leads around the clock.",
  },
  {
    icon: "\u{1F3AF}",
    title: "Lead scoring & prioritization",
    desc: "Ranks every inquiry by conversion likelihood so you chase the hottest first.",
  },
  {
    icon: "\u{1F4C5}",
    title: "No-show & cancellation prediction",
    desc: "Flags risky bookings and auto-triggers deposits or confirmation nudges.",
  },
  {
    icon: "\u2B50",
    title: "Reviews & reputation monitoring",
    desc: "Requests reviews, drafts responses, and flags negative sentiment early.",
  },
  {
    icon: "\u{1F514}",
    title: "Smart reminders & follow-ups",
    desc: "Multi-channel SMS, WhatsApp, and email reminders that run themselves.",
  },
  {
    icon: "\u{1F9FE}",
    title: "Auto invoicing & receipts",
    desc: "Itemized, branded, instant receipts with zero manual bookkeeping.",
  },
  {
    icon: "\u{1F501}",
    title: "Win-back & reactivation",
    desc: "Automatically re-engages lapsed customers with timely offers.",
  },
  {
    icon: "\u{1F4C8}",
    title: "Demand & capacity forecasting",
    desc: "Optimizes scheduling and inventory from your booking patterns.",
  },
  {
    icon: "\u{1F381}",
    title: "Personalized upsell & cross-sell",
    desc: "Recommends the right next service from each customer's history.",
  },
];
```

Also (Part C) `featuredSlugs` gained `"bakery"`:

```diff
-export const featuredSlugs = ["pet-care", "dentist", "restaurant"];
+export const featuredSlugs = ["pet-care", "dentist", "restaurant", "bakery"];
```

## A2. `components/studio/Sections.tsx` — new section + links + counter

Import:

```diff
-import { featuredSlugs, marqueeWords, microcopy, process, services, statement } from "./data";
+import { automationCapabilities, featuredSlugs, marqueeWords, microcopy, process, services, statement } from "./data";
```

New section component (inserted before `StCounters`):

```tsx
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
```

Nav link (`StNav`):

```diff
           <a href="#work" data-magnetic className="transition hover:opacity-60">Work</a>
           <a href="#services" data-magnetic className="transition hover:opacity-60">Services</a>
+          <a href="#automations" data-magnetic className="transition hover:opacity-60">Automations</a>
           <a href="#process" data-magnetic className="transition hover:opacity-60">Process</a>
```

Footer link (`StFooter`):

```diff
             <a href="#work" data-magnetic className="hover:text-[var(--st-cream)]">Work</a>
             <a href="#services" data-magnetic className="hover:text-[var(--st-cream)]">Services</a>
+            <a href="#automations" data-magnetic className="hover:text-[var(--st-cream)]">Automations</a>
             <a href="#process" data-magnetic className="hover:text-[var(--st-cream)]">Process</a>
```

Counter now derives from `featuredSlugs.length` (`StCounters`):

```diff
     { value: businesses.length, suffix: "", label: "Industries covered" },
     { value: businesses.length, suffix: "", label: "Live demos to explore" },
-    { value: 3, suffix: "", label: "Awwwards-grade builds" },
+    { value: featuredSlugs.length, suffix: "", label: "Awwwards-grade builds" },
```

## A3. `components/studio/StudioExperience.tsx` — render the section

```diff
 import {
+  StAutomations,
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
```

```diff
         <StServices />
+        <StAutomations />
         <StCounters />
```

---

# Part B — Top-3 new automations on every demo

## B1. `data/businesses.ts` — 12 generic demos

Three new `AutomationInfo` objects were appended to each generic business's `automations` array (rendered automatically by `AutomationList`). Full code of every appended block:

### Riverside Family Medicine (`doctor`)

```ts
{
  icon: "\u{1F48A}",
  title: "Prescription refill automation",
  description:
    "Patients request refills in a tap; AI checks history, routes to the provider, and texts adherence reminders.",
  benefit: "Fewer pharmacy calls and better medication compliance.",
},
{
  icon: "\u{1F9EA}",
  title: "Lab-result plain-language explainer",
  description: "Turns results into an easy-to-read summary and auto-books a follow-up when values need attention.",
  benefit: "Calmer patients and faster, safer follow-up.",
},
{
  icon: "\u{1F4CA}",
  title: "Preventive-care gap detection",
  description: "Scans charts for overdue screenings by age and risk, then invites the right patients back.",
  benefit: "Healthier panel and stronger quality scores.",
},
```

### Flour & Bloom Bakery (`bakery`)

```ts
{
  icon: "\u{1F4C8}",
  title: "Daily demand forecasting",
  description: "Predicts how much to bake each day from order history, weather, and local events.",
  benefit: "Less waste and fewer sold-out disappointments.",
},
{
  icon: "\u{1F37D}\uFE0F",
  title: "Catering inquiry qualifier",
  description: "An AI assistant captures event size, date, and budget, then returns an instant catering quote.",
  benefit: "More booked events with zero back-and-forth.",
},
{
  icon: "\u{1F6D2}",
  title: "Abandoned-order recovery",
  description: "Spots carts left unfinished online and sends a friendly nudge with a one-tap checkout link.",
  benefit: "Recovers sales that would otherwise vanish.",
},
```

### Luxe & Co. Salon Spa (`salon-spa`)

```ts
{
  icon: "\u{1F488}",
  title: "AI stylist matching",
  description: "Pairs each client's goals and hair type with the best-fit stylist when they book.",
  benefit: "Happier clients and better-balanced stylist calendars.",
},
{
  icon: "\u23F3",
  title: "Gap-fill scheduling",
  description: "Detects last-minute openings and offers them to waitlisted or lapsed clients automatically.",
  benefit: "Turns dead chair-time into revenue.",
},
{
  icon: "\u{1F9F4}",
  title: "Retail product cross-sell",
  description: "Recommends take-home products based on the service performed and past purchases.",
  benefit: "Adds high-margin retail sales to every visit.",
},
```

### IronPulse Fitness (`gym`)

```ts
{
  icon: "\u{1F3CB}\uFE0F",
  title: "AI personal-training plans",
  description: "Generates a tailored workout and progression plan from each member's goals and intake answers.",
  benefit: "Premium coaching value that drives upgrades.",
},
{
  icon: "\u{1F4C9}",
  title: "Churn-risk prediction",
  description: "Flags members whose attendance is slipping and triggers a coach check-in before they quit.",
  benefit: "Keeps members longer and lifts retention.",
},
{
  icon: "\u{1F4C5}",
  title: "Class-demand forecasting",
  description: "Predicts which classes will fill and recommends schedule and capacity tweaks.",
  benefit: "Fuller classes and smarter coach staffing.",
},
```

### Beacon Realty Group (`real-estate`)

```ts
{
  icon: "\u{1F3AF}",
  title: "AI lead scoring",
  description: "Ranks every inquiry hot, warm, or cold so you call the buyers most ready to move first.",
  benefit: "More closings from the same lead volume.",
},
{
  icon: "\u{1F4DD}",
  title: "Auto listing descriptions",
  description: "Writes polished, MLS-ready listing copy from photos and property specs in seconds.",
  benefit: "List faster and look consistently professional.",
},
{
  icon: "\u{1F511}",
  title: "Buyer-property matching",
  description: "Matches new listings to buyer criteria and alerts them the moment a fit hits the market.",
  benefit: "Buyers tour sooner and stay loyal to you.",
},
```

### Apex Auto Works (`auto-repair`)

```ts
{
  icon: "\u{1F50D}",
  title: "AI diagnostic assistant",
  description: "Turns described symptoms into likely causes and an estimate range before the car arrives.",
  benefit: "Faster check-ins and more accurate quotes.",
},
{
  icon: "\u{1F4E6}",
  title: "Parts availability & ETA",
  description: "Checks supplier stock automatically and texts the customer a realistic ready-by time.",
  benefit: "Fewer delays and no surprise wait times.",
},
{
  icon: "\u{1F6E3}\uFE0F",
  title: "Predictive maintenance reminders",
  description: "Uses mileage and service history to predict the next due service and invite the driver back.",
  benefit: "Reliable repeat business on autopilot.",
},
```

### Sterling & Hale Law (`law-firm`)

```ts
{
  icon: "\u{1F50E}",
  title: "AI conflict-of-interest check",
  description: "Screens every new intake against existing clients and matters before you take the case.",
  benefit: "Avoids ethics risks and wasted intake time.",
},
{
  icon: "\u{1F58A}\uFE0F",
  title: "Document drafting assistant",
  description: "Generates first drafts of routine letters and filings from the intake details.",
  benefit: "Hours of associate time saved per matter.",
},
{
  icon: "\u23F1\uFE0F",
  title: "Deadline & statute tracking",
  description: "Auto-calculates key dates and statutes of limitations and alerts the team before they hit.",
  benefit: "Never miss a critical filing deadline.",
},
```

### GreenScape Pros (`landscaping`)

```ts
{
  icon: "\u{1F6F0}\uFE0F",
  title: "Aerial measurement quotes",
  description: "Measures lawn and bed sizes from satellite imagery to auto-price a quote from an address alone.",
  benefit: "Accurate quotes without a site visit.",
},
{
  icon: "\u{1F33B}",
  title: "AI project visualization",
  description: "Generates before/after design mockups so clients can see the finished landscape upfront.",
  benefit: "Closes bigger design jobs faster.",
},
{
  icon: "\u{1F69A}",
  title: "Crew route optimization",
  description: "Sequences each day's jobs into the most efficient route for every crew.",
  benefit: "More jobs per day and lower fuel costs.",
},
```

### Sparkle & Co. Cleaning (`cleaning`)

```ts
{
  icon: "\u{1F4B0}",
  title: "AI instant quotes",
  description: "Prices a clean instantly from home size, rooms, and a few uploaded photos.",
  benefit: "Same-second quotes win more bookings.",
},
{
  icon: "\u{1F69A}",
  title: "Crew dispatch & routing",
  description: "Assigns jobs to the nearest available crew and builds the most efficient daily route.",
  benefit: "More homes per day and on-time arrivals.",
},
{
  icon: "\u{1F4F8}",
  title: "Quality-check photo verification",
  description: "Crews upload finish photos that AI reviews against a checklist before the job is marked done.",
  benefit: "Consistent quality and fewer callbacks.",
},
```

### Aperture & Co. (`photographer`)

```ts
{
  icon: "\u{1F4AC}",
  title: "AI inquiry qualifier",
  description: "Captures shoot type, date, and budget, then recommends the right package automatically.",
  benefit: "Books the right clients without phone tag.",
},
{
  icon: "\u2702\uFE0F",
  title: "Automated photo culling",
  description: "AI sorts and shortlists the keepers from a shoot so you start editing in minutes.",
  benefit: "Hours of selection time saved per session.",
},
{
  icon: "\u{1F5BC}\uFE0F",
  title: "Print & album upsell",
  description: "Recommends tailored print and album products after delivery based on the client's favorites.",
  benefit: "Higher revenue per booking, hands-free.",
},
```

### Little Sprouts Daycare (`daycare`)

```ts
{
  icon: "\u{1F4CB}",
  title: "AI waitlist & spot matching",
  description: "Matches openings to the right age group and offers them to waitlisted families automatically.",
  benefit: "Fills classrooms faster with the right fit.",
},
{
  icon: "\u{1F3AF}",
  title: "Enrollment-likelihood scoring",
  description: "Predicts which touring families are most likely to enroll so staff follow up where it counts.",
  benefit: "Higher enrollment from every tour.",
},
{
  icon: "\u{1F4AC}",
  title: "Parent FAQ chatbot",
  description: "Answers questions on hours, policies, and availability instantly, day or night.",
  benefit: "Captures interested parents around the clock.",
},
```

### BlueLine Plumbing & Electric (`plumber-electrician`)

```ts
{
  icon: "\u{1F6A8}",
  title: "AI emergency severity triage",
  description: "Classifies incoming requests by urgency and pushes true emergencies to the top of the queue.",
  benefit: "Captures high-value urgent jobs first.",
},
{
  icon: "\u{1F4F8}",
  title: "Photo/video issue diagnosis",
  description: "Customers send a photo or clip and AI returns a likely fix and ballpark estimate.",
  benefit: "Faster, more accurate quotes before dispatch.",
},
{
  icon: "\u{1F69A}",
  title: "Technician routing & ETAs",
  description: "Assigns the closest qualified tech and texts a precise arrival window automatically.",
  benefit: "Tighter schedules and informed customers.",
},
```

## B2. Bespoke demos — new capability-grid sections

The three bespoke experiences hardcode their content and do not read `business.automations`, so each got a dedicated, theme-matched section component plus a render/import wiring change.

### Pawsome (`pet-care`) — `components/pawsome/Sections.tsx`

```tsx
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
```

`components/pawsome/PawsomeExperience.tsx`:

```diff
 import {
   PwAutomation,
+  PwAutomationIdeas,
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
```

```diff
         <PwStats />
+        <PwAutomationIdeas />
         <PwAutomation />
         <PwTestimonial />
```

### Bright Smile (`dentist`) — `components/brightsmile/Sections.tsx`

```tsx
const bsdAutomationIdeas = [
  {
    icon: "\u{1F6E1}\uFE0F",
    title: "Insurance eligibility checker",
    desc: "Verifies coverage and benefits automatically before the visit, so there are no billing surprises.",
  },
  {
    icon: "\u{1F4CB}",
    title: "Treatment-plan follow-up",
    desc: "Sequences gentle reminders for unaccepted treatment plans until the patient books the work.",
  },
  {
    icon: "\u23F3",
    title: "Cancellation waitlist auto-fill",
    desc: "Instantly offers a freed-up slot to waitlisted patients and rebooks it without a single phone call.",
  },
];

export function BsdAutomationIdeas() {
  return (
    <section className="px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mx-auto max-w-2xl text-center" data-bsd-reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--bsd-blue)]">More AI we can add</p>
          <h2 className="bsd-display bsd-h-xl mt-4 text-[var(--bsd-ink)]">
            Smarter front desk,<br />
            <span className="bsd-serif italic text-[var(--bsd-blue)]">on autopilot.</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {bsdAutomationIdeas.map((a) => (
            <div
              key={a.title}
              data-bsd-reveal
              className="rounded-[28px] border border-black/10 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="text-3xl">{a.icon}</div>
              <h3 className="bsd-display mt-5 text-2xl text-[var(--bsd-ink)]">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--bsd-muted)]">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

`components/brightsmile/BrightSmileExperience.tsx`:

```diff
 import {
   BsdAutomation,
+  BsdAutomationIdeas,
   BsdCta,
```

```diff
         <BsdStats />
+        <BsdAutomationIdeas />
         <BsdAutomation />
         <BsdFaq />
```

### Olive & Ember (`restaurant`) — `components/ember/Sections.tsx`

```tsx
const emAutomationIdeas = [
  {
    icon: "\u{1F37D}\uFE0F",
    title: "Waitlist & table-turn optimizer",
    desc: "Predicts table availability in real time and offers freed-up tables to the waitlist automatically.",
  },
  {
    icon: "\u{1F377}",
    title: "Personalized menu & upsell",
    desc: "Recommends dishes and wine pairings to each guest based on their past orders and the night's specials.",
  },
  {
    icon: "\u{1F389}",
    title: "Large-party inquiry handler",
    desc: "An AI assistant captures event size, date, and budget, then returns an instant private-dining quote.",
  },
];

export function EmAutomations() {
  return (
    <section className="relative px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="mx-auto max-w-2xl text-center" data-em-reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--em-ember)]">More on the pass</p>
          <h2 className="em-display em-h-xl mt-3 text-[var(--em-cream)]">
            AI we can <span className="em-serif italic text-[var(--em-ember-bright)]">fire up next.</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {emAutomationIdeas.map((a) => (
            <div key={a.title} data-em-reveal className="em-glass rounded-[28px] p-8">
              <div className="text-3xl">{a.icon}</div>
              <h3 className="em-display mt-5 text-2xl text-[var(--em-cream)] sm:text-3xl">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--em-cream)]/60">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

`components/ember/EmberExperience.tsx`:

```diff
 import {
+  EmAutomations,
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
```

```diff
         <EmGlow />
         <EmStats />
+        <EmAutomations />
         <EmEmbers onBack={() => navigateWithWipe("/")} />
```

---

# Part C — Flour & Bloom bespoke "Bakehouse" redesign

Inspired by [cravburgers.shop](https://www.cravburgers.shop/): bold duplicated kinetic headlines, dramatic dark mood, ingredient-layer storytelling, a pinned horizontal "pass", and a path-drawn craft section.

## C1. `components/flourbloom/data.ts` (new)

```ts
/**
 * Content for the bespoke Flour & Bloom Bakery experience ("The Bakehouse").
 * Imagery uses Unsplash with a graceful gradient + emoji fallback if a photo
 * fails to load (see the onError handler in Sections.tsx).
 */

export const chapters = [
  { no: "01", name: "Rise" },
  { no: "02", name: "Craft" },
  { no: "03", name: "Bakes" },
  { no: "04", name: "Layers" },
  { no: "05", name: "Fresh" },
  { no: "06", name: "Crumbs" },
];

export const storyLines: string[] = [
  "We start before sunrise,",
  "with flour, water, time,",
  "and a little stubborn love.",
  "Everything here is made by hand,",
  "the slow way, the good way.",
];

export type Bake = {
  no: string;
  name: string;
  note: string;
  price: string;
  emoji: string;
  image: string;
};

export const signatureBakes: Bake[] = [
  {
    no: "I",
    name: "Custom Celebration Cake",
    note: "Made-to-order for any occasion, finished with a flourish.",
    price: "$48",
    emoji: "\u{1F382}",
    image:
      "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=1100&q=80",
  },
  {
    no: "II",
    name: "Wild Sourdough Loaf",
    note: "Naturally leavened, 24-hour ferment, blistered crust.",
    price: "$9",
    emoji: "\u{1F35E}",
    image:
      "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&w=1100&q=80",
  },
  {
    no: "III",
    name: "Butter Croissant",
    note: "Laminated by hand, baked golden every single morning.",
    price: "$4",
    emoji: "\u{1F950}",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1100&q=80",
  },
  {
    no: "IV",
    name: "Box of Six Cupcakes",
    note: "Seasonal flavors crowned with swirled buttercream.",
    price: "$24",
    emoji: "\u{1F9C1}",
    image:
      "https://images.unsplash.com/photo-1426869981800-95ebf51ce900?auto=format&fit=crop&w=1100&q=80",
  },
  {
    no: "V",
    name: "Cinnamon Roll",
    note: "Warm, gooey, and finished with cream-cheese glaze.",
    price: "$5",
    emoji: "\u{1F33C}",
    image:
      "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=1100&q=80",
  },
];

/** Ingredient layers, stacked bottom-to-top as you scroll (CRAV-inspired). */
export type Layer = {
  name: string;
  note: string;
  emoji: string;
  tone: string;
};

export const layers: Layer[] = [
  { name: "Stone-milled flour", note: "Organic, locally milled, the soul of every crumb.", emoji: "\u{1F33E}", tone: "#e3b873" },
  { name: "Cultured butter", note: "Slow-churned, folded in layer after layer.", emoji: "\u{1F9C8}", tone: "#f4d35e" },
  { name: "Vanilla cream", note: "Madagascar vanilla whipped to a cloud.", emoji: "\u{1F366}", tone: "#f7e6d0" },
  { name: "Wild berries", note: "Macerated overnight for a jammy ribbon.", emoji: "\u{1F353}", tone: "#db2777" },
  { name: "A final dust", note: "Powdered sugar, like the first snow.", emoji: "\u2744\uFE0F", tone: "#ffffff" },
];

export type FreshCard = {
  time: string;
  title: string;
  note: string;
  emoji: string;
};

export const freshCards: FreshCard[] = [
  { time: "5:00 AM", title: "The ovens wake", note: "Sourdough scored and loaded while the city sleeps.", emoji: "\u{1F525}" },
  { time: "7:00 AM", title: "Counter fills", note: "Croissants and rolls land warm, glaze still glistening.", emoji: "\u{1F950}" },
  { time: "11:00 AM", title: "Custom pickups", note: "Cakes boxed, photographed, and texted: ready.", emoji: "\u{1F382}" },
  { time: "Same day", title: "Delivered warm", note: "Local delivery across the neighborhood, on the bike.", emoji: "\u{1F6F5}" },
];

export const stats = [
  { value: 120, prefix: "+", suffix: "%", label: "More custom orders" },
  { value: 9, suffix: " hrs", label: "Counter time saved / wk" },
  { value: 48, suffix: "%", label: "Repeat customers" },
  { value: 24, suffix: " hr", label: "Sourdough ferment" },
];

export const marqueeWords = [
  "Sourdough",
  "Croissants",
  "Custom Cakes",
  "Cupcakes",
  "Cinnamon Rolls",
  "Fresh Daily",
  "Made by Hand",
];

/** Cake styles for the custom-order intake demo. */
export const orderServices = [
  "Custom Celebration Cake",
  "Birthday Cake",
  "Wedding Tier",
  "Cupcake Box",
  "Seasonal Special",
];

/** Items used to build the digital receipt mock. */
export const receiptItems: { name: string; price: number }[] = [
  { name: "Custom Celebration Cake", price: 48 },
  { name: "Wild Sourdough Loaf", price: 9 },
  { name: "Butter Croissant", price: 4 },
  { name: "Box of Six Cupcakes", price: 24 },
  { name: "Cinnamon Roll", price: 5 },
];

export const testimonial = {
  quote:
    "Custom cake orders used to be a mess of DMs. Now everything is organized and customers get a proper receipt instantly.",
  author: "Maria Flores",
  role: "Owner, Flour & Bloom Bakery",
};

export const contact = {
  phone: "(737) 555-0119",
  address: "55 Cedar St, Austin, TX",
  hours: "Tue-Sun, 7am til the racks are empty",
};
```

## C2. `components/flourbloom/FlourBloomOrder.tsx` (new)

```tsx
"use client";

import { useMemo, useState } from "react";
import { orderServices, receiptItems } from "./data";

type Tab = "order" | "receipt";
type Status = "idle" | "typing" | "sent";

export function FlourBloomOrder() {
  const [tab, setTab] = useState<Tab>("order");
  return (
    <div>
      <div className="mx-auto mb-10 flex max-w-md rounded-full border border-white/10 bg-black/30 p-1.5">
        <TabBtn active={tab === "order"} onClick={() => setTab("order")}>
          Custom cake + WhatsApp
        </TabBtn>
        <TabBtn active={tab === "receipt"} onClick={() => setTab("receipt")}>
          Instant receipt
        </TabBtn>
      </div>
      {tab === "order" ? <OrderPanel /> : <ReceiptPanel />}
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
        active ? "bg-[var(--fb-amber)] text-[#23130a]" : "text-[var(--fb-cream)]/60 hover:text-[var(--fb-cream)]"
      }`}
    >
      {children}
    </button>
  );
}

/* -------------------------------- Order ---------------------------------- */

function OrderPanel() {
  const [name, setName] = useState("");
  const [cake, setCake] = useState(orderServices[0]);
  const [date, setDate] = useState("");
  const [flavor, setFlavor] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const canSubmit = name.trim() && date && status === "idle";
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
      <form onSubmit={submit} className="fb-glass rounded-[28px] p-7 sm:p-9">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--fb-pink)]">Live demo</div>
        <h3 className="fb-serif mt-3 text-4xl text-[var(--fb-cream)]">Order a custom cake</h3>
        <div className="mt-7 space-y-4">
          <Field label="Name">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Olivia Grant" className="fb-input" />
          </Field>
          <Field label="What are we baking?">
            <select value={cake} onChange={(e) => setCake(e.target.value)} className="fb-input">
              {orderServices.map((s) => (
                <option key={s} className="text-black">
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Needed by">
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="fb-input" />
            </Field>
            <Field label="Flavor / theme">
              <input value={flavor} onChange={(e) => setFlavor(e.target.value)} placeholder="Vanilla & berries" className="fb-input" />
            </Field>
          </div>
          <button type="submit" disabled={!canSubmit} data-magnetic className="fb-btn mt-2 w-full justify-center disabled:opacity-40">
            {status === "idle" ? "Send my order" : "Order placed"}
          </button>
          {status === "sent" && (
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setName("");
                setDate("");
                setFlavor("");
              }}
              className="w-full text-center text-sm text-[var(--fb-cream)]/50 hover:text-[var(--fb-cream)]"
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
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-lg">{"\u{1F950}"}</span>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-white">Flour &amp; Bloom</div>
                <div className="text-[11px] text-white/60">WhatsApp Business</div>
              </div>
            </div>
            <div className="flex min-h-[300px] flex-col gap-2 p-4">
              {status === "idle" && (
                <p className="m-auto max-w-[80%] text-center text-xs text-white/40">
                  Place an order and an instant WhatsApp confirmation arrives.
                </p>
              )}
              {status !== "idle" && (
                <div className="self-center rounded-full bg-white/10 px-3 py-1 text-[10px] text-white/50">
                  {prettyDate}
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
                    <p className="font-semibold">Order in, {first}! {"\u{1F382}"}</p>
                    <p className="mt-1">
                      Your <b>{cake}</b>
                      {flavor ? (
                        <>
                          {" "}
                          (<b>{flavor}</b>)
                        </>
                      ) : null}{" "}
                      is booked for <b>{prettyDate}</b>.
                    </p>
                    <Meta />
                  </Bubble>
                  <Bubble delay>
                    <p>We&rsquo;ll text you a photo the moment it&rsquo;s boxed and ready for pickup.</p>
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

const TAX = 0.0825;

function ReceiptPanel() {
  const [qty, setQty] = useState<Record<string, number>>({ "Custom Celebration Cake": 1, "Butter Croissant": 2 });
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
      <div className="fb-glass rounded-[28px] p-6 sm:p-8">
        <h3 className="fb-serif text-3xl text-[var(--fb-cream)]">Build the order</h3>
        <p className="mt-1 text-sm text-[var(--fb-cream)]/50">An itemized receipt generates and sends itself.</p>
        <div className="mt-6 space-y-3">
          {receiptItems.map((it) => {
            const count = qty[it.name] ?? 0;
            return (
              <div key={it.name} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 p-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-[var(--fb-cream)]">{it.name}</div>
                  <div className="text-xs text-[var(--fb-cream)]/50">{fmt(it.price)}</div>
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
        <div className="relative flex-1 overflow-hidden rounded-[28px] bg-[#1c130b] p-6 ring-1 ring-white/10">
          <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: "linear-gradient(90deg, var(--fb-pink), var(--fb-amber))" }} />
          <div className="flex items-start justify-between border-b border-dashed border-white/15 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{"\u{1F950}"}</span>
              <span className="fb-serif text-xl text-[var(--fb-cream)]">Flour &amp; Bloom</span>
            </div>
            <div className="text-right text-xs text-[var(--fb-cream)]/50">
              <div className="font-semibold text-[var(--fb-cream)]/80">Receipt {receiptNo}</div>
              <div>Pickup counter</div>
            </div>
          </div>
          <div className="min-h-[150px] py-4">
            {lines.length === 0 ? (
              <p className="py-12 text-center text-sm text-[var(--fb-cream)]/40">Add a bake to start the receipt.</p>
            ) : (
              <table className="w-full text-sm">
                <tbody>
                  {lines.map((it) => (
                    <tr key={it.name} className="animate-fade-up">
                      <td className="py-1.5 text-[var(--fb-cream)]/80">
                        {it.name}
                        <span className="text-[var(--fb-cream)]/40"> &times;{it.count}</span>
                      </td>
                      <td className="py-1.5 text-right font-medium text-[var(--fb-cream)]">{fmt(it.price * it.count)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="space-y-1.5 border-t border-dashed border-white/15 pt-4 text-sm">
            <Row label="Subtotal" value={fmt(subtotal)} />
            <Row label={`Tax (${(TAX * 100).toFixed(2)}%)`} value={fmt(tax)} />
            <div className="flex justify-between pt-1 text-base font-bold text-[var(--fb-cream)]">
              <span>Total</span>
              <span style={{ color: "var(--fb-amber)" }}>{fmt(total)}</span>
            </div>
          </div>
          <p className="mt-4 text-center text-[11px] text-[var(--fb-cream)]/40">Auto-generated &middot; emailed &amp; texted to the customer</p>
        </div>
        <button
          type="button"
          disabled={lines.length === 0}
          onClick={() => setSent(true)}
          data-magnetic
          className="fb-btn mt-4 w-full justify-center disabled:opacity-40"
        >
          {sent ? "Receipt sent \u2713" : "Send digital receipt"}
        </button>
        {sent && <p className="mt-2 animate-fade-up text-center text-sm font-medium text-[var(--fb-amber)]">Receipt {receiptNo} sent automatically.</p>}
      </div>
    </div>
  );
}

/* ------------------------------- helpers --------------------------------- */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--fb-cream)]/45">{label}</span>
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
      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-lg font-semibold text-[var(--fb-cream)] transition hover:border-[var(--fb-amber)] hover:text-[var(--fb-amber)] disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[var(--fb-cream)]/60">
      <span>{label}</span>
      <span className="font-medium text-[var(--fb-cream)]/85">{value}</span>
    </div>
  );
}
```

## C3. `components/flourbloom/Sections.tsx` (new)

```tsx
"use client";

import {
  contact,
  freshCards,
  layers,
  marqueeWords,
  signatureBakes,
  stats,
  storyLines,
  testimonial,
  type Bake,
} from "./data";
import { FlourBloomOrder } from "./FlourBloomOrder";

/* -------------------------------------------------------------------------- */
/*  Shared helpers                                                            */
/* -------------------------------------------------------------------------- */

function BakeImage({ item }: { item: Bake }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[26px]">
      <div
        className="fb-img-fallback"
        style={{ background: "linear-gradient(150deg, var(--fb-crust), var(--fb-bg))" }}
      >
        <span>{item.emoji}</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.opacity = "0";
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
    </div>
  );
}

function KineticWord({ word }: { word: string }) {
  return (
    <>
      {word.split("").map((c, i) => (
        <span key={i} className="fb-letter inline-block">
          {c}
        </span>
      ))}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Nav                                                                       */
/* -------------------------------------------------------------------------- */

export function FbNav({ onBack }: { onBack: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-[70]">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 sm:px-10">
        <button type="button" onClick={onBack} data-magnetic className="text-sm font-semibold tracking-tight text-[var(--fb-cream)]">
          &larr; Lumen Studio
        </button>
        <div className="fb-display text-lg tracking-tight text-[var(--fb-cream)]">Flour &amp; Bloom</div>
        <a href="#order" data-magnetic className="hidden text-sm font-semibold text-[var(--fb-cream)] sm:block">
          Order
        </a>
      </nav>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero (Rise) — bold, duplicated kinetic headline                          */
/* -------------------------------------------------------------------------- */

export function FbHero() {
  return (
    <section data-fb-hero className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-28 sm:px-10">
      <div className="fb-blob" style={{ width: 540, height: 540, top: "-8%", left: "-6%", background: "var(--fb-amber)" }} />
      <div className="fb-blob" style={{ width: 460, height: 460, bottom: "-10%", right: "-4%", background: "var(--fb-pink)" }} />

      <div className="relative mx-auto w-full max-w-[1600px]">
        <p className="fb-hero-sub mb-6 text-xs uppercase tracking-[0.35em] text-[var(--fb-cream)]/55">
          Austin, TX &middot; Artisan bakery est. 2014
        </p>

        <h1 className="fb-display fb-h-mega select-none text-[var(--fb-cream)]" aria-label="Flour & Bloom">
          <span className="block">
            <KineticWord word="FLOUR" />{" "}
            <span className="fb-serif italic text-[var(--fb-pink)]"><KineticWord word="&" /></span>
          </span>
          <span className="block">
            <KineticWord word="BLOOM" />
          </span>
        </h1>

        {/* duplicated / echoed sub-headline, CRAV-style */}
        <div className="fb-echo mt-2" aria-hidden>
          <span className="fb-echo__line">FRESH BAKED</span>
          <span className="fb-echo__line fb-echo__line--ghost">MADE TO ORDER</span>
        </div>

        <div className="mt-9 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <p className="fb-hero-sub max-w-md text-lg leading-relaxed text-[var(--fb-cream)]/70">
            Sourdough, pastries, and made-to-order cakes. Ordered in seconds,
            confirmed before the oven even beeps.
          </p>
          <a href="#order" data-magnetic className="fb-btn fb-hero-sub">
            Order something warm <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </div>

      {/* floating glass receipt card */}
      <div className="fb-glass fb-hero-sub absolute right-[6%] top-[24%] hidden w-56 rounded-2xl p-4 lg:block">
        <div className="text-[10px] uppercase tracking-widest text-[var(--fb-pink)]">New order</div>
        <div className="mt-1 text-sm font-semibold text-[var(--fb-cream)]">
          Celebration Cake &mdash; Sat pickup
        </div>
        <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-[var(--fb-cream)]/60">
          <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" /> Confirmed on WhatsApp
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-[var(--fb-cream)]/40">
        Scroll &mdash; the ovens are on
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Marquee                                                                   */
/* -------------------------------------------------------------------------- */

export function FbMarquee() {
  const row = [...marqueeWords, ...marqueeWords];
  return (
    <section className="border-y border-white/10 py-6" aria-hidden>
      <div className="fb-marquee">
        {row.map((w, i) => (
          <span key={i} className="fb-display flex items-center text-4xl text-[var(--fb-cream)]/80 sm:text-6xl">
            <span className="px-8">{w}</span>
            <span className="text-[var(--fb-pink)]">&#10046;</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Craft (story, masked-line reveal + wheat draw)                           */
/* -------------------------------------------------------------------------- */

export function FbCraft() {
  return (
    <section className="relative px-6 py-32 sm:px-10 sm:py-44">
      <div className="mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-[1.3fr_0.7fr]">
        <div data-fb-lines>
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[var(--fb-pink)]">02 &mdash; Craft</p>
          <h2 className="fb-display text-balance text-4xl text-[var(--fb-cream)] sm:text-6xl md:text-7xl">
            {storyLines.map((line, i) => (
              <span key={i} className="fb-line-mask">
                <span className="fb-line">{line}</span>
              </span>
            ))}
          </h2>
        </div>

        {/* Animated wheat stalk */}
        <svg viewBox="0 0 200 320" className="mx-auto w-32 sm:w-44" fill="none" aria-hidden>
          <path className="fb-draw" d="M100 312 C 100 240, 100 170, 100 70 C 100 44, 100 24, 100 6" stroke="var(--fb-amber)" strokeWidth="3" strokeLinecap="round" />
          {[
            { y: 230, r: -38 },
            { y: 230, r: 38 },
            { y: 185, r: -42 },
            { y: 185, r: 42 },
            { y: 140, r: -38 },
            { y: 140, r: 38 },
            { y: 96, r: -44 },
            { y: 96, r: 44 },
            { y: 56, r: -34 },
            { y: 56, r: 34 },
          ].map((grain, i) => (
            <g key={i} className="fb-leaf" style={{ transformOrigin: `100px ${grain.y}px` }} transform={`rotate(${grain.r} 100 ${grain.y})`}>
              <ellipse cx={100} cy={grain.y - 20} rx="7" ry="18" fill="var(--fb-amber)" opacity="0.9" />
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Bakes (pinned horizontal pass)                                           */
/* -------------------------------------------------------------------------- */

export function FbBakes() {
  return (
    <section className="fb-pass relative flex h-[100svh] flex-col overflow-hidden">
      <div className="px-6 pt-24 sm:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--fb-pink)]">03 &mdash; Bakes</p>
        <h2 className="fb-display fb-h-xl mt-2 text-[var(--fb-cream)]">Out of the oven</h2>
      </div>
      <div className="flex flex-1 items-center">
        <div className="fb-pass-track items-center gap-6 px-6 sm:gap-10 sm:px-10">
          {signatureBakes.map((c) => (
            <article
              key={c.no}
              className="relative h-[60vh] w-[80vw] flex-none overflow-hidden rounded-[26px] sm:w-[48vw] lg:w-[34vw]"
            >
              <BakeImage item={c} />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--fb-amber)]">{c.no}</div>
                    <h3 className="fb-display mt-1 text-3xl text-white sm:text-4xl">{c.name}</h3>
                    <p className="mt-2 max-w-xs text-sm text-white/70">{c.note}</p>
                  </div>
                  <span className="fb-serif text-3xl text-[var(--fb-amber)]">{c.price}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Layers (ingredient stack build)                                          */
/* -------------------------------------------------------------------------- */

export function FbLayers() {
  return (
    <section className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-14 max-w-2xl" data-fb-reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--fb-pink)]">04 &mdash; Layers</p>
          <h2 className="fb-display fb-h-xl mt-3 text-[var(--fb-cream)]">
            A story in <span className="fb-serif italic text-[var(--fb-pink)]">every layer.</span>
          </h2>
          <p className="mt-5 max-w-md text-[var(--fb-cream)]/60">
            Nothing is rushed and nothing is wasted. Built up, one honest layer at a time.
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Stacked layer chips */}
          <div className="flex flex-col-reverse gap-3">
            {layers.map((l, i) => (
              <div
                key={l.name}
                data-fb-reveal
                className="fb-layer flex items-center gap-5 rounded-2xl border border-white/10 p-5"
                style={{ marginLeft: `${i * 6}%` }}
              >
                <span
                  className="flex h-12 w-12 flex-none items-center justify-center rounded-xl text-2xl"
                  style={{ background: l.tone, color: "#23130a" }}
                >
                  {l.emoji}
                </span>
                <div>
                  <h3 className="fb-display text-xl text-[var(--fb-cream)] sm:text-2xl">{l.name}</h3>
                  <p className="mt-1 text-sm text-[var(--fb-cream)]/55">{l.note}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Connecting path */}
          <div className="hidden justify-center lg:flex" data-fb-reveal>
            <svg viewBox="0 0 240 360" className="w-56" fill="none" aria-hidden>
              <path
                className="fb-draw"
                d="M40 20 C 200 60, 40 120, 200 160 C 40 200, 200 240, 40 280 C 120 320, 160 330, 200 344"
                stroke="var(--fb-pink)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {[20, 90, 160, 230, 300].map((y, i) => (
                <circle key={i} cx={i % 2 === 0 ? 40 : 200} cy={y + 24} r="6" fill="var(--fb-amber)" />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Fresh (daily schedule cards)                                             */
/* -------------------------------------------------------------------------- */

export function FbFresh() {
  return (
    <section className="relative px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4" data-fb-reveal>
          <h2 className="fb-display fb-h-xl text-[var(--fb-cream)]">
            05 &mdash; Baked <span className="fb-serif italic text-[var(--fb-pink)]">fresh daily.</span>
          </h2>
          <p className="max-w-sm text-[var(--fb-cream)]/60">
            From the first scored loaf to a warm box at your door, every hour has its bake.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {freshCards.map((f) => (
            <div key={f.title} data-fb-reveal className="fb-glass rounded-[26px] p-7">
              <div className="text-3xl">{f.emoji}</div>
              <div className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--fb-amber)]">{f.time}</div>
              <h3 className="fb-display mt-2 text-2xl text-[var(--fb-cream)]">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--fb-cream)]/60">{f.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stats                                                                     */
/* -------------------------------------------------------------------------- */

export function FbStats() {
  return (
    <section className="border-y border-white/10 px-6 py-24 sm:px-10">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-y-12 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} data-fb-reveal className="text-center">
            <div
              className="fb-display fb-counter text-5xl text-[var(--fb-cream)] sm:text-7xl"
              data-value={s.value}
              data-prefix={s.prefix ?? ""}
              data-suffix={s.suffix}
              data-decimals={0}
            >
              {s.prefix ?? ""}0{s.suffix}
            </div>
            <div className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--fb-cream)]/50">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Order (interactive automation demo)                                      */
/* -------------------------------------------------------------------------- */

export function FbOrder() {
  return (
    <section id="order" className="relative px-6 py-28 sm:px-10">
      <div className="relative mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-2xl text-center" data-fb-reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--fb-pink)]">Try it live</p>
          <h2 className="fb-display fb-h-xl mt-3 text-[var(--fb-cream)]">Order it. We&rsquo;ll text you.</h2>
          <p className="mt-5 text-[var(--fb-cream)]/60">
            A working demo. Place a custom-cake order for an instant WhatsApp confirmation,
            or build a basket to watch an itemized receipt generate itself.
          </p>
        </div>
        <div className="mt-14" data-fb-reveal>
          <FlourBloomOrder />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Crumbs (testimonial + CTA + footer)                                      */
/* -------------------------------------------------------------------------- */

export function FbCrumbs({ onBack }: { onBack: () => void }) {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-32 sm:px-10">
      <figure className="mx-auto max-w-5xl text-center" data-fb-lines>
        <div className="text-2xl text-[var(--fb-amber)]">{"\u2605\u2605\u2605\u2605\u2605"}</div>
        <blockquote className="fb-display mt-8 text-balance text-3xl leading-tight text-[var(--fb-cream)] sm:text-5xl md:text-6xl">
          <span className="fb-line-mask"><span className="fb-line">&ldquo;{testimonial.quote}&rdquo;</span></span>
        </blockquote>
        <figcaption className="mt-10 text-sm uppercase tracking-[0.2em] text-[var(--fb-cream)]/50">
          {testimonial.author} &mdash; {testimonial.role}
        </figcaption>
      </figure>

      <div className="mx-auto mt-28 max-w-[1600px] text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[var(--fb-pink)]">06 &mdash; Crumbs</p>
        <h2 className="fb-display text-[clamp(2.6rem,11vw,11rem)] leading-[0.9] text-[var(--fb-cream)]">
          Come get it<br />
          <span className="fb-serif italic text-[var(--fb-pink)]">while it&rsquo;s warm.</span>
        </h2>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a href="#order" data-magnetic className="fb-btn text-base">
            Order something warm <span aria-hidden>&rarr;</span>
          </a>
          <button type="button" onClick={onBack} data-magnetic className="fb-btn fb-btn--ghost text-base">
            Back to portfolio
          </button>
        </div>
      </div>

      <footer className="mx-auto mt-24 flex max-w-[1600px] flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[var(--fb-cream)]/45 sm:flex-row">
        <span>Flour &amp; Bloom &middot; {contact.phone}</span>
        <span>{contact.address} &middot; {contact.hours}</span>
        <span>Built by Lumen Studio &middot; &copy; {new Date().getFullYear()}</span>
      </footer>
    </section>
  );
}
```

## C4. `components/flourbloom/FlourBloomExperience.tsx` (new)

```tsx
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { loadMotionLibs, prefersReducedMotion } from "@/components/pawsome/motion";
import {
  FbBakes,
  FbCraft,
  FbCrumbs,
  FbFresh,
  FbHero,
  FbLayers,
  FbMarquee,
  FbNav,
  FbOrder,
  FbStats,
} from "./Sections";

export function FlourBloomExperience() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
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

    /* Custom cursor (lerp-follow ring + dot) */
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
        pos.x += (target.x - pos.x) * 0.16;
        pos.y += (target.y - pos.y) * 0.16;
        ring.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        rafId = requestAnimationFrame(tick);
      };
      window.addEventListener("mousemove", onMove);
      rafId = requestAnimationFrame(tick);

      const onOver = (e: MouseEvent) => {
        const t = e.target as HTMLElement;
        ring.dataset.variant = t.closest("a, button, [data-magnetic]") ? "hover" : "";
      };
      document.addEventListener("mouseover", onOver);
      cleanups.push(() => {
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseover", onOver);
      });
    }

    /* Preloader "preheat" fill */
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
          const x = (e.clientX - (r.left + r.width / 2)) * 0.38;
          const y = (e.clientY - (r.top + r.height / 2)) * 0.38;
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
        /* Hero intro: kinetic letters + subs */
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from("[data-fb-hero] .fb-letter", {
          opacity: 0,
          yPercent: 80,
          duration: 0.8,
          stagger: { each: 0.04, from: "start" },
        });
        tl.from(".fb-hero-sub", { opacity: 0, y: 24, duration: 0.8, stagger: 0.12 }, "-=0.4");

        /* Masked line groups */
        gsap.utils.toArray<HTMLElement>("[data-fb-lines]").forEach((group) => {
          gsap.from(group.querySelectorAll(".fb-line"), {
            yPercent: 115,
            duration: 1,
            ease: "power4.out",
            stagger: 0.12,
            scrollTrigger: { trigger: group, start: "top 82%" },
          });
        });

        /* Generic reveals */
        gsap.utils.toArray<HTMLElement>("[data-fb-reveal]").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 50,
            scale: 0.98,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });

        /* Counters */
        gsap.utils.toArray<HTMLElement>(".fb-counter").forEach((el) => {
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

        /* SVG path draw (wheat stalk + layer connector) */
        gsap.utils.toArray<SVGPathElement>(".fb-draw").forEach((path) => {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: "power2.inOut",
            scrollTrigger: { trigger: path, start: "top 85%" },
          });
        });

        /* Wheat grains sway */
        gsap.to(".fb-leaf", {
          rotation: "+=5",
          transformOrigin: "center",
          duration: 2.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: { each: 0.16, from: "center" },
        });

        /* Pinned bakes "pass" */
        const track = root.querySelector<HTMLElement>(".fb-pass-track");
        const passEl = root.querySelector<HTMLElement>(".fb-pass");
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
    <div ref={rootRef} className="flourbloom">
      {/* Custom cursor */}
      <div ref={cursorRef} className="fb-cursor" data-variant="" aria-hidden />
      <div ref={dotRef} className="fb-cursor-dot" aria-hidden />

      {/* Grain + page wipe */}
      <div className="fb-grain" aria-hidden />
      <div ref={wipeRef} className="fb-wipe" aria-hidden />

      {/* Preloader */}
      <div ref={preloaderRef} className="fb-preloader">
        <span className="fb-serif text-4xl italic text-[var(--fb-cream)]">Preheating the oven.</span>
        <div className="fb-preloader__bar">
          <span ref={fillRef} className="fb-preloader__fill" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--fb-cream)]/50">Flour &amp; Bloom</span>
      </div>

      <FbNav onBack={() => navigateWithWipe("/")} />
      <main>
        <FbHero />
        <FbMarquee />
        <FbCraft />
        <FbBakes />
        <FbLayers />
        <FbFresh />
        <FbStats />
        <FbOrder />
        <FbCrumbs onBack={() => navigateWithWipe("/")} />
      </main>
    </div>
  );
}
```

## C5. `app/globals.css` — scoped `.flourbloom` block (appended)

```css
/* ============================================================
   FLOUR & BLOOM — "The Bakehouse" (CRAV-inspired, scoped)
   ============================================================ */
.flourbloom {
  --fb-bg: #1a120b;
  --fb-crust: #4a2c14;
  --fb-cream: #f6ead6;
  --fb-amber: #e09b3d;
  --fb-pink: #e3568f;
  --fb-ink: #120b06;
  --fb-display: "Playfair Display", Georgia, serif;
  --fb-serif: "Cormorant Garamond", Georgia, serif;
  --fb-sans: "Nunito", ui-sans-serif, system-ui, sans-serif;

  position: relative;
  background:
    radial-gradient(120% 80% at 50% -10%, rgba(224, 155, 61, 0.18), transparent 55%),
    radial-gradient(100% 80% at 50% 120%, rgba(227, 86, 143, 0.16), transparent 60%),
    var(--fb-bg);
  color: var(--fb-cream);
  font-family: var(--fb-sans);
  overflow-x: hidden;
}

@media (hover: hover) and (pointer: fine) {
  .flourbloom,
  .flourbloom a,
  .flourbloom button {
    cursor: none;
  }
}

/* Custom cursor */
.fb-cursor,
.fb-cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;
  border-radius: 9999px;
  will-change: transform;
}
.fb-cursor {
  width: 40px;
  height: 40px;
  margin: -20px 0 0 -20px;
  border: 1.5px solid var(--fb-amber);
  transition: width 0.28s ease, height 0.28s ease, margin 0.28s ease, background 0.28s ease;
}
.fb-cursor[data-variant="hover"] {
  width: 80px;
  height: 80px;
  margin: -40px 0 0 -40px;
  background: rgba(224, 155, 61, 0.18);
}
.fb-cursor-dot {
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -3px;
  background: var(--fb-pink);
  box-shadow: 0 0 12px 2px rgba(227, 86, 143, 0.7);
}
@media (hover: none) {
  .fb-cursor,
  .fb-cursor-dot {
    display: none;
  }
}

/* Film grain overlay (reuses pw-grain keyframes) */
.fb-grain {
  position: fixed;
  inset: -50%;
  z-index: 60;
  pointer-events: none;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation: pw-grain 0.6s steps(2) infinite;
}

/* Soft glow blobs */
.fb-blob {
  position: absolute;
  border-radius: 9999px;
  filter: blur(90px);
  opacity: 0.4;
  pointer-events: none;
  will-change: transform;
}

/* Glass card (warm) */
.fb-glass {
  background: rgba(246, 234, 214, 0.05);
  border: 1px solid rgba(246, 234, 214, 0.12);
  box-shadow: 0 30px 80px -40px rgba(224, 155, 61, 0.4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* Buttons */
.fb-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  border-radius: 9999px;
  background: linear-gradient(120deg, var(--fb-amber), var(--fb-pink));
  color: #23130a;
  padding: 0.95rem 1.8rem;
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  will-change: transform;
  box-shadow: 0 12px 40px -12px rgba(227, 86, 143, 0.55);
  transition: filter 0.3s ease;
}
.fb-btn:hover { filter: brightness(1.08); }
.fb-btn--ghost {
  background: transparent;
  color: var(--fb-cream);
  border: 1px solid rgba(246, 234, 214, 0.25);
  box-shadow: none;
}
.fb-btn--ghost:hover { background: rgba(246, 234, 214, 0.06); }

/* Inputs */
.fb-input {
  width: 100%;
  border-radius: 14px;
  border: 1px solid rgba(246, 234, 214, 0.18);
  background: rgba(18, 11, 6, 0.55);
  padding: 0.72rem 0.95rem;
  font-size: 0.9rem;
  color: var(--fb-cream);
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.fb-input::placeholder { color: rgba(246, 234, 214, 0.4); }
.fb-input:focus {
  border-color: var(--fb-amber);
  box-shadow: 0 0 0 4px rgba(224, 155, 61, 0.18);
}
.fb-input[type="date"] { color-scheme: dark; }

/* Typography */
.fb-display {
  font-family: var(--fb-display);
  font-weight: 700;
  line-height: 0.92;
  letter-spacing: -0.02em;
}
.fb-serif { font-family: var(--fb-serif); }
.fb-h-mega { font-size: clamp(3.4rem, 14vw, 14rem); }
.fb-h-xl { font-size: clamp(2.4rem, 7vw, 6.5rem); }

/* Kinetic headline letters */
.fb-letter {
  display: inline-block;
  will-change: transform, opacity;
}

/* Duplicated / echoed sub-headline (CRAV-style) */
.fb-echo {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.2em 0.5em;
  font-family: var(--fb-display);
  font-weight: 700;
  line-height: 1;
  font-size: clamp(1.4rem, 5vw, 3.4rem);
  letter-spacing: 0.02em;
}
.fb-echo__line { color: var(--fb-amber); }
.fb-echo__line--ghost {
  color: transparent;
  -webkit-text-stroke: 1px rgba(246, 234, 214, 0.35);
}

/* Reveal primitives */
.fb-reveal { opacity: 0; transform: translateY(40px) scale(0.98); }
.is-ready .fb-reveal { opacity: 1; transform: none; }
.fb-line-mask { overflow: hidden; display: block; }
.fb-line { display: block; transform: translateY(115%); }
.is-ready .fb-line { transform: none; }

/* SVG path draw (fallback: solid if GSAP unavailable) */
.fb-draw { stroke-dasharray: 1; stroke-dashoffset: 1; }
.is-ready .fb-draw { stroke-dasharray: none; stroke-dashoffset: 0; }

/* Image card */
.fb-img-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(3rem, 8vw, 6rem);
}
.flourbloom .fb-img-fallback + img {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: opacity 0.4s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Layer chip hover lift */
.fb-layer {
  background: rgba(246, 234, 214, 0.04);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease;
}
.fb-layer:hover {
  transform: translateY(-4px);
  background: rgba(246, 234, 214, 0.07);
}

/* Marquee (reuses pw-marquee keyframes) */
.fb-marquee {
  display: flex;
  width: max-content;
  will-change: transform;
  animation: pw-marquee 38s linear infinite;
}

/* Pinned bakes "pass" */
.fb-pass-track {
  display: flex;
  height: 100%;
  will-change: transform;
}

/* Counters */
.fb-counter { font-variant-numeric: tabular-nums; }

/* Preloader */
.fb-preloader {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
  background: var(--fb-bg);
  color: var(--fb-cream);
}
.fb-preloader__bar {
  width: min(220px, 60vw);
  height: 2px;
  background: rgba(246, 234, 214, 0.14);
  overflow: hidden;
  border-radius: 9999px;
}
.fb-preloader__fill {
  display: block;
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--fb-pink), var(--fb-amber));
}

/* Page wipe */
.fb-wipe {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: linear-gradient(180deg, var(--fb-amber), var(--fb-crust));
  transform: scaleY(0);
  transform-origin: bottom;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .fb-marquee { animation: none; }
  .fb-grain { animation: none; }
  .fb-reveal { opacity: 1; transform: none; }
  .fb-line { transform: none; }
}
```

## C6. `app/demo/[slug]/page.tsx` — routing branch

```diff
 import { EmberExperience } from "@/components/ember/EmberExperience";
+import { FlourBloomExperience } from "@/components/flourbloom/FlourBloomExperience";
```

```diff
   // Olive & Ember ships the "Tend the Fire" experience.
   if (business.slug === "restaurant") {
     return <EmberExperience />;
   }
+
+  // Flour & Bloom ships the bespoke "Bakehouse" experience.
+  if (business.slug === "bakery") {
+    return <FlourBloomExperience />;
+  }
```

---

## Notes

- Dependencies are intentionally **not** installed locally (blocked on the corporate npm registry; installed in the cloud). The only lint errors are in `app/demo/[slug]/page.tsx` from unresolved `next` types — pre-existing and environment-only; they resolve in the cloud build. All new `components/flourbloom/*` files lint clean.
- All work is additive plus the single routing branch; no generic demo component or other bespoke experience was altered beyond the new automation-idea sections.

*End of `code_change9.md` — delta after `code_change8.md`: 4 added files, 12 modified files.*
