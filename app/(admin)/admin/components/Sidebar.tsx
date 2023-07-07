"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const path = usePathname();
  const items = [
    {
      name: "Général",
      path: "/admin/general",
      isActive: path == "/admin/general",
    },
    {
      name: "Produits",
      path: "/admin/products",
      isActive: path == "/admin/products",
    },
    {
      name: "Menus",
      path: "/admin/menus",
      isActive: path == "/admin/menus",
    },
  ];
  return (
    <div className="w-1/6 min-w-[100px]">
      <div className="flex flex-col">
        {items.map((item) => (
          <Link
            href={item.path}
            key={item.name}
            className={
              `my-2 p-2 w-full text-md md:text-lg rounded-lg ` +
              (item.isActive ? "bg-[#323232]/40" : "")
            }
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
