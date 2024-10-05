import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
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
        setProducts(response.data); // Update state with fetched products
        // Extract unique categories
        const uniqueCategories = [
          ...new Set(response.data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories); // Set categories for dropdown
      } catch (err) {
        setError("Failed to fetch products."); // Handle error
      } finally {
        setLoading(false); // Update loading state
      }
    };

    fetchProducts(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs once on mount

  // Get current user ID from local storage
  // const currentUserId = localStorage.getItem("currentUserId");
  const currentUserId = "1234"; // Temporary user ID for testing

  // Handle delete product
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
    navigate(`/update-product/${id}`); // Route to update page with the product ID
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching
  }

  if (error) {
    return <div>{error}</div>; // Display error message if fetching fails
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
    <div>
      <h2>Products</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Category Filter Dropdown */}
      <select
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
        <p>No products found for this user.</p>
      ) : (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id} style={{ marginBottom: "20px" }}>
              {product.imageUrl && (
                <div>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Vendor ID: {product.vendorId}</p>
              <button onClick={() => handleUpdate(product.id)}>Update</button>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Products;
