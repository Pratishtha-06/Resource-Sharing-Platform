import { Search } from 'lucide-react'
import {useEffect, useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import ScreenSize from '../ScreenSize';

function SearchBar() {
  const [query,setQuery] = useState('');
  const [suggestion,setSuggestion] = useState([]);
  const [load,setLoad] = useState(false);
  const navigate = useNavigate();
  const screen = ScreenSize();
  const link = 'https://resource-sharing-platform.onrender.com';

  useEffect(()=>{
    if(!query.trim()){
      setSuggestion([]);
      return;
    }
    console.log("size",screen);
    const timer = setTimeout(async()=>{
     try{
      setLoad(true);
      const response = await axios.get(`${link}/api/search-pdfs?q=${query}`);
      setSuggestion(response.data.results);
     }catch(err){
      console.log("error in search:",err);
     }finally{
      setLoad(false);
     }

    },300)

    return ()=>clearTimeout(timer);
  },[query])


  function highlightText(text, query) {
  if (!query) return text;

  const parts = text.split(new RegExp(`(${query})`, "gi"));

  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} style={{ backgroundColor: "#ffe58a" }}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

  return (
    <div className='d-flex justify-content-evenly align-items-center gap-1' style={{width:'350px'}}>
        <div style={{display:'flex',flexDirection:'column',gap:'3px',width:'300px',fontSize:'15px'}}>
            <input type='text' 
                   placeholder=' subject  |  year  |  class  |  sem'
                   style={{border:'1px solid grey',borderRadius:'15px',width:'100%',padding:'0px 5px'}}
                   value={query}
                   onChange={(e)=>setQuery(e.target.value)}/>
            
        {suggestion.length > 0 && (
         <div className="search-dropdown" style={{top:(screen < 700?'18%':'10%')}}>
          {suggestion.map((pdf) => (
            <div key={pdf._id}
                 className="search-item"
                 onClick={() => {setQuery("");
                                 setSuggestion([]);
                                 window.open(`${link}/PDFuploads/${pdf.fileName}`,"_blank");}}>
          {highlightText(pdf.title, query)}
          <div className="search-meta">
            {pdf.class} • {pdf.subject} • {pdf.year}
          </div>
        </div>
      ))}
      </div>
     )}
        </div>
        <div style={{width:'5px'}}>
        {load && (
          <div className='load'></div>
        )}
        </div>
        

    </div>
  )
}

export default SearchBar
