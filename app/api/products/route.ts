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

  /*if (products) {
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

      // product exist ?
      const p = await prisma.product.findFirst({
        where: {
          id: product.id,
        },
      });

      // if product exist & promotionId is different
      if (p) {
        await prisma.product.update({
          where: { id: product.id },
          data: {
            new: product.new,
            selected: product.selected,
            promotionId:
              promotionId !== p.promotionId ? promotionId : p.promotionId,
            visible: product.visible,
          },
        });
      } else {
        throw new Error("product not found");
      }
    });
  }*/

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
