import prisma from "../lib/prisma";

export const dynamic = "force-dynamic";
export default async function GetGeneral() {
  return await prisma.general.findFirst({
    include: {
      carrousel: true,
    },
  });
}
