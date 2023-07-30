"use client";

import { italiana } from "@/utils/font";
import { Product } from "@prisma/client";
import ProductCard from "../ProductCard";

interface ItemsSliderProps {
  items: Product[];
  label: string;
}

export default function ItemsSlider({ items, label }: ItemsSliderProps) {
  if (items.length === 0) {
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
      <div className="w-full grid  grid-flow-col gap-4 lg:gap-6 overflow-x-auto mx-2 lg:mx-6">
        {items?.map((item: any, index: any) => (
          <ProductCard key={index} item={item} />
        ))}
      </div>
    </>
  );
}
