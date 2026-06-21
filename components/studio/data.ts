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
export const featuredSlugs = ["pet-care", "dentist", "restaurant"];

export const microcopy = {
  loader: "Warming up the studio",
  scrollNote: "keep scrolling, it gets better",
  footerNote: "the scroll goes on... not.done.yet",
};
