import axios from 'axios';
import { useState,useEffect } from 'react'
import {Trash} from 'lucide-react'

function Uploads({save,setConfirm,setSelectedID,load,error}) {

  return (
<>
    <div>
     {save.length != 0 ? save.map((i)=>(
        <div className='mx-2 d-flex justify-content-between' key={i._id}>
            <a href={i.fileURL}
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
        load && (<div className='mx-3 mb-2'>{error}</div>)
     )}

    </div>

</>
  )
}

export default Uploads
