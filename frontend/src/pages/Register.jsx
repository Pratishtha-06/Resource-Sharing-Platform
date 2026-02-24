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

      const response = await axios.post(`${link}/register`,{name,email,password},{withCredentials:true});
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
 
     <div className='d-flex justify-content-center align-items-center'>
     <form onSubmit={handleSubmit}>
 
       <h4 style={{fontWeight:'bold'}}>New here?</h4>
       <div>Create your account in just a few steps.</div>
 
       <div className='d-flex flex-column my-4'>
        <input placeholder='yourname'
               type="text"
               name="name"
               onChange={handleInput}
               style={{paddingLeft:'5px',width:'350px',height:'35px',border:'1px solid grey',borderRadius:'3px',margin:'10px 0px'}}/>
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
               Register</button>
       </div>
       
       <div>Need account? 
         <Link to={'/login'} style={{color:'#a76ed0',textDecoration:'none',fontWeight:'bold',fontStyle:'italic'}}> Login </Link> here!
       </div>
     </form>
     </div>
     </div>
  )
}

export default Register
