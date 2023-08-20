"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { italiana, julius } from "@/utils/font";
import { useCallback, useEffect, useMemo, useState } from "react";
import CarouselSlider from "../home/CarouselSlider";

interface ProductPageProps {
  item: any;
}

export default function ProductPage({ item }: ProductPageProps) {
  const [heightSelected, setHeightSelected] = useState<string>("");
  const [product, setProduct] = useState<any>(item[0]);
  const [menu, setMenu] = useState<any>("");

  const promoAlreadyAvailable = () => {
    const currentDate = new Date();
    const startDate = new Date(product.promotion?.launchDay);
    const endDate = new Date(product.promotion?.endDay);

    if (currentDate > startDate && currentDate < endDate) {
      return;
    }
    setProduct((prev: any) => {
      return {
        ...prev,
        promotion: null,
      };
    });
  };

  const fetchMenu = useCallback(async () => {
    const res = await fetch(`/api/menu?id=${product.menu}`, {
      method: "GET",
    });
    const data = await res.json();
    setMenu(data.name);
  }, [product.menu]);

  useEffect(() => {
    promoAlreadyAvailable();
    fetchMenu();
  }, []);

  const calculatePromotion = useMemo(() => {
    const height = product?.height?.find(
      (height: any) => height.id === heightSelected
    );

    if (height && product.promotion) {
      return height.price - (height.price * product?.promotion?.discount) / 100;
    }
    return product.height[0].price;
  }, [heightSelected, product]);

  const priceByHeight = useCallback(() => {
    const height = product.height?.find(
      (height: any) => height.id === heightSelected
    );

    if (height) {
      return height.price;
    }
    return product.height[0].price;
  }, [heightSelected, product]);

  return (
    <div className="flex justify-center mt-5 lg:mt-8">
      <div className="w-full lg:w-[90%] text-white flex flex-col">
        <div className="flex lg:flex-row flex-col">
          <div className="mr-10 w-full lg:w-[60%] ">
            <CarouselSlider
              images={product.pictures}
              showArrows={true}
              autoPlay={true}
              infiniteLoop={true}
              showIndicators={true}
              showStatus={true}
              showThumbs={false}
            />
          </div>
          <div className="flex flex-col my-8">
            <h4
              className={italiana.className + " text-4xl lg:text-4xl uppercase"}
            >
              {product.title}
            </h4>
            <span
              className={julius.className + " text-lg lg:text-md text-gray-500"}
            >
              {menu}
            </span>

            <div className="flex flex-col my-6">
              <span className={julius.className + " text-xl lg:text-2xl"}>
                {product.colors?.length} couleurs disponibles
              </span>
              <div className="w-full flex overflow-x-scroll mt-2">
                {product.colors?.map((color: any, index: any) => (
                  <input type="color" key={index} value={color.hex} disabled />
                ))}
              </div>
            </div>

            <div className="flex flex-col my-6 ">
              <span className={julius.className + " mb-2 text-xl lg:text-2xl"}>
                Tailles disponibles
              </span>
              <Select onValueChange={(e) => setHeightSelected(e)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Choisis une taille" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {product.height?.map((height: any, index: any) => (
                      <SelectItem key={index} value={height.id}>
                        {height.height}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <span
              className={
                italiana.className +
                (product.promotion ? " line-through" : " " + " text-3xl")
              }
            >
              {product.promotion && priceByHeight()}€
            </span>
            {product.promotion && (
              <span className={italiana.className + " text-3xl"}>
                {calculatePromotion} €
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col mt-3 lg:mt-10 mb-4 lg:mb-6">
          <h3 className={italiana.className + " text-2xl lg:text-3xl mb-3"}>
            Description du produit
          </h3>
          <p className={julius.className + " text-lg"}>{product.description}</p>
        </div>
      </div>
    </div>
  );
}
