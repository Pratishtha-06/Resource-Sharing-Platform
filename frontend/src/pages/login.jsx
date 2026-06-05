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

    <div className="authWrapper">

  <form className="authCard" onSubmit={handleSubmit}>

    <h2 className="authTitle">Welcome back</h2>
    <p className="authSubtitle">
      Log in to access your account
    </p>

    <div className="authFields">

      <input
        placeholder="youremail@gmail.com"
        type="email"
        name="email"
        onChange={handleInput}
      />

      <input
        placeholder="password"
        type="password"
        name="password"
        onChange={handleInput}
      />

    </div>

    {error && <div className="authError">{error}</div>}

    <button type="submit" className="authBtn">
      Login
    </button>

    <p className="authFooter">
      Need an account?
      <Link to="/register"> Register</Link>
    </p>

  </form>

  </div>
    </div>
  )
}

export default Login
