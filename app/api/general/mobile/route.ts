import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const general = await prisma.general.findFirst({
  });

  if (!general) throw new Error("Error getting general");

  return NextResponse.json(general);
}
