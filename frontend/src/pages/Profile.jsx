import React, { useContext ,useState} from 'react'
import { UserContext } from '../components/UserContext'
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import Uploads from './Uploads';

function Profile() {
  const {user,setUser} = useContext(UserContext);
  const name = user?.name;
  const email = user?.email;
  const [redirect,setRedirect] = useState(null);
 

  const handleClick=async()=>{
      await axios.post('/api/logout');
      setUser(null);
      setRedirect('/');
  }


  if(redirect){
    return <Navigate to={'/'}/>
  }
  
  if(!user){
        return <Navigate to={'/login'}/>
  }


  return (
    <>
    <div style={{border:'1px solid grey',borderRadius:'5px',margin:'20px 20px',padding:'5px 0px 10px 10px'}}>
      <div style={{width:'fit-content',padding:'0px 5px',backgroundColor:'white',position:'relative',bottom:'20px',left:'15px',fontSize:'larger',fontWeight:'bold'}}>
            Profile
      </div>
        <div>{name}</div>
        <div>{email}</div>
        <button className='bg-danger' style={{textAlign:'center',border:'none',color:'white',borderRadius:'3px',marginTop:'15px',width:'80px',height:'30px'}}
                onClick={handleClick}>
                Logout
        </button>

    </div>
    
    <div style={{border:'1px solid grey',borderRadius:'5px',margin:'20px 20px'}}>
      <div style={{width:'fit-content',padding:'0px 5px',backgroundColor:'white',position:'relative',bottom:'15px',left:'15px',fontSize:'larger',fontWeight:'bold'}}>
        Uploads
      </div>
      <Uploads/>
    </div>
    </>
  )
}

export default Profile
