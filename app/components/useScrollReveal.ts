"use client";

import { useEffect, useRef } from "react";

/**
 * IntersectionObserver-based scroll reveal.
 * Adds .visible to every element with class .reveal when it enters viewport.
 */
export function useScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observerRef.current?.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const targets = document.querySelectorAll<HTMLElement>(".reveal");
    targets.forEach((el) => observerRef.current!.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);
}
