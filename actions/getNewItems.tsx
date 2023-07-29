import prisma from "../lib/prisma";

export default async function getNewItems() {
  return await prisma.product.findMany({
    where: {
      new: true,
      visible: true,
    },
    include: {
      pictures: true,
      promotion: true,
      height: true,
    },
  });
}
