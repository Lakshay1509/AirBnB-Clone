import React, { useContext } from "react";
import { Link, Navigate } from 'react-router-dom'
import axios from "axios";
import UserContext from "../UserContext";
const LoginPage = () => {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [redirect, setRedirect] = React.useState(false);

 const {setUser,setReady,setemail} = useContext(UserContext);

 async function handleSubmit(e) {
  
  try {
    e.preventDefault();
    const user =await axios.post("/api/v1/users/login", {
      email,
      password
    });
    
    setRedirect(true);
    setReady(true);
    setUser(user.data.data.name);
    setemail(user.data.data.email);
  } catch (error) {
    console.error("Error logging in", error);
    alert("Error logging in");
  }
}



  if(redirect){
    return <Navigate to={'/'} />
  }



  return (
    
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4 ">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
          <input type="password" placeholder="Password"  value={password} onChange={e=>setPassword(e.target.value)}/>
          <button className="bg-primary p-2 w-full text-white rounded-2xl  ">
            Login
          </button>
          <div className="text-center py-2 text-gray-500">Don't have an account yet ? 
            <Link to="/register" className="text-primary underline text"> Register Now</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
