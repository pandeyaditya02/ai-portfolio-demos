"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { loadMotionLibs, prefersReducedMotion } from "@/components/pawsome/motion";
import {
  FbBakes,
  FbCraft,
  FbCrumbs,
  FbFresh,
  FbHero,
  FbLayers,
  FbMarquee,
  FbNav,
  FbOrder,
  FbStats,
} from "./Sections";

export function FlourBloomExperience() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<any>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = prefersReducedMotion();
    const cleanups: Array<() => void> = [];
    let rafId = 0;
    let fillTimer = 0;
    let cancelled = false;
    let lenis: any = null;

    /* Custom cursor (lerp-follow ring + dot) */
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
        pos.x += (target.x - pos.x) * 0.16;
        pos.y += (target.y - pos.y) * 0.16;
        ring.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        rafId = requestAnimationFrame(tick);
      };
      window.addEventListener("mousemove", onMove);
      rafId = requestAnimationFrame(tick);

      const onOver = (e: MouseEvent) => {
        const t = e.target as HTMLElement;
        ring.dataset.variant = t.closest("a, button, [data-magnetic]") ? "hover" : "";
      };
      document.addEventListener("mouseover", onOver);
      cleanups.push(() => {
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseover", onOver);
      });
    }

    /* Preloader "preheat" fill */
    if (fillRef.current && !reduced) {
      let n = 0;
      fillTimer = window.setInterval(() => {
        n = Math.min(100, n + Math.ceil(Math.random() * 9));
        if (fillRef.current) fillRef.current.style.width = `${n}%`;
        if (n >= 100) window.clearInterval(fillTimer);
      }, 80);
    }

    const init = async () => {
      const libs = reduced ? null : await loadMotionLibs();
      if (cancelled) return;
      const gsap = libs?.gsap;
      const ScrollTrigger = libs?.ScrollTrigger;
      gsapRef.current = gsap ?? null;

      /* Magnetic buttons */
      root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width / 2)) * 0.38;
          const y = (e.clientY - (r.top + r.height / 2)) * 0.38;
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
        if (gsap) gsap.to(pl, { autoAlpha: 0, duration: 0.8, ease: "power3.inOut", onComplete: () => (pl.style.display = "none") });
        else pl.style.display = "none";
      };

      await new Promise((r) => window.setTimeout(r, reduced ? 0 : 750));
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
        /* Hero intro: kinetic letters + subs */
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from("[data-fb-hero] .fb-letter", {
          opacity: 0,
          yPercent: 80,
          duration: 0.8,
          stagger: { each: 0.04, from: "start" },
        });
        tl.from(".fb-hero-sub", { opacity: 0, y: 24, duration: 0.8, stagger: 0.12 }, "-=0.4");

        /* Masked line groups */
        gsap.utils.toArray<HTMLElement>("[data-fb-lines]").forEach((group) => {
          gsap.from(group.querySelectorAll(".fb-line"), {
            yPercent: 115,
            duration: 1,
            ease: "power4.out",
            stagger: 0.12,
            scrollTrigger: { trigger: group, start: "top 82%" },
          });
        });

        /* Generic reveals */
        gsap.utils.toArray<HTMLElement>("[data-fb-reveal]").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 50,
            scale: 0.98,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });

        /* Counters */
        gsap.utils.toArray<HTMLElement>(".fb-counter").forEach((el) => {
          const value = parseFloat(el.dataset.value || "0");
          const decimals = parseInt(el.dataset.decimals || "0", 10);
          const prefix = el.dataset.prefix || "";
          const suffix = el.dataset.suffix || "";
          const obj = { v: 0 };
          gsap.to(obj, {
            v: value,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            onUpdate: () => {
              const n = decimals > 0 ? obj.v.toFixed(decimals) : Math.round(obj.v).toLocaleString();
              el.textContent = `${prefix}${n}${suffix}`;
            },
          });
        });

        /* SVG path draw (wheat stalk + layer connector) */
        gsap.utils.toArray<SVGPathElement>(".fb-draw").forEach((path) => {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: "power2.inOut",
            scrollTrigger: { trigger: path, start: "top 85%" },
          });
        });

        /* Wheat grains sway */
        gsap.to(".fb-leaf", {
          rotation: "+=5",
          transformOrigin: "center",
          duration: 2.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: { each: 0.16, from: "center" },
        });

        /* Pinned bakes "pass" */
        const track = root.querySelector<HTMLElement>(".fb-pass-track");
        const passEl = root.querySelector<HTMLElement>(".fb-pass");
        if (track && passEl) {
          const getScroll = () => track.scrollWidth - window.innerWidth + window.innerWidth * 0.06;
          gsap.to(track, {
            x: () => -getScroll(),
            ease: "none",
            scrollTrigger: {
              trigger: passEl,
              start: "top top",
              end: () => `+=${getScroll()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      }, root);

      cleanups.push(() => ctx.revert());
      window.setTimeout(() => ScrollTrigger.refresh(), 400);
      window.addEventListener("load", () => ScrollTrigger.refresh());
    };

    init();

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (fillTimer) window.clearInterval(fillTimer);
      cleanups.forEach((fn) => fn());
      if (lenis) lenis.destroy();
    };
  }, []);

  const navigateWithWipe = (href: string) => {
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
    <div ref={rootRef} className="flourbloom">
      {/* Custom cursor */}
      <div ref={cursorRef} className="fb-cursor" data-variant="" aria-hidden />
      <div ref={dotRef} className="fb-cursor-dot" aria-hidden />

      {/* Grain + page wipe */}
      <div className="fb-grain" aria-hidden />
      <div ref={wipeRef} className="fb-wipe" aria-hidden />

      {/* Preloader */}
      <div ref={preloaderRef} className="fb-preloader">
        <span className="fb-serif text-4xl italic text-[var(--fb-cream)]">Preheating the oven.</span>
        <div className="fb-preloader__bar">
          <span ref={fillRef} className="fb-preloader__fill" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--fb-cream)]/50">Flour &amp; Bloom</span>
      </div>

      <FbNav onBack={() => navigateWithWipe("/")} />
      <main>
        <FbHero />
        <FbMarquee />
        <FbCraft />
        <FbBakes />
        <FbLayers />
        <FbFresh />
        <FbStats />
        <FbOrder />
        <FbCrumbs onBack={() => navigateWithWipe("/")} />
      </main>
    </div>
  );
}
