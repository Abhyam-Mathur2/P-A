"use client";

import { useState, useCallback } from "react";
import { useRef } from "react";
import Image from "next/image";
import { usePetals } from "./usePetals";
import { useFireworks } from "./useFireworks";

/** The multi-step "tell me more" reveal messages. */
const TEASE_STEPS = [
  {
    copy: "Okay, here's the thing, you make me laugh at the worst possible times and somehow that's one of my favourite things about you.",
    response: "One more reason… ♡",
  },
  {
    copy: "You showed up at SIH, then at CSI, then in my minor project, then on a random evening walk. You kept showing up. I'm starting to think that wasn't a coincidence.",
    response: "There's still more… ♡",
  },
  {
    copy: `Every time "Love Story" plays, I think of you before I even register that the song started. That's not something I planned. That's just what you are to me.`,
    response: "Okay, ready for the real question? ♡",
  },
  {
    copy: "So here it is, Palku, will you keep being my favourite person? My bakk bak? The one I want to tell everything to?",
    response: "Now press Yes 👆",
  },
];

const LOVE_LETTER = `Happy four months, my Palku, my bakk bak.

If you'd told me at SIH that one day I'd be writing you a love letter, I would have found a very convincing excuse to walk away quickly. And then I met you properly, and then there was CSI, and then the minor project, and then a random evening walk that quietly changed everything.

June 20, 2026. I remember it the way you remember the moment a song you've heard a hundred times finally makes sense.

Inside jokes became our own language. "Mujhe tumhari ek aankh dikh rahi" became one of those silly little lines I never want to forget. And somewhere between the laughter, long conversations, and quiet comfort, you started feeling like my favourite place to be. ♡

Four months is a short chapter. But if this is how the first chapter feels, I can't wait for what the rest of the book looks like.

I love you. Today, tomorrow, and in every ordinary little moment in between.

always yours ♡`;

type Stage = "initial" | "teasing" | "yes";

