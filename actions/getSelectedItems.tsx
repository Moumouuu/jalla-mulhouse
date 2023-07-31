import prisma from "../lib/prisma";

export default async function GetSelectedItems() {
  return await prisma.product.findMany({
    where: {
      selected: true,
      visible: true,
    },
    include: {
      pictures: true,
      promotion: true,
      height: true,
    },
  });
}
