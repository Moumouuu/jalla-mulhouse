"use client";

import Loader from "@/components/ui/loader";
import { useEffect, useState } from "react";
import CarouselSlider from "./CarouselSlider";

export default function Carousel() {
  const [general, setGeneral] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getGeneral = async () => {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/general-information?populate=*`,
        {
          method: "GET",
        }
      );
      const { data } = await res.json();

      setGeneral(data.attributes.images.data);
      setIsLoading(false);
    };
    getGeneral();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="flex justify-center">
      <div className="w-full ">
        <CarouselSlider images={general} />
      </div>
    </div>
  );
}
