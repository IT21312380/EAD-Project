import { useState } from "react";
import { useAuthContext } from "./useAutContext";

export const useVendorLogin = () => {
const [error,setError] = useState(null)
const [isLoading,setIsLoading] = useState(null)
const {dispatch} = useAuthContext()


const login = async (email,password) => {
    setIsLoading(true)
    setError(null)


const response = await fetch('http://localhost:5133/api/vendor/login',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email,password})
})

console.log(email,password)
const json = await response.json()

if(!response.ok){
    setIsLoading(false)
    setError(json.error)

}

if(response.ok){
    localStorage.setItem('user', JSON.stringify(json))
    //localStorage.setItem('token', user._id)

    dispatch({type: 'LOGIN', payload: json})

    setIsLoading(false)






}


}
return { login ,isLoading,error}

}
