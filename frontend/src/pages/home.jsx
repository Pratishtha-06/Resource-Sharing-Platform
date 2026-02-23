import axios from 'axios';
import { Download } from 'lucide-react';
import { useState , useContext } from 'react';
import { useEffect } from 'react';
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router';


function Home() {
  const [pdfs,setPDFs] = useState([]);
  const {user,ready} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(()=>{
   const response = axios.get('/api/get-pdfs',{withCredentials:true})
   .then((res)=>{
     setPDFs(res.data.allPDF);
   })
   .catch((err)=>{
     console.log("err",err);
     setError(err);
   })

  },[])
  
const handleClick=(e)=>{
  if(!ready) return;
  if(ready && !user?._id){
    e.preventDefault();
    navigate('/login');    
  }
}

  return (
    <div className='AllFiles'>
      {pdfs.map((i)=>(
        <div className='d-flex flex-column' style={{width:'170px'}} key={i._id}>
           <embed src={`http://localhost:5000/PDFuploads/${i.fileName}`} 
                  type="application/pdf" 
                  width="180" 
                  height="220"
                  style={{borderRadius:'10px'}}
            />
          <a  className="truncate text-truncate" 
              style={{width:'150px',fontSize:'14px',fontWeight:'bold',color:'black'}}
              href={`http://localhost:5000/PDFuploads/${i.fileName.replace('.pdf.pdf','.pdf')}`}>
              {i.title}
          </a>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='truncate text-truncate' style={{fontSize:'13px' , width:'90%'}}>{i.class} • {i.subject} </div>
            <a className='d-flex justify-content-center align-items-center'
               onClick={handleClick}
               href={`http://localhost:5000/PDFuploads/${i.fileName}`}
               download>
              <Download className='download'/>
            </a>  
          </div>
        </div>
      ))}
    </div>
  )}
  
export default Home
