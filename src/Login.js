import React, { useState,useContext } from 'react';
import './Login.css';
import  {useNavigate } from "react-router-dom";
import apiRequest from './apiRequest';
import { AuthContext } from './context/AuthContext';

export const Login = () => {
  const { updateUser } = useContext(AuthContext);
  const [error,setError] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);
  const formData = new FormData(e.target);

    const number = formData.get("number");
    const password = formData.get("password");

    try{

    const res = await apiRequest.post("/auth/login",{
      number,password,
    });

    updateUser(res.data);

    navigate("/bet")
  }catch(err){
    console.log(err);
    setError(err.response.data.message);
  }finally{
    setIsLoading(false);
  }


  }
  
  return (
    <div className='login'>
        <div className='title'>
        <h1 >KG888</h1>
        </div>
        <form onSubmit={handleSubmit}>
        <div className='inputfield'>
          <input
          className='centeredinput'
            type="text"
            name="number"
            placeholder="Number"
          />
        </div>
        <div className='inputfield'>
          <input
          className='centeredinput'
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <div className='inputbutton'>
        <button className="libutton" type="submit" disabled={isLoading} >Log In</button>
        </div>
        <div>
          <br></br>
          {error}
        </div>
        </form>
    </div>
  )
}
