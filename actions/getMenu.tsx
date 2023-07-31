import prisma from "../lib/prisma";

export default async function GetMenu() {
  return await prisma.menu.findMany({
    include: {
      subMenu: {
        include: {
          terMenu: true,
        },
      },
    },
  });
}
