import React from 'react'

const CSRNavBar = () => {
   

    const handleClick = () =>
        {
          
         
        }
      

    return (
        <nav className = 'navcontainer'>
            <img src='' alt="" className='logo'/>
            <Link to="/Home" className='title-link'>
                <h1 className='title' style={{fontStyle:"'Press Start 2P','consolas','sans-serif'"}}>SPACEX</h1>
                <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"></link>
            </Link>

            <ul>
                
                <li><Link to=""><button className='btn'>Inventory</button></Link></li>
                <li><Link to=""><button className='btn'>Users</button></Link></li>
                <li><Link to=""><button className='btn'>Orders</button></Link></li>
                <li><Link to=""><button className='btn' onClick={handleClick}>LOGOUT</button></Link></li>


            </ul>
        </nav>
    )
}

export default CSRNavBar