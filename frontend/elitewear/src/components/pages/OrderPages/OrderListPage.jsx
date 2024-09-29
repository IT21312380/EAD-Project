import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchAndFilter from "../../common/searchAndFilter/SearchAndFilter";

const OrderListPage = () => {
  const [orders, setOrders] = useState([]); // State to hold orders
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle error
  const [selectedStatus, setSelectedStatus] = useState({}); // State to track selected status for each order
  const [itemUserMap, setItemUserMap] = useState({}); // State to hold user ID for each item
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category
  const [categories, setCategories] = useState([]); // State to hold categories

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5133/api/order");
        setOrders(response.data); // Update state with fetched orders

        // Extract unique categories from orders or items (if applicable)
        const uniqueCategories = [
          ...new Set(response.data.map((order) => order.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        setError("Failed to fetch orders."); // Handle error
      } finally {
        setLoading(false); // Update loading state
      }
    };

    fetchOrders(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    const fetchItemUserIds = async () => {
      const userMap = {};
      const itemIds = orders
        .flatMap((order) => order.items?.map((item) => item.id))
        .filter(Boolean);

      for (const id of itemIds) {
        try {
          const response = await axios.get(
            `http://localhost:5133/api/product/${id}`
          );
          userMap[id] = response.data.vendorId; // Assuming vendorId is the user ID
        } catch (err) {
          console.error(`Failed to fetch user ID for item ${id}:`, err);
        }
      }

      setItemUserMap(userMap);
    };

    if (orders.length) {
      fetchItemUserIds(); // Call function to fetch user IDs for items if orders are available
    }
  }, [orders]);

  const currentUserId = "1234"; // Temporary user ID for testing

  // Filter orders based on search query and selected category
  const filteredOrders = orders.filter((order) => {
    const matchesUserId = order.items?.some(
      (item) => itemUserMap[item.id] === parseInt(currentUserId, 10)
    );
    const matchesSearchQuery = order.items?.some((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesCategory = selectedCategory
      ? order.items?.some((item) => item.category === selectedCategory)
      : true;

    return matchesUserId && matchesSearchQuery && matchesCategory;
  });

  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: newStatus,
    }));
  };

  const updateOrderStatus = async (orderId) => {
    try {
      const status = selectedStatus[orderId];
      if (status) {
        await axios.put(
          `https://localhost:7164/api/order/${orderId}/status`,
          { status }, // Send an object containing the status
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
      <SearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {filteredOrders.length === 0 ? (
        <p>No orders found for this user.</p>
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
            {filteredOrders.map((order) => (
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
