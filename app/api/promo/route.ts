import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) throw new Error("Invalid id");

  const deletedPromo = await prisma.promotion.delete({
    where: { id },
  });
  if (!deletedPromo) throw new Error("Promo not deleted");

  return NextResponse.json({ message: "success" });
}
