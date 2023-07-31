import prisma from "../lib/prisma";

export const revalidate = 0;

export default async function GetGeneral() {
  return await prisma.general.findFirst({
    include: {
      carrousel: true,
    },
  });
}
