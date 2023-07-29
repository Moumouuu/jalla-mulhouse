"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
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
import { Product, Promotion } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ImBin } from "react-icons/im";
import HeaderTitle from "../HeaderTitle";
import Promo from "../inputs/Promo";

interface ProductFormProps {
  promotion: Promotion[];
  products: Product[];
}

export default function ProductForm({ promotion, products }: ProductFormProps) {
  const [promos, setPromos] = useState<Promotion[]>(promotion);
  const [productsList] = useState<Product[]>(products);
  const router = useRouter();
  const { handleSubmit } = useForm();

  useEffect(() => {
    router.refresh();
  }, [productsList, router]);

  const addPromotion = (e: any) => {
    e.preventDefault();
    let addDiscount = true;

    //check if all promotions are filled
    promos.forEach((promo) => {
      if (promo.discount == 0 || promo.name === "") {
        addDiscount = false;
        toast.error(
          "Veuillez remplir toutes les promotions avant d'en ajouter une nouvelle."
        );
      }
    });

    if (!addDiscount) return;

    setPromos((prev: any) => [
      ...prev,
      {
        id: Math.floor(Math.random() * (1000000000 - 999) + 999),
        discount: 0,
        name: "",
        launchDay: new Date(),
        endDay: new Date(),
      },
    ]);
  };

  const submitData = () => {
    toast.promise(
      fetch("/api/products", {
        method: "POST",
        body: JSON.stringify({ promos: promos, products: productsList }),
      }),
      {
        loading: "Enregistrement...",
        success: "Enregistré !",
        error: "Erreur lors de l'enregistrement !",
      }
    );
  };

  const deleteProduct = (id: number) => {
    toast.promise(
      fetch("/api/products", {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      }).then((res) => res.json()),
      {
        loading: "Suppression...",
        success: "Supprimé !",
        error: "Erreur lors de la suppression !",
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className="flex flex-col w-full ml-6"
    >
      <HeaderTitle
        title="Produits"
        subtitle="Vous pouvez ici interagir avec vos produits."
        underline
      />
      <HeaderTitle
        title="Vos Promos"
        subtitle="Veuillez sélectionner la promo. Tous les produits cochés par la suite auront cette promo d’appliquée."
      />

      <div className="flex flex-col">
        {promos.map((promo, i) => (
          <Promo key={i} promo={promo} promos={promos} setPromos={setPromos} />
        ))}
      </div>

      <div>
        <Button variant={"default"} onClick={(e) => addPromotion(e)}>
          <AiOutlinePlus className="text-2xl" /> Promo
        </Button>
      </div>

      <HeaderTitle
        title="Vos Produits"
        subtitle="Ce tableau permet de voir et interagir avec vos produits."
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Titre</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Nouveauté</TableHead>
            <TableHead>Ma sélection</TableHead>
            <TableHead>Visible</TableHead>
            <TableHead>Promo</TableHead>
            <TableHead>Plus</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productsList?.map((product: any) => (
            <TableRow key={product.id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.height[0]?.price}€</TableCell>
              <TableCell>
                <Checkbox
                  defaultChecked={product.new}
                  onClick={() => {
                    product.new = !product.new;
                  }}
                />
              </TableCell>
              <TableCell>
                <Checkbox
                  defaultChecked={product.selected}
                  onClick={() => {
                    product.selected = !product.selected;
                  }}
                />
              </TableCell>
              <TableCell>
                <Checkbox
                  defaultChecked={product.visible}
                  onClick={() => {
                    product.visible = !product.visible;
                  }}
                />
              </TableCell>
              <TableCell>
                <Select onValueChange={(e) => (product.promotion = e)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue
                      placeholder={
                        product.promotion
                          ? product.promotion.name +
                            " " +
                            product.promotion.discount +
                            "%"
                          : "Choisir"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {promos.map((p, i) => (
                      <SelectItem value={p.discount.toString()} key={i}>
                        {p.name} {p.discount}%
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger>
                    <BsThreeDotsVertical className="text-xl" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{product.title}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        router.push("products/" + product.id);
                      }}
                    >
                      <AiFillEdit className="mr-1 text-xl" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        deleteProduct(product.id);
                      }}
                    >
                      <ImBin className="mr-1 text-xl" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div>
        <Button variant={"default"} onClick={() => router.push("products/new")}>
          <AiOutlinePlus className="text-2xl" /> Produit
        </Button>
      </div>

      <div>
        <Button type="submit">Enregistrer</Button>
      </div>
    </form>
  );
}
