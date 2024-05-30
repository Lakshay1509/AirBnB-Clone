import React, { useEffect } from 'react';
import axios from 'axios';

import { useState } from 'react';

export const UserContext = React.createContext();

export default UserContext;

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] =useState(false);
  const [email, setemail] = useState(null)
  
  useEffect(() => {
    if(!user){
      axios.get('/api/v1/users/profile').then(({data})=>{
        
        setUser(data.data.name)
        setemail(data.data.email)
        setReady(true)
      }).catch((error)=>{
        console.log(error)
      })
    }
  },[])
  
  return (
    <UserContext.Provider value={{user,setUser,ready,email,setReady,setemail}}>
      {children}
    </UserContext.Provider>
  )
}
