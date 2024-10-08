import React, { useState } from "react";
import { useAdminLogin } from "../../../hooks/useAdminLogin";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { setUserRole } from "../../../hooks/useRoles"; // Custom hook to set roles

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useAdminLogin(); // Use the hook
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh

    // Call the login function from the hook
    const success =await login(username, password);

    // If there's no error after login, navigate to the admin products page
    if (success) {
      navigate("/admin-products"); // Redirect to the admin products page

      // Set the user role after successful login (role could be fetched from response if available)
      const role = "admin0000"; // Use an actual role from login response if available
      setUserRole(role); // Set global user role
    }
  };

  return (
    <div className="admin-login-container">
      <form onSubmit={handleSubmit} className="admin-login-form">
        <h2 className="admin-login-title">Admin Login</h2>

        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-login" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {/* Display error if there is any */}
        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  );
}

export default AdminLogin;
