import prisma from "@/lib/prisma";
import { Color, Height } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title, description, colors, sizes, images } = await req.json();

  if (!title || !description) {
    throw new Error("Title and description are required");
  }

  const sizesFormated = sizes.map((size: Height) => {
    return {
      height: size.height,
      price: Number(size.price),
    };
  });

  const product = await prisma.product.create({
    data: {
      title,
      description,
      colors: {
        create: colors.map((color: Color) => ({ hex: color.hex })),
      },
      height: {
        create: sizesFormated.map((size: Height) => size),
      },
      pictures: {
        create: images.map((image: any) => ({
          binary: image.bin.toString(),
        })),
      },
    },
  });

  if (!product) {
    throw new Error("Error creating product");
  }

  return NextResponse.json({ success: "Création réussi" });
}
