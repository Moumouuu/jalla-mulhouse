"use client";
import { italiana, julius } from "@/utils/font";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ItemProps {
  itemProduct: any;
}

export default function ProductCard({ itemProduct }: ItemProps) {
  const [item, setItem] = useState<any>(itemProduct);
  const calculatePromotion = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  const promoAlreadyAvailable = () => {
    const currentDate = new Date();
    const startDate = new Date(
      item.attributes.promotion.data?.attributes?.launchDay
    );
    const endDate = new Date(item.attributes.promotion.data?.attributes?.endDay);

    // already available
    if (currentDate > startDate && currentDate < endDate) {
      return;
    }

    setItem((prev: any) => {
      return {
        ...prev,
        promotion: null,
      };
    });
  };

  useEffect(() => {
    promoAlreadyAvailable();
  }, []);


  return (
    <Link
      href={`/product/${item.id}`}
      className="pointer flex flex-col bg-white rounded-lg items-center justify-center p-2 w-[200px] lg:w-[300px]"
    >
      <div className="h-full w-full flex justify-center">
        <img
          src={
            process.env.NEXT_PUBLIC_API_IMAGE_URL +
            item.attributes.images.data[0]?.attributes?.url
          }
          alt="Item"
          className="object-cover"
        />
      </div>
      <div className="flex w-full p-2 m-2 justify-between">
        <div className="flex flex-col ">
          <p className={julius.className + " mb-3"}>
            {item.attributes.title.substr(0, 20)}...
          </p>
          <div className="flex">
            {item.attributes.new ? (
              <div
                className={
                  italiana.className +
                  " px-2 lg:px-4 bg-black text-sm lg:text-lg  text-white rounded-xl mr-2 uppercase"
                }
              >
                New
              </div>
            ) : null}
            {item.attributes.promotion.data ? (
              <div
                className={
                  italiana.className +
                  " px-2 lg:px-4 text-sm lg:text-lg bg-black text-white rounded-xl"
                }
              >
                -{item.attributes.promotion.data?.attributes.discount}%
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col">
          <p
            className={
              italiana.className +
              (item.attributes.promotion.data ? ` line-through` : " ")
            }
          >
            {item.attributes.heights.data[0]?.attributes?.price}€
          </p>
          {item.attributes.promotion.data && (
            <p className={italiana.className}>
              {calculatePromotion(
                item.attributes.heights.data[0]?.attributes?.price,
                item.attributes.promotion.data?.attributes.discount
              )}
              €
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
