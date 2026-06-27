import { useEffect, useState } from "react";

interface OrderItem {
  product: {
    name: string;
    images: string[];
  };
  variant: {
    price: number;
    size: string;
  };
  quantity: number;
}

interface Order {
  id: string;
  amount: number;
  status: string;
  created_at: string;
  payment_id: string;
  address: string;
  items: OrderItem[];
}

interface Customer {
  id: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  created_at: string;
  orders: Order[];
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Customer | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

useEffect(() => {
  async function load() {
    try {
      const res = await fetch("https://sanlumiere.in/api/save-order");
      const data = await res.json();

      console.log(data);

      const groupedCustomers: Customer[] = [];

      data.orders.forEach((order: any) => {
        const existing = groupedCustomers.find(
          (c) =>
            c.email === order.email &&
            c.mobile === order.mobile
        );

        const orderData: Order = {
          id: order.order_id || order.id.toString(),
          amount: order.amount,
          status: order.status,
          created_at: order.created_at,
          payment_id: order.payment_id,
          address: `${order.address} ${order.pincode}`,
          items: order.items,
        };

        if (existing) {
          existing.orders.push(orderData);
        } else {
          groupedCustomers.push({
            id: order.id,
            name: order.name,
            email: order.email,
            mobile: order.mobile,
            address: order.address,
            created_at: order.created_at,
            orders: [orderData],
          });
        }
      });

      setCustomers(groupedCustomers);
    } catch (err) {
      console.error(err);
      setCustomers([]);
    } finally {
    }
  }

  load();
}, []);

  const filtered = customers.filter((customer) => {
  const keyword = search.toLowerCase();

  return (
    customer.name?.toLowerCase().includes(keyword) ||
    customer.email?.toLowerCase().includes(keyword) ||
    customer.mobile?.toLowerCase().includes(keyword)
  );
});

const totalSpent = (customer: Customer) => {
  return (
    customer.orders?.reduce((sum, order) => sum + Number(order.amount || 0), 0) ??
    0
  );
};

