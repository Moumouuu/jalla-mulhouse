import GetNewItems from "@/actions/getNewItems";
import GetSelectedItems from "@/actions/getSelectedItems";
import About from "./components/home/About";
import Carousel from "./components/home/Carousel";
import ContactForm from "./components/home/ContactForm";
import ItemsSlider from "./components/home/ItemsSlider";
import Map from "./components/home/Map";

export default async function Home() {
  const newItems = await GetNewItems();
  const selectedItems = await GetSelectedItems();
  return (
    <div className="flex flex-col">
      <Carousel />
      <About />
      <ItemsSlider items={newItems} label="Nouveautés" />
      <ItemsSlider items={selectedItems} label="Ma sélection" />
      <Map />
      <ContactForm />
    </div>
  );
}
