import React, {useState,useEffect,createContext } from 'react'
import axios from 'axios';

export const UserContext = createContext({});

function UserContextProvider({children}){
    const [user,setUser] = useState(null);
    const [ready,setReady] = useState(false)
    const link = 'https://resource-sharing-platform.onrender.com';
 
    useEffect(()=>{
    axios.get(`${link}/api/profile`, { withCredentials: true })
    .then(({data}) => {
      setReady(true);
      setUser(data);      
    })
    .catch(() => {
      setUser(null);
      setReady(true);
    });
    },[])

  return (
    <UserContext.Provider value={{user,setUser,ready,setReady}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;
