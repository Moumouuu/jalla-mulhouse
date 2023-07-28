"use client";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

interface CarouselProps {
  images: any;
}

export function CarouselSlider({ images }: CarouselProps) {
  return (
    <Carousel
      showArrows={true}
      autoPlay={true}
      infiniteLoop={true}
      interval={2000}
      showIndicators={false}
      showStatus={false}
      showThumbs={false}
      swipeable
    >
      {images?.map((image: any, index: any) => (
        <div key={index}>
          <img alt="Carousel picture" src={image.binary} />
        </div>
      ))}
    </Carousel>
  );
}