export function Proposal() {
  const [stage, setStage] = useState<Stage>("initial");
  const [teaseStep, setTeaseStep] = useState(0);
  const [copy, setCopy] = useState(
    "I have a tiny question. It comes with absolutely no pressure, one imaginary bouquet, and a boy who has practised this speech approximately a hundred times in his head."
  );
  const [response, setResponse] = useState("");
  const yesButtonRef = useRef<HTMLButtonElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);

  const { spawnPetals } = usePetals();
  const { canvasRef, startFireworks } = useFireworks();

  const handleTease = useCallback(() => {
    const step = TEASE_STEPS[teaseStep];
    if (!step) return;
    setCopy(step.copy);
    setResponse(step.response);
    setTeaseStep((n) => n + 1);
    setStage("teasing");
    spawnPetals(8);
  }, [teaseStep, spawnPetals]);

  const handleYes = useCallback(() => {
    if (stage === "yes") return;
    setStage("yes");
    setCopy(LOVE_LETTER);
    setResponse("I'd choose you again. And again. And again. ♡");
    spawnPetals(55);
    startFireworks();

    // Fire-and-forget notification, does NOT block letter reveal
    void fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "yes_pressed" }),
    }).catch(() => undefined);
    requestAnimationFrame(() => {
      letterRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, [spawnPetals, startFireworks, stage]);

  const handleMoreHugs = useCallback(() => {
    spawnPetals(35);
  }, [spawnPetals]);

  const isYes    = stage === "yes";
  /* Determine tease button state */
  const teaseLabel = isYes
    ? "One more hug? ♡"
    : teaseStep < TEASE_STEPS.length
    ? "Wait, tell me more…"
    : "Ready for the question? ♡";

  const teaseComplete = !isYes && teaseStep >= TEASE_STEPS.length;
  const handleReady = useCallback(() => {
    yesButtonRef.current?.focus();
  }, []);

  return (
    <section
      className={`proposal${isYes ? " proposal--yes" : ""}`}
      id="proposal"
      aria-labelledby="proposal-heading"
    >
      {/* Fireworks canvas, sits behind content */}
      <canvas
        ref={canvasRef}
        className="fireworks-canvas"
        aria-hidden="true"
      />

      <div className="proposal-inner">
        <div className="eyebrow eyebrow--center">one very important question</div>

        <h2 id="proposal-heading">
          {isYes ? (
            <>Then here&apos;s to<br /><em>our forever.</em></>
          ) : (
            <>Okay, Palku…<br /><em>hear me out.</em></>
          )}
        </h2>

        <Image
          className={`proposal-scene${isYes ? " proposal-scene--celebrate" : ""}`}
          src="/images/proposal-couple.webp"
          alt="A warm romantic illustration of a person kneeling with a bouquet beneath a glowing heart arch."
          width={1312}
          height={1199}
          sizes="(max-width: 640px) 92vw, 540px"
        />

        {/* Love letter shown after Yes */}
        {isYes ? (
          <div ref={letterRef} className="love-letter" aria-live="polite" aria-label="Love letter revealed">
            {LOVE_LETTER.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        ) : (
          <p id="proposal-copy" className="proposal-copy">
            {copy}
          </p>
        )}

        <div className="proposal-actions">
          {/* Yes button, hidden once Yes is pressed */}
          {!isYes && (
            <button
              className="btn btn-primary"
              id="yesBtn"
              ref={yesButtonRef}
              onClick={handleYes}
              aria-label="Yes, confirm and reveal the love letter"
            >
              Yes, you adorable human ♡
            </button>
          )}

          {/* Tease / More hugs button */}
          <button
            className="btn btn-secondary"
            id="teaseBtn"
            onClick={isYes ? handleMoreHugs : teaseComplete ? handleReady : handleTease}
            aria-label={isYes ? "Send more petal love" : teaseLabel}
          >
            {teaseLabel}
          </button>
        </div>

        {/* Response text */}
        {response && (
          <p className="response" aria-live="polite" role="status">
            {response}
          </p>
        )}

      </div>

      <style jsx>{`
        .proposal {
          position: relative;
          background: var(--paper2);
          background:
            radial-gradient(ellipse at 50% 30%, color-mix(in srgb, var(--rose) 50%, transparent), transparent 52%),
            var(--paper2);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          overflow: hidden;
          padding: 120px var(--section-pad-h) 100px;
          text-align: center;
        }
        .proposal--yes {
          background:
            radial-gradient(ellipse at 50% 25%, #8c344666, transparent 65%),
            var(--paper2);
        }
        .fireworks-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.8s;
        }
        .proposal--yes .fireworks-canvas { opacity: 1; }
        .proposal-inner { max-width: 850px; margin: 0 auto; position: relative; z-index: 2; }
        .proposal-inner h2 { font-size: clamp(46px, 8vw, 96px); margin: 18px 0; }
        .proposal-scene--celebrate { animation: celebrate 0.7s ease-in-out 2; }
        .proposal-copy {
          font-family: var(--serif);
          font-size: clamp(16px, 1.6vw, 19px);
          line-height: 1.8;
          color: var(--muted);
          max-width: 600px;
          margin: 0 auto 28px;
          transition: opacity 0.4s;
        }
        /* Love letter */
        .love-letter {
          background: var(--paper2);
          border: 1px solid var(--line);
          border-radius: 4px;
          padding: 32px 36px;
          max-width: 620px;
          margin: 0 auto 28px;
          text-align: left;
          animation: fadeIn 0.7s var(--ease-out);
        }
        .love-letter p {
          font-family: var(--serif);
          font-size: clamp(15px, 1.5vw, 17px);
          line-height: 1.85;
          color: var(--ink);
          margin-bottom: 16px;
          white-space: pre-line;
        }
        .love-letter p:last-child { margin-bottom: 0; }
        .proposal-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 8px;
        }
        .response {
          min-height: 30px;
          color: var(--wine);
          font: italic clamp(18px, 2vw, 22px) var(--serif);
          margin-top: 22px;
        }
        .notify-note { font-size: 12px; color: var(--muted); margin-top: 10px; letter-spacing: 0.05em; }
        @media (max-width: 640px) {
          .proposal { padding: 85px var(--section-pad-h) 70px; }
          .proposal-scene { width: min(86vw, 340px); max-height: 340px; }
          .love-letter { padding: 24px 20px; }
          .proposal-actions { flex-direction: column; align-items: stretch; }
          .proposal-actions .btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
