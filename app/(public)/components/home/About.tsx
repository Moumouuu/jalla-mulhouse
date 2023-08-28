"use client";

import Loader from "@/components/ui/loader";
import { italiana, julius } from "@/utils/font";
import { useEffect, useState } from "react";

export default function About() {
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
    <div className="text-center text-white mt-24 lg:mt-40 mx-3 ">
      <h1 className={italiana.className + " text-xl lg:text-3xl my-4"}>
        Jalla Mulhouse
      </h1>
      <div className="flex justify-center">
        <p className={julius.className + " text-md lg:text-xl lg:max-w-[60vw]"}>
          {general?.about}
        </p>
      </div>
    </div>
  );
}
