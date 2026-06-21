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
