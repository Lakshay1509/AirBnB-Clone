import React, { useContext } from 'react'
import UserContext from '../UserContext'
import { Navigate } from 'react-router'



const Account = () => {
    const {ready,user} = useContext(UserContext)

    if(ready &&!user){
        return <Navigate to='/login' />
    }

    if(!ready){
        return <div>Loading...</div>
    }
  return (
    <div>{user}</div>
  )
}

export default Account