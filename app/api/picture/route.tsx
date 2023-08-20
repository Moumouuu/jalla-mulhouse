import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  const res = await prisma?.picture.delete({
    where: {
      id,
    },
  });
  if (!res) throw new Error("Picture not found");

  return NextResponse.json({ message: "Picture deleted" });
}
