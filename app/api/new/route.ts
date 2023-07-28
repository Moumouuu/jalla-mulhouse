import prisma from "@/lib/prisma";
import { Color, Height } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id, title, description, colors, sizes, images, product } =
    await req.json();

  if (!title || !description) {
    throw new Error("Title and description are required");
  }

  if (id) {
    const res = await prisma.product.delete({
      where: { id: id },
    });
    if (!res) throw new Error("Error during product deletion");
  }

  const sizesFormated = sizes.map((size: Height) => {
    return {
      height: size.height,
      price: Number(size.price),
    };
  });

  const newProduct = await prisma.product.create({
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
          binary: image.binary?.toString(),
        })),
      },
      new: product.new,
      selected: product.selected,
      promotionId: product.promotionId,
    },
  });

  if (!newProduct) {
    throw new Error("Error creating product");
  }

  return NextResponse.json({ newProduct });
}
