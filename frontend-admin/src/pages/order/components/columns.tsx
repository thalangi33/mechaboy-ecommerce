import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
  id: string;
  orderItems: any[];
  isPaid: boolean;
  phone: string;
  address: string;
  updatedAt: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    header: "Order items",
    id: "orderItem",
    cell: ({ row }) => (
      <div className="items-center">
        {row.original.orderItems.map((orderItem) => (
          <div className="inline-flex items-center justify-center gap-x-3">
            <div>{orderItem.product.name}</div>
            <div>${orderItem.product.price}</div>
            <div className="flex items-center gap-x-2">
              <div>{orderItem.color.name}</div>
              <div
                className="border p-2 rounded-full"
                style={{ backgroundColor: orderItem.color.value }}
              ></div>
            </div>
            <div>Quantity: {orderItem.quantity}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "isPaid",
    header: "IsPaid",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated date",
  },
  {
    accessorKey: "createdAt",
    header: "Created date",
  },
];
