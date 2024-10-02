import React, { useState } from 'react';
import { useVendorLogin } from "../../../hooks/useVendorLogin";

function VendorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useVendorLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  
    
  };

  return (
    <div className="App">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}



export default VendorLogin;
