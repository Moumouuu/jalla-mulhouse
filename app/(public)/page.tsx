import About from "./components/home/About";
import Carousel from "./components/home/Carousel";
import ContactForm from "./components/home/ContactForm";
import ItemsSlider from "./components/home/ItemsSlider";
import Map from "./components/home/Map";

export default async function Home() {
  return (
    <div className="flex flex-col">
      <Carousel />
      <About />
      <ItemsSlider newItems label="Nouveautés" />
      <ItemsSlider selectedItems label="Notre sélection" />
      <Map />
      <ContactForm />
    </div>
  );
}
