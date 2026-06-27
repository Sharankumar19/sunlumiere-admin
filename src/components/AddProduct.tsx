import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Variant {
  size: string;
  price: number;
  originalPrice: number;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  rating: string;
  reviewCount: number;
  shortDescription: string;
  description: string;
  badge: string;
  isBestseller: boolean;
  images: string[];
  variants: Variant[];
  ingredients: string[];
  benefits: string[];
  skinType: string[];
}

export default function AddProduct() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    subtitle: "",
    category: "",
    rating: "5",
    reviewCount: 0,
    shortDescription: "",
    description: "",
    badge: "",
    isBestseller: false,
    images: [""],
    variants: [{ size: "", price: 0, originalPrice: 0, stock: 0 }],
    ingredients: [],
    benefits: [],
    skinType: [],
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const updateVariant = (key: keyof Variant, value: string | number) => {
    const variants = [...product.variants];
    (variants[0] as any)[key] = value;
    setProduct({ ...product, variants });
  };

  const updateImage = (index: number, value: string) => {
    const images = [...product.images];
    images[index] = value;
    setProduct({ ...product, images });
  };

  const addImage = () => {
    setProduct({ ...product, images: [...product.images, ""] });
  };

  const removeImage = (index: number) => {
    setProduct({ ...product, images: product.images.filter((_, i) => i !== index) });
  };

  const discount =
    product.variants[0].originalPrice && product.variants[0].price
      ? Math.round(
          ((product.variants[0].originalPrice - product.variants[0].price) /
            product.variants[0].originalPrice) *
            100
        )
      : 0;

  async function saveProduct() {
    setSaving(true);
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    setSaving(false);

    if (!res.ok) {
      showToast("Failed to add product");
      return;
    }

    showToast("Product added successfully");
    setTimeout(() => navigate("/products"), 1500);
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
              Products / <span className="text-[#C9A84C]">Add New</span>
            </p>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Add Product</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-xs text-gray-900 border border-gray-200 px-4 py-2 rounded hover:border-gray-400 hover:text-gray-600 transition-all"
          >
            Discard
          </button>
          <button
            onClick={saveProduct}
            disabled={saving}
            className="text-xs font-bold uppercase tracking-wide bg-[#C9A84C] text-white px-5 py-2 rounded hover:bg-[#b8963e] transition-colors disabled:opacity-60"
          >
            {saving ? "Saving…" : "Add Product"}
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-8 py-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">

        {/* ── Left Column ── */}
        <div className="flex flex-col gap-5">

          {/* Basic Info */}
          <Card title="Basic Information">
            <Field label="Product ID">
              <Input
                placeholder="e.g. prod_001"
                value={product.id}
                onChange={(e) => setProduct({ ...product, id: e.target.value })}
              />
            </Field>
            <Field label="Product Name">
              <Input
                placeholder="e.g. Radiance Serum"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
              />
            </Field>
            <Field label="Subtitle">
              <Input
                placeholder="e.g. Advanced Brightening Formula"
                value={product.subtitle}
                onChange={(e) => setProduct({ ...product, subtitle: e.target.value })}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Category">
                <Input
                  placeholder="e.g. Serums"
                  value={product.category}
                  onChange={(e) => setProduct({ ...product, category: e.target.value })}
                />
              </Field>
              <Field label="Badge">
                <Input
                  placeholder="e.g. Best Seller"
                  value={product.badge}
                  onChange={(e) => setProduct({ ...product, badge: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Short Description">
              <Textarea
                rows={2}
                placeholder="Brief summary shown in listings…"
                value={product.shortDescription}
                onChange={(e) => setProduct({ ...product, shortDescription: e.target.value })}
              />
            </Field>
            <Field label="Full Description">
              <Textarea
                rows={5}
                placeholder="Detailed product description…"
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
              />
            </Field>

            {/* Bestseller toggle */}
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => setProduct({ ...product, isBestseller: !product.isBestseller })}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  product.isBestseller ? "bg-[#C9A84C]" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
                    product.isBestseller ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
              <span className="text-xs text-gray-500 font-medium">Mark as Bestseller</span>
            </div>
          </Card>

          {/* Variant & Pricing */}
          <Card title="Variant & Pricing">
            <div className="grid grid-cols-3 gap-4">
              <Field label="Size">
                <Input
                  placeholder="e.g. 30ml"
                  value={product.variants[0].size}
                  onChange={(e) => updateVariant("size", e.target.value)}
                />
              </Field>
              <Field label="Price (₹)">
                <Input
                  type="number"
                  placeholder="0"
                  value={product.variants[0].price || ""}
                  onChange={(e) => updateVariant("price", Number(e.target.value))}
                />
              </Field>
              <Field label="Original Price (₹)">
                <Input
                  type="number"
                  placeholder="0"
                  value={product.variants[0].originalPrice || ""}
                  onChange={(e) => updateVariant("originalPrice", Number(e.target.value))}
                />
              </Field>
            </div>
            <Field label="Stock">
              <Input
                type="number"
                placeholder="0"
                value={product.variants[0].stock || ""}
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
                placeholder="e.g. Ascorbic Acid, Niacinamide, Hyaluronic Acid"
                value={product.ingredients.join(", ")}
                onChange={(e) =>
                  setProduct({ ...product, ingredients: e.target.value.split(",").map((s) => s.trim()) })
                }
              />
            </Field>
            <Field label="Benefits (comma-separated)">
              <Textarea
                rows={2}
                placeholder="e.g. Brightening, Hydration, Anti-oxidant"
                value={product.benefits.join(", ")}
                onChange={(e) =>
                  setProduct({ ...product, benefits: e.target.value.split(",").map((s) => s.trim()) })
                }
              />
            </Field>
            <Field label="Skin Type (comma-separated)">
              <Textarea
                rows={2}
                placeholder="e.g. All skin types, Sensitive, Combination"
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

          {/* Rating */}
          <Card title="Rating">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Rating">
                <Input
                  placeholder="5"
                  value={product.rating}
                  onChange={(e) => setProduct({ ...product, rating: e.target.value })}
                />
              </Field>
              <Field label="Review Count">
                <Input
                  type="number"
                  placeholder="0"
                  value={product.reviewCount || ""}
                  onChange={(e) => setProduct({ ...product, reviewCount: Number(e.target.value) })}
                />
              </Field>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[#C9A84C] tracking-widest text-sm">★★★★★</span>
              <span className="text-xs text-gray-400">{product.reviewCount} reviews</span>
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
                  placeholder="https://…"
                  onChange={(e) => updateImage(i, e.target.value)}
                />
                {product.images.length > 1 && (
                  <button
                    onClick={() => removeImage(i)}
                    className="w-7 h-7 flex-shrink-0 flex items-center justify-center text-gray-300 border border-gray-200 rounded hover:border-red-300 hover:text-red-400 transition-all text-base"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addImage}
              className="w-full mt-1 py-2 text-xs text-gray-400 border border-dashed border-gray-200 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
            >
              + Add Image
            </button>
          </Card>

          {/* Live Preview Summary */}
          <Card title="Preview Summary">
            {product.name ? (
              <>
                <p className="text-sm font-semibold text-gray-800 mb-0.5">{product.name}</p>
                {product.subtitle && (
                  <p className="text-xs text-gray-400 mb-3">{product.subtitle}</p>
                )}
                <div className="space-y-0">
                  {[
                    { label: "Price", val: product.variants[0].price ? `₹${product.variants[0].price.toLocaleString()}` : "—", gold: true, strike: false },
                    { label: "Original", val: product.variants[0].originalPrice ? `₹${product.variants[0].originalPrice.toLocaleString()}` : "—", gold: false, strike: true },
                    { label: "Discount", val: discount ? `${discount}% off` : "—", gold: true, strike: false },
                    { label: "Stock", val: product.variants[0].stock ? `${product.variants[0].stock} units` : "—", gold: false, strike: false },
                    { label: "Category", val: product.category || "—", gold: false, strike: false },
                    { label: "Badge", val: product.badge || "—", gold: false, strike: false },
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
                </div>
              </>
            ) : (
              <p className="text-xs text-gray-300 text-center py-4">
                Fill in the form to see a preview
              </p>
            )}
          </Card>

          {/* Save CTA */}
          <button
            onClick={saveProduct}
            disabled={saving}
            className="w-full py-3 bg-[#C9A84C] text-white text-sm font-bold uppercase tracking-wide rounded hover:bg-[#b8963e] transition-colors disabled:opacity-60 shadow-sm"
          >
            {saving ? "Adding Product…" : "Add Product"}
          </button>
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
      <p className="text-[11px] font-medium uppercase tracking-wide text-gray-900 mb-1.5">{label}</p>
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
      className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-[#C9A84C] focus:bg-white transition-colors resize-y leading-relaxed placeholder:text-gray-300"
      {...props}
    />
  );
}