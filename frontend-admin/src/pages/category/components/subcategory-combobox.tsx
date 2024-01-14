"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";

interface ISubcategory {
  name: string;
  description: string;
}

interface ComboboxDemoProps {
  index: number;
  setSelectedSubcategories: any;
  subcategories: any;
  selectedSubcategory: any;
  subcategoryChoices: any[];
}

const ComboboxDemo: React.FC<ComboboxDemoProps> = ({
  index,
  setSelectedSubcategories,
  subcategories,
  selectedSubcategory,
  subcategoryChoices,
}) => {
  const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState(subcategory);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
          defaultValue={selectedSubcategory.name}
        >
          {selectedSubcategory.name
            ? selectedSubcategory.name
            : "Select subcategory"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search subcategory" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {subcategoryChoices.map((subcategoryChoice: any) => (
              <CommandItem
                defaultValue={selectedSubcategory.name}
                key={subcategoryChoice.name}
                onSelect={(currentValue) => {
                  console.log(currentValue);
                  console.log(subcategoryChoice.name.toLowerCase());

                  subcategories[index].name = subcategoryChoice.name;
                  subcategories[index]._id = subcategoryChoice._id;

                  setSelectedSubcategories([...subcategories]);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedSubcategory.name === subcategoryChoice.name
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {subcategoryChoice.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboboxDemo;
