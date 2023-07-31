import getGeneral from "@/actions/getGeneral";
import getNewItems from "@/actions/getNewItems";
import getSelectedItems from "@/actions/getSelectedItems";
import About from "./components/home/About";
import CarouselSlider from "./components/home/Carousel";
import ContactForm from "./components/home/ContactForm";
import ItemsSlider from "./components/home/ItemsSlider";
import Map from "./components/home/Map";

export default async function Home() {
  const general = await getGeneral();
  const newItems = await getNewItems();
  const selectedItems = await getSelectedItems();
  return (
    <div className="flex flex-col">
      <CarouselSlider images={general?.carrousel} />
      <About general={general} />
      <ItemsSlider items={newItems} label="Nouveautés" />
      <ItemsSlider items={selectedItems} label="Notre sélection" />
      <Map />
      <ContactForm />
    </div>
  );
}
