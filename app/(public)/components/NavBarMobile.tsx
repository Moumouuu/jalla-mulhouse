"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { italiana } from "@/utils/font";
import { Menu } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

export default function NavBarMobile() {
  const [search, setSearch] = useState<string>("");
  const [promoteMessage, setPromoteMessage] = useState<any>("");
  const [menus, setMenusList] = useState<Menu[]>([]);
  const [products, setProducts] = useState<any>([]);

  const filteredProducts = products?.filter((product: any) => {
    // filtered with search & if product is visible
    return product.attributes.title
      .toLowerCase()
      .includes(search.toLowerCase());
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

  useEffect(() => {
    getPromoteMessage();
    getMenus();
    getProducts();
  }, []);

  const getPromoteMessage = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/general-information`,
      {
        method: "GET",
      }
    );
    const { data } = await res.json();

    if (!data) {
      return;
    }

    setPromoteMessage(data?.attributes.promoteMessage);
  };

  const getMenus = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/menus?populate=deep`,
      {
        method: "GET",
      }
    );
    const { data } = await res.json();

    setMenusList(data);
  };

  const getProducts = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?populate=images`,
      {
        method: "GET",
      }
    );
    const { data } = await res.json();
    setProducts(data);
  };

  return (
    <>
      {promoteMessage && (
        <div className="w-full bg-white text-center p-2 text-xl border-b-2 overflow-x-hidden">
          <p className={cn(italiana.className)}>{promoteMessage}</p>
        </div>
      )}
      <div
        className={
          "flex text-white bg-white p-3 w-full items-center justify-between overflow-y-scroll" +
          italiana.className
        }
      >
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger className="m-4">
              <FiMenu size={30} color="black" />
            </SheetTrigger>
            <SheetContent side={"left"}>
              <ScrollArea className="h-full w-full">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={"/"}>
                      <Image
                        src="/assets/images/jalla-logo.png"
                        width={150}
                        height={150}
                        alt="Logo jalla"
                      />
                    </Link>
                  </SheetTitle>
                  <SheetDescription>
                    <div className="flex flex-col text-black text-left ">
                      {menus?.map((menu: any, index: any) => (
                        <>
                          <Link
                            key={index}
                            href={"/search?menu=" + menu.id}
                            className={"my-3 w-full bg-black/10"}
                          >
                            <p className="text-xl uppercase text-center">
                              {menu.attributes.name}
                            </p>
                          </Link>
                          {menu.attributes.childs_menus.data?.map(
                            (subMenu: any, index: any) => (
                              <>
                                <Link
                                  key={index}
                                  href={"/search?submenu=" + subMenu.id}
                                  className={"my-2"}
                                >
                                  <p className="text-lg uppercase underline underline-offset-2">
                                    {subMenu.attributes.name}
                                  </p>
                                </Link>
                                {subMenu.attributes.childs_menus.data?.map(
                                  (terMenu: any, index: any) => (
                                    <Link
                                      key={index}
                                      href={"/search?q=" + terMenu.id}
                                      className={"my-2"}
                                    >
                                      <p className="text-lg text-gray-700 ml-4">
                                        {terMenu.attributes.name}
                                      </p>
                                    </Link>
                                  )
                                )}
                              </>
                            )
                          )}
                        </>
                      ))}
                    </div>

                    <div className="flex items-center mt-10">
                      {socialNetworks.map((socialNetwork, index: any) => (
                        <>
                          <Link
                            key={index}
                            href={socialNetwork.url}
                            target="_blank"
                            className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 mx-2"
                          >
                            {socialNetwork.icons}
                          </Link>
                        </>
                      ))}
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </ScrollArea>
            </SheetContent>
          </Sheet>

          <div className="flex items-center ">
            <Link href={"/"}>
              <Image
                src="/assets/images/jalla-logo.png"
                width={80}
                height={80}
                alt="Logo jalla"
              />
            </Link>
          </div>
        </div>
        <div className="flex items-center relative">
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="flex h-10 w-full rounded-md border border-input bg-transparent px-5 py-2 text-md ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 my-2 text-black"
            placeholder="Rechercher un produit"
          />
          {search.length > 0 && (
            <div className="bg-white absolute top-12 border min-w-full z-10">
              {filteredProducts
                ?.slice(0, 5)
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
                          src={
                            product?.attributes.images.data[0].attributes.url
                          }
                          alt="Item"
                          className="object-cover rounded"
                        />
                        <p className="mx-2 text-black">
                          {product?.attributes.title.substr(0, 15)}...
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
