import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]); // State to hold products
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle error

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
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Vendor ID: {product.vendorId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
