import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Plus } from "lucide-react";

import Heading from "../../components/ui/heading";
import { Button } from "../../components/ui/button";
import { DataTable } from "./components/data-table";
import { CategoryColumn, columns } from "./components/columns";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const [categories, setCategories] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:4000/api/category/", {
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

    fetchCategories();
  }, []);

  return (
    <div className="space-y-4 p-8 pt-6">
      <div className="flex flex-row items-center">
        <Heading
          title="Category"
          description="Create categories for your products"
        />
        <Button className="ml-auto" onClick={() => navigate("/category/new")}>
          <Plus /> Add new
        </Button>
      </div>
      {categories && <DataTable columns={columns} data={categories} />}
    </div>
  );
};

export default CategoryPage;
