import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]); // State to hold products
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle error
  const navigate = useNavigate(); // Use to navigate to update page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://localhost:7164/api/product");
        setProducts(response.data); // Update state with fetched products
      } catch (err) {
        setError("Failed to fetch products."); // Handle error
      } finally {
        setLoading(false); // Update loading state
      }
    };

    fetchProducts(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs once on mount

  // Handle delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7164/api/product/${id}`);
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

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
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
    </div>
  );
};

export default Products;
