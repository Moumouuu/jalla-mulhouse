import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { promoteMessage, promoteMessageMobile, about, files, hour } =
    await req.json();

  //find object
  const general = await prisma.general.findFirst();

  //update object or create if not exist
  const resUpdated = await prisma?.general.upsert({
    where: { id: general?.id || -1 },
    update: {
      promoteMessage,
      promoteMessageMobile,
      about,
      hour,
    },
    create: {
      promoteMessage,
      about,
      promoteMessageMobile,
      hour,
    },
  });

  if (!resUpdated) throw new Error("Error updating general");

  if (
    resUpdated.promoteMessage !== promoteMessage ||
    resUpdated.about !== about ||
    resUpdated.promoteMessageMobile !== promoteMessageMobile
  )
    throw new Error("Error updating general");

  // create pictures
  if (files) {
    files.forEach(async (file: any) => {
      const res = await prisma.picture.create({
        data: {
          url: file.url,
          generalId: resUpdated.id,
        },
      });
      if (!res) throw new Error("Error creating picture");
    });
  }

  return NextResponse.json({ message: "success" });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  await prisma.picture.delete({
    where: { id },
  });

  return NextResponse.json({ message: "success" });
}

export async function GET() {
  const general = await prisma.general.findFirst({
    include: {
      carrousel: true,
    },
  });

  if (!general) throw new Error("Error getting general");

  return NextResponse.json(general);
}
