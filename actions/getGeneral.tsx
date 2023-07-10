import prisma from "../lib/prisma";

export default async function getGeneral() {
  return await prisma.general.findFirst({
    include: {
      carrousel: true,
    },
  });
}
