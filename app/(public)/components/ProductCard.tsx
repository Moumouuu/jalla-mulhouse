"use client";
import { italiana, julius } from "@/utils/font";
import Image from "next/image";
import Link from "next/link";

interface ItemProps {
  item: any;
}

export default function ProductCard({ item }: ItemProps) {
  const calculatePromotion = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  return (
    <Link href={`/product/${item.id}`} className="pointer flex flex-col bg-white rounded-lg items-center justify-center p-2">
      <div className="">
        <Image
          src={item.pictures[0]?.binary}
          width={200}
          height={200}
          alt="Item"
        />
      </div>
      <div className="flex w-full p-2 m-2 justify-between">
        <div className="flex flex-col ">
          <p className={julius.className + " mb-3"}>{item.title}</p>
          <div className="flex">
            {item.new ? (
              <div
                className={
                  italiana.className +
                  " px-4 bg-black  text-white rounded-xl mr-2 uppercase"
                }
              >
                New
              </div>
            ) : null}
            {item.promotion ? (
              <div
                className={
                  italiana.className + " px-4 bg-black text-white rounded-xl"
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
              italiana.className + item.promotion ? "line-through" : ""
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
