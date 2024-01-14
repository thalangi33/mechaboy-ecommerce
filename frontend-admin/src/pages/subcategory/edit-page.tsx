import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import SubcategoryForm from "./components/subcategory-form";

const SubcategoryEditPage = () => {
  const createFlag = useLocation().pathname.includes("new");
  const [subcategory, setSubcategory] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchSubcategories = async () => {
      const response = await fetch(
        `http://localhost:4000/api/subcategory/${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      const result = await response.json();

      console.log(result);

      if (createFlag === false) {
        setSubcategory({
          id: result.subcategory._id,
          name: result.subcategory.name,
          description: result.subcategory.description,
        });
      }
    };

    fetchSubcategories();
  }, []);
  return (
    <div className="p-8 pt-6">
      {subcategory && <SubcategoryForm initialData={subcategory} />}
      {createFlag && <SubcategoryForm initialData={null} />}
    </div>
  );
};

export default SubcategoryEditPage;
