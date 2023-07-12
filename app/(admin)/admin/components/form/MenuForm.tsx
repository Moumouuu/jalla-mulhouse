"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Menu } from "@prisma/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import HeaderTitle from "../HeaderTitle";

interface MenuFormProps {
  menu: any[];
}

export default function MenuForm({ menu }: MenuFormProps) {
  const { handleSubmit } = useForm();
  const [menuList, setMenuList] = useState<Menu[]>([]);
  const [subMenuList, setSubMenuList] = useState<any[]>([]);
  const [terMenuList, setTerMenuList] = useState<any[]>([]);
  const [fatherMenuSubMenu, setFatherMenuSubMenu] = useState<string>();
  const [fatherMenuTerMenu, setFatherMenuTerMenu] = useState<string>();

  useEffect(() => {
    formatMenu(menu);
  }, [menu]);

  const formatMenu = (menus: any) => {
    let menuList: any[] = [];
    let subMenuList: any[] = [];
    let terMenuList: any[] = [];

    menus.forEach((m: any) => {
      menuList.push({
        id: m.id,
        name: m.name,
      });

      m.subMenu.forEach((sm: any) => {
        subMenuList.push({
          id: sm.id,
          name: sm.name,
          fatherMenu: m.name,
        });

        sm.terMenu.forEach((tm: any) => {
          terMenuList.push({
            id: tm.id,
            name: tm.name,
            fatherMenu: sm.name,
          });
        });
      });
    });

    setMenuList(menuList);
    setSubMenuList(subMenuList);
    setTerMenuList(terMenuList);
  };

  const submitData = async () => {
    console.log(menuList, subMenuList, terMenuList);
    toast.promise(
      fetch("/api/menu", {
        method: "POST",
        body: JSON.stringify({
          menuList,
          subMenuList,
          terMenuList,
        }),
      }),
      {
        loading: "Enregistrement...",
        success: "Enregistré avec succès !",
        error: "Une erreur est survenue lors de l'enregistrement.",
      }
    );
  };

  const updateMenu = (e: any, menu: Menu) => {
    let newArr = [...menuList];
    menuList.forEach((p: any) => {
      if (p.id == menu.id) {
        p.name = e.target.value;
      }
    });
    setMenuList(newArr);
  };

  const updateSubMenu = (e: any, menu: Menu) => {
    let newArr = [...subMenuList];
    subMenuList.forEach((p: any) => {
      if (p.id == menu.id) {
        p.name = e.target.value;
      }
    });
    setSubMenuList(newArr);
  };

  const updateTerMenu = (e: any, menu: Menu) => {
    let newArr = [...terMenuList];
    terMenuList.forEach((p: any) => {
      if (p.id == menu.id) {
        p.name = e.target.value;
      }
    });
    setTerMenuList(newArr);
  };

  const addMenu = (e: any, i: Number) => {
    e.preventDefault();

    switch (i) {
      case 1:
        setMenuList([
          ...menuList,
          {
            id: Math.floor(Math.random() * (1000000000 - 999)) + 999,
            name: "",
          },
        ]);
        break;
      case 2:
        setSubMenuList([
          ...subMenuList,
          {
            id: Math.floor(Math.random() * (1000000000 - 999) + 999),
            name: "",
            fatherMenu: fatherMenuSubMenu,
          },
        ]);
        break;
      case 3:
        setTerMenuList([
          ...terMenuList,
          {
            id: Math.floor(Math.random() * (1000000000 - 999) + 999),
            name: "",
            fatherMenu: fatherMenuTerMenu,
          },
        ]);
        break;
    }
  };

  const deleteMenu = (menu: Menu, i: Number) => {
    switch (i) {
      case 1:
        const subMenu = subMenuList.find((m) => m.fatherMenu === menu.name);
        setTerMenuList(
          terMenuList.filter((m) => m.fatherMenu !== subMenu?.name)
        );
        setSubMenuList(subMenuList.filter((m) => m.fatherMenu !== menu.name));
        setMenuList(menuList.filter((m) => m.id !== menu.id));
        break;
      case 2:
        setTerMenuList(terMenuList.filter((m) => m.fatherMenu !== menu.name));
        setSubMenuList(subMenuList.filter((m) => m.id !== menu.id));
        break;
      case 3:
        setTerMenuList(terMenuList.filter((m) => m.id !== menu.id));
        break;
    }
    toast.promise(
      fetch("/api/menu", {
        method: "DELETE",
        body: JSON.stringify({
          id: menu.id,
        }),
      }),
      {
        loading: "Suppression...",
        success: "Supprimé avec succès !",
        error: "Une erreur est survenue lors de la suppression.",
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className="flex flex-col w-full ml-6"
    >
      <HeaderTitle
        title="Menu principal"
        subtitle="Ce menu est la première rubrique."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {menuList?.map((item: Menu, i) => (
          <div key={i} className="relative">
            <Input
              defaultValue={item.name}
              placeholder="Entrez le nom du menu..."
              onChange={(e) => updateMenu(e, item)}
            />
            <ImBin
              onClick={() => deleteMenu(item, 1)}
              className="absolute top-[50%] right-2 -translate-y-[50%] text-red-600 cursor-pointer text-xl md:text-2xl"
            />
          </div>
        ))}
      </div>
      <div>
        <Button variant={"default"} onClick={(e) => addMenu(e, 1)}>
          <AiOutlinePlus className="text-2xl" /> Menu
        </Button>
      </div>

      <HeaderTitle
        title="Menu secondaire"
        subtitle="Ce menu est la seconde rubrique, il a besoin d’un menu parent."
      />
      <Select
        onValueChange={(e) => {
          setFatherMenuSubMenu(e);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Choisir" />
        </SelectTrigger>
        <SelectContent>
          {menuList.map((m: Menu, i) => (
            <SelectItem value={m.name} key={i}>
              {m.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {subMenuList?.map((item: Menu, i) => (
          <div key={i} className="relative">
            <Input
              defaultValue={item.name}
              placeholder="Entrez le nom du menu..."
              onChange={(e) => updateSubMenu(e, item)}
            />
            <ImBin
              onClick={() => deleteMenu(item, 2)}
              className="absolute top-[50%] right-2 -translate-y-[50%] text-red-600 cursor-pointer text-xl md:text-2xl"
            />
          </div>
        ))}
      </div>
      <div>
        <Button variant={"default"} onClick={(e) => addMenu(e, 2)}>
          <AiOutlinePlus className="text-2xl" /> Menu
        </Button>
      </div>

      <HeaderTitle
        title="Menu tertiaire"
        subtitle="Ce menu est la troisième rubrique, il a besoin d’un sous-menu parent."
      />
      <Select
        onValueChange={(e) => {
          setFatherMenuTerMenu(e);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Choisir" />
        </SelectTrigger>
        <SelectContent>
          {subMenuList.map((m: Menu, i) => (
            <SelectItem value={m.name} key={i}>
              {m.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {terMenuList?.map((item: Menu, i) => (
          <div key={i} className="relative">
            <Input
              defaultValue={item.name}
              placeholder="Entrez le nom du menu..."
              onChange={(e) => updateTerMenu(e, item)}
            />
            <ImBin
              onClick={() => deleteMenu(item, 3)}
              className="absolute top-[50%] right-2 -translate-y-[50%] text-red-600 cursor-pointer text-xl md:text-2xl"
            />
          </div>
        ))}
      </div>

      <div>
        <Button variant={"default"} onClick={(e) => addMenu(e, 3)}>
          <AiOutlinePlus className="text-2xl" /> Menu
        </Button>
      </div>

      <div>
        <Button type="submit">Enregistrer</Button>
      </div>
    </form>
  );
}
