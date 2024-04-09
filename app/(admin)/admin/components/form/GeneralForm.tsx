"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import HeaderTitle from "../HeaderTitle";

import { UploadButton } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { AiFillDelete } from "react-icons/ai";

export default function GeneralForm() {
  const { register, handleSubmit } = useForm();
  const [general, setGeneral] = useState<any>();
  const [files, setFile] = useState<any>([]);

  const fetchData = async () => {
    const res = await fetch("/api/general", {
      method: "GET",
    });
    const data = await res.json();
    setGeneral(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const onUploadFilesComplete = (res: any) => {
    const f = [...files, ...res];
    setFile(f);
  };

  if (!general) {
    return <Loader />;
  }

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
        title="Message promotionnel mobile"
        subtitle="Ce message est le message tout en haut de votre site web pour la version mobile, il ne tourne pas et doit donc être plus petit."
      />
      <Input
        placeholder="Entrez le message que vous souhaitez afficher ..."
        defaultValue={general.promoteMessageMobile ?? ""}
        {...register("promoteMessageMobile")}
      />
      <HeaderTitle
        title="Horaires"
        subtitle="Ce message affiche vos horaires d’ouverture."
      />
      <Textarea
        placeholder="Entrez vos horaires ..."
        defaultValue={general.hour ?? ""}
        {...register("hour")}
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

      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          onUploadFilesComplete(res);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4 ">
        {general?.carrousel?.map((file: any) => (
          <div className="relative" key={file.id}>
          <Image
            key={file.id}
            width={200}
            height={200}
            src={file.url}
            alt={"picture "}
            className="rounded-md "
          />
          <AiFillDelete
            className="absolute top-2 right-1 cursor-pointer"
            color="red"
            size={20}
            onClick={() => handleDeletePicture(file.id)}
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
