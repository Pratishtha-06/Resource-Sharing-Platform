import axios from 'axios';
import { Download, FileText } from 'lucide-react';
import { useState , useContext } from 'react';
import { useEffect } from 'react';
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';


function Home() {
  const [pdfs,setPDFs] = useState([]);
  const {user,ready} = useContext(UserContext);
  const navigate = useNavigate();
  const link = 'https://resource-sharing-platform.onrender.com';


  useEffect(()=>{
   const response = axios.get(`${link}/api/get-pdfs`,{withCredentials:true})
   .then((res)=>{
     setPDFs(res.data.allPDF);
   })
   .catch((err)=>{
     console.log("err",err);
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
           <FileText size={60}/>
          <a  className="truncate text-truncate pdf-title" 
              href={`${link}/PDFuploads/${i.fileName.replace('.pdf.pdf','.pdf')}`}
              target='blank'>
              {i.title}
          </a>
          <div className='d-flex justify-content-evenly align-items-center'>
            <div className='truncate text-truncate pdf-detail'>{i.class} • {i.subject} </div>
            <a className='Common'
               onClick={handleClick}
               href={`${link}/PDFuploads/${i.fileName}`}
               download>
              <Download className='download'/>
            </a>  
          </div>
        </div>
      ))}
    </div>
  )}
  
export default Home
