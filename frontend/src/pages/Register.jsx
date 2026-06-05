import React, { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import ScreenSize from '../ScreenSize'
import Image from '../assets/Front Image.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

function Register() {
    const [name,setName] = useState('');
    const [email,setEmail] =  useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const navigate  = useNavigate();
    const screen = ScreenSize();
    const link = 'https://resource-sharing-platform.onrender.com';


    const handleInput=(e)=>{
      const {name,value}  = e.target;
      if(name == 'name'){ setName(value); }
      else if(name == 'email'){ setEmail(value); }
      else{ setPassword(value); }
      setError('');
    } 

    const handleSubmit=async(e)=>{
      e.preventDefault();
    try{
      if(!name||!email||!password){
       setError("All fields are required");
       return;
      }

      const response = await axios.post(`${link}/api/register`,{name,email,password},{withCredentials:true});
      setError(response.data.message);
      console.log(response.data.message);

      if(response.status == 200){
        alert("navigating to Login Page");
        navigate('/login');
      }

    }catch(err){
      console.log("ERROR:",err);
      setError(err.response.data.message);
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

    <h2 className="authTitle">New here?</h2>

    <p className="authSubtitle">
      Create your account in just a few steps.
    </p>

    <div className="authFields">

      <input
        type="text"
        name="name"
        placeholder="yourname"
        onChange={handleInput}
      />

      <input
        type="email"
        name="email"
        placeholder="youremail@gmail.com"
        onChange={handleInput}
      />

      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={handleInput}
      />

    </div>

    {error && (
      <div className="authError">
        {error}
      </div>
    )}

    <button type="submit" className="authBtn">
      Register
    </button>

    <p className="authFooter">
      Already have an account?
      <Link to="/login"> Login</Link>
    </p>

  </form>

</div>
     </div>
  )
}

export default Register
