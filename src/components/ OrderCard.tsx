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
      <tr
        className={`border-b border-gray-100 transition-colors ${
          open ? "bg-[#fdf8ec]" : "bg-white hover:bg-gray-50"
        }`}
      >
        <td className="px-5 py-4 text-sm font-medium text-gray-800">{order.name}</td>
        <td className="px-5 py-4 text-sm text-gray-500">{order.mobile}</td>
        <td className="px-5 py-4 text-sm font-semibold text-gray-800">₹{order.amount}</td>
        <td className="px-5 py-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
              order.status === "paid"
                ? "bg-green-50 text-green-600 border border-green-200"
                : "bg-red-50 text-red-500 border border-red-200"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                order.status === "paid" ? "bg-green-500" : "bg-red-400"
              }`}
            />
            {order.status}
          </span>
        </td>
        <td className="px-5 py-4 text-sm text-gray-400">
          {new Date(order.created_at).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </td>
        <td className="px-5 py-4">
          <button
            onClick={() => setOpen(!open)}
            className={`text-xs font-bold uppercase tracking-wide px-4 py-2 rounded transition-all ${
              open
                ? "bg-white border border-[#C9A84C] text-[#C9A84C] hover:bg-[#fdf8ec]"
                : "bg-[#C9A84C] text-white hover:bg-[#b8963e]"
            }`}
          >
            {open ? "Close" : "View"}
          </button>
        </td>
      </tr>

      {/* Expanded Details */}
      {open && (
        <tr>
          <td colSpan={6} className="p-0 border-b border-gray-200">
            <div className="bg-white border-l-4 border-[#C9A84C] px-8 py-6">

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[10px] font-semibold tracking-[2px] uppercase text-[#C9A84C] mb-0.5">
                    Order Details
                  </p>
                  <h3 className="text-base font-bold text-gray-900">{order.name}</h3>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                    order.status === "paid"
                      ? "bg-green-50 text-green-600 border border-green-200"
                      : "bg-red-50 text-red-500 border border-red-200"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${order.status === "paid" ? "bg-green-500" : "bg-red-400"}`} />
                  {order.status}
                </span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Email", val: order.email },
                  { label: "Phone", val: order.mobile },
                  { label: "Address", val: order.address },
                  { label: "Payment ID", val: order.payment_id, mono: true },
                ].map((info) => (
                  <div
                    key={info.label}
                    className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3"
                  >
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-1">
                      {info.label}
                    </p>
                    <p
                      className={`text-sm text-gray-800 font-medium break-all leading-snug ${
                        info.mono ? "font-mono text-xs text-gray-500" : ""
                      }`}
                    >
                      {info.val || "—"}
                    </p>
                  </div>
                ))}
              </div>

              {/* Products Table */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      {["Image", "Product", "Qty", "Price"].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-gray-400"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item: any, index: number) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <img
                            src={item.product.images[0]}
                            className="h-14 w-14 object-cover rounded-lg border border-gray-200"
                            alt={item.product.name}
                          />
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-800">
                          {item.product.name}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#fdf8ec] border border-[#C9A84C] text-[#C9A84C] text-xs font-bold">
                            {item.quantity}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-[#C9A84C]">
                          ₹{item.variant.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-[#fdf8ec] border-t border-[#fdf3dc]">
                      <td colSpan={3} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Total
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-[#C9A84C]">
                        ₹{order.amount}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

            </div>
          </td>
        </tr>
      )}
    </>
  );
}