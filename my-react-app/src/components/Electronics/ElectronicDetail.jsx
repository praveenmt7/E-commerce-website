
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from '../../Context/CartContext'; // Verify this path: It should be relative to where CartContext.jsx is

function ElectronicsDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [showCartMessage, setShowCartMessage] = useState(false);

  const baseImageUrl = "http://localhost:3001/images/";

  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch product details");
        }
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setShowCartMessage(true);
      setTimeout(() => {
        setShowCartMessage(false);
      }, 2000);
    }
  };

  if (error)
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">
        Error: {error}
      </p>
    );

  if (!product)
    return <p className="text-center mt-10 text-gray-600 animate-pulse">Loading product details...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8">
        <div className="relative rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 md:w-1/3">
          <img
            src={
              product.image?.startsWith("http")
                ? product.image
                : baseImageUrl + product.image
            }
            alt={product.product}
            className="w-full h-64 object-contain rounded-lg"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
          <div className="absolute top-3 right-3 bg-indigo-500 px-3 py-1 rounded-md text-sm font-semibold text-white">
            Electronics
          </div>
        </div>

        <div className="flex flex-col justify-center md:w-2/3 space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">
            {product.product}
          </h1>
          <p className="text-3xl font-semibold text-indigo-600">
            ₹{product.price}
          </p>
          <p className="text-gray-700 text-base leading-relaxed min-h-[100px]">
            {product.description || "No description available for this product."}
          </p>
          <button
            onClick={handleAddToCart}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
          >
            Add to Cart
          </button>
          {showCartMessage && (
            <div className="text-center text-green-600 font-semibold mt-2">
              Added "{product.product}" to cart!
            </div>
          )}
          <Link
            to="/electronics"
            className="mt-4 block text-center text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            ← Back to Electronics
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ElectronicsDetail;