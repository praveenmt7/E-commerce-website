

























import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../Context/WishlistContext";
import { useCart } from '../../Context/CartContext';

function Mobiles() {
  const [mobiles, setMobiles] = useState([]);
  const [filteredMobiles, setFilteredMobiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseImageUrl = "http://localhost:3001/images/";
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    fetch("http://localhost:3001/mobiles")
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then(data => {
        setMobiles(data);
        setFilteredMobiles(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const results = mobiles.filter((item) =>
      item.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMobiles(results);
    setCurrentPage(1);
  }, [searchTerm, mobiles]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMobiles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMobiles.length / itemsPerPage);

  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const paginate = (page) => setCurrentPage(page);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading mobiles...</p>;
  if (error) return <p className="text-center mt-10 text-red-500 font-semibold">Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">Explore Latest Mobiles</h1>

      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search mobile model..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {currentItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">No mobiles found.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {currentItems.map((item) => (
            <div key={item._id} className="relative rounded-lg p-4 shadow-md bg-white border hover:shadow-lg transition">
              <Link to={`/mobiles/${item._id}`}>
                <img
                  src={item.image?.startsWith("http") ? item.image : baseImageUrl + item.image}
                  alt={item.model}
                  className="w-full h-64 object-cover rounded-md mb-4 border"
                  onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image")}
                />
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{item.model}</h2>
                  <p className="text-blue-600 font-bold text-xl mb-2">₹{item.price}</p>
                  <p className="text-gray-500 font-medium">{item.brand}</p>
                </div>
              </Link>
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  onClick={() => {
                    addToCart(item);
                    alert(`Added ${item.model} to cart!`);
                  }}
                >
                  Add to Cart
                </button>
                <button
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
                  onClick={() => {
                    addToWishlist(item);
                    alert(`Added ${item.model} to wishlist!`);
                  }}
                >
                  Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-10">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-semibold ${
              currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-semibold ${
              currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Mobiles;

