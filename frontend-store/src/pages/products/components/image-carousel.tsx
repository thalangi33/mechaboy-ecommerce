import { Skeleton } from "../../../components/ui/skeleton";
import React from "react";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  return (
    <div className="md:hidden flex flex-row gap-x-5 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pb-5 mb-5">
      {images
        ? images.map((image: any) => (
            <img
              src={image.key}
              key={image.key}
              className="rounded-md object-cover aspect-square w-1/2"
            />
          ))
        : Array(6)
            .fill(0)
            .map(() => <Skeleton />)}
    </div>
  );
};

export default ImageCarousel;
