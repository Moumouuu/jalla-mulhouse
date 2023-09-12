import { NextRequest, NextResponse } from "next/server";
import * as React from "react";
import { Resend } from "resend";
import { EmailTemplate } from "../../../components/email-template";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, phoneNumber, message } = await req.json();
  try {
    const data = await resend.emails.send({
      from: `Acme <ne-pas-repondre@jalla-mulhouse.fr>`,
      to: ["mbmulhouse@free.fr", "robin@pluviaux.fr"],
      subject: "📦 Nouveau message de Jalla-Mulhouse",
      react: EmailTemplate({
        firstName,
        lastName,
        email,
        phoneNumber,
        message,
      }) as React.ReactElement,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
