/** Hero statement, split into words; `hl: true` words get the yellow highlight. */
export const statement: { text: string; hl?: boolean }[] = [
  { text: "We" },
  { text: "make" },
  { text: "local" },
  { text: "businesses" },
  { text: "unforgettable,", hl: true },
  { text: "bookable,", hl: true },
  { text: "and" },
  { text: "impossible" },
  { text: "to" },
  { text: "ignore" },
  { text: "online.", hl: true },
];

export const services = [
  {
    no: "01",
    name: "Websites & E-Commerce",
    desc: "Premium, custom-grade sites that look like a $2,000+ build and convert visitors into customers.",
  },
  {
    no: "02",
    name: "AI Automation",
    desc: "Booking confirmations, receipts, reminders, and follow-ups that run themselves, 24/7.",
  },
  {
    no: "03",
    name: "Booking & CRM",
    desc: "Online scheduling and lead pipelines wired straight into WhatsApp, SMS, and your inbox.",
  },
  {
    no: "04",
    name: "SEO & Growth",
    desc: "Local visibility, review engines, and analytics so the right customers actually find you.",
  },
  {
    no: "05",
    name: "Brand & Identity",
    desc: "A look and voice that makes a one-location shop feel like a national brand.",
  },
];

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

export const process = [
  { n: "01", title: "Discovery", body: "We map your services, customers, and the busywork eating your day." },
  { n: "02", title: "Design & build", body: "A premium, custom website crafted around your brand." },
  { n: "03", title: "Automate", body: "We wire in the AI workflows: bookings, receipts, CRM, reminders." },
  { n: "04", title: "Launch & grow", body: "Go live with analytics, SEO, and automations working around the clock." },
];

export const marqueeWords = [
  "Websites",
  "AI Automation",
  "Booking",
  "CRM",
  "Receipts",
  "Reminders",
  "SEO",
  "Branding",
];

/** Demo slugs that get bespoke, Awwwards-grade builds (flagged as featured). */
export const featuredSlugs = ["pet-care", "dentist", "restaurant", "bakery"];

export const microcopy = {
  loader: "Warming up the studio",
  scrollNote: "keep scrolling, it gets better",
  footerNote: "the scroll goes on... not.done.yet",
};
