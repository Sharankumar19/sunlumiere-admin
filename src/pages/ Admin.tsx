import { useEffect, useState } from "react";
import OrderCard from "../components/ OrderCard";
import { Link } from "react-router-dom";

export default function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://sanlumiere.in/api/save-order")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}

      <aside className="w-64 bg-black text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-[#C9A84C]">San Lumière</h1>
          <p className="text-sm text-gray-400">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-3">
          <Link to="/">
            <button className="w-full rounded bg-[#C9A84C] px-4 py-3 text-left text-white">
              Orders
            </button>
          </Link>

          <Link to="/products">
            <button className="w-full rounded px-4 py-3 text-left text-white hover:bg-gray-800">
              Products
            </button>
          </Link>

   <Link to="customer">
          <button className="w-full rounded px-4 py-3 text-left hover:bg-gray-800">
            Customers
          </button>
</Link>
          <button className="w-full rounded px-4 py-3 text-left hover:bg-gray-800">
            Settings
          </button>
        </nav>

        <div className="border-t border-gray-700 p-4 text-sm text-gray-400">
          © 2026 San Lumière
        </div>
      </aside>

      {/* Main Content */}

      <div className="flex-1 flex flex-col">
        {/* Navbar */}

        <header className="flex items-center justify-between bg-white px-8 py-5 shadow">
          <div>
            <h2 className="text-2xl font-bold">Orders Dashboard</h2>
            <p className="text-sm text-gray-500">Manage all customer orders</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-[#C9A84C]"></div>

            <div>
              <h4 className="font-semibold">Admin</h4>
              <p className="text-sm text-gray-500">sanlumiere.in</p>
            </div>
          </div>
        </header>

        {/* Orders Table */}

        <main className="flex-1 p-6 overflow-auto">
          <div className="rounded-xl bg-white shadow">
            <div className="border-b p-5">
              <h3 className="text-xl font-bold">Recent Orders</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#C9A84C] text-white">
                    <th className="p-4 text-left">Customer</th>
                    <th className="p-4 text-left">Phone</th>
                    <th className="p-4 text-left">Amount</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Date</th>
                    <th className="p-4 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order: any) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Footer */}

        <footer className="border-t bg-white px-8 py-4 text-center text-sm text-gray-500">
          © 2026 San Lumière Admin Dashboard. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
