import { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router';

function  UploadResources() {
  const {user,ready} = useContext(UserContext);
  const [title,setTitle] = useState('');
  const [year,setYear] = useState('');
  const [subject,setSubject] = useState('');
  const [classYear,setClassYear] = useState('');
  const [file,setFile] = useState(null);
  const [uploaded,setUploaded] = useState(null);
  const [preview,setPriview] = useState(null);
  const [error,setError] = useState('');
  const navigate = useNavigate();
  
  const handleInput=(e)=>{
    const {name,value} = e.target;
    setError('');
    if(name=='title'){ setTitle(value);}
    else if(name=='year'){ setYear(value);}
    else if(name=='classYear'){ setClassYear(value);}
    else{ setSubject(value);}
    setError('');

  }

  const handleSubmit = async(e)=>{
    e.preventDefault();

    if(ready && (!user || !user._id)){
      navigate('/login');
      return;
    }
    try{
    if(!title||!year||!subject||!file||!classYear){
      setError("All Fields are required");
      return;
    }
    const newData =  new FormData();
    newData.append('title',title);
    newData.append('year',year);
    newData.append('subject',subject);
    newData.append('classYear',classYear);
    newData.append('file',file);
    
    const response =  await axios.post('/api/upload-resource',newData,{withCredentials:true})
    setUploaded(response.data.fileUrl);
    alert("PDF Uploaded Successfully");

   }catch(err){
    console.log("Error:",err);
   }  
  }
  return (
    <form className='d-flex flex-column InputBox'
          onSubmit={handleSubmit}>
      <div style={{width:'fit-content',padding:'0px 5px',backgroundColor:'white',position:'relative',bottom:'15px',left:'15px',fontSize:'larger',fontWeight:'bold'}}>
            Upload
      </div>
      <div className='d-flex flex-column w-100'>
      <div className="m-2" style={{fontWeight:'bold'}}>
        Title:
        <input className="InputFields" 
               placeholder="Eg.Computer Science Minor"
               type='text'
               name='title'
               value={title}
               onChange={handleInput}/>
      </div>
      <div className="m-2" style={{fontWeight:'bold'}}>
        Year:
        <input className="InputFields" 
               placeholder="Eg.2024"
               type='text'
               name='year'
               value={year}
               onChange={handleInput}/>
      </div>
      <div className="m-2" style={{fontWeight:'bold'}}>
        Class:
        <input className="InputFields" 
               placeholder="Eg.BSc I year"
               type='text'
               name='classYear'
               value={classYear}
               onChange={handleInput}/>
      </div>
      <div className="m-2" style={{fontWeight:'bold'}}>
        Subject:
        <input className="InputFields" 
               placeholder="Eg.Operating System"
               type='text'
               name='subject'
               value={subject}
               onChange={handleInput}/>
      </div>
      <div className="m-2" style={{fontWeight:'bold'}}>
        Upload:
        <input className='w-100 m-2'
               placeholder="Upload pdf file"
               type='file'
               accept='.pdf'
               name='file'
               onChange={(e)=>{setFile(e.target.files[0])
                              setPriview(URL.createObjectURL(e.target.files[0]))
               }}/>
      </div>
      {preview && (
      <a  target="blank"
          href={`${preview}`}
          className='mx-3'>View pdf</a>
      )}
      <div className="m-2" style={{height:'50px'}}>
      {error&&(
        <div style={{color:'red',fontSize:'small'}}>{error}</div>
      )}
      </div>

      <div className="mx-2 my-3">
        <button type="submit"
                className='uploadBtn'>Upload</button>
      </div>
      </div>
    </form>
  )
}

export default UploadResources
