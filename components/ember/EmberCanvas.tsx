"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  phase: number;
};

/**
 * Ambient ember/spark field. Drifts upward, reacts to the cursor, and surges
 * while the fire is being "stoked" (listens for the window `ember:stoke` event).
 * Pure canvas + rAF so it works even without GSAP; disabled under reduced motion.
 */
export function EmberCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const mobile = window.innerWidth < 768;
    const MAX = mobile ? 70 : 170;
    const particles: Particle[] = [];
    const mouse = { x: w / 2, y: h * 0.85, has: false };
    let stoke = false;

    const spawn = (x: number, y: number, burst: boolean) => {
      if (particles.length >= MAX) return;
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.6;
      const speed = (burst ? 1.4 : 0.6) + Math.random() * 1.3;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed * (burst ? 1.8 : 1.2),
        life: 0,
        max: 60 + Math.random() * (burst ? 60 : 90),
        size: 1 + Math.random() * (burst ? 3 : 2.4),
        phase: Math.random() * Math.PI * 2,
      });
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.has = true;
    };
    const onStoke = (e: Event) => {
      stoke = (e as CustomEvent).detail === true;
    };
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("ember:stoke", onStoke as EventListener);

    let raf = 0;
    let last = performance.now();
    let acc = 0;

    const frame = (t: number) => {
      const dt = Math.min(34, t - last);
      last = t;
      acc += dt;

      while (acc >= 16) {
        acc -= 16;
        const baseRate = stoke ? 7 : 2;
        for (let i = 0; i < baseRate; i++) {
          const spread = stoke ? 170 : w * 0.55;
          spawn(w * 0.5 + (Math.random() - 0.5) * spread, h * 0.97, stoke);
        }
        if (mouse.has) {
          const near = stoke ? 4 : 2;
          for (let i = 0; i < near; i++) {
            spawn(mouse.x + (Math.random() - 0.5) * 34, mouse.y + (Math.random() - 0.5) * 22, stoke);
          }
        }
      }

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vy -= 0.012; // buoyancy: embers rise
        p.phase += 0.1;
        p.x += p.vx + Math.sin(p.phase) * 0.3;
        p.y += p.vy;
        p.vx *= 0.99;
        p.life++;
        const r = p.life / p.max;
        if (r >= 1 || p.y < -24) {
          particles.splice(i, 1);
          continue;
        }
        const alpha = (1 - r) * (0.6 + Math.random() * 0.4);
        const g = Math.round(80 + 140 * (1 - r));
        const b = Math.round(30 * (1 - r));
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, ${g}, ${b}, ${alpha})`;
        ctx.arc(p.x, p.y, p.size * (1 - r * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("ember:stoke", onStoke as EventListener);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="em-canvas" aria-hidden />;
}
