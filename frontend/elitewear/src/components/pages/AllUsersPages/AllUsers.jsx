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

          {user.state === 'Pending' && <p>Status: User has registered</p>}
          {user.requested === 'Yes' && <p>Status: User has requested for Reactivation</p>}


          {user.state === 'Pending' && (
            <button onClick={() => handleActivateUser(user.email)}>
              Activate
            </button>
          )}

          {/* Conditionally render the Reactivate button only if reactivation is requested */}
          {user.requested === 'Yes' && (
            <button onClick={() => handleActivateUser(user.email)}>
              Reactivate
            </button>
          )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllUsers;
