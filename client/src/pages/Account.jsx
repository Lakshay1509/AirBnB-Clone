import React, { useContext ,useState} from 'react'
import UserContext from '../UserContext'
import { Navigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PlacesPage from './PlacesPage'



const Account = () => {
    const {user,ready,email,setemail,setUser} = useContext(UserContext)

    const [success, setSuccess] = useState(false)

    
   


    let {subpage} = useParams()
    if(subpage=== undefined){
        subpage = 'profile'
    }

    function linkClasses(type=null){
        let classes = 'py-2 px-6 inline-flex gap-1 justify-center items-center'
        if(type === subpage){
            classes += ' bg-primary text-white rounded-full'
        }
        else{
            classes += ' bg-gray-200 rounded-full'
        }
        return classes
    }

    async function handleLogout(e){
        e.preventDefault()
        await axios.post('/api/v1/users/logout')
        setSuccess(true)
        setemail("")
        setUser("")
    }

    if(success){
        return <Navigate to='/'/>
    }

    

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2">
        <Link to={"/account"} className={linkClasses("profile")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          My Profile
        </Link>
        <Link to={"/account/bookings"} className={linkClasses("bookings")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          My Bookings
        </Link>
        <Link to={"/account/places"} className={linkClasses("places")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
            />
          </svg>
          My Accommodations
        </Link>
      </nav>

      {subpage === "profile" && (
        <div className="text-center mx-auto mt-8 max-w-lg">
          Logged in as {user} ({email}) <br />
          <button
            className="bg-primary text-white p-1 rounded-full w-full mt-2"
            onClick={handleLogout}
          >
            LogOut
          </button>
        </div>
      )}

      {subpage === "places" && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>
  );
}

export default Account