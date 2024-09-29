import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams(); // Get the product ID from the route parameters
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    vendorId: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7164/api/product/${id}`
        );
        setProduct(response.data); // Set the fetched product data
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };

    fetchProduct(); // Fetch the product data
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://localhost:7164/api/product/${id}`, product);
      alert("Product updated successfully.");
      navigate("/products"); // Redirect to the products page
    } catch (err) {
      console.error("Failed to update product:", err);
      alert("Failed to update product.");
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Vendor ID</label>
          <input
            type="number"
            name="vendorId"
            value={product.vendorId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
