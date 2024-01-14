import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ProductForm from "./components/product-form";
import { CategoryColumn } from "../category/components/columns";
import { format } from "date-fns";
import { BrandColumn } from "../brand/components/columns";
import { ColorColumn } from "../color/components/columns";

const ProductEditPage = () => {
  const createFlag = useLocation().pathname.includes("new");
  const [product, setProduct] = useState<any>(null);
  const [categories, setCategories] = useState<any>(null);
  const [brands, setBrands] = useState<any>(null);
  const [colors, setColors] = useState<any>(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      if (createFlag === false) {
        const response = await fetch(
          `http://localhost:4000/api/product/${id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        const result = await response.json();

        console.log(result);
        setProduct({
          id: result.product._id,
          pathname: result.product.pathname,
          name: result.product.name,
          description: result.product.description,
          category: result.product.category,
          subcategory: result.product.subcategory,
          brand: result.product.brand,
          colorQuantity: result.product.colorQuantity,
          price: result.product.price,
          sold: result.product.sold,
          images: result.product.images,
          isFeatured: result.product.isFeatured,
          isArchived: result.product.isArchived,
        });
      }
    };

    const fetchCategories = async () => {
      const response = await fetch(`http://localhost:4000/api/category/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();

      console.log(result);

      const formattedCategories: CategoryColumn[] = result["categories"].map(
        (item: any) => ({
          id: item._id,
          name: item.name,
          description: item.description,
          subcategories: item.subcategories,
          createdAt: format(Date.parse(item.createdAt), "MMMM do, yyyy"),
        }),
      );

      setCategories(formattedCategories);
    };

    const fetchBrands = async () => {
      const response = await fetch("http://localhost:4000/api/brand/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();

      console.log(result);

      const formattedBrands: BrandColumn[] = result["brands"].map(
        (item: any) => ({
          id: item._id,
          name: item.name,
          description: item.description,
          createdAt: format(Date.parse(item.createdAt), "MMMM do, yyyy"),
        }),
      );

      setBrands(formattedBrands);
    };

    const fetchColors = async () => {
      const response = await fetch("http://localhost:4000/api/color/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();

      console.log(result);

      const formattedColors: ColorColumn[] = result["colors"].map(
        (item: any) => ({
          id: item._id,
          name: item.name,
          description: item.description,
          createdAt: format(Date.parse(item.createdAt), "MMMM do, yyyy"),
        }),
      );

      setColors(formattedColors);
    };

    fetchProduct();
    fetchCategories();
    fetchBrands();
    fetchColors();
  }, []);
  return (
    <div className="p-8 pt-6">
      {product && categories && brands && (
        <ProductForm
          initialData={product}
          categories={categories}
          brands={brands}
          colors={colors}
        />
      )}
      {createFlag && categories && brands && (
        <ProductForm
          initialData={null}
          categories={categories}
          brands={brands}
          colors={colors}
        />
      )}
    </div>
  );
};

export default ProductEditPage;
