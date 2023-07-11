import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Promotion } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ImBin } from "react-icons/im";
import { DatePicker } from "./DatePicker";

interface PromoProps {
  promo: Promotion;
  promos: Promotion[];
  setPromos: any;
}

export default function Promo({ promo, promos, setPromos }: PromoProps) {
  const discounts = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const [startDiscount, setStartDiscount] = useState<Date>(
    promo.launchDay ?? new Date()
  );
  const [endDiscount, setEndDiscount] = useState<Date>(
    promo.endDay ?? new Date()
  );

  useEffect(() => {
    promo.launchDay = startDiscount;
    promo.endDay = endDiscount;
  }, [startDiscount, endDiscount, promo]);

  const removePromotion = (id: Number) => {
    setPromos((prev: any) => prev.filter((promo: any) => promo.id !== id));
  };

  const updateName = (e: any) => {
    let newArr = [...promos];
    promos.forEach((p: any) => {
      if (p.id == promo.id) {
        p.name = e.target.value;
      }
    });
    setPromos(newArr);
  };

  const updateDiscount = (e: any) => {
    let newArr = [...promos];
    let addDiscount = true;

    // check if discount already exists
    promos.forEach((p: any) => {
      if (e == p.discount) {
        addDiscount = false;
        toast.error(
          "Cette promotion existe déjà. Veuillez en choisir une autre ou modifier la promotion existante."
        );
      }
      if (p.id == promo.id) {
        p.discount = e;
      }
    });
    if (!addDiscount) return;
    setPromos(newArr);
  };

  return (
    <div className="flex flex-col md:flex-row items-center w-full">
      <div className="flex flex-col md:mr-3">
        <label className="text-sm">Réduction</label>
        <div className="my-2">
          <Select onValueChange={(e) => updateDiscount(e)}>
            <SelectTrigger>
              <SelectValue placeholder={promo.discount + "%" ?? "Choisir"} />
            </SelectTrigger>
            <SelectContent>
              {discounts.map((discount) => (
                <SelectItem value={discount.toString()} key={discount}>
                  {discount}%
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col md:mr-3">
        <label className="text-sm">Nom</label>
        <Input
          type="text"
          onChange={(e) => updateName(e)}
          defaultValue={promo.name}
          placeholder={promo.name}
        />
      </div>

      <div className="flex flex-col md:mr-3">
        <label className="text-sm">Début de la réduction</label>
        <DatePicker date={startDiscount} setDate={setStartDiscount} />
      </div>

      <div className="flex flex-col md:mr-3">
        <label className="text-sm">Fin de la réduction</label>
        <DatePicker date={endDiscount} setDate={setEndDiscount} />
      </div>

      <ImBin
        onClick={() => removePromotion(promo.id)}
        className="text-red-600 cursor-pointer text-xl md:text-2xl"
      />
    </div>
  );
}
