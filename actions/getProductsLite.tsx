import prisma from "../lib/prisma";

export default async function getProductsLite() {
  return await prisma.product.findMany({
    include: {
      pictures: true,
    },
  });
}
