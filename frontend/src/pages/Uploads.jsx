import axios from 'axios';
import { useState,useEffect } from 'react'
import {Trash} from 'lucide-react'

function Uploads() {
    const [save,setSave] = useState([]);
    const [confirm,setConfirm] = useState(false);
    const [selectedID,setSelectedID] = useState(null);
    const [error,setError] = useState('');
    const link = "https://resource-sharing-platform.onrender.com";

    useEffect(()=>{
        axios.get('/api/my-uploads',{withCredentials:true})
        .then((res)=>{
            setSave(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

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
    <div>
     {save.length != 0 ? save.map((i)=>(
        <div className='mx-2 d-flex justify-content-between' key={i._id}>
            <a href={`${link}/PDFuploads/${i.fileName.replace('.pdf.pdf','.pdf')}`}
               target="_blank" rel="noopener noreferrer" 
               style={{color:'black'}}>
                {i.class}-{i.title}-{i.subject}
            </a>
            <div onClick={()=>{setConfirm(true)
                               setSelectedID(i._id)}} 
                 style={{cursor:'pointer'}}>
                <Trash  style={{width:'15px'}}/>
            </div>
        </div>
     )):(
        <div className='mx-3 mb-2'>No uploads yet!</div>
     )}

    {confirm && (
        <div className='modal-overlay'>
          <div className='box'>
            <p className='modal-content'>Are you sure you want to delete this PDF?</p>
            <div className='d-flex justify-content-center gap-5'>
                <button className='confirmBtn' onClick={handleDelete}>Yes</button>
                <button className='confirmBtn' onClick={()=>setConfirm(false)}>No</button>
            </div>
          </div> 
        </div>

    )}
    </div>
  )
}

export default Uploads
