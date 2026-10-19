"use client";

/**
 * Story section – three chapter cards using the real backstory.
 * Generic paragraphs replaced with the SIH → CSI → minor-project → walk arc.
 */
export function Story() {
  const chapters = [
    {
      id: "ch-01",
      num: "01 / the beginning",
      icon: (
        <svg width="42" height="42" viewBox="0 0 42 42" aria-hidden="true" focusable="false" fill="none">
          <circle cx="21" cy="21" r="19" stroke="currentColor" strokeWidth="1.5" opacity=".35" />
          <path d="M21 7 L23.5 16.5 L33 16.5 L25.5 22 L28 31.5 L21 26 L14 31.5 L16.5 22 L9 16.5 L18.5 16.5 Z" fill="currentColor" />
        </svg>
      ),
      title: "Then came SIH.",
      text: "It started the way most great things do, without a plan. We first crossed paths at SIH, the kind of setting where you meet fifty people but somehow notice one. I noticed you.",
    },
    {
      id: "ch-02",
      num: "02 / getting closer",
      icon: (
        <svg width="42" height="42" viewBox="0 0 42 42" aria-hidden="true" focusable="false" fill="none">
          <path d="M21 34 C21 34 8 25 8 16 C8 11.03 12.03 7 17 7 C19.21 7 21 9 21 9 C21 9 22.79 7 25 7 C29.97 7 34 11.03 34 16 C34 25 21 34 21 34 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M21 30 C21 30 11 22 11 15.5 C11 12.46 13.46 10 16.5 10 C18.5 10 21 12 21 12 C21 12 23.5 10 25.5 10 C28.54 10 31 12.46 31 15.5 C31 22 21 30 21 30 Z" fill="currentColor" opacity=".5" />
        </svg>
      ),
      title: "The CSI hackathon, and everything after.",
      text: `Then came the CSI hackathon. By then we weren't strangers anymore. You became part of my minor project too, which meant even more hours of existing in each other's orbit. Somewhere in there, "chak chak" and "bakk bak" stopped feeling like jokes and started feeling like names.`,
    },
    {
      id: "ch-03",
      num: "03 / the evening it changed",
      icon: (
        <svg width="42" height="42" viewBox="0 0 42 42" aria-hidden="true" focusable="false" fill="none">
          <circle cx="21" cy="21" r="8" stroke="currentColor" strokeWidth="1.5" />
          <line x1="21" y1="4"  x2="21" y2="9"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="21" y1="33" x2="21" y2="38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="4"  y1="21" x2="9"  y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="33" y1="21" x2="38" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="9"  y1="9"  x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="29" y1="29" x2="33" y2="33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="33" y1="9"  x2="29" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="9"  y1="33" x2="13" y2="29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: "A random evening. A walk. Us.",
      text: `I asked you for a walk one evening, with no agenda and no grand plan. And things began. June 20, 2026 is the date we both know. Everything before that was the universe just getting the timing right.`,
    },
  ];

  return (
    <section className="section-wrap" id="story" aria-labelledby="story-heading">
      <div className="section-head reveal">
        <div className="eyebrow eyebrow--center">little things, big feelings</div>
        <h2 id="story-heading">
          Our story is made<br />of <em>little things.</em>
        </h2>
        <p>
          Not grand gestures every day, just a thousand tiny moments
          that became my favourite part of life.
        </p>
      </div>

      <div className="chapter-grid">
        {chapters.map((ch) => (
          <article className="chapter reveal" key={ch.id} aria-labelledby={ch.id}>
            <div className="chapter-number">{ch.num}</div>
            <div className="chapter-illustration" aria-hidden="true">{ch.icon}</div>
            <h3 id={ch.id}>{ch.title}</h3>
            <p>{ch.text}</p>
          </article>
        ))}
      </div>

      <style jsx>{`
        #story { scroll-margin-top: 60px; }
        .section-head { text-align: center; max-width: 680px; margin: 0 auto 60px; }
        .section-head h2 { font-size: clamp(38px, 5.5vw, 70px); margin: 18px 0 14px; }
        .section-head p { color: var(--muted); font-family: var(--serif); font-size: clamp(15px, 1.5vw, 18px); line-height: 1.75; }
        .chapter-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .chapter {
          background: var(--paper2);
          border: 1px solid var(--line);
          padding: 28px;
          border-radius: 4px;
          min-height: 280px;
          position: relative;
          overflow: hidden;
          transition: transform 0.35s var(--ease-out), border-color 0.35s;
        }
        .chapter:hover { transform: translateY(-7px); border-color: var(--wine2); }
        .chapter::after {
          content: "♡";
          position: absolute;
          right: -14px;
          bottom: -36px;
          font-size: 110px;
          color: var(--rose);
          opacity: 0.5;
          pointer-events: none;
        }
        .chapter-number { font: italic 17px var(--serif); color: var(--wine); margin-bottom: 6px; }
        .chapter-illustration { height: 90px; display: grid; place-items: center; color: var(--wine); opacity: 0.9; }
        .chapter h3 { font: italic clamp(20px, 2vw, 26px) var(--serif); margin: 10px 0 8px; color: var(--wine); }
        .chapter p { font-size: 14px; line-height: 1.75; color: var(--muted); }
        @media (max-width: 820px) {
          .chapter-grid { grid-template-columns: 1fr; }
          .chapter { min-height: auto; }
          .chapter-illustration { height: 65px; }
        }
      `}</style>
    </section>
  );
}
