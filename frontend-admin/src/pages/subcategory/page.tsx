import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Plus } from "lucide-react";

import Heading from "../../components/ui/heading";
import { Button } from "../../components/ui/button";
import { DataTable } from "./components/data-table";
import { SubcategoryColumn, columns } from "./components/columns";
import { useNavigate } from "react-router-dom";

const SubcategoryPage = () => {
  const [subcategories, setSubcategories] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubcategories = async () => {
      const response = await fetch("http://localhost:4000/api/subcategory/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();

      console.log(result);

      const formattedSubcategories: SubcategoryColumn[] = result[
        "subcategories"
      ].map((item: any) => ({
        id: item._id,
        name: item.name,
        description: item.description,
        createdAt: format(Date.parse(item.createdAt), "MMMM do, yyyy"),
      }));

      setSubcategories(formattedSubcategories);
    };

    fetchSubcategories();
  }, []);

  return (
    <div className="space-y-4 p-8 pt-6">
      <div className="flex flex-row items-center">
        <Heading
          title="Subcategory"
          description="Create subcategories for your products"
        />
        <Button
          className="ml-auto"
          onClick={() => navigate("/subcategory/new")}
        >
          <Plus /> Add new
        </Button>
      </div>
      {subcategories && <DataTable columns={columns} data={subcategories} />}
    </div>
  );
};

export default SubcategoryPage;
