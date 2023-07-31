import prisma from "../lib/prisma";

export default async function GetGeneral() {
  return await prisma.general.findFirst({
    include: {
      carrousel: true,
    },
  });
}
