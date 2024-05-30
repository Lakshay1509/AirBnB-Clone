import React, { useContext ,useState} from 'react'
import UserContext from '../UserContext'
import { Navigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'



const Account = () => {
    const {user,ready,email,setemail,setUser} = useContext(UserContext)

    const [success, setSuccess] = useState(false)

    
    if(ready==false && user == null){
        return <Navigate to='/login'/>
    }

    if(ready==false){
        return <div>Loading...</div>
    }




    let {subpage} = useParams()
    if(subpage=== undefined){
        subpage = 'profile'
    }

    function linkClasses(type=null){
        let classes = 'py-2 px-6'
        if(type === subpage){
            classes += ' bg-primary text-white rounded-full'
        }
        return classes
    }

    async function handleLogout(e){
        e.preventDefault()
        await axios.post('/api/v1/users/logout')
        setSuccess(true)
        setemail(null)
        setUser(null)
    }

    if(success){
        return <Navigate to='/'/>
    }

    

  return (
    <div>
        <nav className='w-full flex justify-center mt-8 gap-2'>
            <Link to={'/account'} className={linkClasses('profile')}> My Profile</Link>
            <Link to={'/account/bookings'}className={linkClasses('bookings')}> My Bookings</Link>
            <Link to={'/account/places'} className={linkClasses('places')}>My Accommodations</Link>
        </nav>

        {subpage === 'profile' && (
            <div className='text-center mx-auto mt-8 max-w-lg'>
            Logged in as {user} ({email}) <br/>
            <button className="bg-primary text-white p-1 rounded-full w-full mt-2" onClick={handleLogout}>LogOut</button>
        </div>
        )}
        
    </div>
  )
}

export default Account