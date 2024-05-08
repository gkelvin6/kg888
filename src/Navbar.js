import React from 'react';
import { useContext } from "react";
import './Navbar.css';
import { AuthContext } from "./context/AuthContext";

export const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) return (
    <div>
        <nav>
            <a href="/bet">Bet</a>
            <a href="/record">Record</a>
            <a href="/">Log In</a>
        </nav>
    </div>
  );
  else{}
    return (
    <div>
        <nav>
            <a href="/bet">Bet</a>
            <a href="/record">Record</a>
        </nav>
    </div>
  );
}
