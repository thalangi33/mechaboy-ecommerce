import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Heading from "../../../components/ui/heading";
import ProductCard from "../../../components/ui/product-card";
import { Button } from "../../../components/ui/button";
import { useRef } from "react";
import { format } from "date-fns";
import ProductCardSkeleton from "../../../components/ui/product-card-skeleton";

interface CarouselProps {
  heading: string;
  description?: string;
  fetchAPI: string;
}

const Carousel: React.FC<CarouselProps> = ({
  heading,
  description,
  fetchAPI,
}) => {
  const [products, setProducts] = useState<any>(null);

  const fetchProducts = async () => {
    const response = await fetch(fetchAPI, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();

    console.log(result);

    if (result["products"].length != 0) {
      setProducts(
        result["products"].map((item: any) => ({
          id: item._id,
          name: item.name,
          pathname: item.pathname,
          description: item.description,
          category: item.category,
          subcategory: item.subcategory,
          brand: item.brand,
          colorQuantity: item.colorQuantity,
          price: item.price,
          sold: item.sold,
          images: item.images,
          isFeatured: item.isFeatured,
          isArchived: item.isArchived,
          createdAt: format(Date.parse(item.createdAt), "MMMM do, yyyy"),
        }))
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className="flex flex-row items-center my-5">
        <Heading title={heading} className="mr-2" description={description} />
        <Button className="ml-auto">More</Button>
      </div>

      <div className="relative">
        <Button
          size="icon"
          className="absolute bottom-48 -left-3 z-10"
          onClick={() =>
            scrollAreaRef.current?.scrollBy({
              left: -270,
              behavior: "smooth",
            })
          }
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Button
          size="icon"
          className="absolute bottom-48 -right-3 z-10"
          onClick={() =>
            scrollAreaRef.current?.scrollBy({
              left: 270,
              behavior: "smooth",
            })
          }
        >
          <ArrowRight className="h-6 w-6" />
        </Button>
        <div
          className="flex  gap-x-5 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pb-5"
          ref={scrollAreaRef}
        >
          {products
            ? products.map((product: any) => (
                <ProductCard
                  product={product}
                  key={product}
                />
              ))
            : Array(8)
                .fill(0)
                .map(() => <ProductCardSkeleton/>)}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
