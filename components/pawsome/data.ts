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
