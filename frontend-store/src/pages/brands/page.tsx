import React, { useEffect, useState } from "react";
import { format } from "date-fns";

import Heading from "../../components/ui/heading";
import ProductCard from "../../components/ui/product-card";
import ProductCardSkeleton from "../../components/ui/product-card-skeleton";
import { useLocation } from "react-router-dom";
import HeadingSkeleton from "../../components/ui/heading-skeleton";

const BrandPage = () => {
  const [brand, setBrand] = useState<any>(null);
  const [products, setProducts] = useState<any>(null);

  const location = useLocation();

  const fetchBrand = async () => {
    const response = await fetch(
      `/api/brand/?pathname=${location.pathname.split("/")[2]}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const result = await response.json();
    console.log(result);

    setBrand(result["brand"]);
  };

  const fetchProducts = async () => {
    const response = await fetch(
      `/api/product/brand/?pathname=${location.pathname.split("/")[2]}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
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
    fetchBrand();
    fetchProducts();
  }, []);

  return (
    <div className="p-5">
      {brand ? (
        <Heading
          title={brand.name}
          description={brand.description}
          className="w-1/2 mb-5"
        />
      ) : (
        <HeadingSkeleton />
      )}
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

export default BrandPage;
