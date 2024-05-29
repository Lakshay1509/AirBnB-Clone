import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");

  async function registerUser(e) {

    if(password !== confirmpassword){
      alert("Passwords do not match")
      setconfirmPassword("")
    }

    try {
      e.preventDefault()
      
      await axios.post("/api/v1/users/register", {
        name,
        email,
        password
      });
      alert("User registered successfully")
      setName("")
      setEmail("")
      setPassword("")
    } catch (error) {
      alert("Error registering user")
      
    }

  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-5xl text-center mb-4 text-bold  text-primary">
          Register
        </h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser} >
          <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />


          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />



          <input type="password" placeholder="Password" 

          value={password} onChange={e=>setPassword(e.target.value)}
          />
          <input type="password" placeholder="Confirm Password" 

          value={confirmpassword} onChange={e=>setconfirmPassword(e.target.value)}
          />


          <button className="bg-primary p-2 w-full text-white rounded-2xl  ">
            Register
          </button>
          <div className="text-center py-2 text-gray-500">
            Already have an account ?
            <Link to="/login" className="text-primary underline text">
              {" "}
              Login Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
