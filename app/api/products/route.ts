import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { promos, products } = await req.json();

  return NextResponse.json({ message: "success" });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  const deletedProduct = await prisma.product.delete({
    where: { id },
  });

  if (!deletedProduct) throw new Error("Product not deleted");
  return NextResponse.json({ message: "Product deleted" });
}

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      height: true,
      promotion: true,
    },
  });

  return NextResponse.json({ products });
}
