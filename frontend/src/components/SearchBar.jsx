import { Search } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios';


function SearchBar() {
  const [subject,setSubject] = useState('');
  const [pdfs,setPDFs] = useState([]);

  const handleSearch=(e)=>{
    e.preventDefault();
    try{
      axios.get(`/api/get-subject/${subject}`,{withCredentials:true})
      .then((res)=>{
        setPDFs(res.data.response);
      })
    }catch(err){
      console.log("Error in fetching");
    }
  }

  return (
    <div className='d-flex justify-content-evenly align-items-center'>
        <div style={{display:'flex',gap:'3px',width:'300px',fontSize:'15px'}}>
            <input type='text' 
                   placeholder='Search by subject/use filter for more option'
                   style={{border:'1px solid grey',borderRadius:'15px',width:'100%',padding:'0px 10px'}}
                   value={subject}
                   onChange={(e)=>setSubject(e.target.value)}/>
            <Search style={{width:'15px',cursor:'pointer'}}
                    onClick={handleSearch}/>
        </div>
    </div>
  )
}

export default SearchBar
