import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Plus } from "lucide-react";

import Heading from "../../components/ui/heading";
import { Button } from "../../components/ui/button";
import { DataTable } from "./components/data-table";
import { ProductColumn, columns } from "./components/columns";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const [products, setProducts] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:4000/api/product/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();

      console.log(result);

      const formattedProducts: ProductColumn[] = result["products"].map(
        (item: any) => ({
          id: item._id,
          name: item.name,
          pathname: item.pathname,
          description: item.description,
          category: item.category.name,
          subcategory: item.subcategory.name,
          brand: item.brand.name,
          colorQuantity: item.colorQuantity,
          price: item.price,
          sold: item.sold,
          images: item.images,
          isFeatured: item.isFeatured,
          isArchived: item.isArchived,
          createdAt: format(Date.parse(item.createdAt), "MMMM do, yyyy"),
        }),
      );

      setProducts(formattedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div className="space-y-4 p-8 pt-6">
      <div className="flex flex-row items-center">
        <Heading
          title="Product"
          description="Create products for your products"
        />
        <Button className="ml-auto" onClick={() => navigate("/product/new")}>
          <Plus /> Add new
        </Button>
      </div>
      {products && <DataTable columns={columns} data={products} />}
    </div>
  );
};

export default ProductPage;
