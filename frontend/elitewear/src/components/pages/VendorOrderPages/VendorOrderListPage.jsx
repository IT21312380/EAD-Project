import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchAndFilter from "../../common/searchAndFilter/SearchAndFilter";

const VendorOrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [itemUserMap, setItemUserMap] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const currentUserId = "1234"; // This should ideally come from user authentication context

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5133/api/order");
        setOrders(response.data);
        const uniqueCategories = [
          ...new Set(response.data.map((order) => order.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

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
          userMap[id] = response.data.vendorId;
        } catch (err) {
          console.error(`Failed to fetch user ID for item ${id}:`, err);
        }
      }
      setItemUserMap(userMap);
    };
    if (orders.length) {
      fetchItemUserIds();
    }
  }, [orders]);

  const filteredOrders = orders.filter((order) => {
    const itemsForCurrentUser = order.items?.filter(
      (item) => itemUserMap[item.id] === parseInt(currentUserId)
    );

    // Filter orders to include only those that have items for the current user
    return itemsForCurrentUser.length > 0;
  });

  const handleItemStatusChange = (itemId, newStatus) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [itemId]: newStatus,
    }));
  };

  const updateItemStatus = async (orderId, itemId) => {
    try {
      const status = selectedStatus[itemId]; // Correctly fetch the new status

      // Check if status is selected before updating
      if (!status) {
        alert("Please select a status before updating.");
        return;
      }

      console.log(
        `Updating status of item ${itemId} in order ${orderId} to ${status}`
      );
      await axios.put(
        `http://localhost:5133/api/order/${orderId}/item/${itemId}`,
        status,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Item status updated successfully!");
    } catch (err) {
      console.error("Failed to update item status:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => {
              const itemsForCurrentUser = order.items.filter(
                (item) => itemUserMap[item.id] === parseInt(currentUserId)
              );

              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.userId}</td>
                  <td>
                    <ul>
                      {itemsForCurrentUser.map((item) => (
                        <li key={item.id}>
                          {item.name} (Qty: {item.qty}) -{" "}
                          <strong>{item.status}</strong>
                          <br />
                          <select
                            value={selectedStatus[(item.id, order)]}
                            onChange={(e) =>
                              handleItemStatusChange(item.id, e.target.value)
                            }
                          >
                            <option value="">Select Status</option>
                            <option value="Purchased">Purchased</option>
                            <option value="Packaging">Packaging</option>
                            <option value="Shipping">Shipping</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                          <button
                            onClick={() => updateItemStatus(order.id, item.id)}
                          >
                            Update Item Status
                          </button>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>{order.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VendorOrderListPage;
