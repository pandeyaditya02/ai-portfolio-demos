"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { loadMotionLibs, prefersReducedMotion } from "@/components/pawsome/motion";
import {
  BsdAutomation,
  BsdCta,
  BsdFaq,
  BsdHero,
  BsdJourney,
  BsdMarquee,
  BsdNav,
  BsdServices,
  BsdStats,
  BsdStory,
  BsdTestimonial,
  BsdTransformation,
} from "./Sections";

export function BrightSmileExperience() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
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

    /* Custom cursor (lerp follow) */
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
      const textSel =
        "h1, h2, h3, h4, h5, h6, p, span, li, blockquote, figcaption, em, b, strong, .bsd-display, .bsd-counter";
      const onOver = (e: MouseEvent) => {
        const t = e.target as HTMLElement;
        if (t.closest(".bsd-ba")) setVariant("drag", "Drag");
        else if (t.closest("a, button, [data-magnetic]")) setVariant("hover", "");
        else if (t.closest(textSel)) setVariant("hover", "");
        else setVariant("", "");
      };
      document.addEventListener("mouseover", onOver);
      cleanups.push(() => {
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseover", onOver);
      });
    }

    /* Preloader fill bar */
    if (fillRef.current && !reduced) {
      let n = 0;
      fillTimer = window.setInterval(() => {
        n = Math.min(100, n + Math.ceil(Math.random() * 8));
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
          const x = (e.clientX - (r.left + r.width / 2)) * 0.4;
          const y = (e.clientY - (r.top + r.height / 2)) * 0.4;
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
        /* Hero intro + smile line-draw */
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from("[data-bsd-hero] .bsd-line", { yPercent: 115, duration: 1.1, stagger: 0.12 });
        tl.from(".bsd-hero-sub", { y: 30, opacity: 0, duration: 0.9, stagger: 0.1 }, "-=0.7");
        const arc = root.querySelector(".bsd-arc") as SVGPathElement | null;
        if (arc) {
          const len = arc.getTotalLength();
          gsap.set(arc, { strokeDasharray: len, strokeDashoffset: len });
          tl.to(arc, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, "-=0.8");
        }

        /* Masked line groups */
        gsap.utils.toArray<HTMLElement>("[data-bsd-lines]").forEach((group) => {
          gsap.from(group.querySelectorAll(".bsd-line"), {
            yPercent: 115,
            duration: 1,
            ease: "power4.out",
            stagger: 0.12,
            scrollTrigger: { trigger: group, start: "top 80%" },
          });
        });

        /* Generic reveals */
        gsap.utils.toArray<HTMLElement>("[data-bsd-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          });
        });

        /* Parallax blobs */
        gsap.utils.toArray<HTMLElement>("[data-bsd-parallax]").forEach((el) => {
          const speed = parseFloat(el.dataset.speed || "0.3");
          gsap.to(el, {
            yPercent: speed * 60,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });

        /* Counters (supports prefix) */
        gsap.utils.toArray<HTMLElement>(".bsd-counter").forEach((el) => {
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

        /* Pinned horizontal journey + progress bar */
        const track = root.querySelector<HTMLElement>(".bsd-journey-track");
        const journeyEl = root.querySelector<HTMLElement>(".bsd-journey");
        const progress = root.querySelector<HTMLElement>(".bsd-progress");
        if (track && journeyEl) {
          const getScroll = () => track.scrollWidth - window.innerWidth + window.innerWidth * 0.06;
          gsap.to(track, {
            x: () => -getScroll(),
            ease: "none",
            scrollTrigger: {
              trigger: journeyEl,
              start: "top top",
              end: () => `+=${getScroll()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (self: any) => {
                if (progress) gsap.set(progress, { scaleX: self.progress });
              },
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
    <div ref={rootRef} className="bsd">
      {/* Preloader */}
      <div ref={preloaderRef} className="bsd-preloader">
        <span className="bsd-serif text-3xl italic text-[var(--bsd-ink)]">Breathe.</span>
        <div className="bsd-preloader__bar">
          <span ref={fillRef} className="bsd-preloader__fill" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--bsd-muted)]">Bright Smile Dental</span>
      </div>

      {/* Custom cursor */}
      <div ref={cursorRef} className="bsd-cursor" data-variant="">
        <span ref={labelRef} className="bsd-cursor-label" />
      </div>
      <div ref={dotRef} className="bsd-cursor-dot" />

      <div ref={wipeRef} className="bsd-wipe" />

      <BsdNav onBack={() => navigateWithWipe("/")} />
      <main>
        <BsdHero />
        <BsdMarquee />
        <BsdStory />
        <BsdServices />
        <BsdTransformation />
        <BsdJourney />
        <BsdStats />
        <BsdAutomation />
        <BsdFaq />
        <BsdTestimonial />
        <BsdCta onBack={() => navigateWithWipe("/")} />
      </main>
    </div>
  );
}
