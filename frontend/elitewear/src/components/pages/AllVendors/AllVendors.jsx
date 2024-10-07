import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom"; // Import useNavigate
import './AllVendors.css';
import AdminNavBar from "../../common/adminNavBar/AdminNavBar";

function AllVendors() {
 
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    async function fetchVendors() {
      try {
        const response = await axios.get("http://localhost:5133/api/vendor"); 
        setVendors(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchVendors();
  }, []);

  // Handle navigation to add vendor page
  const handleAddVendor = () => {
    navigate("/vendor-register");
  };

  return (
    <div>
      <AdminNavBar />
      <div className="all-vendors-container">
        <div className="vendor-list-header">
          <h1 className="vendor-list-title">Vendor List</h1>
          {/* Add Vendor Button */}
          <button className="btn-add-vendor" onClick={handleAddVendor}>
            Add Vendor
          </button>
        </div>
        <ul className="vendor-list">
          {vendors.map((vendor) => (
            <li key={vendor.id} className="vendor-item">
              <p className="vendor-info"><strong>Vendor Id:</strong> {vendor.vendorId}</p>
              <p className="vendor-info"><strong>Email:</strong> {vendor.email}</p>
              <p className="vendor-info"><strong>Username:</strong> {vendor.username}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AllVendors;
