import "./App.css";

import { Route, Routes } from "react-router-dom";

import IndexPage from "./pages/IndexPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import Layout from "./Layout.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

import { UserContextProvider } from "./UserContext.jsx";

import axios from "axios";
import { useEffect } from "react";
import Account from "./pages/Account.jsx";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  
  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<IndexPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/account/:subpage?" element={<Account/>} />
      <Route path ="/account/:subpage?/:action?" element={<Account/>} />
      </Route>
    </Routes>
    </UserContextProvider>
    
  );
}

export default App;
