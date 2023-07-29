import getGeneral from "@/actions/getGeneral";
import getNewItems from "@/actions/getNewItems";
import getSelectedItems from "@/actions/getSelectedItems";
import About from "./components/About";
import { CarouselSlider as Carousel } from "./components/Carousel";
import ContactForm from "./components/ContactForm";
import ItemsSlider from "./components/ItemsSlider";
import Map from "./components/Map";

export default async function Home() {
  const general = await getGeneral();
  const newItems = await getNewItems();
  const selectedItems = await getSelectedItems();
  return (
    <div className="flex flex-col">
      <Carousel images={general?.carrousel} />
      <About general={general} />
      <ItemsSlider items={newItems} label="Nouveautés" />
      <ItemsSlider items={selectedItems} label="Notre sélection" />
      <Map />
      <ContactForm />
    </div>
  );
}
