import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/notify
 *
 * Sends an email notification when Palku presses "Yes".
 * Uses EmailJS when configured, with Resend kept as a backwards-compatible fallback.
 *
 * EmailJS env vars (set in .env.local):
 *   EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY
 *
 * Resend fallback env vars:
 *   RESEND_API_KEY, NOTIFY_TO_EMAIL, and optionally NOTIFY_FROM_EMAIL
 *
 * If env vars are missing, returns 200 with { notified: false, reason: "not_configured" }.
 * This allows the client to continue without error.
 *
 * Basic rate-limiting: only 1 email per 60 seconds (in-memory; resets on cold start).
 */

// Simple in-memory rate limit, resets on serverless cold start.
let lastNotifiedAt = 0;
const RATE_LIMIT_MS = 60_000; // 60 seconds

export async function POST(req: NextRequest) {
  // Only accept JSON with the expected event field
  let body: { event?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (body?.event !== "yes_pressed") {
    return NextResponse.json({ error: "unknown_event" }, { status: 400 });
  }

  const emailJs = {
    serviceId: process.env.EMAILJS_SERVICE_ID,
    templateId: process.env.EMAILJS_TEMPLATE_ID,
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
    privateKey: process.env.EMAILJS_PRIVATE_KEY,
  };

  const now = Date.now();

  if (emailJs.serviceId && emailJs.templateId && emailJs.publicKey && emailJs.privateKey) {
    if (now - lastNotifiedAt < RATE_LIMIT_MS) {
      return NextResponse.json({ notified: false, reason: "rate_limited" });
    }

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: emailJs.serviceId,
          template_id: emailJs.templateId,
          user_id: emailJs.publicKey,
          accessToken: emailJs.privateKey,
          template_params: {
            event: "yes_pressed",
            message: "Palku just pressed Yes on your love site.",
            sent_at: new Date(now).toUTCString(),
          },
        }),
      });

      if (!response.ok) {
        const details = await response.text();
        console.error("[notify] EmailJS error:", response.status, details);
        return NextResponse.json({ notified: false, reason: "send_error" }, { status: 500 });
      }

      lastNotifiedAt = now;
      return NextResponse.json({ notified: true });
    } catch (err) {
      console.error("[notify] EmailJS request failed:", err);
      return NextResponse.json({ notified: false, reason: "server_error" }, { status: 500 });
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFY_TO_EMAIL;

  // If not configured, silently succeed so the UI never shows a confusing error
  if (!apiKey || !toEmail) {
    return NextResponse.json({ notified: false, reason: "not_configured" });
  }

  // Rate limit
  if (now - lastNotifiedAt < RATE_LIMIT_MS) {
    return NextResponse.json({ notified: false, reason: "rate_limited" });
  }

  const fromEmail = process.env.NOTIFY_FROM_EMAIL ?? "onboarding@resend.dev";

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: "She said yes! ♡",
      html: `
        <div style="font-family:Georgia,serif;color:#40242c;max-width:480px;margin:auto;padding:32px">
          <h1 style="color:#79283d;font-size:28px">She said yes! ♡</h1>
          <p style="font-size:17px;line-height:1.7">
            Palku just pressed <strong>Yes</strong> on your love site.
          </p>
          <p style="font-size:14px;color:#886c6d">
            Sent by the Palku Love Site · ${new Date().toUTCString()}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[notify] Resend error:", error);
      return NextResponse.json({ notified: false, reason: "send_error" }, { status: 500 });
    }

    lastNotifiedAt = now;
    return NextResponse.json({ notified: true });
  } catch (err) {
    console.error("[notify] Unexpected error:", err);
    return NextResponse.json({ notified: false, reason: "server_error" }, { status: 500 });
  }
}

// Only POST is supported
export async function GET() {
  return NextResponse.json({ error: "method_not_allowed" }, { status: 405 });
}
