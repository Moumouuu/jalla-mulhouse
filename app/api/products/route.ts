import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { promos, products } = await req.json();

  //update promo if exists or create new promo
  // todo : cant create new promo
  promos.forEach(async (promo: any) => {
    //if promo.id doesnt exist in database -> new promo
    const updatedPromo = await prisma.promotion.upsert({
      where: { id: promo.id },
      update: { ...promo, discount: Number(promo.discount) },
      create: { ...promo, discount: Number(promo.discount) },
    });
    if (!updatedPromo) throw new Error("Promo not updated");
  });

  //update product if exists or create new product
  products.forEach(async (product: any) => {
    delete product.colors;
    delete product.pictures;
    delete product.height;

    // add promotionId to product cheking with discount value because discount value is unique
    promos.forEach(async (promo: any) => {
      if (promo.discount == product.promotion) {
        product.promotionId = promo.id;
      }
    });

    delete product.promotion;

    const updatedProduct = await prisma.product.update({
      where: { id: product.id },
      data: product,
    });

    if (!updatedProduct) throw new Error("Product not updated");
  });

  return redirect("/admin/products");
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  const deletedProduct = await prisma.product.delete({
    where: { id },
  });

  if (!deletedProduct) throw new Error("Product not deleted");
  return NextResponse.json({ message: "Product deleted" });
}
