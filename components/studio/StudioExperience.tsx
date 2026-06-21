"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { loadMotionLibs, prefersReducedMotion } from "@/components/pawsome/motion";
import { microcopy } from "./data";
import {
  StAutomations,
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

export function StudioExperience() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<any>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = prefersReducedMotion();
    const cleanups: Array<() => void> = [];
    let rafId = 0;
    let cancelled = false;
    let lenis: any = null;

    /* Custom cursor */
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
        pos.x += (target.x - pos.x) * 0.18;
        pos.y += (target.y - pos.y) * 0.18;
        ring.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        rafId = requestAnimationFrame(tick);
      };
      window.addEventListener("mousemove", onMove);
      rafId = requestAnimationFrame(tick);

      const setVariant = (v: string, label = "") => {
        ring.dataset.variant = v;
        if (labelRef.current) labelRef.current.textContent = label;
      };
      const onOver = (e: MouseEvent) => {
        const t = e.target as HTMLElement;
        if (t.closest("[data-case]")) setVariant("view", "View");
        else if (t.closest("a, button, [data-magnetic]")) setVariant("hover", "");
        else setVariant("", "");
      };
      document.addEventListener("mouseover", onOver);
      cleanups.push(() => {
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseover", onOver);
      });
    }

    const init = async () => {
      const libs = reduced ? null : await loadMotionLibs();
      if (cancelled) return;
      const gsap = libs?.gsap;
      const ScrollTrigger = libs?.ScrollTrigger;
      gsapRef.current = gsap ?? null;

      /* Magnetic */
      root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width / 2)) * 0.35;
          const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
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
        if (gsap) gsap.to(pl, { yPercent: -100, duration: 0.9, ease: "power4.inOut", onComplete: () => (pl.style.display = "none") });
        else pl.style.display = "none";
      };

      await new Promise((r) => window.setTimeout(r, reduced ? 0 : 650));
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
        /* Hero intro: kinetic words + reveals */
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .from(".st-word", { yPercent: 110, duration: 1, stagger: 0.06 })
          .from(".st-reveal", { y: 28, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.5");

        /* Section reveals */
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });

        /* Counters */
        gsap.utils.toArray<HTMLElement>(".st-counter").forEach((el) => {
          const value = parseFloat(el.dataset.value || "0");
          const suffix = el.dataset.suffix || "";
          const obj = { v: 0 };
          gsap.to(obj, {
            v: value,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => {
              el.textContent = `${Math.round(obj.v)}${suffix}`;
            },
          });
        });
      }, root);

      cleanups.push(() => ctx.revert());
      window.setTimeout(() => ScrollTrigger.refresh(), 400);
      window.addEventListener("load", () => ScrollTrigger.refresh());
    };

    init();

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      cleanups.forEach((fn) => fn());
      if (lenis) lenis.destroy();
    };
  }, []);

  const openDemo = (slug: string) => {
    const href = `/demo/${slug}`;
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
    <div ref={rootRef} className="studio">
      {/* Preloader */}
      <div ref={preloaderRef} className="st-preloader st-display">
        <span className="text-2xl text-[var(--st-cream)]">Lumen<span className="text-[var(--st-yellow)]">.</span></span>
        <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--st-cream)]/50">{microcopy.loader}</span>
      </div>

      {/* Custom cursor */}
      <div ref={cursorRef} className="st-cursor" data-variant="">
        <span ref={labelRef} className="st-cursor-label" />
      </div>
      <div ref={dotRef} className="st-cursor-dot" />

      <div ref={wipeRef} className="st-wipe" />

      <StNav />
      <main>
        <StHero />
        <StMarquee />
        <StServices />
        <StAutomations />
        <StCounters />
        <StCases onOpen={openDemo} />
        <StProcess />
        <StContact />
      </main>
      <StFooter />
    </div>
  );
}
