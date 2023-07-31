import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { promos, products } = await req.json();

  if (promos) {
    promos.forEach(async (promo: any) => {
      const res = await prisma.promotion.create({
        data: {
          name: promo.name,
          discount: Math.floor(Math.random() * (100 - 10) + 10),
          launchDay: new Date(promo.launchDay),
          endDay: new Date(promo.endDay),
        },
      });
    });
  }
  return NextResponse.json({ message: "success" });
}
