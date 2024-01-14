import React from "react";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { cn } from "../lib/utils";

interface FilterTabProps {
  filters: string[];
  setFilters: React.Dispatch<any>;
  className?: string;
}

const FilterTab = ({ filters, setFilters, className }: FilterTabProps) => {
  const subcategories = ["Clicky", "Tactile", "Linear"];
  return (
    <div className={cn("", className)}>
      <div className="font-bold text-lg">Filter By:</div>
      <Separator className="my-2" />
      <div className="mb-2 font-bold text-lg">SWITCH TYPE</div>
      <div className="flex flex-col space-y-2">
        {subcategories.map((subcategory: string) => (
          <div className="flex items-center space-x-2" key={subcategory}>
            <Checkbox
              className="h-5 w-5"
              onClick={() => {
                filters.includes(subcategory.toLowerCase())
                  ? setFilters((prevState: string[]) => [
                      ...prevState.filter(
                        (item) =>
                          item.toLowerCase() !== subcategory.toLowerCase()
                      ),
                    ])
                  : setFilters((prevState: string[]) => [
                      ...prevState,
                      subcategory.toLowerCase(),
                    ]);
              }}
            />
            <label className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {subcategory}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterTab;
