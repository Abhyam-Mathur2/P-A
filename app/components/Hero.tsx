"use client";

import { useRef } from "react";
import Image from "next/image";
import { useThreeScene } from "./useThreeScene";

interface HeroProps {
  onSendLove: () => void;
}

export function Hero({ onSendLove }: HeroProps) {
  const artRef = useRef<HTMLDivElement>(null);
  useThreeScene(artRef);

  const scrollToStory = () => {
    document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" aria-labelledby="hero-heading">
      {/* ── Copy ───────────────────────────────────────────────────── */}
      <div className="hero-copy">
        <div className="eyebrow">A tiny celebration of us</div>
        <h1 id="hero-heading">
          Four months.<br />
          <em>One favourite</em><br />
          person.
        </h1>
        <p className="hero-intro">
          Somehow, you made ordinary days feel like the kind I&apos;d want to
          remember forever. This little corner of the internet? It&apos;s all
          yours, Palku.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={scrollToStory}>
            Come into our story <span aria-hidden="true">↗</span>
          </button>
          <button className="btn btn-secondary" onClick={onSendLove}>
            Send a little love{" "}
            <span aria-hidden="true">♡</span>
          </button>
        </div>
        <p className="hero-tiny-note">MADE WITH ALL MY HEART · JUST FOR YOU</p>
      </div>

      {/* ── Art ────────────────────────────────────────────────────── */}
      <div className="hero-art" ref={artRef}>
        <div className="halo" aria-hidden="true" />
        <div className="floating-note" aria-hidden="true">
          <small>my favourite person</small>
          it&apos;s always you ♡
        </div>
        <div className="sticker" aria-hidden="true">
          four months<br />of us
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false" style={{ display: "inline", marginLeft: 4, verticalAlign: "middle" }}>
            <path d="M7 0 L8.8 5.2 L14 5.2 L9.6 8.4 L11.4 13.6 L7 10.4 L2.6 13.6 L4.4 8.4 L0 5.2 L5.2 5.2 Z" fill="currentColor" />
          </svg>
        </div>
        {/* Decorative sparkles */}
        {[
          { cls: "spark s1", char: "✳" },
          { cls: "spark s2", char: "✧" },
          { cls: "spark s3", char: "✦" },
        ].map(({ cls, char }) => (
          <span key={cls} className={cls} aria-hidden="true">{char}</span>
        ))}

        <Image
          className="couple"
          src="/images/hero-couple.webp"
          alt="A warm, pastel 3D illustration of a couple holding a heart."
          width={1312}
          height={1199}
          priority
          sizes="(max-width: 820px) 88vw, 40vw"
        />
      </div>

      {/* ── Scroll cue ─────────────────────────────────────────────── */}
      <div className="scroll-cue" aria-hidden="true">
        <span />
        scroll a little, love
      </div>

      <style jsx>{`
        .hero {
          min-height: 100svh;
          min-height: 100svh;
          display: grid;
          grid-template-columns: 1.04fr 0.96fr;
          align-items: center;
          gap: 24px;
          padding: 120px var(--section-pad-h) 75px;
          max-width: var(--max-w);
          margin: 0 auto;
          position: relative;
        }
        .hero-copy { position: relative; z-index: 2; }
        .hero-intro {
          font-family: var(--serif);
          font-size: clamp(16px, 1.5vw, 20px);
          line-height: 1.7;
          color: var(--muted);
          max-width: 430px;
          margin-top: 8px;
        }
        .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 32px; }
        .hero-tiny-note {
          font-size: 12px;
          letter-spacing: 0.1em;
          color: var(--muted);
          margin-top: 22px;
        }
        /* Art */
        .hero-art {
          position: relative;
          min-height: 510px;
          display: grid;
          place-items: center;
        }
        .halo {
          position: absolute;
          width: min(40vw, 440px);
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 28%, #fff7e9b5, #e7bdc45a 48%, #c98b9a1a 70%, transparent 72%);
          border: 1px solid rgba(121, 40, 61, 0.14);
          border: 1px solid color-mix(in srgb, var(--wine) 14%, transparent);
        }
        .halo::before, .halo::after {
          content: "";
          position: absolute;
          border: 1px solid rgba(121, 40, 61, 0.2);
          border: 1px solid color-mix(in srgb, var(--wine) 20%, transparent);
          border-radius: 50%;
          inset: 24px;
          transform: rotate(-18deg) scaleX(0.82);
        }
        .halo::after { inset: 45px; transform: rotate(24deg) scaleX(0.78); }
        .floating-note {
          position: absolute;
          z-index: 3;
          right: 0;
          top: 14%;
          background: var(--paper2);
          border: 1px solid var(--line);
          padding: 14px 18px;
          box-shadow: 0 15px 45px #4b202010;
          transform: rotate(5deg);
          font-family: var(--serif);
          font-size: 16px;
          color: var(--wine);
          max-width: 160px;
        }
        .floating-note small {
          display: block;
          font: 10px var(--sans);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 5px;
          color: var(--muted);
        }
        .sticker {
          position: absolute;
          left: 0;
          bottom: 16%;
          border: 1px solid var(--line);
          width: 90px;
          height: 90px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          text-align: center;
          font: italic 14px var(--serif);
          color: var(--wine);
          transform: rotate(-12deg);
          background: var(--paper2);
        }
        .spark { position: absolute; color: var(--gold); font-size: 22px; animation: twinkle 2.5s ease-in-out infinite; }
        .s1 { top: 18%; left: 26%; }
        .s2 { top: 33%; right: 11%; animation-delay: 0.8s; }
        .s3 { bottom: 14%; right: 22%; animation-delay: 1.4s; }
        /* Scroll cue */
        .scroll-cue {
          position: absolute;
          bottom: 26px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          align-items: center;
          color: var(--muted);
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .scroll-cue span {
          display: block;
          width: 1px;
          height: 34px;
          background: var(--wine);
          animation: linePulse 1.8s infinite;
        }
        /* Responsive */
        @media (max-width: 820px) {
          .hero {
            grid-template-columns: 1fr;
            padding-top: calc(76px + env(safe-area-inset-top));
            padding-bottom: calc(48px + env(safe-area-inset-bottom));
            gap: 0;
            text-align: center;
            min-height: auto;
          }
          .hero .eyebrow { justify-content: center; }
          .hero .eyebrow::before { display: none; }
          .hero-copy { position: relative; z-index: 2; }
          .hero-intro { max-width: 100%; }
          .hero-actions { justify-content: center; }
          .hero-art { min-height: 340px; margin-top: -4px; }
          .halo { width: min(78vw, 360px); }
          .hero-actions .btn { flex: 1 1 220px; }
          .floating-note { right: 3%; top: 8%; }
          .sticker { left: 4%; bottom: 10%; width: 76px; height: 76px; font-size: 12px; }
          .scroll-cue {
            position: relative;
            bottom: auto;
            left: auto;
            transform: none;
            justify-content: center;
            padding-bottom: 20px;
          }
          @media (max-width: 380px) {
            .hero h1 { font-size: 44px; }
            .hero-intro { font-size: 16px; }
            .hero-art { min-height: 300px; }
            .floating-note { right: -2%; top: 4%; transform: rotate(3deg) scale(.86); transform-origin: top right; }
            .sticker { left: -2%; bottom: 7%; transform: rotate(-8deg) scale(.82); transform-origin: bottom left; }
          }
        }
      `}</style>
    </section>
  );
}
