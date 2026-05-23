import { useEffect, useState } from "react";
import OrderCard from "../components/ OrderCard";

export default function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4028/api/save-order")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">Orders Dashboard</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-[#C9A84C] text-white">
            <th className="p-4">Customer</th>

            <th>Phone</th>

            <th>Amount</th>

            <th>Status</th>

            <th>Date</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order: any) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
