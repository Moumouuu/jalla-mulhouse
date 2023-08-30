"use client";

import { italiana } from "@/utils/font";
import ProductCard from "../ProductCard";

interface MoreProductProps {
  purposeProduct: any;
}

export default function MoreProduct({ purposeProduct }: MoreProductProps) {
  const productListFiltered = purposeProduct?.filter(
    (product: any) => product.visible
  );
  if (productListFiltered.length === 0) {
    return (
      <div className="flex justify-center mt-6 lg:mt-10">
        <div className="flex w-full lg:w-[90%]">
          <h3
            className={italiana.className + " text-xl lg:text-3xl text-white"}
          >
            Aucun produit trouvé pour cette catégorie.
          </h3>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center mt-6 lg:mt-10">
      <div className="flex flex-col w-full lg:w-[90%]">
        <h3
          className={
            italiana.className + " text-xl lg:text-3xl text-white mb-4"
          }
        >
          Ces produits pourraient vous intéresser
        </h3>
        <div className="w-full grid grid-flow-col gap-4 lg:gap-6 overflow-x-auto">
          {productListFiltered?.splice(0, 5).map((product: any, index: any) => (
            <ProductCard key={index} itemProduct={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
