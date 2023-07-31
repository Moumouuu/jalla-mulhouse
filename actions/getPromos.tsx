import prisma from "../lib/prisma";

export default async function GetPromos() {
  return await prisma.promotion.findMany();
}
