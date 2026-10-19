"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const PHOTOS = [
  {
    src: "/photos/together-warm.jpeg",
    alt: "A candid photo of Palak and her partner together",
    caption: "A little moment, kept forever.",
    className: "photo-card--wide",
    width: 1600,
    height: 1200,
  },
  {
    src: "/photos/palku-celebration-cropped.jpeg",
    alt: "Palak smiling at a celebration",
    caption: "That smile I could pick out anywhere.",
    className: "photo-card--tall",
    width: 900,
    height: 1241,
  },
  {
    src: "/photos/palku-together-new.jpeg",
    alt: "Palak and her partner sharing a playful moment together",
    caption: "Our kind of silly.",
    className: "photo-card--portrait",
    width: 720,
    height: 1280,
  },
  {
    src: "/photos/us-together.jpeg",
    alt: "Palak and her partner sharing a close moment",
    caption: "My favourite kind of close.",
    className: "photo-card--portrait",
    width: 720,
    height: 1600,
  },
];

export function PhotoGallery() {
  const [selected, setSelected] = useState<(typeof PHOTOS)[number] | null>(null);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  return (
    <section className="photos-section" aria-labelledby="photos-heading">
      <div className="photos-inner">
        <div className="section-head reveal">
          <div className="eyebrow eyebrow--center">a few favourite frames</div>
          <h2 id="photos-heading">
            Little pieces of <em>us.</em>
          </h2>
          <p>Not a perfect album. Just a few real moments I never want to forget.</p>
        </div>

        <div className="photo-grid">
          {PHOTOS.map((photo) => (
            <figure className={`photo-card ${photo.className} reveal`} key={photo.src}>
              <button
                type="button"
                className="photo-button"
                onClick={() => setSelected(photo)}
                aria-label={`Open larger view: ${photo.caption}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 640px) 82vw, (max-width: 900px) 42vw, 280px"
                />
              </button>
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
        <p className="gallery-hint" aria-hidden="true">Swipe to see more <span>→</span></p>
      </div>

      {selected && (
        <div className="photo-lightbox" role="dialog" aria-modal="true" aria-label={selected.caption}>
          <button
            type="button"
            className="lightbox-backdrop"
            onClick={() => setSelected(null)}
            aria-label="Close photo"
          />
          <div className="lightbox-content">
            <Image
              src={selected.src}
              alt={selected.alt}
              width={selected.width}
              height={selected.height}
              sizes="90vw"
            />
            <p>{selected.caption}</p>
            <button type="button" className="btn btn-secondary lightbox-close" onClick={() => setSelected(null)}>
              Close photo
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .photos-section {
          background: var(--paper);
          border-top: 1px solid var(--line);
          padding: var(--section-pad-v) var(--section-pad-h);
        }
        .photos-inner { max-width: var(--max-w); margin: 0 auto; }
        .section-head { max-width: 680px; margin: 0 auto 52px; text-align: center; }
        .section-head h2 { font-size: clamp(38px, 5.5vw, 70px); margin: 18px 0 14px; }
        .section-head p { color: var(--muted); font-family: var(--serif); font-size: clamp(15px, 1.5vw, 18px); }
        .photo-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr 0.85fr 0.75fr;
          gap: clamp(18px, 3vw, 34px);
          align-items: start;
        }
        .photo-card {
          margin: 0;
          padding: 12px 12px 18px;
          background: #fffaf3;
          border: 1px solid #eadbce;
          box-shadow: 0 18px 34px rgba(64, 36, 44, 0.12);
        }
        .photo-card:nth-child(2) { transform: rotate(2deg); margin-top: 28px; }
        .photo-card:nth-child(3) { transform: rotate(-2deg); margin-top: 4px; }
        .photo-card:nth-child(4) { transform: rotate(3deg); margin-top: 38px; }
        .photo-button { display: block; width: 100%; padding: 0; cursor: zoom-in; }
        .photo-button:focus-visible { outline: 2px solid var(--wine); outline-offset: 4px; }
        .photo-button :global(img) { display: block; width: 100%; height: 265px; object-fit: cover; }
        .photo-card--wide .photo-button :global(img) { object-position: center; }
        .photo-card--tall .photo-button :global(img),
        .photo-card--portrait .photo-button :global(img) { object-position: center; }
        .photo-card:hover { box-shadow: 0 24px 42px rgba(64, 36, 44, 0.18); }
        .gallery-hint { display: none; text-align: center; color: var(--muted); font-size: 14px; margin-top: 2px; }
        figcaption { padding: 14px 4px 0; color: var(--wine); font: italic 17px var(--serif); text-align: center; }
        .photo-lightbox {
          position: fixed; inset: 0; z-index: 100;
          display: grid; place-items: center; padding: 16px;
        }
        .lightbox-backdrop { position: absolute; inset: 0; background: rgba(45, 20, 28, 0.78); cursor: pointer; }
        .lightbox-content {
          position: relative; z-index: 1; max-width: min(720px, 94vw); max-height: 92dvh;
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          padding: 16px; background: var(--paper2); box-shadow: 0 24px 70px rgba(0,0,0,.3);
        }
        .lightbox-content :global(img) { width: auto; max-width: 100%; max-height: 72vh; height: auto; object-fit: contain; }
        .lightbox-content p { color: var(--wine); font: italic 18px var(--serif); text-align: center; }
        .lightbox-close { min-width: 44px; min-height: 44px; padding: 9px 18px; font-size: 13px; }
        @media (max-width: 900px) {
          .photo-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); max-width: 680px; margin: auto; }
        }
        @media (max-width: 640px) {
          .photos-section { padding-left: 18px; padding-right: 18px; }
          .photo-grid { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 18px; padding: 10px 8px 24px; margin: 0 -8px; }
          .photo-card { flex: 0 0 min(78vw, 300px); scroll-snap-align: center; }
          .photo-card:nth-child(n) { margin-top: 0; }
          .photo-button :global(img) { height: 300px; }
          .gallery-hint { display: block; }
        }
      `}</style>
    </section>
  );
}
