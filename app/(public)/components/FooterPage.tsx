"use client";

import { italiana, julius } from "@/utils/font";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AiOutlineClockCircle,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { MdPlace } from "react-icons/md";

export default function FooterPage() {
  const [hour, setHour] = useState<string>("");

  useEffect(() => {
    const res = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/general-information`,
      {
        method: "GET",
      }
    );
    res
      .then((res) => res.json())
      .then(({ data }) => {
        setHour(data.attributes.hour);
      });
  }, []);

  const socialNetworks = [
    {
      url: "https://www.facebook.com/jallamulhouse",
      icons: <FaFacebookF size={20} />,
    },
    {
      url: "https://www.instagram.com/jallamulhouse/",
      icons: <FaInstagram size={20} />,
    },
    {
      url: "mailto:mbmulhouse@free.fr",
      icons: <AiOutlineMail size={20} />,
    },
  ];
  return (
    <>
      <div
        className={
          julius.className +
          " w-full bg-white py-16 px-4 flex items-center lg:items-start flex-col lg:flex-row justify-center mt-20 lg:mt-40"
        }
      >
        <div>
          <Image
            src="/assets/images/jalla-logo.png"
            width={200}
            height={200}
            alt="Logo"
          />
        </div>
        <div className="flex flex-col mx-5">
          <span className="underline text-md lg:text-xl uppercase my-4">
            A propos
          </span>
          <div className="flex items-center my-1">
            <MdPlace size={25} />
            <p className="ml-2">18 et 20 RUE DES FLEURS 68100 MULHOUSE</p>
          </div>
          <div className="flex items-center my-1">
            <AiOutlinePhone size={25} />
            <p className="ml-2">03 89 66 74 56</p>
          </div>
        </div>
        <div className="flex flex-col mx-5">
          <span className="underline text-md lg:text-xl uppercase my-4">
            Horaires
          </span>
          <div className="flex items-center my-1">
            <AiOutlineClockCircle size={25} />
            <p className="ml-2 whitespace-pre-line">{hour}</p>
          </div>
        </div>
        <div className="flex items-center mt-6 lg:mt-0 ">
          {socialNetworks.map((socialNetwork, index) => (
            <>
              <Link
                key={index}
                href={socialNetwork.url}
                target="_blank"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 mx-2"
              >
                {socialNetwork.icons}
              </Link>
            </>
          ))}
        </div>
      </div>
      <div className="px-3 w-full bg-white">
        <Link
          href={"https://g0sg0ko.5.75.226.51.sslip.io/admin"}
          className={italiana.className + " underline underline-offset-2 my-2"}
        >
          Admin
        </Link>
        <div className="flex flex-col lg:flex-row justify-between">
          <p className={italiana.className + " text-sm my-2"}>
            Website designed & developed by{" "}
            <Link
              href="https://pluviaux.fr"
              className={
                julius.className + " text-md underline underline-offset-2"
              }
            >
              Robin Pluviaux
            </Link>
          </p>
          <p className={italiana.className + " text-sm my-2"}>
            Copyright © 2024 - All right reserved by Jalla mulhouse
          </p>
        </div>
      </div>
    </>
  );
}
