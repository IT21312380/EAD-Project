import React, { useState } from "react";
import { useAdminLogin } from "../../../hooks/useAdminLogin";
import "./AdminLogin.css";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useAdminLogin();

  const handleSubmit = async (e) => {
    console.log("Username:", username);
    console.log("Password:", password);
    e.preventDefault();
    await login(username, password);
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
            type="username"
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
          Login
        </button>
        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  );
}

export default AdminLogin;
