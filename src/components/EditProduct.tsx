import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <input
        className="w-full border p-3 rounded mb-4"
        value={product.name}
        onChange={(e) =>
          setProduct({
            ...product,
            name: e.target.value,
          })
        }
      />

      <textarea
        className="w-full border p-3 rounded mb-4"
        value={product.description}
        onChange={(e) =>
          setProduct({
            ...product,
            description: e.target.value,
          })
        }
      />

      <input
        className="w-full border p-3 rounded mb-4"
        value={product.price}
        onChange={(e) =>
          setProduct({
            ...product,
            price: e.target.value,
          })
        }
      />

      <button
        onClick={async () => {
          await fetch(`/api/products/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          });

          alert("Product updated successfully");
        }}
        className="bg-green-600 text-white px-6 py-3 rounded"
      >
        Update Product
      </button>
    </div>
  );
}