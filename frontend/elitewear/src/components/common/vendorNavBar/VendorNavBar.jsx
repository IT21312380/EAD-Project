import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../../../hooks/useLogout";
import "./VendorNavBar.css";

const VendorNavBar = () => {
    const navigate = useNavigate(); // Initialize navigate
    const { logout } = useLogout();

    const handleLogoutClick = () => {
        logout();
        console.log("logout");
        navigate('/vendor-login');
    };

    return (
        <nav className='navcontainer'>
            <img src='' alt="" className='logo' />
            <Link to="/Home" className='title-link'>
                <h1 className='title' style={{ fontStyle: "'Press Start 2P','consolas','sans-serif'" }}>EliteWear</h1>
                <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"></link>
            </Link>

            <ul>
                <li><button className='btn' onClick={() => navigate('/')}>My Products</button></li>
                <li><button className='btn' onClick={() => navigate('/vendor-orders')}>Orders</button></li>
                <li><button className='btn' onClick={() => navigate('/vendor-profile')}>Profile</button></li>
                <li><button className='btn' onClick={() => navigate('/vendor-notifications')}>Notifications</button></li>
                <li><button className='btn' onClick={handleLogoutClick}>LOGOUT</button></li>
            </ul>
        </nav>
    );
};

export default VendorNavBar;
