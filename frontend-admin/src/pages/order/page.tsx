import React, { useEffect, useState } from "react";
import { format } from "date-fns";

import Heading from "../../components/ui/heading";
import { DataTable } from "./components/data-table";
import { OrderColumn, columns } from "./components/columns";

const OrderPage = () => {
  const [orders, setOrders] = useState<any>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("http://localhost:4000/api/order/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();

      console.log(result);

      const formattedOrders: OrderColumn[] = result["orders"].map(
        (item: any) => ({
          id: item._id,
          orderItems: item.orderItems,
          isPaid: item.isPaid,
          phone: item.phone,
          address: item.address,
          updatedAt: format(Date.parse(item.updatedAt), "MMMM do, yyyy"),
          createdAt: format(Date.parse(item.createdAt), "MMMM do, yyyy"),
        }),
      );

      setOrders(formattedOrders);
    };

    fetchOrders();
  }, []);

  return (
    <div className="space-y-4 p-8 pt-6">
      <div className="flex flex-row items-center">
        <Heading title="Order" description="Manage orders from the store" />
      </div>
      {orders && <DataTable columns={columns} data={orders} />}
    </div>
  );
};

export default OrderPage;
