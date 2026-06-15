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
  const [preview,setPreview] = useState(null);
  const [uploading,setUploading] = useState(false);
  const [error,setError] = useState('');
  const navigate = useNavigate();
  const MAX_FILE_SIZE = 25*1024*1024;
  
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

    
    if(file.size > MAX_FILE_SIZE){
      setError("File size should be less than 25 MB");
      return;
    }else{
      setError("");
    }
    
    setUploading(true);
    const response =  await axios.post('/api/upload-resource',newData,{withCredentials:true})
    alert("PDF Uploaded Successfully");
    setTitle('');
    setYear('');
    setSubject('');
    setClassYear('');
    setFile(null);
    setPreview(null);

   }catch(err){
    console.log("Error:",err);
   } 
   finally{
    setUploading(false);
   } 
   
  }
  return (
  <form className="uploadCard" onSubmit={handleSubmit}>

  <div className="uploadTitle">Upload Resource</div>

  <div>

    <div className="field">
      <label>Title</label>
      <input
        type="text"
        name="title"
        value={title}
        placeholder="Eg. Computer Science Minor"
        onChange={handleInput}
      />
    </div>

    <div className="field">
      <label>Year</label>
      <input
        type="text"
        name="year"
        value={year}
        placeholder="Eg. 2024"
        onChange={handleInput}
      />
    </div>

    <div className="field">
      <label>Class</label>
      <input
        type="text"
        name="classYear"
        value={classYear}
        placeholder="Eg. BSc 1st Year"
        onChange={handleInput}
      />
    </div>

    <div className="field">
      <label>Subject</label>
      <input
        type="text"
        name="subject"
        value={subject}
        placeholder="Eg. Operating System"
        onChange={handleInput}
      />
    </div>

    <div className="field full">
      <label>Upload PDF</label>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setPreview(URL.createObjectURL(e.target.files[0]));
        }}
      />
    </div>

  </div>

  {preview && (
    <a className="previewLink" href={preview} target="_blank">
      View selected PDF
    </a>
  )}

  {error && <div className="errorText">{error}</div>}

  <button className="uploadBtn" type="submit" disabled={uploading}>
    {uploading ? "Uploading..." : "Upload"}
  </button>

  {uploading && (
  <div className="uploadProgress">
    <div className="uploadProgressFill"></div>
  </div>
  )}

</form>
  )
}

export default UploadResources
