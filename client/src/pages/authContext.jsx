import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext =createContext()

export const AuthContextProvider = ({ children})=>{
  
   
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem('user'))|| null)
    
    const logout =()=>{
        axios.post('http://localhost:8800/api/auth/logout').then((res)=>{
            console.log(res)
            setCurrentUser(null)
        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        localStorage.setItem('user',JSON.stringify(currentUser))
    },[currentUser])
    return(
        <AuthContext.Provider value={{currentUser,logout,setCurrentUser}}>
            {children }
        </AuthContext.Provider>
    )
}