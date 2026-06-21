import type { Metadata } from "next";
import "./globals.css";

const GOOGLE_FONTS = [
  "Inter:wght@400;500;600;700;800",
  "Manrope:wght@400;500;600;700;800",
  "Plus+Jakarta+Sans:wght@400;500;600;700;800",
  "Sora:wght@400;500;600;700;800",
  "Poppins:wght@400;500;600;700;800",
  "Outfit:wght@400;500;600;700;800",
  "Space+Grotesk:wght@400;500;600;700",
  "Archivo:wght@400;500;600;700;800",
  "Nunito:wght@400;500;600;700;800",
  "Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800",
  "Playfair+Display:wght@400;500;600;700;800",
  "Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700",
  "DM+Serif+Display",
  "Cormorant+Garamond:wght@400;500;600;700",
  "Lora:wght@400;500;600;700",
];

const fontsHref = `https://fonts.googleapis.com/css2?${GOOGLE_FONTS.map(
  (f) => `family=${f}`,
).join("&")}&display=swap`;

export const metadata: Metadata = {
  title: {
    default: "Lumen Studio — Websites + AI Automation for Local Business",
    template: "%s — Lumen Studio",
  },
  description:
    "I build premium websites and practical AI automations for local businesses: online booking, automated WhatsApp confirmations, instant receipts, and CRM pipelines that run themselves.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={fontsHref} />
      </head>
      <body>{children}</body>
    </html>
  );
}
