"use client";

export function Footer({ onReplay }: { onReplay: () => void }) {
  return (
    <footer className="footer" role="contentinfo">
      <div className="heart" aria-hidden="true">♡</div>
      <p>
        Four months down.<br />
        <em>Forever to go.</em>
      </p>
      <small>made for Palku · with love, always</small>
      <br />
      <button
        className="replay-btn"
        onClick={onReplay}
        aria-label="Scroll back to the top and replay the petal animation"
      >
        Read our little story again
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ marginLeft: 6 }}>
          <path d="M2 6 C2 3.79 3.79 2 6 2 C8.21 2 10 3.79 10 6" />
          <path d="M8 0 L10 2 L8 4" />
        </svg>
      </button>

      <style jsx>{`
        .footer {
          text-align: center;
          padding: 75px var(--section-pad-h) 48px;
          background: var(--paper);
          border-top: 1px solid var(--line);
        }
        .heart { font-size: 30px; color: var(--wine); animation: heartbeat 1.5s ease-in-out infinite; }
        .footer p { font: italic clamp(22px, 3vw, 30px) var(--serif); color: var(--wine); margin: 16px 0 8px; }
        .footer p em { color: var(--wine2); }
        .footer small { color: var(--muted); letter-spacing: 0.12em; font-size: 11px; text-transform: uppercase; }
        .replay-btn {
          margin-top: 24px;
          display: inline-flex;
          align-items: center;
          background: none;
          border: none;
          color: var(--wine);
          font-size: 12px;
          font-family: var(--sans);
          text-decoration: underline;
          text-underline-offset: 5px;
          cursor: pointer;
          padding: 6px 0;
          border-radius: 4px;
        }
        .replay-btn:focus-visible { outline: 2px solid var(--wine); outline-offset: 3px; }
        .replay-btn:hover { opacity: 0.75; }
      `}</style>
    </footer>
  );
}
