# Palku Love Site, Four-Month Anniversary

A warm, romantic, personal website for Palak Aeron (Palku), built with **Next.js 15**, **React 19**, **TypeScript**, and **Three.js**.

---

## ✦ Getting started (local)

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables (optional, notification feature only)
cp .env.example .env.local
# then edit .env.local with your values

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## ✦ Configuration

Everything personal lives in **[`app/siteConfig.ts`](app/siteConfig.ts)**. Edit that file, not scattered strings in components.

| Constant | Purpose |
|---|---|
| `RELATIONSHIP_START` | June 20, 2026, source of truth for the days counter |
| `HER_NAME` / `HER_NICKNAME` | Palak Aeron / Palku |
| `MY_NICKNAME` / `HER_CALLNAME` | chak chak / bakk bak |
| `OUR_SONG_TITLE` / `OUR_SONG_ARTIST` | Love Story / Taylor Swift |
| `OUR_SONG_URL` | Official Spotify track URL for “Love Story” |
| `SITE_URL` | Public deployment URL (also set `NEXT_PUBLIC_SITE_URL` in `.env.local`) |

---

## ✦ Notification setup (optional)

The site works perfectly without any notification. If you want to receive an email when Palku presses **Yes**:

1. Sign up at [resend.com](https://resend.com), the free tier is more than enough.
2. Create an API key.
3. Copy `.env.example` to `.env.local` and fill in:
   - `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`, and `EMAILJS_PRIVATE_KEY`
   - Configure the EmailJS template recipient in the EmailJS dashboard. The route sends `event`, `message`, and `sent_at` template parameters.
   - EmailJS private keys stay server-side and must not use a `NEXT_PUBLIC_` prefix.
   - Resend remains available as an optional fallback with `RESEND_API_KEY`, `NOTIFY_TO_EMAIL`, and `NOTIFY_FROM_EMAIL`.
4. Restart the dev server or redeploy.

> ⚠️ **API keys must never appear in client-side code.** The notification happens in the Next.js API route at `app/api/notify/route.ts` which only runs on the server.

---

## ✦ Deploying

### Vercel (recommended, free)

1. Push the repo to GitHub/GitLab.
2. Import the project on [vercel.com](https://vercel.com).
3. Add environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_SITE_URL`, your Vercel domain, e.g. `https://palku.vercel.app`
   - EmailJS variables listed above, or the optional Resend variables
4. Deploy.
5. Update `NEXT_PUBLIC_SITE_URL` to match the real domain for correct Open Graph tags.

---

## ✦ Photo gallery

The gallery uses four supplied local photos from `public/photos/`:

1. Replace or add files in `public/photos/` without sending them to an external service.
2. Edit the `PHOTOS` list in [`app/components/PhotoGallery.tsx`](app/components/PhotoGallery.tsx).
3. Keep each `alt` text factual and edit captions to match the real context.

Clicking a photo opens an accessible larger view. On phones, the gallery becomes a horizontal swipe strip without creating page-level horizontal overflow.

The Open Graph preview is the locally generated `public/og-image.png` (1200 × 630). The original SVG source remains in `public/og-image.svg`.

The main artwork is also local:

- `public/images/hero-couple.png`, standing couple illustration used in the hero.
- `public/images/proposal-couple.png`, kneeling bouquet illustration used in the proposal.

These are referenced with `next/image`, explicit dimensions, responsive `sizes`, and reduced-motion-compatible surrounding animations.

---

## ✦ SEO & privacy

The site includes `<meta name="robots" content="noindex, nofollow">` to discourage search engine indexing. This is **not** authentication or access control, the URL remains publicly accessible if shared. If you need access control, add authentication (e.g. Next.js middleware + password).

---

## ✦ Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI | React 19 + TypeScript |
| Styling | Vanilla CSS (no Tailwind at runtime) |
| 3D | Three.js (dynamically imported, fully cleaned up) |
| Email | Resend (optional, server-only) |
| Fonts | Cormorant Garamond + Inter via Google Fonts |

---

*Made with love, just for Palku.* ♡
