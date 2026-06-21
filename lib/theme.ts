import type { CSSProperties } from "react";

export type BusinessTheme = {
  /** Primary brand color (hex). */
  brand: string;
  /** Foreground color used on top of the brand color (hex). */
  brandFg: string;
  /** Very light tint of the brand, for soft backgrounds (hex). */
  soft: string;
  /** Secondary accent color (hex). */
  accent: string;
  /** Deep ink color for headings (hex). */
  ink: string;
  /** Google Font family name for display/headings. */
  displayFont?: string;
  /** Google Font family name for body copy. */
  sansFont?: string;
};

function hexToRgbTriplet(hex: string): string {
  const clean = hex.replace("#", "").trim();
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const num = parseInt(full, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `${r} ${g} ${b}`;
}

/**
 * Build an inline style object that sets the CSS variables consumed by
 * Tailwind (see tailwind.config.ts + globals.css). Apply it to a wrapper
 * element so an entire demo subtree is themed for a specific business.
 */
export function themeToStyle(theme: BusinessTheme): CSSProperties {
  const vars: Record<string, string> = {
    "--brand": hexToRgbTriplet(theme.brand),
    "--brand-fg": hexToRgbTriplet(theme.brandFg),
    "--brand-soft": hexToRgbTriplet(theme.soft),
    "--brand-accent": hexToRgbTriplet(theme.accent),
    "--brand-ink": hexToRgbTriplet(theme.ink),
  };
  if (theme.sansFont) vars["--font-sans"] = `"${theme.sansFont}", ui-sans-serif, system-ui, sans-serif`;
  if (theme.displayFont) vars["--font-display"] = `"${theme.displayFont}", ui-serif, Georgia, serif`;
  return vars as CSSProperties;
}
