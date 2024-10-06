import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./VendorProducts.css";

const VendorProducts = () => {
  const [products, setProducts] = useState([]); // State to hold products
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle error
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category
  const [categories, setCategories] = useState([]); // State to hold categories
  const navigate = useNavigate(); // Use to navigate to update page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5133/api/product");
        setProducts(response.data);
        const uniqueCategories = [
          ...new Set(response.data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        setError("Failed to fetch products."); // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get current user ID from local storage
  const currentUserId = "1234";

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5133/api/product/${id}`);
      // Remove the deleted product from the state
      setProducts(products.filter((product) => product.id !== id));
      alert("Product deleted successfully.");
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Failed to delete product.");
    }
  };

  // Navigate to update page
  const handleUpdate = (id) => {
    navigate(`/update-product/${id}`);
  };

  if (loading) {
    return <div className="vendor-products-loading">Loading...</div>;
  }

  if (error) {
    return <div className="vendor-products-error">{error}</div>;
  }

  // Filter products based on the current user ID (VendorId) and search query/category
  const filteredProducts = products.filter((product) => {
    const matchesVendorId = product.vendorId === parseInt(currentUserId, 10); // Ensure to parse user ID to integer
    const matchesSearchQuery = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    return matchesVendorId && matchesSearchQuery && matchesCategory;
  });

  return (
    <div className="vendor-products-container">
      <h2 className="vendor-products-title">Products</h2>

      {/* Search Bar */}
      <input
        type="text"
        className="vendor-products-search"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Category Filter Dropdown */}
      <select
        className="vendor-products-category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      {filteredProducts.length === 0 ? (
        <p className="vendor-products-empty">
          No products found for this user.
        </p>
      ) : (
        <ul className="vendor-products-list">
          {filteredProducts.map((product) => (
            <li key={product.id} className="vendor-product-item">
              {product.imageUrl && (
                <div className="vendor-product-image-wrapper">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="vendor-product-image"
                  />
                </div>
              )}
              <div className="vendor-product-info">
                <h3 className="vendor-product-name">{product.name}</h3>
                <p className="vendor-product-description">
                  {product.description}
                </p>
                <p className="vendor-product-price">Price: ${product.price}</p>
                <p className="vendor-product-category">
                  Category: {product.category}
                </p>
                <p className="vendor-product-quantity">
                  Quantity: {product.quantity}
                </p>
                <p className="vendor-product-vendorId">
                  Vendor ID: {product.vendorId}
                </p>
                <div className="vendor-product-actions">
                  <button
                    className="vendor-product-update-btn"
                    onClick={() => handleUpdate(product.id)}
                  >
                    Update
                  </button>
                  <button
                    className="vendor-product-delete-btn"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VendorProducts;
