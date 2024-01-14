import { format } from "date-fns";
import React, { useEffect, useState } from "react";

import Breadcrumb from "../../../components/breadcrumb";
import Heading from "../../../components/ui/heading";
import { DataTable } from "./components/data-table";
import { OrderColumn, columns } from "./components/columns";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { Spinner } from "../../../components/ui/spinner";

const OrdersPage = () => {
  const [orders, setOrders] = useState<any>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("/api/order/getOrders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: user.token }),
      });
      const result = await response.json();

      console.log(result);

      const formattedOrders: OrderColumn[] = result["orders"].map(
        (item: any) => ({
          id: item._id,
          orderItems: item.orderItems,
          phone: item.phone,
          address: item.address,
          createdAt: format(Date.parse(item.createdAt), "MMMM do, yyyy"),
        })
      );

      setOrders(formattedOrders);
    };

    fetchOrders();
  }, []);
  return (
    <div className="p-5">
      {/* <Breadcrumb /> */}
      <Heading
        title="Orders"
        description="Check, inquire and review your current and past orders"
      />
      {orders ? (
        <DataTable columns={columns} data={orders} />
      ) : (
        <div className="flex justify-center mt-20">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
