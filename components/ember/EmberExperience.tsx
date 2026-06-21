"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { loadMotionLibs, prefersReducedMotion } from "@/components/pawsome/motion";
import { EmberCanvas } from "./EmberCanvas";
import {
  EmAutomations,
  EmBlaze,
  EmEmbers,
  EmGlow,
  EmHero,
  EmKindle,
  EmMarquee,
  EmNav,
  EmStats,
  EmSvgDefs,
} from "./Sections";

export function EmberExperience() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const torchRef = useRef<HTMLDivElement>(null);
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

    /* Torch cursor (lerp follow) + sparking dot */
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (fine && torchRef.current && dotRef.current) {
      const torch = torchRef.current;
      const dot = dotRef.current;
      const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const target = { ...pos };
      const onMove = (e: MouseEvent) => {
        target.x = e.clientX;
        target.y = e.clientY;
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      };
      const tick = () => {
        pos.x += (target.x - pos.x) * 0.14;
        pos.y += (target.y - pos.y) * 0.14;
        torch.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        rafId = requestAnimationFrame(tick);
      };
      window.addEventListener("mousemove", onMove);
      rafId = requestAnimationFrame(tick);
      cleanups.push(() => window.removeEventListener("mousemove", onMove));
    }

    /* Stoke interaction (press & hold the name) */
    const stokeTarget = root.querySelector<HTMLElement>("[data-stoke]");
    if (stokeTarget) {
      const setStoke = (active: boolean) => {
        window.dispatchEvent(new CustomEvent("ember:stoke", { detail: active }));
        if (torchRef.current) torchRef.current.dataset.stoke = String(active);
        root.style.setProperty("--em-heat", active ? "1" : "");
      };
      const down = () => setStoke(true);
      const up = () => setStoke(false);
      stokeTarget.addEventListener("pointerdown", down);
      window.addEventListener("pointerup", up);
      stokeTarget.addEventListener("pointerleave", up);
      cleanups.push(() => {
        stokeTarget.removeEventListener("pointerdown", down);
        window.removeEventListener("pointerup", up);
        stokeTarget.removeEventListener("pointerleave", up);
      });
    }

    /* Preloader "strike a match" */
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

      /* Heat-haze intensifies on hover over headings */
      const hazeMap = document.getElementById("em-haze-map");
      if (gsap && hazeMap) {
        root.querySelectorAll<HTMLElement>(".em-haze").forEach((el) => {
          const enter = () => gsap.to(hazeMap, { attr: { scale: 16 }, duration: 0.5, ease: "power2.out" });
          const leave = () => gsap.to(hazeMap, { attr: { scale: 6 }, duration: 0.7, ease: "power2.out" });
          el.addEventListener("mouseenter", enter);
          el.addEventListener("mouseleave", leave);
          cleanups.push(() => {
            el.removeEventListener("mouseenter", enter);
            el.removeEventListener("mouseleave", leave);
          });
        });
      }

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
        /* Scroll-warmth: feed the fire as you descend */
        ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self: any) => root.style.setProperty("--em-heat", self.progress.toFixed(3)),
        });

        /* Hero intro: kinetic letters + subs */
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from("[data-em-hero] .em-letter", {
          opacity: 0,
          yPercent: 60,
          duration: 0.8,
          stagger: { each: 0.04, from: "random" },
        });
        tl.from(".em-hero-sub", { opacity: 0, y: 24, duration: 0.8, stagger: 0.12 }, "-=0.4");

        /* Masked line groups */
        gsap.utils.toArray<HTMLElement>("[data-em-lines]").forEach((group) => {
          gsap.from(group.querySelectorAll(".em-line"), {
            yPercent: 115,
            duration: 1,
            ease: "power4.out",
            stagger: 0.12,
            scrollTrigger: { trigger: group, start: "top 80%" },
          });
        });

        /* Generic reveals */
        gsap.utils.toArray<HTMLElement>("[data-em-reveal]").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 50,
            scale: 0.98,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          });
        });

        /* Counters */
        gsap.utils.toArray<HTMLElement>(".em-counter").forEach((el) => {
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

        /* Olive branch + smoke draw */
        gsap.utils.toArray<SVGPathElement>(".em-draw").forEach((path) => {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: "power2.inOut",
            scrollTrigger: { trigger: path, start: "top 85%" },
          });
        });

        /* Olive leaves sway */
        gsap.to(".em-leaf", {
          rotation: "+=5",
          transformOrigin: "center",
          duration: 2.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: { each: 0.16, from: "center" },
        });

        /* Steam wisps rise */
        gsap.utils.toArray<HTMLElement>(".em-steam-wisp").forEach((el, i) => {
          gsap.to(el, {
            keyframes: [
              { opacity: 0.55, y: -8, duration: 1.4 },
              { opacity: 0, y: -26, duration: 1.4 },
            ],
            repeat: -1,
            delay: i * 0.5,
            ease: "power1.out",
          });
        });

        /* Pinned menu "pass" */
        const track = root.querySelector<HTMLElement>(".em-pass-track");
        const passEl = root.querySelector<HTMLElement>(".em-pass");
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
    <div ref={rootRef} className="ember">
      <EmberCanvas />
      <div className="em-vignette" aria-hidden />
      <div ref={torchRef} className="em-torch" data-stoke="false" aria-hidden />
      <div ref={dotRef} className="em-cursor-dot" aria-hidden />
      <div className="em-gauge" aria-hidden />

      {/* Preloader */}
      <div ref={preloaderRef} className="em-preloader">
        <span className="em-serif text-4xl italic text-[var(--em-cream)]">Strike a match.</span>
        <div className="em-preloader__bar">
          <span ref={fillRef} className="em-preloader__fill" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--em-cream)]/50">Olive &amp; Ember</span>
      </div>

      <div ref={wipeRef} className="em-wipe" />
      <EmSvgDefs />

      <EmNav onBack={() => navigateWithWipe("/")} />
      <main>
        <EmHero />
        <EmMarquee />
        <EmKindle />
        <EmBlaze />
        <EmGlow />
        <EmStats />
        <EmAutomations />
        <EmEmbers onBack={() => navigateWithWipe("/")} />
      </main>
    </div>
  );
}
