import prisma from "../lib/prisma";

export default async function GetProductsLite() {
  return await prisma.product.findMany({
    where: {
      visible: true,
    },
    include: {
      pictures: true,
    },
  });
}
