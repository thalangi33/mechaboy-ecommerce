import { ColumnDef } from "@tanstack/react-table";

import CellAction from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    header: "Value",
    id: "value",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-4">
        <div>{row.original.value}</div>
        <div
          className="border p-3 rounded-full"
          style={{ backgroundColor: row.original.value }}
        ></div>
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
