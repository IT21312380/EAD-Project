import React, { useState } from 'react';
import { useAdminLogin } from "../../../hooks/useAdminLogin";

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useAdminLogin();
  

  const handleSubmit = async (e) => {
    console.log('Username:', username);
    console.log('Password:', password);
    e.preventDefault();
    await login(username, password);
    
    
  };

  return (
    <div className="App">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          Login
        </button>
        {error && <div className="alogerror">{error}</div>}
      </form>
    </div>
  );
}



export default AdminLogin;
