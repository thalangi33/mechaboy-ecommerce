import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import BrandForm from "./components/brand-form";

const BrandEditPage = () => {
  const createFlag = useLocation().pathname.includes("new");
  const [brand, setBrand] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`http://localhost:4000/api/brand/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();

      console.log(result);

      if (createFlag === false) {
        setBrand({
          id: result.brand._id,
          name: result.brand.name,
          description: result.brand.description,
        });
      }
    };

    fetchCategories();
  }, []);
  return (
    <div className="p-8 pt-6">
      {brand && <BrandForm initialData={brand} />}
      {createFlag && <BrandForm initialData={null} />}
    </div>
  );
};

export default BrandEditPage;
