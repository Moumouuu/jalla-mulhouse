"use client";

import { useEffect, useState } from "react";
import CarouselSlider from "./CarouselSlider";

export default function Carousel() {
  const [general, setGeneral] = useState<any>(null);

  useEffect(() => {
    const getGeneral = async () => {
      const res = await fetch("/api/general", {
        method: "GET",
      });
      const general = await res.json();
      setGeneral(general);
    };
    getGeneral();
  }, []);

  return <CarouselSlider images={general?.carrousel} />;
}
