"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { italiana, julius } from "@/utils/font";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ContactForm() {
  const { handleSubmit, register } = useForm();

  const sendEmail = async (data: any) => {
    console.log(data);
    toast.promise(
      fetch("/api/send", {
        method: "POST",
        body: JSON.stringify({ ...data }),
      }).then((res) => res.json()),
      {
        loading: "Envoie en cours ...",
        success: "Envoyé !",
        error: "Une erreur est survenue",
      }
    );
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h2
        className={
          italiana.className +
          " text-xl lg:text-3xl text-center text-white mt-20 lg:mt-40 mb-10 "
        }
      >
        Une question ?
      </h2>

      <form onSubmit={handleSubmit(sendEmail)} className="flex flex-col">
        <div className="flex">
          <div className={julius.className + "flex flex-col text-white p-3"}>
            <label className={julius.className}>Nom</label>
            <Input
              placeholder="Entrez votre nom..."
              {...register("name")}
              type="text"
            />
          </div>
          <div className={julius.className + "flex flex-col text-white p-3"}>
            <label className={julius.className}>Prénom</label>
            <Input
              placeholder="Entrez votre prénom..."
              {...register("firstname")}
              type="text"
            />
          </div>
        </div>
        <div className="flex">
          <div className={julius.className + "flex flex-col text-white p-3"}>
            <label className={julius.className}>Adresse Email</label>
            <Input
              placeholder="Entrez votre e-mail..."
              {...register("email")}
              type="email"
            />
          </div>
          <div className={julius.className + "flex flex-col text-white p-3"}>
            <label className={julius.className}>Téléphone</label>
            <Input
              placeholder="Entrez votre téléphone..."
              {...register("phoneNumber")}
              type="tel"
            />
          </div>
        </div>
        <Textarea
          className="text-white className={julius.className}"
          placeholder="Entrez votre message"
          {...register("message")}
        />
        <Button type="submit">Envoyer</Button>
      </form>
    </div>
  );
}
