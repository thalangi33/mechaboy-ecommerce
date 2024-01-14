import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Plus } from "lucide-react";

import Heading from "../../components/ui/heading";
import { Button } from "../../components/ui/button";
import { DataTable } from "./components/data-table";
import { BrandColumn, columns } from "./components/columns";
import { useNavigate } from "react-router-dom";

const BrandPage = () => {
  const [brands, setBrands] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchBrands();
  }, []);

  return (
    <div className="space-y-4 p-8 pt-6">
      <div className="flex flex-row items-center">
        <Heading title="Brand" description="Create brands for your products" />
        <Button className="ml-auto" onClick={() => navigate("/brand/new")}>
          <Plus /> Add new
        </Button>
      </div>
      {brands && <DataTable columns={columns} data={brands} />}
    </div>
  );
};

export default BrandPage;
