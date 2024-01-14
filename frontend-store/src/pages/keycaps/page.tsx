import ProductCard from "../../components/ui/product-card";
import Heading from "../../components/ui/heading";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import ProductCardSkeleton from "../../components/ui/product-card-skeleton";

const KeycapsPage = () => {
  const [products, setProducts] = useState<any>(null);

  const fetchProducts = async () => {
    const response = await fetch("/api/product/keycaps", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();

    console.log(result);

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
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-5">
      <Heading
        title="Keycaps"
        description="We produce high quality PBT keycaps to match your mechanical keyboards, with double-shot legends (and dye-sublimated legends) designed by community members like you!"
        className="w-1/2 mb-5"
      />
      <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 ">
        {products
          ? products.map((product: any) => (
              <ProductCard
                product={product}
                key={product.id}
                className={"w-full min-w-0  max-md:h-[380px]"}
              />
            ))
          : Array(8)
              .fill(0)
              .map(() => (
                <ProductCardSkeleton
                  className={"w-full min-w-0 max-md:h-[380px]"}
                />
              ))}
      </div>
    </div>
  );
};

export default KeycapsPage;
