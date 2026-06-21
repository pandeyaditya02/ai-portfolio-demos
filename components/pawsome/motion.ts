/**
 * Motion stack for the Pawsome experience.
 *
 * GSAP + ScrollTrigger + Lenis are bundled via npm (see package.json) and
 * pulled in with client-side dynamic imports so they never run during SSR and
 * are code-split out of the initial bundle. Fully typed, no CDN dependency.
 */
import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

export type MotionLibs = {
  gsap: typeof GsapType;
  ScrollTrigger: typeof ScrollTriggerType;
  Lenis: typeof Lenis;
};

let cached: Promise<MotionLibs | null> | null = null;

/** Load GSAP + ScrollTrigger + Lenis on the client and register the plugin. */
export function loadMotionLibs(): Promise<MotionLibs | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (cached) return cached;

  cached = (async () => {
    try {
      const [gsapMod, scrollTriggerMod, lenisMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      const gsap = gsapMod.gsap ?? gsapMod.default;
      const ScrollTrigger = scrollTriggerMod.ScrollTrigger ?? scrollTriggerMod.default;
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger, Lenis: lenisMod.default };
    } catch {
      return null;
    }
  })();

  return cached;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
