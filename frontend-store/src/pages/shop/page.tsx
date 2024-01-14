import { format } from "date-fns";
import React, { useEffect, useState } from "react";

import ProductCard from "../../components/ui/product-card";
import Heading from "../../components/ui/heading";
import { Product } from "../../interfaces/product.interface";
import ProductCardSkeleton from "../../components/ui/product-card-skeleton";

const ShopPage = () => {
  const [products, setProducts] = useState<any>(null);
  const fetchProducts = async () => {
    const response = await fetch("/api/product/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();

    console.log(result);

    const formattedProducts: Product[] = result["products"].map(
      (item: any) => ({
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
      })
    );

    setProducts(formattedProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-5">
      <Heading
        title="Shop"
        description="Welcome to the world of custom mechanical keyboards! At Kinetic Labs we painstakingly vet our products to ensure all of our keycaps, switches, desk mats, and accessories help you build the keyboard that will make you most productive."
        className="w-1/2 mb-5"
      />
      <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2">
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

export default ShopPage;
