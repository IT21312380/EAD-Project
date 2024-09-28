import React, { useState } from "react";
import axios from "axios";

const CreateProduct = () => {
  // State to hold form data and image
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    vendorId: "",
    imageUrl: "", // This will hold the image URL after upload
  });
  const [image, setImage] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      // If an image is selected, upload it first
      if (image) {
        const formData = new FormData();
        formData.append("file", image);

        const uploadResponse = await axios.post(
          "https://localhost:7164/api/product/upload-image",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        imageUrl = uploadResponse.data.imageUrl;
      }

      // Send POST request to your API with product data and image URL
      const response = await axios.post("https://localhost:7164/api/product", {
        id: product.id,
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        category: product.category,
        quantity: parseInt(product.quantity),
        vendorId: parseInt(product.vendorId),
        imageUrl: imageUrl, // Set the image URL
      });

      console.log(response.data);
      alert("Product created successfully!");
      setProduct({
        id: "",
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
        vendorId: "",
        imageUrl: "", // Reset the image URL
      });
      setImage(null); // Clear the selected image
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
          <label>Id</label>
          <input
            type="text"
            name="id"
            value={product.id}
            onChange={handleChange}
            required
          />
        </div>
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
        <div>
          <label>Upload Image</label>
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
