import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderListPage = () => {
  const [orders, setOrders] = useState([]); // State to hold orders
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle error
  const [selectedStatus, setSelectedStatus] = useState({}); // State to track selected status for each order

  useEffect(() => {
    // Fetch orders from API
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://localhost:7164/api/order");
        setOrders(response.data); // Update state with fetched orders
      } catch (err) {
        setError("Failed to fetch orders."); // Handle error
      } finally {
        setLoading(false); // Update loading state
      }
    };

    fetchOrders(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to handle status change for a specific order
  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: newStatus,
    }));
  };

  // Function to update order status
  const updateOrderStatus = async (orderId) => {
    try {
      const status = selectedStatus[orderId];
      console.log(orderId);
      if (status) {
        await axios.put(
          `https://localhost:7164/api/order/${orderId}/status`,
          status,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert(`Order ${orderId} status updated to ${status}`);
      } else {
        alert("Please select a status to update.");
      }
    } catch (err) {
      console.error("Failed to update order status:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching
  }

  if (error) {
    return <div>{error}</div>; // Display error message if fetching fails
  }

  return (
    <div>
      <h2>Order List</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Items</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.userId}</td>
                <td>
                  <ul>
                    {order.items?.map((item) => (
                      <li key={item.id}>
                        {item.name} (Qty: {item.qty})
                      </li>
                    ))}
                  </ul>
                </td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{order.status}</td>
                <td>
                  {/* Dropdown for updating status */}
                  <select
                    value={selectedStatus[order.id] || ""}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    <option value="">Select Status</option>
                    <option value="Purchased">Purchased</option>
                    <option value="Packaging">Packaging</option>
                    <option value="Shipping">Shipping</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <button onClick={() => updateOrderStatus(order.id)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderListPage;
