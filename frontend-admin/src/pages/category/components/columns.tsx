import { ColumnDef } from "@tanstack/react-table";

import CellAction from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
  id: string;
  name: string;
  description: string;
  subcategories: any[];
  createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "subcategories",
    header: "Subcategories",
    cell: ({ row }) => (
      <div className="space-y-2">
        {row.original.subcategories &&
          row.original.subcategories.map((subcategory) => (
            <div>{subcategory.name}</div>
          ))}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
