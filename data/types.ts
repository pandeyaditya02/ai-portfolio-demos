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
