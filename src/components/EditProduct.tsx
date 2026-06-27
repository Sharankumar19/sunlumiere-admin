// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export default function EditProduct() {
//   const { id } = useParams();
//   const [product, setProduct] = useState<any>(null);

//   useEffect(() => {
//     async function loadProduct() {
//       const res = await fetch(`/api/products/${id}`);
//       const data = await res.json();
//       setProduct(data);
//     }

//     loadProduct();
//   }, [id]);

//   if (!product) return <h2>Loading...</h2>;

//   return (
//     <div className="max-w-4xl mx-auto p-8 space-y-4">
//       {/* Name */}
//       <h2 className="font-bold text-xl">Name</h2>
//       <input
//         className="w-full border p-3 rounded"
//         value={product.name}
//         onChange={(e) => setProduct({ ...product, name: e.target.value })}
//       />

//       {/* Subtitle */}
//       <h2 className="font-bold text-xl">Subtitle </h2>
//       <input
//         className="w-full border p-3 rounded"
//         value={product.subtitle}
//         onChange={(e) => setProduct({ ...product, subtitle: e.target.value })}
//       />

//       {/* Category */}
//       <h2 className="font-bold text-xl">Category</h2>
//       <input
//         className="w-full border p-3 rounded"
//         value={product.category}
//         onChange={(e) => setProduct({ ...product, category: e.target.value })}
//       />

//       {/* Badge */}
//       <h2 className="font-bold text-xl">Badge</h2>

//       <input
//         className="w-full border p-3 rounded"
//         value={product.badge}
//         onChange={(e) => setProduct({ ...product, badge: e.target.value })}
//       />

//       {/* Rating */}
//       <h2 className="font-bold text-xl">Rating</h2>
//       <input
//         className="w-full border p-3 rounded"
//         value={product.rating}
//         onChange={(e) => setProduct({ ...product, rating: e.target.value })}
//       />

//       {/* Review Count */}
//       <h2 className="font-bold text-xl">Review Count</h2>
//       <input
//         type="number"
//         className="w-full border p-3 rounded"
//         value={product.reviewCount}
//         onChange={(e) =>
//           setProduct({
//             ...product,
//             reviewCount: Number(e.target.value),
//           })
//         }
//       />

//       {/* Short Description */}
//       <h2 className="font-bold text-xl">Short Description</h2>
//       <textarea
//         className="w-full border p-3 rounded"
//         rows={3}
//         value={product.shortDescription}
//         onChange={(e) =>
//           setProduct({
//             ...product,
//             shortDescription: e.target.value,
//           })
//         }
//       />

//       {/* Description */}
//       <h2 className="font-bold text-xl">Description</h2>
//       <textarea
//         className="w-full border p-3 rounded"
//         rows={6}
//         value={product.description}
//         onChange={(e) =>
//           setProduct({
//             ...product,
//             description: e.target.value,
//           })
//         }
//       />

//       <h2 className="font-bold text-xl">Images</h2>

//       {product.images.map((img: string, index: number) => (
//         <input
//           key={index}
//           className="w-full border p-3 rounded"
//           value={img}
//           onChange={(e) => {
//             const images = [...product.images];
//             images[index] = e.target.value;
//             setProduct({
//               ...product,
//               images,
//             });
//           }}
//         />
//       ))}

//       <h2 className="font-bold text-xl">Variant</h2>

//       {/* Size */}
//       <input
//         className="w-full border p-3 rounded"
//         value={product.variants[0].size}
//         onChange={(e) => {
//           const variants = [...product.variants];
//           variants[0].size = e.target.value;
//           setProduct({
//             ...product,
//             variants,
//           });
//         }}
//       />

//       {/* Price */}
//       <h2 className="font-bold text-xl">Price</h2>
//       <input
//         type="number"
//         className="w-full border p-3 rounded"
//         value={product.variants[0].price}
//         onChange={(e) => {
//           const variants = [...product.variants];
//           variants[0].price = Number(e.target.value);
//           setProduct({
//             ...product,
//             variants,
//           });
//         }}
//       />

