"use client";
import { cn } from "@/lib/utils";
import { italiana } from "@/utils/font";
import { Menu } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { PiMagnifyingGlassLight } from "react-icons/pi";

export default function NavBar() {
  const [menusList, setMenusList] = useState<Menu[]>([]);
  const [search, setSearch] = useState<string>("");
  const [promoteMessage, setPromoteMessage] = useState<any>("");
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    getMenus();
    getProducts();
  }, []);

  const getMenus = async () => {
    const res = await fetch("/api/menu/all", {
      method: "GET",
    });
    const menus = await res.json();
    setMenusList(menus);
  };

  const getProducts = async () => {
    const res = await fetch("/api/products/search", {
      method: "GET",
    });
    const products = await res.json();
    setProducts(products);
  };

  const filteredProducts = products.filter((product: any) => {
    // filtered with search & if product is visible
    return (
      product.title.toLowerCase().includes(search.toLowerCase()) &&
      product.visible
    );
  });

  const socialNetworks = [
    {
      url: "https://www.facebook.com/jallamulhouse",
      icons: <FaFacebookF size={20} />,
    },
    {
      url: "https://www.instagram.com/jallamulhouse/",
      icons: <FaInstagram size={20} />,
    },
    {
      url: "mailto:mbmulhouse@free.fr",
      icons: <AiOutlineMail size={20} />,
    },
  ];

  const setHover = (menu: any, value: any) => {
    const newMenu = menusList.map((m) => {
      if (m.name === menu.name) {
        return { ...m, hover: value };
      } else {
        return { ...m, hover: false };
      }
    });
    setMenusList(newMenu);
  };

  useEffect(() => {
    const getPromoteMessage = async () => {
      const res = await fetch("/api/general", {
        method: "GET",
      });
      const general = await res.json();

      if (!general) {
        return;
      }

      setPromoteMessage(general?.promoteMessage);
    };
    getPromoteMessage();
  }, []);

  return (
    <>
      {promoteMessage && (
        <div className="w-full bg-white p-2 text-2xl border-b-2 overflow-x-hidden">
          <p
            className={cn(
              italiana.className,
              "animate-banner-slide whitespace-nowrap"
            )}
          >
            {promoteMessage}
          </p>
        </div>
      )}
      <div className={`bg-white p-3 w-[100vw] ` + italiana.className}>
        <div className="flex items-start justify-between">
          <Link href={"/"}>
            <Image
              src="/assets/images/jalla-logo.png"
              width={200}
              height={200}
              alt="Logo jalla"
            />
          </Link>
          <div className="flex flex-col items-center w-full">
            <div className="relative">
              <input
                onChange={(e) => setSearch(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-5 py-2 text-md ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 my-2 text-black"
                placeholder="Rechercher un produit"
              />
              <div className="absolute top-[50%] right-1 -translate-y-[50%]">
                <PiMagnifyingGlassLight size={20} />
              </div>
              {search.length > 0 && (
                <div className="bg-white absolute top-12 border min-w-full z-10">
                  {filteredProducts
                    ?.splice(0, 5)
                    ?.map((product: any, index: any) => (
                      <Link
                        href={`/product/${product.id}`}
                        key={index}
                        onClick={() => setSearch("")}
                      >
                        <div className="flex flex-row items-center justify-between w-full p-2 hover:bg-gray-200">
                          <div className="flex flex-row items-center">
                            <Image
                              width={60}
                              height={60}
                              src={product?.pictures[0]?.binary}
                              alt="Item"
                              className="object-cover rounded"
                            />
                            <p className="mx-2">
                              {product.title.substr(0, 15)}...
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              )}
            </div>

            <div className="flex w-full justify-around">
              {menusList?.map((menu: any, index) => (
                <div
                  className={"flex flex-col items-center relative"}
                  key={index}
                  onMouseEnter={() => setHover(menu, true)}
                  onMouseLeave={() => setHover(menu, false)}
                >
                  <Link
                    href={"/search?q=" + menu.id}
                    className={
                      menu.hover
                        ? "underline underline-offset-2 " + "m-4 text-xl "
                        : "" + "m-4 text-xl "
                    }
                  >
                    <p className="text-xl">{menu.name}</p>
                  </Link>
                  <div className="absolute top-14 z-50">
                    <div className="w-[200vw] bg-white flex flex-row justify-center">
                      {menu.hover &&
                        menu.subMenu?.map((subMenu: any, index: any) => (
                          <div
                            key={index}
                            className="flex flex-col items-center"
                          >
                            <Link
                              key={index}
                              href={"/search?q=" + subMenu.id}
                              className="mx-3 font-medium"
                            >
                              <p className="text-lg font-bold ">
                                {subMenu.name}
                              </p>
                            </Link>
                            {subMenu.terMenu?.map(
                              (terMenu: any, index: any) => (
                                <Link
                                  key={index}
                                  href={"/search?q=" + terMenu.id}
                                  className="m-1 font-medium "
                                >
                                  <p className="text-lg text-gray-700">
                                    {terMenu.name}
                                  </p>
                                </Link>
                              )
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            {socialNetworks.map((socialNetwork, index) => (
              <Link
                key={index}
                href={socialNetwork.url}
                target="_blank"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 mx-2"
              >
                {socialNetwork.icons}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
