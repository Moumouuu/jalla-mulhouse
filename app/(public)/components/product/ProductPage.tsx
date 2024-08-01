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
import { Remarkable } from "remarkable";
import CarouselSlider from "../home/CarouselSlider";
interface ProductPageProps {
  item: any;
}

export default function ProductPage({ item }: ProductPageProps) {
  const [heightSelected, setHeightSelected] = useState<string>("");
  const [product] = useState<any>(item);
  var md = new Remarkable("full", {
    html: true,
  });
  const htmlDescription = md.render(product?.attributes?.description);

  //  inject html desc in the dom with the id description
  useEffect(() => {
    document
      .getElementById("description")
      ?.insertAdjacentHTML("beforeend", htmlDescription);
  }, [product]);

  const promoAlreadyAvailable = () => {
    const currentDate = new Date();
    const startDate = new Date(
      item.attributes.promotion.data?.attributes?.launchDay
    );
    const endDate = new Date(
      item.attributes.promotion.data?.attributes?.endDay
    );

    // already available
    if (currentDate > startDate && currentDate < endDate) {
      return;
    }
  };

  const calculatePromotion = useMemo(() => {
    const height = product?.attributes?.heights?.data?.find(
      (height: any) => height.id === heightSelected
    );

    if (height && product.attributes.promotion.data) {
      return (
        height.attributes?.price -
        (height.attributes?.price *
          product.attributes?.promotion.data.attributes?.discount) /
          100
      );
    }
    return product?.attributes?.heights?.data[0]?.attributes?.price;
  }, [heightSelected, product]);

  const priceByHeight = useCallback(() => {
    const height = product.attributes.heights?.data?.find(
      (height: any) => height.id === heightSelected
    );

    if (height) {
      return height.attributes?.price;
    }
    return product.attributes.heights?.data[0]?.attributes?.price;
  }, [heightSelected, product]);

  return (
    <div className="flex justify-center mt-5 lg:mt-8">
      <div className="w-full lg:w-[90%] text-white flex flex-col">
        <div className="flex lg:flex-row flex-col">
          <div className="mr-10 w-full lg:w-[60%]">
            <CarouselSlider
              images={product?.attributes.images.data}
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
              {product?.attributes.title}
            </h4>

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
                    {product.attributes.heights?.data?.map(
                      (height: any, index: any) => (
                        <SelectItem key={index} value={height.id}>
                          {height.attributes.height}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <span
              className={
                italiana.className +
                (product.attributes.promotion.data
                  ? " line-through"
                  : " " + " text-3xl")
              }
            >
              {priceByHeight()} €
            </span>
            {product.attributes.promotion.data && (
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
          <div id="description" className={"text-lg whitespace-pre-line"}></div>
        </div>
      </div>
    </div>
  );
}