//       {/* Original Price */}
//       <h2 className="font-bold text-xl">Original Price</h2>
//       <input
//         type="number"
//         className="w-full border p-3 rounded"
//         value={product.variants[0].originalPrice}
//         onChange={(e) => {
//           const variants = [...product.variants];
//           variants[0].originalPrice = Number(e.target.value);
//           setProduct({
//             ...product,
//             variants,
//           });
//         }}
//       />

//       {/* Stock */}
//       <h2 className="font-bold text-xl">Stock</h2>
//       <input
//         type="number"
//         className="w-full border p-3 rounded"
//         value={product.variants[0].stock}
//         onChange={(e) => {
//           const variants = [...product.variants];
//           variants[0].stock = Number(e.target.value);
//           setProduct({
//             ...product,
//             variants,
//           });
//         }}
//       />

//       {/* Ingredients */}
//       <h2 className="font-bold text-xl">Ingredients</h2>

//       <textarea
//         className="w-full border p-3 rounded"
//         value={product.ingredients.join(", ")}
//         onChange={(e) =>
//           setProduct({
//             ...product,
//             ingredients: e.target.value.split(",").map((item) => item.trim()),
//           })
//         }
//       />

//       <h2 className="font-bold text-xl">Benefits</h2>

//       <textarea
//         className="w-full border p-3 rounded"
//         value={product.benefits.join(", ")}
//         onChange={(e) =>
//           setProduct({
//             ...product,
//             benefits: e.target.value.split(",").map((item) => item.trim()),
//           })
//         }
//       />

//       <h2 className="font-bold text-xl">Skin Type</h2>

//       <textarea
//         className="w-full border p-3 rounded"
//         value={product.skinType.join(", ")}
//         onChange={(e) =>
//           setProduct({
//             ...product,
//             skinType: e.target.value.split(",").map((item) => item.trim()),
//           })
//         }
//       />

//       <button
//         className="bg-green-600 text-white px-6 py-3 rounded"
//         onClick={async () => {
//           await fetch(`/api/products/${id}`, {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(product),
//           });

//           alert("Product updated successfully");
//         }}
//       >
//         Update Product
//       </button>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Variant {
  size: string;
  price: number;
  originalPrice: number;
  stock: number;
}

