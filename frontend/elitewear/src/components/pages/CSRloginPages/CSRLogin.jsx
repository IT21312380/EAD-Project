import React, { useState } from "react";
import { useCSRLogin } from "../../../hooks/useCSRLogin";
import "./CSRLogin.css"; // Import the CSS file

function CSRLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useCSRLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="csr-login-container">
      <form onSubmit={handleSubmit} className="csr-login-form">
        <h2 className="csr-login-title">CSR Login</h2>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
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
            name="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {error && <div className="csr-login-error">{error}</div>}
      </form>
    </div>
  );
}

export default CSRLogin;
