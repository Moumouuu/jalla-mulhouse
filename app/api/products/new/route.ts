import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const revalidate = 1;
export async function GET() {
  const res = await prisma.product.findMany({
    where: {
      new: true,
      visible: true,
    },
    include: {
      pictures: true,
      promotion: true,
      height: true,
    },
  });

  return NextResponse.json( res );
}
