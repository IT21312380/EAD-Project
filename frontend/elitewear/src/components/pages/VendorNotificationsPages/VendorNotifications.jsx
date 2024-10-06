import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VendorNotifications.css"; // Import the CSS file

const VendorNotifications = () => {
  const [notifications, setNotifications] = useState([]); // State to hold customer notifications
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch customer notifications when the component mounts
    const vendorId = "1234"; // Replace with dynamic vendor ID if needed
    const fetchCustomerNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5133/api/Notification/csr/${vendorId}`
        ); // Call the API to get customer notifications
        setNotifications(response.data); // Update state with fetched notifications
      } catch (err) {
        setError("Failed to fetch notifications from customers."); // Handle error
      } finally {
        setLoading(false); // Stop loading once data is fetched or error occurs
      }
    };

    fetchCustomerNotifications(); // Trigger the fetch function
  }, []); // Empty dependency array ensures this runs once on mount

  // Handle loading state
  if (loading) {
    return <div className="vendor-notifications-loading">Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div className="vendor-notifications-error">{error}</div>;
  }

  return (
    <div className="vendor-notifications-container">
      <h2 className="vendor-notifications-title">
        Notifications From Customers
      </h2>
      {notifications.length === 0 ? (
        <p className="vendor-notifications-empty">
          No notifications found from System.
        </p>
      ) : (
        <table
          className="vendor-notifications-table"
          border="1"
          cellPadding="5"
          cellSpacing="0"
        >
          <thead>
            <tr className="vendor-notifications-header">
              <th>ID</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification.id} className="vendor-notifications-row">
                <td>{notification.id}</td>
                <td>{notification.message}</td>
                <td>
                  {new Date(notification.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VendorNotifications;
