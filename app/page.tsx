"use client";

import { useCallback } from "react";
import { Hero }           from "./components/Hero";
import { DaysCounter }    from "./components/DaysCounter";
import { Story }          from "./components/Story";
import { PhotoGallery }   from "./components/PhotoGallery";
import { Timeline }       from "./components/Timeline";
import { SongSection }    from "./components/SongSection";
import { Proposal }       from "./components/Proposal";
import { Footer }         from "./components/Footer";
import { usePetals }      from "./components/usePetals";
import { useScrollReveal } from "./components/useScrollReveal";

export default function Home() {
  // Scroll reveal (attaches IntersectionObserver after hydration)
  useScrollReveal();

  // Shared petal spawner
  const { spawnPetals } = usePetals();

  const handleSendLove = useCallback(() => spawnPetals(18), [spawnPetals]);

  const handleReplay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    spawnPetals(12);
  }, [spawnPetals]);

  return (
    <div className="site">
      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <header className="topbar" role="banner">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">♡</span>
          <span>you + me</span>
        </div>
        <div className="top-note" aria-hidden="true">
          a little love story · chapter 04
        </div>
        <div aria-hidden="true">20.10.26&nbsp;♡</div>
      </header>

      {/* ── Sections ────────────────────────────────────────────────── */}
      <main id="main-content">
        <Hero onSendLove={handleSendLove} />
        <DaysCounter />
        <Story />
        <PhotoGallery />

        {/* Quote band */}
        <blockquote className="quote-band">
          <p>
            &ldquo;You didn&apos;t just become a part of my life.<br />
            You made my life feel a little more like <em>mine.</em>&rdquo;
          </p>
          <cite>four months of my favourite kind of happy</cite>
        </blockquote>

        <Timeline />
        <SongSection />
        <Proposal />
        <Footer onReplay={handleReplay} />
      </main>

      {/* ── Scoped page-level styles ────────────────────────────────── */}
      <style jsx>{`
        /* Top bar */
        .topbar {
          position: fixed;
          z-index: 50;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px clamp(20px, 5vw, 72px);
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--wine);
          background: rgba(250, 245, 237, 0.92);
          background: color-mix(in srgb, var(--paper) 85%, transparent);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--line);
        }
        .brand { display: flex; gap: 10px; align-items: center; font-weight: 700; }
        .brand-mark {
          width: 28px;
          height: 28px;
          border: 1px solid var(--wine);
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-size: 15px;
        }
        .top-note { opacity: 0.75; }
        /* Quote band */
        .quote-band {
          background: var(--wine);
          color: #fff3e8;
          text-align: center;
          padding: 88px var(--section-pad-h);
          position: relative;
          overflow: hidden;
          border: none;
          margin: 0;
        }
        .quote-band::before,
        .quote-band::after {
          content: "✳";
          position: absolute;
          color: #ffffff14;
          font-size: 220px;
          top: -65px;
          pointer-events: none;
        }
        .quote-band::before { left: 3%; }
        .quote-band::after  { right: 3%; }
        .quote-band p {
          position: relative;
          z-index: 1;
          font: italic clamp(24px, 4vw, 48px) / 1.35 var(--serif);
          max-width: 860px;
          margin: 0 auto;
          color: #fff3e8;
        }
        .quote-band em { color: #ffc4d0; font-style: italic; }
        .quote-band cite {
          display: block;
          margin-top: 24px;
          font-style: normal;
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          opacity: 0.8;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 640px) {
          .top-note { display: none; }
          .topbar { padding: 18px 20px; }
        }
      `}</style>
    </div>
  );
}
