"use client";

import { italiana } from "@/utils/font";
import ProductCard from "../ProductCard";

interface ItemsSliderProps {
  label: string;
  items: any;
}

export default function ItemsSlider({ label, items }: ItemsSliderProps) {
  if (items.data?.length === 0) {
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
        {items.data?.map((item: any, index: any) => (
          <ProductCard key={index} itemProduct={item} />
        ))}
      </div>
    </>
  );
}
