"use client";

/**
 * Timeline section, four milestone cards.
 * Wording makes clear that months 1–4 are monthly anniversaries calculated
 * from the confirmed start date (June 20, 2026), not independently verified events.
 */
export function Timeline() {
  const moments = [
    {
      id: "m-01",
      side: "left" as const,
      label: "Month one · July 20, 2026",
      title: "The first month felt like the longest and shortest thing.",
      text: "We were new and careful and curious. Every message mattered a little more than we let on.",
    },
    {
      id: "m-02",
      side: "right" as const,
      label: "Month two · August 20, 2026",
      title: "A little more like us.",
      text: "Somewhere between the random conversations, the teasing, and the way you made ordinary days feel lighter, being around you started to feel natural. I was beginning to love the little world we were building together.",
    },
    {
      id: "m-03",
      side: "left" as const,
      label: "Month three · September 20, 2026",
      title: "Feeling like home.",
      text: "You became the notification I actually wanted to see. I started noticing that the best parts of my day had you in them.",
    },
    {
      id: "m-04",
      side: "right" as const,
      label: "Month four · October 20, 2026",
      title: "Still my favourite.",
      text: "Four months in, and I still discover new things to love about you. That doesn't feel like a countdown, it feels like a beginning.",
    },
  ];

  return (
    <section className="timeline-section" aria-labelledby="timeline-heading">
      <div className="section-wrap" style={{ paddingTop: 0 }}>
        <div className="section-head reveal">
          <div className="eyebrow eyebrow--center">chapter by chapter</div>
          <h2 id="timeline-heading">
            Four months of <em>us.</em>
          </h2>
          <p>
            Four monthly milestones from June 20, 2026.
            One very big feeling. And so many pages still waiting to be written.
          </p>
        </div>

        <div className="timeline" role="list">
          {moments.map((m) => (
            <div
              key={m.id}
              className={`moment moment--${m.side} reveal`}
              role="listitem"
              aria-labelledby={m.id}
            >
              <small>{m.label}</small>
              <h3 id={m.id}>{m.title}</h3>
              <p>{m.text}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .timeline-section { background: var(--paper2); border-top: 1px solid var(--line); }
        .section-head { text-align: center; max-width: 680px; margin: 0 auto 60px; }
        .section-head h2 { font-size: clamp(38px, 5.5vw, 70px); margin: 18px 0 14px; }
        .section-head p { color: var(--muted); font-family: var(--serif); font-size: clamp(15px, 1.5vw, 18px); line-height: 1.75; }
        .timeline { max-width: 820px; margin: 0 auto; position: relative; }
        .timeline::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          background: var(--line);
        }
        .moment {
          width: 50%;
          padding-bottom: 54px;
          position: relative;
        }
        .moment--left  { padding-right: 48px; }
        .moment--right { margin-left: 50%; padding-left: 48px; }
        /* Heart marker on timeline spine */
        .moment::after {
          content: "♡";
          position: absolute;
          top: 2px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--paper2);
          color: var(--wine);
          font-size: 16px;
          display: grid;
          place-items: center;
        }
        .moment--left::after  { right: -12px; }
        .moment--right::after { left: -12px; }
        .moment small {
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--wine);
          font-weight: 600;
          display: block;
          margin-bottom: 6px;
        }
        .moment h3 { font: italic clamp(18px, 2vw, 24px) var(--serif); margin: 0 0 8px; color: var(--ink); }
        .moment p  { font-size: 16px; line-height: 1.75; color: var(--muted); }
        @media (max-width: 640px) {
          .timeline::before { left: 10px; }
          .moment, .moment--right {
            width: 100%;
            margin-left: 0;
            padding: 0 0 40px 40px;
          }
          .moment::after, .moment--right::after { left: -2px; right: auto; }
        }
      `}</style>
    </section>
  );
}
