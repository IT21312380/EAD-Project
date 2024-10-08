import { useState } from "react";
import { useAuthContext } from "./useAutContext";

export const useCSRLogin = () => {
const [error,setError] = useState(null)
const [isLoading,setIsLoading] = useState(null)
const {dispatch} = useAuthContext()

const login = async (username,password) => { 
    setIsLoading(true)
    setError(null)


const response = await fetch('http://localhost:5133/api/csr/login',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username,password})
})

const json = await response.json()

if(!response.ok){
    setIsLoading(false)
    setError(json.error)

}

if(response.ok){
    localStorage.setItem('user', JSON.stringify(json))

    dispatch({type: 'LOGIN', payload: json})

    setIsLoading(false)

}

}
return { login,isLoading,error}
}
