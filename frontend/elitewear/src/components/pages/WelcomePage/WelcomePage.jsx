import React from 'react';
import './WelcomePage.css'; // Import the CSS file

const WelcomePage = () => {
  return (
    
    <div className="welcome-container">
        <img src="./Logo(3).png" alt="Company Logo" className='landing-logo' />
      <div className="welcome-content">
        <h4 className="welcome-title">Welcome to EliteWear</h4>
      </div>
      <div className="welcome-subtitle-container">
        <h4 className="welcome-subtitle">All your computer needs in a single place</h4>
      </div>
      <div className="welcome-buttons">
        <button className="welcome-btn-login common-btn">Admin Login</button>
        <button className="welcome-btn-login common-btn">CSR Login</button>
        <button className="welcome-btn-login common-btn">Vendor Login</button>
      </div>
    </div>
  );
}

export default WelcomePage;
