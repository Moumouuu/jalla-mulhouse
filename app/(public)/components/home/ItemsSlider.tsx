"use client";

import { italiana } from "@/utils/font";
import { Product } from "@prisma/client";
import ProductCard from "../ProductCard";

interface ItemsSliderProps {
  items: Product[];
  label: string;
}

export default function ItemsSlider({ items, label }: ItemsSliderProps) {
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
      <div className="text-black w-full mx-1 lg:mx-4 grid align-middle gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-x-scroll">
        {items?.map((item: any, index: any) => (
          <ProductCard key={index} item={item} />
        ))}
      </div>
    </>
  );
}
