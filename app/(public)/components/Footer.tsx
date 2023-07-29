import { julius } from "@/utils/font";
import { Link } from "lucide-react";
import Image from "next/image";
import { AiOutlineClockCircle, AiOutlineMail } from "react-icons/ai";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { MdPlace } from "react-icons/md";

export default function Footer() {
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
    <div
      className={
        julius.className + " w-full bg-white py-16 px-4 flex justify-center"
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
        <span className="underline text-md lg:text-xl uppercase mb-4">
          A propos
        </span>
        <div className="flex items-center">
          <MdPlace size={25} />
          <p>18 et 20 RUE DES FLEURS 68100 MULHOUSE</p>
        </div>
        <div className="flex items-center">
          <AiOutlineClockCircle size={25} />
          <p>03 89 66 74 56</p>
        </div>
      </div>
      <div className="flex flex-col mx-5">
        <span className="underline text-md lg:text-xl uppercase mb-4">
          Horaires
        </span>
        <div className="flex items-center">
          <MdPlace size={25} />
          <p>Du lundi au vendredi : 10h - 12h / 14h - 18h45</p>
        </div>
        <div className="flex items-center">
          <AiOutlineClockCircle size={25} />
          <p>le samedi uniquement : 10h - 12h / 14h - 18h30</p>
        </div>
      </div>
      <div className="flex items-center">
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
  );
}
