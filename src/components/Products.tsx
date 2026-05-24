import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://sanlumiere.in/api/products"
        );

        const data = await res.json();

        console.log(data);

        setProducts(data.products || data);
      } catch (error) {
        console.error(
          "Products fetch failed",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}

      <header className="flex flex-col gap-4 bg-white px-6 py-5 shadow md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">
            Products Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage all products
          </p>
        </div>

        <button className="rounded-xl bg-[#C9A84C] px-6 py-3 font-medium text-white transition hover:opacity-90">
          + Add Product
        </button>
      </header>

      {/* Loading */}

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="text-xl font-semibold text-[#C9A84C]">
            Loading products...
          </div>
        </div>
      )}

      {/* Empty State */}

      {!loading && products.length === 0 && (
        <div className="flex items-center justify-center py-20">
          <div className="text-lg text-gray-500">
            No products found
          </div>
        </div>
      )}

      {/* Products Grid */}

      {!loading && products.length > 0 && (
        <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Product Image */}

              <div className="overflow-hidden">
                <img
                  src={
                    product.images?.[0] ||
                    "https://via.placeholder.com/300"
                  }
                  alt={product.name}
                  className="h-64 w-full object-cover transition hover:scale-105"
                />
              </div>

              {/* Product Content */}

              <div className="p-5">
                <h2 className="line-clamp-1 text-xl font-bold text-black">
                  {product.name}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                  {product.description}
                </p>

                {/* Price */}

                <div className="mt-5 flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-[#C9A84C]">
                    ₹
                    {product.variants?.[0]
                      ?.price ||
                      product.price ||
                      0}
                  </h3>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Active
                  </span>
                </div>

                {/* Buttons */}

                <div className="mt-5 flex gap-3">
                  <button className="flex-1 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800">
                    Edit
                  </button>

                  <button className="flex-1 rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}

      <footer className="mt-10 border-t bg-white py-5 text-center text-sm text-gray-500">
        © 2026 San Lumière Products Dashboard
      </footer>
    </div>
  );
}