  if (selected) {
    return (
      <div className="min-h-screen bg-white font-sans">
        {/* Topbar */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => { setSelected(null); setSelectedOrder(null); }}
              className="text-xs text-gray-400 border border-gray-200 px-3 py-2 rounded hover:border-gray-400 hover:text-gray-600 transition-all"
            >
              ← Back
            </button>
            <div>
              <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-0.5">
                Customers / <span className="text-[#C9A84C]">Details</span>
              </p>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">{selected.name}</h1>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-8 py-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">

          {/* Left — Order History */}
          <div className="flex flex-col gap-5">
            <Card title="Order History">
              {(!selected.orders || selected.orders.length === 0) ? (
                <p className="text-sm text-gray-300 text-center py-6">No orders found</p>
              ) : (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        {["Order ID", "Date", "Amount", "Status", ""].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {selected.orders?.map((order) => (
                        <tr
                          key={order.id}
                          className={`border-b border-gray-100 last:border-0 transition-colors ${
                            selectedOrder?.id === order.id ? "bg-[#fdf8ec]" : "hover:bg-gray-50"
                          }`}
                        >
                          <td className="px-4 py-3 text-xs font-mono text-gray-400">{order.id}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {new Date(order.created_at).toLocaleDateString("en-IN", {
                              day: "2-digit", month: "short", year: "numeric",
                            })}
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-[#C9A84C]">
                            ₹{order.amount.toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                              order.status === "paid"
                                ? "bg-green-50 text-green-600 border border-green-200"
                                : "bg-red-50 text-red-500 border border-red-200"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${order.status === "paid" ? "bg-green-500" : "bg-red-400"}`} />
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() =>
                                setSelectedOrder(selectedOrder?.id === order.id ? null : order)
                              }
                              className={`text-xs font-bold uppercase tracking-wide px-4 py-1.5 rounded transition-all ${
                                selectedOrder?.id === order.id
                                  ? "bg-white border border-[#C9A84C] text-[#C9A84C]"
                                  : "bg-[#C9A84C] text-white hover:bg-[#b8963e]"
                              }`}
                            >
                              {selectedOrder?.id === order.id ? "Close" : "View"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>

            {/* Expanded Order Items */}
            {selectedOrder && (
              <Card title="Order Items">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs font-mono text-gray-400">{selectedOrder.id}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{selectedOrder.address}</p>
                  </div>
                  <p className="text-xs font-mono text-gray-300 text-right">{selectedOrder.payment_id}</p>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        {["Image", "Product", "Size", "Qty", "Price"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, i) => (
                        <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="h-14 w-14 object-cover rounded-lg border border-gray-200"
                            />
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.product.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-400">{item.variant.size}</td>
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
                        <td colSpan={4} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Total
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-[#C9A84C]">
                          ₹{selectedOrder.amount.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </Card>
            )}
          </div>

          {/* Right — Customer Info */}
          <div className="flex flex-col gap-5">
            {/* Avatar card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#fdf8ec] border-2 border-[#C9A84C] flex items-center justify-center text-2xl font-bold text-[#C9A84C] mb-3">
                {selected.name.charAt(0).toUpperCase()}
              </div>
              <p className="text-base font-bold text-gray-900">{selected.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Customer since{" "}
                {new Date(selected.created_at).toLocaleDateString("en-IN", {
                  month: "short", year: "numeric",
                })}
              </p>
            </div>

            {/* Contact Info */}
            <Card title="Contact Info">
              {[
                { label: "Email", val: selected.email },
                { label: "Phone", val: selected.mobile },
                { label: "Address", val: selected.address },
              ].map((row) => (
                <div key={row.label} className="mb-4 last:mb-0">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-1">{row.label}</p>
                  <p className="text-sm text-gray-800 font-medium leading-snug">{row.val || "—"}</p>
                </div>
              ))}
            </Card>

            {/* Stats */}
            <Card title="Stats">
              {[
                { label: "Total Orders", val: selected.orders?.length ?? 0, gold: false },
                { label: "Total Spent", val: `₹${totalSpent(selected).toLocaleString()}`, gold: true },
                {
                  label: "Paid Orders",
                  val: selected.orders?.filter((o) => o.status === "paid").length ?? 0,
                  gold: false,
                },
                {
                  label: "Pending",
                  val: selected.orders?.filter((o) => o.status !== "paid").length ?? 0,
                  gold: false,
                },
              ].map((row, i, arr) => (
                <div
                  key={row.label}
                  className={`flex justify-between items-center py-2 ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <span className="text-[11px] text-gray-400">{row.label}</span>
                  <span className={`text-sm font-bold ${row.gold ? "text-[#C9A84C]" : "text-gray-800"}`}>
                    {row.val}
                  </span>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    );
  }

  /* ── Customer Table ── */
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Topbar */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-0.5">Admin</p>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Customers</h1>
        </div>
        <div className="flex items-center gap-3">
          <input
            className="text-sm bg-gray-50 border border-gray-200 rounded px-4 py-2 outline-none focus:border-[#C9A84C] focus:bg-white transition-colors w-64 placeholder:text-gray-300"
            placeholder="Search by name, email or phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="text-xs text-gray-400 bg-gray-50 border border-gray-200 rounded px-3 py-2">
            {filtered.length} customers
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {["Customer", "Email", "Phone", "Orders", "Total Spent", "Joined", ""].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-sm text-gray-300">
                    No customers found
                  </td>
                </tr>
              ) : (
                filtered.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#fdf8ec] border border-[#C9A84C] flex items-center justify-center text-xs font-bold text-[#C9A84C] flex-shrink-0">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-gray-800">{customer.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">{customer.email}</td>
                    <td className="px-5 py-4 text-sm text-gray-500">{customer.mobile}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#fdf8ec] border border-[#C9A84C] text-[#C9A84C] text-xs font-bold">
                        {customer.orders?.length ?? 0}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-[#C9A84C]">
                      ₹{totalSpent(customer).toLocaleString()}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-400">
                      {new Date(customer.created_at).toLocaleDateString("en-IN", {
                        day: "2-digit", month: "short", year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => { setSelected(customer); setSelectedOrder(null); }}
                        className="text-xs font-bold uppercase tracking-wide bg-[#C9A84C] text-white px-4 py-1.5 rounded hover:bg-[#b8963e] transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Shared sub-component ── */
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <p className="text-[10px] font-semibold tracking-[2px] uppercase text-[#C9A84C] mb-5 pb-3 border-b border-[#fdf3dc]">
        {title}
      </p>
      {children}
    </div>
  );
}