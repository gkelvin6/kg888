import React, { useState } from 'react';
import './Signup.css';
import  {useNavigate } from "react-router-dom";
import apiRequest from './apiRequest';

export const Signup = () => {
  const [error,setError] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);
  const formData = new FormData(e.target);

    const username = formData.get("username");
    const number = formData.get("number");
    const password = formData.get("password");

    try{

    const res = await apiRequest.post("/auth/register",{
      number,username,password,
    });

    navigate("/")
  }catch(err){
    console.log(err);
    setError(err.response.data.message)
  }finally{
    setIsLoading(false);
  }


  }
  


  return (
    <div className='signup'>
        <div className='title'>
        <h1 >KG888 Register</h1>
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
            type="text"
            name="username"
            placeholder="Username"
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
        <div>
        <button className="libutton" type="submit" disabled={isLoading} >Sign Up</button>
        </div>
        <div><br></br>
          {error}
        </div>
        </form>
    </div>
  )
}
