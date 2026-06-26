import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    async function loadProduct() {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    }

    loadProduct();
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-4">

      {/* Name */}
      <input
        className="w-full border p-3 rounded"
        value={product.name}
        onChange={(e) =>
          setProduct({ ...product, name: e.target.value })
        }
      />

      {/* Subtitle */}
      <input
        className="w-full border p-3 rounded"
        value={product.subtitle}
        onChange={(e) =>
          setProduct({ ...product, subtitle: e.target.value })
        }
      />

      {/* Category */}
      <input
        className="w-full border p-3 rounded"
        value={product.category}
        onChange={(e) =>
          setProduct({ ...product, category: e.target.value })
        }
      />

      {/* Badge */}
      <input
        className="w-full border p-3 rounded"
        value={product.badge}
        onChange={(e) =>
          setProduct({ ...product, badge: e.target.value })
        }
      />

      {/* Rating */}
      <input
        className="w-full border p-3 rounded"
        value={product.rating}
        onChange={(e) =>
          setProduct({ ...product, rating: e.target.value })
        }
      />

      {/* Review Count */}
      <input
        type="number"
        className="w-full border p-3 rounded"
        value={product.reviewCount}
        onChange={(e) =>
          setProduct({
            ...product,
            reviewCount: Number(e.target.value),
          })
        }
      />

      {/* Short Description */}
      <textarea
        className="w-full border p-3 rounded"
        rows={3}
        value={product.shortDescription}
        onChange={(e) =>
          setProduct({
            ...product,
            shortDescription: e.target.value,
          })
        }
      />

      {/* Description */}
      <textarea
        className="w-full border p-3 rounded"
        rows={6}
        value={product.description}
        onChange={(e) =>
          setProduct({
            ...product,
            description: e.target.value,
          })
        }
      />

      <h2 className="font-bold text-xl">Images</h2>

      {product.images.map((img: string, index: number) => (
        <input
          key={index}
          className="w-full border p-3 rounded"
          value={img}
          onChange={(e) => {
            const images = [...product.images];
            images[index] = e.target.value;
            setProduct({
              ...product,
              images,
            });
          }}
        />
      ))}

      <h2 className="font-bold text-xl">Variant</h2>

      {/* Size */}
      <input
        className="w-full border p-3 rounded"
        value={product.variants[0].size}
        onChange={(e) => {
          const variants = [...product.variants];
          variants[0].size = e.target.value;
          setProduct({
            ...product,
            variants,
          });
        }}
      />

      {/* Price */}
      <input
        type="number"
        className="w-full border p-3 rounded"
        value={product.variants[0].price}
        onChange={(e) => {
          const variants = [...product.variants];
          variants[0].price = Number(e.target.value);
          setProduct({
            ...product,
            variants,
          });
        }}
      />

      {/* Original Price */}
      <input
        type="number"
        className="w-full border p-3 rounded"
        value={product.variants[0].originalPrice}
        onChange={(e) => {
          const variants = [...product.variants];
          variants[0].originalPrice = Number(e.target.value);
          setProduct({
            ...product,
            variants,
          });
        }}
      />

      {/* Stock */}
      <input
        type="number"
        className="w-full border p-3 rounded"
        value={product.variants[0].stock}
        onChange={(e) => {
          const variants = [...product.variants];
          variants[0].stock = Number(e.target.value);
          setProduct({
            ...product,
            variants,
          });
        }}
      />

      <button
        className="bg-green-600 text-white px-6 py-3 rounded"
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
      >
        Update Product
      </button>
    </div>
  );
}