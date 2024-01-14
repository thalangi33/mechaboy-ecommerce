import ProductCard from "../../components/ui/product-card";
import Heading from "../../components/ui/heading";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import ProductCardSkeleton from "../../components/ui/product-card-skeleton";
import FilterTab from "../../components/filter-tab";

const SwitchesPage = () => {
  const [products, setProducts] = useState<any>(null);
  const [filters, setFilters] = useState<string[]>([]);

  const fetchProducts = async () => {
    const response = await fetch("/api/product/switches", {
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
        title="Switches"
        description="Switches are what go underneath your mechanical keyboard keycaps. They are linear, tactile, and clicky, depending on how you want them to sound and feel. We've vetted all of the switches below to bring you the best switches in the industry."
        className="w-1/2 mb-5"
      />
      <div className="grid grid-cols-4 gap-x-5 max-lg:grid-cols-3 max-md:grid-cols-2">
        <FilterTab
          filters={filters}
          setFilters={setFilters}
          className="max-lg:hidden"
        />
        <div className="col-span-3 max-md:col-span-2 grid grid-cols-3 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2">
          {products
            ? products
                .filter((product: any) => {
                  if (filters.length === 0) {
                    return product;
                  }
                  if (
                    filters.includes(product.subcategory.name.toLowerCase())
                  ) {
                    return product;
                  }
                })
                .map((product: any) => (
                  <ProductCard
                    product={product}
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
    </div>
  );
};

export default SwitchesPage;
