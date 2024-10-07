import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../../../hooks/useLogout";

const CSRNavBar = () => {

    const navigate = useNavigate(); // Initialize navigate
    const { logout } = useLogout();
   

    const handleLogoutClick = () =>
        {
        logout();
        console.log("logout");
        navigate('/csr-login');
          
         
        }
      

    return (
        <nav className = 'navcontainer'>
            <img src='' alt="" className='logo'/>
            <Link to="/Home" className='title-link'>
                <h1 className='title' style={{fontStyle:"'Press Start 2P','consolas','sans-serif'"}}>EliteWear</h1>
                <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"></link>
            </Link>

            <ul>
                
                <li><button className='btn' onClick={() => navigate('/all-users')}>Users</button></li>
                <li><button className='btn' onClick={() => navigate('/csr-orders')}>Orders</button></li>
                <li><button className='btn' onClick={handleLogoutClick}>LOGOUT</button></li>


            </ul>
        </nav>
    )
}

export default CSRNavBar