interface Product {
  name: string;
  subtitle: string;
  category: string;
  badge: string;
  rating: string | number;
  reviewCount: number;
  shortDescription: string;
  description: string;
  images: string[];
  variants: Variant[];
  ingredients: string[];
  benefits: string[];
  skinType: string[];
  status?: string;
}

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      if (!data.status) data.status = "Active";
      setProduct(data);
    }
    loadProduct();
  }, [id]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async () => {
    if (!product) return;
    setSaving(true);
    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    setSaving(false);
    showToast("Product saved successfully");
  };

  const updateVariant = (key: keyof Variant, value: string | number) => {
    if (!product) return;
    const variants = [...product.variants];
    (variants[0] as any)[key] = value;
    setProduct({ ...product, variants });
  };

  const updateImage = (index: number, value: string) => {
    if (!product) return;
    const images = [...product.images];
    images[index] = value;
    setProduct({ ...product, images });
  };

  const addImage = () => {
    if (!product) return;
    setProduct({ ...product, images: [...product.images, ""] });
  };

  const removeImage = (index: number) => {
    if (!product) return;
    setProduct({ ...product, images: product.images.filter((_, i) => i !== index) });
  };

  const discount =
    product?.variants[0]?.originalPrice && product?.variants[0]?.price
      ? Math.round(
          ((product.variants[0].originalPrice - product.variants[0].price) /
            product.variants[0].originalPrice) *
            100
        )
      : 0;

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-[#C9A84C] rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading product…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-6 z-50 flex items-center gap-2 bg-white border border-[#C9A84C] text-[#C9A84C] px-5 py-3 rounded shadow-lg text-sm font-medium">
          <span className="font-bold">✓</span> {toast}
        </div>
      )}

      {/* Topbar */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-xs text-gray-400 border border-gray-200 px-3 py-2 rounded hover:border-gray-400 hover:text-gray-600 transition-all"
          >
            ← Back
          </button>
          <div>
            <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-0.5">
              Products / <span className="text-[#C9A84C]">Edit</span>
            </p>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Edit Product</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-xs text-gray-400 border border-gray-200 px-4 py-2 rounded hover:border-gray-400 hover:text-gray-600 transition-all"
          >
            Discard
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="text-xs font-bold uppercase tracking-wide bg-[#C9A84C] text-white px-5 py-2 rounded hover:bg-[#b8963e] transition-colors disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-8 py-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">

        {/* ── Left Column ── */}
        <div className="flex flex-col gap-5">

          {/* Basic Info */}
          <Card title="Basic Information">
            <Field label="Product Name">
              <Input
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
              />
            </Field>
            <Field label="Subtitle">
              <Input
                value={product.subtitle}
                onChange={(e) => setProduct({ ...product, subtitle: e.target.value })}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Category">
                <Input
                  value={product.category}
                  onChange={(e) => setProduct({ ...product, category: e.target.value })}
                />
              </Field>
              <Field label="Badge">
                <Input
                  value={product.badge}
                  onChange={(e) => setProduct({ ...product, badge: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Short Description">
              <Textarea
                rows={2}
                value={product.shortDescription}
                onChange={(e) => setProduct({ ...product, shortDescription: e.target.value })}
              />
            </Field>
            <Field label="Full Description">
              <Textarea
                rows={5}
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
              />
            </Field>
          </Card>

          {/* Variant & Pricing */}
          <Card title="Variant & Pricing">
            <div className="grid grid-cols-3 gap-4">
              <Field label="Size">
                <Input
                  value={product.variants[0].size}
                  onChange={(e) => updateVariant("size", e.target.value)}
                />
              </Field>
              <Field label="Price (₹)">
                <Input
                  type="number"
                  value={product.variants[0].price}
                  onChange={(e) => updateVariant("price", Number(e.target.value))}
                />
              </Field>
              <Field label="Original Price (₹)">
                <Input
                  type="number"
                  value={product.variants[0].originalPrice}
                  onChange={(e) => updateVariant("originalPrice", Number(e.target.value))}
                />
              </Field>
            </div>
            <Field label="Stock">
              <Input
                type="number"
                value={product.variants[0].stock}
                onChange={(e) => updateVariant("stock", Number(e.target.value))}
                className="max-w-[180px]"
              />
            </Field>
          </Card>

          {/* Formulation */}
          <Card title="Formulation Details">
            <Field label="Ingredients (comma-separated)">
              <Textarea
                rows={3}
                value={product.ingredients.join(", ")}
                onChange={(e) =>
                  setProduct({ ...product, ingredients: e.target.value.split(",").map((s) => s.trim()) })
                }
              />
            </Field>
            <Field label="Benefits (comma-separated)">
              <Textarea
                rows={2}
                value={product.benefits.join(", ")}
                onChange={(e) =>
                  setProduct({ ...product, benefits: e.target.value.split(",").map((s) => s.trim()) })
                }
              />
            </Field>
            <Field label="Skin Type (comma-separated)">
              <Textarea
                rows={2}
                value={product.skinType.join(", ")}
                onChange={(e) =>
                  setProduct({ ...product, skinType: e.target.value.split(",").map((s) => s.trim()) })
                }
              />
            </Field>
          </Card>
        </div>

        {/* ── Right Column ── */}
        <div className="flex flex-col gap-5">

          {/* Status */}
          <Card title="Status">
            <div className="flex gap-2 mb-3">
              {["Active", "Draft", "Archived"].map((s) => (
                <button
                  key={s}
                  onClick={() => setProduct({ ...product, status: s })}
                  className={`text-[11px] font-medium px-3 py-1.5 rounded-full border transition-all ${
                    product.status === s
                      ? "bg-[#fdf8ec] border-[#C9A84C] text-[#C9A84C]"
                      : "border-gray-200 text-gray-400 hover:border-gray-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-gray-300 font-mono bg-gray-50 border border-gray-100 rounded px-3 py-2">
              ID: {String(id)}
            </p>
          </Card>

          {/* Rating */}
          <Card title="Rating">
            <p className="text-4xl font-bold text-[#C9A84C] leading-none">{product.rating}</p>
            <p className="text-[#C9A84C] tracking-widest text-sm mt-1 mb-0.5">★★★★★</p>
            <p className="text-xs text-gray-400 mb-4">{product.reviewCount} reviews</p>
            <div className="border-t border-gray-100 pt-4 grid grid-cols-2 gap-3">
              <Field label="Rating">
                <Input
                  value={product.rating}
                  onChange={(e) => setProduct({ ...product, rating: e.target.value })}
                />
              </Field>
              <Field label="Review Count">
                <Input
                  type="number"
                  value={product.reviewCount}
                  onChange={(e) => setProduct({ ...product, reviewCount: Number(e.target.value) })}
                />
              </Field>
            </div>
          </Card>

          {/* Images */}
          <Card title="Images">
            {product.images.map((img, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <div className="w-9 h-9 flex-shrink-0 rounded bg-gray-50 border border-gray-200 flex items-center justify-center text-base">
                  🖼
                </div>
                <input
                  className="flex-1 min-w-0 text-xs bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-700 outline-none focus:border-[#C9A84C] focus:bg-white transition-colors"
                  value={img}
                  placeholder="Image URL"
                  onChange={(e) => updateImage(i, e.target.value)}
                />
                <button
                  onClick={() => removeImage(i)}
                  className="w-7 h-7 flex-shrink-0 flex items-center justify-center text-gray-300 border border-gray-200 rounded hover:border-red-300 hover:text-red-400 transition-all text-base"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={addImage}
              className="w-full mt-1 py-2 text-xs text-gray-400 border border-dashed border-gray-200 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
            >
              + Add Image
            </button>
          </Card>

          {/* Quick Summary */}
          <Card title="Quick Summary">
            {[
              { label: "Price", val: `₹${product.variants[0].price.toLocaleString()}`, gold: true, strike: false },
              { label: "Original", val: `₹${product.variants[0].originalPrice.toLocaleString()}`, gold: false, strike: true },
              { label: "Discount", val: `${discount}% off`, gold: true, strike: false },
              { label: "Stock", val: `${product.variants[0].stock} units`, gold: false, strike: false },
              { label: "Category", val: product.category, gold: false, strike: false },
            ].map((row, i, arr) => (
              <div
                key={row.label}
                className={`flex justify-between items-center py-2 ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                <span className="text-[11px] text-gray-400">{row.label}</span>
                <span
                  className={`text-xs font-medium ${
                    row.gold
                      ? "text-[#C9A84C]"
                      : row.strike
                      ? "text-gray-300 line-through"
                      : "text-gray-700"
                  }`}
                >
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

/* ── Reusable sub-components ── */

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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 last:mb-0">
      <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400 mb-1.5">{label}</p>
      {children}
    </div>
  );
}

function Input({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return (
    <input
      className={`w-full bg-gray-50 border border-gray-200 rounded px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-[#C9A84C] focus:bg-white transition-colors placeholder:text-gray-300 ${className}`}
      {...props}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-[#C9A84C] focus:bg-white transition-colors resize-y leading-relaxed"
      {...props}
    />
  );
}