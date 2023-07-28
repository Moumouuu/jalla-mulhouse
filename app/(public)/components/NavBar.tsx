"use client";
import { italiana } from "@/utils/font";
import { Menu } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { PiMagnifyingGlassLight } from "react-icons/pi";

interface NavBarProps {
  menus: Menu[];
}

export default function NavBar({ menus }: NavBarProps) {
  const [menusList, setMenusList] = useState<Menu[]>(menus);

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

  return (
    <div className={`bg-white p-3 w-[100vw] ` + italiana.className}>
      <div className="flex items-start justify-between">
        <Image
          src="/assets/images/jalla-logo.png"
          width={200}
          height={200}
          alt="Logo jalla"
        />
        <div className="flex flex-col items-center">
          <div className="relative">
            <input
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-5 py-2 text-md ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 my-2 text-black"
              placeholder="Rechercher un produit"
            />
            <div className="absolute top-[50%] right-1 -translate-y-[50%]">
              <PiMagnifyingGlassLight size={20} />
            </div>
          </div>
          <div className="flex ">
            {menusList?.map((menu: any, index) => (
              <div
                className={"flex flex-col items-center"}
                key={index}
                onMouseEnter={() => setHover(menu, true)}
                onMouseLeave={() => setHover(menu, false)}
              >
                <Link
                  href={"/search?q=" + menu.name}
                  className={
                    menu.hover
                      ? "underline underline-offset-2 " + "m-4 text-xl "
                      : "" + "m-4 text-xl "
                  }
                >
                  <p className="text-xl">{menu.name}</p>
                </Link>
                <div className="flex flex-row">
                  {menu.hover &&
                    menu.subMenu?.map((subMenu: any, index: any) => (
                      <div key={index} className="flex flex-col items-center">
                        <Link
                          key={index}
                          href={"/search?q=" + subMenu.name}
                          className="mx-3 font-medium "
                        >
                          <p className="text-lg font-bold ">{subMenu.name}</p>
                        </Link>
                        {subMenu.terMenu?.map((terMenu: any, index: any) => (
                          <>
                            <Link
                              key={index}
                              href={"/search?q=" + terMenu.name}
                              className="m-1 font-medium "
                            >
                              <p className="text-lg text-gray-700">
                                {terMenu.name}
                              </p>
                            </Link>
                          </>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          {socialNetworks.map((socialNetwork, index) => (
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
      </div>
    </div>
  );
}
