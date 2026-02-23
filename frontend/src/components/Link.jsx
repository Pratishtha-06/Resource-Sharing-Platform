import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import '../index.css';
import {UserContext} from './UserContext';
import {Home,PlusIcon,User} from 'lucide-react'

function LinkComponent() {
     const{user,ready} = useContext(UserContext);
 
     if(!ready){
        return null;
     }
 
  return (
    <div className='d-flex' style={{height:'40px'}}>
        <div className=' Options'>
            <Link to={'/'} className='Options' style={{textDecoration:'none'}}>
               <Home style={{width:'20px' , margin:'0px 5px'}}/> Home
            </Link>
        </div>
        <div className='Options'>
            <Link to={'/upload-resource'} className='Options' style={{textDecoration:'none'}}>
               <PlusIcon style={{width:'20px' , margin:'0px 5px'}}/> Upload
            </Link>
        </div>
        <div className='Options'>
            <Link to={user?'/my-profile':'/login'} className='Options' style={{textDecoration:'none'}}>
               <User style={{width:'20px' , margin:'0px 5px'}}/>Account
            </Link>
        </div>
    </div>
  )
}

export default LinkComponent
