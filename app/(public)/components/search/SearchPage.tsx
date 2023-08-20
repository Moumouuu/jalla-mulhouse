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
import { italiana, julius } from "@/utils/font";
import { Product } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ProductCard from "../ProductCard";

export default function SearchPage() {
  //var
  const searchParams = useSearchParams();
  const menuId = searchParams?.get("q");
  const [products, setProducts] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [menuName, setMenuName] = useState<string>("");

  //fetch
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const res = await fetch("api/products/search", {
        method: "POST",
        body: JSON.stringify({ menuId }),
      }).then((res) => res.json());
      const data = await res;
      setProducts(data.products);
      setMenuName(data.menu.name);
      setLoading(false);
    };
    getProducts();
    fetchMenu();
  }, [menuId]);

  //functions

  const fetchMenu = useCallback(async () => {
    const res = await fetch(`/api/menu?id=${menuId}`, {
      method: "GET",
    });
    const data = await res.json();
    setMenuName(data.name);
  }, [menuId]);

  const orderProduct = (e: any) => {
    switch (e) {
      case "1":
        //order ASC price
        setProducts(
          products.sort((a: any, b: any) => {
            return a.height[0].price - b.height[0].price;
          })
        );
        break;
      case "2":
        //order DESC price
        setProducts(
          products.sort((a: any, b: any) => {
            return b.height[0].price - a.height[0].price;
          })
        );
        break;
      case "3":
        //order DESC date
        setProducts(
          products.sort((a: any, b: any) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          })
        );
        break;
      default:
        break;
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col mx-2 lg:mx-5 text-white">
      <div className="flex  justify-between">
        <div className="flex flex-col">
          <h3
            className={
              italiana.className + " text-xl lg:text-3xl text-white uppercase"
            }
          >
            {menuName}
          </h3>
          <span
            className={julius.className + " text-sm lg:text-md text-gray-500 "}
          >
            {products.length} résultats
          </span>
        </div>
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

      {products.length === 0 && (
        <span
          className={
            julius.className +
            " text-2xl text-gray-500 text-center py-4 lg:pt-8"
          }
        >
          Aucun résultat
        </span>
      )}

      <div className="text-black grid justify-items-center my-5 lg:my-8 gap-3 md:gap-5 lg:gap-10 grid-cols-1 md:grid-cols-3 ">
        {products.length > 0 &&
          products.map((product: Product, index: any) => (
            <ProductCard itemProduct={product} key={index} />
          ))}
      </div>
    </div>
  );
}
