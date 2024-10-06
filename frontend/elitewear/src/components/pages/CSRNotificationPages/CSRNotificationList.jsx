import React, { useEffect, useState } from "react";
import axios from "axios";

const CSRNotificationList = () => {
  const [notifications, setNotifications] = useState([]); // State to hold customer notifications
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
  const [currentNotification, setCurrentNotification] = useState(null); // State to track current notification being replied to
  const [replyMessage, setReplyMessage] = useState(""); // State to hold reply message

  useEffect(() => {
    // Fetch customer notifications when the component mounts
    const fetchCustomerNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5133/api/Notification/customer"
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

  // Open the modal for the selected notification
  const openReplyModal = (notification) => {
    setCurrentNotification(notification); // Set the current notification for reply
    setReplyMessage(""); // Reset the reply message
    setIsModalOpen(true); // Open the modal
  };

  // Handle reply submission
  const handleReplySubmit = async () => {
    if (!currentNotification || !replyMessage) {
      alert("Please enter a reply message.");
      return;
    }

    try {
      // Prepare the reply payload
      // Prepare the reply payload
      const notificationDto = {
        message: replyMessage,
      };
      const customerId = currentNotification.customerId;
      console.log(customerId);

      // Send the reply to the customer via the new API endpoint
      await axios.post(
        `http://localhost:5133/api/Notification/csr?customerId=${customerId}`, // Updated endpoint for CSR
        {
          customerId: customerId, // Pass the customerId
          ...notificationDto, // Spread the notification DTO properties
        }
      );

      alert("Reply sent successfully!");
      setIsModalOpen(false); // Close the modal after sending
    } catch (err) {
      console.error("Failed to send reply:", err);
    }
  };

  // Close the modal without sending a reply
  const closeReplyModal = () => {
    setIsModalOpen(false);
  };

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Notifications From Customers</h2>
      {notifications.length === 0 ? (
        <p>No notifications found from customers.</p>
      ) : (
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Message</th>
              <th>Date</th>
              <th>Reply</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification.id}>
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
                <td>
                  <button onClick={() => openReplyModal(notification)}>
                    Reply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for replying to a notification */}
      {isModalOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h2>Reply to Notification</h2>
            <p>{currentNotification?.message}</p>
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Type your reply here"
              rows={5}
              style={modalStyles.textarea}
            />
            <br />
            <button onClick={handleReplySubmit} style={modalStyles.button}>
              Send Reply
            </button>
            <button onClick={closeReplyModal} style={modalStyles.button}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Basic inline styles for modal (can be improved with CSS or a library like Material-UI)
const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    maxWidth: "800px",
    width: "100%",
    textAlign: "center",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    margin: "10px",
  },
  button: {
    margin: "10px",
    padding: "10px 20px",
  },
};

export default CSRNotificationList;
