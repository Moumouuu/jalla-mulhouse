import prisma from "../lib/prisma";

export default async function getProductsLite() {
  return await prisma.product.findMany({
    where: {
      visible: true,
    },
    include: {
      pictures: true,
    },
  });
}
