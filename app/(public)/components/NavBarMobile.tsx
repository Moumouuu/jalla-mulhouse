"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { italiana } from "@/utils/font";
import { Menu } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

interface NavBarProps {
  menus: Menu[];
  products: any;
}

export default function NavBarMobile({ menus, products }: NavBarProps) {
  const [search, setSearch] = useState<string>("");
  const filteredProducts = products.filter((product: any) => {
    return product.title.toLowerCase().includes(search.toLowerCase());
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
  return (
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
            <SheetHeader>
              <SheetTitle>
                <Image
                  src="/assets/images/jalla-logo.png"
                  width={150}
                  height={150}
                  alt="Logo jalla"
                />
              </SheetTitle>
              <SheetDescription>
                <div className="flex flex-col text-black text-left ">
                  {menus?.map((menu: any, index: any) => (
                    <>
                      <Link
                        key={index}
                        href={"/search?q=" + menu.name}
                        className={"my-3 w-full bg-black/10"}
                      >
                        <p className="text-xl uppercase text-center">
                          {menu.name}
                        </p>
                      </Link>
                      {menu.subMenu?.map((subMenu: any, index: any) => (
                        <>
                          <Link
                            key={index}
                            href={"/search?q=" + subMenu.name}
                            className={"my-2"}
                          >
                            <p className="text-lg uppercase underline underline-offset-2">
                              {subMenu.name}
                            </p>
                          </Link>
                          {subMenu.terMenu?.map((terMenu: any, index: any) => (
                            <Link
                              key={index}
                              href={"/search?q=" + terMenu.name}
                              className={"my-2"}
                            >
                              <p className="text-lg text-gray-700 ml-4">
                                {terMenu.name}
                              </p>
                            </Link>
                          ))}
                        </>
                      ))}
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
          </SheetContent>
        </Sheet>

        <div className="flex items-center ">
          <Image
            src="/assets/images/jalla-logo.png"
            width={80}
            height={80}
            alt="Logo jalla"
          />
        </div>
      </div>

      <div className="flex items-center relative">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-transparent px-5 py-2 text-md ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 my-2 text-black"
          placeholder="Rechercher un produit"
        />
        {search.length > 0 && (
          <div className="bg-white absolute top-12 border min-w-full z-10">
            {filteredProducts?.map((product: any, index: any) => (
              <Link href={`/product/${product.id}`} key={index}>
                <div className="flex flex-row items-center justify-between w-full p-2 hover:bg-gray-200">
                  <div className="flex flex-row items-center">
                    <Image
                      width={60}
                      height={60}
                      src={product?.pictures[0]?.binary}
                      alt="Item"
                      className="object-cover rounded"
                    />
                    <p className="mx-2 text-black">{product.title.substr(0, 15)}...</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
