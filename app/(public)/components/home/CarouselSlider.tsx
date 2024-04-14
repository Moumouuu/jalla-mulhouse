"use client";
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
      centerMode
      swipeable
    >
      {images?.map((image: any, index: any) => (
        <div key={index}>
          <img
            alt="Carousel picture"
            src={process.env.NEXT_PUBLIC_API_IMAGE_URL + image.attributes?.url}
            className="h-full"
          />
        </div>
      ))}
    </Carousel>
  );
}
