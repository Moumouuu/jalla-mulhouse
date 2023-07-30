"use client";

import { italiana } from "@/utils/font";
export default function Map() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2
        className={
          italiana.className +
          " text-xl lg:text-3xl text-center text-white mt-40 mb-10 "
        }
      >
        Où nous trouver ?
      </h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2682.8269074137656!2d7.333993711533847!3d47.74601307822057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47919b0b3edcabe9%3A0x2afebf09a430d1a9!2sBoutique%20Jalla!5e0!3m2!1sen!2sfr!4v1690635616840!5m2!1sen!2sfr"
        width="100%"
        height="450"
        loading="lazy"
        //@ts-ignore
      ></iframe>
    </div>
  );
}
