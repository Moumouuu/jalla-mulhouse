"use client";

import { italiana } from "@/utils/font";
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";

interface ItemsSliderProps {
  label: string;
  newItems?: boolean;
  selectedItems?: boolean;
}

export default function ItemsSlider({
  label,
  newItems,
  selectedItems,
}: ItemsSliderProps) {
  const [products, setProducts] = useState<any>([]);

  const getNewItems = async () => {
    const res = await fetch("/api/products/new", {
      method: "GET",
    });
    const items = await res.json();
    setProducts(items.res);
    console.log(items)
  };

  const getSelectedItems = async () => {
    const res = await fetch("/api/products/selected", {
      method: "GET",
    });
    const items = await res.json();
    setProducts(items.res);
    console.log(items)
  };

  useEffect(() => {
    if (newItems) {
      getNewItems();
    }
    if (selectedItems) {
      getSelectedItems();
    }
  }, []);

  if (products.length === 0) {
    return null;
  }

  return (
    <>
      <h2
        className={
          italiana.className +
          " text-xl lg:text-3xl text-center text-white mt-20 lg:mt-40 mb-10 "
        }
      >
        {label}
      </h2>
      <div className="w-full grid grid-flow-col gap-4 lg:gap-6 overflow-x-auto mx-2 lg:mx-6">
        {products?.map((item: any, index: any) => (
          <ProductCard key={index} itemProduct={item} />
        ))}
      </div>
    </>
  );
}
