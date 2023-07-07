"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import HeaderTitle from "../HeaderTitle";

interface GeneralFormProps {
  promoteMessage: string | null;
  about: string | null;
}

export default function GeneralForm({
  promoteMessage,
  about,
}: GeneralFormProps) {
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
        setFile((prev: any) => [...prev, { bin: dataUri }]);
      });
    }
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data, files);
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
        defaultValue={promoteMessage ?? ""}
        {...register("promoteMessage")}
      />
      <HeaderTitle
        title="Description"
        subtitle="Ce message vous permet de mettre en avant vos valeurs, vos marques. Il est destiné a être plus descriptif."
      />
      <Textarea
        placeholder="Entrez votre description ..."
        defaultValue={about ?? ""}
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
      <div>
        <Button type="submit">Enregistrer</Button>
      </div>
    </form>
  );
}
