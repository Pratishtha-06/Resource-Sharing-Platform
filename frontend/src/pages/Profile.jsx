import React, { useContext ,useState, useEffect} from 'react'
import { UserContext } from '../components/UserContext'
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import Uploads from './Uploads';

function Profile() {
  const {user,setUser} = useContext(UserContext);
  const [redirect,setRedirect] = useState(null);
  const [save,setSave] = useState([]);
  const [confirm,setConfirm] = useState(false);
  const [selectedID,setSelectedID] = useState(null);
  const [load,setLoad] = useState(true);
  const [error,setError] = useState('');
  const name = user?.name;
  const email = user?.email;
  const link = 'https://resource-sharing-platform.onrender.com';

 
    useEffect(()=>{
        axios.get('/api/my-uploads',{withCredentials:true})
        .then((res)=>{
            setSave(res.data)
            setLoad(false);
            setError('No uploads yet!');
        })
        .catch((err)=>{
            console.log("Error:", err);
            console.log("Status:", err.response?.status);
            console.log("Data:", err.response?.data);
            setLoad(false);
            setError('Failed to load uploads. Please try again later.');
        })
    },[])

  const handleClick=async()=>{
      await axios.post(`${link}/api/logout`);
      setUser(null);
      setRedirect('/');
  }

  if(redirect){
    return <Navigate to={'/'}/>
  }
  
  if(!user){
        return <Navigate to={'/login'}/>
  }

  
  const handleDelete=async()=>{
   try{
      const response = await axios.delete(`/api/delete-upload/${selectedID}`, {withCredentials: true});
      setConfirm(false);
      setSave(prev=>prev.filter(item=>item._id !== selectedID));
      setSelectedID(null);
      setError(response.data.message);
   }catch(err){
            console.log("ERROR:",err);
   }
  }

  return (
    <>
<div className="profileContainer">

  {/* Profile Card */}
  <div className="card">
    <div className="cardTitle">Profile</div>

    <div className="info">{name}</div>
    <div className="info">{email}</div>

    <button className="btn-danger" onClick={handleClick}>
      Logout
    </button>
  </div>

  {/* Uploads Card */}
  <div className="card">
    <div className="cardTitle">Uploads</div>

    <Uploads save={save} setConfirm={setConfirm} setSelectedID={setSelectedID} load={load} error={error}/>
  </div>

    {confirm && (
        <div className="modal-overlay">
         <div className="box">
         <h3 className="modal-title">Delete PDF</h3>

        <p className="modal-content">
          Are you sure you want to permanently delete this PDF?
        </p>
        <div className="modal-actions">

        <button className="confirmBtn cancel" onClick={() => setConfirm(false)}> Cancel </button>

      <button
        className="confirmBtn delete"
        onClick={handleDelete}
      >
        Delete
      </button>

    </div>

  </div>
</div>

    )}
</div>
    </>
  )
}

export default Profile
