import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '../index.css'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'
import Image from '../assets/Front Image.jpg';
import ScreenSize from '../ScreenSize';
import { useContext } from 'react';
import { UserContext } from '../components/UserContext';


function Login() {
    const [email,setEmail] =  useState('');
    const[password,setPassword] = useState('');
    const [error,setError] = useState('');
    const navigate = useNavigate();
    const {user,setUser} = useContext(UserContext);
    const screen = ScreenSize();
    const link = 'https://resource-sharing-platform.onrender.com';

    const handleInput=(e)=>{
      const {name,value}  = e.target;
      if(name === 'email'){ setEmail(value); }
      else{ setPassword(value); }
      setError('');
    } 
   
    const handleSubmit=async(e)=>{
      try{
      e.preventDefault();
      if(!email||!password){
        setError("All fields are required");
        return;
      }
     const response = await axios.post(`${link}/api/login`,{email,password},{withCredentials:true});
     console.log("user",response.data);

     if(response.status === 200){
        alert("Login Successful");
        setUser(response.data);
        navigate('/');
     }
     
    }catch(err){
      console.log("Error occurred:",err);
      setError(err.response?.data?.message||"Login failed");
    }
    }
  return (
    <div className='d-flex justify-content-evenly align-items-center' style={{height:'100%'}}>
  {screen > 750 ?(
    <div>
      <img src={Image}/>
    </div>
  ):(<></>)}

    <div className="Common">
    <form onSubmit={handleSubmit}>

      <h4 style={{fontWeight:'bold'}}>Welcome back!</h4>
      <div>Please log in to access your account.</div>

      <div className='d-flex flex-column my-4'>
      <input placeholder='youremail@gmail.com' 
             type="email"
             name="email"
             onChange={handleInput}
             style={{paddingLeft:'5px',width:'350px',height:'35px',border:'1px solid grey',borderRadius:'3px',margin:'10px 0px'}}/>
      <input placeholder='password'
             type="password" 
             name="password"
             onChange={handleInput}
             style={{paddingLeft:'5px',width:'350px',height:'35px',border:'1px solid grey',borderRadius:'3px',margin:'10px 0px'}}/>
      
      <div style={{height:'50px'}}>
      {error&&(
        <div style={{color:'red',fontSize:'small'}}>{error}</div>
      )}
      </div>

      <button type='submit' className='Button'>
              Login</button>
      </div>
      
      <div>Need account? 
        <Link to={'/register'} style={{color:'#a76ed0',textDecoration:'none',fontWeight:'bold',fontStyle:'italic'}}> Register </Link> here!
      </div>
    </form>
    </div>
    </div>
  )
}

export default Login
