import { useState } from "react";

interface OrderCardProps {
  order: any;
}

export default function OrderCard({ order }: OrderCardProps) {
  const [open, setOpen] = useState(false);

  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <>
      {/* Main Table Row */}

      <tr className="border-b hover:bg-gray-50">
        <td className="p-4">{order.name}</td>

        <td className="p-4">{order.mobile}</td>

        <td className="p-4">₹{order.amount}</td>

        <td className="p-4">
          <span
            className={`rounded px-3 py-1 text-sm

          ${
            order.status === "paid"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }

          `}
          >
            {order.status}
          </span>
        </td>

        <td className="p-4">
          {new Date(order.created_at).toLocaleDateString()}
        </td>

        <td className="p-4">
          <button
            onClick={() => setOpen(!open)}
            className="rounded bg-[#C9A84C] px-4 py-2 text-white"
          >
            {open ? "Close" : "View"}
          </button>
        </td>
      </tr>

      {/* Expanded Details */}

      {open && (
        <tr>
          <td colSpan={6} className="bg-gray-50 p-6">
            <div>
              <h3 className="mb-4 text-xl font-bold text-[#C9A84C]">
                Order Details
              </h3>

              <div className="grid md:grid-cols-4 gap-5 mb-6">
                <div>
                  <p>Email</p>

                  <h4>{order.email}</h4>
                </div>

                <div>
                  <p>Phone</p>

                  <h4>{order.mobile}</h4>
                </div>

                <div>
                  <p>Address</p>

                  <h4>{order.address}</h4>
                </div>

                <div>
                  <p>Payment ID</p>

                  <h4>{order.payment_id}</h4>
                </div>
              </div>

              {/* Products */}

              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-3">Image</th>

                    <th className="border p-3">Product</th>

                    <th className="border p-3">Qty</th>

                    <th className="border p-3">Price</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="border p-3">
                        <img
                          src={item.product.images[0]}
                          className="h-16 w-16 object-cover"
                        />
                      </td>

                      <td className="border p-3">{item.product.name}</td>

                      <td className="border p-3">{item.quantity}</td>

                      <td className="border p-3">₹{item.variant.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
