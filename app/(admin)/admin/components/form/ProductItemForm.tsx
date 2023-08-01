"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Color, Height, Picture } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import HeaderTitle from "../HeaderTitle";

interface ProductItemFormProps {
  productItem?: any;
}

export default function ProductItemForm({ productItem }: ProductItemFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  //var
  const product = productItem instanceof Array ? productItem[0] : productItem;
  const [files, setFile] = useState<any>(product?.pictures || []);
  const [colors, setColor] = useState<Color[]>(product?.colors || []);
  const [sizes, setSize] = useState<Height[]>(product?.height || []);
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const [menusList, setMenusList] = useState<any>([]);
  const [menus, setMenus] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  //fetch
  useEffect(() => {
    fetchData();
    formatMenuList();
  }, [loading]);

  //method
  const fetchData = async () => {
    const res = await fetch("/api/menu", {
      method: "GET",
    });
    const data = await res.json();
    setMenus(data);
    setLoading(true);
  };

  const formatMenuList = () => {
    let allMenus: any = [];

    menus?.forEach((menu: any) => {
      allMenus.push({ id: menu.id, name: menu.name });
      menu.subMenu?.forEach((subMenu: any) => {
        allMenus.push({ id: subMenu.id, name: `-- ${subMenu.name}` });
        subMenu.terMenu?.forEach((terMenu: any) => {
          allMenus.push({ id: terMenu.id, name: `---- ${terMenu.name}` });
        });
      });
    });
    setMenusList(allMenus);
  };

  const router = useRouter();

  const submitData = async (data: any) => {
    let selectedMenuId: any;
    if (selectedMenu) {
      selectedMenuId = selectedMenu.split(" ")[0];
    }
    toast.promise(
      fetch("/api/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: product?.id,
          title: data.title,
          description: data.description,
          menuId: product?.menu ?? selectedMenuId,

          colors: colors,
          sizes: sizes,
          images: files,
          product,
        }),
      }).then(() => router.push("/admin/products")),
      {
        loading: "Création / Modification en cours ...",
        success: "Produit enregistré !",
        error: "Erreur lors de la création du produit.",
      }
    );
  };

  const fileToDataUri = (file: any) =>
    new Promise((resolve) => {
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

  const addColor = (e: any) => {
    e.preventDefault();
    setColor((prev: any) => [
      ...prev,
      {
        id: Math.floor(Math.random() * (1000000000 - 999) + 999),
        hex: "#000000",
      },
    ]);
  };

  const addSize = (e: any) => {
    e.preventDefault();
    setSize((prev: any) => [
      ...prev,
      {
        id: Math.floor(Math.random() * (1000000000 - 999) + 999),
        height: "",
        price: 0,
      },
    ]);
  };

  const onChangeColor = (e: any, id: Number) => {
    const newArr = [...colors];
    colors.forEach((color: any) => {
      if (color.id === id) {
        color.hex = e.target.value;
      }
    });
    setColor(newArr);
  };

  const onChangeSize = (e: any, id: Number) => {
    const newArr = [...sizes];
    sizes.forEach((size: any) => {
      if (size.id === id) {
        size.height = e.target.value;
      }
    });
    setSize(newArr);
  };

  const onChangeSizePrice = (e: any, id: Number) => {
    const newArr = [...sizes];
    sizes.forEach((size: any) => {
      if (size.id === id) {
        size.price = e.target.value;
      }
    });
    setSize(newArr);
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

  if (!menus) {
    return <Loader />;
  }

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className="flex flex-col w-full ml-6"
    >
      <HeaderTitle
        title={product ? "Modification produit" : "Nouveau produit"}
        subtitle={
          product
            ? "Modification d'un nouveau produit."
            : "Création d’un nouveau produit."
        }
        underline
      />

      <HeaderTitle
        title="Titre"
        subtitle="Le titre sera aussi utilisé pour la fonction recherche."
      />
      <Input
        {...register("title", { required: true })}
        placeholder="Entrez le titre de votre produit ..."
        defaultValue={product?.title}
      />
      {errors.title && (
        <span className="text-red-500">Ce champs est obligatoire !</span>
      )}

      <HeaderTitle
        title="Description"
        subtitle="Une description de votre produit."
      />
      <Textarea
        {...register("description", { required: true })}
        placeholder="Entrez le message que vous souhaitez afficher ..."
        defaultValue={product?.description}
      />
      {errors.description && (
        <span className="text-red-500">Ce champs est obligatoire !</span>
      )}

      <HeaderTitle
        title="Menu"
        subtitle='Le menu dans lequel votre produit sera "rangé" .'
      />
      <Select onValueChange={(e) => setSelectedMenu(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Choisis un menu" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {menusList?.map((menu: any, index: any) => (
              <SelectItem
                key={index}
                value={menu.id + " " + menu.name}
                defaultValue={product?.menu}
              >
                {menu.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <HeaderTitle title="Photos" subtitle="Les photos de votre produit." />
      <Input type="file" multiple onChange={(e) => handleChange(e)} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {product?.pictures?.map((item: Picture) => (
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

      <HeaderTitle title="Couleurs" subtitle="Les couleurs de votre produit." />
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {colors.map((color: Color, i: number) => (
          <Input
            type="color"
            key={i}
            onChange={(e) => onChangeColor(e, color.id)}
            defaultValue={color.hex}
          />
        ))}
      </div>
      <div>
        <Button variant={"default"} onClick={(e) => addColor(e)}>
          <AiOutlinePlus className="text-2xl" /> Couleur
        </Button>
      </div>

      <HeaderTitle
        title="Tailles"
        subtitle="Les tailles de votre produit. Aussi utiliser pour déterminer un prix."
      />
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {sizes.map((size: Height, i: number) => (
          <Input
            type="text"
            key={i}
            onChange={(e) => onChangeSize(e, size.id)}
            defaultValue={size.height}
          />
        ))}
      </div>
      <div>
        <Button variant={"default"} onClick={(e) => addSize(e)}>
          <AiOutlinePlus className="text-2xl" /> Taille
        </Button>
      </div>

      <HeaderTitle
        title="Prix"
        subtitle="Les prix de votre produit. Il est en fonction des tailles définis précedemment."
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Taille</TableHead>
            <TableHead>Prix</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sizes.map((size: Height, i: number) => (
            <TableRow key={i}>
              <TableCell>{size.height}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  onChange={(e) => onChangeSizePrice(e, size.id)}
                  defaultValue={size.price}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div>
        <Button type="submit">{product ? "Modifier" : "Créer"}</Button>
      </div>
    </form>
  );
}
