import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let { menuId } = await req.json();

  if (!menuId) {
    throw new Error("Menu needed");
  }

  // is Menu
  let menu: any = await prisma.menu.findFirst({
    where: {
      id: Number(menuId),
    },
    include: {
      subMenu: {
        include: {
          terMenu: true,
        },
      },
    },
  });

  // is Submenu
  if (!menu) {
    const subMenu = await prisma.subMenu.findFirst({
      where: {
        id: Number(menuId),
      },
      include: {
        terMenu: true,
      },
    });
    menu = subMenu;
    //is terMenu
    if (!subMenu) {
      const terMenu = await prisma.terMenu.findFirst({
        where: {
          id: Number(menuId),
        },
      });
      menu = terMenu;
    }
  }

  if (!menu) {
    throw new Error("Menu not found");
  }

  // return list of product who have the same menu or children menu

  let menus: any = [];

  // is menu
  if (menu.name) {
    menus.push(menu);
  }

  // is Menu -> check subMenu & terMenu and find product and add to the final list
  if (menu.subMenu) {
    menu.subMenu.forEach((subMenu: any) => {
      //add subMenu
      menus.push(subMenu);
      subMenu.terMenu.forEach((terMenu: any) => {
        //add terMEnu
        menus.push(terMenu);
      });
    });
  }

  // is SubMenu -> check terMenu & and it
  if (menu.terMenu) {
    menu.terMenu.forEach((terMenu: any) => {
      //add subMenu
      menus.push(terMenu);
    });
  }

  if (menus.length === 0) {
    return new NextResponse(JSON.stringify([]));
  }

  let products: any = [];

  // get all products
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i];
    const menuProducts = await prisma.product.findMany({
      where: {
        menu: Number(menu.id),
      },
      include: {
        pictures: true,
        promotion: true,
        colors: true,
        height: true,
      },
    });
    products = [...products, ...menuProducts];
  }

  if (products.length === 0) {
    return new NextResponse(JSON.stringify([]));
  }

  return new NextResponse(JSON.stringify(products));
}