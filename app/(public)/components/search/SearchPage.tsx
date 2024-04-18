"use client";

import Loader from "@/components/ui/loader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { italiana } from "@/utils/font";
import { Product } from "@prisma/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ProductCard from "../ProductCard";

export default function SearchPage() {
  //var
  const searchParams = useSearchParams();
  const firstMenuId = searchParams?.get("menu");
  const submenuId = searchParams?.get("submenu");
  const termenuId = searchParams?.get("termenu");

  const menuId = termenuId || submenuId || firstMenuId;

  const isFistMenu = !!firstMenuId;
  const isSubmenu = !!submenuId;
  const isTerMenu = !!termenuId;

  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [menuName, setMenuName] = useState<string>("");
  const [urlVideo, setUrlVideo] = useState<string>("");
  const [urlCatalog, setUrlCatalog] = useState<string>("");

  //fetch
  useEffect(() => {
    fetchMenu();
  }, [menuId]);

  //functions

  const fetchMenu = useCallback(async () => {
    setLoading(true);
    let category;
    if (isFistMenu) category = "menus";
    if (isSubmenu) category = "sub-menus";
    if (isTerMenu) category = "ter-menus";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${category}/${menuId}?populate=*deep`,
      {
        method: "GET",
      }
    );

    const { data } = await res.json();

    setMenuName(data.attributes.name);

    if (isFistMenu) {
      setUrlVideo(data.attributes.urlVideo);
      setUrlCatalog(data.attributes.urlCatalog);
    }

    // depend of the category we fetch the products
    if (isFistMenu) {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/products?populate=*&filters[menu][id][$eq]=${Number(menuId)}`,
        {
          method: "GET",
        }
      );

      const { data } = await res.json();
      setProducts(data);
    }
    if (isSubmenu) {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/products?populate=*&filters[sub_menu][id][$eq]=${Number(menuId)}`,
        {
          method: "GET",
        }
      );

      const { data } = await res.json();
      setProducts(data);
    }
    if (isTerMenu) {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/products?populate=*&filters[ter_menu][id][$eq]=${Number(menuId)}`,
        {
          method: "GET",
        }
      );

      const { data } = await res.json();
      setProducts(data);
    }

    setLoading(false);
    // set
  }, [menuId]);

  const orderProduct = (e: any) => {
    switch (e) {
      case "1":
        //order ASC price
        setProducts([
          ...products.sort(
            (a: any, b: any) => a.height[0].price - b.height[0].price
          ),
        ]);
        break;
      case "2":
        //order DESC price
        setProducts([
          ...products.sort(
            (a: any, b: any) => b.height[0].price - a.height[0].price
          ),
        ]);
        break;
      case "3":
        //order DESC date
        setProducts([...products.sort((a: any, b: any) => b.id - a.id)]);
        break;
      default:
        break;
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col mx-2 lg:mx-5 text-white">
      <div className="flex justify-center w-full relative">
        <h3
          className={
            italiana.className + " text-xl lg:text-3xl text-white uppercase"
          }
        >
          {menuName}
        </h3>
        <div className="absolute top-10  md:right-5 md:top-0">
          <Select onValueChange={(e) => orderProduct(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trier" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">Prix ASC</SelectItem>
                <SelectItem value="2">Prix DESC</SelectItem>
                <SelectItem value="3">Date d&apos;ajout</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="text-black grid justify-items-center my-5 lg:my-8 gap-3 md:gap-5 lg:gap-10 grid-cols-1 md:grid-cols-3 ">
        {products.length > 0 &&
          products.map((product: Product) => (
            <ProductCard itemProduct={product} key={product.id} />
          ))}
      </div>

      <div className="w-full flex flex-col mt-10 md:mt-0 lg:flex-row justify-around">
        {urlVideo && (
          <div className="flex-col">
            <h3
              className={
                italiana.className + " text-xl lg:text-3xl text-white uppercase"
              }
            >
              Vidéo de présentation
            </h3>
            <iframe
              className="w-full md:w-[800px]"
              width="100%"
              height="315"
              src={urlVideo}
              title="YouTube video player"
              // @ts-ignore
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        )}

        {urlCatalog && (
          <div className="flex-col mt-5 md:mt-0">
            <h3
              className={
                italiana.className + " text-xl lg:text-3xl text-white uppercase"
              }
            >
              Catalogue
            </h3>
            <Link
              target="_blank"
              href={urlCatalog}
              className="underline text-blue-400"
            >
              Voir le catalogue
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
