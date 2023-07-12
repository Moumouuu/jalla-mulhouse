"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { General, Picture } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import HeaderTitle from "../HeaderTitle";

interface GeneralFormProps {
  general: General & {
    carrousel: Picture[];
  };
}

export default function GeneralForm({ general }: GeneralFormProps) {
  const { register, handleSubmit } = useForm();
  const [files, setFile] = useState<any>([]);

  const fileToDataUri = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target?.result);
      };
      reader.readAsDataURL(file);
    });

  const handleChange = (files: any) => {
    for (let i = 0; i < files.target.files.length; i++) {
      const file = files.target.files[i];
      fileToDataUri(file).then((dataUri) => {
        setFile((prev: any) => [...prev, { binary: dataUri }]);
      });
    }
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    toast.promise(
      fetch("/api/general", {
        method: "POST",
        body: JSON.stringify({ ...data, files }),
      }).then((res) => res.json()),
      {
        loading: "Enregistrement en cours ...",
        success: "Enregistré !",
        error: "Une erreur est survenue",
      }
    );
  };

  const handleDeletePicture = (id: number) => {
    toast.promise(
      fetch("/api/picture", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      }).then((res) => res.json()),
      {
        loading: "Suppression en cours ...",
        success: "Supprimé !",
        error: "Une erreur est survenue",
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full ml-6"
    >
      <HeaderTitle
        title="Général"
        subtitle="Vous pouvez ici modifier l’aspect général du site."
        underline
      />
      <HeaderTitle
        title="Message promotionnel"
        subtitle="Ce message est le message tout en haut de votre site web."
      />
      <Input
        placeholder="Entrez le message que vous souhaitez afficher ..."
        defaultValue={general.promoteMessage ?? ""}
        {...register("promoteMessage")}
      />
      <HeaderTitle
        title="Description"
        subtitle="Ce message vous permet de mettre en avant vos valeurs, vos marques. Il est destiné a être plus descriptif."
      />
      <Textarea
        placeholder="Entrez votre description ..."
        defaultValue={general.about ?? ""}
        {...register("about")}
      />
      <HeaderTitle
        title="Carrousel"
        subtitle="Le carrousel représente les images qui défilent."
      />
      <Input
        id="picture"
        type="file"
        multiple
        onChange={(e) => handleChange(e)}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {general.carrousel.map((item: Picture) => (
          <div key={item.id} className="relative flex items-center justify-end">
            <Image
              alt="picture for the carrousel"
              src={item.binary}
              height={200}
              width={200}
            />
            <AiOutlineClose
              onClick={() => handleDeletePicture(item.id)}
              className="text-red-600 text-2xl absolute right-3 top-3 cursor-pointer"
            />
          </div>
        ))}
      </div>
      <div>
        <Button type="submit">Enregistrer</Button>
      </div>
    </form>
  );
}
