import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { promos, products } = await req.json();

  if (promos) {
    promos.forEach(async (promo: any) => {
      const res = await prisma.promotion.upsert({
        where: { id: promo.id },
        update: {
          name: promo.name,
          discount: Number(promo.discount),
          launchDay: promo.launchDay,
          endDay: promo.endDay,
        },
        create: {
          name: promo.name,
          discount: Number(promo.discount),
          launchDay: promo.launchDay,
          endDay: promo.endDay,
        },
      });

      if (!res) throw new Error("Error creating promo");
    });
  }

  if (products) {
    products.forEach(async (product: any) => {
      let promotionId = null;
      //find promotionId from discount
      if (product.promotion) {
        const promo = await prisma.promotion.findFirst({
          where: {
            discount: Number(product.promotion),
          },
        });
        if (!promo) throw new Error("Error finding promo");
        promotionId = promo.id;
      }
      const res = await prisma.product.upsert({
        where: { id: product.id },
        update: {
          new: product.new,
          selected: product.selected,
          promotionId: promotionId,
          visible: product.visible,
        },
        // usually never happens
        create: {
          title: product.title,
          description: product.description,
          new: product.new,
          selected: product.selected,
          promotionId: product.promotionId,
          visible: product.visible,
        },
      });
      if (!res) throw new Error("Error creating product");
    });
  }

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
    },
  });

  return NextResponse.json({ products });
}
