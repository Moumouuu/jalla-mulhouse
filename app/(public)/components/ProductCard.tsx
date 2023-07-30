"use client";
import { italiana, julius } from "@/utils/font";
import Link from "next/link";
import { useEffect } from "react";

interface ItemProps {
  item: any;
}

export default function ProductCard({ item }: ItemProps) {
  const calculatePromotion = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  const promoAlreadyAvailable = () => {
    const currentDate = new Date();
    const startDate = new Date(item.promotion?.startDate);
    const endDate = new Date(item.promotion?.endDate);

    if (currentDate >= startDate && currentDate <= endDate) {
      return;
    }
    item.promotion = null;
  };

  useEffect(() => {
    promoAlreadyAvailable();
  }, []);

  console.log(item);

  return (
    <Link
      href={`/product/${item.id}`}
      className="pointer flex flex-col bg-white rounded-lg items-center justify-center p-2"
    >
      <div className="h-full w-full flex justify-center">
        <img
          src={item.pictures[0]?.binary}
          alt="Item"
          className="object-cover"
        />
      </div>
      <div className="flex w-full p-2 m-2 justify-between">
        <div className="flex flex-col ">
          <p className={julius.className + " mb-3"}>
            {item.title.substr(0, 10)}...
          </p>
          <div className="flex">
            {item.new ? (
              <div
                className={
                  italiana.className +
                  " px-2 lg:px-4 bg-black text-sm lg:text-lg  text-white rounded-xl mr-2 uppercase"
                }
              >
                New
              </div>
            ) : null}
            {item.promotion ? (
              <div
                className={
                  italiana.className +
                  " px-2 lg:px-4 text-sm lg:text-lg bg-black text-white rounded-xl"
                }
              >
                -{item.promotion.discount}%
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col">
          <p
            className={
              italiana.className + (item.promotion ? " line-through" : " ")
            }
          >
            {item.height[0]?.price}€
          </p>
          {item.promotion && (
            <p className={italiana.className}>
              {calculatePromotion(
                item.height[0]?.price,
                item.promotion.discount
              )}
              €
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
