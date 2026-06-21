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
