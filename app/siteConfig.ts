/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SITE CONFIGURATION, edit everything here, nowhere else.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Relationship dates ──────────────────────────────────────────────────────
/** The confirmed date our relationship officially began (YYYY-MM-DD). */
export const RELATIONSHIP_START = "2026-06-20";

/** Used for the 4-month anniversary page header. Edit when needed. */
export const ANNIVERSARY_LABEL = "four months";

// ── Names & nicknames ───────────────────────────────────────────────────────
export const HER_NAME = "Palak Aeron";
export const HER_NICKNAME = "Palku";
/** What she calls me */
export const MY_NICKNAME = "chak chak";
/** What I call her */
export const HER_CALLNAME = "bakk bak";

// ── Song ────────────────────────────────────────────────────────────────────
export const OUR_SONG_TITLE = "Love Story";
export const OUR_SONG_ARTIST = "Taylor Swift";
/**
 * Link to an official music service page for the song.
 * Verified official Spotify track page for the original recording.
 */
export const OUR_SONG_URL =
  "https://open.spotify.com/track/3CeCwYWvdfXbZLXFhBrbnf?si=600d24b1127a455a";

// ── Deployment / SEO ────────────────────────────────────────────────────────
/**
 * Set this to your actual public URL before deploying.
 * Used for Open Graph & Twitter card metadata.
 * Example: "https://palku.vercel.app"
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-deployment-url.com";

// ── Notification ─────────────────────────────────────────────────────────────
/**
 * The notification feature uses a Next.js API route + Resend (resend.com).
 * Set RESEND_API_KEY and NOTIFY_TO_EMAIL in .env.local before it works.
 * The site works perfectly without this; the letter reveals regardless.
 * Note: RESEND_API_KEY is server-only, never put it in NEXT_PUBLIC_ vars.
 */
