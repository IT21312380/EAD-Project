import React, { useState } from "react";
import axios from "axios";

const RegisterVendor = () => {

  const [vendor, setVendor] = useState({
    
    username: "",
    email: "",
    password: "",
     
  });
  

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor({
      ...vendor,
      [name]: value,
    });
  };

  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      
      const response = await axios.post("http://localhost:5133/api/vendor/register", {
        
        username: vendor.username,
        email: vendor.email,
        password: vendor.password,
        
      });

      console.log(response.data);
      alert("Profile created successfully!");
      setVendor({
        username: "",
        email: "",
        password: "",
        
      });
    
    } catch (error) {
      console.error("Error creating profile:", error);
      alert("Failed to create profile.");
    }
  };

  return (
    <div>
      <h2>Create Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={vendor.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={vendor.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            name="password"
            value={vendor.password}
            onChange={handleChange}
          />
        </div>
        
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterVendor;
