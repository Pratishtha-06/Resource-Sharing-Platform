import { Search } from 'lucide-react'
import {useEffect, useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function SearchBar() {
  const [query,setQuery] = useState('');
  const [suggestion,setSuggestion] = useState([]);
  const [load,setLoad] = useState(false);
  const navigate = useNavigate();
  const link = 'https://resource-sharing-platform.onrender.com';

  useEffect(()=>{
    if(!query.trim()){
      setSuggestion([]);
      return;
    }

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
    <div className='d-flex justify-content-evenly align-items-center'>
        <div style={{display:'flex',gap:'3px',width:'300px',fontSize:'15px'}}>
            <input type='text' 
                   placeholder=' subject  |  year  |  class  |  sem'
                   style={{border:'1px solid grey',borderRadius:'15px',width:'100%',padding:'0px 5px'}}
                   value={query}
                   onChange={(e)=>setQuery(e.target.value)}/>
        </div>
        {load && (
          <div>Searching...</div>
        )}

      {suggestion.length > 0 && (
        <div className="search-dropdown">
          {suggestion.map((pdf) => (
            <div key={pdf._id}
                 className="search-item"
                 onClick={() => {setQuery("");
                                 setSuggestion([]);
                                 navigate(`/pdf/${pdf._id}`);}}>
          {highlightText(pdf.title, query)}
          <div className="search-meta">
            {pdf.class} • {pdf.subject} • {pdf.year}
          </div>
        </div>
      ))}
      </div>
     )}
    </div>
  )
}

export default SearchBar
