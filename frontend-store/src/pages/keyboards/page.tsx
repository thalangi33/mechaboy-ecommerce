import React, { useEffect, useState } from "react";
import { format } from "date-fns";

import Heading from "../../components/ui/heading";
import ProductCard from "../../components/ui/product-card";
import ProductCardSkeleton from "../../components/ui/product-card-skeleton";

const KeyboardsPage = () => {
  const [products, setProducts] = useState<any>(null);

  const fetchProducts = async () => {
    const response = await fetch("/api/product/keyboards", {
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
        title="Mechanical Keyboards"
        description="Mechanical keyboards differ from traditional membrane keyboards in that they use physical switches under the keycaps, meaning each key press can be felt and heard. They are ideal for typing as they optimize the feel and sound of your keyboard."
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

export default KeyboardsPage;
