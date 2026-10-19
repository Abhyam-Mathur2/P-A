"use client";

import { useEffect, useRef } from "react";

/**
 * Manages the fireworks canvas animation.
 * Returns a ref to attach to the <canvas> element and a `start()` function.
 */
export function useFireworks() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef    = useRef<number>(0);
  const activeRef = useRef(false);

  const start = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas || activeRef.current) return;
    activeRef.current = true;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COLORS = ["#c4a067", "#d98094", "#f5d7b8", "#a94d62", "#fff2df"];
    const particleLimit = window.innerWidth < 600 ? 180 : 420;

    const doResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = canvas.clientWidth  * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    doResize();

    const ro = new ResizeObserver(doResize);
    ro.observe(canvas);

    type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string; r: number };
    let particles: Particle[] = [];

    const burst = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      const x = Math.random() * w;
      const y = Math.random() * h * 0.7;
      for (let i = 0; i < 32; i++) {
        const angle = (Math.PI * 2 * i) / 48;
        const speed = 1 + Math.random() * 3;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 55 + Math.random() * 25,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          r: 1 + Math.random() * 2,
        });
      }
    };

    let frame = 0;
    const draw = () => {
      if (!activeRef.current) { ro.disconnect(); return; }
      rafRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      if (frame % 34 === 0) burst();
      particles = particles.filter((p) => p.life > 0).slice(-particleLimit);
      particles.forEach((p) => {
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.025;
        p.vx *= 0.99;
        p.life--;
        ctx.globalAlpha = Math.min(1, p.life / 35);
        ctx.fillStyle   = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      frame++;
      if (frame >= 1000) { activeRef.current = false; ro.disconnect(); cancelAnimationFrame(rafRef.current); }
    };
    draw();
  };

  // Cleanup on unmount
  useEffect(() => () => {
    activeRef.current = false;
    cancelAnimationFrame(rafRef.current);
  }, []);

  return { canvasRef, startFireworks: start };
}
