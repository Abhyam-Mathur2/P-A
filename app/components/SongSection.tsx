"use client";

import { OUR_SONG_TITLE, OUR_SONG_ARTIST, OUR_SONG_URL } from "../siteConfig";

/**
 * Song section, provides a link to an official music service page.
 * Does NOT autoplay or embed audio; respects copyright.
 * The song URL is configurable in siteConfig.ts and opens the official track page.
 */
export function SongSection() {
  return (
    <section className="song-section" aria-labelledby="song-heading">
      <div className="song-inner reveal">
        <div className="eyebrow eyebrow--center">our song</div>
        <h2 id="song-heading">
          &ldquo;<em>{OUR_SONG_TITLE}</em>&rdquo;
        </h2>
        <p className="song-artist">by {OUR_SONG_ARTIST}</p>
        <p className="song-note">
          Every single time it plays, I think of you. No exceptions.
        </p>
        <a
          className="btn btn-primary song-btn"
          href={OUR_SONG_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${OUR_SONG_TITLE} by ${OUR_SONG_ARTIST} on Spotify (opens in new tab)`}
        >
          {/* Musical note SVG */}
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false" fill="currentColor">
            <path d="M15 2L7 4V13.5C7 14.33 6.33 15 5.5 15C4.67 15 4 14.33 4 13.5C4 12.67 4.67 12 5.5 12C5.67 12 5.84 12.02 6 12.07V5L15 3V2Z" />
          </svg>
          Play our song
          {/* External link indicator */}
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false" fill="currentColor" style={{ opacity: 0.7 }}>
            <path d="M8.5 1H11V3.5M11 1L6 6M5 2H2C1.45 2 1 2.45 1 3V10C1 10.55 1.45 11 2 11H9C9.55 11 10 10.55 10 10V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          </svg>
        </a>
        <p className="song-disclaimer">Opens the official track page · no audio is autoplayed.</p>
      </div>

      <style jsx>{`
        .song-section {
          background: var(--paper);
          background: radial-gradient(ellipse at 50% 50%, color-mix(in srgb, var(--rose) 55%, transparent), transparent 65%), var(--paper);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: var(--section-pad-v) var(--section-pad-h);
          text-align: center;
        }
        .song-inner { max-width: 680px; margin: 0 auto; }
        .song-section h2 { font-size: clamp(36px, 6vw, 72px); margin: 18px 0 6px; }
        .song-artist { font-family: var(--serif); font-size: clamp(15px, 1.5vw, 18px); color: var(--muted); margin-bottom: 20px; font-style: italic; }
        .song-note { font-family: var(--serif); font-size: clamp(15px, 1.6vw, 18px); color: var(--muted); line-height: 1.7; margin-bottom: 28px; }
        .song-btn { margin: 0 auto; }
        .song-disclaimer { margin-top: 18px; font-size: 12px; color: var(--muted); letter-spacing: 0.04em; opacity: 0.9; }
      `}</style>
    </section>
  );
}
