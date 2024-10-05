import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAutContext";



const  VendorProfile = () => {
    const [User,setUser] = useState(null)
    const{user} = useAuthContext()
   

    useEffect(() =>{

        const fetchProfile = async () => {
            const response = await fetch(`http://localhost:5133/api/vendor/${user.vendor.id}`)
            console.log(user)
            const json = await response.json()

            if(response.ok)
            {
                setUser(json)
                
            }

            
        }
        if(user != null){
            
            fetchProfile()}
    },[user])
    
      
    

    return(
    <div>
        
        <div>
            
        
            <h1 className="Utitle">HELLO {User?.username ?? 'null'}!</h1><br/>
            <h2 className="Utitle2">Here is your profile details</h2>
            <br/><br/>

            <div className="formbox1">
                <p>Name   : {User?.username ?? 'null'}</p>
                <p>Email  : {User?.email ?? 'null'}</p>
                


            </div><br></br>
            <br/>

            <a href="/UpdateProfile"><button className="btnupdate2">Edit Profile</button></a>

            <br/>
            <br/>
            <a href="/userreview"><button className="btnupdate2">My Reviews</button></a>

            
          


            
            
        
    </div>
    <br></br>
    <br></br>
    
    </div>
    )
}

export default VendorProfile;