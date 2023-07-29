"use client";

import { italiana, julius } from "@/utils/font";
interface AboutProps {
  general: any;
}

export default function About({ general }: AboutProps) {
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
