import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAutContext";
import './AllUsers.css';
import AdminNavBar from "../../common/adminNavBar/AdminNavBar";
import CSRNavBar from "../../common/csrNavBar/CSRNavBar"; // Import CSR NavBar
import { getUserRole } from "../../../hooks/useRoles"; // Import the global state


function AllUsers() {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const userRole = getUserRole(); // Get the current user role

  
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("http://localhost:5133/api/user"); 
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsers();
  }, []);

  const handleActivateUser = async (email) => {
    try {
      const response = await axios.put(`http://localhost:5133/api/user/activate/${email}`);
      
      if (response.status === 200) {
        alert("User activated successfully!");
        const updatedUsers = users.map(u => u.email === email ? { ...u, state: "Activated" } : u);
        setUsers(updatedUsers);
      } else {
        alert("Error activating user.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while activating the user.");
    }
  };

  return (
    <div>
      {userRole === "admin0000" && <AdminNavBar />}
      {userRole === "csr" && <CSRNavBar />}
    <div className="all-users-container">
      <h1 className="user-list-title">User List</h1>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <p className="user-info"><strong>Username:</strong> {user.username}</p>
            <p className="user-info"><strong>Email:</strong> {user.email}</p>
            <p className="user-info"><strong>State:</strong> {user.state}</p>

            {user.state === 'Pending' && <p className="user-status pending">Status: User has registered</p>}
            {user.requested === 'Yes' && <p className="user-status requested">Status: User has requested for Reactivation</p>}

            {user.state === 'Pending' && (
              <button className="activate-button" onClick={() => handleActivateUser(user.email)}>
                Activate
              </button>
            )}

            {user.requested === 'Yes' && (
              <button className="reactivate-button" onClick={() => handleActivateUser(user.email)}>
                Reactivate
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default AllUsers;
