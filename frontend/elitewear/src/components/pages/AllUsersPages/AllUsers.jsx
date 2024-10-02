import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAutContext";

function AllUsers() {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  
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
        // Optionally, refetch users to reflect the updated state
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
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>{user.state}</p>

            {/* Check if the user's state is 'pending' to enable the Activate button */}
            <button 
              disabled={user.state !== 'Pending'} // Disable if state is not 'pending'
              onClick={() => handleActivateUser(user.email)} // Call the activate function
            >
              Activate
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllUsers;
