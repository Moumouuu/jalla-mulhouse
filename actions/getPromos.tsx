import prisma from "../lib/prisma";

export default async function getPromos() {
  return await prisma.promotion.findMany();
}
