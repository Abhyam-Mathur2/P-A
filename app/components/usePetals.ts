"use client";

import { useCallback } from "react";

/**
 * Manages falling petals (hearts / flowers).
 * Returns a `spawnPetals(count)` callback that is stable across renders.
 */
export function usePetals() {
  const spawnPetals = useCallback((count = 12) => {
    // Skip if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const symbols = ["♡", "✿", "♥", "✧", "❀"];
    const maxCount = window.innerWidth < 600 ? 18 : 36;
    for (let i = 0; i < Math.min(count, maxCount); i++) {
      const span = document.createElement("span");
      span.className = "petal";
      span.setAttribute("aria-hidden", "true");
      span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      span.style.left   = `${Math.random() * 100}vw`;
      span.style.fontSize = `${12 + Math.random() * 17}px`;
      const dur = 4 + Math.random() * 4;
      span.style.animationDuration = `${dur}s`;
      span.style.setProperty("--drift", `${(Math.random() * 180 - 90)}px`);
      document.body.appendChild(span);
      setTimeout(() => span.remove(), (dur + 0.5) * 1000);
    }
  }, []);

  return { spawnPetals };
}
