import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
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

    variants: [
      {
        size: "",
        price: 0,
        originalPrice: 0,
        stock: 0,
      },
    ],

    ingredients: [],
    benefits: [],
    skinType: [],
  });

  async function saveProduct() {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!res.ok) {
      alert("Failed to add product");
      return;
    }

    alert("Product added successfully");
    navigate("/products");
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-4">
      <h1 className="text-3xl font-bold">Add Product</h1>

      <input
        className="w-full border p-3 rounded"
        placeholder="Product ID"
        value={product.id}
        onChange={(e) =>
          setProduct({
            ...product,
            id: e.target.value,
          })
        }
      />

      <input
        className="w-full border p-3 rounded"
        placeholder="Product Name"
        value={product.name}
        onChange={(e) =>
          setProduct({
            ...product,
            name: e.target.value,
          })
        }
      />

      <input
        className="w-full border p-3 rounded"
        placeholder="Subtitle"
        value={product.subtitle}
        onChange={(e) =>
          setProduct({
            ...product,
            subtitle: e.target.value,
          })
        }
      />

      <input
        className="w-full border p-3 rounded"
        placeholder="Category"
        value={product.category}
        onChange={(e) =>
          setProduct({
            ...product,
            category: e.target.value,
          })
        }
      />

      <textarea
        className="w-full border p-3 rounded"
        placeholder="Short Description"
        value={product.shortDescription}
        onChange={(e) =>
          setProduct({
            ...product,
            shortDescription: e.target.value,
          })
        }
      />

      <textarea
        className="w-full border p-3 rounded"
        placeholder="Description"
        value={product.description}
        onChange={(e) =>
          setProduct({
            ...product,
            description: e.target.value,
          })
        }
      />

      <h2 className="font-bold text-xl">Image URL</h2>

      <input
        className="w-full border p-3 rounded"
        value={product.images[0]}
        onChange={(e) =>
          setProduct({
            ...product,
            images: [e.target.value],
          })
        }
      />

      <h2 className="font-bold text-xl">Variant</h2>

      <input
        className="w-full border p-3 rounded"
        placeholder="Size"
        value={product.variants[0].size}
        onChange={(e) =>
          setProduct({
            ...product,
            variants: [
              {
                ...product.variants[0],
                size: e.target.value,
              },
            ],
          })
        }
      />

      <input
        type="number"
        className="w-full border p-3 rounded"
        placeholder="Price"
        value={product.variants[0].price}
        onChange={(e) =>
          setProduct({
            ...product,
            variants: [
              {
                ...product.variants[0],
                price: Number(e.target.value),
              },
            ],
          })
        }
      />

      <input
        type="number"
        className="w-full border p-3 rounded"
        placeholder="Original Price"
        value={product.variants[0].originalPrice}
        onChange={(e) =>
          setProduct({
            ...product,
            variants: [
              {
                ...product.variants[0],
                originalPrice: Number(e.target.value),
              },
            ],
          })
        }
      />

      <input
        type="number"
        className="w-full border p-3 rounded"
        placeholder="Stock"
        value={product.variants[0].stock}
        onChange={(e) =>
          setProduct({
            ...product,
            variants: [
              {
                ...product.variants[0],
                stock: Number(e.target.value),
              },
            ],
          })
        }
      />

      <button
        onClick={saveProduct}
        className="bg-[#C9A84C] text-white px-6 py-3 rounded"
      >
        Add Product
      </button>
    </div>
  );
}
