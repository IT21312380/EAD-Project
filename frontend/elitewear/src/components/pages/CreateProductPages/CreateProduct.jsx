import React, { useState } from "react";
import axios from "axios";

const CreateProduct = () => {
  // State to hold form data
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    vendorId: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to your API
      const response = await axios.post("https://localhost:7164/api/product", {
        // Sending data in expected format, assuming default Product ID type is ObjectId in string
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        category: product.category,
        quantity: parseInt(product.quantity),
        vendorId: parseInt(product.vendorId),
      });
      console.log(response.data);
      alert("Product created successfully!");
      setProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
        vendorId: "",
      });
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product.");
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
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
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
