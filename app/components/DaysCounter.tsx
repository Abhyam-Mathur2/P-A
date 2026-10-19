"use client";

import { useEffect, useState } from "react";
import { RELATIONSHIP_START } from "../siteConfig";

/**
 * Calculates the number of full calendar days elapsed since RELATIONSHIP_START.
 * Uses local date arithmetic to stay timezone-friendly.
 * Returns 0 if today is before the start date (future-safe).
 */
function calcDays(): number {
  const start = new Date(RELATIONSHIP_START);
  // Normalise both dates to midnight local time
  const startMidnight = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const now = new Date();
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = nowMidnight.getTime() - startMidnight.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

export function DaysCounter() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    setDays(calcDays());
    // Recalculate at midnight to keep counter accurate for long-lived tabs
    const now = new Date();
    const msToMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();
    const timer = setTimeout(() => setDays(calcDays()), msToMidnight);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="days-section" aria-labelledby="days-heading">
      <div className="days-inner reveal">
        <div className="eyebrow eyebrow--center">since June 20, 2026</div>
        <div
          className="days-number"
          role="timer"
          aria-live="polite"
          aria-label={days !== null ? `${days} days since we became us` : "Counting…"}
        >
          {days !== null ? days : "..."}
        </div>
        <h2 id="days-heading" className="days-label">
          days since we became <em>us.</em>
        </h2>
        <p className="days-note">
          Every single one of them my favourite.
        </p>
      </div>

      <style jsx>{`
        .days-section {
          background: var(--wine);
          color: #fff3e8;
          text-align: center;
          padding: 90px var(--section-pad-h);
          position: relative;
          overflow: hidden;
        }
        .days-section::before,
        .days-section::after {
          content: "♡";
          position: absolute;
          color: #ffffff10;
          font-size: 240px;
          top: -60px;
          pointer-events: none;
        }
        .days-section::before { left: 2%; }
        .days-section::after  { right: 2%; }
        .days-inner { position: relative; z-index: 1; }
        .days-inner .eyebrow { color: #ffc4d0; }
        .days-number {
          font-family: var(--serif);
          font-size: clamp(90px, 18vw, 180px);
          line-height: 1;
          letter-spacing: -0.05em;
          margin: 18px 0 12px;
          color: #fff;
        }
        .days-label {
          font-size: clamp(22px, 3.5vw, 38px);
          color: #fff3e8;
          margin: 0 0 14px;
        }
        .days-label em { color: #ffc4d0; }
        .days-note {
          font-family: var(--serif);
          font-style: italic;
          font-size: clamp(15px, 1.6vw, 19px);
          color: #ffb8c8;
          opacity: 0.85;
        }
      `}</style>
    </section>
  );
}
