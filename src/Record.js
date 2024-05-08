import { useContext} from 'react';
import React from 'react';
import './Record.css';
import apiRequest from './apiRequest';
import  {useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from './context/AuthContext';


export const Record = () => {
    const { updateUser, currentUser } = useContext(AuthContext);
    const posts = useLoaderData();
    
   
    
   
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await apiRequest.post("/auth/logout");
            updateUser(null);
            navigate("/")
        } catch(err){

        }
    }
  
    return (
    <div className='login' >
        <div className='oneRow'>
        
        <div className='userName'>{currentUser.number}</div><br></br>
        <button className='libutton' onClick={handleLogout}>Log Out </button>
        
        </div>
        <div className='card'>
            {
               posts && posts.map(post => (
                        <div className='betCard' key={post.id}>
                            <div className='betTitle'>{post.id}</div>
                            <div className='betDate'>{post.betDate} </div>
                            <>{post.isGD ? 'G' : ''}{post.isMg ? 'M' : ''}{post.isTt ? 'T' : ''}{post.isDmc ? 'D' : ''}</><> GT{post.total}</><br></br>
                            {post.bets.map(data =>(
                               <div key={data.id} >
                                {data.betNumber}  {data.big}B  {data.small}S  {data.type}  ${data.sum}
                               </div>
                            ))}
                            
                        </div>
                    )
                )
            }
        </div>
        </div>
  )
}
