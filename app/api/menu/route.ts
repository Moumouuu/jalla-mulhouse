import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let { menuList, subMenuList, terMenuList } = await req.json();

  menuList?.forEach(async (menu: any) => {
    // update menu
    const menuUpdate = await prisma.menu.upsert({
      where: { id: menu.id },
      update: { name: menu.name },
      create: {
        ...menu,
      },
    });
    if (!menuUpdate) {
      throw new Error("Invalid update menu ");
    }

    subMenuList?.forEach(async (subMenu: any) => {
      if (subMenu.fatherMenu !== menu.name) return;
      delete subMenu.fatherMenu;
      // update submenu
      const subMenuUpdate = await prisma.subMenu.upsert({
        where: { id: subMenu.id },
        update: { name: subMenu.name },
        create: {
          ...subMenu,
          menuId: Number(menuUpdate.id),
        },
      });
      if (!subMenuUpdate) {
        throw new Error("Invalid update submenu ");
      }

      terMenuList?.forEach(async (terMenu: any) => {
        if (subMenu.name !== terMenu.fatherMenu) return;
        delete terMenu.fatherMenu;
        // update terMenulist
        const terMenuUpdate = await prisma.terMenu.upsert({
          where: { id: terMenu.id },
          update: { name: terMenu.name },
          create: {
            ...terMenu,
            menuId: Number(subMenuUpdate.id),
          },
        });
        if (!terMenuUpdate) {
          throw new Error("Invalid update terMenulist ");
        }
      });
    });
  });

  return NextResponse.json({ message: "success" });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  //todo : bug delete

  if (!id) {
    throw new Error("Invalid delete menu ");
  }

  const menu = await prisma.menu.findUnique({
    where: { id: Number(id) },
    include: {
      subMenu: {
        include: {
          terMenu: true,
        },
      },
    },
  });

  const subMenu = await prisma.subMenu.findUnique({
    where: { id: Number(id) },
    include: {
      terMenu: true,
    },
  });

  const terMenu = await prisma.terMenu.findUnique({
    where: { id: Number(id) },
  });

  if (!menu && !subMenu && !terMenu) {
    throw new Error("Invalid delete menu ");
  }

  if (terMenu) {
    await prisma.terMenu.delete({
      where: { id: Number(id) },
    });
  }

  if (subMenu) {
    subMenu.terMenu.forEach(async (terMenu: any) => {
      await prisma.terMenu.delete({
        where: { id: terMenu.id },
      });
    });
    await prisma.subMenu.delete({
      where: { id: Number(id) },
    });
  }

  if (menu) {
    menu.subMenu.forEach(async (subMenu: any) => {
      subMenu.terMenu.forEach(async (terMenu: any) => {
        await prisma.terMenu.delete({
          where: { id: terMenu.id },
        });
      });
      await prisma.subMenu.delete({
        where: { id: subMenu.id },
      });
    });
    await prisma.menu.delete({
      where: { id: Number(id) },
    });
  }

  return NextResponse.json({ message: "success" });
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (id) {
    let menu;
    menu = await prisma.menu.findUnique({
      where: { id: Number(id) },
    });
    if (!menu) {
      menu = await prisma.subMenu.findUnique({
        where: { id: Number(id) },
      });
    }
    if (!menu) {
      menu = await prisma.terMenu.findUnique({
        where: { id: Number(id) },
      });
    }
    if (!menu) {
      throw new Error("Invalid get menu ");
    }
    return NextResponse.json(menu);
  }

  const menuList = await prisma.menu.findMany({
    include: {
      subMenu: {
        include: {
          terMenu: true,
        },
      },
    },
  });

  return NextResponse.json(menuList);
}
