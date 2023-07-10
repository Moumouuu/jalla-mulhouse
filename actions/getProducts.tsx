import prisma from "../lib/prisma";

export default async function getProducts() {
  return await prisma.product.findMany({
    include: {
      promotion: true,
      colors: true,
      pictures: true,
      height: true,
    },
  });
}
