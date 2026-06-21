"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { loadMotionLibs, prefersReducedMotion } from "./motion";
import {
  PwAutomation,
  PwAutomationIdeas,
  PwCta,
  PwGallery,
  PwHero,
  PwMarquee,
  PwNav,
  PwServices,
  PwStats,
  PwStory,
  PwSvgDefs,
  PwTestimonial,
} from "./Sections";

export function PawsomeExperience() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<any>(null);

  /* ----- Custom cursor + magnetic + page intro + scroll animations ----- */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = prefersReducedMotion();
    const cleanups: Array<() => void> = [];
    let rafId = 0;
    let counterTimer = 0;
    let cancelled = false;

    /* --- Custom cursor (lerp follow, independent of GSAP) --- */
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
      const textSelector =
        "h1, h2, h3, h4, h5, h6, p, span, li, blockquote, figcaption, em, b, strong, .pw-display, .pw-counter";
      const onOver = (e: MouseEvent) => {
        const t = e.target as HTMLElement;
        if (t.closest(".pw-distort")) setVariant("drag", "View");
        else if (t.closest("a, button, [data-magnetic]")) setVariant("hover", "");
        else if (t.closest(textSelector)) setVariant("hover", "");
        else setVariant("", "");
      };
      document.addEventListener("mouseover", onOver);
      cleanups.push(() => {
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseover", onOver);
      });
    }

    /* --- Preloader counter --- */
    if (counterRef.current && !reduced) {
      let n = 0;
      counterTimer = window.setInterval(() => {
        n = Math.min(100, n + Math.ceil(Math.random() * 9));
        if (counterRef.current) counterRef.current.textContent = String(n);
        if (n >= 100) window.clearInterval(counterTimer);
      }, 90);
    }

    let lenis: any = null;

    const init = async () => {
      const libs = reduced ? null : await loadMotionLibs();
      if (cancelled) return;
      const gsap = libs?.gsap;
      const ScrollTrigger = libs?.ScrollTrigger;
      gsapRef.current = gsap ?? null;

      /* Magnetic buttons (uses GSAP when available) */
      const magnets = Array.from(root.querySelectorAll<HTMLElement>("[data-magnetic]"));
      magnets.forEach((el) => {
        const strength = 0.4;
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width / 2)) * strength;
          const y = (e.clientY - (r.top + r.height / 2)) * strength;
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

      /* Image distortion hover (shared SVG filter) */
      const dispMap = document.getElementById("pw-displace-map");
      if (gsap && dispMap) {
        root.querySelectorAll<HTMLElement>(".pw-distort").forEach((card) => {
          const enter = () => gsap.to(dispMap, { attr: { scale: 26 }, duration: 0.5, ease: "power2.out" });
          const leave = () => gsap.to(dispMap, { attr: { scale: 0 }, duration: 0.7, ease: "power2.out" });
          card.addEventListener("mouseenter", enter);
          card.addEventListener("mouseleave", leave);
          cleanups.push(() => {
            card.removeEventListener("mouseenter", enter);
            card.removeEventListener("mouseleave", leave);
          });
        });
      }

      /* Lift preloader, then run hero intro */
      const liftPreloader = () => {
        const pl = preloaderRef.current;
        if (!pl) return;
        if (gsap) {
          gsap.to(pl, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
            onComplete: () => (pl.style.display = "none"),
          });
        } else {
          pl.style.display = "none";
        }
      };

      // ensure the counter has reached 100 before lifting
      const minDelay = reduced ? 0 : 700;
      await new Promise((r) => window.setTimeout(r, minDelay));
      if (cancelled) return;
      liftPreloader();
      root.classList.add("is-ready");

      if (!gsap || !ScrollTrigger) return; // CSS fallbacks already show content

      /* Smooth scroll (Lenis) */
      if (libs?.Lenis) {
        lenis = new libs.Lenis({ lerp: 0.1, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);
        const rafCb = (t: number) => lenis.raf(t * 1000);
        gsap.ticker.add(rafCb);
        gsap.ticker.lagSmoothing(0);
        cleanups.push(() => gsap.ticker.remove(rafCb));
      }

      const ctx = gsap.context(() => {
        /* Hero intro */
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .from(".pw-hero-letter", { yPercent: 120, opacity: 0, duration: 1, stagger: 0.06 })
          .from(".pw-hero-sub", { y: 30, opacity: 0, duration: 0.9, stagger: 0.12 }, "-=0.6");

        /* Masked line reveals */
        gsap.utils.toArray<HTMLElement>("[data-lines]").forEach((group) => {
          gsap.from(group.querySelectorAll(".pw-line"), {
            yPercent: 110,
            duration: 1,
            ease: "power4.out",
            stagger: 0.12,
            scrollTrigger: { trigger: group, start: "top 78%" },
          });
        });

        /* Generic reveal */
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 48,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });

        /* Parallax blobs / cards */
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = parseFloat(el.dataset.speed || "0.3");
          gsap.to(el, {
            yPercent: speed * 60,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });

        /* Counters */
        gsap.utils.toArray<HTMLElement>(".pw-counter").forEach((el) => {
          const value = parseFloat(el.dataset.value || "0");
          const decimals = parseInt(el.dataset.decimals || "0", 10);
          const suffix = el.dataset.suffix || "";
          const obj = { v: 0 };
          gsap.to(obj, {
            v: value,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            onUpdate: () => {
              const n = decimals > 0 ? obj.v.toFixed(decimals) : Math.round(obj.v).toLocaleString();
              el.textContent = `${n}${suffix}`;
            },
          });
        });

        /* Horizontal pinned gallery */
        const track = root.querySelector<HTMLElement>(".pw-h-track");
        const galleryEl = root.querySelector<HTMLElement>(".pw-gallery");
        if (track && galleryEl) {
          const getScroll = () => track.scrollWidth - window.innerWidth + window.innerWidth * 0.08;
          gsap.to(track, {
            x: () => -getScroll(),
            ease: "none",
            scrollTrigger: {
              trigger: galleryEl,
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

      // Refresh once images settle
      window.setTimeout(() => ScrollTrigger.refresh(), 400);
      window.addEventListener("load", () => ScrollTrigger.refresh());
    };

    init();

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (counterTimer) window.clearInterval(counterTimer);
      cleanups.forEach((fn) => fn());
      if (lenis) lenis.destroy();
    };
  }, []);

  /* ----- Page transition wipe on navigation ----- */
  const navigateWithWipe = (href: string) => {
    const wipe = wipeRef.current;
    const gsap = gsapRef.current;
    if (wipe && gsap && !prefersReducedMotion()) {
      gsap.set(wipe, { transformOrigin: "bottom", scaleY: 0 });
      gsap.to(wipe, {
        scaleY: 1,
        duration: 0.6,
        ease: "power4.inOut",
        onComplete: () => router.push(href),
      });
    } else {
      router.push(href);
    }
  };

  return (
    <div ref={rootRef} className="pawsome relative">
      {/* Preloader */}
      <div ref={preloaderRef} className="pw-preloader pw-display">
        <span className="text-2xl text-[var(--pw-cream)]/70">Pawsome&deg;</span>
        <span className="text-[18vw] leading-none text-[var(--pw-cream)] sm:text-[10vw]">
          <span ref={counterRef}>0</span>
          <span className="text-[var(--pw-amber)]">%</span>
        </span>
      </div>

      {/* Custom cursor */}
      <div ref={cursorRef} className="pw-cursor" data-variant="">
        <span ref={labelRef} className="pw-cursor-label" />
      </div>
      <div ref={dotRef} className="pw-cursor-dot" />

      {/* Page transition + grain + SVG defs */}
      <div ref={wipeRef} className="pw-wipe" />
      <div className="pw-grain" />
      <PwSvgDefs />

      {/* Content */}
      <PwNav onBack={() => navigateWithWipe("/")} />
      <main>
        <PwHero />
        <PwMarquee />
        <PwStory />
        <PwServices />
        <PwGallery />
        <PwStats />
        <PwAutomationIdeas />
        <PwAutomation />
        <PwTestimonial />
        <PwCta onBack={() => navigateWithWipe("/")} />
      </main>
    </div>
  );
}
