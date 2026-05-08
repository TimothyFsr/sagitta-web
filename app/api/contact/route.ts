import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Log the submission to console
    console.log("📧 New contact form submission:");
    console.log("─────────────────────────────────");
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log("─────────────────────────────────\n");

    // TODO: connect to email provider (e.g. Resend or Nodemailer)
    // Example with Resend:
    // const { data, error } = await resend.emails.send({
    //   from: 'Sagitta Contact Form <onboarding@resend.dev>',
    //   to: ['support@sagitta.app'],
    //   subject: `Contact Form: ${subject}`,
    //   html: `
    //     <h2>New contact form submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Subject:</strong> ${subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `,
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
