import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, service, date, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Capital Wave Studio <booking@mail.capitalwavestudio.com>",
      to: process.env.CONTACT_EMAIL as string,
      replyTo: email,
      subject: `New booking inquiry from ${name}`,
      text: `
New booking inquiry from the Capital Wave Studio website:

Name: ${name}
Email: ${email}${service ? `\nService: ${service}` : ''}${date ? `\nPreferred Date: ${date}` : ''}

Message:
${message}
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);

    return Response.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}