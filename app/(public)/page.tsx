import getGeneral from "@/actions/getGeneral";
import { CarouselSlider as Carousel } from "./components/Carousel";

export default async function Home() {
  const images = await getGeneral();
  return (
    <div className="flex">
      <div className="h-24">
        <Carousel images={images?.carrousel} />
      </div>
    </div>
  );
}
