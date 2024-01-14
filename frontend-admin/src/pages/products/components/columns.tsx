import { ColumnDef } from "@tanstack/react-table";

import CellAction from "./cell-actions";
import { IImage } from "./product-form";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string;
  name: string;
  urlName: string;
  description: string;
  category: string;
  brand: string;
  colorQuantity: any[];
  price: number;
  sold: number;
  images: IImage[];
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "pathname",
    header: "Pathname",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <>
        <p className="line-clamp-5">{row.original.description}</p>
      </>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  // {
  //   accessorKey: "subcategory",
  //   header: "Subcategory",
  // },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "colorQuantity",
    header: "Color & Quantity",
    cell: ({ row }) => (
      <>
        {row.original.colorQuantity.map((colorQuantity) => (
          <>
            <div className="flex items-center gap-x-2">
              {colorQuantity.color.name}
              <div
                className="border p-2 rounded-full"
                style={{ backgroundColor: colorQuantity.color.value }}
              ></div>
            </div>
            Quantity: {colorQuantity.quantity}
          </>
        ))}
      </>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "sold",
    header: "Sold",
  },
  {
    header: "Images",
    cell: ({ row }) => (
      <>
        {row.original.images[0] && (
          <img src={row.original.images[0].key} className="w-32" />
        )}
      </>
    ),
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
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
