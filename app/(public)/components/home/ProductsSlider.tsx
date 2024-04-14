"use client";
import { useEffect, useState } from "react";
import ItemsSlider from "./ItemsSlider";

export default function ProductsSlider() {
  const [newItems, setNewItems] = useState<any>([]);
  const [selectedItems, setSelectedItems] = useState<any>([]);

  useEffect(() => {
    fetchNewItems();
    fetchSelectedItems();
  }, []);

  const fetchNewItems = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?populate=deep&sort[0]=createdAt:asc&filters[new][$eq]=true`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const items = await res.json();
    setNewItems(items);
    console.log(items);
  };

  const fetchSelectedItems = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?populate=deep&sort[0]=createdAt:asc&filters[selected][$eq]=true`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const items = await res.json();
    setSelectedItems(items);
  };

  return (
    <>
      <ItemsSlider items={newItems} label="Nouveautés" />
      <ItemsSlider items={selectedItems} label="Ma sélection" />
    </>
  );
}
