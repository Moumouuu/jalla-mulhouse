import prisma from "../lib/prisma";

export default async function getProduct(id: Number) {
  return await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      promotion: true,
      colors: true,
      pictures: true,
      height: true,
    },
  });
}
