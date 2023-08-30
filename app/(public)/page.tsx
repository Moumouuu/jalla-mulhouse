import About from "./components/home/About";
import Carousel from "./components/home/Carousel";
import ContactForm from "./components/home/ContactForm";
import Map from "./components/home/Map";
import ProductsSlider from "./components/home/ProductsSlider";

export default async function Home() {
  return (
    <div className="flex flex-col">
      <Carousel />
      <About />
      <ProductsSlider />
      <Map />
      <ContactForm />
    </div>
  );
}
