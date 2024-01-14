import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CategoryForm from "./components/category-form";

const CategoryEditPage = () => {
  const createFlag = useLocation().pathname.includes("new");
  const [category, setCategory] = useState<any>(null);
  const [subcategories, setSubcategories] = useState<any>([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
      if (createFlag === false) {
        const response = await fetch(
          `http://localhost:4000/api/category/${id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        const result = await response.json();

        console.log(result);

        setCategory({
          id: result.category._id,
          name: result.category.name,
          description: result.category.description,
          subcategories: result.category.subcategories,
        });
      }
    };

    const fetchSubcategories = async () => {
      const response = await fetch("http://localhost:4000/api/subcategory/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();

      console.log(result);

      setSubcategories([...result.subcategories]);
    };

    fetchCategory();
    fetchSubcategories();
  }, []);
  return (
    <div className="p-8 pt-6">
      {category && (
        <CategoryForm
          initialData={category}
          subcategoryChoices={subcategories}
        />
      )}
      {createFlag && (
        <CategoryForm initialData={null} subcategoryChoices={subcategories} />
      )}
    </div>
  );
};

export default CategoryEditPage;
