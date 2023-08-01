import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { promos, products } = await req.json();

  if (promos) {
    try {
      await Promise.all(
        promos.map(async (promo: any) => {
          // promo exist ?
          const p = await prisma.promotion.findFirst({
            where: {
              id: Number(promo.id),
            },
          });

          if (p) {
            await prisma.promotion.update({
              where: { id: promo.id },
              data: {
                name: promo.name,
                discount: Number(promo.discount),
                launchDay: promo.launchDay,
                endDay: promo.endDay,
              },
            });
          } else {
            await prisma.promotion.create({
              data: {
                name: promo.name,
                discount: Number(promo.discount),
                launchDay: promo.launchDay,
                endDay: promo.endDay,
              },
            });
          }
        })
      );
    } catch (error) {
      console.error("Error updating promotions:", error);
      return NextResponse.json(
        { message: "error", error: "Error updating promotions" },
        { status: 500 }
      );
    }
  }

  if (products) {
    try {
      await Promise.all(
        products.map(async (product: any) => {
          let promotionId = null;
          //find promotionId from discount
          //if is new promo
          if (!product.promotionId) {
            const promo = await prisma.promotion.findFirst({
              where: {
                discount: Number(product.promotion),
              },
            });
            promotionId = promo?.id ?? null;
          } else if (product.promotion.discount) {
            //if is old promo
            promotionId = product.promotion.id;
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
            throw new Error("Product not found");
          }
        })
      );
    } catch (error) {
      console.error("Error updating products:", error);
      return NextResponse.json(
        { message: "error", error: "Error updating products" },
        { status: 500 }
      );
    }
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
      promotion: true,
    },
  });

  return NextResponse.json({ products });
}
