import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Plus } from "lucide-react";

import Heading from "../../components/ui/heading";
import { Button } from "../../components/ui/button";
import { DataTable } from "./components/data-table";
import { ColorColumn, columns } from "./components/columns";
import { useNavigate } from "react-router-dom";

const ColorPage = () => {
  const [colors, setColors] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
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
          value: item.value,
          createdAt: format(Date.parse(item.createdAt), "MMMM do, yyyy"),
        }),
      );

      setColors(formattedColors);
    };

    fetchColors();
  }, []);

  return (
    <div className="space-y-4 p-8 pt-6">
      <div className="flex flex-row items-center">
        <Heading title="Color" description="Create colors for your products" />
        <Button className="ml-auto" onClick={() => navigate("/color/new")}>
          <Plus /> Add new
        </Button>
      </div>
      {colors && <DataTable columns={columns} data={colors} />}
    </div>
  );
};

export default ColorPage;
