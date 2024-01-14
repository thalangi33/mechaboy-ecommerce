import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ColorForm from "./components/color-form";

const ColorEditPage = () => {
  const createFlag = useLocation().pathname.includes("new");
  const [color, setColor] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`http://localhost:4000/api/color/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();

      console.log(result);

      if (createFlag === false) {
        setColor({
          id: result.color._id,
          name: result.color.name,
          value: result.color.value,
        });
      }
    };

    fetchCategories();
  }, []);
  return (
    <div className="p-8 pt-6">
      {color && <ColorForm initialData={color} />}
      {createFlag && <ColorForm initialData={null} />}
    </div>
  );
};

export default ColorEditPage;
