"use client";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

interface CarouselProps {
  images: any;
  showIndicators?: boolean;
  showStatus?: boolean;
  showThumbs?: boolean;
  showArrows?: boolean;
  autoPlay?: boolean;
  infiniteLoop?: boolean;
}

export default function CarouselSlider({
  images,
  showArrows = true,
  showIndicators = false,
  showStatus = false,
  showThumbs = false,
  autoPlay = true,
  infiniteLoop = true,
}: CarouselProps) {
  return (
    <Carousel
      showArrows={showArrows}
      autoPlay={autoPlay}
      infiniteLoop={infiniteLoop}
      interval={2000}
      showIndicators={showIndicators}
      showStatus={showStatus}
      showThumbs={showThumbs}
      swipeable
    >
      {images?.map((image: any, index: any) => (
        <div key={index}>
          <Image
            width={"100"}
            height={"100"}
            alt="Carousel picture"
            src={image.url}
            className="object-top"
          />
        </div>
      ))}
    </Carousel>
  );
}
