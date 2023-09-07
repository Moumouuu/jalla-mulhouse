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
      const res = await fetch("/api/general", {
        method: "GET",
      });
      const general = await res.json();
      setGeneral(general);
      setIsLoading(false);
    };
    getGeneral();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-[95%] lg:w-[90%] xl:w-[80%]">
        <CarouselSlider images={general?.carrousel} />
      </div>
    </div>
  );
}
