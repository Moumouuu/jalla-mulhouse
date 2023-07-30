import { EmailTemplate } from "@/lib/Email";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { firstName, name, phoneNumber, message, email } = await req.json();
  try {
    const data = await resend.emails.send({
      from: `Acme <${email}>`,
      to: ["robinpluviaux@gmail.com"],
      subject: "✉️ New Email from Jalla-Mulhouse ",
      react: EmailTemplate({ firstName, name, phoneNumber, message, email }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
