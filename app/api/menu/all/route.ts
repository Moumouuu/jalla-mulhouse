import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const menus = await prisma.menu.findMany({
    include: {
      subMenu: {
        include: {
          terMenu: true,
        },
      },
    },
  });
  return NextResponse.json(menus);
}
