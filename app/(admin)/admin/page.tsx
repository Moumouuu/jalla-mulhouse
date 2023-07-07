"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    signIn("credentials", {
      username: data.username,
      password: data.password,
      callbackUrl: "/admin/general",
    });
    resetField("password");
    resetField("username");
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-dark relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center p-4 h-[80%]"
      >
        <h1 className="text-3xl mb-6 text-white">Connexion à votre espace </h1>
        <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 z-10">
          <Input
            type="text"
            placeholder="Entrez votre identifiant..."
            defaultValue={""}
            {...register("username", { required: true })}
          />
          <Input
            type="password"
            placeholder="Entez votre mot de passe..."
            defaultValue={""}
            {...register("password", { required: true })}
          />
          <Button type="submit">Connexion</Button>
        </div>
      </form>
      <Image
        className="absolute left-[50%] top-0 translate-x-[-50%] opacity-20"
        src="/assets/images/jalla-logo-white.png"
        width={900}
        height={900}
        alt="Logo jalla"
      />
    </div>
  );
}
