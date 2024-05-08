import { Navbar } from "./Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import React from 'react';

export const Layout = () => {
  return (
    <div>
         <Navbar/>
        <Outlet/>
    </div>
  );
}


export const RequireAuth = () => {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) return <Navigate to="/" />;
  else{}
    return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  );
}
