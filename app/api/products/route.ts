import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { promos, products } = await req.json();

  const allPromos = await prisma.promotion.findMany();
  // delete promo that not in actual promotion (user delete with the bin icon)
  allPromos.forEach(async (promo: any) => {
    let promoExist = false;
    promos.forEach((newPromo: any) => {
      if (promo.id == newPromo.id) {
        promoExist = true;
      }
    });
    if (!promoExist) {
      const deletedPromo = await prisma.promotion.delete({
        where: { id: promo.id },
      });
      if (!deletedPromo) throw new Error("Promo not deleted");
    }
  });

  //update promo if exists or create new promo
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
        console.log(product);
      }
    });

    delete product.promotion;

    const updatedProduct = await prisma.product.update({
      where: { id: product.id },
      data: product,
    });

    if (!updatedProduct) throw new Error("Product not updated");
  });

  return NextResponse.json({ message: "Products updated" });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  const deletedProduct = await prisma.product.delete({
    where: { id },
  });

  if (!deletedProduct) throw new Error("Product not deleted");
  return NextResponse.json({ message: "Product deleted" });
}
