"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
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

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface catalogAndVideo {
  id?: string;
  menuId: string | undefined;
  menuName?: string | undefined;
  urlCatalog: string | undefined;
  urlVideo: string | undefined;
}

// todo : création de video et catalog OK

// todo : afficher la vidéo et le catalogue dans la page de recherche
// todo : ajouter un bouton pour supprimer la vidéo et le catalogue
// todo : ajouter un bouton pour modifier la vidéo et le catalogue
// todo : lister les vidéos et les catalogues dans la page

export default function MenuForm() {
  const { handleSubmit } = useForm();
  //var
  const [menuList, setMenuList] = useState<Menu[]>([]);
  const [subMenuList, setSubMenuList] = useState<any[]>([]);
  const [terMenuList, setTerMenuList] = useState<any[]>([]);
  const [fatherMenuSubMenu, setFatherMenuSubMenu] = useState<string>();
  const [fatherMenuTerMenu, setFatherMenuTerMenu] = useState<string>();
  const [menus, setMenus] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [catalogAndVideo, setCatalogAndVideo] = useState<catalogAndVideo>({
    menuId: "",
    urlCatalog: "",
    urlVideo: "",
  });
  const [catalogsAndVideos, setCatalogsAndVideos] = useState<catalogAndVideo[]>(
    []
  );

  //fetch
  useEffect(() => {
    fetchData();
    formatMenu(menus);
  }, [loading]);

  //method

  const fetchData = async () => {
    const res = await fetch("/api/menu", {
      method: "GET",
    });
    const data = await res.json();

    setMenus(data);
    setLoading(true);

    data.forEach((element: any) => {
      if (element.catalogAndVideo == null) {
        return;
      }
      setCatalogsAndVideos([
        ...catalogsAndVideos,
        {
          id: element.catalogAndVideo.id,
          menuId: element.catalogAndVideo.menuId,
          menuName: element.name,
          urlCatalog: element.catalogAndVideo.urlCatalog,
          urlVideo: element.catalogAndVideo.urlVideo,
        },
      ]);
    });
  };

  const formatMenu = (menus: any) => {
    let menuList: any[] = [];
    let subMenuList: any[] = [];
    let terMenuList: any[] = [];

    menus?.forEach((m: any) => {
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
            grandFatherMenu: m.name,
          });
        });
      });
    });

    setMenuList(menuList);
    setSubMenuList(subMenuList);
    setTerMenuList(terMenuList);
  };

  const submitData = async () => {
    // remove grandFatherMenu from terMenuList
    terMenuList.forEach((tm: any) => {
      delete tm.grandFatherMenu;
    });

    toast.promise(
      fetch("/api/menu", {
        method: "POST",
        body: JSON.stringify({
          menuList,
          subMenuList,
          terMenuList,
          catalogAndVideo,
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

  if (!menus) {
    return <Loader />;
  }

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
        {subMenuList?.map((item: any, i) => (
          <div key={i} className="relative">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input
                    defaultValue={`${item.name}`}
                    placeholder="Entrez le nom du menu..."
                    onChange={(e) => updateSubMenu(e, item)}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.fatherMenu}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

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
          {subMenuList.map((m: any, i) => (
            <SelectItem value={m.name} key={i}>
              {m.fatherMenu} - {m.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {terMenuList?.map((item: any, i) => (
          <div key={i} className="relative">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input
                    defaultValue={`${item.name}`}
                    placeholder="Entrez le nom du menu..."
                    onChange={(e) => updateTerMenu(e, item)}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {item.grandFatherMenu} - {item.fatherMenu}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

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

      <HeaderTitle
        title="Catalogues & Vidéos"
        subtitle="Vous pouvez définir pour un menu parent un catalogue et une vidéo."
      />
      <Select
        onValueChange={(e) => {
          setCatalogAndVideo({ ...catalogAndVideo, menuId: e });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Choisir" />
        </SelectTrigger>
        <SelectContent>
          {menuList.map((m: Menu, i) => (
            <SelectItem value={m.id.toString()} key={i}>
              {m.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="max-w-md">
        <Input
          defaultValue={catalogAndVideo?.urlVideo}
          placeholder="Entrez le lien embed de la vidéo..."
          onChange={(e) =>
            setCatalogAndVideo({ ...catalogAndVideo, urlVideo: e.target.value })
          }
        />
        <Input
          defaultValue={catalogAndVideo?.urlCatalog}
          placeholder="Entrez le lien du catalogue..."
          onChange={(e) =>
            setCatalogAndVideo({
              ...catalogAndVideo,
              urlCatalog: e.target.value,
            })
          }
        />
      </div>

      <div>
        <Button type="submit">Enregistrer</Button>
      </div>

      <div className="w-full flex-wrap">
        {catalogsAndVideos?.map((c, i) => (
          <CatalogAndVideo key={i} c={c} />
        ))}
      </div>
    </form>
  );
}

interface CatalogAndVideoProps {
  c: catalogAndVideo;
}

const CatalogAndVideo: React.FC<CatalogAndVideoProps> = ({ c }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(c);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log("totot",editedItem);
    fetch("/api/menu/catalogAndVideo", {
      method: "PUT",
      body: JSON.stringify({
        id: editedItem.id,
        urlCatalog: editedItem.urlCatalog,
        urlVideo: editedItem.urlVideo,
      }),
    }),
      setIsEditing(false);
  };

  const handleDelete = () => {
    fetch("/api/menu/catalogAndVideo", {
      method: "DELETE",
      body: JSON.stringify({
        id: editedItem.id,
      }),
    });
    //onDelete(c.id); // Suppose que c a une propriété id
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof catalogAndVideo
  ) => {
    setEditedItem({ ...editedItem, [field]: e.target.value });
  };

  return (
    <div className="flex items-end">
      <div>
        <label htmlFor="menuName">Menu Name:</label>
        <Input
          id="menuName"
          value={editedItem.menuName}
          disabled={true}
          onChange={(e) => handleChange(e, "menuName")}
        />
      </div>
      <div>
        <label htmlFor="urlCatalog">Catalog URL:</label>
        <Input
          id="urlCatalog"
          value={editedItem.urlCatalog}
          disabled={!isEditing}
          onChange={(e) => handleChange(e, "urlCatalog")}
        />
      </div>
      <div>
        <label htmlFor="urlVideo">Video URL:</label>
        <Input
          id="urlVideo"
          value={editedItem.urlVideo}
          disabled={!isEditing}
          onChange={(e) => handleChange(e, "urlVideo")}
        />
      </div>
      {isEditing ? (
        <>
          <Button className="mr-2" variant={"default"} onClick={handleSave}>
            Enregistrer
          </Button>
          <Button variant={"destructive"} onClick={() => setIsEditing(false)}>
            Annuler
          </Button>
        </>
      ) : (
        <>
          <Button className="mr-2" variant={"default"} onClick={handleEdit}>
            Modifier
          </Button>
          <Button variant={"destructive"} onClick={handleDelete}>
            Supprimer
          </Button>
        </>
      )}
    </div>
  );
};
