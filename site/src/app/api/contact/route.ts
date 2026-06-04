import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function formatDate(date?: string): string | null {
  if (!date) return null;
  // date arrives as "YYYY-MM-DD"; parse as local to avoid timezone shifting the day
  const [y, m, d] = date.split("-").map(Number);
  if (!y || !m || !d) return date;
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

async function verifyTurnstile(token: string, ip?: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Turnstile not configured — skip
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.append("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, service, date, message, website, turnstileToken } = await request.json();

    // Honeypot — silently accept but don't send
    if (website && website.trim().length > 0) {
      return Response.json({ success: true });
    }

    if (!name || !email || !message) {
      return Response.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const ip =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      null;

    const turnstileOk = await verifyTurnstile(turnstileToken, ip);
    if (!turnstileOk) {
      return Response.json(
        { error: "Verification failed. Please try again." },
        { status: 400 }
      );
    }

    const prettyDate = formatDate(date);
    const fromAddress = "Capital Wave Studio <booking@mail.capitalwavestudio.com>";

    // Notify the studio
    await resend.emails.send({
      from: fromAddress,
      to: process.env.CONTACT_EMAIL as string,
      replyTo: email,
      subject: `New booking inquiry from ${name}`,
      text: `
New booking inquiry from the Capital Wave Studio website:

Name: ${name}
Email: ${email}${service ? `\nService: ${service}` : ''}
Preferred Date: ${prettyDate ?? 'Not specified'}

Message:
${message}
      `,
    });

    // Auto-reply to the booker (non-blocking — we don't fail the whole request if this errors)
    try {
      await resend.emails.send({
        from: fromAddress,
        to: email,
        replyTo: process.env.CONTACT_EMAIL as string,
        subject: "We got your booking inquiry — Capital Wave Studio",
        text: `Hi ${name},

Thanks for reaching out to Capital Wave Studio. We've received your booking inquiry and a member of our team will get back to you within 48 hours.

Here's a copy of what you sent us:

${service ? `Service: ${service}\n` : ''}${prettyDate ? `Preferred Date: ${prettyDate}\n` : ''}
Message:
${message}

If anything changes in the meantime, just reply to this email.

— Capital Wave Studio
https://capitalwavestudio.com
        `,
      });
    } catch (replyErr) {
      console.error("Auto-reply failed:", replyErr);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);

    return Response.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}
