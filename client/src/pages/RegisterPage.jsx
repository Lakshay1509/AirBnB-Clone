import React from "react";
import { Link } from 'react-router-dom'
const RegisterPage = () => {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-5xl text-center mb-4 text-bold  text-primary">Register</h1>
        <form className="max-w-md mx-auto">
            <input type="text" placeholder="Name"/>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="bg-primary p-2 w-full text-white rounded-2xl  ">
            Register
          </button>
          <div className="text-center py-2 text-gray-500">Already have an account ? 
            <Link to="/login" className="text-primary underline text"> Login Now</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
